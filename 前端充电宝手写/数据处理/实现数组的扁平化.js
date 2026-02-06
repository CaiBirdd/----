/*
 实现数组的扁平化：无论嵌套了多少层的数组，最后都变成一层
 例如：[1, [2, [3, 4]], 5] 目标结果：[1, 2, 3, 4, 5]
 
 * 核心逻辑：利用 reduce 累加器。
 * 如果当前项是数组 -> 递归调用 flatten 继续拍平
 * 如果当前项是普通值 -> 直接 concat 进数组
const flatten = (arr) => {
  // reduce 是数组最强大的武器，它的作用是：遍历数组，把每一次的结果“累加”起来。
  // 语法：arr.reduce(callback(pre, cur), initialValue)
  * 在每一轮循环中：
     * pre (也叫 acc/accumulator)：以前积累下来的结果（也就是我们要拼凑出的那个一维数组）。
     * cur (current)：当前正在遍历的这个元素。
  return arr.reduce((pre, cur) => {
  //concat连接用于合并两个或多个数组
  //例如：[1, 2].concat(3) -> [1, 2, 3] 
  //      [1, 2].concat([3, 4]) -> [1, 2, 3, 4]
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
  还有一种方法是直接用es6的flat
  flat 方法的语法：arr.flat([depth])
  其中 depth 是 flat 的参数，depth 是可以传递数组的展开深度（默认不填、数值是 1），即展开一层数组。如果层数不确定，参数可以传进 Infinity，代表不论多少层都要展开：
  let arr = [1, [2, [3, 4]]]
function flatten(arr) {
  return arr.flat(Infinity)
}
console.log(flatten(arr))//  [1, 2, 3, 4，5]
*/
const flatten = (arr) => {
  return arr.reduce((pre,cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  },[]) //reduce的初始值是个数组
}