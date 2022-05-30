const path = require("path");

// extname(路径)用于获取路径中的扩展名部分

// 这是文件的存放路径
const fpath = "/a/b/c/index.html";

const fext = path.extname(fpath);
console.log(fext); // .html
