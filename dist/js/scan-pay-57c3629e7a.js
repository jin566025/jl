function goodbye(){localStorage.removeItem("hasLogin"),localStorage.removeItem("openid"),sessionStorage.removeItem("hasGet")}$(function(){init.getParams(),setTimeout(function(){common.getOpenid("https://vending.jianlangcn.com/admin/view/dist/scan-pay.html"),common.getCode(),setTimeout(function(){init.callback()})}),$("#pay").click(function(){var e=sessionStorage.getItem("payarray");(e=JSON.parse(e)).tradeType="JSAPI",e.openid=localStorage.getItem("openid");var t=100*parseFloat($("#price1").text());e.totalFee=t.toString(),console.log(e),common.createOrder(e)})});var init={callback:function(){var e=sessionStorage.getItem("payarray");e=JSON.parse(e);var t={};t.openid=localStorage.getItem("openid"),t.vmSn=e.vmSn,t.openid="oW4oN1JNZuOrV_gvgTPRySDo0Lfo",t.vmSn="1223344556";var o=e.totalFee;t.totalFee=o,o*=.01,$("#price2").html(o.toFixed(2));var a=e.body;a=decodeURI(a),$("#name").html(a),common.vmCoupon(t)},getParams:function(){if(!sessionStorage.getItem("hasGet")){var o,a,n,i=window.location.href.split("?")[1].split("&"),r={};$.each(i,function(e,t){o=i[e].split("="),a=o[0],n=o[1],r[a]=n}),r=JSON.stringify(r),sessionStorage.setItem("payarray",r),sessionStorage.setItem("hasGet",!0)}}};