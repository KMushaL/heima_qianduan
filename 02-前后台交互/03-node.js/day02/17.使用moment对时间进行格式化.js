// 1. 导入需要的包
// 注意：导入的名称，就是装包时候的名称
const moment = require("moment");

// moment()得到当前时间
const dt = moment().format("YYYY-MM-DD HH:mm:ss");
console.log(dt);

// node_modules 文件夹用来存放所有已安装到项目中的包。require() 导入第三方包时，就是从这个目录中查找并加载包。
// package-lock.json 配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等。
// 注意：程序员不要手动修改 node_modules 或 package-lock.json 文件中的任何代码，npm 包管理工具会自动维护它们。

/* 
npm 规定，在项目根目录中，必须提供一个叫做 package.json 的包管理配置文件。用来记录与项目有关的一些配置
信息。例如：
    项目的名称、版本号、描述等
    项目中都用到了哪些包
    哪些包只在开发期间会用到
    那些包在开发和部署时都需要用到
*/
/* 
遇到的问题：第三方包的体积过大，不方便团队成员之间共享项目源代码。
解决方案：共享时剔除node_modules
且在项目根目录中的 package.json 中记录项目中安装了哪些包。从而方便剔除 node_modules 目录之后，在团队成员之间共享项目的源代码。

今后在项目开发中，一定要把 node_modules 文件夹，添加到 .gitignore 忽略文件中。
*/

// npm init -y 创建package.json这个包管理配置文件
/* 
注意：
① 上述命令只能在'英文'的目录下成功运行！所以，项目文件夹的名称一定要使用英文命名，不要使用中文，不能出现空格。
② 运行 npm install 命令安装包的时候，npm 包管理工具会自动把包的名称和版本号，记录到 package.json 中。
*/

// package.json 文件中，有一个 dependencies 节点，专门用来记录您使用 npm install 命令安装了哪些包。

// 在一个删除 node_modules 文件夹的项目中，可以使用可以运行 npm install 命令（或 npm i）一次性安装所有的依赖包

// 卸载包：npm uninstall 包名 ，命令执行成功后，会把卸载的包，自动从 package.json 的 dependencies 中移除掉。

/* 
1. 如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到 devDependencies 节点中。
   ① 通过使用简化命令 npm i 包名 -D 实现
   ② 或完整命令 npm i 包名 --save-dev
2. 与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中。
具体使用哪个，需要看包的官方文档
*/

// 包的package.json文件中 name，version，main 这三个属性，分别代表包的名字、版本号、包的入口
