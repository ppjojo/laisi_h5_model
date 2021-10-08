//日期转换格式---（yyyy-MM-dd hh:mm:ss格式转换成其他格式）
function dateFormat(date,format){
    if(date){
        date = new Date(date);

        var year = date.getFullYear();
        var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
        var month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;

        var minutes = (Array(2).join(0) + date.getMinutes()).slice(-2);
        var hours = (Array(2).join(0) + date.getHours()).slice(-2);
        var secondes = (Array(2).join(0) + date.getSeconds()).slice(-2); 

        var arrMonthChinese = ['一','二','三','四','五','六','七','八','九','十','十一','十二']
        var monthChinese = arrMonthChinese[date.getMonth()]

        switch(format) 
        {
            case 'year':
                return year + '年';
                // break;
            case 'month':
                return monthChinese + '月';
            case 'year_month':
                return year + '-' + month;
            case 'yyyy-MM-dd':
                return year + '-' + month+ '-' + day;
            case 'h_m_s':
                return {hours: hours, minutes: minutes, secondes: secondes };
            case 'month_day':
                return month + '月' + day + '日';
            case 'HH:mm':
                return hours + ':' + minutes;
            case 'MM/DD HH:mm':
                return month + '/' + day + ' ' + hours + ':' + minutes;
            case 'yy/MM/DD HH:mm':
                return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
            case '/':
                return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes ;
            default:
                return year + '年' + month + '月' + day + '日' + ' ' + hours + ':' + minutes ; 
        }
    }     
}

//时间戳转换为yyyy-MM-dd hh:mm:ss格式的日期 
function timestampTodate(date) {
    if(date){
        var newdate = new Date(date)

        var year = newdate.getFullYear();
        var day = newdate.getDate() < 10 ? '0'+newdate.getDate() : newdate.getDate();
        var month = newdate.getMonth()+1 < 10 ? '0'+(newdate.getMonth()+1) : newdate.getMonth()+1;

        var minutes = (Array(2).join(0) + newdate.getMinutes()).slice(-2);
        var hours = (Array(2).join(0) + newdate.getHours()).slice(-2);
        var secondes = (Array(2).join(0) + newdate.getSeconds()).slice(-2); 

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + secondes;
    }
}

$(function(){
    ajax({
    	type: "get",
    	url: "wristball/data/fetch",
    	data: {
    		id: getQueryString('dataId'),
    		userId: getQueryString('userId') || JSON.parse(localStorage.getItem("appInfo")).userId
    	},
    	success: function(res) {
    		if (res.code == 0) {
				getdetail(res.data)
    		} else {
    			
    		}
    
    	},
    	error: function(err) {
    		console.log("error")
    	}
    })

})



//获取详情数据
function getdetail(data) {
	//数据处理
	var numData = data.count;
	if(numData<10000){
		$("#leveltxt").text("圈数(圈)");
		$('#numData').html(numData);
	}else if(numData>=10000&&numData<10000000){
		var num2=(numData*0.0001).toFixed(4);
		$('#numData').html(num2.substring(0,num2.lastIndexOf('.')+4));
	}else{
		$('#numData').html(parseInt(numData*0.0001));
	}
	// var numData = (data.count*0.0001).toFixed(3);
	// $('#numData').html(numData)
	var time = data.timestamp
	
	var modenum = data.mode
	
	// var cal = Math.ceil(data.calorie/1000*100)/100
	var cal = data.calorie/1000;
	$('#cal').html(cal.toFixed(2))
	
	var reinsNum = (data.avgStrength/1000).toFixed(2)
	reinsNum=reinsNum.substring(0,reinsNum.lastIndexOf('.')+2)
	$('#reinsNum').html(reinsNum)
	
	var avgNumber = data.avgRate
	$('#avgNumber').html(avgNumber)
	
	var mostFreq = data.maxRate
	$('#mostFreq').html(mostFreq)
	
	var mostHolding = (data.maxStrength/1000).toFixed(2)
	mostHolding=mostHolding.substring(0,mostHolding.lastIndexOf('.')+2)
	$('#mostHolding').html(mostHolding)
	
	//耗费时间的计算处理
	var timeNum = parseInt(data.duration/1000)
	var hournum = (Array(2).join(0) + Math.floor(timeNum/60/60)).slice(-2)
	var min = (Array(2).join(0) + Math.floor((timeNum- hournum*60*60)/60)).slice(-2)
	var sec = (Array(2).join(0) + (timeNum - hournum*60*60 - min*60)).slice(-2)
	
	$('#time').html(min + ':' + sec)
	
	if( Math.floor(timeNum/60/60) > 0) {
	    $('#time').html(hournum + ':' + min + ':' + sec)   
	}
	
	
	//时长小于（不包含5秒）5秒时，平均频次和最快频次显示'--'
	if( timeNum<5 ) {
	    var avgNumber = '--'
	    $('#avgNumber').html(avgNumber)
	    var mostFreq = '--'
	    $('#mostFreq').html(mostFreq)
	}
	
	$('#endtime').html(dateFormat( (data.startTime + data.duration) , 'yy/MM/DD HH:mm'))
	
	//获取用户数据和设备相关数据
	var new_user_id = data.memberId
	var new_mac = data.mac
	getBasicInfo(new_user_id, new_mac)
	
	$(".contain").fadeIn();
	$(".loading").fadeOut();	
		
}


function getBasicInfo(new_user_id,new_mac) {
	ajax({
		type: "get",
		url: "account/member/fetch",
		data: {
			memberId : new_user_id,
			deviceId : new_mac
		},
		success: function(res) {
			if (res.code == 0) {
				var data = res.data
				$('#username').html(data.nickName )
				$("#userimg").attr('src',data.headPictureUrl);  
			} 
	
		},
		error: function(err) {
			console.log("error")
		}
	})
}

//超出指定字数个数，则超过部分用省略号显示
function strEllipsis(str, limit) {
    if (str.length > limit ) {
        return str.slice(0, limit) + '...';
    }else {
        return str;
    }
}