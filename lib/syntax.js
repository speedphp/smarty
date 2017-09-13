var word = "\\s*([\\w\\\"\\\'\\.\\[\\]\\$]+)[\\b]*?";
module.exports = {
    "*": function (linenum, command) {
        return " ";
    },
    "var": function (linenum, command) {
        return " ;linenum = " + linenum + "; var " + command + ";";
    },
    "if": function (linenum, command) {
        return " ;linenum = " + linenum + "; if (" + command + ") {";
    },
    "else": function (linenum, command) {
        return " ;linenum = " + linenum + "; } else {";
    },
    "/if": function (linenum, command) {
        return " ;linenum = " + linenum + "; }";
    },
    "break": function (linenum, command) {
        return " ;linenum = " + linenum + "; break;";
    },
    "continue": function (linenum, command) {
        return " ;linenum = " + linenum + "; continue;";
    },
    "for": function (linenum, command) {
        var return_str = " ;linenum = " + linenum + ";";
        var result_k = new RegExp(word + "\\s*in" + word, "i").exec(command)
        if (result_k !== null) {
            return_str += "for( " + result_k[1] + " in " + result_k[2] + ") {";
            return return_str;
        }
    },
    "include": function (linenum, command) {
        var result_in = new RegExp(word + "\\s*=" + word, "i").exec(command);
        return "$SMARTY_STR += (function(options){return Smarty.render(" + result_in[2] + ", options)})(options);";
    },
    "foreach": function (linenum, command) {
        var return_str = " ;linenum = " + linenum + ";";
        var result_kv = new RegExp(word + "\\s*as" + word + "\\s*=>" + word, "i").exec(command)
        if (result_kv !== null) {
            return_str += "for( " + result_kv[2] + " in " + result_kv[1] + ") {" +
                result_kv[3] + "=" + result_kv[1] + "[" + result_kv[2] + "];";
        } else {
            var result_k = new RegExp(word + "\\s*as" + word, "i").exec(command)
            if (result_k !== null) {
                return_str += "for( $_foreach_" + result_k[1] + " in " + result_k[1] + ") {" +
                    result_k[2] + "=" + result_k[1] + "[$_foreach_" + result_k[1] + "];";
            }
        }
        return return_str;
    },
    "/foreach": function (linenum, command) {
        return " ;linenum = " + linenum + "; }";
    },
    "/for": function (linenum, command) {
        return " ;linenum = " + linenum + "; }";
    },
    default: function (symbol, linenum, command) {
        var return_str = " ;linenum = " + linenum + ";";
        if (symbol.indexOf("$") === 0) {
            return_str += "$SMARTY_STR += " + symbol + ";";
        } else {
            if (command.length > 0) {
                var param = [];
                var pattern_param = new RegExp("\\s*([\\w]+)\\s*=" + word, "g")
                while ((result_param = pattern_param.exec(command)) !== null) {
                    param.push(result_param[1] + ":" + result_param[2])
                }
                return_str += "$SMARTY_STR += " + symbol + "({" + param.join(",") + "});";
            } else {
                return_str += "$SMARTY_STR += " + symbol + "();";
            }
        }
        return return_str;
    }
}