/**
  实现深拷贝
● 浅拷贝：浅拷贝指的是将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。浅拷贝可以使用  Object.assign 和展开运算符来实现。
● 深拷贝：深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。深拷贝对于一些对象可以使用 JSON 的两个函数来实现，但是由于 JSON 的对象格式比 js 的对象格式更加严格，所以如果属性值里边出现函数或者 Symbol 类型的值时，会转换失败
（1）JSON.stringify()
● JSON.parse(JSON.stringify(obj))是目前比较常用的深拷贝方法之一，它的原理就是利用JSON.stringify 将js对象序列化（JSON字符串），再使用JSON.parse来反序列化(还原)js对象。
● 这个方法可以简单粗暴的实现深拷贝，但是还存在问题，拷贝的对象中如果有函数，undefined，symbol，当使用过JSON.stringify()进行处理之后，都会消失。 
let obj1 = {  a: 0,
              b: {
                 c: 0
                 }
            };
let obj2 = JSON.parse(JSON.stringify(obj1));
obj1.a = 1;
obj1.b.c = 1;
console.log(obj1); // {a: 1, b: {c: 1}}
console.log(obj2); // {a: 0, b: {c: 0}}

可以写成这样的：
const deepCloneJSON = (obj) => JSON.parse(JSON.stringify(obj))
（2）函数库lodash的_.cloneDeep方法
该函数库也有提供_.cloneDeep用来做 Deep Copy
let _ = require('lodash');
let obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
let obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false
（3）浏览器原生版ES2022
const deepCloneNative = (obj) => structuredClone(obj)
（4）手写实现深拷贝函数
function deepClone(target, map = new Map()) {
  // 1. 基本类型直接返回
  if (target === null || typeof target !== 'object') {
    return target
  }
  
  // 2. 循环引用检查
  if (map.has(target)) {
    return map.get(target)
  }
  
  // 3. 初始化
  const cloneTarget = Array.isArray(target) ? [] : {}
  map.set(target, cloneTarget)
  
  // 4. 遍历 (最稳的写法)
  //hasOwnProperty的作用是：判断一个属性是不是你自己“亲生”的 如果是继承的就不拷贝
  //call是让this指向target
  for (const key in target) {
  //这行的作用就是判断属性key 是不是 target 身上自带的属性
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepClone(target[key], map)
    }
  }
  
  return cloneTarget
}
  在深拷贝里，我们用 Map 来做一个 “已拷贝名单”。
Key (钥匙)：是 原对象 (target)。
Value (值)：是 拷贝后的新对象 (cloneTarget)。
*/
function deepClone(target, map = new Map()) {
  //如果传进来的target是null或者不是对象，比如数字、字符串、布尔值等 没有深拷贝的必要，直接返回
  if (target === null || typeof target !== 'object') {
    return target
  }
  //处理循环引用 如果拷贝过这个target对象，直接把上次拷贝好的传出
  if (map.has(target)) {
    return map.get(target)
  }
  //根据target是数组还是对象，创建一个空的
  const cloneTarget = Array.isArray(target) ? [] : {}
  //登记，target对应的是cloneTarget
  map.set(target, cloneTarget)
  //遍历target中的每一个属性key
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      //如果是属性继续递归拆，如果不是会在当前代码开头返回
      cloneTarget[key] = deepClone(target[key], map)
    }
  }
  return cloneTarget
}
