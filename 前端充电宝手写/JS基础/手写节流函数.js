/*9. 手写节流函数
函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，
如果在同一个单位时间内某事件被触发多次，只有一次能生效。
节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。
// 函数节流的实现; 
function throttle(fn, delay) {
  let preTime = 0 // 初始为0，保证第一次触发时 (now - 0 > delay) 肯定会立即执行
  
  return function(...args) {
    let now = Date.now()
    
    // 如果距离上次执行超过了在这个间隔
    if (now - preTime >= delay) {
      preTime = now // 更新"上次执行时间"
      // 这里的 apply 和防抖里的一模一样：
      // 用当前的 this (比如DOM元素) 去执行 fn，并带上参数 args
      fn.apply(this, args)
    }
  }
}
一个对比：
防抖（Debounce）：你一直点，我就一直重新计时。只有你停下来，我才执行最后一次。
节流（Throttle）：你尽管点，但我按固定频率执行。比如设定 1000ms，哪怕你 1 秒内点了 100 次，我也只执行 1 次。
*/
function throttle(fn,delay){
  let preTime = 0
  return function(...agrs) {
    let now = Date.now()
    if(now - preTime >= delay){
      preTime = now
      fn.apply(this,agrs)
    }
  }
}