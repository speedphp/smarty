// const fs = require("fs")
// var smarty = exports = module.exports = function (filePath, options, callback) {
//     fs.readFile(filePath, function (err, content) {
//         if (err) return callback(err)
//         var rendered = content.toString().replace('#title#', '<title>' + options.title + '</title>')
//             .replace('#message#', '<h1>' + options.message + '</h1>')
//         return callback(null, rendered)
//     })
// }

'use strict';
var Smarty = function () {
    console.log('hello')
}
Smarty.prototype.tt = function tt() {
    for(var p in this){
        console.log(typeof this[p])
    }
}
module.exports = new Smarty()
//
// 初始化按配置拼装路径，调用ex过程渲染
//
// ex过程
// 检查文件存在和修改时间
//
//

