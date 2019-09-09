## Node.js环境
```
brew install node
```

## 名单
[blacklist.txt](blacklist.txt)

## 运行
### 按行打印
```
node ua.js
```

### 打印CloudFlare
```
node ua.js cf
```

### 生成.htaccess
```
node ua.js apache
```

### 打印正则表达式
```
node ua.js regx
```

### 排除白名单
例：生成CloudFlare但排除Google、百度

```
node ua.js cf google baidu
```


## 输出结果
### CloudFlare
```
(http.user_agent contains "googlebot") or (http.user_agent contains "mediapartners-google") or (http.user_agent contains "adsbot-google") or (http.user_agent contains "baiduspider") or (http.user_agent contains "360spider") or (http.user_agent contains "haosouspider") or (http.user_agent contains "sosospider") or (http.user_agent contains "sogou spider") or (http.user_agent contains "sogou news spider") or (http.user_agent contains "sogou web spider") or (http.user_agent contains "sogou inst spider") or (http.user_agent contains "sogou spider2") or (http.user_agent contains "sogou blog") or (http.user_agent contains "sogou orion spider") or (http.user_agent contains "yodaobot") or (http.user_agent contains "youdaobot") or (http.user_agent contains "360spider") or (http.user_agent contains "bingbot") or (http.user_agent contains "slurp") or (http.user_agent contains "teoma") or (http.user_agent contains "ia_archiver") or (http.user_agent contains "twiceler") or (http.user_agent contains "msnbot") or (http.user_agent contains "scrubby") or (http.user_agent contains "robozilla") or (http.user_agent contains "gigabot") or (http.user_agent contains "yahoo-mmcrawler") or (http.user_agent contains "yahoo-blogs") or (http.user_agent contains "yahoo! slurp china") or (http.user_agent contains "yahoo!-adcrawler") or (http.user_agent contains "psbot") or (http.user_agent contains "yisouspider") or (http.user_agent contains "easouspider") or (http.user_agent contains "jikespider") or (http.user_agent contains "etaospider") or (http.user_agent contains "glutenfreepleasure")
```

### .htaccess
```
# .htaccess generated at github user-agent-blacklist
RewriteEngine On
RewriteCond %{HTTP_USER_AGENT} "googlebot|mediapartners-google|adsbot-google|baiduspider|360spider|haosouspider|sosospider|sogou spider|sogou news spider|sogou web spider|sogou inst spider|sogou spider2|sogou blog|sogou orion spider|yodaobot|youdaobot|360spider|bingbot|slurp|teoma|ia_archiver|twiceler|msnbot|scrubby|robozilla|gigabot|yahoo-mmcrawler|yahoo-blogs|yahoo! slurp china|yahoo!-adcrawler|psbot|yisouspider|easouspider|jikespider|etaospider|glutenfreepleasure" [NC]
RewriteRule .* - [R=404,L]
```

### 正则表达式
```
googlebot|mediapartners-google|adsbot-google|baiduspider|360spider|haosouspider|sosospider|sogou spider|sogou news spider|sogou web spider|sogou inst spider|sogou spider2|sogou blog|sogou orion spider|yodaobot|youdaobot|360spider|bingbot|slurp|teoma|ia_archiver|twiceler|msnbot|scrubby|robozilla|gigabot|yahoo-mmcrawler|yahoo-blogs|yahoo! slurp china|yahoo!-adcrawler|psbot|yisouspider|easouspider|jikespider|etaospider|glutenfreepleasure
```
