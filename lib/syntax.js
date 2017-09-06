module.exports = {
    if: function (linenum, command) {
        return " linenum = " + linenum + "; if (" + command + ") {";
    },
    "/if": function (linenum, command) {
        return " linenum = " + linenum + "; }";
    },
    "else": function (linenum, command) {
        return " linenum = " + linenum + "} else {";
    },
    default: function (symbol, linenum, command) {
        //return "<{" + symbol + command + "}>";
    }
}