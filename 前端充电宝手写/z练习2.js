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
  return function (...agrs) {
    let now = Date.now()
    if (now - preTime >= delay) {
      preTime = now
      fn.apply(this, args)
    }
  }
}
//call
Function.prototype.myCall = function (context, ...args) {
  context = context === null || context === undefined ? window : Object(context)
  const fnKey = Symbol('fn')
  context[fnKey] = this
  const result = context[fnKey](...args)
  delete context[fnKey]
  return result
}
//apply
Function.prototype.myApply = function (context, agrs = []) {
  context = context === null || context === undefined ? window : Object(context)
  const fnKey = Symbol('fn')
  context[fnKey] = this
  const result = context[fnKey](...agrs)
  delete context[fnKey]
  return result
}
//bind
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('只有函数才能调用bind')
  }
  const fn = this
  const boundFn = function (...newArgs) {
    const thisArg = this instanceof boundFn ? this : context
    return fn.apply(thisArg, [...agrs, ...newArgs])
  }
  if (fn.prototype) {
    boundFn.prototype = Object.create(fn.prototype)
  }
  return boundFn
}
//new
function myNew(fn, ...args) {
  if (typeof fn !== 'function') {
    console.log('fn不是函数')
    return
  }
  const newObj = Object.create(fn.prototype)
  const result = fn.apply(newObj, ...args)
  return result instanceof Object ? result : newObj
}
//instanceof
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype
  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
//深拷贝
function deepClone(target, map = new Map()) {
  if (target === null || typeof target !== 'object') {
    return target
  }
  if (map.has(target)) {
    return map.get(target)
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
//promise.all
function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable)
    if (promises.length === 0) {
      resolve([])
      return
    }
    const result = []
    let count = 0
    promises.forEach((item, i) => {
      Promise.resolve(item).then(
        (value) => {
          result[i] = value
          count++
          if (promises.length === count) {
            resolve(result)
          }
        },
        (err) => {
          reject(err)
        }
      )
    })
  })
}
//数组去重
const unique = (arr) => {
  return [...new Set(arr)]
}
//数组扁平化
const flatten = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
//add(1)(2)(3)
function add(num) {
  let sum = num
  const fn = (nextNum) => {
    sum += nextNum
    return fn
  }
  fn.toString = () => sum
  fn.valueOf = () => sum
  return fn
}
//解析url params为对象
function parseParam(url) {
  const queryStr = url.split('?')[1]
  if (!queryStr) return {}
  const paramsObj = {}
  queryStr.split('&').forEach((param) => {
    if (!param.includes('=')) {
      paramsObj[param] = true
      return
    }
    let [key, val] = param.split('=')
    val = decodeURIComponent(val)
    val = /^\d+$/.test(val) ? parseFloat(val) : val
    if (paramsObj.hasOwnProperty(key)) {
      paramsObj[key] = [].concat(paramsObj[key], val)
    } else {
      paramsObj[val] = val
    }
  })
  return paramsObj
}
//数字千分位隔开
function formatWithLoop(num) {
  let [integer, decimal] = String(num).split('.')
  let result = ''
  let count = 0
  for (let i = integer.length - 1; i >= 0; i--) {
    result = integer[i] + result
    count++
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result
    }
  }
  return decimal ? `${integer}.${decimal}` : result
}
//循环打印红黄绿
const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration))
const Red = () => console.log('red')
const Green = () => console.log('green')
const Yellow = () => console.log('Yellow')
const run = async () => {
  while (true) {
    Red()
    await sleep(3000)
    Green()
    await sleep(1000)
    Yellow()
    await sleep(2000)
  }
}
run()
//每隔一秒打印1234
for (let i = 1; i <= 4; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
//Promise.race
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (const p in promises) {
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
//函数柯里化的实现
function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return (...newArgs) => curry(fn, [...agrs, ...newArgs])
  }
}
//Object.create
function myCreate(proto) {
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
//ES6函数参数求和
function sum(...args) {
  return args.reduce((pre, cur) => {
    return pre + cur
  }, 0)
}
//日期格式化
function dateFormat(dateInput, format) {
  const date = new Date(dateInput)
  const config = {
    yyyy: date.getFullYear(),
    MM: Stirng(date.getMonth() + 1).padStart(2, '0'),
    dd: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
  }
  for (const key in config) {
    format = format.replace(key, config[key])
  }
}
//将 JS 对象数组转化为树形结构
function jsonToTree(data) {
  const result = []
  const map = {}
  data.forEach((item) => (map[item.id] = item))
  data.forEach((item) => {
    const parent = map[item.pid]
    if (parent) {
      parent.children || (parent.children = []).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
//使用 setTimeout 实现 setInterval
function mySetInterval(fn, t) {
  let timer = null
  function interval() {
    fn()
    timer = setTimeout(interval, t)
  }
  timer = setTimeout(interval, t)
  return {
    cancel: () => clearTimeout(timer),
  }
}
//判断对象是否存在循环引用
function isCycleObject(obj, parent = []) {
  if (typeof obj !== 'object' || obj === null) return false
  if (parent.includes(obj)) return true
  const newParent = [...parent, obj]
  for (const key in obj) {
    if (isCycleObject(obj[key], newParent)) return true
  }
  return false
}
//发布-订阅模式
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
      this.events[eventName] = callback.filter((cb) => cb !== callback)
    }
  }
}
