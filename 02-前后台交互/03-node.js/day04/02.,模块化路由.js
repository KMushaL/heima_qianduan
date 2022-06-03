const express = require("express");
const app = express();

/* 
为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。
将路由抽离为单独模块的步骤如下：
① 创建路由模块对应的 .js 文件
② 调用 express.Router() 函数创建路由对象
③ 向路由对象上挂载具体的路由
④ 使用 module.exports 向外共享路由对象
⑤ 使用 app.use() 函数注册路由模块
*/

// 5. 导入路由模块
const router = require("./03.router");
// 6. 注册路由模块
app.use("/api", router);

// 注意： app.use() 函数的作用，就是来注册'全局'中间件
// 如 app.use('/files', express.static('./files'))
// http://127.0.0.1/api/user/list

app.listen(80, () => {
  console.log("http://127.0.0.1");
});
