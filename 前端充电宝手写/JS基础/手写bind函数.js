/*bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
// bind 函数实现
Function.prototype.myBind = function(context, ...args) {
  // 1. 容错处理
  if (typeof this !== "function") {
    throw new TypeError("Error: context must be a function")
  }
  // 保存当前的 this (也就是原函数 fn)
  const fn = this
  
  // 2. 返回一个新的函数
  const boundFn = function(...newArgs) {
    // 3. 核心判断：是 new 调用还是普通调用？
    // 如果是 new 调用，this 指向实例 (instanceof boundFn 为 true)
    // 此时忽略 context，将 this 指向实例本身
    const thisArg = (this instanceof boundFn) ? this : context
    
    // 执行原函数
    return fn.apply(thisArg, [...args, ...newArgs])
  }
  // 4. 维护原型关系 (非常重要！)
  // 让 boundFn 的实例也能访问到 fn 原型上的属性
  // 使用 Object.create 避免直接修改 boundFn.prototype 影响到 fn.prototype
  if (fn.prototype) {
    boundFn.prototype = Object.create(fn.prototype)
  }
  return boundFn
} */
Function.prototype.myBind = function(context,...args){
  //this指向原函数，判断调用的对象是否为函数
  if(typeof this !== 'function'){
    throw new TypeError('只有函数才能调用 myBind')
  }
  //保存原函数
  const fn = this
  //返回的新函数boundFn 这里没有立即执行
  const boundFn = function(...newArgs){
    //普通调用指向context，构造函数调用指向this新的实例
    const thisArg = (this instanceof boundFn) ? this : context
    //args是预设的newArgs是新传的
    return fn.apply(thisArg,[...args,...newArgs])
  }
  //如果new boundFn的话，确保能访问fn.prototype上的方法
  if(fn.prototype){
    boundFn.prototype = Object.create(fn.prototype)
  }
  return boundFn
}