/*
// 转换前：
source = [{
            id: 1,
            pid: 0,
            name: 'body'
          }, {
            id: 2,
            pid: 1,
            name: 'title'
          }, {
            id: 3,
            pid: 2,
            name: 'div'
          }]
// 转换为: 
tree = [{
          id: 1,
          pid: 0,
          name: 'body',
          children: [{
            id: 2,
            pid: 1,
            name: 'title',
            children: [{
              id: 3,
              pid: 1,
              name: 'div'
            }]
          }
        }]

function jsonToTree(data) {
  // 结果数组 用来存放所有的根节点（树的最顶层）。
  const result = []
    //构建map映射表 可以通过 id 瞬间找到对应的对象引用。
  const map = {}
  
  // 1. 先把所有项存进 map，方便 O(1) 查找
  // item.id 作为 Key，item 对象本身作为 Value。
  data.forEach(item => map[item.id] = item)
  
  // 2.再次遍历，找爹
  data.forEach(item => {
    const parent = map[item.pid]

    if (parent) {
      // 如果有爹，就作为孩子加入爹的 children
       // 这句的意思是：如果 parent 还没有 children 属性，就给它赋一个空数组 []；如果有，就直接用。
       // .push(item)：把我自己（item）塞进爸爸的 children 数组。
      // 关键点：因为 map[pid] 和 result[index] 指向的是内存里的同一个对象，
      // 所以这一步不仅更新了 map 里的父节点，也自动更新了树结构里的父节点！
      (parent.children || (parent.children = [])).push(item)
    } else {
      // 没爹，那就是根节点
      result.push(item)
    }
  })
  
  return result
}
*/
function jsonToTree(data) {
  const result = []
  const map = {}
  data.forEach(item=> map[item.id] = item)
  data.forEach(item=>{
    const parent = map[item.pid]
    if(parent) {
      (parent.children || (parent.children = [] ).push(item))
    }else {
      result.push(item)
    }
  })
  return result
}