


content = ripBom(content.toString())
var linenum = 1;
var pattern = /([\s\S]*?)<{\s*(([\*\/\w\"\'\.\[\]\$]+)[\b]*?[\s\S]*?)}>/gm;
var source = []
while (true) {
    var match = pattern.exec(content)
    if (!match) break;
    source.push(match[1])
    linenum += countChar(match[1], "\n");

    if(match[3] !== undefined && typeof syntax[match[3]] === "function"){
        source.push(syntax[match[3]](match[2], linenum))
    }else{
        source.push(syntax["default"](match[2], linenum, match[3]))
    }
    linenum += countChar(match[2], "\n");

}
console.log(source)

function countChar(str, char) {
    return str.split(char).length - 1;
}
