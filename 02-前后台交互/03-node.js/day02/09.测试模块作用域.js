const custom = require("./08.模块作用域");

// 无法访问08模块内的变量、方法等成员，它们只能在模块内部被访问
// 作用域的好处：防止了全局变量污染的问题
console.log(custom); // {}
