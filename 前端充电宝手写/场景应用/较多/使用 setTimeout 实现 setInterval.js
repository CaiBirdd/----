/*
//模拟 setInterval 
每隔多久就执行一次
function mySetInterval(fn, t) {
  //用来存放每一次 setTimeout 返回的那个 ID（就像是炸弹的拆除密码）。
  // 这个变量放在闭包里，让内部函数和外部都能访问到它。
  let timerId = null
  
  function interval() {
    fn()
     // 只有等上面的 fn 执行完（同步部分），这行才会执行。
     // 这就保证了“前浪死在沙滩上，后浪才出发”。
     // 注意：我们要更新 timerId，因为每次 setTimeout 都会生成一个新的 ID。
     // 递归调用：前一个执行完了，才设定下一个
    timerId = setTimeout(interval, t)
  }
  
  // 启动第一次 就像推到多米诺骨牌的第一张
  timerId = setTimeout(interval, t)
  
  // 返回取消函数 (这是最优雅的)
  return {
    cancel: () => clearTimeout(timerId)
  }
}

// 用法：
// const timer = mySetInterval(() => console.log(1), 1000)
// timer.cancel() // 停止

*/
function mySetInterval(fn, t) {
  let timerId = null
  function interval() {
    fn()
    timerId = setTimeout(interval, t)
  }
  timerId = setTimeout(interval, t)
  return {
    cancel: ()=> clearTimeout(timerId)
  }
}