var URL="https://vending.jianlangcn.com/machine/";$(function(){FastClick.attach(document.body)});var common={couponInfo:function(e,t){$.ajax({type:"get",url:URL+"jl/coup/wxinfo/"+e,dataType:"json",success:function(e){console.log(e)}})},coupList:function(e){$.ajax({type:"get",url:URL+"jl/coup/wxcoupList?jlCsrPk="+e,dataType:"json",success:function(e){if(200==e.status)for(var t=e.data,a=0;a<t.length;a++){var o='<div class="weui-flex section align-center" data-pk="'+t[a].jlCoupVo.jlCoupPk+'"><div class="main"><p class="name">'+t[a].jlDrVo.jlHospNm+'</p><p class="time">有效期至:'+t[a].jlCoupVo.dateLimit+'</p><p class="number">NO:'+t[a].jlCoupVo.jlCoupPk+"</p></div></div>";$(".content").append(o)}}})},hosplist:function(e){var t="";t=e?URL+"jl/hosp/wxlist?query="+e:URL+"jl/hosp/wxlist",$.ajax({type:"get",url:t,dataType:"json",success:function(e){if(console.log(e),200==e.status){for(var t=e.data.items,a=0;a<t.length;a++){var o='<div class="list" data-id="'+t[a].jlHospPk+'"><p class="list-title">'+t[a].hospNm+'</p><div class="list2 hide" data-id="'+t[a].jlHospPk+'" style="display:none"><div class="weui-flex"><div class="weui-flex__item initial-flex name">'+t[a].impDep+'</div><div class="weui-flex__item number">NO：'+t[a].depNo+'</div></div><div class="desc">'+t[a].info+"</div></div>";$("#lists").append(o)}$(".list2").hide(),$(".list").show()}}})},hospitalDetail:function(e){$.ajax({type:"get",url:URL+"jl/hosp/wxinfo/"+e,dataType:"json",success:function(e){if(console.log(e),200==e.status)for(var t=e.data,a=0;a<t.length;a++){var o='<div class="list2" data-id="1"><div class="weui-flex"><div class="weui-flex__item initial-flex name">'+t[a].impDep+'</div><div class="weui-flex__item number">NO：'+t[a].depNo+'</div></div><div class="desc">'+t[a].info+"</div></div>";$("#lists").append(o)}},error:function(e){console.log(e)}})},edit:function(e,a){var t=localStorage.getItem("params");t=JSON.parse(t),a=$.extend(t,a),a=JSON.stringify(a),$.ajax({type:"post",url:e+"jl/csr/wxedit",data:a,dataType:"json",contentType:"application/json",success:function(e){if(console.log(e),200==e.status){$.toast("修改成功");var t=localStorage.getItem("userInfo");t=JSON.parse(t),a=JSON.parse(a),t=$.extend(t,a),t=JSON.stringify(t),a=JSON.stringify(a),localStorage.setItem("userInfo",t),localStorage.setItem("params",a),localStorage.removeItem("hasLogin"),localStorage.removeItem("openid"),setTimeout(function(){window.location.href="person-info.html"},600)}}})},getOpenid:function(e){if(localStorage.getItem("openid"));else{var t=encodeURI(e);localStorage.getItem("hasLogin")||(localStorage.setItem("hasLogin",!0),window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfad716c770341d1d&redirect_uri="+t+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect")}},getCode:function(){var e=localStorage.getItem("openid"),s=this;if(e){var t=localStorage.getItem("userInfo");t=JSON.parse(t),s.showData(t)}else{var a=window.location.href.split("code=")[1].split("&")[0];localStorage.setItem("code",a),$.ajax({type:"get",url:URL+"weixin/access/login",data:{code:a},dataType:"json",success:function(e){if(console.log(e),200==e.status){var t=e.data.wxuser,a=e.data.userinfo;t=$.extend(t,a),console.log(t),localStorage.setItem("openid",t.openId);var o={};o.openid=t.openId,(o=$.extend(o,a)).nkNm=t.nickname,o.head_url=t.headImgUrl,o.sex=t.sexDesc,o=JSON.stringify(o),localStorage.setItem("params",o),localStorage.setItem("jlCsrPk",t.jlCsrPk),s.showData(t),t=JSON.stringify(t),localStorage.setItem("userInfo",t)}else 400==e.status&&(localStorage.removeItem("hasLogin"),location.reload())}})}},showData:function(e){$("#headImgUrl").attr("src",e.headImgUrl),$("#nickname").html(e.nickname),$("#picker").html(e.sexDesc),e.name&&$("#username").html(e.name),e.phone&&$("#phone").html(e.phone),(e.age||0==e.age)&&$("#picker2").html(e.age),e.addr&&$("#addr").html(e.addr)}};