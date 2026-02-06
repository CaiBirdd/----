/*
实现数组去重
给定某无序数组，要求去除数组中的重复数字并且返回新的无重复数组。
ES6方法（使用数据结构集合）：
const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8]

const unique = (arr) => {
  // 1. new Set(arr) -> 自动去重，得到一个 Set 对象
  // Set里的成员绝不重复
  // 2. [...Set] -> 使用扩展运算符，把 Set 变回数组
  // 相当于敲碎对象的“壳”
  return [...new Set(arr)]
}
 不用扩展运算符可以这么写：
 const unique = (arr) => Array.from(new Set(arr))
*/
const unique = (arr) => {
  return [...new Set(arr)]
}