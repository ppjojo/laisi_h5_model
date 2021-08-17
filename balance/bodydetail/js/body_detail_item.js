$(function() {

	setTimeout(function() {
		try {
			javascript: android.jsCallAndroidMethon("balance_body_composition");
		}
		catch (e) {

		}
	}, 200)
	try {
		var moveX = $(".cur").position().left + $(".clearboth").scrollLeft();
		var pageX = document.documentElement.clientWidth;
		var blockWidth = $(".cur").outerWidth(true);
		var left = moveX - (pageX / 2) + (blockWidth / 2);
		$(".clearboth").scrollLeft(left);
	} catch (e) {

	}

})


