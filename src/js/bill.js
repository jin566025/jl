$(function(){
	$("#next").click(function(){
		window.location.href='bill-open.html'
	})
	
	$(".types").click(function(){
		$(".types").removeClass("types-active");
		$(this).addClass("types-active");
		var index = $(this).index(".types");
		if(index==0){
			$(".qy").show()
		}else{
			$(".qy").hide()
		}
	})
})