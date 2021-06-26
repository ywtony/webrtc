/**
 * WebRTC是一项时事通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，
 * 建立浏览器之间点对点的链接（Peer-toPeer），实现视频流和（或）音频流或者其他
 * 任意数据的传输。
 * WebRTC包含的 这些标准使用户在无需安装任何插件或者第三方软件的情况下，创建点对点的数据分享
 * 和电话会议成为可能。
 * 
 */
'use strict'

var localVideo = document.querySelector("video#localvideo");
var remoteVideo = document.querySelector("video#remotevideo");

var btnConn = document.querySelector("button#connserver");
var btnLeave = document.querySelector("button#leave");

var localStrea = null;
