// instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
/**
 * JavaScript 中的 instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
 * 它通过左侧对象 instanceof 右侧构造函数的形式，判断左侧是否为右侧的实例或继承自该类，并返回布尔值true或false`。
 * 常用于复杂类型（如数组、自定义对象）的类型判断
   这段代码的核心逻辑其实就是 "顺藤摸瓜"（顺着原型链往上找）。
   instanceof 的本质：判断右边构造函数的 prototype 属性，是否出现在左边对象的原型链上。
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left), // 获取对象的原型
      prototype = right.prototype; // 获取构造函数的 prototype 对象

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;

    proto = Object.getPrototypeOf(proto);
  }
}
 */

function myInstanceof(left,right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype

  while (true) {
    if(!proto) return false
    if(proto === prototype) return true

    proto = Object.getPrototypeOf(proto) //前面都没满足，往父级找
  }
}

//测试
// ...你的函数在上面...

function Person() {}
const p = new Person()

console.log(myInstanceof(p, Person)) // true (因为 p.__proto__ === Person.prototype)
console.log(myInstanceof(p, Object)) // true (因为 Person.prototype.__proto__ === Object.prototype)
console.log(myInstanceof(p, Array)) // false (原型链上没有 Array.prototype)
