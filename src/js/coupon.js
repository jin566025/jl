$(function(){
	$(".content").on("click",".section",function(){
		var pk = $(this).attr("data-pk");
		window.location.href="coupon-rule.html?pk="+pk;
	})
	
	common.getOpenid("https://vending.jianlangcn.com/admin/view/dist/coupon.html");
	common.getCode();
	
	var startX,endX;
	$(".content").on("touchstart",".section",function(e){
		var Stouch = e.touches[0];
		startX = Stouch.clientX;
	})
	$(".content").on("touchmove",".section",function(e){
		var Etouch = e.touches[0];
		endX = Etouch.clientX;
		if(startX-endX>20){
			// $(this).find(".remove").animate({right:"0px"},100)
			$(this).find(".remove").removeClass("my-translate-right").addClass("my-translate-left")
		}else if(startX-endX<-20){
			// $(this).find(".remove").animate({right:"-60px"},100)
			$(this).find(".remove").removeClass("my-translate-left").addClass("my-translate-right")
		}
	})
	$(".content").on("click",".remove",function(event){
		var pk = $(this).parent().attr("data-pk");
		$.confirm("确认删除优惠券？", function() {
			
			common.deleteCoup(pk)
		}, function() {
			
		});
		event.stopPropagation();
		
		
		
	})
	setTimeout(function(){
		var jlCsrPk = sessionStorage.getItem("jlCsrPk");
		console.log(jlCsrPk)
		if(!jlCsrPk || jlCsrPk=="undefined"){
			$.alert({
				title: '提示',
				text: '请先完善个人信息',
				onOK: function () {
				window.location.href="person-info.html"
				}
			});
		}else{
			common.coupList(jlCsrPk,"");
		}
	},1000)
})