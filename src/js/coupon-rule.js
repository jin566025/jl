$(function(){
	var pk = window.location.href.split("=")[1];
	
	common.couponInfo(pk);
	
	$(".btn").click(function(){
		// window.location.href = "scan-receive.html?pk="+pk
		window.location.href = "scan.html"
	})
})