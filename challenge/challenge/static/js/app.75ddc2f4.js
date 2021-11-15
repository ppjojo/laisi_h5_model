(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["app"], { 0: function(e, t, n) { e.exports = n("56d7") }, "034f": function(e, t, n) { "use strict";
            n("1fb7") }, "0dd0": function(e, t) {
            (function(e, t) { var n = t.documentElement,
                    o = e.devicePixelRatio || 1;

                function a() { t.body ? t.body.style.fontSize = 12 * o + "px" : t.addEventListener("DOMContentLoaded", a) }

                function i() { var e = n.clientWidth / 7.5;
                    n.style.fontSize = e + "px" } if (a(), i(), e.addEventListener("resize", i), e.addEventListener("pageshow", (function(e) { e.persisted && i() })), o >= 2) { var s = t.createElement("body"),
                        r = t.createElement("div");
                    r.style.border = ".5px solid transparent", s.appendChild(r), n.appendChild(s), 1 === r.offsetHeight && n.classList.add("hairlines"), n.removeChild(s) } })(window, document) }, "1b3b": function(e, t, n) {}, "1fb7": function(e, t, n) {}, "3de1": function(e, t, n) { "use strict";
            n.d(t, "b", (function() { return o })), n.d(t, "c", (function() { return a })), n.d(t, "a", (function() { return i }));
            n("5d84"), n("ec69"), n("2959"), n("6a4a"), n("703a"), n("83bd"), n("70ac"), n("b775"); var o = navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1,
                a = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                i = (navigator.userAgent.toLowerCase().indexOf("micromessenger"), function(e) { var t = new RegExp("(^|\\?|&)" + e + "=([^&]*)(&|$)"),
                        n = window.location.href.substr(1).match(t); return null != n ? decodeURI(n[2]) : null }) }, "56d7": function(e, t, n) { "use strict";
            n.r(t);
            n("6b5e"), n("b681"), n("4855"), n("a43b"); var o = n("430a"),
                a = function() { var e = this,
                        t = e.$createElement,
                        n = e._self._c || t; return n("div", { staticStyle: { background: "var(--bgColor)", color: "#fff", "min-height": "100vh" }, attrs: { id: "app" } }, [n("transition", { attrs: { name: e.transitionName } }, [n("router-view")], 1)], 1) },
                i = [],
                s = { name: "app", data: function() { return { transitionName: "" } }, methods: {}, watch: { $route: function(e, t) { e.meta.index > 0 ? t.meta.index && (e.meta.index < t.meta.index ? this.transitionName = "slide-right" : this.transitionName = "slide-left") : 0 == e.meta.index && t.meta.index > 0 && (this.transitionName = "slide-right") } } },
                r = s,
                c = (n("034f"), n("4ac2")),
                d = Object(c["a"])(r, a, i, !1, null, null, null),
                p = d.exports,
                u = (n("a73a"), n("3dbb"), n("dcba"), n("d2ab"), n("f5f5"), n("a5e4"));
            o["a"].use(u["a"]); var l = [{ path: "*", redirect: "/index" }, { name: "index", component: function() { return Promise.all([n.e("chunk-1ff20772"), n.e("chunk-60792b3a")]).then(n.bind(null, "7f5c")) }, meta: { title: "今日挑战", index: 0 } }];
            l.forEach((function(e) { e.path = e.path || "/" + (e.name || "") })); var f = new u["a"]({ routes: l });
            f.beforeEach((function(e, t, n) { var o = e.meta && e.meta.title;
                o && (document.title = o), n() }));
            n("0dd0"); var g = n("e21b");
            n("1b3b"), n("a342"), n("7e71");
            o["a"].prototype.$interaction = g["a"], localStorage.removeItem("appInfo"), new o["a"]({ router: f, el: "#app", render: function(e) { return e(p) } }) }, "83d6": function(e, t, n) { e.exports = { title: "LAISITECH", host: "https://lsprod3.laisitech.com/" } }, a342: function(e, t, n) {}, b775: function(e, t, n) { "use strict";
            n("5d84"); var o = n("ec69"),
                a = (n("d2ab"), n("f5f5"), n("8920"), n("8abd"), n("b7d4"), n("a73a"), n("73ef")),
                i = n.n(a),
                s = n("897d"),
                r = n.n(s),
                c = n("83d6"),
                d = n.n(c),
                p = n("3de1"),
                u = n("e21b"),
                l = i.a.create({ baseURL: d.a.host, withCredentials: !0, timeout: 1e5 });
            l.interceptors.request.use((function(e) { var t = {};
                t = Object(p["a"])("isShare") ? { token: "SHARE", userId: Object(p["a"])("userId") || "" } : JSON.parse(localStorage.getItem("appInfo")); var n = (new Date).getTime(),
                    o = { appId: t.appId || "", timestamp: n, version: "v1", token: t.token || "", platform: t.platform || "", appVersion: t.appVersion || "", timeZone: t.timeZone || "", userId: t.userId },
                    a = {};
                Object.keys(o).sort().forEach((function(e) { a[e] = o[e] })); var i = []; for (var s in a) e.headers[s] = a[s], i.push(s + "=" + a[s]); return i.push("APP_SECRET=" + t.appSecret), i = i.join("&"), e.headers.LAISIH5 = "LAISIH5", e.headers.sign = r()(i).toLocaleUpperCase(), e })), l.interceptors.response.use((function(e) { var t = e.data; return 0 == t.code ? t : 2e3 != t.code ? 400 == t.code || 500 == t.code || 1e3 == t.code || 1500 == t.code || 2961 == t.code ? (t ? Object(o["a"])({ message: t.msg || "Error" }) : Object(o["a"])({ message: "系统异常" }), Promise.reject(t)) : t : Object(p["a"])("isShare") ? void 0 : (u["a"].getAppInfoAndUserInfo(), l.request(e.config)) }), (function(e) { return Object(o["a"])({ message: "系统异常" }), console.log(e), Promise.reject(e) })); var f = function(e) { return new Promise((function(t, n) { if (Object(p["a"])("isShare")) t(e);
                    else { u["a"].getAppInfoAndUserInfo(); var o = setInterval((function() { localStorage.getItem("appInfo") && (t(e), clearInterval(o)) }), 100) } })).then((function(e) { return l(e) }), (function(e) { console.log(e) })) };
            t["a"] = f }, e21b: function(e, t, n) { "use strict";
            n.d(t, "a", (function() { return s }));
            n("a73a"), n("c958"), n("839d"); var o = n("3de1"),
                a = n("83d6"),
                i = n.n(a),
                s = { appNative: function(e, t) { t || (t = {}); try { o["c"] ? (t.method = e, window.webkit.messageHandlers.lstNative.postMessage(t)) : o["b"] && window.android[e](JSON.stringify(t)) } catch (n) { console.log(n) } return new Promise((function(e, t) { e() })) }, getAppInfoAndUserInfo: function() { try { o["c"] ? window.webkit.messageHandlers.lstNative.postMessage("getAppInfo") : o["b"] && this.getAppInfo(window.android.getAppInfo()) } catch (e) { console.log(e) } }, getAppInfo: function(e) { localStorage.setItem("appInfo", e) }, pushToNextVC: function(e) { if (e) { var t = "";
                            t = o["c"] ? "/" + e : i.a.host + "/" + e, this.appNative("pushToNextVC", { htmlUrl: t }) } }, closePage: function() { try { o["c"] ? window.webkit.messageHandlers.lstNative.postMessage({ method: "goBack" }) : o["b"] && window.android.goBack() } catch (e) { console.log(e) } }, sharePage: function(e) { if (e) try { o["c"] ? window.webkit.messageHandlers.lstNative.postMessage({ method: "sharePage", title: e.title, description: e.description, url: e.url }) : o["b"] && window.android.sharePage(JSON.stringify({ title: e.title, description: e.description, url: e.url })) } catch (t) { console.log(t) } }, visitPersonalHomepage: function(e) { e && (o["c"] ? window.webkit.messageHandlers.lstNative.postMessage({ method: "visitPersonalHomepage", visitUserId: e }) : o["b"] && window.android.visitPersonalHomepage(JSON.stringify({ visitUserId: e }))) }, gotoGetConnectedMac: function() { try { o["c"] ? window.webkit.messageHandlers.lstNative.postMessage("getConnectedMac") : o["b"] && getConnectedMac(window.android.getConnectedMac()) } catch (e) { console.log(e) } }, VIDEO_flag: !1, appWebviewOpen: function(e) { console.log("appWebviewOpen") }, appWebviewClose: function() { console.log("appWebviewClose") }, umengStatistics: function(e, t) { o["c"] ? window.webkit.messageHandlers.lstNative.postMessage({ method: "umengStatistics", event: e, bannerId: t }) : o["b"] && window.android.umengStatistics(JSON.stringify({ event: e, bannerId: t })) } };
            window.appWebviewOpen = function() {}, window.appWebviewClose = function() {}, window.getAppInfo = s.getAppInfo } },
    [
        [0, "runtime", "chunk-libs"]
    ]
]);