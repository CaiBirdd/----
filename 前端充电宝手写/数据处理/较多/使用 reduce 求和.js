/*
 使用 reduce 求和
arr = [1,2,3,4,5,6,7,8,9,10]，求和
let arr = [1,2,3,4,5,6,7,8,9,10]
const sum = arr.reduce((pre, cur) => { 
  return pre + cur 
}, 0)


arr = [1,2,3,[[4,5],6],7,8,9]，求和
let arr = [1,2,3,4,5,6,7,8,9,10]
const sum = arr.flat(Infinity).reduce((pre, cur) => { 
  return pre + cur 
}, 0)


arr = [{a:9, b:3, c:4}, {a:1, b:3}, {a:3}]，求a属性的和
let arr = [{a:9, b:3, c:4}, {a:1, b:3}, {a:3}] 
const sum = arr.reduce((pre, cur) => {
    return pre + (cur.a || 0 )
}, 0)
*/