const path = require("path")

var compile = require("../smarty")({
    "caching" : "helo",
    "template_dir" : path.resolve(__dirname + "/../tpl")
}).compile("test.html");

var options = {
    "abc" : {
        "xhello" : "world",
        "xvar" : "xxxxx"
    },
    "aa" : "worldddddd"
}

console.log(compile(options))

setTimeout(function () {
    console.log(compile(options))
    console.log("2")
}, 2000)