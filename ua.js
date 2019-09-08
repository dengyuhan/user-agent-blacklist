//如果不是全局就得引入fs成员
const fs = require("fs");

let args = process.argv.splice(2)

function isIgnore(str) {
    for (let i = 0; i < args.length; i++) {
        if (str.indexOf(args[i]) !== -1) {
            return true
        }
    }
    return false
}

fs.readFile("./blacklist.txt", "utf-8", function (error, data) {
    let option = args.length > 0 ? args[0] : "cf"
    args.splice(0, 1);

    let array = new Array();

    let split = data.split("\n");
    for (let i = 0; i < split.length; i++) {
        if (isIgnore(split[i])) {
            console.log("忽略", split[i])
        } else {
            array.push(split[i])
        }
    }

    let str = ""
    for (let i = 0; i < array.length; i++) {
        if (option === "cf") {
            str += '(http.user_agent contains "' + array[i] + '")'
            if (i !== array.length - 1) {
                str += ' or '
            }
        } else if (option === "regx" || option === "apache") {
            str += array[i]
            if (i !== array.length - 1) {
                str += '|'
            }
        }
    }

    if (option === "apache") {
        let apache = "#屏蔽所有搜索引擎\n" +
            "RewriteEngine On\n" +
            "RewriteCond %{HTTP_USER_AGENT} \"" + str + "\" [NC]\n" +
            "RewriteRule .* - [R=404,L]"
        console.log(apache)
    } else {
        console.log(str)
    }
});
