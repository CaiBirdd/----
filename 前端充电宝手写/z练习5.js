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
//new
function myNew(fn, ...args) {
  if (typeof fn !== 'function') {
    console.log('fn不是函数')
    return
  }
  const newObj = Object.create(fn.prototype)
  const result = fn.apply(this, newObj)
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
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if (map.has(target)) {
    return map.get(target)
  }
  const cloneTarget = Array.isArray(target) ? [] : {}
  map.set(target, cloneTarget)
  for (const key in target) {
    if (Object.prototype.hasOwnProperty(target, key)) {
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
    let result = []
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
const unique = (arr) => {
  return [...new Set(arr)]
}
//数组扁平化
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
//实现add(1)(2)(3)
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
//解析Url Params为对象
function parseParams(url) {
  const queryStr = url.split('?')[1]
  if (!queryStr) return {}
  const paramsObj = {}
  queryStr.split('&').forEach((param) => {
    if (!param.inclides('=')) {
      paramsObj[param] = true
      return
    }
    let [key, val] = param.split('=')
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
//数字千分位分隔开
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
  return decimal ? `${result}.${decimal}` : result
}
//循环打印红绿黄
function sleep(duration) {
  return new Promise((resolve) => {
    return setTimeout(resolve, duration)
  })
}
const red = () => console.log('red')
const green = () => console.log('green')
const yellow = () => console.log('yellow')
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
//每隔 1 秒打印 1,2,3,4
for (let i = 1; i <= 4; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
//手写 Promise.race
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject)
    }
  })
}
//手写类型判断函数
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
    return (...newArgs) => curry(fn, ...args, ...newArgs)
  }
}
//Object.create
function myCreate(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
//实现数组的乱序输出 (洗牌算法)
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
//使用ES6 求函数参数的和
function sum(...args) {
  return args.reduce((pre, cur) => {
    return pre + cur
  }, 0)
}
//实现日期格式化函数
function dateFormat(dateInput, format) {
  const date = new Date(dateInput)
  const config = {
    yyyy: date.getFullYear(),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    dd: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
  }
  for (const key in config) {
    format = format.replace(key, config[key])
  }
}
//将 JS 对象转化为树形结构
function jsonToTree(date) {}
