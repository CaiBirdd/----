/**
 * arr=[1,2,3,4,5,6,7,8,9,10]，求和
   arr=[1,2,3,[[4,5],6],7,8,9]，求和

方案 1：先扁平化再求和 (最稳健) 
// 利用 ES6 的 flat(Infinity) 直接拍平任意层级
let arr = [1, 2, 3, [[4, 5], 6], 7, 8, 9]
const sum = arr.flat(Infinity).reduce((pre, cur) => pre + cur, 0)
// console.log(sum) -> 45

方案 2：递归求和
const sum = (arr) => {
  return arr.reduce((pre, cur) => {
    // 如果当前项是数组，递归调用 sum 算出它的和，再加到 pre 上
    // 如果是数字，直接加
    return pre + (Array.isArray(cur) ? sum(cur) : cur)
  }, 0)
}
 */
const sum = (arr) => {
  return arr.reduce((pre,cur)=>{
    return pre + (Array.isArray(cur) ? sum(cur) : cur)
  },0)
}