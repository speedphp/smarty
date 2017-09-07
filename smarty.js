const config = require("./lib/config")
const path = require("path")

function Smarty(_config) {
    var Smarty = new Object();
    Smarty.config = config.defaults;
    if (_config !== undefined) Smarty.config = config.merge(Smarty.config, _config);

    /**
     * 返回已编译函数表达式，执行函数时进行赋值并且执行
     * @param file 模板文件相对地址或绝对地址
     * @returns Function compile(options, [callback(err, result){}])
     */
    Smarty.compile = function (file) {
        if (!path.isAbsolute(file)) {
            file = Smarty.config.template_dir + file;
        }
        var html = require("./lib/readFile")(file, this.config);
        var runable = require("./lib/compile")(html, require("./lib/syntax")).join("");
        runable = 'var $SMARTY_STR="";' + runable + ';return $SMARTY_STR;';
        return function (options, callback) {
            if (options !== undefined && typeof options === "object" && options != {}) {
                var addoptions = "";
                for (var key in options) {
                    addoptions += "var ";
                    if (typeof options[key] !== "function") {
                        addoptions += "$";
                    }
                    addoptions += key + "= options." + key + ";";
                }
            }

            // TODO: try catch出错界面

            var result = new Function("options", "include", addoptions + runable)(options, include);
            if (typeof callback === "function") {
                callback(null, result);
            } else {
                return result;
            }
        }
    }

    /**
     * 渲染模板
     * @param file 模板文件相对地址或绝对地址
     * @param options 输入参数
     * @param callback 可选，结果回调[callback(err, result){}]
     * @returns 渲染执行结果
     */
    Smarty.render = function (file, options, callback) {
        var compile = Smarty.compile(file);
        var result = compile(options);
        if (typeof callback === "function") {
            callback(null, result);
        } else {
            return result;
        }
    }
    return Smarty;
}

var include = function (param) {
    return "";
}
exports = module.exports = Smarty