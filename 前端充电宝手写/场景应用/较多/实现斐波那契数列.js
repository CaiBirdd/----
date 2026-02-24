/*
实现斐波那契数列
//方案 1：迭代法 (时间O(n), 空间O(1)) 
// 数列长这样：0, 1, 1, 2, 3, 5, 8, 13, 21...
// 下标 n:    0, 1, 2, 3, 4, 5, 6...
// 这里的参数n就是传入的下标
function fibonacci(n) {
  if (n < 2) return n
  
  let pre1 = 0 // F(n-2)
  let pre2 = 1 // F(n-1)
  let current = 1
  
  // 从第 2 项开始算
  for (let i = 2; i <= n; i++) {
    current = pre1 + pre2
    pre1 = pre2
    pre2 = current
  }
  
  return current
}
  // 方案 2：递归 + 缓存 (解决重复计算问题) 
// 利用闭包缓存结果
const fibonacci = (() => {
  const cache = [0, 1] // 缓存前两个
  
  return function fn(n) {
    // 如果缓存里有，直接拿
    if (cache[n] !== undefined) return cache[n]
    
    // 没有就算，算完存进去
    const res = fn(n - 1) + fn(n - 2)
    cache[n] = res
    return res
  }
})()
*/
function fibonacci(n) {
  if (n < 2) return n
  let pre1 = 0
  let pre2 = 1
  let current = 1
  for (let i = 2; i <= n; i++) {
    current = pre1 + pre2
    pre1 = pre2
    pre2 = current
  }

  return current
}
