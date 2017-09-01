


var syntax = {
    strip : function (source, linenum) {
        return source;
    },
    default : function (source, linenum, symbol) {
        return symbol;
    }
}

module.exports = syntax;