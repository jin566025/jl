$(function(){
	$(".content").on("click",".section",function(){
		var pk = $(this).attr("data-pk");
		window.location.href="coupon-rule.html?pk="+pk;
	})
	
	common.getOpenid("https://vending.jianlangcn.com/admin/view/dist/coupon.html");
	common.getCode();
	
	
	setTimeout(function(){
		var jlCsrPk = localStorage.getItem("jlCsrPk");
		console.log(jlCsrPk)
		if(jlCsrPk){
			common.coupList(jlCsrPk,"");
		}else{
			$.alert({
			  title: '提示',
			  text: '请先完善个人信息',
			  onOK: function () {
				window.location.href="person-info.html"
			  }
			});
			
		}
	},1000)
})