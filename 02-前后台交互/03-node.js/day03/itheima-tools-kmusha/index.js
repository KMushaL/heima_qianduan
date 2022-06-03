// 这是包的入口文件

const date = require("./src/dateFormat");
const escape = require("./src/htmlEscape");

// 向外暴露需要的成员
module.exports = {
  ...date, // ...作用是将date中所有的属性传递进来
  ...escape,
};
