/*
  优化点：
  1. 使用 Symbol() 生成唯一属性名，防止覆盖 context 原有属性 (面试必考点)
  2. 使用 ...args 剩余参数，代码更简洁
  3. 增加对 context 为 null/undefined 的处理 (指向 globalThis/window)

Function.prototype.myCall = function(context, ...args) {
  // 1. 如果 context 是 null 或 undefined，默认指向全局对象 (window/global)
  // 这里用 globalThis 是最安全的，兼容 Node 环境和浏览器
  context = (context === null || context === undefined) ? globalThis : Object(context)

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