$(function() {

    jQuery.ax = function(e, a, b, c, d, f, g) {
        b = null == b || "" == b || "undefined" == typeof b ? "true" : b;
        c = null == c || "" == c || "undefined" == typeof c ? "post" : c;
        d = null == d || "" == d || "undefined" == typeof d ? "json" : d;
        a = null == a || "" == a || "undefined" == typeof a ? {
            date: (new Date).getTime()
        } : a;
        $.ajax({
            type: c,
            async: b,
            data: a,
            url: e,
            dataType: d,
            success: function(a) {
                f(a)
            },
            error: function(a) {
                g(a)
            }
        })
    };
    jQuery.axpost = function(e, a, b, c) {
        a = null == a || "" == a || "undefined" == typeof a ? {
            date: (new Date).getTime()
        } : a;
        $.ajax({
            type: "post",
            data: a,
            url: e,
            dataType: "json",
            success: function(a) {
                b(a)
            },
            error: function(a) {
                c(a)
            }
        })
    };
    jQuery.axget = function(e, a, b, c) {
        a = null == a || "" == a || "undefined" == typeof a ? {
            date: (new Date).getTime()
        } : a;
        $.ajax({
            type: "get",
            data: a,
            url: e,
            dataType: "json",
            success: function(a) {
                b(a)
            },
            error: function(a) {
                c(a)
            }
        })
    };
    jQuery.jsonpost = function(e, a, b, c) {
        a = null == a || "" == a || "undefined" == typeof a ? {
            date: (new Date).getTime()
        } : a;
        $.ajax({
            type: "post",
            data: a,
            url: e,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(a) {
                b(a)
            },
            error: function(a) {
                c(a)
            }
        })
    }
});