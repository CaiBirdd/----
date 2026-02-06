/*
1.JS的API实现
const format = (n) => {
  return new Intl.NumberFormat().format(n)
}
2.toLocalString实现
const format = (n) => {
  return n.toLocaleString()
}
上面两种都是自动实现分割，传入数字就可以了
3.逻辑处理
function formatWithLoop(num) {
  // [integer, decimal] 使用 ES6 解构赋值。
  // 例子：如果是 1234.56 -> integer="1234", decimal="56"
  //       如果是 1234    -> integer="1234", decimal=undefined
  let [integer, decimal] = String(num).split('.')
  let result = ''
  let count = 0

  // 从整数部分的末尾开始遍历
  for (let i = integer.length - 1; i >= 0; i--) {
    count++
    // 为什么要写 integer[i] + result，而不是 result + integer[i]？
    // 因为我们是倒着遍历的！后拿到的字符（前面的高位），应该拼在最前面。
    // 例子：先拿到 '4' (result="4") -> 再拿到 '3' (result="34") -> 再拿到 '2' (result="234")
    result = integer[i] + result
    // 每满 3 位，且不是第一位，就加个逗号
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result
    }
  }

  return decimal ? `${result}.${decimal}` : result
}
console.log(formatWithLoop(1234567)) // "1,234,567"
*/
function formatWithLoop(num) {
  let [integer, decimal] = String(num).split('.')
  //拼好的字符串一点点存在这
  let result = ''
  //用来记录数了几个数
  let count = 0
  for(let i = integer.length - 1; i >= 0; i--){
    count++ //每处理一个字符+1
    result = integer[i] + result
    //判断加逗号的时机
    if(count % 3 === 0 && i !==0) {
      //逻辑同前，新的结果 = ',' + 旧的结果
      result = ',' + result
    }
  }
  //如果有小数，拼回小数部分，返回完整的 没有就返回处理好的整数部分
  return decimal ? `${result}.${decimal}` : result
}