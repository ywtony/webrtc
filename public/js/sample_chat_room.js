////简易聊天室--->用于WebRTC信令服务的js文件

var roomId = document.querySelector("input#roomid");
var btn_connect = document.querySelector("button#connect");
var inputarea = document.querySelector("textarea#chat_content");
var msg = document.querySelector("input#msg_content");
var send_msg = document.querySelector("button#send");


var socket = io.connect("https://localhost:443")
/** 
 * 连接服务器
 */
btn_connect.onclick = function () {
    socket.emit('join', roomId.value);
}
/** 
 * 发送聊天消息
 */
send_msg.onclick = function () {
    socket.emit('message', roomId.value, msg.value);
}


/**
 * 接收服务端返回的消息
 */
socket.on('message', (room, id, data) => {
    inputarea.value += 'message,' +"room = "+ room+ ",id = "+ id+ ",data = " + data
});
socket.on('joined', function (room, id) {
    console.log(room + "|" + id);
    inputarea.value += (room + "|" + id);

});

socket.on('leaved', (room, id) => {
    inputarea.value += "leaved:" + (room + "|" + id);
    socket.disconnect();
});
socket.on('disconnect', (socket) => {
    inputarea.value += "disconnected";
})