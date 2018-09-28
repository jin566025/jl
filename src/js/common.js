var URL = "https://vending.jianlangcn.com/machine/";
$(function() {
	FastClick.attach(document.body);
});

var common = {
	vmCoupon:function(params){
		$.ajax({
			type:"post",
			url:URL+"pay/weixin/vmCoupon",
			dataType:"json",
			data:params,
			success:function(res){
				console.log(res)
				if(res.status==200){
					var payFee = res.data.payFee;
					var price3 = params.totalFee-payFee;
					price3 = price3*0.01;
					payFee = payFee*0.01;
					$("#price1").html(payFee.toFixed(2));
					$("#price3").html(price3.toFixed(2));
					sessionStorage.setItem("coupSn",res.data.coupSn);
				}
			}
		})
	},
	createOrder:function(params){
		$.ajax({
			type:"post",
			url:URL+"pay/weixin/createOrder",
			dataType:"json",
			data:params,
			success:function(data){
				console.log(data)
				if(data.status==200){
					var datas = data.data;
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							"appId":datas.appId,               //公众号名称，由商户传入     
							"timeStamp":datas.timeStamp,       //时间戳，自1970年以来的秒数     
							"nonceStr":datas.nonceStr,         //随机串     
							"package":datas.packageValue,     
							"signType":datas.signType,         //微信签名方式：     
							"paySign":datas.paySign               //微信签名 
						},
						function(res){
							console.log(res)
							if(res.err_msg == "get_brand_wcpay_request:ok" ) {
								
							}else{
								
							}
						}
					); 
				}
			}
		})
	},
