$(function(){
	var arrayNum = init.createNum();
	
	
	common.getOpenid("https://vending.jianlangcn.com/admin/view/dist/person-info.html");
	common.getCode();
	
	$(".tochange").click(function(){
		var type = $(this).data("type");
		var texts = encodeURI($(this).text());

		window.location.href = 'person-info-change.html?params='+type+"&&"+texts
	})
	

	$("#picker2").picker({
		title: "请选择",
		cols: [
			{
				textAlign: 'center',
				values:arrayNum
			}
		],
		onChange:function(e){
			
		},
		onClose:function(e){
			var val = e.value[0];
			$("#picker2").html(val);
			
			var openid = localStorage.getItem("openid");
			var age = val;
			var json = {};
			json.openid = openid;
			json.age = age;
			
			common.edit(URL,json);
		}
	});
	
	// 	
	// 	$("#picker").picker({
	// 	  title: "请选择",
	// 	  cols: [
	// 		{
	// 		  textAlign: 'center',
	// 		  values: ['男', '女']
	// 		}
	// 	  ],
	// 	  onChange:function(e){$.ajax()
	// 		  var val = e.value[0];
	// 		  $("#picker").html(val);
	// 	  }
	// 	});
	
})



var init = {
	createNum:function(){
		var arrayNum = [];
		for(var i =0;i<150;i++){
			arrayNum.push(i)
		}
		return arrayNum;
	}
}