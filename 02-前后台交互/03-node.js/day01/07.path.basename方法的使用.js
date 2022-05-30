const path = require("path");

// basename(路径, [后缀名])可以从一个文件路径中获取到文件的名称部分

// 定义文件的存放路径
const fpath = "/a/b/c/index.html";

const fullName = path.basename(fpath);
console.log(fullName); // index.html

// 将后缀".html"删除
const nameWithoutExt = path.basename(fpath, ".html");
console.log(nameWithoutExt); // index