// 	init:function(){
// 		var that = this;
// 		that.getOpenid();
// 		that.getCode();
// 	},
	couponInfo:function(pk){
		$.ajax({
			type:"get",
			url:URL+"jl/coup/wxinfo/"+pk,
			dataType:"json",
			async:false,
			success:function(data){
				if(data.status==200){
					$.ajax({
						type:"get",
						url:URL+"jl/dr/wxinfo/"+data.data.jlDrPk,
						async:false,
						dataType:"json",
						success:function(res){
							
							var _params = {"w":[{"k":"jlHospPk","v":res.data.jlHospPk,"m":"LK"}],"o":[],"p":{"n":1,"s":10}};
							_params = JSON.stringify(_params);
							_params = encodeURI(_params);
							if(res.status==200){
								$.ajax({
									type:"get",
									url:URL+"jl/vm/wxlist?query="+_params,
									async:false,
									dataType:"json",
									success:function(res2){
										$("#jlHospNm").html(res.data.jlHospNm);
										$("#dateLimit").html(data.data.dateLimit)
										
										$("#jlHospNm2").html(res.data.jlHospNm);
										$("#dateLimit2").html(data.data.dateLimit);
										$("#coupSn").html(data.data.coupSn);
										var _lists = res2.data.items;
										var _str = "";
										for(var i=0;i<_lists.length;i++){
											if(i==0){
												_str = _str+""+_lists[i].addrDet;
											}else{
												_str+";"+_lists[i].addrDet;
											}
											
											var html = '<div class="list flex-box">'+
															'<div class="list-left">'+
																'<div class="circle"></div>'+
															'</div>'+
															'<div class="list-right flex1">'+
																'<div class="number flex-box">'+
																	'<p class="number-left">NO：'+_lists[i].vmSn+'</p>'+
																	'<p class="number-right">'+_lists[i].depNm+'</p>'+
																'</div>'+
																'<p class="texts">'+_lists[i].addrDet+'</p>'+
															'</div>'+
														'</div>';
											$("#coupList").append(html);				
										}
										$("#addrDet").html(_str)
									}
								})
								
							}
							
						}
					})
				}
				
			}
		})
	},

	wxedit:function(params){
		params = JSON.stringify(params);
		$.ajax({
			type:"post",
			data:params,
			dataType:"json",
			url:URL+"jl/fb/wxedit",
			contentType:"application/json",
			success:function(data){
				console.log(data)
				if(data.status==200){
					$.toast("提交成功");
					sessionStorage.removeItem("info")
					setTimeout(function(){
						location.reload()
					},500)
				}
			}
		})
	},
	coupList:function(jlCsrPk){
		var loading = '<div class="weui-loadmore">'+
										'<i class="weui-loading"></i>'+
										'<span class="weui-loadmore__tips">正在加载</span>'+
										
									'</div>';
		var nodata = '<div class="weui-loadmore weui-loadmore_line">'+
										'<span class="weui-loadmore__tips">暂无数据</span>'+
									'</div>';
									
		$(".content").html(loading)
		$.ajax({
			type:"get",
			url:URL+"jl/coup/wxcoupList?jlCsrPk="+jlCsrPk,
			dataType:"json",
			success:function(data){
				if(data.status==200){
					var lists = data.data;
					if(lists){
						$(".content").html("")
						for(var i=0;i<lists.length;i++){
							var html = '<div class="weui-flex section align-center" data-pk="'+lists[i].jlCoupVo.jlCoupPk+'">'+
											'<div class="borders"></div>'+
											'<div class="main">'+
												'<p class="name">'+lists[i].jlDrVo.jlHospNm+'</p>'+
												'<p class="time">有效期至:'+lists[i].jlCoupVo.dateLimit+'</p>'+
												'<p class="number">NO:'+lists[i].jlCoupVo.coupSn+'</p>'+
											'</div>'+
											'<div class="remove">删除</div>'+
										'</div>';
							$(".content").append(html);
						}
					}else{
						$(".content").html(nodata)
					}	
				}else{
					$(".content").html(nodata)
				}
			}
		})
	},
	hosplist:function(search_val){
		var _url = ""
		if(search_val){
			_url = URL+"jl/hosp/wxlist?query="+search_val
		}else{
			_url = URL+"jl/hosp/wxlist"
		}
		var nodata = '<div class="weui-loadmore weui-loadmore_line">'+
									'<span class="weui-loadmore__tips">暂无数据</span>'+
									'</div>';
		$.ajax({
			type:"get",
			url:_url,
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.status==200){
					$("#lists").html("")
					var lists = data.data.items;
					if(!lists){
						$("#lists").html(nodata)			
					}else{
						for(var i=0;i<lists.length;i++){
							var html = '<div class="list" data-id="'+lists[i].jlHospPk+'">'+
											'<p class="list-title">'+lists[i].hospNm+'</p>'+
										'</div>';
							$("#lists").append(html)
						}
					}
					
				}else{
					$("#lists").html(nodata)		
				}
			}
		})
	},
	scan:function(){
		$.ajax({
			url:URL+"/weixin/sign/jssign?url=https://vending.jianlangcn.com/admin/view/dist/scan.html",
			type:"get",
			dataType:"json",
			success:function(data){
				console.log(data)
				wx.config({
					debug: false,
					appId:"wxfad716c770341d1d",
					timestamp: data.timestamp,
					nonceStr: data.nonceStr,
					signature: data.signature,
					jsApiList : [ 'checkJsApi', 'scanQRCode' ]
				});
				wx.error(function(res) {
					// alert("出错了：" + res.errMsg);
				});
				
				wx.ready(function() {
					wx.checkJsApi({
						jsApiList : ['scanQRCode'],
						success : function(res) {
						}
					});
					wx.scanQRCode({
						needResult : 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType : [ "qrCode", "barCode" ], 
						success : function(res) {
							//var result = res.resultStr; 
							console.log(res)
						}
					});
					
				});//end_ready

			}
		})
	},
	vmList2:function(val){
		
	},
	vmList:function(val){
		
		var _url = ""
		if(val){
			_url = URL+"jl/vm/wxlist?query="+val
		}else{
			_url = URL+"jl/vm/wxlist"
		}
		var nodata = '<div class="weui-loadmore weui-loadmore_line">'+
									  '<span class="weui-loadmore__tips">暂无数据</span>'+
									'</div>';
		$.ajax({
			type:"get",
			url:_url,
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.status==200){
					$("#lists").html("")
					var lists = data.data.items;
					if(!lists){
						$("#lists").html(nodata)			
					}else{
						for(var i=0;i<lists.length;i++){
							var html = '<div class="list"  data-id="'+lists[i].jlVmPk+'">'+
											'<div class="weui-flex">'+
												'<div class="weui-flex__item initial-flex name" style="margin-right:30px">'+lists[i].depNm+'</div>'+
												'<div class="weui-flex__item number">NO：'+lists[i].jlVmPk+'</div>'+
											'</div>'+
											'<div class="desc">'+lists[i].addrDet+'</div>'+
										'</div>';
		
							$("#lists").append(html)
						}
					}
					
				}else{
					$("#lists").html(nodata)			
				}
			}
		})
	},
	hospitalDetail:function(pk){
		$.ajax({
			type:"get",
			url:URL+"jl/hosp/wxinfo/"+pk,
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.status==200){
					var lists = data.data;
					for(var i=0;i<lists.length;i++){
						var html =  '<div class="list2" data-id="1">'+
										'<div class="weui-flex">'+
											'<div class="weui-flex__item initial-flex name">'+lists[i].impDep+'</div>'+
											'<div class="weui-flex__item number">NO：'+lists[i].depNo+'</div>'+
										'</div>'+
										'<div class="desc">'+lists[i].info+'</div>'+
									'</div>';
						$("#lists").append(html)
					}
					
				}
			},
			error:function(error){
				console.log(error)
			}
		})
	},
	
	
	edit:function(URL,params){
		var _param = localStorage.getItem("params");
		_param = JSON.parse(_param);
		params = $.extend(_param,params);
		params = JSON.stringify(params)
		$.ajax({
			type:"post",
			url:URL+"jl/csr/wxedit",
			data:params,
			dataType:"json",
			contentType:"application/json",
			success:function(data){
				console.log(data)
				if(data.status==200){
					$.toast("修改成功");
					var userInfo = localStorage.getItem("userInfo");
					userInfo = JSON.parse(userInfo);
					params = JSON.parse(params);

					userInfo = $.extend(userInfo,params);
					
					userInfo = JSON.stringify(userInfo);
					params = JSON.stringify(params);
					
					localStorage.setItem("userInfo",userInfo);
					localStorage.setItem("params",params);
					
					localStorage.removeItem("hasLogin");
					localStorage.removeItem("openid")
					setTimeout(function(){
						window.location.href = "person-info.html"
					},600)
				}
			}
		})
	},

	getOpenid:function(url){
		var openid = localStorage.getItem("openid");
		if(openid){
			
		}else{
			var redirect_uri = encodeURI(url);
			var appid = "wxfad716c770341d1d";
			var hasLogin = localStorage.getItem("hasLogin");
			
			
			if(hasLogin){

			}else{
				localStorage.setItem("hasLogin",true);
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
			}
		}
	},
	getCode:function(callback){
		var openid = localStorage.getItem("openid");
		var that = this;
		
		if(openid){
			var userInfo = localStorage.getItem("userInfo");
			userInfo = JSON.parse(userInfo);
			that.showData(userInfo)
		}else{
			var _url = window.location.href.split("code=")[1];
			var code = _url.split("&")[0];
			localStorage.setItem("code",code);
			
			$.ajax({
				type:"get",
				url:URL+"weixin/access/login",
				data:{
					"code":code
				},
				dataType:"json",
				success:function(data){
					console.log(data)
					if(data.status==200){
						
						var userInfo = data.data.wxuser;
						var userinfo = data.data.userinfo;
						userInfo = $.extend(userInfo,userinfo);
						console.log(userInfo)
						localStorage.setItem("openid",userInfo.openId);
						var params = {};
						params.openid = userInfo.openId;
						
						
						params = $.extend(params,userinfo);
						params.nkNm = userInfo.nickname;
						params.head_url = userInfo.headImgUrl;
						params.sex = userInfo.sexDesc;
						params = JSON.stringify(params);
						localStorage.setItem("params",params);
						localStorage.setItem("jlCsrPk",userInfo.jlCsrPk)
						that.showData(userInfo);
						userInfo = JSON.stringify(userInfo);
						localStorage.setItem("userInfo",userInfo);
						localStorage.setItem("token",data.data.token);
						//that.set("machine-token",data.data.token,30)
						if(callback){
							callback()
						}
						
					}else if(data.status==400){
						localStorage.removeItem("hasLogin");
						location.reload();
					}
					
				}
			});
		}	
	},
	/**
	* 添加cookie值
	* @param name: cookie的name
	* @param value: cookie的值
	* @param hours: cookie失效时间，为空/0则将在浏览器关闭后失效
	*/
	addCookie: function(name, value, hours){
		var cookieStr = name + "=" + escape(value);
		// 同一个应用服务器下共享cookie
		cookieStr += "; path=/";
		//为0时不设定过期时间，浏览器关闭时cookie自动消失
		if(hours && hours > 0){
			var date = new Date(),
			ms = hours*3600*1000;
			date.setTime(date.getTime() + ms);
			cookieStr += "; expires=" + date.toGMTString();
		}
		document.cookie = cookieStr;
	},
	set:function (key, val, time) {//设置cookie方法
		var date = new Date(); //获取当前时间
		var expiresDays = time;  //将date设置为n天以后的时间
		date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
		// document.cookie = key + "=" + val + ";expires=" + date.toGMTString();  //设置cookie
		document.cookie = key + "=" + val + ";expires=" + date.toGMTString()+ "; path=/";  //设置cookie
	},
	showData:function(data){
		$("#headImgUrl").attr("src",data.headImgUrl);
		$("#nickname").html(data.nickname)
		$("#picker").html(data.sexDesc);
		if(data.name){
			$("#username").html(data.name)
		}
		if(data.phone){
			$("#phone").html(data.phone)
		}
		if(data.age || data.age==0){
			$("#picker2").html(data.age)
		}
		if(data.addr){
			$("#addr").html(data.addr)
		}
	}
}