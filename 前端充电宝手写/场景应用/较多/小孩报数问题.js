/*
有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
这是经典的 约瑟夫环 (Josephus Problem) 问题
思路： 想象大家在排队。

第一个人报数 1 -> 安全 -> 跑到队尾去排队。
第二个人报数 2 -> 安全 -> 跑到队尾去排队。
第三个人报数 3 -> 淘汰！ -> 直接踢出去，不让他排队了。
重复直到队列里只剩 1 个人。
//队列模拟法 (Queue Simulation) 
function childNum(num, count) {
    // 1. 初始化队列 [1, 2, 3 ... 30]
    let queue = []
    for (let i = 1; i <= num; i++) {
        queue.push(i)
    }
    
    // 2. 开始报数
    let counter = 1 // 现在的报数 (1, 2, 3...)
    
    while (queue.length > 1) { // 只要还剩多于 1 个人
        // 取出队头的人
        const person = queue.shift()
        
        if (counter === count) {
            // 数到 3 了：淘汰！(什么都不做，他就消失了)
            counter = 1 // 重置报数
        } else {
            // 还没数到 3：安全！回到队尾继续排
            queue.push(person)
            counter++
        }
    }
    
    // 3. 剩下的最后一个人
    return queue[0]
}
*/
function childNum(num,count) {
  let queue = []
  for(let i=1; i<=num; i++){
    queue.push(i)
  }
  let counter = 1
  while (queue.length > 1){
    //shift() 移除数组的第一个元素，并返回它
    const person = queue.shift()
    if(counter === count) {
      counter = 1
    }else {
      queue.push(person)
      counter++
    }
  }
  return queue[0]
}