var body = {
    /*** 获取地址栏问号后面所传的值 ***/
    getRequest: function() {
        var url = location.search;
        var theRequest = new Object({});
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i += 1) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
            }
        }
        return theRequest
    },
    /*** 计算标尺位置百分比 ***/
	calcPercent: function(min,max,permin,permax,num){
		return (num-min)*(permax-permin)/(max-min)+permin;
	},
    
}