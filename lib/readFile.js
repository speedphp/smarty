const fs = require("fs")
const path = require("path")
const cache = require("./cache.js")

exports = module.exports = function (filePath, _config) {
    var cache_val = cache.get(filePath);
    if(cache_val === undefined){
        html = fileGetContents(filePath, _config);
        cache.set(filePath, {
            "mtime" : (_config.caching === "auto") ? fs.statSync(filePath)["mtimeMs"] : "none",
            "contents" : html
        });
        if(_config.caching === "watch" && _config._watched === false){
            fs.watch(_config.template_dir, {
                persistent: false
            }, function (eventType, filename) {
                var modify = _config.template_dir + path.sep + filename;
                cache.set(modify, undefined);
            });
            _config._watched === true;
        }
    }else{
        if(_config.caching === "auto"){
            var filemtime = fs.statSync(filePath)["mtimeMs"];
            if(cache_val["mtime"] != filemtime){
                html = fileGetContents(filePath, _config);
                cache.set(filePath, {
                    "mtime" : filemtime,
                    "contents" : html
                });
            }
        }

    }
    return html;
}

function fileGetContents(filePath, _config) {
    var template_dir = path.resolve(_config.template_dir);
    if(filePath.indexOf(template_dir) !== 0){
        throw new Error('"' + filePath + '" is not in the template directory')
    }
    var html = fs.readFileSync(filePath, _config.encoding);
    return (html.charCodeAt(0) === 0xFEFF) ? html.substr(1) : html;
}