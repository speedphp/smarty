exports = module.exports = function (html, syntax) {
    var linenum = 1;
    var pattern = /([\s\S]*?)<{\s*([\*\/\w\"\'\.\[\]\$]+)[\b]*?([\s\S]*?)}>/gm;
    var source = []
    var lastIndex = 0;
    while (true) {
        var match = pattern.exec(html)
        if (!match) break;
        lastIndex = pattern.lastIndex;
        source.push(packEcho(match[1]))
        linenum += countChar(match[1], "\n");

        if (match[2] !== undefined && typeof syntax[match[2]] === "function") {
            source.push(syntax[match[2]](linenum, match[3]))
        } else {
            source.push(syntax["default"](match[2], linenum, match[3]))
        }
        linenum += countChar(match[3], "\n");
    }
    source.push(packEcho(html.substring(lastIndex)))
    return source;
}

function packEcho(str) {
    if(str.length > 0){
        return "$SMARTY_STR += " + JSON.stringify(str) + ";";
    }
    return "";
}

function countChar(str, char) {
    return str.split(char).length - 1;
}

