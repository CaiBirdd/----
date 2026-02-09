/*
循环打印红黄绿
下面来看一道比较典型的问题，通过这个问题来对比几种异步编程方法：红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？
三个亮灯函数：
这道题复杂的地方在于需要“交替重复”亮灯，而不是“亮完一次”就结束了。
// 1. 定义一个通用的“睡一会儿”函数 
//new Promise(...)：必须要返回一个 Promise 对象，因为只有 Promise 对象才能配合后面的 await 关键字使用。
//setTimeout(resolve, duration)：利用浏览器的定时器。意思是：等 duration 毫秒后，请必须执行 resolve() 函数。
//resolve 是什么？它是 Promise 内部的一个开关。一旦执行 resolve()，这个 Promise 的状态就变成“完成（Fulfilled）”。
//配合 await： 当后面的 await sleep(1000) 执行时，代码会暂停在那一行，直到 Promise 变成“完成”状态（也就是 1000ms 后），才会继续往下走。这就完美模拟了“睡一会儿”的效果，且不会卡死界面。
const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration))

// 2. 定义打印函数 (模拟亮灯) 
const red = () => console.log('Red')
const green = () => console.log('Green')
const yellow = () => console.log('Yellow')

//3. 主流程控制 (强烈推荐这种 while(true) 写法) 
const run = async () => {
  // 在普通 JS 函数里写 while(true) 是大忌，会瞬间让浏览器崩溃（CPU 100%）。
   // 但在 async 函数里，只要循环体内部有 await，它就是安全的！
    while (true) {
        red()
        //await 它会暂停函数的执行，直到 sleep(3000) 返回的 Promise 解决（3秒后）。
        // 这期间，JS 引擎去处理别的任务了（渲染界面、点击事件等），所以不会卡死。
        await sleep(3000) // 亮3秒
        
        green()
        await sleep(1000) // 亮1秒
        
        yellow()
        await sleep(2000) // 亮2秒
    }
}

run()
*/
const sleep = (duration) => new Promise(resolve => setTimeout(resolve,duration))

const red = () => console.log('Red')
const green = () => console.log('Green')
const yellow = () => console.log('Yellow')

const run = async ()=>{
    while(true) {
      red()
      await sleep(3000)
      green()
      await sleep(1000)
      yellow()
      await sleep(2000)
    }
}
run()