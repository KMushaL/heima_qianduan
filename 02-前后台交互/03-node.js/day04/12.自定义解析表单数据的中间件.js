// 导入 express 模块
const express = require("express");
// 创建 express 的服务器实例
const app = express();
// 导入 Node.js 内置的 querystring 模块，专门用来处理查询字符串。通过这个模块提供的 parse() 函数，可以轻松把查询字符串，解析成对象的格式
const qs = require("querystring");

// 这是解析表单数据的中间件
app.use((req, res, next) => {
  // 定义中间件具体的业务逻辑
  // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
  let str = "";

  // 2. 监听 req 的 data 事件，获取客户端发送到服务器的数据。
  /* 
  如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。
  所以 data 事件可能会触发多次，每一次触发 data 事件时，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接
  */
  req.on("data", (chunk) => {
    str += chunk;
  });

  // 3. 监听 req 的 end 事件
  /* 
  当请求体数据接收完毕之后，会自动触发 req 的 end 事件。
  因此，我们可以在 req 的 end 事件中，拿到并处理完整的请求体数据
  */
  req.on("end", () => {
    // 在 str 中存放的是完整的请求体数据
    console.log(str);
    // TODO: 把字符串格式的请求体数据，解析成对象格式
    const body = qs.parse(str);
    // 上游的中间件和下游的中间件及路由之间，共享同一份 req 和 res。
    // 因此，我们可以将解析出来的数据，挂载为 req 的自定义属性，命名为 req.body，供下游使用
    req.body = body;
    next();
  });
});

app.post("/user", (req, res) => {
  res.send(req.body); // 可使用上游的中间件挂载的body属性
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log("Express server running at http://127.0.0.1");
});
