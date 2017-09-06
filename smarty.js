const config = require("./lib/config")
function Smarty(_config) {
    var Smarty = new Object();
    Smarty.config = config.defaults;
    if (_config !== undefined) Smarty.config = config.merge(Smarty.config, _config);

    Smarty.compile = function (html) {
        return require("./lib/compile")(html, require("./lib/syntax"))
    }

    Smarty.readFile = function (filePath) {
        return require("./lib/readFile")(filePath, this.config);
    }

    Smarty.render = function (file, options, callback) {
        var filePath = Smarty.config.template_dir + file;
        var html = Smarty.readFile(filePath);
        var runable = Smarty.compile(html).join("");
        var $SMARTY_STR = "";
        eval(runable);
        callback(null, $SMARTY_STR)
    }


    /**
     * for expressjs
     */
    Smarty.express = function (filePath, options, callback) {
        var contents = this.readFile(filePath);
        var complied = this.compile(contents);
        var render = this.render(complied, options)
        callback(null, callback);
    }

    return Smarty;
}
exports = module.exports = Smarty