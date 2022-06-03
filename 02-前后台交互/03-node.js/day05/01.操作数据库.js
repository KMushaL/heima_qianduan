// 1. 导入 mysql 模块
const mysql = require("mysql");

// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: "127.0.0.1", // 数据库的 IP 地址
  user: "root", // 登录数据库的账号
  password: "www.1006", // 登录数据库的密码
  database: "my_db_01", // 指定要操作哪个数据库
});

// 调用 db.query() 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果

// 测试 mysql 模块能否正常工作
/* db.query('select 1', (err, results) => {
  // mysql 模块工作期间报错了
  if(err) return console.log(err.message)
  // 能够成功的执行 SQL 语句
  console.log(results)
}) */

// 查询 users 表中所有的数据
/* const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
  // 查询数据失败
  if (err) return console.log(err.message)
  // 查询数据成功
  // 注意：如果执行的是 select 查询语句，则执行的结果是数组
  console.log(results)
}) */

// 向 users 表中，新增一条数据，其中 username 的值为 Spider-Man，password 的值为 pcc123
/* const user = { username: 'Spider-Man', password: 'pcc123' }
// 定义待执行的 SQL 语句，?为占位符
const sqlStr = 'insert into users (username, password) values (?, ?)'
// 执行 SQL 语句
db.query(sqlStr, [user.username, user.password], (err, results) => {
  // 执行 SQL 语句失败了
  if (err) return console.log(err.message)
  // 成功了
  // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
  // 可以通过 affectedRows 属性，来判断是否插入数据成功
  if (results.affectedRows === 1) {
    console.log('插入数据成功!')
  }
}) */

// 向表中新增数据时，如果数据对象的每个属性和数据表的字段'一一对应'，
// 则可以通过如下方式快速插入数据：
/* const user = { username: 'Spider-Man2', password: 'pcc4321' }
// 定义待执行的 SQL 语句
const sqlStr = 'insert into users set ?'
// 执行 SQL 语句
db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('插入数据成功')
  }
}) */

// 演示如何更新用户的信息
/* const user = { id: 6, username: 'aaa', password: '000' }
// 定义 SQL 语句
const sqlStr = 'update users set username=?, password=? where id=?'
// 执行 SQL 语句
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
  if (results.affectedRows === 1) {
    console.log('更新成功')
  }
}) */

// 更新表数据时，如果数据对象的每个属性和数据表的字段一一对应，
// 则可以通过如下方式快速更新表数据：
/* const user = { id: 6, username: 'aaaa', password: '0000' }
// 定义 SQL 语句
const sqlStr = 'update users set ? where id=?'
// 执行 SQL 语句
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('更新数据成功')
  }
}) */

// 删除 id 为 5 的用户
/* const sqlStr = 'delete from users where id=?'
// 若SQL语句中只有一个占位符，则可以省略数组；若有多个，必须使用数组为每个占位符指定具体的值
db.query(sqlStr, 5, (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
  if (results.affectedRows === 1) {
    console.log('删除数据成功')
  }
}) */

// 标记删除
/* 
使用 DELETE 语句，会把真正的把数据从表中删除掉。
为了保险起见，推荐使用标记删除的形式，来'模拟'删除的动作。
所谓的标记删除，就是在'表中设置类似于 status 这样的状态字段'，来标记当前这条数据是否被删除。
当用户执行了删除的动作时，我们'并没有执行 DELETE 语句'把数据删除掉，而是'执行了 UPDATE 语句'，
将这条数据对应的 status 字段标记为删除即可。
*/
const sqlStr = "update users set status=? where id=?";
db.query(sqlStr, [1, 6], (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) {
    console.log("标记删除成功");
  }
});
