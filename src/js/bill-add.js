$(function(){
	$("#city-picker1").cityPicker({
		title: "请选择收货地址"
	});
	
	$("#city-picker2").picker({
	  title: "请选择医院",
	  cols: [
		{
		  textAlign: 'center',
		  values: ['宁波鄞州人民医院','宁波113特种兵医院','宁波市中医院']
		}
	  ]
	});
	
	$("#city-picker3").picker({
		title: "请选择科室",
		cols: [
			{
			textAlign: 'center',
			values: ['肛肠科','儿科','神经科']
			}
		]
	});
	
	$("#city-picker4").picker({
		title: "请选择科室",
		cols: [
			{
			textAlign: 'center',
			values: ['NO:1234567890123','NO:1234567812333','NO:1234567890666']
			}
		]
	});
	
	
	$(".sure").click(function(){
		window.location.href='bill-sure.html'
	})
})