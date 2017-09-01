const fs = require("fs")
const cache = require("cache")

exports = module.exports = function (filePath, _config) {





    
}



function ripBom(html) {
    return (html.charCodeAt(0) === 0xFEFF) ? html.substr(1) : html;
}

function mtime(file) {
    
}

function fileGetContents(file) {
    file = path.join(defaults.base, file + defaults.extname);

    if (file.indexOf(defaults.base) !== 0) {
        throw new Error('"' + file + '" is not in the template directory');
    } else {
        try {
            return fs.readFileSync(file, defaults.encoding);
        } catch (e) {
        }
    }
}