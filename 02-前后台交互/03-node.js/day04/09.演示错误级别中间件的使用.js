// 导入 express 模块
const express = require("express");
// 创建 express 的服务器实例
const app = express();

/* 
错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。
格式：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)。
注意：错误级别的中间件，必须注册在所有路由之后！
*/

// 1. 定义路由
app.get("/", (req, res) => {
  // 1.1 人为的制造错误
  throw new Error("服务器内部发生了错误！");
  res.send("Home page."); // 发生错误无法执行该行代码
});

// 2. 定义错误级别的中间件，捕获整个项目的异常错误，
// 从而'防止程序的崩溃'(就不会在客户端中打印错误页面)
app.use((err, req, res, next) => {
  console.log("发生了错误！" + err.message);
  res.send("Error：" + err.message);
  // 不需要next()
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log("Express server running at http://127.0.0.1");
});
