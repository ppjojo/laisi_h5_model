(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["app"], {
        0: function(e, t, n) { e.exports = n("56d7") },
        "034f": function(e, t, n) {
            "use strict";
            n("1fb7")
        },
        "0dd0": function(e, t) {
            (function(e, t) {
                var n = t.documentElement,
                    o = e.devicePixelRatio || 1;

                function i() { t.body ? t.body.style.fontSize = 12 * o + "px" : t.addEventListener("DOMContentLoaded", i) }

                function a() {
                    var e = n.clientWidth / 7.5;
                    n.style.fontSize = e + "px"
                }
                if (i(), a(), e.addEventListener("resize", a), e.addEventListener("pageshow", (function(e) { e.persisted && a() })), o >= 2) {
                    var r = t.createElement("body"),
                        s = t.createElement("div");
                    s.style.border = ".5px solid transparent", r.appendChild(s), n.appendChild(r), 1 === s.offsetHeight && n.classList.add("hairlines"), n.removeChild(r)
                }
            })(window, document)
        },
        "1b3b": function(e, t, n) {},
        "1fb7": function(e, t, n) {},
        "3de1": function(e, t, n) {
            "use strict";
            n.d(t, "b", (function() { return o })), n.d(t, "c", (function() { return i })), n.d(t, "a", (function() { return a }));
            n("6602"), n("bc4a"), n("9b24"), n("2769"), n("0c98"), n("1130"), n("c5ce"), n("b775");
            var o = navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1,
                i = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                a = (navigator.userAgent.toLowerCase().indexOf("micromessenger"), function(e) {
                    var t = new RegExp("(^|\\?|&)" + e + "=([^&]*)(&|$)"),
                        n = window.location.href.substr(1).match(t);
                    return null != n ? decodeURI(n[2]) : null
                })
        },
        "56d7": function(e, t, n) {
            "use strict";
            n.r(t);
            n("6ece"), n("8000"), n("8441"), n("d14b");
            var o = n("430a"),
                i = function() {
                    var e = this,
                        t = e.$createElement,
                        n = e._self._c || t;
                    return n("div", { staticStyle: { background: "var(--bgColor)", color: "var(--textColor)", "min-height": "100vh" }, attrs: { id: "app" } }, [n("transition", { attrs: { name: e.transitionName } }, [n("router-view")], 1)], 1)
                },
                a = [],
                r = { name: "app", data: function() { return { transitionName: "" } }, methods: {}, watch: { $route: function(e, t) { e.meta.index > 0 ? t.meta.index && (e.meta.index < t.meta.index ? this.transitionName = "slide-right" : this.transitionName = "slide-left") : 0 == e.meta.index && t.meta.index > 0 && (this.transitionName = "slide-right") } } },
                s = r,
                c = (n("034f"), n("4ac2")),
                d = Object(c["a"])(s, i, a, !1, null, null, null),
                u = d.exports,
                f = (n("b1fa"), n("2e6f"), n("af21"), n("0d84"), n("6afd"), n("a5e49"));
            o["a"].use(f["a"]);
            var p = [{ path: "/", redirect: "/index" }, { name: "index", component: function() { return Promise.all([n.e("chunk-7f313c1c"), n.e("chunk-b33bc068"), n.e("chunk-3f81ca5e"), n.e("chunk-509e2cae")]).then(n.bind(null, "7f5c")) }, meta: { title: "运动日历", index: 0 } }, { name: "clockoverview", component: function() { return Promise.all([n.e("chunk-7f313c1c"), n.e("chunk-3f81ca5e"), n.e("chunk-eadae544")]).then(n.bind(null, "67d4")) }, meta: { title: "打卡总览", index: 1 } }];
            p.forEach((function(e) { e.path = e.path || "/" + (e.name || "") }));
            var l = new f["a"]({ routes: p });
            l.beforeEach((function(e, t, n) {
                var o = e.meta && e.meta.title;
                o && (document.title = o), n()
            }));
            n("0dd0");
            var g = n("e21b");
            n("1b3b"), n("d31c"), n("0f43");
            o["a"].prototype.$interaction = g["a"], localStorage.removeItem("appInfo"), new o["a"]({ router: l, el: "#app", render: function(e) { return e(u) } })
        },
        "83d6": function(e, t, n) { e.exports = { title: "LAISITECH", host: "https://lsprod3.laisitech.com/" } },
        b775: function(e, t, n) {
            "use strict";
            n("6602");
            var o = n("bc4a"),
                i = (n("0d84"), n("6afd"), n("f49b"), n("2070"), n("2621"), n("b1fa"), n("73ef")),
                a = n.n(i),
                r = n("897d"),
                s = n.n(r),
                c = n("83d6"),
                d = n.n(c),
                u = n("3de1"),
                f = n("e21b"),
                p = a.a.create({ baseURL: d.a.host, withCredentials: !0, timeout: 1e5 });
            p.interceptors.request.use((function(e) {
                var t = {};
                t = Object(u["a"])("isShare") || Object(u["a"])("isShare2") ? { token: "SHARE", userId: Object(u["a"])("userId") || "" } : JSON.parse(localStorage.getItem("appInfo"));
                var n = (new Date).getTime(),
                    o = { appId: t.appId || "", timestamp: n, version: "v1", token: t.token || "", platform: t.platform || "", appVersion: t.appVersion || "", timeZone: t.timeZone || "", userId: t.userId },
                    i = {};
                Object.keys(o).sort().forEach((function(e) { i[e] = o[e] }));
                var a = [];
                for (var r in i) e.headers[r] = i[r], a.push(r + "=" + i[r]);
                return a.push("APP_SECRET=" + t.appSecret), a = a.join("&"), e.headers.LAISIH5 = "LAISIH5", e.headers.sign = s()(a).toLocaleUpperCase(), e
            })), p.interceptors.response.use((function(e) { var t = e.data; return 0 == t.code ? t : 2e3 != t.code ? 400 == t.code || 500 == t.code || 1e3 == t.code || 1500 == t.code || 2961 == t.code ? (t ? Object(o["a"])({ message: t.msg || "Error" }) : Object(o["a"])({ message: "系统异常" }), Promise.reject(t)) : t : Object(u["a"])("isShare") || Object(u["a"])("isShare2") ? void 0 : (f["a"].getAppInfoAndUserInfo(), p.request(e.config)) }), (function(e) { return Object(o["a"])({ message: "系统异常" }), console.log(e), Promise.reject(e) }));
            var l = function(e) {
                return new Promise((function(t, n) {
                    if (Object(u["a"])("isShare") || Object(u["a"])("isShare2")) t(e);
                    else { f["a"].getAppInfoAndUserInfo(); var o = setInterval((function() { localStorage.getItem("appInfo") && (t(e), clearInterval(o)) }), 100) }
                })).then((function(e) { return p(e) }), (function(e) { console.log(e) }))
            };
            t["a"] = l
        },
        d31c: function(e, t, n) {},
        e21b: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() { return r }));
            n("b1fa"), n("79fd"), n("45af");
            var o = n("3de1"),
                i = n("83d6"),
                a = n.n(i),
                r = {
                    appNative: function(e, t) { t || (t = {}); try { o["c"] ? (t.method = e, window.webkit.messageHandlers.lstNative.postMessage(t)) : o["b"] && window.android[e](JSON.stringify(t)) } catch (n) { console.log(n) } return new Promise((function(e, t) { e() })) },
                    getAppInfoAndUserInfo: function() { try { o["c"] ? window.webkit.messageHandlers.lstNative.postMessage("getAppInfo") : o["b"] && this.getAppInfo(window.android.getAppInfo()) } catch (e) { console.log(e) } },
                    getAppInfo: function(e) { localStorage.setItem("appInfo", e) },
                    pushToNextVC: function(e) {
                        if (e) {
                            var t = "";
                            t = o["c"] ? "/" + e : a.a.host + "/" + e, this.appNative("pushToNextVC", { htmlUrl: t })
                        }
                    },
                    closePage: function() { try { o["c"] ? window.webkit.messageHandlers.lstNative.postMessage({ method: "goBack" }) : o["b"] && window.android.goBack() } catch (e) { console.log(e) } },
                    sharePage: function(e) { if (e) try { o["c"] ? window.webkit.messageHandlers.lstNative.postMessage({ method: "sharePage", title: e.title, description: e.description, url: e.url }) : o["b"] && window.android.sharePage(JSON.stringify({ title: e.title, description: e.description, url: e.url })) } catch (t) { console.log(t) } },
                    visitPersonalHomepage: function(e) { e && (o["c"] ? window.webkit.messageHandlers.lstNative.postMessage({ method: "visitPersonalHomepage", visitUserId: e }) : o["b"] && window.android.visitPersonalHomepage(JSON.stringify({ visitUserId: e }))) },
                    gotoGetConnectedMac: function() { try { o["c"] ? window.webkit.messageHandlers.lstNative.postMessage("getConnectedMac") : o["b"] && getConnectedMac(window.android.getConnectedMac()) } catch (e) { console.log(e) } },
                    VIDEO_flag: !1,
                    appWebviewOpen: function(e) { console.log("appWebviewOpen") },
                    appWebviewClose: function() { console.log("appWebviewClose") },
                    umengStatistics: function(e, t) { o["c"] ? window.webkit.messageHandlers.lstNative.postMessage({ method: "umengStatistics", event: e, bannerId: t }) : o["b"] && window.android.umengStatistics(JSON.stringify({ event: e, bannerId: t })) }
                };
            window.appWebviewOpen = function() {}, window.appWebviewClose = function() {}, window.getAppInfo = r.getAppInfo
        }
    },
    [
        [0, "runtime", "chunk-libs"]
    ]
]);