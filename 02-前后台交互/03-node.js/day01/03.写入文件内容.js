// 1. 导入 fs 文件系统模块
const fs = require("fs");

// 2. 调用 fs.writeFile() 方法，写入文件的内容
//    (必选)参数1：表示文件的存放路径
//    (必选)参数2：表示要写入的内容
//    (可选)参数3：表示以什么格式写入文件内容，一般默认指定 utf8
//    (必选)参数4：回调函数
fs.writeFile("./files/3.txt", "ok123", function (err) {
  // 2.1 如果文件写入成功，则 err 的值等于 null
  // 2.2 如果文件写入失败，则 err 的值等于一个 错误对象
  // console.log(err)

  if (err) {
    return console.log("文件写入失败！" + err.message);
  }
  console.log("文件写入成功！");
});

// 注意：fs.writeFile() 方法只能创建文件，不能创建目录！
// 写入同一个文件时，内容会被覆盖
