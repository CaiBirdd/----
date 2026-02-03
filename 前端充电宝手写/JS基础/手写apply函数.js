/*
call 一个个传参数：myCall(obj, a, b, c)
apply 传一个数组：myApply(obj, [a, b, c])
Function.prototype.myApply = function(context, args = []) {
  // 1. 容错处理：没传上下文就给 window，基本类型就包一层
  context = (context === null || context === undefined) ? window : Object(context)

  // 2. 独一无二的 key
  const fnKey = Symbol('fn')

  // 3. 挂载函数
  context[fnKey] = this

  // 4. 执行函数
  // 注意：apply 接收的是数组，但我们在执行 context.fn() 时，
  // 还是要用 ...args 把它拆开传给原函数
  // 之前设置了 args = []，所以这里不用担心 args 是 undefined
  const result = context[fnKey](...args)

  // 5. 还原现场
  delete context[fnKey]

  // 6. 返回结果
  return result
}
*/
Function.prototype.myApply = function(context,args=[]){
  context = (context === null || context === undefined) ? window : Object(context)

  const fnKey = Symbol('fn')

  context(fnKey) = this

  const result = context[fnKey](...args)

  delete context[fnKey]

  return result
}