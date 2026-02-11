/*

Object.create 是原型链继承的基石。它的作用是：创建一个新对象，让这个新对象的 __proto__ 指向你要继承的那个对象。
举个例子
const proto = { greet() { return 'hi' } }
const obj = create(proto)
obj.greet() // 'hi'

再来个例子
// 1. 我们先定义一个“老家”对象，也就是 proto
const parent = {
  house: "大别墅",
  sayHello: function() {
    console.log("你好，我是父辈留下的方法")
  }
}

// 2. 使用你写的 create 函数，把 parent 作为参数传进去
const child = create(parent)

// 3. 看看发生了什么
console.log(child.house) // 输出: "大别墅"
child.sayHello();        // 输出: "你好，我是父辈留下的方法"
 */

/* 模拟 Object.create (极简版) */
function create(proto) {
  // 1. 创建一个临时的构造函数
  function F() {}

  // 2. 将构造函数的原型指向 proto (这一步是核心)
  F.prototype = proto

  // 3. 返回 F 的实例
  // 因为 F 的原型被改了，所以 new F() 出来的实例，
  // 它的 __proto__ 自然就指向了 proto。
  return new F()
}

/*每隔-1-秒打印-1234 
循环会很快（几乎瞬间）跑完 4 次。*/
/* 方案 1：let (ES6) 
直接用 let 声明变量，每次循环都会生成一个新的块级作用域变量 i，完美解决问题。*/
for (let i = 1; i <= 4; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

/* 发布-订阅模式 (EventEmitter) 
class EventEmitter {
  constructor() {
    // 仓库：{ 'click': [fn1, fn2], 'hover': [fn3] }
    //用来存谁订阅了什么
    // 【核心】定义一个对象来存事件。这个对象长这样：
    // {
    //    'click': [fn1, fn2],  // 点击事件有两个回调
    //    'login': [fn3]        // 登录事件有一个回调
    // }
    this.events = {}
  }
  
  // 订阅 (on)
  // eventName: 事件名 (比如 'click')
  //callback:  具体要执行的函数 (比如 console.log)
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [] //如果该事件没人监听，初始化一个空数组，准备装回调函数
    }
    this.events[eventName].push(callback)
  }
  
  // 发布 (emit)
  //eventName是事件名，...agrs是参数列表
  /如果调用 emit('click', 1, 2, 3)
  这里的 args 就是数组 [1, 2, 3]
  emit(eventName, ...args) {
    //先取出对应的回调函数列表
    const callbacks = this.events[eventName]
    //如果列表存在 则说明有人订阅过
    if (callbacks) {
      // 挨个执行所有监听者 
      // 执行函数，并把参数全都传进去
      // cb(...args) 等价于 fn(1, 2, 3)
      callbacks.forEach(cb => cb(...args))
      
    }
  }
  
  // 取消订阅 (off) - 如果有余力最好写上
  off(eventName, callback) {
    const callbacks = this.events[eventName]
    if (callbacks) {
      // 找到那个 callback 并删掉
      // filter 是最经典的“删除数组某些元素”的方法。
      // 它会创建一个新数组，把“不等于 callback”的那些留下来。
      // 等于说就把你传进来的那个 `callback` 给过滤掉了。
      this.events[eventName] = callbacks.filter(cb => cb !== callback)
    }
  }
}
*/

/* 发布-订阅模式 (EventEmitter) */
class EventEmitter {
  constructor() {
    // 仓库：{ 'click': [fn1, fn2], 'hover': [fn3] }
    //用来存谁订阅了什么
    this.events = {}
  }

  // 订阅 (on)
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }

  // 发布 (emit)
  emit(eventName, ...args) {
    const callbacks = this.events[eventName]
    if (callbacks) {
      // 挨个执行所有监听者
      callbacks.forEach((cb) => cb(...args))
    }
  }

  // 取消订阅 (off) - 如果有余力最好写上
  off(eventName, callback) {
    const callbacks = this.events[eventName]
    if (callbacks) {
      // 找到那个 callback 并删掉
      this.events[eventName] = callbacks.filter((cb) => cb !== callback)
    }
  }
}
/* 使用示例 */
// 1. 初始化
const bus = new EventEmitter()

// 2. 订阅 (on)：有人要听 "click" 事件
const fn1 = (msg) => console.log('Message 1:', msg)
bus.on('click', fn1)

// 3. 发布 (emit)：触发 "click"，并传参
bus.emit('click', 'Hello World!')
// 输出: Message 1: Hello World!

// 4. 取消 (off)：fn1 不想听了
bus.off('click', fn1)

// 再次发布
bus.emit('click', 'Hi')
// 没输出了，因为 fn1 被移除了
