/**
 * 获取用户的媒体流案例代码
*/

/**
 * 多浏览器适配
 */
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//获取video标签
const localVideo = document.querySelector('video');

//创建MediaStreamConstraints，用于指定音频轨和视频轨
const constraints = { audio: false, video: {
    width:480,//宽
    height:320,//高
    frameRate:30,//帧率
    facingMode:'environment'//后置摄像头
} };
/**
 * 获取媒体流成功，并调用video标签的播放按钮展示
 * @param {流} stream 
 */
function successCallback(stream) {
    localVideo.srcObject = stream;
    localVideo.play();
}

/**
 * 出现异常时打印异常信息
 */
function errorCallback(error) {
    console.error("navigator.getUserMedia error:", error);
}
/**
 * 以下是获取用户媒体流的方法，设置约束条件以及成功和失败的回调函数
 * 
 */
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints).then(successCallback).catch(errorCallback);
} else {
    navigator.getUserMedia(constraints, successCallback, errorCallback);
}