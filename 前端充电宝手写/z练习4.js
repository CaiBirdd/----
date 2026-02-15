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
    let now = Date.now()
    if (now - preTime >= delay) {
      fn.apply(this, args)
      preTime = now
    }
  }
}
function throttle(fn, delay) {
  let preTime = 0
  return function (...args) {
    let now = Date.now()
    if (now - preTime >= delay) {
      fn.apply(this, args)
      preTime = now
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
Function.prototype.myApply = function (context, args = []) {
  context = context === null || context === undefined ? window : Object(context)
  const fnKey = Symbol('fn')
  context[fnKey] = this
  const result = context[fnKey](...args)
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
    return fn.apply(thisArg, [...args, ...newArgs])
  }
  if (fn.prototype) {
    boundFn.prototype = Object.create(fn.prototype)
  }
  return boundFn
}
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('只有函数才能调用bind')
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
//instaceof
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
  if (typeof target !== 'object' || target === null) return target
  if (map.has(target)) {
    return map.get(target)
  }
  const cloneTarget = Array.isArray(target) ? [] : {}
  for (const key in target) {
    //判断属性key是不是target上自带的属性
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepClone(target[key], map)
    }
  }
  return cloneTarget
}
//Promise.all
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
          if (count === promises.length) {
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
const uniquer = (arr) => {
  return [...new Set(arr)]
}
//扁平化
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
//add 1 2 3
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
//url
function parseParams(url) {
  const queryStr = url.split('?')[1]
  if (!queryStr) return {}
  const paramObj = {}
  queryStr.split('&').forEach((param) => {
    if (!param.includes('=')) {
      paramObj[param] = true
      return
    }
    let [key, val] = param.split('=')
    val = decodeURIComponent(val)
    val = /^\d+$/.test(val) ? parseFloat(val) : val
    if (paramObj.hasOwnProperty(key)) {
      paramObj[key] = [].concat(paramObj[key], val)
    } else {
      paramObj[key] = val
    }
    return paramObj
  })
}
//千分位隔开
function formatWithloop(num) {
  let [integer, decimal] = String(num).split('.')
  let result = ''
  let count = 0
  for (let i = integer.length - 1; i >= 0; i--) {
    count++
    result = integer[i] + result
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result
    }
  }
  return decimal ? `${integer}.${decimal}` : result
}
//循环打印红绿黄
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
const red = () => console.log('red')
const yellow = () => console.log('yellow')
const green = () => console.log('green')
async function run() {
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
//1234
for (let i = i; i <= 4; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
//promise.race
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject)
    }
  })
}
//类型
function getType(value) {
  if (value === null || value === undefined) return String(value)
  if (typeof value === 'object' || typeof value === 'function') {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
  } else {
    return typeof value
  }
}
//curry
function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return function (...newArgs) {
      curry(fn, ...args, ...newArgs)
    }
  }
}
//object.create
function myCreate(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
//数组乱序输出
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
//es6函数参数求和
function sum(...args) {
  return args.reduce((pre, cur) => {
    return pre + cur
  }, 0)
}
//日期格式
function formatDate(dateInput, format) {
  const date = new Date(dateInput)
  const config = {
    yyyy: date.getFullYear(),
    mm: String(date.getMonth() + 1).padStart(2, '0'),
    dd: String(date.getDate()).padStart(2, '0'),
  }
  for (const key in config) {
    format = format.replace(key, config[key])
  }
}
//js数组对象转树
function jsonToTree(data) {
  const result = []
  const map = {}
  data.forEach((item) => {
    map[item.id] = item
  })
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
//setinterval
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
//循环引用
function isCycleObject(obj, parent = []) {
  if (typeof obj !== 'object' || obj === null) return false
  if (parent.includes(obj)) return true
  const newParent = [...parent, obj]
  for (const key in obj) {
    if ((isCycleObject(obj[key]), newParent)) return true
  }
  return false
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
