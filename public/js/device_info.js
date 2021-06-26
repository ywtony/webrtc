//这种方式只有在chrome浏览器上有效，以内各个浏览器获取音视频权限的内部实现都不一样，所以这种方式在Safari和Firefox浏览器看不到设备名称
'use strict'

var audioSource = document.querySelector("select#audioSource");
var audioOutput = document.querySelector("select#audioOutput");
var videoSource = document.querySelector("select#videoSource");


if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("不支持获取设备信息");
} else {
    var ePromise = navigator.mediaDevices.enumerateDevices();
    ePromise.then(getMediaInfoSuccess).catch(getMediaInfoFail);
}


/**
 * 获取媒体信息成功
 */
function getMediaInfoSuccess(deviceInfos) {
    deviceInfos.forEach(function (deviceInfo) {
        console.log("设备种类：" + deviceInfo.kind);
        console.log("设备名称：" + deviceInfo.label);
        console.log("设备Id：" + deviceInfo.deviceId);
        console.log("groupId:" + deviceInfo.groupId);
        var option = document.createElement("option");
        option.text = deviceInfo.label;//deviceInfo.label有可能会获取不到
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === "audioinput") {
            option.text  = "音频输入设备";
            audioSource.appendChild(option);
        } else if (deviceInfo.kind === "audiooutput") {
            option.text = "音频输出设备";
            audioOutput.appendChild(option);
        } else if (deviceInfo.kind === "videoinput") {
            option.text = "视频输入设备";
            videoSource.appendChild(option);
        }
    });
}


/**
 * 获取媒体信息失败
 */
function getMediaInfoFail(err) {
    console.log(err.name + "|" + err.message);
}


/**
 * 获取媒体流
 */
function gotMediaStream(stream){

}