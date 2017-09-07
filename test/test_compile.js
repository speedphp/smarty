const path = require("path")

var compile = require("../smarty")({
    "caching" : "helo"
}).compile(path.resolve(__dirname + "/../tpl/test.html"));

var options = {
    "abc" : {
        "xhello" : "world",
        "xvar" : "xxxxx"
    },
    "aa" : "worldddddd"
}

console.log(compile(options))