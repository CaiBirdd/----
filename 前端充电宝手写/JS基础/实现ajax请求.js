/*实现AJAX请求
这里直接用Promise实现的
XMLHttpRequest 是基于回调的，写起来容易变成“回调地狱”（一层套一层）
Promise把它变成了链式调用 (.then)，甚至可以用 await，写起来像同步代码一样爽。
readyState 有 5 个状态 (0-4)：
0: 未初始化
1: 启动 (open 调用了)
2: 发送 (send 调用了)
3: 接收中 (数据在路上了)
4: 完成 (响应回来了) —— 我们只关心这个！

这就是一个标准的 AJAX 封装：

New 一个对象。
Open 开个口子。
Send 发出去。
Listen (onreadystatechange) 等结果。
最后用 Promise 把这一堆脏活累活包起来，对外提供一个干净的接口。

function myAjax(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    // 1. 创建对象
    const xhr = new XMLHttpRequest()
    
    // 2. 初始化请求 true表示异步
    xhr.open(method, url, true)
    
    // 3. 监听状态变化
    xhr.onreadystatechange = function() {
      // 0-4级状态，4代表完成
      if (this.readyState !== 4) return
      
      // 成功区间：200-299 或者是 304(缓存)
      //status是HTTP状态码 200是OK 304是NotModified
      if (this.status === 200 || this.status === 304) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    
    // 4. 设置失败监听 (网络错误等)
    xhr.onerror = function() {
      reject(new Error(this.statusText))
    }
    
    // 5. 设置响应类型 告诉浏览器，服务器返回是的json，自动转成对象，别给一坨字符串了
    //这样 this.response 拿到的直接就是 { name: '小明' }，不用你自己 JSON.parse 了。
    xhr.responseType = "json"
    
    // 6. 发送
    xhr.send(null)
  })
}
// 使用示例
// myAjax('/api/user').then(data => console.log(data)).catch(err => console.error(err))
*/
function myAjax(url,method = 'GET'){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest()
    xhr.open(method,url,true)
    //监听readyState的变化 
    xhr.onreadystatechange = function(){
      //如果还没完成，就什么都不做，继续等
      if(this.readyState!== 4) return
      //到了状态4
      if(this.status === 200 || this.status === 304) {
        resolve(this.response) //this.response是服务器返回的具体数据
      }else {
        //失败 比如404 500
        reject(new Error(this.statusText))
      }
    }
    //处理意外情况
    xhr.onerror = function() {
      reject(new Error(this.statusText))
    }
    //设置格式 
    xhr.responseType = 'json'
    //GET请求 body通常是null，post请求，这要放提交的数据字符串
    xhr.send(null)
  })
}