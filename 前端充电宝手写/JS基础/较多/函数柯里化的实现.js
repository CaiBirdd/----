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
  fn：要被柯里化的原函数
  ...args：第一次调用 curry 时，顺便传进来的参数（可选）
  ...args 叫“剩余参数”，会把多余参数收集成数组。
  (...newArgs) => ...：返回一个函数，等待下一次调用传入更多参数
  这个新函数里又调用 curry：
  ...args：之前收集的参数
  ...newArgs：这次新传入的参数
  组合成“累计参数”，递归地继续判断够不够。
  因为返回的箭头函数形成了闭包，它捕获了外层的 args。

*/
function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return (...newArgs) => curry(fn, ...args, ...newArgs)
  }
}
