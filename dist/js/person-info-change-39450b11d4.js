$(function(){init.getChangeParams(),$(".close").click(function(){$("#input-val").val("")}),$(".save").click(function(){var t=$("#input-val").val(),a=sessionStorage.getItem("openid"),e=$("#input-val").data("type"),i={};if(1==e)i.name=t;else if(2==e)i.addr=t;else if(3==e){if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(t))return $.toast("请输入正确的手机号码","cancel"),!1;i.phone=t}i.openid=a,common.edit(URL,i)})});var init={getChangeParams:function(){var t=location.search;if(t){var a=t.split("?params=")[1],e=(a=a.split("&&"))[0],i=decodeURI(a[1]);$("#input-val").val(i),$("#input-val").data("type",e),$(document).attr("title",i),3==e&&$("#input-val").attr("type","tel")}}};