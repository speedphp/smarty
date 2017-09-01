const path = require("path")
var defaults = {
    template_dir: __dirname + path.sep + "tpl",
    escape_html: false,
    add_functions: {},
    caching: "auto"
}
var merge = function () {
    var obj = {}, i = 0, il = arguments.length, key;
    for (; i < il; i++) {
        for (key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                obj[key] = arguments[i][key];
            }
        }
    }
    return obj;
};
exports = module.exports = function (_config) {
    return merge(defaults, _config)
}