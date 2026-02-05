/*// 三种状态常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.state = PENDING     // 状态
    this.value = undefined   // 成功值
    this.reason = undefined  // 失败原因
    this.onResolvedCallbacks = [] // 成功回调队列
    this.onRejectedCallbacks = [] // 失败回调队列

    // 成功函数 (箭头函数绑定 this)
    const resolve = (value) => {
      // 只有 pending 才能修改状态
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        // 执行队列里的回调
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    // 失败函数
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    // 立即执行 executor，并捕获错误
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  // 核心：then 方法
  then(onFulfilled, onRejected) {
    // 1. 参数默认值 (值穿透)
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    // 2. 必须返回一个新的 Promise (实现链式调用)
    return new MyPromise((resolve, reject) => {
      
      // 封装处理函数 (用来处理异步和返回值)
      const handle = (callback, data) => {
        try {
          // 模拟微任务 (核心！Promise 是异步的)
          setTimeout(() => {
            const x = callback(data)
            // 如果返回值是 Promise，等待它
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              // 普通值直接 resolve
              resolve(x)
            }
          })
        } catch (err) {
          reject(err)
        }
      }

      // 根据状态执行不同逻辑
      if (this.state === FULFILLED) {
        handle(onFulfilled, this.value)
      } else if (this.state === REJECTED) {
        handle(onRejected, this.reason)
      } else {
        // Pending 状态：存入队列，等 resolve/reject 触发时再执行
        this.onResolvedCallbacks.push(() => handle(onFulfilled, this.value))
        this.onRejectedCallbacks.push(() => handle(onRejected, this.reason))
      }
    })
  }
}*/

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
      if(this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if(this.state === PENDING){
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve,reject)
    }catch(err) {
      reject(err)
    }
  }
  then(onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
    return new MyPromise((resolve,reject) => {
      const handle = (callback,data) => {
        try {
          setTimeout(() => {
            const x = callback(data)
            if(x instanceof MyPromise) {
              x.then(resolve,reject)
            }else {
              resolve(x)
            }
          })
        } catch(err) {
          reject(err)
        }
      }
      if(this.state === FULFILLED) {
        handle(onFulfilled, this.value)
      }else if(this.state === REJECTED) {
        handle(onRejected,this.reason)
      } else {
        this.onResolvedCallbacks.push(()=> handle(onFulfilled,this.value))
        this.onRejectedCallbacks.push(()=> handle(onRejected,this.reason))
      }
    })
  }
}