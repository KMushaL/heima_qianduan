// 导入 express 模块
const express = require("express");
// 创建 express 的服务器实例
const app = express();

// TODO_01：请配置 Session 中间件
const session = require("express-session");
app.use(
  session({
    secret: "itheima", // secret属性值可以为任意字符串
    resave: false, // 固定写法
    saveUninitialized: true, // 固定写法
  })
);

// 托管静态页面
app.use(express.static("./pages"));
// 解析 POST 提交过来的表单数据
app.use(express.urlencoded({ extended: false }));

// 登录的 API 接口
app.post("/api/login", (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== "admin" || req.body.password !== "000000") {
    return res.send({ status: 1, msg: "登录失败" });
  }

  // session是存在服务器端的，cookie是存在客户端的

  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  req.session.user = req.body; // 用户的信息
  req.session.islogin = true; // 用户的登录状态

  res.send({ status: 0, msg: "登录成功" });
});

// 从session中取数据
// 获取用户姓名的接口
app.get("/api/username", (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: "fail" });
  }
  res.send({
    status: 0,
    msg: "success",
    username: req.session.user.username,
  });
});

// 退出登录的接口
app.post("/api/logout", (req, res) => {
  // TODO_04：清空当前用户的 Session 信息
  req.session.destroy();
  res.send({
    status: 0,
    msg: "退出登录成功",
  });
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log("Express server running at http://127.0.0.1:80");
});

/* 
Session 认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，
所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域 Session 认证。
注意：
⚫ 当前端请求后端接口不存在跨域问题的时候，推荐使用 Session 身份认证机制。
⚫ 当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制。
*/
