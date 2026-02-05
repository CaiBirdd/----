/*
Promise.race = function(promises) {
   // 返回一个新的 Promise
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      // resolve(p) 兼容普通值，确保是 Promise
      // then(resolve, reject)：
      // 我们给每个选手都注册了回调。
      // 当选手 p 成功时 -> 执行 resolve -> 改变外层的大 Promise 为成功
      // 当选手 p 失败时 -> 执行 reject  -> 改变外层的大 Promise 为失败
      Promise.resolve(p).then(resolve, reject)
    }
  })
}

谁快听谁的：它只关心第一个状态改变（Settled）的 Promise。
无论好坏：如果第一个 Promise 成功了，它就返回成功的值；如果第一个 Promise 失败了，它就返回失败的理由。
*/
Promise.race = function(promises) {
  return new Promise((resolve,reject) => {
    for( const p of promises){
      Promise.resolve(p).then(resolve,reject)
    }
  })
}