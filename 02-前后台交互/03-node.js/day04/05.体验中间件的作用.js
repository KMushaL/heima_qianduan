const express = require("express");
const app = express();

// 多个中间件之间，'共享'同一份 req 和 res。
// 基于这样的特性，我们可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

// 这是定义全局中间件的简化形式
app.use((req, res, next) => {
  // 获取到请求到达服务器的时间
  const time = Date.now();
  // 为 req 对象，挂载自定义属性，从而把时间共享给后面的所有路由
  req.startTime = time;
  next();
});

app.get("/", (req, res) => {
  res.send("Home page." + req.startTime);
});
app.get("/user", (req, res) => {
  res.send("User page." + req.startTime);
});

app.listen(80, () => {
  console.log("http://127.0.0.1");
});
