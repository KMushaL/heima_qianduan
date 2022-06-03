// 导入 express 模块
const express = require("express");
// 创建 express 的服务器实例
const app = express();

// 1. 定义中间件函数
const mw1 = (req, res, next) => {
  console.log("调用了第一个局部生效的中间件");
  next();
};

const mw2 = (req, res, next) => {
  console.log("调用了第二个局部生效的中间件");
  next();
};

// 2. 创建路由
// 可省略中括号
app.get("/", [mw1, mw2], (req, res) => {
  res.send("Home page.");
});
app.get("/user", (req, res) => {
  res.send("User page.");
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log("Express server running at http://127.0.0.1");
});

/* 
了解中间件的5个使用注意事项
① 一定要在路由之前注册中间件
② 客户端发送过来的请求，可以连续调用多个中间件进行处理
③ 执行完中间件的业务代码之后，不要忘记调用 next() 函数
④ 为了防止代码逻辑混乱，调用 next() 函数后'不要再写额外的代码'
⑤ 连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象
*/
