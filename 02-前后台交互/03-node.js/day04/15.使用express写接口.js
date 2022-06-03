// 导入 express
const express = require("express");
// 创建服务器实例
const app = express();

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 必须在配置 cors 中间件之前，配置 JSONP 的接口，
// 否则JSONP 接口会被处理成开启了 CORS 的接口。
// 需要手动加上/api，因为jsonp路由并不会被全局中间件统一注册
app.get("/api/jsonp", (req, res) => {
  // TODO: 定义 JSONP 接口具体的实现过程
  // 1. 获取客户端发送过来的回调函数的名称
  const funcName = req.query.callback;
  // 2. 定义要通过 JSONP 格式发送到客户端的数据对象
  const data = { name: "zs", age: 22 };
  // 3. 根据前两步得到的数据，拼接出一个函数调用的字符串
  const scriptStr = `${funcName}(${JSON.stringify(data)})`;
  // 4. 把拼接的字符串，响应给客户端的 <script> 标签进行解析执行</script>
  res.send(scriptStr);
});

/* 
CORS （Cross-Origin Resource Sharing，跨域资源共享）由一系列 HTTP 响应头组成，这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源。
① CORS 主要在'服务器端'进行配置。客户端'浏览器无须做任何额外的配置'，即可请求开启了 CORS 的接口。
② CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服
务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。
*/

// 一定要在路由之前，配置 cors 这个中间件，从而解决接口跨域的问题
const cors = require("cors");
app.use(cors());

// 导入路由模块
const router = require("./16.apiRouter");
// 把路由模块，注册到 app 上
app.use("/api", router);

// 启动服务器
app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
