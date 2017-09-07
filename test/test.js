var app = function () {

}

app.prototype.render = function render(name, options, callback) {
    var engine = new require("./smarty.js")({
        "caching" : "helo"
    }).render;

    engine("test.html", {
        "title" : "标题",
        "message" : "内容"
    }, callback);
}

var toto = new app()

toto.render("", "", function (err, rendered) {
    console.log(rendered)
})


