$(function(){
	var jlCsrPk =window.location.href.split("=")[1];

	common.couponInfo(jlCsrPk);
	
	$("#rule").click(function(){
		window.location.href = "https://vending.jianlangcn.com/admin/view/dist/coupon-rule.html?pk="+jlCsrPk
	})
})