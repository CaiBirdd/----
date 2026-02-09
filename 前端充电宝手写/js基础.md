## JavaScript 基础

### 考察很多 (🔴 Legend 1)

1. **手写 instanceof 方法**

```javascript
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype

  while (true) {
    if (!proto) return false
    if (proto === prototype) return true

    proto = Object.getPrototypeOf(proto) // 前面都没满足，往父级找
  }
}
```

2. **手写 new 操作符**

```javascript
function myNew(fn, ...args) {
  if (typeof fn !== "function") {
    console.log('fn不是函数')
    return
  }
  const newObj = Object.create(fn.prototype)
  const result = fn.apply(newObj, args)
  return (result instanceof Object) ? result : newObj
}
```

3. **手写 Promise.all**

```javascript
function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    // Iterable是可迭代对象 只要能被for of 遍历的都叫Iterable 
    // 把一切像数组或者可迭代的东西强行变为一个真正的数组
    const promises = Array.from(iterable)
    // 边界情况
    if (promises.length === 0) {
      resolve([])
      return
    }
    // result是返回的结果
    const result = []
    let count = 0
    promises.forEach((item, i) => {
      // .then的意思是订阅结果 item是输入 value是经过异步等待后的输出 成功后传递出来的结果数据
      Promise.resolve(item).then(value => {
        result[i] = value
        count++

        if (count === promises.length) {
          resolve(result)
        }
      }, err => {
        reject(err)
      })
    })
  })
}
```

4. **手写防抖函数 (Debounce)**

```javascript
function debounce(fn, wait) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
```

5. **手写节流函数 (Throttle)**

```javascript
function throttle(fn, delay) {
  let preTime = 0
  return function(...args) {
    let now = Date.now()
    if (now - preTime >= delay) {
      preTime = now
      fn.apply(this, args)
    }
  }
}
```

6. **手写 call 函数**

```javascript
Function.prototype.myCall = function(context, ...args) {
  // 处理没对象的情况
  context = (context === null || context === undefined) ? window : Object(context)
  // 用symbol确保生成一个唯一的属性名
  const fnKey = Symbol('fn')
  // this就是那个函数本身，把这个函数，赋值给context对象的一个属性
  context[fnKey] = this
  // 执行函数
  const result = context[fnKey](...args)

  delete context[fnKey]

  return result
}
```

7. **手写 apply 函数**

```javascript
Function.prototype.myApply = function(context, args = []) {
  context = (context === null || context === undefined) ? window : Object(context)

  const fnKey = Symbol('fn')

  context[fnKey] = this

  const result = context[fnKey](...args)

  delete context[fnKey]

  return result
}
```

8. **手写 bind 函数**

```javascript
Function.prototype.myBind = function(context, ...args) {
  // this指向原函数，判断调用的对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('只有函数才能调用 myBind')
  }
  // 保存原函数
  const fn = this
  // 返回的新函数boundFn 这里没有立即执行
  const boundFn = function(...newArgs) {
    // 普通调用指向context，构造函数调用指向this新的实例
    const thisArg = (this instanceof boundFn) ? this : context
    // args是预设的newArgs是新传的
    return fn.apply(thisArg, [...args, ...newArgs])
  }
  // 如果new boundFn的话，确保能访问fn.prototype上的方法
  if (fn.prototype) {
    boundFn.prototype = Object.create(fn.prototype)
  }
  return boundFn
}
```

9. **实现 AJAX 请求**

```javascript
function myAjax(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    // 监听readyState的变化 
    xhr.onreadystatechange = function() {
      // 如果还没完成，就什么都不做，继续等
      if (this.readyState !== 4) return
      // 到了状态4
      if (this.status === 200 || this.status === 304) {
        resolve(this.response) // this.response是服务器返回的具体数据
      } else {
        // 失败 比如404 500
        reject(new Error(this.statusText))
      }
    }
    // 处理意外情况
    xhr.onerror = function() {
      reject(new Error(this.statusText))
    }
    // 设置格式 
    xhr.responseType = 'json'
    // GET请求 body通常是null，post请求，这要放提交的数据字符串
    xhr.send(null)
  })
}
```

10. **实现深拷贝**

```javascript
function deepClone(target, map = new Map()) {
  // 如果传进来的target是null或者不是对象，比如数字、字符串、布尔值等 没有深拷贝的必要，直接返回
  if (target === null || typeof target !== 'object') {
    return target
  }
  // 处理循环引用 如果拷贝过这个target对象，直接把上次拷贝好的传出
  if (map.has(target)) {
    return map.get(target)
  }
  // 根据target是数组还是对象，创建一个空的
  const cloneTarget = Array.isArray(target) ? [] : {}
  // 登记，target对应的是cloneTarget
  map.set(target, cloneTarget)
  // 遍历target中的每一个属性key
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepClone(target[key], map)
    }
  }
  return cloneTarget
}
```

### 考察较多 (🟠 Legend 2)

11. **手写 Promise**

```javascript
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    return new MyPromise((resolve, reject) => {
      const handle = (callback, data) => {
        try {
          // 利用 setTimeout 模拟微任务
          setTimeout(() => {
            const x = callback(data)
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          })
        } catch (err) {
          reject(err)
        }
      }
      if (this.state === FULFILLED) {
        handle(onFulfilled, this.value)
      } else if (this.state === REJECTED) {
        handle(onRejected, this.reason)
      } else {
        this.onResolvedCallbacks.push(() => handle(onFulfilled, this.value))
        this.onRejectedCallbacks.push(() => handle(onRejected, this.reason))
      }
    })
  }
}
```

12. **手写 Promise.then**

```javascript
// (这段代码其实跟上面 MyPromise 里的 then 是一样的，单独列出来复习)
// 请参考上面 MyPromise 类中的 then 方法实现。
```

13. **手写 Promise.race**

```javascript
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject)
    }
  })
}
```

14. **手写类型判断函数**

```javascript
function getType(value) {
  // 返回字符串
  if (value === null || value === undefined) return String(value)
  // typeof遇上函数时会返回function
  // [object Number] -> slice(8, -1) -> Number -> toLowerCase -> number
  return typeof value === 'object' || typeof value === 'function' ?
    Object.prototype.toString.call(value).slice(8, -1).toLowerCase() :
    typeof value
}
```

15. **函数柯里化的实现**

```javascript
function curry(fn, ...args) {
  // 如果参数个数够了，就执行
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    // 否则返回一个新函数，继续接收参数
    return (...newArgs) => curry(fn, ...args, ...newArgs)
  }
}
```