/*
实现双向数据绑定
Vue 3 Proxy 极简版
const input = document.getElementById('input')  // 演员A：输入框 (用户打字的地方)
const span = document.getElementById('span')  // 演员B：显示文字的地方 (span标签)

const obj = {} // 画外音：准备一个普通的 JS 对象，作为“幕后黑手”

//proxyObj 就是 obj 的“替身”。
//任何你想对 obj 做的事，都必须先经过 proxyObj。

// 1. 数据劫持 (Proxy)
// new Proxy(target, handler)
// target: 被代理的目标对象 (这里是 obj)。
// handler: 一个包含各种拦截操作（traps）的对象。
// 这里的 proxyObj 就是我们以后要操作的对象，而不是直接操作 obj。
const proxyObj = new Proxy(obj, {
  // 当你访问 proxyObj.text 时，这个 get 方法会被触发。
  // target: 原对象 (obj)
  // key: 你访问的属性名 ('text')
  // receiver: Proxy 实例本身 (这里没用到，但通常作为第三个参数)
  get(target, key) {
     // 最后必须把值交出去：直接返回原对象的值。
    return target[key]
  },
  // 当你写 proxyObj.text = 'hello' 时，这个 set 方法会被触发。
  // value: 你想赋的新值 ('hello')
  set(target, key, value) {
  //更新数据
    target[key] = value
    
    // 如果修改的是 text 属性，同时更新视图
    if (key === 'text') {
      input.value = value
      span.innerHTML = value
    }
    return true
  }
})

// 2. 视图 -> 数据 (监听输入)
// 给输入框绑定事件，当用户打字时，去修改 proxyObj。
// 注意：是修改 proxyObj，而不是 obj！
// 一旦 proxyObj 被修改，就会触发上面的 set 拦截器 -> 进而更新 span。
input.addEventListener('keyup', function(e) {
  proxyObj.text = e.target.value
})
  为什么说 Proxy 比 Object.defineProperty 强？
1.全代理：不需要像 Vue 2 那样遍历对象的每一个 key (Object.keys(obj).forEach...)，Proxy 直接把整个对象包起来，管你以后加什么新属性，统统拦住。
2.数组也能行：Vue 2 对数组的 push, pop 等操作无能为力（只能重写数组方法），但 Proxy 可以完美拦截数组索引的修改和 length 的变化。
这就是 Vue 3 响应式系统的基石。 “你不直接动数据，你动的是数据的替身（Proxy），替身帮你去动数据，顺便把视图也改了。
 */
const input = document.getElementById('input')
const span = document.getElementById('span')
const obj = {}

const proxyObj = new Proxy(obj,{
  get(target,key) {
    return target[key]
  },
  set(target,key,value) {
    target[key] = value
    if(key === 'text') {
      input.value = value
      span.innerHTML = value
    }
    return true
  }
})
input.addEventListener('keyup',function(e){
  proxyObj.text = e.target.value
})