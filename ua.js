//如果不是全局就得引入fs成员
const fs = require("fs")

let args = process.argv.splice(2)

function isIgnore (str) {
    for (let i = 0; i < args.length; i++) {
        if (str.indexOf(args[i]) !== -1) {
            return true
        }
    }
    return false
}

function readUserAgentFileList (...path) {
    const array = []
    path.forEach(async (it) => {
        const data = await fs.readFileSync(it, "utf-8")
        const split = data.split("\n")
        for (let i = 0; i < split.length; i++) {
            let it = split[i].trim()
            if (it.startsWith("#") || it.length <= 0) {

            } else if (isIgnore(it)) {
                console.info("忽略", it)
            } else {
                array.push(it)
            }
        }
    })
    return array
}

async function start () {
    let option = args[0]
    args.splice(0, 1)

    const array = await readUserAgentFileList('./china-search-spider.txt', './foreign-search-spider.txt', './blacklist.txt',)

    let str = ''
    if (option === "regx") {
        //正则表达式
        str = `/${array.join('|')}/i`
    } else if (option === "apache") {
        //apache
        str = array.join('|')
    } else if (option === "cf") {
        //CloudFlare
        for (let i = 0; i < array.length; i++) {
            str += '(http.user_agent contains "' + array[i] + '")'
            if (i !== array.length - 1) {
                str += ' or '
            }
        }
    } else {
        //换行
        str = '\n'
    }

    if (option === "apache") {
        let apache = "# .htaccess generated at github user-agent-blacklist\n" +
            "RewriteEngine On\n" +
            "RewriteCond %{HTTP_USER_AGENT} \"" + str + "\" [NC]\n" +
            "RewriteRule .* - [R=404,L]"
        fs.writeFile('./.htaccess', apache, function (err) {
            if (err) {
                throw err
            }
            console.log(apache)
        })
    } else {
        console.log(str)
    }
}

start()
