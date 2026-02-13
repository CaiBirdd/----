/*
非负大整数相加和相乘

JavaScript对数值有范围的限制，限制如下：
Number.MAX_VALUE // 1.7976931348623157e+308
Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MIN_VALUE // 5e-324
Number.MIN_SAFE_INTEGER // -9007199254740991
对于大数，都整成字符串处理
（1）大数相加
指针版本
function add(a, b) {
  let i = a.length - 1, j = b.length - 1, carry = 0
  let res = ''
  while(i >= 0 || j >= 0 || carry) {
    const sum = carry + (+a[i--] || 0) + (+b[j--] || 0)
    //拼接结果 如果sum算出来是个两位数 那就要%10取个位 然后下面进1
    res = (sum % 10) + res
    //进位操作
    carry = Math.floor(sum / 10)
  }
  return res || '0'
}
（2）大数相乘
function multiply(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0'
  
  const len1 = num1.length, len2 = num2.length
  // 为什么是 len1 + len2？这是乘法的数学规律：
  // 2位数 * 2位数，结果最多是 4位数 (99*99=9801)
  // 2位数 * 3位数，结果最多是 5位数 (99*999=98901)
  // 结果最多为 len1 + len2 位
  // .fill(0) 很重要，因为后面我们要用 += 累加，如果不初始化为 0 就会 NaN。
  const res = new Array(len1 + len2).fill(0)
  
  // 外层循环：遍历 乘数 (num2) 的每一位，从个位开始
  // 比如 12 * 34，这里先取 4，再取 3
  for (let j = len2 - 1; j >= 0; j--) {
    // 内层循环：遍历 被乘数 (num1) 的每一位
    // 比如 12 * 34，先算 2*4, 1*4; 再算 2*3, 1*3
    for (let i = len1 - 1; i >= 0; i--) {
      // 核心公式不变：res[i+j+1] 是低位，res[i+j] 是高位（进位）
      // 这里的 += 是关键，因为可能之前已经算过这一位了，要累加
      const sum = res[i + j + 1] + num1[i] * num2[j]
      
      // 更新低位 (取余)
      res[i + j + 1] = sum % 10
      
      // 更新高位 (进位累加)
      res[i + j] += Math.floor(sum / 10)
    }
  }
  // 去除前导0
  while (res[0] === 0) res.shift()
  return res.length ? res.join('') : '0'
}
*/

//a和b都是字符串
function add(a, b) {
  //i和j指向a和b的最后一位 也就是个位 carry是进位
  let i = a.length - 1,
    j = b.length - 1,
    carry = 0
  let res = ''
  //有一个满足条件循环就继续
  while (i >= 0 || j >= 0 || carry) {
    const sum = carry + (+a[i--] || 0) + (+b[j--] || 0)
    res = (sum % 10) + res
    carry = Math.floor(sum / 10)
  }
  return res || '0'
}

function multiply(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0'
  const len1 = num1.length,
    len2 = num2.length
  const res = new Array(len1 + len2).fill(0)
  for (let j = len1 - 1; j >= 0; j--) {
    for (let i = len2 - 1; i >= 0; i--) {
      const sum = res[i + j + 1] + num1[i] * num2[j]
      //处理低位
      res[i + j + 1] = sum % 10
      //处理进位
      res[i + j] += Math.floor(sum / 10)
    }
  }
  //while循环去除行前面的0
  while (res[0] === 0) res.shift()
  return res.length ? res.join('') : '0'
}
