$(function(){init.getParams(),common.getOpenid("https://vending.jianlangcn.com/admin/view/dist/quality-complaint.html"),common.getCode(),$("#save").click(function(){var t=$("#info").val();t=$.trim(t);for(var e,r,n,i=$(".catImg"),o=0;o<i.length;o++)0==o?e=$(i[o]).attr("src"):1==o?r=$(i[o]).attr("src"):2==o&&(n=$(i[o]).attr("src"));var a=$("#picker3").text(),s="";if("售货机"==a)s="30050.20";else{if("商品"!=a)return $.toast("请选择投诉类型","forbidden"),!1;s="30050.10"}if(!t)return $.toast("请填写投诉信息","forbidden"),!1;var m=$("#number").text();if(!m)return $.toast("请选择售货机名称","forbidden"),!1;var c=$("#texts").text();if("请选择售货机"==c)return $.toast("请选择售货机名称","forbidden"),!1;var l=sessionStorage.getItem("jlCsrPk");console.log(l);var f=sessionStorage.getItem("userInfo");f=JSON.parse(f);var g={};if("undefined"==l)return $.alert({title:"提示",text:"请先完善个人信息",onOK:function(){window.location.href="person-info.html"}}),!1;g.jlCsrPk=l,g.catCd=s,g.catNm=a,g.csrNkNm=f.nickname,g.info=t,g.jlFbPk="",g.jlVmPk=m,g.statCd="35000.110.10",g.statNm="未处理",g.vmNm=c,g.img1Url=e,g.img2Url=r,g.img3Url=n,console.log(g),common.wxedit(g)}),$("#picker3").picker({title:"请选择投诉类型",cols:[{textAlign:"center",values:["售货机","商品"]}],onChange:function(t){var e=t.value[0];$("#picker3").html(e);var r=sessionStorage.getItem("info");if(r)(r=JSON.parse(r)).catNm=e,r=JSON.stringify(r),sessionStorage.setItem("info",r);else{var n={};n.catNm=e,n=JSON.stringify(n),sessionStorage.setItem("info",n)}}})});var init={getParams:function(){var t=sessionStorage.getItem("info");if(t){var e=(t=JSON.parse(t)).jlVmPk,r=t.vmNm,n=t.catNm;r&&$("#texts").html(r),e&&$("#number").html(e),$("#picker3").html(n)}}};