/* 使用ES6求函数参数的和
}
function sum(...nums) {
  //...剩余参数可以把参数收集起来变成一个标准数组
  // 比如传入sum(1,2,3) 转为[1,2,3]
  // reduce((acc, cur) => acc + cur, 0)
  return nums.reduce((pre, cur) => pre + cur, 0)
}
} */
function sum(...nums) {
  return nums.reduce((pre,cur) => pre + cur, 0)
}