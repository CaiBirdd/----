/*
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url)
结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
  
function parseParam(url) {
  // 1. 提取 ? 后面的字符串
  const queryStr = url.split('?')[1]
  if (!queryStr) return {}
  
  const paramsObj = {}
  
  // 2. 分割并遍历
  queryStr.split('&').forEach(param => {
    // 处理无值情况 (keyed) -> 约定为 true
    if (!param.includes('=')) {
      paramsObj[param] = true
      return
    }
    
    let [key, val] = param.split('=')
    
    // 解码 + 转数字
    val = decodeURIComponent(val)
    val = /^\d+$/.test(val) ? parseFloat(val) : val
    
    // 处理数组 (key重复)
    if (paramsObj.hasOwnProperty(key)) {
      paramsObj[key] = [].concat(paramsObj[key], val)
    } else {
      paramsObj[key] = val
    }
  })
  
  return paramsObj
}
*/