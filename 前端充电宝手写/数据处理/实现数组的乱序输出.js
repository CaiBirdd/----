/*
 * 数组乱序 (洗牌算法 Fisher-Yates shuffle)
 * 核心逻辑：倒序遍历，每次从剩余未处理的元素中随机选一个，和当前的元素交换。

function shuffle(arr) {
  //假设length是5
  let length = arr.length
  // 专门用来在交换两个杯子里的水时，暂存其中一杯的水。
  let temp
  while(length) {
    //length是先用后减 Math.random()是生成一个[0,1)的随机小数
    //乘完后[0,5) Math.floor向下取整
    const randomIndex = Math.floor(Math.random() * length--)
    //注意这里的length是减1的了，也就是最后一个位置
    temp = arr[length]
    // 把“随机挑中的那个位置”的值，放到“最后一个位置”去
    arr[length] = arr[randomIndex]
    arr[randomIndex] =temp
  }
 return arr
}
}*/

function shuffle(arr) {
  let length = arr.length
  let temp
  while(length) {
    const randomIndex = Math.floor(Math.random() * length--)
    temp = arr[length]
    arr[length] = arr[randomIndex]
    arr[randomIndex] =temp
  }
 return arr
}