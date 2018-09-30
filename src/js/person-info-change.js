$(function(){
	init.getChangeParams();
	
	$(".close").click(function(){
		$("#input-val").val("")
	})
	
	$(".save").click(function(){
		var val = $("#input-val").val();
		var openid = sessionStorage.getItem("openid");
		var type = $("#input-val").data("type");
		var params = {};

		if(type==1){
			params.name = val
		}else if(type==2){
			params.addr = val
		}else if(type==3){
			var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
			if (myreg.test(val)) {
				params.phone = val
			}else{
				$.toast("请输入正确的手机号码", "cancel");
				return false;
			}
			
		}
		
		params.openid = openid;
		common.edit(URL,params);
// 		$.ajax({
// 			type:'post',
// 			url:URL+'jl/csr/wxedit',
// 			data:params,
// 			dataType:'json',
// 			contentType:'application/json',
// 			success:function(data){
// 				console.log(data)
// 				if(data.status==200){
// 					var userInfo = sessionStorage.getItem("userInfo");
// 					userInfo = JSON.parse(userInfo);
// 					if(type==1){
// 						userInfo.name = val
// 					}else if(type==2){
// 						userInfo.addr = val
// 					}else if(type==3){
// 						userInfo.phone = val
// 					}
// 					userInfo = JSON.stringify(userInfo)
// 					sessionStorage.setItem("userInfo",userInfo)
// 				}
// 			}
// 		})
	})
	
})

var init = {
	getChangeParams:function(){
		var _params  =location.search;
		if(_params){
			var params = _params.split("?params=")[1];
			params = params.split("&&")
			var type = params[0];
			var texts = decodeURI(params[1]);
			$("#input-val").val(texts);
			$("#input-val").data("type",type);
			$(document).attr('title',texts);
			if(type==3){
				$("#input-val").attr("type","tel");
			}
		}
		
	}
}