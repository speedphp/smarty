const http = require('http');
const path = require("path")
http.createServer(function (req, res) {

    if (req.url == "/favicon.ico") {
        res.end();
    } else {
        console.log("visit: " + req.url)
        var app = function () {

        }

        app.prototype.render = function render(name, options, callback) {
            var engine = new require("../smarty.js")({
                "caching": "freeze",
                "template_dir": path.resolve(__dirname + "/../tpl")
            }).render;
            var options = {
                "abc": {
                    "xhello": "world",
                    "xvar": "xxxxx"
                },
                "aa": "worldddddd"
            }
            engine("test.html", options, callback);
        }

        var toto = new app()

        toto.render("", "", function (err, rendered) {
            res.write(rendered)
            res.end();
        })
    }

}).listen(8000);

console.log("i am start!")
