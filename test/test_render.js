const path = require("path")

var render = require("../smarty")({
    "caching" : "helo"
}).render;

var options = {
    "abc" : {
        "xhello" : "world",
        "xvar" : "xxxxx"
    },
    "aa" : "worldddddd"
}

var result = render(path.resolve(__dirname + "/../tpl/test.html"), options);

console.log(result)