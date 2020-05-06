const path = require("path");
module.exports = function (source) {
    if (path.basename(this.resourcePath) === "index.js") {
        // 我们约定好只有index.js才会注入注入加载代码
        //在每个index.js中引入index.html实现html热重载
        return (
            `if (process.env.NODE_ENV === "development") {
        require("raw-loader!./index.html"); 
    };` + source
        );
    }
    return source;
}