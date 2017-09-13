const fs = require("fs")
function watch(){
    fs.watch('D:\\home\\smarty\\tpl', {
        persistent: false
    }, function (eventType, filename) {
        console.log("change:" + filename);
    })
}
function modify(){
    fs.writeFile('D:\\home\\smarty\\tpl\\demo.tpl', 'hello', function (err) {
        console.log('modify!');
    })
}
setTimeout(watch, 200)
//setTimeout(watch, 200)
setTimeout(modify, 600)

