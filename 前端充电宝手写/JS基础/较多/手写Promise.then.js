/* 手写 Promise.then
then 方法返回一个新的 promise 实例，为了在 promise 状态发生变化时（resolve / reject 被调用时）再执行 then 里的函数，我们使用一个 callbacks 数组先把传给then的函数暂存起来，等状态改变时再调用。
 */

function then(onFulfilled,onRejected) {
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