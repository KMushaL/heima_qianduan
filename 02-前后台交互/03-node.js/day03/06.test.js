// 测试目录作为模块时的加载机制
// 会先寻找该目录下的package.json中定义的main入口所指向的文件
// 若没有，则会加载该目录下的index.js文件
require("./testm");
