/*
 实现 add(1)(2)(3) - 无限参数累加，无结束符版 
function add(num) {
 //保存初始值 必须用闭包！因为我们要一直记着 sum 的值，直到最后
  let sum = num
  //这个函数负责接收后面每一次调用传进来的参数 nextNum。
  //注意：这个 fn 会一直被返回，一直被调用
  const fn = (nextNum) => {
    sum += nextNum
    return fn // 链式调用：每一次都返回函数自己
  }
  // 按照上面的逻辑，最后一次得到的是 fn 这个函数本身。
  // 但是我们想要得到数字 sum。
  // JS 有个规则：当一个对象（fn也是对象）参与数学运算或者被打印时，如果重写了 toString/valueOf，就会优先用它们的结果。
  // 核心考点：重写 toString/valueOf
 // 这样，虽然它还是个函数，但在 console.log(fn) 时，它会偷偷变成 sum。
  fn.toString = () => sum
  fn.valueOf = () => sum // 双保险，有的环境偏向调用 valueOf
  
  return fn
}

// 测试
// console.log(+add(1)(2)(3)) // 6 (前面加个 + 强制转换成数字)
// alert(add(1)(2)(3)) // 6
*/
function add(num) {
  //这里用到了闭包
  let sum = num
  const fn = (nextNum) => {
    sum += nextNum
    return fn
  }
  fn.toString = ()=> sum
  fn.valueOf = ()=> sum
  return  fn

}