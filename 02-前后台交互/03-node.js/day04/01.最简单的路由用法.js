const express = require("express");
const app = express();

// 在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。
// Express 中的路由分 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数，格式如下：
// app.METHOD(URL, HANDLER);

// 挂载路由
app.get("/", (req, res) => {
  res.send("hello world.");
});
app.post("/", (req, res) => {
  res.send("Post Request.");
});

app.listen(80, () => {
  console.log("http://127.0.0.1");
});
