var browser = {
	versions: function() {
		var a = navigator.userAgent;
		return {
			ios: !! a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: -1 < a.indexOf("Android") || -1 < a.indexOf("android") || -1 < a.indexOf("Linux"),
			iPhone: -1 < a.indexOf("iPhone"),
			iPad: -1 < a.indexOf("iPad")
		}
	}(),
	showToast: function(a) {
		android.showToast(a)
	},
	JsCallAndroidTest:function (a,b) {
		android.JsCallAndroidTest(a,b)
    },
	androidCallJs: function(a) {
		store.set("user_id", a);
	},
    androidPlanId: function(a) {
        store.set("plan_Id", a);
    },
    iosPlanId: function(a) {
        store.set("plan_Id", a);
    },
	IosCallJs: function(a) {
		store.set("user_id", a);
	},
	gettitle: function(a) {
        try {
            browser.versions.android ? this.showToast(a) : (browser.versions.iPhone || browser.versions.iPad) && sendIos(a);
        } catch (b) {
            (browser.versions.iPhone || browser.versions.iPad) && (window.webkit.messageHandlers.senderModel.postMessage({
                title: a
            }) );
        }
	}
};