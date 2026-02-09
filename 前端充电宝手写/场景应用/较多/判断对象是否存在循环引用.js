/*

const isCycleObject = (obj, parent = []) => {
  if (typeof obj !== 'object' || obj === null) return false
  
  // 在当前递归路径上查找是否出现过
   // parent 数组记录了“来时的路”（也就是所有祖先）。
  // 如果现在的这个 obj 在 parent 里出现过 -> 说明它是它自己的祖先 -> 循环引用！
  if (parent.includes(obj)) return true
  
  // 继续往下查，把当前 obj 加入路径
  // 把当前的 obj 加入到族谱里，传给下一代。
  // 注意：这里用了 [...parent, obj] 创建了一个新数组，
  // 这样每个分支的族谱是独立的，互不干扰（避免了回溯时的副作用）。
  const newParent = [...parent, obj]

   // 既然我自己没问题，那就看看我身体里的属性有没有问题。
  for (const key in obj) {
   // 递归调用：检查子属性 obj[key]，并把新的族谱 newParent 传下去。
  // 只要有一个属性返回 true（发现循环），那整棵树就判定为 true。
    if (isCycleObject(obj[key], newParent)) return true
  }
  
  return false
}
*/
const isCycleObject = (obj, parent = []) => {
  if(typeof obj !== 'object' || obj === null) return false
  if(parent.includes(obj))  return true
  const newParent = [...parent, obj]
  for(const key in obj) {
    if(isCycleObject(obj[key], newParent)) return true
  }
  return false
}