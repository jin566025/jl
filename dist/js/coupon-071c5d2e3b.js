$(function(){var o,e;$(".content").on("click",".section",function(){var t=$(this).attr("data-pk");window.location.href="coupon-rule.html?pk="+t}),common.getOpenid("https://vending.jianlangcn.com/admin/view/dist/coupon.html"),common.getCode(),$(".content").on("touchstart",".section",function(t){var n=t.touches[0];o=n.clientX}),$(".content").on("touchmove",".section",function(t){var n=t.touches[0];e=n.clientX,20<o-e?$(this).find(".remove").removeClass("my-translate-right").addClass("my-translate-left"):o-e<-20&&$(this).find(".remove").removeClass("my-translate-left").addClass("my-translate-right")}),$(".content").on("click",".remove",function(t){var n=$(this).parent().attr("data-pk");$.confirm("确认删除优惠券？",function(){common.deleteCoup(n)},function(){}),t.stopPropagation()}),setTimeout(function(){var t=sessionStorage.getItem("jlCsrPk");console.log(t),t&&"undefined"!=t?common.coupList(t,""):$.alert({title:"提示",text:"请先完善个人信息",onOK:function(){window.location.href="person-info.html"}})},1e3)});