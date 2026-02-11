/*函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，
则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。
function debounce(fn, wait) {
  let timer = null
  //不知道用户会传入几个参数 含义：...args 的意思是不管你传多少个参数，统统打包放进一个叫 args 的数组里
  return function(...args) {
    // 每次触发，不管有没有旧定时器，直接清掉
    // 现代浏览器中，clearTimeout(undefined/null) 不会报错，所以无需判断
    clearTimeout(timer)
    
    // 箭头函数通过词法作用域向上寻找，自动绑定外层(return的那个函数)的 this
    //让 fn 内部的 this 指向当前环境的 this 当前环境是箭头函数 没有自己的this 所以会指向外层的this 也就是调用它的那个
    timer = setTimeout(() => {
      //确保指向的是调用的 比如这个函数是作为DOM时间回调触发，this就指向那个DOM元素
      fn.apply(this, args)
    }, wait)
  }
}
} */
function debounce(fn, wait) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
