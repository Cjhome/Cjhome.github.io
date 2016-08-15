var start, showDecode, jumpToDecode, lastTime, lastAcc, isStarted = false;
var media=document.getElementById("media");
new Image().src="images/bugua/decode.png";
new Image().src="images/bugua/234.png";

start = function() {
	isStarted = true;
	$('.decode').hide();
	$('.result').show();
	setTimeout(showDecode, 1500);
	media.play();
}

showDecode = function(){
	$('.result').hide();
	$('.decode').show();
	setTimeout(jumpToDecode, 3000);
}

jumpToDecode = function(){
	var urls = [
	"http://mp.weixin.qq.com/s?__biz=MzA4Nzc5NTU2Ng==&mid=207167687&idx=1&sn=e3d0501acc2c4c5d7ed1c3a7218b4d49#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA4Nzc5NTU2Ng==&mid=207173571&idx=1&sn=5e3a38d8337ec4e0f5ec2fec03969dca#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA4Nzc5NTU2Ng==&mid=207191606&idx=1&sn=9475596b7b3bc8b0d0b247f4b8bc7e0d#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA4Nzc5NTU2Ng==&mid=207191722&idx=1&sn=df991658f22b29974640db04ed6b7998#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA4Nzc5NTU2Ng==&mid=207191839&idx=1&sn=cd80db334a3972629f24f483441922b9#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA4Nzc5NTU2Ng==&mid=207191966&idx=1&sn=9270164e1400fe28aa1400dd6b36115f#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA4Nzc5NTU2Ng==&mid=207192052&idx=1&sn=b0e15cdb958e7452850f2fb8d14f8a2b#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA4Nzc5NTU2Ng==&mid=207192143&idx=1&sn=edbe3c60c06eca5fd1a36a5f3bd6f3f2#rd", 

	];
	var jumpTo = urls[parseInt(Math.random() * urls.length)];
	window.location = jumpTo;
}

$('.do').click(start);

window.onload = function() { 
    var myShakeEvent = new Shake({ 
        threshold: 15 
    }); 
 
    myShakeEvent.start(); 
 
    window.addEventListener('shake', shakeEventDidOccur, false); 
 
    function shakeEventDidOccur () { 
	    if (isStarted) {
			return true;
		}
		start();
    }
}; 

//摇一摇
// $(window).on('deviceorientation', function(e) {
// 	if (isStarted) {
// 		return true;
// 	}
// 	if (!lastAcc) {
// 		lastAcc = e;
// 		return true;
// 	}
// 	var speed = e.alpha + e.beta + e.gamma - lastAcc.alpha - lastAcc.beta - lastAcc.gamma;
// 	if (Math.abs(speed) > 1000) {
// 		start();
// 	}
// 	lastAcc = e;
// });

//微信分享  失效了，有时间的可以根据官方公布的 JS-SDK进行开发

var shareMeta = {
	img_url: " ",
	image_width: 100,
	image_height: 100,
	link: ' ',
	title: " ",
	desc: " ",
	appid: ''
};
document.addEventListener('WeixinJSBridgeReady', function () {
	WeixinJSBridge.on('menu:share:appmessage', function(){
		WeixinJSBridge.invoke('sendAppMessage', shareMeta);
	});
	WeixinJSBridge.on('menu:share:timeline', function(){
		WeixinJSBridge.invoke('shareTimeline', shareMeta);
	});
	WeixinJSBridge.on('menu:share:weibo', function(){
		WeixinJSBridge.invoke('shareWeibo', {
			content: shareMeta.title + shareMeta.desc,
			url: shareMeta.link
		});
	});
});