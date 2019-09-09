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
    let option = args[0]
    args.splice(0, 1);

    let array = new Array();

    let split = data.split("\n");
    for (let i = 0; i < split.length; i++) {
        let it = split[i].trim()
        if (it.startsWith("#") || it.length <= 0) {

        } else if (isIgnore(it)) {
            console.log("忽略", it)
        } else {
            array.push(it)
        }
    }

    let str = ""
    for (let i = 0; i < array.length; i++) {
        if (option === "cf") {
            //CloudFlare
            str += '(http.user_agent contains "' + array[i] + '")'
            if (i !== array.length - 1) {
                str += ' or '
            }
        } else if (option === "regx" || option === "apache") {
            //正则表达式 Apache
            str += array[i]
            if (i !== array.length - 1) {
                str += '|'
            }
        } else {
            //换行
            str += array[i]
            if (i !== array.length - 1) {
                str += '\n'
            }
        }
    }

    if (option === "apache") {
        let apache = "# .htaccess generated at github user-agent-blacklist\n" +
            "RewriteEngine On\n" +
            "RewriteCond %{HTTP_USER_AGENT} \"" + str + "\" [NC]\n" +
            "RewriteRule .* - [R=404,L]"
        fs.writeFile('./.htaccess', apache, function (err) {
            if (err) {
                throw err;
            }
            console.log(apache)
        });
    } else {
        console.log(str)
    }
});
