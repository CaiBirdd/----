/*

实现jsonp
极简版 JSONP 
// url: 请求地址 (http://api.com/user)
// callbackName: 后端约定的参数名 (通常叫 callback, 有的叫 cb)
const jsonp = (url, callbackName = 'callback') => {
  return new Promise((resolve, reject) => {
     // 为了防止多个请求打架，我们要随机生成一个名字。
    // jsonp_1688123456789 (加时间戳最简单)
    const funcName = `jsonp_${Date.now()}`
    //造 script 标签
    const script = document.createElement('script')
    
    // 前端告诉后端：“我的接收函数叫 jsonp_1688...，你把数据塞这里面发给我”
    // 最终 URL: http://api.com/user?callback=jsonp_1688...
    // (注意：这里简化了，没处理 url 原本就有问号的情况，严谨点要判断是 ? 还是 &)
    script.src = `${url}?${callbackName}=${funcName}`
    
    // 核心：在 window 上等结果
     // 我们必须要把这个函数挂在 window 上，因为后端返回的代码是在全局作用域执行的。
    window[funcName] = (res) => {
      // 1. 后端返回的代码执行了，数据传进来了(res) -> Promise 成功！
      resolve(res)
      // 2. 清理战场 (过河拆桥)
      // 数据拿到了，刚才那个临时的 script 标签没用了，删掉。
      document.body.removeChild(script)
      // 全局函数也没用了，删掉，防止内存泄漏。
      delete window[funcName]
    }
    // 把 script 标签插到页面里，浏览器才会真正去发请求下载这个 JS 文件。
    // 一旦插入，网络请求就开始了。
    script.onerror = reject
    document.body.appendChild(script)
  })
}
  使用场景：
  jsonp('http://api.com/weather', 'cb')
  .then(data => {
    console.log('天气数据:', data)
  })
  .catch(err => {
    console.log('请求挂了')
  })
*/
/* 极简版 JSONP */
const jsonp = (url, callbackName = 'callback') => {
  return new Promise((resolve, reject) => {
    const funcName = `jsonp_${Date.now()}`
    const script = document.createElement('script')
    
    // 核心：把回调名告诉后端
    script.src = `${url}?${callbackName}=${funcName}`
    
    // 核心：在 window 上等结果
    window[funcName] = (res) => {
      resolve(res)
      document.body.removeChild(script)
      delete window[funcName]
    }
    
    script.onerror = reject
    document.body.appendChild(script)
  })
}