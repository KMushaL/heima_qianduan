// 每个.js自定义模块中都有一个module对象，它存储了和当前模块有关的信息
// 在一个自定义模块中，默认情况下， module.exports = {}
// module变量代表当前模块，而其属性module.exports相当于一个对外的接口
// console.log(module);

// module.exports用于向外共享模块内的成员

const age = 20;

// 向 module.exports 对象上挂载 username 属性
module.exports.username = "zs";
// 向 module.exports 对象上挂载 sayHello 方法
module.exports.sayHello = function () {
  console.log("Hello!");
};
module.exports.age = age;

// 让 module.exports 指向一个'全新'的对象
module.exports = {
  nickname: "小黑",
  sayHi() {
    console.log("Hi!");
  },
};

// console.log(module);
