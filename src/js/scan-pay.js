$(function(){
	
	//
	//
	init.getParams();
	setTimeout(function(){
		common.getOpenid("https://vending.jianlangcn.com/admin/view/dist/scan-pay.html");
		common.getCode();
		setTimeout(function(){
			init.callback()
		})
	})
	
	$("#pay").click(function(){
		var payarray = sessionStorage.getItem("payarray");
		payarray = JSON.parse(payarray);
		payarray.tradeType = "JSAPI";
		payarray.openid = localStorage.getItem("openid");
		var _totalFee = parseFloat($("#price1").text())*100
		payarray.totalFee = _totalFee.toString() ;
		console.log(payarray)
		common.createOrder(payarray);

	})
})

function goodbye(){
	localStorage.removeItem("hasLogin");
	localStorage.removeItem("openid");
	sessionStorage.removeItem("hasGet");
}

var init = {
	callback:function(){
		var payarray = sessionStorage.getItem("payarray");
		payarray = JSON.parse(payarray);
		var _params = {};
		_params.openid = localStorage.getItem("openid");
		_params.vmSn = payarray.vmSn;
		_params.openid ="oW4oN1JNZuOrV_gvgTPRySDo0Lfo";
		_params.vmSn = "1223344556";
		var _totalFee = payarray.totalFee;
		_params.totalFee = _totalFee;
		// _params.totalFee = 100;
		_totalFee = _totalFee*0.01;
		$("#price2").html(_totalFee.toFixed(2))
		var _namebody = payarray.body;
		_namebody = decodeURI(_namebody);
		$("#name").html(_namebody)
		common.vmCoupon(_params)
	},
	getParams:function(){
		var hasGet = sessionStorage.getItem("hasGet");
		if(!hasGet){
			var _params = window.location.href.split("?")[1];
			var _array  = _params.split("&");
			
			var payarray = {};
			var _param,_key,_value;
			
			$.each(_array,function(i,n){
				_param = _array[i].split("=");
				_key = _param[0];
				_value =  _param[1];
				payarray[_key] = _value;
			})
			payarray = JSON.stringify(payarray)
			sessionStorage.setItem("payarray",payarray);
			sessionStorage.setItem("hasGet",true)
		}
	}
}