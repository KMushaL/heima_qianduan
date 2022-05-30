const path = require("path");
const fs = require("fs");

// 注意：  ../ 会抵消前面的路径(抵消一层)
const pathStr = path.join("/a", "/b/c", "../", "./d", "e");
console.log(pathStr); // \a\b\d\e

// fs.readFile(__dirname + '/files/1.txt')

fs.readFile(
  path.join(__dirname, "./files/1.txt"), // 若用 + 路径就错了
  "utf8",
  function (err, dataStr) {
    if (err) {
      return console.log(err.message);
    }
    console.log(dataStr);
  }
);
