const express = require("express");
const app = express();

// 在这里，调用 express.static(本地路径) 方法，快速的对外提供静态资源
app.use(express.static("./clock"));
// 上面可以将clock目录下的所有文件对外开放访问了
// 注意存放静态文件的目录名clock不会出现在url中，如url：localhost/index.html

// 挂载路径前缀
app.use("/files", express.static("./files"));
// 因为指定了/files，所以在url中需要加上/files才能访问该目录下的资源

// 托管多个静态资源时，先托管的优先访问静态资源

app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
