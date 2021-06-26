var http = require('http');
var express = require('express');
var path = require('path');
var app = express();


//搭建一个可以发布静态资源供外部访问的简单服务
app.use(express.static(path.join(__dirname, 'public')));
//此处监听8889端口
app.listen(8888, function () {
    console.log("已监听到8889端口")
})
//ps:访问路径为http://localhost:8889/index.html
