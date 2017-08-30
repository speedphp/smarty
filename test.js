var fs = require('fs')
var filePath = "tpl/demo.tpl";


fs.readFile(filePath, function (err, content) {
    content = ripBom(content.toString())
    var linenum = 1;
    var pattern =  /([\s\S]*?)<{\s*(([\*\/\w\"\'\.\[\]\$]+)[\b]*?[\s\S]*?)}>/gm;
    var source = []
    while(true) {
        var match = pattern.exec(content)
        if (!match) break;
        source.push({
            linenum : linenum,
            type : "html",
            source : match[1]
        })
        linenum += match[1].split("\n").length-1;
        source.push({
            linenum : linenum,
            type : "code",
            source : match[2],
            head : match[3]
        })
        linenum += match[2].split("\n").length-1;

        // {
        //     linenum : 10, // 有多少个\n
        //     linetype : "html" // 或者是url，if等
        // }

    }

    console.log(source);

})


function ripBom(html) {
    return (html.charCodeAt(0) === 0xFEFF) ? html.substr(1) : html;
}

function fileGetContents(file) {
    id = path.join(defaults.base, id + defaults.extname);

    if (id.indexOf(defaults.base) !== 0) {
        // 安全限制：禁止超出模板目录之外调用文件
        throw new Error('"' + id + '" is not in the template directory');
    } else {
        try {
            return fs.readFileSync(id, defaults.encoding);
        } catch (e) {
        }
    }
}