/*
查找文章中出现频率最高的单词
function findMostWord(article) {
  if (!article) return
  
  // 1. 参数处理：转小写 -> 提取单词
  article = article.trim().toLowerCase()
  // article.match(/[a-z]+/g): 
  //    [a-z]: 匹配小写字母。
  //    +: 匹配 1 个或多个（连在一起的字母就是一个单词）。
  //    g: 全局匹配，找完一个继续找下一个。
  //    结果：返回一个数组 ["hello", "world", "hello"]。
  // || []: 如果一个单词都没找到（比如全是数字 "123"），match 会返回 null。为了防止后面forEach报错，我们要兜底给个空数组 []。
  const wordList = article.match(/[a-z]+/g) || []
  
  // 2. 也是一次遍历的同时打擂台
  // 我们用一个空对象 {} 来记录每个单词出现的次数。
  // 结构类似于：{ "hello": 2, "world": 1 }
  const visited = {} // 用对象当 Map
  let maxNum = 0
  let maxWord = ""
  
  wordList.forEach(word => {
    // 计数：如果没出现过就是 1，出现过就 +1
    if (!visited[word]) {
    //    问：visited 对象里有这个 keys 吗？或者它的值是 0/undefined 吗？
    //    答：没有。说明这是第一次遇到这个单词。
      visited[word] = 1
    } else {
      visited[word]++
    }
    
    // 把当前单词拉出来跟擂主比划比划
    if (visited[word] > maxNum) {
      maxNum = visited[word]
      maxWord = word
    }
  })
  
  return maxWord + "  " + maxNum
}
*/
function findMostWord(article) {
  if(!article) return
  article = article.trim().toLowerCase
  const wordList = article.match(/[a-z]+/g || [])
  const visited= {}
  let maxNum = 0
  let maxWord = ''
  wordList.forEach( word => {
    if(!visited[word]) {
      visited[word] = 1
    }else {
      visited[word]++
    }
    if(visited[word] > maxNum){
      maxNum = visited[word]
      maxWord = word
    }
  })
  return maxWord + ' ' + maxNum
}