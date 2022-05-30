// 初始时，exports与module.exports相同，即指向同一对象空间
// console.log(exports)
// console.log(module.exports)

// console.log(exports === module.exports); // true

const username = "zs";

module.exports.username = username;
exports.age = 20;
exports.sayHello = function () {
  console.log("大家好！");
};
// console.log(exports === module.exports); // true
// 此时exports仍与module.exports相同
// 因为上面只是挂载属性，并非指向了一个新的对象空间

module.exports = {
  age: 22,
}; // 指向新的对象空间

exports = {
  age: 25,
}; // 指向新的对象空间

// console.log(exports); // { age: 25 }
// console.log(module.exports); // { age: 22 }
// console.log(exports === module.exports); // false

// 最终，向外共享的结果，永远都是 module.exports 所指向的对象
// { age: 22 }，既不是 { username: 'zs', age: 20, sayHello: [Function (anonymous)] } 也不是 { age: 25 }

// 建议：不要在同一模块中同时使用exports和module.exports！
