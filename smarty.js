const config = require("./lib/config")
const path = require("path")
const cache = require("./lib/cache.js")

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
            file = Smarty.config.template_dir + path.sep + file;
        }
        var html = require("./lib/readFile")(file, Smarty.config);
        var runable = require("./lib/compile")(html, require("./lib/syntax")).join("");
        runable = 'var $SMARTY_STR="";' + runable + ';return $SMARTY_STR;';
        return function (options, callback) {
            if (options !== undefined && typeof options === "object" && options != {}) {
                var addoptions = "";
                for (var key in options) {
                    addoptions += "var ";
                    if (typeof options[key] !== "function") addoptions += "$";
                    addoptions += key + "= options." + key + ";";
                }
                runable = addoptions + runable;
            }
            runable = "try{" + runable + '}catch(error){throw new Error(error.message + \" in \" + tplpath + \" on line \" + linenum);}';
            var result = new Function("Smarty", "options", "tplpath", runable)(Smarty, options, file);
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
        var result = undefined;
        if (Smarty.config.caching === "freeze") {
            var options_plat = JSON.stringify(options);
            result = cache.get(file + options_plat);
            if (result === undefined) {
                result = Smarty.compile(file)(options);
                cache.set(file + options_plat, result);
            }
        } else {
            var compile = undefined;
            if (Smarty.config.caching === "compile") {
                compile = cache.get(file);
                if (compile === undefined) {
                    compile = Smarty.compile(file);
                    cache.set(file, compile);
                }
            } else {
                compile = Smarty.compile(file);
            }
            result = compile(options);
        }
        if (typeof callback === "function") {
            callback(null, result);
        } else {
            return result;
        }
    }
    return Smarty;
}


exports = module.exports = Smarty