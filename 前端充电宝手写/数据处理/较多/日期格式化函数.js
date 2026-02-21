/*
实现日期格式化函数
dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日

const dateFormat = (dateInput, format) => {
  // 1. 兼容性处理：如果不是 Date 对象，尝试 new Date 转一下
  // 如果 dateInput 本身就是一个 Date 对象，new Date(Date对象) 还是它自己，没问题。
  // 如果 dateInput 是时间戳 (1609430400000) 或者日期字符串 ('2020-01-01')，
  // 这一行代码会把它变成真正的 Date 对象，方便后面调用 .getFullYear() 等方法。
  const date = new Date(dateInput)
  
  // 2. 配置对应关系（箭头函数自动补0）
  // 建立一个映射表
  // getMonth() 返回 0-11，所以必须 +1。
  // String(...): 转成字符串，为了使用 padStart。
  // .padStart(2, '0'): ES6 新语法。如果字符串长度不足2位，在前面补 '0'。
  const config = {
    'yyyy': date.getFullYear(),
    'MM': String(date.getMonth() + 1).padStart(2, '0'),
    'dd': String(date.getDate()).padStart(2, '0'),
    'HH': String(date.getHours()).padStart(2, '0'),
    'mm': String(date.getMinutes()).padStart(2, '0'),
    'ss': String(date.getSeconds()).padStart(2, '0')
  }
  
  // 3. 循环替换
  // 遍历 config 里的每一个 key (yyyy, MM, dd...)
  // 拿着 format 模板字符串，去把里面的 key 替换成真正的 value。
  // replace('yyyy', 2020)
  // replace('MM', '04')
  for (const key in config) {
    format = format.replace(key, config[key])
  }
  
  return format
}
  涉及的replace：
  语法： str.replace(target, replacement)
  target：你想找什么（可以是字符串，也可以是正则）。
  replacement：你想把它换成什么。
  比如：
  let str = "Hello World World"
  // 字符串作为 target
// 结果：Hello JS World (只换了第一个 World)
console.log(str.replace("World", "JS")); 
*/
const dateFormat = (dateInput, format) => {
  const date = new Date(dateInput)
  const config = {
    yyyy: date.getFullYear(),
    MM: String(date.getMonth + 1).padStart(2, '0'),
    dd: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
  }
  for (const key in config) {
    format = format.replace(key, config[key])
  }
  return format
}
