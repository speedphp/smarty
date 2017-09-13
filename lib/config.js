const path = require("path")
exports = module.exports = {
    defaults : {
        template_dir: process.cwd() + path.sep + "tpl" + path.sep,
        escape_html: false,
        add_functions: {},
        encoding : "utf8",
        caching: "auto",
        _watched : false,
    },
    merge : function () {
        var obj = {}, i = 0, il = arguments.length, key;
        for (; i < il; i++) {
            for (key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    obj[key] = arguments[i][key];
                }
            }
        }
        return obj;
    }
}
