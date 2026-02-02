/*
/**
 * 优化后的 ES6 版本
 * 优点：
 * 1. 使用 ...args 代替 arguments，无需截取参数，性能更好。
 * 2. 避免了修改 arguments 对象的副作用。
 * function myNew(fn, ...args) {
  // 1. 校验 (你的代码里有，这点很好)
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }

  // 2. 创建对象，指定原型
  // start: 创建一个新对象，并继承 fn.prototype  等价于如下内容
  //const newObj = {};
  //newObj.__proto__ = fn.prototype; // 但__proto__非标准，不推荐直接写
  const newObj = Object.create(fn.prototype);

  // 3. 绑定 this 并执行
  // start: 执行构造函数，并将 this 指向新对象
  //fn 请听好！你的 this 指向参数1，你的入参是参数2。
  const result = fn.apply(newObj, args);

  // 4. 返回结果
  // 逻辑：如果构造函数显式返回了对象/函数，则返回它；否则返回新创建的实例
  return (result instanceof Object) ? result : newObj;
}

// --- 测试用例 ---
function Person(name, age) {
  this.name = name;
  this.age = age;
  // 这里的 this 已经被 apply 指向了 newObj
}
Person.prototype.intro = function() {
  console.log(`我是 ${this.name}, 今年 ${this.age} 岁`);
}
// 1. 使用你的 myNew
const p1 = myNew(Person, "小明", 20);
console.log(p1.name); // "小明"
console.log(p1.age);  // 20
p1.intro();           // "我是 小明, 今年 20 岁" (成功访问到原型链)
console.log(p1 instanceof Person); // true
// 2. 测试带有返回值的构造函数
function Special() {
  this.a = 1;
  return { a: 999 };
}
const p2 = myNew(Special);
console.log(p2.a); // 999 (即使用了返回的对象，而不是实例)
 */
function myNew(fn,...args){
  if(typeof fn !== "function"){
    console.log('fn不是函数')
    return
  }
  const newObj = Object.create(fn.prototype)
  const result = fn.apply(newObj,args)
  return (result instanceof Object) ? result :newObj

}

