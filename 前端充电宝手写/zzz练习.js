/*//instanceof
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype
  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
function Person() {}
const p = new Person()

console.log(myInstanceof(p, Person))

//new操作
function myNew(fn, ...args) {
  if (typeof fn !== 'function') {
    console.log('fn不是函数')
    return
  }
  const newObj = Object.create(fn.prototype)
  const result = fn.apply(newObj, args)
  return result instanceof Object ? result : newObj
}

//promise.all
function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable)
    //边界处理
    if (promises.length === 0) {
      resolve([])
      return
    }
    //变量定义
    const result = []
    let count = 0
    promises.forEach((item, i) => {
      Promise.resolve(item).then(
        value => {
          result[i] = value
          count++
          if (count === promises.length) {
            resolve(result)
          }
        },
        err => {
          reject(err)
        },
      )
    })
  })
}
 
//防抖
function debounce(fn, wait) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
 
//节流
function throttle(fn, delay) {
  let preTime = 0
  return function (...args) {
    let now = new Date.now()
    if (now - preTime >= delay) {
      preTime = now
      fn.apply(this, args)
    }
  }
}

//call函数
Function.prototype.myCall = function (context, ...args) {
  context = context === null || context === undefined ? window : Object(context)
  const fnKey = Symbol('fn')
  context[fnKey] = this
  const result = context[fnKey](...args)
  delete context[fnKey]
  return result
}

//apply函数
Function.prototype.myApply = function (context, args = []) {
  context = context === null || context === undefined ? window : Object(context)
  const fnKey = Symbol('fn')
  context[fnKey] = this
  const result = context[fnKey](...args)
  delete context[fnKey]
  return result
}

//bind函数
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('只有函数才能调用myBind')
  }
  const fn = this
  const boundFn = function (...newArgs) {
    const thisArg = this instanceof boundFn ? this : context
    return fn.apply(thisArg, [...args, ...newArgs])
  }
  if (fn.prototype) {
    boundFn.prototype = Object.create(fn.prototype)
  }
  return boundFn
}

//深拷贝
function deepClone(target, map = new Map()) {
  if (target === null || target !== 'object') {
    return target
  }
  if (map.has(target)) {
    return map.set(target)
  }
  const cloneTarget = Array.isArray(target) ? [] : {}
  map.set(target, cloneTarget)
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepClone(target[key], map)
    }
  }
  return cloneTarget
}


//实现数组的去重
const unique = (arr) => {
  return [...new Set(arr)]
}

//数组扁平化
const flatten = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
 
//url
function parseParams(url) {
  const queryStr = url.split('?')[1]
  if (!queryStr) return {}
  const paramsObj = {}
  queryStr.split('&').forEach(param => {
    if (!param.includes('=')) {
      paramsObj[param] = true
      return
    }
    let [key, value] = param.split('=')
    val = decodeURIComponent(val)
    val = /^\d+$/.test(val) ? parseFloat(val) : val
    if (paramsObj.hasOwnProperty(key)) {
      paramsObj[key] = [].concat(paramsObj[key], val)
    } else {
      paramsObj[key] = val
    }
  })
  return paramsObj
}

//千分位分割
function formatWithLoop(num) {
  let [integet, decimal] = String(num).split('.')
  let result = ''
  let count = 0
  for (let i = integet.length - 1; i >= 0; i--) {
    count++
    result = integet[i] + result
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result
    }
  }
  return decimal ? `${result}.${decimal}` : result
}

//循环红黄绿
const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration))
const red = () => console.log('Red')
const green = () => console.log('Green')
const yellow = () => console.log('Yellow')
const run = async () => {
  while (true) {
    red()
    await sleep(3000)
    green()
    await sleep(1000)
    yellow()
    await sleep(2000)
  }
}
run()

//每隔一秒打印1234 循环会很快（几乎瞬间）跑完 4 次。
for (let i = 1; i <= 4; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

//Promise.race
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject)
    }
  })
}

//类型判断函数
function getType(value) {
  if (value === null || value === undefined) return String(value)
  return typeof value === 'object' || typeof value === 'function'
    ? Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
    : typeof value
}

//函数柯里化
function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return (...newArgs) => curry(fn, ...args, ...newArgs)
  }
}

//Object.create
function create(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
 
//数组的乱序输出
function shuffle(arr) {
  let length = arr.length
  let temp
  while (length) {
    const randomIndex = Math.floor(Math.random() * length--)
    temp = arr[length]
    arr[length] = arr[randomIndex]
    arr[randomIndex] = temp
  }
  return arr
}

//es6求函数参数的和
function sum(...nums) {
  return nums.reduce((pre, cur) => pre + cur, 0)
}

//实现日期格式化函数
function dateFormat(dateInput, format) {
  const date = new Date(dateInput)
  const config = {
    yyyy: String(date.getFullYear()),
    MM: String(date.getMonth + 1).padStart(2, '0'),
    dd: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
  }
  for (const key in config) {
    format = format.replace(key, config[key])
  }
}

//JS对象转化为树形结构
function jsonToTree(data) {
  const result = []
  const map = {}
  data.forEach((item) => (map[item.id] = item))
  data.forEach((item) => {
    const parent = map[item.pid]
    if (parent) {
      (parent.children || (parent.children = []).push(item))
    } else {
      result.push(item)
    }
  })
  return result
}

//用 setTimeout 实现 setInterval
function mySetInterval(fn, t) {
  let timerId = null
  function interval() {
    fn()
    timerId = setTimeout(interval, t)
  }
  timerId = setTimeout(interval, t)
  return {
    cancel: () => clearTimeout(timerId),
  }
}

//循环引用的判断
function isCycleObject(obj, parent = []) {
  if (obj !== 'object' || obj === null) return false
  if (parent.includes(obj)) return true
  const newParent = [...parent, obj]
  for (const key in obj) {
    if ((isCycleObject(obj[key]), newParent)) return true
  }
}
 
//发布订阅模式
class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }
  emit(eventName, ...args) {
    const callbacks = this.events[eventName]
    if (callbacks) {
      callbacks.forEach((cb) => cb(...args))
    }
  }
  off(eventName, callback) {
    const callbacks = this.events[eventName]
    if (callbacks) {
      this.events[eventName] = callbacks.filter((cb) => cb !== callback)
    }
  }
}
*/
