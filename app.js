var https = require('https');
var fs = require("fs");
var express = require('express');
var path = require('path');
var socketIo = require('socket.io');
var app = express();


const options = {
  key: fs.readFileSync('D:/wei.yang/tony/code/webrtc/openssl/key.pem'),
  cert: fs.readFileSync('D:/wei.yang/tony/code/webrtc/openssl/key-cert.pem')
};
//搭建一个可以发布静态资源供外部访问的简单服务
app.use(express.static(path.join(__dirname, 'public')));

var https_server = https.createServer(options, app);
/**socketio开始 */
//将socketio绑定到https_server服务--->这个地方用作WebRTC通讯的信令服务器以及业务数据传递服务器
var io = socketIo(https_server);

//进入房间人数
var users = [];
io.sockets.on('connection', (socket) => {
  //监听加入房间
  socket.on('join', (room) => {
    socket.join(room);
    users.push(room)
    console.log("目前房间人数：" + users.length);



    //目前支持两人通话
    if (users < 3) {
      socket.emit('joined', room, socket.id);
      if (users > 1) {
        socket.to(room).emit('otherjoin', room);
      }
    } else {
      socket.leave(room);
      socket.emit('full', room, socket.id);
    }


    // socket.emit('joined', room, socket.id);//通知房间内的所有人
    // socket.to(room).emit('joined',room,socket.id);//通知房间内除了自己以外的所有人
    // io.in(room).emit('joined',room,socket.id);//通知io节点上的所有房间内的所有人
    // socket.broadcast.emit('joined',room,socket.id);//通知除了自己，io节点上所有房间内的出自己外的所有人

  });
  /**
   * 监听客户端发送过来的消息
   * */
  socket.on('message', (room, data) => {
    console.log("房间：" + room + "|数据：" + data);
    // socket.emit('content',msg);//向客户端发送反馈消息
    //向所有已连接的的客户端进行广播
    socket.broadcast.emit('message', room, socket.id, data);
  })

  socket.on('leave', (room) => {

    console.log("leave,room=" + room + ",socket.id:" + socket.id);
    users = users.slice(0, users.length - 1);
    socket.leave(room);
    socket.to(room).emit('bye', room, socket.id);//房间内所有人,除自己外
    //socket.emit('leaved', room, socket.id);	
  });
  socket.on('disconnect', function () {
    users = users.slice(0, users.length - 1);
    //从房间中移除
    // socket.leave(roomId);
    // socketIo.to(roomId).emit('sys', roomId + '退出了房间');
  });
});

/**socketio结束 */
https_server.listen(443, function () {
  console.log("监听443端口");
});
https_server.on('error', function (err) {
  console.log("服务出现异常");
});

// https.createServer(options,app).listen(8888,function(){
//     console.log("监听8888端口");
// })
//ps:访问路径为http://localhost:8889/index.html