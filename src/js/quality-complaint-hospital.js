$(function(){
	
	//init.getParams();
	common.hosplist();
	$("#lists").on("click",".list",function(){
		var texts = encodeURI($(this).text());
		var id = $(this).data("id");
		window.location.href = "quality-complaint-hospital2.html?id="+id;
		//common.hospitalDetail(id)
		//window.location.href = "quality-complaint-hospital2.html?params="+id+"&&"+texts
	})
	
	$('#search').on('input',function(){
		
		var search_val = $("#search").val()
		var _params = {"w":[{"k":"hospNm","v":search_val,"m":"LK"}],"o":[],"p":{"n":1,"s":10}},
		
		_params = JSON.stringify(_params);
		_params = encodeURI(_params);
		
		common.hosplist(_params);
	})
	
	$("#close").click(function(){
		$("#search").val("")
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

	}
}