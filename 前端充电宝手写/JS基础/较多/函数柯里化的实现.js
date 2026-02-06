/*
 * 函数柯里化 (Currying)
 * 核心逻辑：参数不够就存起来（递归），够了就执行。
 * 通俗理解：柯里化就是把一个“一次性要收齐所有参数”的函数，变成一个“可以分期付款”的函数。
function curry(fn, ...args) {
  // 1. 如果积累的参数长度 >= 函数需要的参数长度
  if (args.length >= fn.length) {
    // 直接执行原函数
    return fn(...args)
  } else {
    // 2. 参数不够，返回一个新的函数继续接收剩余参数 (...newArgs)
    return (...newArgs) => curry(fn, ...args, ...newArgs)
  }
}
*/
function curry(fn, ...args){
  if(args.length >= fn.length){
    return fn(...args)
  } else {
    return (...newArgs) => curry(fn, ...args ,...newArgs)
  }
}