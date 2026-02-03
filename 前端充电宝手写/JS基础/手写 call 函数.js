/*
  优化点：
  1. 使用 Symbol() 生成唯一属性名，防止覆盖 context 原有属性 (面试必考点)
  2. 使用 ...args 剩余参数，代码更简洁
  3. 增加对 context 为 null/undefined 的处理 指向 window
 
  什么是call？
  借用别人的方法，来处理自己的数据。
  call 就是 “借用”。它让一个对象可以借用另一个对象的方法，就像那方法是自己的一样。

Function.prototype.myCall = function(context, ...args) {
  // 1. 如果 context 是 null 或 undefined，默认指向全局对象 (window/global)
  // object会将基本类型包一层，如果本身是对象不做处理
  context = (context === null || context === undefined) ? window : Object(context)

  // 2. 生成一个独一无二的 key，防止覆盖 context 上原有的属性
  const fnKey = Symbol('fn')

  // 3. 把当前函数 (this) 挂载到 context 上
  context[fnKey] = this

  // 4. 执行函数，并拿到结果
  const result = context[fnKey](...args)

  // 5. 删掉临时属性，做到无痕操作
  delete context[fnKey]

  // 6. 返回结果
  return result
}
  */

//首行是挂在原型链上
Function.prototype.myCall = function(context,...args) {
  //处理没对象的情况
  context = (context === null || context === undefined) ? window : Object(context)
  //用symbol确保生成一个唯一的属性名
  const fnKey = Symbol('fn')
  //this就是那个函数本身，把这个函数，赋值给context对象的一个属性
  context[fnKey] = this
  //执行函数
  const result = context[fnKey](...args)

  delete context[fnKey]

  return result
}