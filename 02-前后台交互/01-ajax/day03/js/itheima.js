/**
 * 处理 data 参数
 * @param {data} 需要发送到服务器的数据
 * @returns {string} 返回拼接好的查询字符串如 name=zs&age=10
 */
function resolveData(data) {
  var arr = [];
  for (var k in data) {
    var str = k + "=" + data[k];
    arr.push(str);
  }

  return arr.join("&");
}

// var res = resolveData({ name: 'zs', age: 20 })
// console.log(res)

function itheima(options) {
  var xhr = new XMLHttpRequest();

  // 把外界传递过来的参数对象，转换为 查询字符串
  var qs = resolveData(options.data);

  if (options.method.toUpperCase() === "GET") {
    // 发起GET请求
    xhr.open(options.method, options.url + "?" + qs);
    xhr.send();
  } else if (options.method.toUpperCase() === "POST") {
    // 发起POST请求
    xhr.open(options.method, options.url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(qs);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText); // 将json反序列化为js对象
      options.success(result);
    }
  };
}
