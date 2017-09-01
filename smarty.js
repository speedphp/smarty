
'use strict';
var Smarty = function (_config) {
    this._config = require("./lib/config")(_config);
}
Smarty.prototype.render = function () {

}

Smarty.prototype.compile = function () {

}

Smarty.prototype.readFile = function (filePath) {
    return require("./lib/readFile")(filePath, this._config);
}



/**
 * for expressjs
 */
Smarty.prototype.express = function (filePath, options, callback) {
    var contents = this.readFile(filePath);
    var complied = this.compile(contents);
    var render = this.render(complied, options)
    callback(null, callback);
}


module.exports = new Smarty()