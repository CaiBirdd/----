/*

Object.create 是原型链继承的基石。它的作用是：创建一个新对象，让这个新对象的 __proto__ 指向你要继承的那个对象。
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


/*每隔-1-秒打印-1234 */
/* 方案 1：let (ES6) 
直接用 let 声明变量，每次循环都会生成一个新的块级作用域变量 i，完美解决问题。*/
for (let i = 1; i <= 4; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}


/* 发布-订阅模式 (EventEmitter) */
class EventEmitter {
  constructor() {
    // 仓库：{ 'click': [fn1, fn2], 'hover': [fn3] }
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
      callbacks.forEach(cb => cb(...args))
    }
  }
  
  // 取消订阅 (off) - 如果有余力最好写上
  off(eventName, callback) {
    const callbacks = this.events[eventName]
    if (callbacks) {
      // 找到那个 callback 并删掉
      this.events[eventName] = callbacks.filter(cb => cb !== callback)
    }
  }
  
  // 只执行一次 (once) - 锦上添花
  once(eventName, callback) {
    // 包装一下：先执行原来的 callback，这一行执行完了立刻把自己 off 掉
    const one = (...args) => {
      callback(...args)
      this.off(eventName, one)
    }
    this.on(eventName, one)
  }
}