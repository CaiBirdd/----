/*
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
parseParam(url)
结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
  
function parseParam(url) {
  // 1. 提取 ? 后面的字符串
  // url.split('?')：把 url 从问号处切两半。比如 "http://a.com?name=Jack" -> ["http://a.com", "name=Jack"]
  // [1]：取出后面那一半（也就是我们要处理的 query 字符串）。
  const queryStr = url.split('?')[1]
  if (!queryStr) return {}
  
  const paramsObj = {}
  
  // 2. 分割并遍历
  queryStr.split('&').forEach(param => {
    // 处理无值情况 (keyed) -> 约定为 true
    // 有些参数长这样："?enabled&debug=true"。其中的 "enabled" 没有等号。
    if (!param.includes('=')) {
      paramsObj[param] = true
      return // 处理完了，直接进入下一轮循环
    }
    
    // param.split('=')：比如 "name=Jack" -> ["name", "Jack"]
    // 解构赋值 let [key, val]：把数组的第一项给 key，第二项给 val。
    let [key, val] = param.split('=')
    
    // URL 里的中文通常会被编码成 %E5%8C%97%E4%BA%AC 这种。
    // decodeURIComponent(val)：把它还原成人类能读懂的中文（比如 "北京"）。
    val = decodeURIComponent(val)
    val = /^\d+$/.test(val) ? parseFloat(val) : val
    
      // 处理数组 (key重复)
      // 如果对象里已经有这个 key 了（说明之前遇到过）
      // [].concat(老值, 新值)：利用 concat 的特性。
      // 如果老值是 1，新值是 2 -> [1, 2]
      // 如果老值已经是 [1, 2]，新值是 3 -> [1, 2, 3] (concat 会自动拍平第一层数组)
    if (paramsObj.hasOwnProperty(key)) {
      paramsObj[key] = [].concat(paramsObj[key], val)
    } else {
      paramsObj[key] = val
    }
  })
  
  return paramsObj
}
*/

function parseParam(url) {
  //split方法把字符串转为数组 join把数组拼成字符串
  const queryStr = url.split('?')[1]
  if(!queryStr) return {}
  const paramsObj = {}
  queryStr.split('&').forEach(param => {
    if(!param.includes('=')){
      paramsObj[param] = true
      return
    }
    //分割key和value
    let [key,val] = param.split('=')
    //解码中文+转数字
    val = decodeURIComponent(val)
    val = /^\d+$/.test(val) ? parseFloat(val) : val
    //处理key重复问题
    if(paramsObj.hasOwnProperty(key)) {
      paramsObj[key] = [].concat(paramsObj[key],val)
    }else {
      paramsObj[key] = val
    }
  })
  return paramsObj
}