/*
 * 核心原理：Object.prototype.toString.call(value) 返回 "[object Type]"
 * 我们只需要把 "Type" 截取出来并转为小写即可
function getType(value) {
  // 1. 对于 null 和 undefined，直接用 String() 转换最快
  if (value === null || value === undefined) return String(value)
  // 2. 引用类型用 Object.prototype.toString 获取 是JS 里最可靠的内置类型判断方式，返回规范"[object 内部类型名]" 
  // 比如 "[object Array]" -> 截取下标 8 到 -1 -1是截取到倒数第一位（不包含）-> "Array" -> 转小写 "array"
  // 注意：typeof function 也是 "function"，这里直接统一处理更简单
  return typeof value === "object" || typeof value === "function" 
    ? Object.prototype.toString.call(value).slice(8, -1).toLowerCase() 
    : typeof value
}
} */

function getType(value) {
  //返回字符串
  if(value === null || value === undefined) return String(value)
  //typeof遇上函数时会返回function
  return typeof value === 'object' || typeof value === 'function'
  ? Object.prototype.toString.call(value).slice(8,-1).toLowerCase()
  : typeof value
}