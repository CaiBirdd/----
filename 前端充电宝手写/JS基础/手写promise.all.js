/*
想象你去肯德基点了一个套餐（汉堡 + 薯条 + 可乐）：
Promise.all 就是那个托盘。
你需要等 3 样东西全部做好，服务员才会把托盘递给你（resolve）。
只要其中任何一样东西卖光了/做坏了，服务员直接告诉你“抱歉这个套餐没了”（reject），哪怕汉堡已经做好了也不给你，因为套餐废了。

Promise.all 接收一组异步任务（Promise），只有当全部任务都成功时，它才成功；只要有一个失败，它就立刻失败。

function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    // 1. 转为数组（处理 Set/Map 等 Iterable，同时也做了拷贝防止副作用）
    const promises = Array.from(iterable)
    
    // 2. 边界情况：如果是空数组，直接返回成功
    if (promises.length === 0) {
      resolve([])
      return
    }

    const result = []
    let count = 0 // 计数器：记录成功的数量

    // 3. 遍历（推荐用 forEach，因为需要索引 i 来保证结果顺序）
    promises.forEach((item, i) => {
      // 重点：Promise.resolve 包一层。
      // 因为 item 可能是普通值（比如数字 1），不是 Promise
      Promise.resolve(item).then(value => {
        result[i] = value // 保证结果顺序和参数顺序一致！(不是完成顺序)
        count++

        // 只有全都成功了，才 resolve
        if (count === promises.length) {
          resolve(result)
        }
      }, err => {
        // 只要有一个失败，立刻 reject (Fail Fast)
        reject(err)
      })
    })
  })
}
   两个高频面试问题（用这套代码能答出来）
问：Promise.all 是串行还是并行？
答：是主要逻辑上的并行（并发）。代码里的 forEach 会在极短时间内把所有 Promise 都执行一遍（发起请求），然后各自等待结果，而不是等上一个完了才开始下一个。
问：传入数组 [p1, p2]，如果 p2 先完成，最后结果数组的顺序是？
答：顺序永远是 [p1的结果, p2的结果]。因为代码里用了 result[i] = value 强行锁定了位置。
*/
function myPromiseAll(iterable){
    return new Promise((resolve,reject)=>{
      //Iterable是可迭代对象 只要能被for of 遍历的都叫Iterable 
      // 把一切像数组或者可迭代的东西强行变为一个真正的数组
      const promises = Array.from(iterable)
      //边界情况
      if(promises.length === 0){
        resolve([])
        return
      }
      //result是返回的结果
      const result = []
      let count = 0
      promises.forEach((item,i)=>{
        //.then的意思是订阅结果 item是输入 value是经过异步等待后的输出 成功后传递出来的结果数据
        Promise.resolve(item).then(value =>{
          result[i] = value
          count++

          if(count === promises.length){
            resolve(result)
          }
        },err =>{
          reject(err)
        })
      })
    })
}
// --- 测试 ---
const p1 = new Promise(r => setTimeout(() => r('汉堡'), 2000))// 慢，2秒
const p2 = Promise.resolve('番茄酱') // 快，立即
const p3 = new Promise(r => setTimeout(() => r('可乐'), 1000)) // 中，1秒

myPromiseAll([p1, p2, p3]).then(res => {
    // 虽然番茄酱最快，可乐第二，汉堡最慢
    // 但打印结果依然严格按照传入顺序：
    console.log(res) // ["汉堡", "番茄酱", "可乐"]
})

// 测试失败情况
const pFail = Promise.reject('大厨罢工了')
myPromiseAll([p1, pFail]).catch(err => {
    console.log(err) // "大厨罢工了" (只要有一个失败，立刻炸)
})