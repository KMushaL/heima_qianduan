// 导入 express 模块
const express = require("express");
// 创建 express 的服务器实例
const app = express();

// 总结：用户的信息通过 Token 字符串的形式，保存在客户端浏览器中（服务器不保存）。
// 服务器通过还原 Token 字符串的形式来认证用户的身份。

/* 
客户端收到服务器返回的 JWT 之后，通常会将它储存在 localStorage 或 sessionStorage 中。
此后，客户端每次与服务器通信，'都要带上'这个 JWT 的字符串，从而进行身份认证。
推荐的做法是把 JWT 放在 HTTP '请求头'的 Authorization 字段中，格式如下：
Authorization: Bearer <token>
如 Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjU0MDYxMTIxLCJleHAiOjE2NTQwNjExNTF9.q89PC6II6XKzXPXxiIefs1c_v6ddCBJpYfb59p24g4s
*/

// TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
const jwt = require("jsonwebtoken"); // 用于生成 JWT 字符串
const expressJWT = require("express-jwt"); // 用于将 JWT 字符串解析还原成 JSON 对象

// 允许跨域资源共享
const cors = require("cors");
app.use(cors());

// 解析 post 表单数据的中间件
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
/* 
为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的 secret 密钥：
① 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
② 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密
*/
const secretKey = "itheima No1 ^_^";

// 客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证。
// TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，'挂载到 req.user 属性上'
/* 
expressJWT({ secret: secretKey }) 就是用于解析 Token 的中间件
.unless({ path: [/^\/api\//] }) 用来指定哪些接口'不需要'访问权限，^代表以/api开头
*/
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }));

// 登录接口
app.post("/api/login", function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body;
  // 登录失败
  if (userinfo.username !== "admin" || userinfo.password !== "000000") {
    return res.send({
      status: 400,
      message: "登录失败！",
    });
  }
  // 登录成功
  // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前 token 的有效期
  // 记住：千万不要把密码加密到 token 字符中
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, {
    expiresIn: "30s",
  });

  /* 
  token字符串通常由三部分组成，从前到后分别是 Header（头部）、Payload（有效荷载）、Signature（签名）。三者之间使用英文的“.”分隔
  其中：
  ⚫ Payload 部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。
  ⚫ Header 和 Signature 是安全性相关的部分，只是为了保证 Token 的安全性。
  */
  res.send({
    status: 200,
    message: "登录成功！",
    token: tokenStr, // 要发送给客户端的 token 字符串
  });
});

// 当 express-jwt 这个中间件配置成功之后，即可在那些有权限的接口中，使用 req.user 对象，来访问从 JWT 字符串中解析出来的用户信息了
// 这是一个有权限的 API 接口
app.get("/admin/getinfo", function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user);
  res.send({
    status: 200,
    message: "获取用户信息成功！",
    data: req.user, // 要发送给客户端的用户信息
  });
});

/* 
当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行。
我们可以通过 Express 的错误中间件，捕获这个错误并进行相关的处理
*/
// TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效的token",
    });
  }
  // 其他原因导致的错误
  res.send({
    status: 500,
    message: "未知的错误",
  });
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
  console.log("Express server running at http://127.0.0.1:8888");
});
