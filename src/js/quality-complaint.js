$(function(){
	
	init.getParams();
	common.getOpenid("https://vending.jianlangcn.com/admin/view/dist/quality-complaint.html");
	common.getCode();
	
// 	$("#uploaderInput").change(function(e){
// 		var file = e.target.files[0] || e.dataTransfer.files[0];
//         //$('#photoCover').val(document.getElementById("file").files[0].name);
// 		var reader  = new FileReader();
// 		reader.onload = function(){
// 			var img = '<img class="weui-uploader__input-box" src='+this.result+' />';
// 			$("#img-content").prepend(img);
// 		}
// 		reader.readAsDataURL(file)
// 	})
	
	
	$("#save").click(function(){
		var _info = $("#info").val();
		_info = $.trim(_info);
		var catImg = $(".catImg");
		var img1Url,img2Url,img3Url;
		for(var i=0;i<catImg.length;i++){
			if(i==0){
				img1Url = $(catImg[i]).attr("src");
			}else if(i==1){
				img2Url = $(catImg[i]).attr("src");
			}else if(i==2){
				img3Url = $(catImg[i]).attr("src");
			}
		}
		var catNm = $("#picker3").text();
		var catCd="";
		if(catNm=="售货机"){
			catCd="30050.10";
		}else if(catNm=="售货机"){
			catCd="30050.20"
		}else{
			$.toast("请选择投诉类型", "forbidden");
			return false;
		}
		var vmNm = $("#texts").text();
		if(!vmNm){
			$.toast("请选择售货机名称", "forbidden");
		}
		
		if(!_info){
			$.toast("请填写投诉信息", "forbidden");
		}
		var jlVmPk = $("#number").text();

		
		var jlCsrPk = localStorage.getItem("jlCsrPk");
		var userInfo  =localStorage.getItem("userInfo");
		userInfo = JSON.parse(userInfo);
		
		var params = {};
		params.catCd = catCd;                                     //投诉分类编码
		params.catNm = catNm;                                     //投诉分类
		params.csrNkNm = userInfo.nickname                        //用户昵称
		params.info = _info                                       //投诉建议内容
		params.jlCsrPk = jlCsrPk                                  //用户pk
		params.jlFbPk = ""                                       //投诉建议pk
		params.jlVmPk = jlVmPk//售货机pk
		params.statCd = "35000.110.10"                            //状态编码
		params.statNm = "未处理"                                    //状态
		params.vmNm = vmNm //售货机名称
		params.img1Url = img1Url;
		params.img2Url = img2Url;
		params.img3Url = img3Url;
		
		console.log(params);
		common.wxedit(params);
	})
	
	$("#picker3").picker({
	  title: "请选择投诉类型",
	  cols: [
		{
		  textAlign: 'center',
		  values: ['售货机', '商品']
		}
	  ],
	  onChange:function(e){
		  var val = e.value[0];
		  $("#picker3").html(val);
			
	  }
	});
	
})

var init = {
	getParams:function(){
		var info = sessionStorage.getItem("info");
		if(info){
			info = JSON.parse(info);
			var jlVmPk = info.jlVmPk;
			var vmNm = info.vmNm;
			$("#texts").html(vmNm);
			$("#number").html(jlVmPk);
		}
	}
}