$(function(){
	
	init.getVmList();
	
	

	$("#lists").on("click",".list",function(){
		
		
		var jlVmPk = $(this).data("id");
		var vmNm = $(this).find(".name").text();
		var info = sessionStorage.getItem("info");
		
		info ? info=JSON.parse(info):info={};
		
		info.jlVmPk = jlVmPk;
		info.vmNm = vmNm;
		info = JSON.stringify(info);
		sessionStorage.setItem("info",info);
		window.location.href = "quality-complaint.html";
	})
	
	$('#search').on('input',function(){
		var id = window.location.href.split("=")[1];
		var search_val = $("#search").val()
		var _params = {"w":[{"k":"dep","v":search_val,"m":"LK"},{"k":"jlHospPk","v":id,"m":"LK"}],"o":[],"p":{"n":1,"s":10}}
		
		_params = JSON.stringify(_params);
		_params = encodeURI(_params);
		
		common.vmList(_params);
	})
	
})



var init = {
	getParams:function(){
		var _params = location.search;
		if(_params){
			var params = _params.split("?params=")[1];
			params = params.split("&&")
			var texts = decodeURI( params[1] );
			var id = params[0];
		}

	},
	getVmList:function(){
		var id = window.location.href.split("=")[1];
		var _params = {"w":[{"k":"jlHospPk","v":id,"m":"LK"}],"o":[],"p":{"n":1,"s":10}};
		_params = JSON.stringify(_params);
		_params = encodeURI(_params);
		common.vmList(_params);
	}
}