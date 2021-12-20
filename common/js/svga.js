! function(e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.SVGA = t() : e.SVGA = t() }(window, (function() {
    return function(e) {
        function t(i) { if (r[i]) return r[i].exports; var n = r[i] = { i: i, l: !1, exports: {} }; return e[i].call(n.exports, n, n.exports, t), n.l = !0, n.exports }
        var r = {};
        return t.m = e, t.c = r, t.d = function(e, r, i) { t.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: i }) }, t.r = function(e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, t.t = function(e, r) {
            if (1 & r && (e = t(e)), 8 & r) return e;
            if (4 & r && "object" == typeof e && e && e.__esModule) return e;
            var i = Object.create(null);
            if (t.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: e }), 2 & r && "string" != typeof e)
                for (var n in e) t.d(i, n, function(t) { return e[t] }.bind(null, n));
            return i
        }, t.n = function(e) { var r = e && e.__esModule ? function() { return e.default } : function() { return e }; return t.d(r, "a", r), r }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 64)
    }([function(e, t, r) {
        "use strict";
        var i, n, o = e.exports = r(1),
            s = r(20);
        o.codegen = r(47), o.fetch = r(48), o.path = r(49), o.fs = o.inquire("fs"), o.toArray = function(e) { if (e) { for (var t = Object.keys(e), r = new Array(t.length), i = 0; i < t.length;) r[i] = e[t[i++]]; return r } return [] }, o.toObject = function(e) {
            for (var t = {}, r = 0; r < e.length;) {
                var i = e[r++],
                    n = e[r++];
                void 0 !== n && (t[i] = n)
            }
            return t
        };
        var a = /\\/g,
            f = /"/g;
        o.isReserved = function(e) { return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(e) }, o.safeProp = function(e) { return !/^[$\w_]+$/.test(e) || o.isReserved(e) ? '["' + e.replace(a, "\\\\").replace(f, '\\"') + '"]' : "." + e }, o.ucFirst = function(e) { return e.charAt(0).toUpperCase() + e.substring(1) };
        var l = /_([a-z])/g;
        o.camelCase = function(e) { return e.substring(0, 1) + e.substring(1).replace(l, (function(e, t) { return t.toUpperCase() })) }, o.compareFieldsById = function(e, t) { return e.id - t.id }, o.decorateType = function(e, t) {
            if (e.$type) return t && e.$type.name !== t && (o.decorateRoot.remove(e.$type), e.$type.name = t, o.decorateRoot.add(e.$type)), e.$type;
            i || (i = r(22));
            var n = new i(t || e.name);
            return o.decorateRoot.add(n), n.ctor = e, Object.defineProperty(e, "$type", { value: n, enumerable: !1 }), Object.defineProperty(e.prototype, "$type", { value: n, enumerable: !1 }), n
        };
        var u = 0;
        o.decorateEnum = function(e) {
            if (e.$type) return e.$type;
            n || (n = r(2));
            var t = new n("Enum" + u++, e);
            return o.decorateRoot.add(t), Object.defineProperty(e, "$type", { value: t, enumerable: !1 }), t
        }, o.setProperty = function(e, t, r) {
            if ("object" != typeof e) throw TypeError("dst must be an object");
            if (!t) throw TypeError("path must be specified");
            return function e(t, r, i) {
                var n = r.shift();
                if (r.length > 0) t[n] = e(t[n] || {}, r, i);
                else {
                    var o = t[n];
                    o && (i = [].concat(o).concat(i)), t[n] = i
                }
                return t
            }(e, t = t.split("."), r)
        }, Object.defineProperty(o, "decorateRoot", { get: function() { return s.decorated || (s.decorated = new(r(30))) } })
    }, function(e, t, r) {
        "use strict";
        (function(e) {
            function i(e, t, r) { for (var i = Object.keys(t), n = 0; n < i.length; ++n) void 0 !== e[i[n]] && r || (e[i[n]] = t[i[n]]); return e }

            function n(e) {
                function t(e, r) {
                    if (!(this instanceof t)) return new t(e, r);
                    Object.defineProperty(this, "message", { get: function() { return e } }), Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", { value: (new Error).stack || "" }), r && i(this, r)
                }
                return (t.prototype = Object.create(Error.prototype)).constructor = t, Object.defineProperty(t.prototype, "name", { get: function() { return e } }), t.prototype.toString = function() { return this.name + ": " + this.message }, t
            }
            var o = t;
            o.asPromise = r(17), o.base64 = r(38), o.EventEmitter = r(39), o.float = r(40), o.inquire = r(18), o.utf8 = r(41), o.pool = r(42), o.LongBits = r(43), o.isNode = Boolean(void 0 !== e && e && e.process && e.process.versions && e.process.versions.node), o.global = o.isNode && e || "undefined" != typeof window && window || "undefined" != typeof self && self || this, o.emptyArray = Object.freeze ? Object.freeze([]) : [], o.emptyObject = Object.freeze ? Object.freeze({}) : {}, o.isInteger = Number.isInteger || function(e) { return "number" == typeof e && isFinite(e) && Math.floor(e) === e }, o.isString = function(e) { return "string" == typeof e || e instanceof String }, o.isObject = function(e) { return e && "object" == typeof e }, o.isset = o.isSet = function(e, t) { var r = e[t]; return !(null == r || !e.hasOwnProperty(t)) && ("object" != typeof r || (Array.isArray(r) ? r.length : Object.keys(r).length) > 0) }, o.Buffer = function() { try { var e = o.inquire("buffer").Buffer; return e.prototype.utf8Write ? e : null } catch (e) { return null } }(), o._Buffer_from = null, o._Buffer_allocUnsafe = null, o.newBuffer = function(e) { return "number" == typeof e ? o.Buffer ? o._Buffer_allocUnsafe(e) : new o.Array(e) : o.Buffer ? o._Buffer_from(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e) }, o.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, o.Long = o.global.dcodeIO && o.global.dcodeIO.Long || o.global.Long || o.inquire("long"), o.key2Re = /^true|false|0|1$/, o.key32Re = /^-?(?:0|[1-9][0-9]*)$/, o.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/, o.longToHash = function(e) { return e ? o.LongBits.from(e).toHash() : o.LongBits.zeroHash }, o.longFromHash = function(e, t) { var r = o.LongBits.fromHash(e); return o.Long ? o.Long.fromBits(r.lo, r.hi, t) : r.toNumber(Boolean(t)) }, o.merge = i, o.lcFirst = function(e) { return e.charAt(0).toLowerCase() + e.substring(1) }, o.newError = n, o.ProtocolError = n("ProtocolError"), o.oneOfGetter = function(e) {
                for (var t = {}, r = 0; r < e.length; ++r) t[e[r]] = 1;
                return function() {
                    for (var e = Object.keys(this), r = e.length - 1; r > -1; --r)
                        if (1 === t[e[r]] && void 0 !== this[e[r]] && null !== this[e[r]]) return e[r]
                }
            }, o.oneOfSetter = function(e) { return function(t) { for (var r = 0; r < e.length; ++r) e[r] !== t && delete this[e[r]] } }, o.toJSONOptions = { longs: String, enums: String, bytes: String, json: !0 }, o._configure = function() {
                var e = o.Buffer;
                e ? (o._Buffer_from = e.from !== Uint8Array.from && e.from || function(t, r) { return new e(t, r) }, o._Buffer_allocUnsafe = e.allocUnsafe || function(t) { return new e(t) }) : o._Buffer_from = o._Buffer_allocUnsafe = null
            }
        }).call(this, r(37))
    }, function(e, t, r) {
        "use strict";

        function i(e, t, r, i, o) {
            if (n.call(this, e, r), t && "object" != typeof t) throw TypeError("values must be an object");
            if (this.valuesById = {}, this.values = Object.create(this.valuesById), this.comment = i, this.comments = o || {}, this.reserved = void 0, t)
                for (var s = Object.keys(t), a = 0; a < s.length; ++a) "number" == typeof t[s[a]] && (this.valuesById[this.values[s[a]] = t[s[a]]] = s[a])
        }
        e.exports = i;
        var n = r(3);
        ((i.prototype = Object.create(n.prototype)).constructor = i).className = "Enum";
        var o = r(6),
            s = r(0);
        i.fromJSON = function(e, t) { var r = new i(e, t.values, t.options, t.comment, t.comments); return r.reserved = t.reserved, r }, i.prototype.toJSON = function(e) { var t = !!e && Boolean(e.keepComments); return s.toObject(["options", this.options, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "comment", t ? this.comment : void 0, "comments", t ? this.comments : void 0]) }, i.prototype.add = function(e, t, r) {
            if (!s.isString(e)) throw TypeError("name must be a string");
            if (!s.isInteger(t)) throw TypeError("id must be an integer");
            if (void 0 !== this.values[e]) throw Error("duplicate name '" + e + "' in " + this);
            if (this.isReservedId(t)) throw Error("id " + t + " is reserved in " + this);
            if (this.isReservedName(e)) throw Error("name '" + e + "' is reserved in " + this);
            if (void 0 !== this.valuesById[t]) {
                if (!this.options || !this.options.allow_alias) throw Error("duplicate id " + t + " in " + this);
                this.values[e] = t
            } else this.valuesById[this.values[e] = t] = e;
            return this.comments[e] = r || null, this
        }, i.prototype.remove = function(e) { if (!s.isString(e)) throw TypeError("name must be a string"); var t = this.values[e]; if (null == t) throw Error("name '" + e + "' does not exist in " + this); return delete this.valuesById[t], delete this.values[e], delete this.comments[e], this }, i.prototype.isReservedId = function(e) { return o.isReservedId(this.reserved, e) }, i.prototype.isReservedName = function(e) { return o.isReservedName(this.reserved, e) }
    }, function(e, t, r) {
        "use strict";

        function i(e, t) {
            if (!o.isString(e)) throw TypeError("name must be a string");
            if (t && !o.isObject(t)) throw TypeError("options must be an object");
            this.options = t, this.parsedOptions = null, this.name = e, this.parent = null, this.resolved = !1, this.comment = null, this.filename = null
        }
        e.exports = i, i.className = "ReflectionObject";
        var n, o = r(0);
        Object.defineProperties(i.prototype, { root: { get: function() { for (var e = this; null !== e.parent;) e = e.parent; return e } }, fullName: { get: function() { for (var e = [this.name], t = this.parent; t;) e.unshift(t.name), t = t.parent; return e.join(".") } } }), i.prototype.toJSON = function() { throw Error() }, i.prototype.onAdd = function(e) {
            this.parent && this.parent !== e && this.parent.remove(this), this.parent = e, this.resolved = !1;
            var t = e.root;
            t instanceof n && t._handleAdd(this)
        }, i.prototype.onRemove = function(e) {
            var t = e.root;
            t instanceof n && t._handleRemove(this), this.parent = null, this.resolved = !1
        }, i.prototype.resolve = function() { return this.resolved ? this : (this.root instanceof n && (this.resolved = !0), this) }, i.prototype.getOption = function(e) { if (this.options) return this.options[e] }, i.prototype.setOption = function(e, t, r) { return r && this.options && void 0 !== this.options[e] || ((this.options || (this.options = {}))[e] = t), this }, i.prototype.setParsedOption = function(e, t, r) {
            this.parsedOptions || (this.parsedOptions = []);
            var i = this.parsedOptions;
            if (r) {
                var n = i.find((function(t) { return Object.prototype.hasOwnProperty.call(t, e) }));
                if (n) {
                    var s = n[e];
                    o.setProperty(s, r, t)
                } else(n = {})[e] = o.setProperty({}, r, t), i.push(n)
            } else {
                var a = {};
                a[e] = t, i.push(a)
            }
            return this
        }, i.prototype.setOptions = function(e, t) {
            if (e)
                for (var r = Object.keys(e), i = 0; i < r.length; ++i) this.setOption(r[i], e[r[i]], t);
            return this
        }, i.prototype.toString = function() {
            var e = this.constructor.className,
                t = this.fullName;
            return t.length ? e + " " + t : e
        }, i._configure = function(e) { n = e }
    }, function(e, t, r) {
        "use strict";

        function i(e, t, r, i, o, s, u) {
            if (f.isObject(i) ? (u = o, s = i, i = o = void 0) : f.isObject(o) && (u = s, s = o, o = void 0), n.call(this, e, s), !f.isInteger(t) || t < 0) throw TypeError("id must be a non-negative integer");
            if (!f.isString(r)) throw TypeError("type must be a string");
            if (void 0 !== i && !l.test(i = i.toString().toLowerCase())) throw TypeError("rule must be a string rule");
            if (void 0 !== o && !f.isString(o)) throw TypeError("extend must be a string");
            this.rule = i && "optional" !== i ? i : void 0, this.type = r, this.id = t, this.extend = o || void 0, this.required = "required" === i, this.optional = !this.required, this.repeated = "repeated" === i, this.map = !1, this.message = null, this.partOf = null, this.typeDefault = null, this.defaultValue = null, this.long = !!f.Long && void 0 !== a.long[r], this.bytes = "bytes" === r, this.resolvedType = null, this.extensionField = null, this.declaringField = null, this._packed = null, this.comment = u
        }
        e.exports = i;
        var n = r(3);
        ((i.prototype = Object.create(n.prototype)).constructor = i).className = "Field";
        var o, s = r(2),
            a = r(7),
            f = r(0),
            l = /^required|optional|repeated$/;
        i.fromJSON = function(e, t) { return new i(e, t.id, t.type, t.rule, t.extend, t.options, t.comment) }, Object.defineProperty(i.prototype, "packed", { get: function() { return null === this._packed && (this._packed = !1 !== this.getOption("packed")), this._packed } }), i.prototype.setOption = function(e, t, r) { return "packed" === e && (this._packed = null), n.prototype.setOption.call(this, e, t, r) }, i.prototype.toJSON = function(e) { var t = !!e && Boolean(e.keepComments); return f.toObject(["rule", "optional" !== this.rule && this.rule || void 0, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t ? this.comment : void 0]) }, i.prototype.resolve = function() {
            if (this.resolved) return this;
            if (void 0 === (this.typeDefault = a.defaults[this.type]) && (this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type), this.resolvedType instanceof o ? this.typeDefault = null : this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]), this.options && null != this.options.default && (this.typeDefault = this.options.default, this.resolvedType instanceof s && "string" == typeof this.typeDefault && (this.typeDefault = this.resolvedType.values[this.typeDefault])), this.options && (!0 !== this.options.packed && (void 0 === this.options.packed || !this.resolvedType || this.resolvedType instanceof s) || delete this.options.packed, Object.keys(this.options).length || (this.options = void 0)), this.long) this.typeDefault = f.Long.fromNumber(this.typeDefault, "u" === this.type.charAt(0)), Object.freeze && Object.freeze(this.typeDefault);
            else if (this.bytes && "string" == typeof this.typeDefault) {
                var e;
                f.base64.test(this.typeDefault) ? f.base64.decode(this.typeDefault, e = f.newBuffer(f.base64.length(this.typeDefault)), 0) : f.utf8.write(this.typeDefault, e = f.newBuffer(f.utf8.length(this.typeDefault)), 0), this.typeDefault = e
            }
            return this.map ? this.defaultValue = f.emptyObject : this.repeated ? this.defaultValue = f.emptyArray : this.defaultValue = this.typeDefault, this.parent instanceof o && (this.parent.ctor.prototype[this.name] = this.defaultValue), n.prototype.resolve.call(this)
        }, i.d = function(e, t, r, n) {
            return "function" == typeof t ? t = f.decorateType(t).name : t && "object" == typeof t && (t = f.decorateEnum(t).name),
                function(o, s) { f.decorateType(o.constructor).add(new i(s, e, t, r, { default: n })) }
        }, i._configure = function(e) { o = e }
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.BezierPath = function e(t, r, i) {
            (function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") })(this, e), this._d = t, this._transform = r, this._styles = i
        }
    }, function(e, t, r) {
        "use strict";

        function i(e, t) { if (e && e.length) { for (var r = {}, i = 0; i < e.length; ++i) r[e[i].name] = e[i].toJSON(t); return r } }

        function n(e, t) { s.call(this, e, t), this.nested = void 0, this._nestedArray = null }

        function o(e) { return e._nestedArray = null, e }
        e.exports = n;
        var s = r(3);
        ((n.prototype = Object.create(s.prototype)).constructor = n).className = "Namespace";
        var a, f, l, u = r(4),
            h = r(0);
        n.fromJSON = function(e, t) { return new n(e, t.options).addJSON(t.nested) }, n.arrayToJSON = i, n.isReservedId = function(e, t) {
            if (e)
                for (var r = 0; r < e.length; ++r)
                    if ("string" != typeof e[r] && e[r][0] <= t && e[r][1] > t) return !0;
            return !1
        }, n.isReservedName = function(e, t) {
            if (e)
                for (var r = 0; r < e.length; ++r)
                    if (e[r] === t) return !0;
            return !1
        }, Object.defineProperty(n.prototype, "nestedArray", { get: function() { return this._nestedArray || (this._nestedArray = h.toArray(this.nested)) } }), n.prototype.toJSON = function(e) { return h.toObject(["options", this.options, "nested", i(this.nestedArray, e)]) }, n.prototype.addJSON = function(e) {
            if (e)
                for (var t, r = Object.keys(e), i = 0; i < r.length; ++i) t = e[r[i]], this.add((void 0 !== t.fields ? a.fromJSON : void 0 !== t.values ? l.fromJSON : void 0 !== t.methods ? f.fromJSON : void 0 !== t.id ? u.fromJSON : n.fromJSON)(r[i], t));
            return this
        }, n.prototype.get = function(e) { return this.nested && this.nested[e] || null }, n.prototype.getEnum = function(e) { if (this.nested && this.nested[e] instanceof l) return this.nested[e].values; throw Error("no such enum: " + e) }, n.prototype.add = function(e) {
            if (!(e instanceof u && void 0 !== e.extend || e instanceof a || e instanceof l || e instanceof f || e instanceof n)) throw TypeError("object must be a valid nested object");
            if (this.nested) {
                var t = this.get(e.name);
                if (t) {
                    if (!(t instanceof n && e instanceof n) || t instanceof a || t instanceof f) throw Error("duplicate name '" + e.name + "' in " + this);
                    for (var r = t.nestedArray, i = 0; i < r.length; ++i) e.add(r[i]);
                    this.remove(t), this.nested || (this.nested = {}), e.setOptions(t.options, !0)
                }
            } else this.nested = {};
            return this.nested[e.name] = e, e.onAdd(this), o(this)
        }, n.prototype.remove = function(e) { if (!(e instanceof s)) throw TypeError("object must be a ReflectionObject"); if (e.parent !== this) throw Error(e + " is not a member of " + this); return delete this.nested[e.name], Object.keys(this.nested).length || (this.nested = void 0), e.onRemove(this), o(this) }, n.prototype.define = function(e, t) {
            if (h.isString(e)) e = e.split(".");
            else if (!Array.isArray(e)) throw TypeError("illegal path");
            if (e && e.length && "" === e[0]) throw Error("path must be relative");
            for (var r = this; e.length > 0;) { var i = e.shift(); if (r.nested && r.nested[i]) { if (!((r = r.nested[i]) instanceof n)) throw Error("path conflicts with non-namespace objects") } else r.add(r = new n(i)) }
            return t && r.addJSON(t), r
        }, n.prototype.resolveAll = function() { for (var e = this.nestedArray, t = 0; t < e.length;) e[t] instanceof n ? e[t++].resolveAll() : e[t++].resolve(); return this.resolve() }, n.prototype.lookup = function(e, t, r) {
            if ("boolean" == typeof t ? (r = t, t = void 0) : t && !Array.isArray(t) && (t = [t]), h.isString(e) && e.length) {
                if ("." === e) return this.root;
                e = e.split(".")
            } else if (!e.length) return this;
            if ("" === e[0]) return this.root.lookup(e.slice(1), t);
            var i = this.get(e[0]);
            if (i) { if (1 === e.length) { if (!t || t.indexOf(i.constructor) > -1) return i } else if (i instanceof n && (i = i.lookup(e.slice(1), t, !0))) return i } else
                for (var o = 0; o < this.nestedArray.length; ++o)
                    if (this._nestedArray[o] instanceof n && (i = this._nestedArray[o].lookup(e, t, !0))) return i; return null === this.parent || r ? null : this.parent.lookup(e, t)
        }, n.prototype.lookupType = function(e) { var t = this.lookup(e, [a]); if (!t) throw Error("no such type: " + e); return t }, n.prototype.lookupEnum = function(e) { var t = this.lookup(e, [l]); if (!t) throw Error("no such Enum '" + e + "' in " + this); return t }, n.prototype.lookupTypeOrEnum = function(e) { var t = this.lookup(e, [a, l]); if (!t) throw Error("no such Type or Enum '" + e + "' in " + this); return t }, n.prototype.lookupService = function(e) { var t = this.lookup(e, [f]); if (!t) throw Error("no such Service '" + e + "' in " + this); return t }, n._configure = function(e, t, r) { a = e, f = t, l = r }
    }, function(e, t, r) {
        "use strict";

        function i(e, t) {
            var r = 0,
                i = {};
            for (t |= 0; r < e.length;) i[s[r + t]] = e[r++];
            return i
        }
        var n = t,
            o = r(0),
            s = ["double", "float", "int32", "uint32", "sint32", "fixed32", "sfixed32", "int64", "uint64", "sint64", "fixed64", "sfixed64", "bool", "string", "bytes"];
        n.basic = i([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2]), n.defaults = i([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, !1, "", o.emptyArray, null]), n.long = i([0, 0, 0, 1, 1], 7), n.mapKey = i([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2), n.packed = i([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0])
    }, function(e, t, r) {
        "use strict";

        function i(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }
        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        t.assign = function(e) { for (var t = Array.prototype.slice.call(arguments, 1); t.length;) { var r = t.shift(); if (r) { if ("object" != typeof r) throw new TypeError(r + "must be non-object"); for (var n in r) i(r, n) && (e[n] = r[n]) } } return e }, t.shrinkBuf = function(e, t) { return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e) };
        var o = {
                arraySet: function(e, t, r, i, n) {
                    if (t.subarray && e.subarray) e.set(t.subarray(r, r + i), n);
                    else
                        for (var o = 0; o < i; o++) e[n + o] = t[r + o]
                },
                flattenChunks: function(e) { var t, r, i, n, o, s; for (i = 0, t = 0, r = e.length; t < r; t++) i += e[t].length; for (s = new Uint8Array(i), n = 0, t = 0, r = e.length; t < r; t++) o = e[t], s.set(o, n), n += o.length; return s }
            },
            s = { arraySet: function(e, t, r, i, n) { for (var o = 0; o < i; o++) e[n + o] = t[r + o] }, flattenChunks: function(e) { return [].concat.apply([], e) } };
        t.setTyped = function(e) { e ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, o)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, s)) }, t.setTyped(n)
    }, function(e, t, r) {
        "use strict";

        function i(e, t, r) { this.fn = e, this.len = t, this.next = void 0, this.val = r }

        function n() {}

        function o(e) { this.head = e.head, this.tail = e.tail, this.len = e.len, this.next = e.states }

        function s() { this.len = 0, this.head = new i(n, 0, 0), this.tail = this.head, this.states = null }

        function a(e, t, r) { t[r] = 255 & e }

        function f(e, t) { this.len = e, this.next = void 0, this.val = t }

        function l(e, t, r) {
            for (; e.hi;) t[r++] = 127 & e.lo | 128, e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0, e.hi >>>= 7;
            for (; e.lo > 127;) t[r++] = 127 & e.lo | 128, e.lo = e.lo >>> 7;
            t[r++] = e.lo
        }

        function u(e, t, r) { t[r] = 255 & e, t[r + 1] = e >>> 8 & 255, t[r + 2] = e >>> 16 & 255, t[r + 3] = e >>> 24 }
        e.exports = s;
        var h, c = r(1),
            d = c.LongBits,
            p = c.base64,
            y = c.utf8,
            m = function() { return c.Buffer ? function() { return (s.create = function() { return new h })() } : function() { return new s } };
        s.create = m(), s.alloc = function(e) { return new c.Array(e) }, c.Array !== Array && (s.alloc = c.pool(s.alloc, c.Array.prototype.subarray)), s.prototype._push = function(e, t, r) { return this.tail = this.tail.next = new i(e, t, r), this.len += t, this }, f.prototype = Object.create(i.prototype), f.prototype.fn = function(e, t, r) {
            for (; e > 127;) t[r++] = 127 & e | 128, e >>>= 7;
            t[r] = e
        }, s.prototype.uint32 = function(e) { return this.len += (this.tail = this.tail.next = new f((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5, e)).len, this }, s.prototype.int32 = function(e) { return e < 0 ? this._push(l, 10, d.fromNumber(e)) : this.uint32(e) }, s.prototype.sint32 = function(e) { return this.uint32((e << 1 ^ e >> 31) >>> 0) }, s.prototype.uint64 = function(e) { var t = d.from(e); return this._push(l, t.length(), t) }, s.prototype.int64 = s.prototype.uint64, s.prototype.sint64 = function(e) { var t = d.from(e).zzEncode(); return this._push(l, t.length(), t) }, s.prototype.bool = function(e) { return this._push(a, 1, e ? 1 : 0) }, s.prototype.fixed32 = function(e) { return this._push(u, 4, e >>> 0) }, s.prototype.sfixed32 = s.prototype.fixed32, s.prototype.fixed64 = function(e) { var t = d.from(e); return this._push(u, 4, t.lo)._push(u, 4, t.hi) }, s.prototype.sfixed64 = s.prototype.fixed64, s.prototype.float = function(e) { return this._push(c.float.writeFloatLE, 4, e) }, s.prototype.double = function(e) { return this._push(c.float.writeDoubleLE, 8, e) };
        var v = c.Array.prototype.set ? function(e, t, r) { t.set(e, r) } : function(e, t, r) { for (var i = 0; i < e.length; ++i) t[r + i] = e[i] };
        s.prototype.bytes = function(e) {
            var t = e.length >>> 0;
            if (!t) return this._push(a, 1, 0);
            if (c.isString(e)) {
                var r = s.alloc(t = p.length(e));
                p.decode(e, r, 0), e = r
            }
            return this.uint32(t)._push(v, t, e)
        }, s.prototype.string = function(e) { var t = y.length(e); return t ? this.uint32(t)._push(y.write, t, e) : this._push(a, 1, 0) }, s.prototype.fork = function() { return this.states = new o(this), this.head = this.tail = new i(n, 0, 0), this.len = 0, this }, s.prototype.reset = function() { return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new i(n, 0, 0), this.len = 0), this }, s.prototype.ldelim = function() {
            var e = this.head,
                t = this.tail,
                r = this.len;
            return this.reset().uint32(r), r && (this.tail.next = e.next, this.tail = t, this.len += r), this
        }, s.prototype.finish = function() { for (var e = this.head.next, t = this.constructor.alloc(this.len), r = 0; e;) e.fn(e.val, t, r), r += e.len, e = e.next; return t }, s._configure = function(e) { h = e, s.create = m(), h._configure() }
    }, function(e, t, r) {
        "use strict";

        function i(e, t) { return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len) }

        function n(e) { this.buf = e, this.pos = 0, this.len = e.length }

        function o() {
            var e = new u(0, 0),
                t = 0;
            if (!(this.len - this.pos > 4)) { for (; t < 3; ++t) { if (this.pos >= this.len) throw i(this); if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0, this.buf[this.pos++] < 128) return e } return e.lo = (e.lo | (127 & this.buf[this.pos++]) << 7 * t) >>> 0, e }
            for (; t < 4; ++t)
                if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0, this.buf[this.pos++] < 128) return e;
            if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 28) >>> 0, e.hi = (e.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return e;
            if (t = 0, this.len - this.pos > 4) {
                for (; t < 5; ++t)
                    if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0, this.buf[this.pos++] < 128) return e
            } else
                for (; t < 5; ++t) { if (this.pos >= this.len) throw i(this); if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0, this.buf[this.pos++] < 128) return e }
            throw Error("invalid varint encoding")
        }

        function s(e, t) { return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0 }

        function a() { if (this.pos + 8 > this.len) throw i(this, 8); return new u(s(this.buf, this.pos += 4), s(this.buf, this.pos += 4)) }
        e.exports = n;
        var f, l = r(1),
            u = l.LongBits,
            h = l.utf8,
            c = "undefined" != typeof Uint8Array ? function(e) { if (e instanceof Uint8Array || Array.isArray(e)) return new n(e); throw Error("illegal buffer") } : function(e) { if (Array.isArray(e)) return new n(e); throw Error("illegal buffer") },
            d = function() { return l.Buffer ? function(e) { return (n.create = function(e) { return l.Buffer.isBuffer(e) ? new f(e) : c(e) })(e) } : c };
        n.create = d(), n.prototype._slice = l.Array.prototype.subarray || l.Array.prototype.slice, n.prototype.uint32 = function() { var e = 4294967295; return function() { if (e = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return e; if (e = (e | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return e; if (e = (e | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return e; if (e = (e | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return e; if (e = (e | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return e; if ((this.pos += 5) > this.len) throw this.pos = this.len, i(this, 10); return e } }(), n.prototype.int32 = function() { return 0 | this.uint32() }, n.prototype.sint32 = function() { var e = this.uint32(); return e >>> 1 ^ -(1 & e) | 0 }, n.prototype.bool = function() { return 0 !== this.uint32() }, n.prototype.fixed32 = function() { if (this.pos + 4 > this.len) throw i(this, 4); return s(this.buf, this.pos += 4) }, n.prototype.sfixed32 = function() { if (this.pos + 4 > this.len) throw i(this, 4); return 0 | s(this.buf, this.pos += 4) }, n.prototype.float = function() { if (this.pos + 4 > this.len) throw i(this, 4); var e = l.float.readFloatLE(this.buf, this.pos); return this.pos += 4, e }, n.prototype.double = function() { if (this.pos + 8 > this.len) throw i(this, 4); var e = l.float.readDoubleLE(this.buf, this.pos); return this.pos += 8, e }, n.prototype.bytes = function() {
            var e = this.uint32(),
                t = this.pos,
                r = this.pos + e;
            if (r > this.len) throw i(this, e);
            return this.pos += e, Array.isArray(this.buf) ? this.buf.slice(t, r) : t === r ? new this.buf.constructor(0) : this._slice.call(this.buf, t, r)
        }, n.prototype.string = function() { var e = this.bytes(); return h.read(e, 0, e.length) }, n.prototype.skip = function(e) {
            if ("number" == typeof e) {
                if (this.pos + e > this.len) throw i(this, e);
                this.pos += e
            } else
                do { if (this.pos >= this.len) throw i(this) } while (128 & this.buf[this.pos++]);
            return this
        }, n.prototype.skipType = function(e) {
            switch (e) {
                case 0:
                    this.skip();
                    break;
                case 1:
                    this.skip(8);
                    break;
                case 2:
                    this.skip(this.uint32());
                    break;
                case 3:
                    for (; 4 != (e = 7 & this.uint32());) this.skipType(e);
                    break;
                case 5:
                    this.skip(4);
                    break;
                default:
                    throw Error("invalid wire type " + e + " at offset " + this.pos)
            }
            return this
        }, n._configure = function(e) {
            f = e, n.create = d(), f._configure();
            var t = l.Long ? "toLong" : "toNumber";
            l.merge(n.prototype, { int64: function() { return o.call(this)[t](!1) }, uint64: function() { return o.call(this)[t](!0) }, sint64: function() { return o.call(this).zzDecode()[t](!1) }, fixed64: function() { return a.call(this)[t](!0) }, sfixed64: function() { return a.call(this)[t](!1) } })
        }
    }, function(e, t, r) {
        "use strict";

        function i(e, t, r, i) {
            if (Array.isArray(t) || (r = t, t = void 0), o.call(this, e, r), void 0 !== t && !Array.isArray(t)) throw TypeError("fieldNames must be an Array");
            this.oneof = t || [], this.fieldsArray = [], this.comment = i
        }

        function n(e) {
            if (e.parent)
                for (var t = 0; t < e.fieldsArray.length; ++t) e.fieldsArray[t].parent || e.parent.add(e.fieldsArray[t])
        }
        e.exports = i;
        var o = r(3);
        ((i.prototype = Object.create(o.prototype)).constructor = i).className = "OneOf";
        var s = r(4),
            a = r(0);
        i.fromJSON = function(e, t) { return new i(e, t.oneof, t.options, t.comment) }, i.prototype.toJSON = function(e) { var t = !!e && Boolean(e.keepComments); return a.toObject(["options", this.options, "oneof", this.oneof, "comment", t ? this.comment : void 0]) }, i.prototype.add = function(e) { if (!(e instanceof s)) throw TypeError("field must be a Field"); return e.parent && e.parent !== this.parent && e.parent.remove(e), this.oneof.push(e.name), this.fieldsArray.push(e), e.partOf = this, n(this), this }, i.prototype.remove = function(e) { if (!(e instanceof s)) throw TypeError("field must be a Field"); var t = this.fieldsArray.indexOf(e); if (t < 0) throw Error(e + " is not a member of " + this); return this.fieldsArray.splice(t, 1), (t = this.oneof.indexOf(e.name)) > -1 && this.oneof.splice(t, 1), e.partOf = null, this }, i.prototype.onAdd = function(e) {
            o.prototype.onAdd.call(this, e);
            for (var t = 0; t < this.oneof.length; ++t) {
                var r = e.get(this.oneof[t]);
                r && !r.partOf && (r.partOf = this, this.fieldsArray.push(r))
            }
            n(this)
        }, i.prototype.onRemove = function(e) {
            for (var t, r = 0; r < this.fieldsArray.length; ++r)(t = this.fieldsArray[r]).parent && t.parent.remove(t);
            o.prototype.onRemove.call(this, e)
        }, i.d = function() { for (var e = new Array(arguments.length), t = 0; t < arguments.length;) e[t] = arguments[t++]; return function(t, r) { a.decorateType(t.constructor).add(new i(r, e)), Object.defineProperty(t, r, { get: a.oneOfGetter(e), set: a.oneOfSetter(e) }) } }
    }, function(e, t, r) {
        "use strict";

        function i(e) {
            if (e)
                for (var t = Object.keys(e), r = 0; r < t.length; ++r) this[t[r]] = e[t[r]]
        }
        e.exports = i;
        var n = r(1);
        i.create = function(e) { return this.$type.create(e) }, i.encode = function(e, t) { return this.$type.encode(e, t) }, i.encodeDelimited = function(e, t) { return this.$type.encodeDelimited(e, t) }, i.decode = function(e) { return this.$type.decode(e) }, i.decodeDelimited = function(e) { return this.$type.decodeDelimited(e) }, i.verify = function(e) { return this.$type.verify(e) }, i.fromObject = function(e) { return this.$type.fromObject(e) }, i.toObject = function(e, t) { return this.$type.toObject(e, t) }, i.prototype.toJSON = function() { return this.$type.toObject(this, n.toJSONOptions) }
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.Parser = void 0;
        var i = function() {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, r, i) { return r && e(t.prototype, r), i && e(t, i), t }
            }(),
            n = r(31),
            o = function(e) { return e && e.__esModule ? e : { default: e } }(r(50));
        t.Parser = function() {
            function e() {! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, e) }
            return i(e, [{ key: "load", value: function(e, t, r) { this.loadViaWorker(e, t, r) } }, {
                key: "loadViaWorker",
                value: function(e, t, r) {
                    (0, o.default)(e, (function(e) {
                        var r = e.movie;
                        r.version = e.ver;
                        var i = e.images,
                            o = new n.VideoEntity(r, i);
                        t(o)
                    }), r)
                }
            }]), e
        }()
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.RectPath = void 0;
        var i = r(5);
        t.RectPath = function(e) {
            function t(e, r, i, n, o, s, a) {! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, t); var f = function(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)); return f._x = e, f._y = r, f._width = i, f._height = n, f._cornerRadius = o, f._transform = s, f._styles = a, f }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t
        }(i.BezierPath)
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.EllipsePath = void 0;
        var i = r(5);
        t.EllipsePath = function(e) {
            function t(e, r, i, n, o, s) {! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, t); var a = function(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)); return a._x = e, a._y = r, a._radiusX = i, a._radiusY = n, a._transform = o, a._styles = s, a }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t
        }(i.BezierPath)
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = r(34),
            n = JSON.parse('{"nested":{"com":{"nested":{"opensource":{"nested":{"svga":{"options":{"objc_class_prefix":"SVGAProto","java_package":"com.opensource.svgaplayer.proto"},"nested":{"MovieParams":{"fields":{"viewBoxWidth":{"type":"float","id":1},"viewBoxHeight":{"type":"float","id":2},"fps":{"type":"int32","id":3},"frames":{"type":"int32","id":4}}},"SpriteEntity":{"fields":{"imageKey":{"type":"string","id":1},"frames":{"rule":"repeated","type":"FrameEntity","id":2},"matteKey":{"type":"string","id":3}}},"AudioEntity":{"fields":{"audioKey":{"type":"string","id":1},"startFrame":{"type":"int32","id":2},"endFrame":{"type":"int32","id":3},"startTime":{"type":"int32","id":4},"totalTime":{"type":"int32","id":5}}},"Layout":{"fields":{"x":{"type":"float","id":1},"y":{"type":"float","id":2},"width":{"type":"float","id":3},"height":{"type":"float","id":4}}},"Transform":{"fields":{"a":{"type":"float","id":1},"b":{"type":"float","id":2},"c":{"type":"float","id":3},"d":{"type":"float","id":4},"tx":{"type":"float","id":5},"ty":{"type":"float","id":6}}},"ShapeEntity":{"oneofs":{"args":{"oneof":["shape","rect","ellipse"]}},"fields":{"type":{"type":"ShapeType","id":1},"shape":{"type":"ShapeArgs","id":2},"rect":{"type":"RectArgs","id":3},"ellipse":{"type":"EllipseArgs","id":4},"styles":{"type":"ShapeStyle","id":10},"transform":{"type":"Transform","id":11}},"nested":{"ShapeType":{"values":{"SHAPE":0,"RECT":1,"ELLIPSE":2,"KEEP":3}},"ShapeArgs":{"fields":{"d":{"type":"string","id":1}}},"RectArgs":{"fields":{"x":{"type":"float","id":1},"y":{"type":"float","id":2},"width":{"type":"float","id":3},"height":{"type":"float","id":4},"cornerRadius":{"type":"float","id":5}}},"EllipseArgs":{"fields":{"x":{"type":"float","id":1},"y":{"type":"float","id":2},"radiusX":{"type":"float","id":3},"radiusY":{"type":"float","id":4}}},"ShapeStyle":{"fields":{"fill":{"type":"RGBAColor","id":1},"stroke":{"type":"RGBAColor","id":2},"strokeWidth":{"type":"float","id":3},"lineCap":{"type":"LineCap","id":4},"lineJoin":{"type":"LineJoin","id":5},"miterLimit":{"type":"float","id":6},"lineDashI":{"type":"float","id":7},"lineDashII":{"type":"float","id":8},"lineDashIII":{"type":"float","id":9}},"nested":{"RGBAColor":{"fields":{"r":{"type":"float","id":1},"g":{"type":"float","id":2},"b":{"type":"float","id":3},"a":{"type":"float","id":4}}},"LineCap":{"values":{"LineCap_BUTT":0,"LineCap_ROUND":1,"LineCap_SQUARE":2}},"LineJoin":{"values":{"LineJoin_MITER":0,"LineJoin_ROUND":1,"LineJoin_BEVEL":2}}}}}},"FrameEntity":{"fields":{"alpha":{"type":"float","id":1},"layout":{"type":"Layout","id":2},"transform":{"type":"Transform","id":3},"clipPath":{"type":"string","id":4},"shapes":{"rule":"repeated","type":"ShapeEntity","id":5}}},"MovieEntity":{"fields":{"version":{"type":"string","id":1},"params":{"type":"MovieParams","id":2},"images":{"keyType":"string","type":"bytes","id":3},"sprites":{"rule":"repeated","type":"SpriteEntity","id":4},"audios":{"rule":"repeated","type":"AudioEntity","id":5}}}}}}}}}}}'),
            o = t.proto = i.Root.fromJSON(n);
        t.ProtoMovieEntity = o.lookupType("com.opensource.svga.MovieEntity")
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t) {
            for (var r = new Array(arguments.length - 1), i = 0, n = 2, o = !0; n < arguments.length;) r[i++] = arguments[n++];
            return new Promise((function(n, s) {
                r[i] = function(e) {
                    if (o)
                        if (o = !1, e) s(e);
                        else {
                            for (var t = new Array(arguments.length - 1), r = 0; r < t.length;) t[r++] = arguments[r];
                            n.apply(null, t)
                        }
                };
                try { e.apply(t || null, r) } catch (e) { o && (o = !1, s(e)) }
            }))
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";

        function inquire(moduleName) { try { var mod = eval("quire".replace(/^/, "re"))(moduleName); if (mod && (mod.length || Object.keys(mod).length)) return mod } catch (e) {} return null }
        module.exports = inquire
    }, function(e, t, r) {
        "use strict";
        t.Service = r(46)
    }, function(e, t, r) {
        "use strict";
        e.exports = {}
    }, function(e, t, r) {
        "use strict";

        function i(e, t, r, i) { return t.resolvedType.group ? e("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", r, i, (t.id << 3 | 3) >>> 0, (t.id << 3 | 4) >>> 0) : e("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", r, i, (t.id << 3 | 2) >>> 0) }
        e.exports = function(e) {
            for (var t, r = s.codegen(["m", "w"], e.name + "$encode")("if(!w)")("w=Writer.create()"), a = e.fieldsArray.slice().sort(s.compareFieldsById), f = 0; f < a.length; ++f) {
                var l = a[f].resolve(),
                    u = e._fieldsArray.indexOf(l),
                    h = l.resolvedType instanceof n ? "int32" : l.type,
                    c = o.basic[h];
                t = "m" + s.safeProp(l.name), l.map ? (r("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", t, l.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", t)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (l.id << 3 | 2) >>> 0, 8 | o.mapKey[l.keyType], l.keyType), void 0 === c ? r("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", u, t) : r(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | c, h, t), r("}")("}")) : l.repeated ? (r("if(%s!=null&&%s.length){", t, t), l.packed && void 0 !== o.packed[h] ? r("w.uint32(%i).fork()", (l.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", t)("w.%s(%s[i])", h, t)("w.ldelim()") : (r("for(var i=0;i<%s.length;++i)", t), void 0 === c ? i(r, l, u, t + "[i]") : r("w.uint32(%i).%s(%s[i])", (l.id << 3 | c) >>> 0, h, t)), r("}")) : (l.optional && r("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", t, l.name), void 0 === c ? i(r, l, u, t) : r("w.uint32(%i).%s(%s)", (l.id << 3 | c) >>> 0, h, t))
            }
            return r("return w")
        };
        var n = r(2),
            o = r(7),
            s = r(0)
    }, function(e, t, r) {
        "use strict";

        function i(e, t) { o.call(this, e, t), this.fields = {}, this.oneofs = void 0, this.extensions = void 0, this.reserved = void 0, this.group = void 0, this._fieldsById = null, this._fieldsArray = null, this._oneofsArray = null, this._ctor = null }

        function n(e) { return e._fieldsById = e._fieldsArray = e._oneofsArray = null, delete e.encode, delete e.decode, delete e.verify, e }
        e.exports = i;
        var o = r(6);
        ((i.prototype = Object.create(o.prototype)).constructor = i).className = "Type";
        var s = r(2),
            a = r(11),
            f = r(4),
            l = r(23),
            u = r(24),
            h = r(12),
            c = r(10),
            d = r(9),
            p = r(0),
            y = r(21),
            m = r(26),
            v = r(27),
            g = r(28),
            b = r(29);
        Object.defineProperties(i.prototype, {
            fieldsById: {
                get: function() {
                    if (this._fieldsById) return this._fieldsById;
                    this._fieldsById = {};
                    for (var e = Object.keys(this.fields), t = 0; t < e.length; ++t) {
                        var r = this.fields[e[t]],
                            i = r.id;
                        if (this._fieldsById[i]) throw Error("duplicate id " + i + " in " + this);
                        this._fieldsById[i] = r
                    }
                    return this._fieldsById
                }
            },
            fieldsArray: { get: function() { return this._fieldsArray || (this._fieldsArray = p.toArray(this.fields)) } },
            oneofsArray: { get: function() { return this._oneofsArray || (this._oneofsArray = p.toArray(this.oneofs)) } },
            ctor: {
                get: function() { return this._ctor || (this.ctor = i.generateConstructor(this)()) },
                set: function(e) {
                    var t = e.prototype;
                    t instanceof h || ((e.prototype = new h).constructor = e, p.merge(e.prototype, t)), e.$type = e.prototype.$type = this, p.merge(e, h, !0), this._ctor = e;
                    for (var r = 0; r < this.fieldsArray.length; ++r) this._fieldsArray[r].resolve();
                    var i = {};
                    for (r = 0; r < this.oneofsArray.length; ++r) i[this._oneofsArray[r].resolve().name] = { get: p.oneOfGetter(this._oneofsArray[r].oneof), set: p.oneOfSetter(this._oneofsArray[r].oneof) };
                    r && Object.defineProperties(e.prototype, i)
                }
            }
        }), i.generateConstructor = function(e) { for (var t, r = p.codegen(["p"], e.name), i = 0; i < e.fieldsArray.length; ++i)(t = e._fieldsArray[i]).map ? r("this%s={}", p.safeProp(t.name)) : t.repeated && r("this%s=[]", p.safeProp(t.name)); return r("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]") }, i.fromJSON = function(e, t) {
            var r = new i(e, t.options);
            r.extensions = t.extensions, r.reserved = t.reserved;
            for (var n = Object.keys(t.fields), h = 0; h < n.length; ++h) r.add((void 0 !== t.fields[n[h]].keyType ? l.fromJSON : f.fromJSON)(n[h], t.fields[n[h]]));
            if (t.oneofs)
                for (n = Object.keys(t.oneofs), h = 0; h < n.length; ++h) r.add(a.fromJSON(n[h], t.oneofs[n[h]]));
            if (t.nested)
                for (n = Object.keys(t.nested), h = 0; h < n.length; ++h) {
                    var c = t.nested[n[h]];
                    r.add((void 0 !== c.id ? f.fromJSON : void 0 !== c.fields ? i.fromJSON : void 0 !== c.values ? s.fromJSON : void 0 !== c.methods ? u.fromJSON : o.fromJSON)(n[h], c))
                }
            return t.extensions && t.extensions.length && (r.extensions = t.extensions), t.reserved && t.reserved.length && (r.reserved = t.reserved), t.group && (r.group = !0), t.comment && (r.comment = t.comment), r
        }, i.prototype.toJSON = function(e) {
            var t = o.prototype.toJSON.call(this, e),
                r = !!e && Boolean(e.keepComments);
            return p.toObject(["options", t && t.options || void 0, "oneofs", o.arrayToJSON(this.oneofsArray, e), "fields", o.arrayToJSON(this.fieldsArray.filter((function(e) { return !e.declaringField })), e) || {}, "extensions", this.extensions && this.extensions.length ? this.extensions : void 0, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "group", this.group || void 0, "nested", t && t.nested || void 0, "comment", r ? this.comment : void 0])
        }, i.prototype.resolveAll = function() { for (var e = this.fieldsArray, t = 0; t < e.length;) e[t++].resolve(); var r = this.oneofsArray; for (t = 0; t < r.length;) r[t++].resolve(); return o.prototype.resolveAll.call(this) }, i.prototype.get = function(e) { return this.fields[e] || this.oneofs && this.oneofs[e] || this.nested && this.nested[e] || null }, i.prototype.add = function(e) { if (this.get(e.name)) throw Error("duplicate name '" + e.name + "' in " + this); if (e instanceof f && void 0 === e.extend) { if (this._fieldsById ? this._fieldsById[e.id] : this.fieldsById[e.id]) throw Error("duplicate id " + e.id + " in " + this); if (this.isReservedId(e.id)) throw Error("id " + e.id + " is reserved in " + this); if (this.isReservedName(e.name)) throw Error("name '" + e.name + "' is reserved in " + this); return e.parent && e.parent.remove(e), this.fields[e.name] = e, e.message = this, e.onAdd(this), n(this) } return e instanceof a ? (this.oneofs || (this.oneofs = {}), this.oneofs[e.name] = e, e.onAdd(this), n(this)) : o.prototype.add.call(this, e) }, i.prototype.remove = function(e) { if (e instanceof f && void 0 === e.extend) { if (!this.fields || this.fields[e.name] !== e) throw Error(e + " is not a member of " + this); return delete this.fields[e.name], e.parent = null, e.onRemove(this), n(this) } if (e instanceof a) { if (!this.oneofs || this.oneofs[e.name] !== e) throw Error(e + " is not a member of " + this); return delete this.oneofs[e.name], e.parent = null, e.onRemove(this), n(this) } return o.prototype.remove.call(this, e) }, i.prototype.isReservedId = function(e) { return o.isReservedId(this.reserved, e) }, i.prototype.isReservedName = function(e) { return o.isReservedName(this.reserved, e) }, i.prototype.create = function(e) { return new this.ctor(e) }, i.prototype.setup = function() {
            for (var e = this.fullName, t = [], r = 0; r < this.fieldsArray.length; ++r) t.push(this._fieldsArray[r].resolve().resolvedType);
            this.encode = y(this)({ Writer: d, types: t, util: p }), this.decode = m(this)({ Reader: c, types: t, util: p }), this.verify = v(this)({ types: t, util: p }), this.fromObject = g.fromObject(this)({ types: t, util: p }), this.toObject = g.toObject(this)({ types: t, util: p });
            var i = b[e];
            if (i) {
                var n = Object.create(this);
                n.fromObject = this.fromObject, this.fromObject = i.fromObject.bind(n), n.toObject = this.toObject, this.toObject = i.toObject.bind(n)
            }
            return this
        }, i.prototype.encode = function(e, t) { return this.setup().encode(e, t) }, i.prototype.encodeDelimited = function(e, t) { return this.encode(e, t && t.len ? t.fork() : t).ldelim() }, i.prototype.decode = function(e, t) { return this.setup().decode(e, t) }, i.prototype.decodeDelimited = function(e) { return e instanceof c || (e = c.create(e)), this.decode(e, e.uint32()) }, i.prototype.verify = function(e) { return this.setup().verify(e) }, i.prototype.fromObject = function(e) { return this.setup().fromObject(e) }, i.prototype.toObject = function(e, t) { return this.setup().toObject(e, t) }, i.d = function(e) { return function(t) { p.decorateType(t, e) } }
    }, function(e, t, r) {
        "use strict";

        function i(e, t, r, i, o, a) {
            if (n.call(this, e, t, i, void 0, void 0, o, a), !s.isString(r)) throw TypeError("keyType must be a string");
            this.keyType = r, this.resolvedKeyType = null, this.map = !0
        }
        e.exports = i;
        var n = r(4);
        ((i.prototype = Object.create(n.prototype)).constructor = i).className = "MapField";
        var o = r(7),
            s = r(0);
        i.fromJSON = function(e, t) { return new i(e, t.id, t.keyType, t.type, t.options, t.comment) }, i.prototype.toJSON = function(e) { var t = !!e && Boolean(e.keepComments); return s.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t ? this.comment : void 0]) }, i.prototype.resolve = function() { if (this.resolved) return this; if (void 0 === o.mapKey[this.keyType]) throw Error("invalid key type: " + this.keyType); return n.prototype.resolve.call(this) }, i.d = function(e, t, r) {
            return "function" == typeof r ? r = s.decorateType(r).name : r && "object" == typeof r && (r = s.decorateEnum(r).name),
                function(n, o) { s.decorateType(n.constructor).add(new i(o, e, t, r)) }
        }
    }, function(e, t, r) {
        "use strict";

        function i(e, t) { o.call(this, e, t), this.methods = {}, this._methodsArray = null }

        function n(e) { return e._methodsArray = null, e }
        e.exports = i;
        var o = r(6);
        ((i.prototype = Object.create(o.prototype)).constructor = i).className = "Service";
        var s = r(25),
            a = r(0),
            f = r(19);
        i.fromJSON = function(e, t) {
            var r = new i(e, t.options);
            if (t.methods)
                for (var n = Object.keys(t.methods), o = 0; o < n.length; ++o) r.add(s.fromJSON(n[o], t.methods[n[o]]));
            return t.nested && r.addJSON(t.nested), r.comment = t.comment, r
        }, i.prototype.toJSON = function(e) {
            var t = o.prototype.toJSON.call(this, e),
                r = !!e && Boolean(e.keepComments);
            return a.toObject(["options", t && t.options || void 0, "methods", o.arrayToJSON(this.methodsArray, e) || {}, "nested", t && t.nested || void 0, "comment", r ? this.comment : void 0])
        }, Object.defineProperty(i.prototype, "methodsArray", { get: function() { return this._methodsArray || (this._methodsArray = a.toArray(this.methods)) } }), i.prototype.get = function(e) { return this.methods[e] || o.prototype.get.call(this, e) }, i.prototype.resolveAll = function() { for (var e = this.methodsArray, t = 0; t < e.length; ++t) e[t].resolve(); return o.prototype.resolve.call(this) }, i.prototype.add = function(e) { if (this.get(e.name)) throw Error("duplicate name '" + e.name + "' in " + this); return e instanceof s ? (this.methods[e.name] = e, e.parent = this, n(this)) : o.prototype.add.call(this, e) }, i.prototype.remove = function(e) { if (e instanceof s) { if (this.methods[e.name] !== e) throw Error(e + " is not a member of " + this); return delete this.methods[e.name], e.parent = null, n(this) } return o.prototype.remove.call(this, e) }, i.prototype.create = function(e, t, r) {
            for (var i, n = new f.Service(e, t, r), o = 0; o < this.methodsArray.length; ++o) {
                var s = a.lcFirst((i = this._methodsArray[o]).resolve().name).replace(/[^$\w_]/g, "");
                n[s] = a.codegen(["r", "c"], a.isReserved(s) ? s + "_" : s)("return this.rpcCall(m,q,s,r,c)")({ m: i, q: i.resolvedRequestType.ctor, s: i.resolvedResponseType.ctor })
            }
            return n
        }
    }, function(e, t, r) {
        "use strict";

        function i(e, t, r, i, s, a, f, l, u) {
            if (o.isObject(s) ? (f = s, s = a = void 0) : o.isObject(a) && (f = a, a = void 0), void 0 !== t && !o.isString(t)) throw TypeError("type must be a string");
            if (!o.isString(r)) throw TypeError("requestType must be a string");
            if (!o.isString(i)) throw TypeError("responseType must be a string");
            n.call(this, e, f), this.type = t || "rpc", this.requestType = r, this.requestStream = !!s || void 0, this.responseType = i, this.responseStream = !!a || void 0, this.resolvedRequestType = null, this.resolvedResponseType = null, this.comment = l, this.parsedOptions = u
        }
        e.exports = i;
        var n = r(3);
        ((i.prototype = Object.create(n.prototype)).constructor = i).className = "Method";
        var o = r(0);
        i.fromJSON = function(e, t) { return new i(e, t.type, t.requestType, t.responseType, t.requestStream, t.responseStream, t.options, t.comment, t.parsedOptions) }, i.prototype.toJSON = function(e) { var t = !!e && Boolean(e.keepComments); return o.toObject(["type", "rpc" !== this.type && this.type || void 0, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", t ? this.comment : void 0, "parsedOptions", this.parsedOptions]) }, i.prototype.resolve = function() { return this.resolved ? this : (this.resolvedRequestType = this.parent.lookupType(this.requestType), this.resolvedResponseType = this.parent.lookupType(this.responseType), n.prototype.resolve.call(this)) }
    }, function(e, t, r) {
        "use strict";

        function i(e) { return "missing required '" + e.name + "'" }
        e.exports = function(e) {
            var t = s.codegen(["r", "l"], e.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (e.fieldsArray.filter((function(e) { return e.map })).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()");
            e.group && t("if((t&7)===4)")("break"), t("switch(t>>>3){");
            for (var r = 0; r < e.fieldsArray.length; ++r) {
                var a = e._fieldsArray[r].resolve(),
                    f = a.resolvedType instanceof n ? "int32" : a.type,
                    l = "m" + s.safeProp(a.name);
                t("case %i:", a.id), a.map ? (t("if(%s===util.emptyObject)", l)("%s={}", l)("var c2 = r.uint32()+r.pos"), void 0 !== o.defaults[a.keyType] ? t("k=%j", o.defaults[a.keyType]) : t("k=null"), void 0 !== o.defaults[f] ? t("value=%j", o.defaults[f]) : t("value=null"), t("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", a.keyType)("case 2:"), void 0 === o.basic[f] ? t("value=types[%i].decode(r,r.uint32())", r) : t("value=r.%s()", f), t("break")("default:")("r.skipType(tag2&7)")("break")("}")("}"), void 0 !== o.long[a.keyType] ? t('%s[typeof k==="object"?util.longToHash(k):k]=value', l) : t("%s[k]=value", l)) : a.repeated ? (t("if(!(%s&&%s.length))", l, l)("%s=[]", l), void 0 !== o.packed[f] && t("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", l, f)("}else"), void 0 === o.basic[f] ? t(a.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", l, r) : t("%s.push(r.%s())", l, f)) : void 0 === o.basic[f] ? t(a.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", l, r) : t("%s=r.%s()", l, f), t("break")
            }
            for (t("default:")("r.skipType(t&7)")("break")("}")("}"), r = 0; r < e._fieldsArray.length; ++r) {
                var u = e._fieldsArray[r];
                u.required && t("if(!m.hasOwnProperty(%j))", u.name)("throw util.ProtocolError(%j,{instance:m})", i(u))
            }
            return t("return m")
        };
        var n = r(2),
            o = r(7),
            s = r(0)
    }, function(e, t, r) {
        "use strict";

        function i(e, t) { return e.name + ": " + t + (e.repeated && "array" !== t ? "[]" : e.map && "object" !== t ? "{k:" + e.keyType + "}" : "") + " expected" }

        function n(e, t, r, n) {
            if (t.resolvedType)
                if (t.resolvedType instanceof s) {
                    e("switch(%s){", n)("default:")("return%j", i(t, "enum value"));
                    for (var o = Object.keys(t.resolvedType.values), a = 0; a < o.length; ++a) e("case %i:", t.resolvedType.values[o[a]]);
                    e("break")("}")
                } else e("{")("var e=types[%i].verify(%s);", r, n)("if(e)")("return%j+e", t.name + ".")("}");
            else switch (t.type) {
                case "int32":
                case "uint32":
                case "sint32":
                case "fixed32":
                case "sfixed32":
                    e("if(!util.isInteger(%s))", n)("return%j", i(t, "integer"));
                    break;
                case "int64":
                case "uint64":
                case "sint64":
                case "fixed64":
                case "sfixed64":
                    e("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", n, n, n, n)("return%j", i(t, "integer|Long"));
                    break;
                case "float":
                case "double":
                    e('if(typeof %s!=="number")', n)("return%j", i(t, "number"));
                    break;
                case "bool":
                    e('if(typeof %s!=="boolean")', n)("return%j", i(t, "boolean"));
                    break;
                case "string":
                    e("if(!util.isString(%s))", n)("return%j", i(t, "string"));
                    break;
                case "bytes":
                    e('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', n, n, n)("return%j", i(t, "buffer"))
            }
            return e
        }

        function o(e, t, r) {
            switch (t.keyType) {
                case "int32":
                case "uint32":
                case "sint32":
                case "fixed32":
                case "sfixed32":
                    e("if(!util.key32Re.test(%s))", r)("return%j", i(t, "integer key"));
                    break;
                case "int64":
                case "uint64":
                case "sint64":
                case "fixed64":
                case "sfixed64":
                    e("if(!util.key64Re.test(%s))", r)("return%j", i(t, "integer|Long key"));
                    break;
                case "bool":
                    e("if(!util.key2Re.test(%s))", r)("return%j", i(t, "boolean key"))
            }
            return e
        }
        e.exports = function(e) {
            var t = a.codegen(["m"], e.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected"),
                r = {};
            e.oneofsArray.length && t("var p={}");
            for (var s = 0; s < e.fieldsArray.length; ++s) {
                var f = e._fieldsArray[s].resolve(),
                    l = "m" + a.safeProp(f.name);
                if (f.optional && t("if(%s!=null&&m.hasOwnProperty(%j)){", l, f.name), f.map) t("if(!util.isObject(%s))", l)("return%j", i(f, "object"))("var k=Object.keys(%s)", l)("for(var i=0;i<k.length;++i){"), o(t, f, "k[i]"), n(t, f, s, l + "[k[i]]")("}");
                else if (f.repeated) t("if(!Array.isArray(%s))", l)("return%j", i(f, "array"))("for(var i=0;i<%s.length;++i){", l), n(t, f, s, l + "[i]")("}");
                else {
                    if (f.partOf) {
                        var u = a.safeProp(f.partOf.name);
                        1 === r[f.partOf.name] && t("if(p%s===1)", u)("return%j", f.partOf.name + ": multiple values"), r[f.partOf.name] = 1, t("p%s=1", u)
                    }
                    n(t, f, s, l)
                }
                f.optional && t("}")
            }
            return t("return null")
        };
        var s = r(2),
            a = r(0)
    }, function(e, t, r) {
        "use strict";

        function i(e, t, r, i) {
            if (t.resolvedType)
                if (t.resolvedType instanceof s) {
                    e("switch(d%s){", i);
                    for (var n = t.resolvedType.values, o = Object.keys(n), a = 0; a < o.length; ++a) t.repeated && n[o[a]] === t.typeDefault && e("default:"), e("case%j:", o[a])("case %i:", n[o[a]])("m%s=%j", i, n[o[a]])("break");
                    e("}")
                } else e('if(typeof d%s!=="object")', i)("throw TypeError(%j)", t.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", i, r, i);
            else {
                var f = !1;
                switch (t.type) {
                    case "double":
                    case "float":
                        e("m%s=Number(d%s)", i, i);
                        break;
                    case "uint32":
                    case "fixed32":
                        e("m%s=d%s>>>0", i, i);
                        break;
                    case "int32":
                    case "sint32":
                    case "sfixed32":
                        e("m%s=d%s|0", i, i);
                        break;
                    case "uint64":
                        f = !0;
                    case "int64":
                    case "sint64":
                    case "fixed64":
                    case "sfixed64":
                        e("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", i, i, f)('else if(typeof d%s==="string")', i)("m%s=parseInt(d%s,10)", i, i)('else if(typeof d%s==="number")', i)("m%s=d%s", i, i)('else if(typeof d%s==="object")', i)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", i, i, i, f ? "true" : "");
                        break;
                    case "bytes":
                        e('if(typeof d%s==="string")', i)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", i, i, i)("else if(d%s.length)", i)("m%s=d%s", i, i);
                        break;
                    case "string":
                        e("m%s=String(d%s)", i, i);
                        break;
                    case "bool":
                        e("m%s=Boolean(d%s)", i, i)
                }
            }
            return e
        }

        function n(e, t, r, i) {
            if (t.resolvedType) t.resolvedType instanceof s ? e("d%s=o.enums===String?types[%i].values[m%s]:m%s", i, r, i, i) : e("d%s=types[%i].toObject(m%s,o)", i, r, i);
            else {
                var n = !1;
                switch (t.type) {
                    case "double":
                    case "float":
                        e("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", i, i, i, i);
                        break;
                    case "uint64":
                        n = !0;
                    case "int64":
                    case "sint64":
                    case "fixed64":
                    case "sfixed64":
                        e('if(typeof m%s==="number")', i)("d%s=o.longs===String?String(m%s):m%s", i, i, i)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", i, i, i, i, n ? "true" : "", i);
                        break;
                    case "bytes":
                        e("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", i, i, i, i, i);
                        break;
                    default:
                        e("d%s=m%s", i, i)
                }
            }
            return e
        }
        var o = t,
            s = r(2),
            a = r(0);
        o.fromObject = function(e) {
            var t = e.fieldsArray,
                r = a.codegen(["d"], e.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
            if (!t.length) return r("return new this.ctor");
            r("var m=new this.ctor");
            for (var n = 0; n < t.length; ++n) {
                var o = t[n].resolve(),
                    f = a.safeProp(o.name);
                o.map ? (r("if(d%s){", f)('if(typeof d%s!=="object")', f)("throw TypeError(%j)", o.fullName + ": object expected")("m%s={}", f)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", f), i(r, o, n, f + "[ks[i]]")("}")("}")) : o.repeated ? (r("if(d%s){", f)("if(!Array.isArray(d%s))", f)("throw TypeError(%j)", o.fullName + ": array expected")("m%s=[]", f)("for(var i=0;i<d%s.length;++i){", f), i(r, o, n, f + "[i]")("}")("}")) : (o.resolvedType instanceof s || r("if(d%s!=null){", f), i(r, o, n, f), o.resolvedType instanceof s || r("}"))
            }
            return r("return m")
        }, o.toObject = function(e) {
            var t = e.fieldsArray.slice().sort(a.compareFieldsById);
            if (!t.length) return a.codegen()("return {}");
            for (var r = a.codegen(["m", "o"], e.name + "$toObject")("if(!o)")("o={}")("var d={}"), i = [], o = [], f = [], l = 0; l < t.length; ++l) t[l].partOf || (t[l].resolve().repeated ? i : t[l].map ? o : f).push(t[l]);
            if (i.length) {
                for (r("if(o.arrays||o.defaults){"), l = 0; l < i.length; ++l) r("d%s=[]", a.safeProp(i[l].name));
                r("}")
            }
            if (o.length) {
                for (r("if(o.objects||o.defaults){"), l = 0; l < o.length; ++l) r("d%s={}", a.safeProp(o[l].name));
                r("}")
            }
            if (f.length) {
                for (r("if(o.defaults){"), l = 0; l < f.length; ++l) {
                    var u = f[l],
                        h = a.safeProp(u.name);
                    if (u.resolvedType instanceof s) r("d%s=o.enums===String?%j:%j", h, u.resolvedType.valuesById[u.typeDefault], u.typeDefault);
                    else if (u.long) r("if(util.Long){")("var n=new util.Long(%i,%i,%j)", u.typeDefault.low, u.typeDefault.high, u.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", h)("}else")("d%s=o.longs===String?%j:%i", h, u.typeDefault.toString(), u.typeDefault.toNumber());
                    else if (u.bytes) {
                        var c = "[" + Array.prototype.slice.call(u.typeDefault).join(",") + "]";
                        r("if(o.bytes===String)d%s=%j", h, String.fromCharCode.apply(String, u.typeDefault))("else{")("d%s=%s", h, c)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", h, h)("}")
                    } else r("d%s=%j", h, u.typeDefault)
                }
                r("}")
            }
            var d = !1;
            for (l = 0; l < t.length; ++l) {
                u = t[l];
                var p = e._fieldsArray.indexOf(u);
                h = a.safeProp(u.name);
                u.map ? (d || (d = !0, r("var ks2")), r("if(m%s&&(ks2=Object.keys(m%s)).length){", h, h)("d%s={}", h)("for(var j=0;j<ks2.length;++j){"), n(r, u, p, h + "[ks2[j]]")("}")) : u.repeated ? (r("if(m%s&&m%s.length){", h, h)("d%s=[]", h)("for(var j=0;j<m%s.length;++j){", h), n(r, u, p, h + "[j]")("}")) : (r("if(m%s!=null&&m.hasOwnProperty(%j)){", h, u.name), n(r, u, p, h), u.partOf && r("if(o.oneofs)")("d%s=%j", a.safeProp(u.partOf.name), u.name)), r("}")
            }
            return r("return d")
        }
    }, function(e, t, r) {
        "use strict";
        var i = t,
            n = r(12);
        i[".google.protobuf.Any"] = {
            fromObject: function(e) {
                if (e && e["@type"]) {
                    var t = e["@type"].substring(e["@type"].lastIndexOf("/") + 1),
                        r = this.lookup(t);
                    if (r) { var i = "." === e["@type"].charAt(0) ? e["@type"].substr(1) : e["@type"]; return -1 === i.indexOf("/") && (i = "/" + i), this.create({ type_url: i, value: r.encode(r.fromObject(e)).finish() }) }
                }
                return this.fromObject(e)
            },
            toObject: function(e, t) {
                var r = "",
                    i = "";
                if (t && t.json && e.type_url && e.value) {
                    i = e.type_url.substring(e.type_url.lastIndexOf("/") + 1), r = e.type_url.substring(0, e.type_url.lastIndexOf("/") + 1);
                    var o = this.lookup(i);
                    o && (e = o.decode(e.value))
                }
                if (!(e instanceof this.ctor) && e instanceof n) { var s = e.$type.toObject(e, t); return "" === r && (r = "type.googleapis.com/"), i = r + ("." === e.$type.fullName[0] ? e.$type.fullName.substr(1) : e.$type.fullName), s["@type"] = i, s }
                return this.toObject(e, t)
            }
        }
    }, function(e, t, r) {
        "use strict";

        function i(e) { s.call(this, "", e), this.deferred = [], this.files = [] }

        function n() {}

        function o(e, t) { var r = t.parent.lookup(t.extend); if (r) { var i = new u(t.fullName, t.id, t.type, t.rule, void 0, t.options); return i.declaringField = t, t.extensionField = i, r.add(i), !0 } return !1 }
        e.exports = i;
        var s = r(6);
        ((i.prototype = Object.create(s.prototype)).constructor = i).className = "Root";
        var a, f, l, u = r(4),
            h = r(2),
            c = r(11),
            d = r(0);
        i.fromJSON = function(e, t) { return t || (t = new i), e.options && t.setOptions(e.options), t.addJSON(e.nested) }, i.prototype.resolvePath = d.path.resolve, i.prototype.fetch = d.fetch, i.prototype.load = function e(t, r, i) {
            function o(e, t) {
                if (i) {
                    var r = i;
                    if (i = null, c) throw e;
                    r(e, t)
                }
            }

            function s(e) { var t = e.lastIndexOf("google/protobuf/"); if (t > -1) { var r = e.substring(t); if (r in l) return r } return null }

            function a(e, t) {
                try {
                    if (d.isString(t) && "{" === t.charAt(0) && (t = JSON.parse(t)), d.isString(t)) {
                        f.filename = e;
                        var i, n = f(t, h, r),
                            a = 0;
                        if (n.imports)
                            for (; a < n.imports.length; ++a)(i = s(n.imports[a]) || h.resolvePath(e, n.imports[a])) && u(i);
                        if (n.weakImports)
                            for (a = 0; a < n.weakImports.length; ++a)(i = s(n.weakImports[a]) || h.resolvePath(e, n.weakImports[a])) && u(i, !0)
                    } else h.setOptions(t.options).addJSON(t.nested)
                } catch (e) { o(e) }
                c || p || o(null, h)
            }

            function u(e, t) { if (!(h.files.indexOf(e) > -1)) { if (h.files.push(e), e in l) return void(c ? a(e, l[e]) : (++p, setTimeout((function() {--p, a(e, l[e]) })))); if (c) { var r; try { r = d.fs.readFileSync(e).toString("utf8") } catch (e) { return void(t || o(e)) }
                        a(e, r) } else ++p, h.fetch(e, (function(r, n) { if (--p, i) return r ? void(t ? p || o(null, h) : o(r)) : void a(e, n) })) } }
            "function" == typeof r && (i = r, r = void 0);
            var h = this;
            if (!i) return d.asPromise(e, h, t, r);
            var c = i === n,
                p = 0;
            d.isString(t) && (t = [t]);
            for (var y, m = 0; m < t.length; ++m)(y = h.resolvePath("", t[m])) && u(y);
            if (c) return h;
            p || o(null, h)
        }, i.prototype.loadSync = function(e, t) { if (!d.isNode) throw Error("not supported"); return this.load(e, t, n) }, i.prototype.resolveAll = function() { if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map((function(e) { return "'extend " + e.extend + "' in " + e.parent.fullName })).join(", ")); return s.prototype.resolveAll.call(this) };
        var p = /^[A-Z]/;
        i.prototype._handleAdd = function(e) {
            if (e instanceof u) void 0 === e.extend || e.extensionField || o(0, e) || this.deferred.push(e);
            else if (e instanceof h) p.test(e.name) && (e.parent[e.name] = e.values);
            else if (!(e instanceof c)) {
                if (e instanceof a)
                    for (var t = 0; t < this.deferred.length;) o(0, this.deferred[t]) ? this.deferred.splice(t, 1) : ++t;
                for (var r = 0; r < e.nestedArray.length; ++r) this._handleAdd(e._nestedArray[r]);
                p.test(e.name) && (e.parent[e.name] = e)
            }
        }, i.prototype._handleRemove = function(e) {
            if (e instanceof u) {
                if (void 0 !== e.extend)
                    if (e.extensionField) e.extensionField.parent.remove(e.extensionField), e.extensionField = null;
                    else {
                        var t = this.deferred.indexOf(e);
                        t > -1 && this.deferred.splice(t, 1)
                    }
            } else if (e instanceof h) p.test(e.name) && delete e.parent[e.name];
            else if (e instanceof s) {
                for (var r = 0; r < e.nestedArray.length; ++r) this._handleRemove(e._nestedArray[r]);
                p.test(e.name) && delete e.parent[e.name]
            }
        }, i._configure = function(e, t, r) { a = e, f = t, l = r }
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.VideoEntity = void 0;
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
            n = function() {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, r, i) { return r && e(t.prototype, r), i && e(t, i), t }
            }(),
            o = r(32),
            s = r(16).ProtoMovieEntity;
        t.VideoEntity = function() {
            function e(t, r) {
                (function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") })(this, e), this.version = "", this.videoSize = { width: 0, height: 0 }, this.FPS = 20, this.frames = 0, this.images = {}, this.sprites = [], this.audios = [], "object" === (void 0 === t ? "undefined" : i(t)) && t.$type == s ? ("object" === i(t.params) && (this.version = t.ver, this.videoSize.width = t.params.viewBoxWidth || 0, this.videoSize.height = t.params.viewBoxHeight || 0, this.FPS = t.params.fps || 20, this.frames = t.params.frames || 0), this.resetSprites(t), this.audios = t.audios) : t && (t.movie && (t.movie.viewBox && (this.videoSize.width = parseFloat(t.movie.viewBox.width) || 0, this.videoSize.height = parseFloat(t.movie.viewBox.height) || 0), this.version = t.ver, this.FPS = parseInt(t.movie.fps) || 20, this.frames = parseInt(t.movie.frames) || 0), this.resetSprites(t)), r && (this.images = r)
            }
            return n(e, [{ key: "resetSprites", value: function(e) { e.sprites instanceof Array && (this.sprites = e.sprites.map((function(e) { return new o.SpriteEntity(e) }))) } }]), e
        }()
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.SpriteEntity = void 0;
        var i = r(33);
        r(5), r(14), r(15), t.SpriteEntity = function e(t) {
            (function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") })(this, e), this.matteKey = null, this.imageKey = null, this.frames = [], this.matteKey = t.matteKey, this.imageKey = t.imageKey, t.frames && (this.frames = t.frames.map((function(e) { return new i.FrameEntity(e) })))
        }
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.FrameEntity = void 0;
        var i = r(5);
        t.FrameEntity = function e(t) {
            (function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") })(this, e), this.alpha = 0, this.transform = { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, this.layout = { x: 0, y: 0, width: 0, height: 0 }, this.nx = 0, this.ny = 0, this.maskPath = null, this.shapes = [], this.alpha = parseFloat(t.alpha) || 0, t.layout && (this.layout.x = parseFloat(t.layout.x) || 0, this.layout.y = parseFloat(t.layout.y) || 0, this.layout.width = parseFloat(t.layout.width) || 0, this.layout.height = parseFloat(t.layout.height) || 0), t.transform && (this.transform.a = parseFloat(t.transform.a) || 1, this.transform.b = parseFloat(t.transform.b) || 0, this.transform.c = parseFloat(t.transform.c) || 0, this.transform.d = parseFloat(t.transform.d) || 1, this.transform.tx = parseFloat(t.transform.tx) || 0, this.transform.ty = parseFloat(t.transform.ty) || 0), t.clipPath && t.clipPath.length > 0 && (this.maskPath = new i.BezierPath(t.clipPath, void 0, { fill: "#000000" })), t.shapes && (t.shapes instanceof Array && t.shapes.forEach((function(e) {
                switch (e.pathArgs = e.args, e.type) {
                    case 0:
                        e.type = "shape", e.pathArgs = e.shape;
                        break;
                    case 1:
                        e.type = "rect", e.pathArgs = e.rect;
                        break;
                    case 2:
                        e.type = "ellipse", e.pathArgs = e.ellipse;
                        break;
                    case 3:
                        e.type = "keep"
                }
                if (e.styles) {
                    e.styles.fill && ("number" == typeof e.styles.fill.r && (e.styles.fill[0] = e.styles.fill.r), "number" == typeof e.styles.fill.g && (e.styles.fill[1] = e.styles.fill.g), "number" == typeof e.styles.fill.b && (e.styles.fill[2] = e.styles.fill.b), "number" == typeof e.styles.fill.a && (e.styles.fill[3] = e.styles.fill.a)), e.styles.stroke && ("number" == typeof e.styles.stroke.r && (e.styles.stroke[0] = e.styles.stroke.r), "number" == typeof e.styles.stroke.g && (e.styles.stroke[1] = e.styles.stroke.g), "number" == typeof e.styles.stroke.b && (e.styles.stroke[2] = e.styles.stroke.b), "number" == typeof e.styles.stroke.a && (e.styles.stroke[3] = e.styles.stroke.a));
                    var t = e.styles.lineDash || [];
                    switch (e.styles.lineDashI > 0 && t.push(e.styles.lineDashI), e.styles.lineDashII > 0 && (t.length < 1 && t.push(0), t.push(e.styles.lineDashII), t.push(0)), e.styles.lineDashIII > 0 && (t.length < 2 && (t.push(0), t.push(0)), t[2] = e.styles.lineDashIII), e.styles.lineDash = t, e.styles.lineJoin) {
                        case 0:
                            e.styles.lineJoin = "miter";
                            break;
                        case 1:
                            e.styles.lineJoin = "round";
                            break;
                        case 2:
                            e.styles.lineJoin = "bevel"
                    }
                    switch (e.styles.lineCap) {
                        case 0:
                            e.styles.lineCap = "butt";
                            break;
                        case 1:
                            e.styles.lineCap = "round";
                            break;
                        case 2:
                            e.styles.lineCap = "square"
                    }
                }
            })), t.shapes[0] && "keep" === t.shapes[0].type ? this.shapes = e.lastShapes : (this.shapes = t.shapes, e.lastShapes = t.shapes));
            var r = this.transform.a * this.layout.x + this.transform.c * this.layout.y + this.transform.tx,
                n = this.transform.a * (this.layout.x + this.layout.width) + this.transform.c * this.layout.y + this.transform.tx,
                o = this.transform.a * this.layout.x + this.transform.c * (this.layout.y + this.layout.height) + this.transform.tx,
                s = this.transform.a * (this.layout.x + this.layout.width) + this.transform.c * (this.layout.y + this.layout.height) + this.transform.tx,
                a = this.transform.b * this.layout.x + this.transform.d * this.layout.y + this.transform.ty,
                f = this.transform.b * (this.layout.x + this.layout.width) + this.transform.d * this.layout.y + this.transform.ty,
                l = this.transform.b * this.layout.x + this.transform.d * (this.layout.y + this.layout.height) + this.transform.ty,
                u = this.transform.b * (this.layout.x + this.layout.width) + this.transform.d * (this.layout.y + this.layout.height) + this.transform.ty;
            this.nx = Math.min(Math.min(o, s), Math.min(r, n)), this.ny = Math.min(Math.min(l, u), Math.min(a, f))
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = r(35)
    }, function(e, t, r) {
        "use strict";
        var i = e.exports = r(36);
        i.build = "light", i.load = function(e, t, r) { return "function" == typeof t ? (r = t, t = new i.Root) : t || (t = new i.Root), t.load(e, r) }, i.loadSync = function(e, t) { return t || (t = new i.Root), t.loadSync(e) }, i.encoder = r(21), i.decoder = r(26), i.verifier = r(27), i.converter = r(28), i.ReflectionObject = r(3), i.Namespace = r(6), i.Root = r(30), i.Enum = r(2), i.Type = r(22), i.Field = r(4), i.OneOf = r(11), i.MapField = r(23), i.Service = r(24), i.Method = r(25), i.Message = r(12), i.wrappers = r(29), i.types = r(7), i.util = r(0), i.ReflectionObject._configure(i.Root), i.Namespace._configure(i.Type, i.Service, i.Enum), i.Root._configure(i.Type), i.Field._configure(i.Type)
    }, function(e, t, r) {
        "use strict";

        function i() { n.util._configure(), n.Writer._configure(n.BufferWriter), n.Reader._configure(n.BufferReader) }
        var n = t;
        n.build = "minimal", n.Writer = r(9), n.BufferWriter = r(44), n.Reader = r(10), n.BufferReader = r(45), n.util = r(1), n.rpc = r(19), n.roots = r(20), n.configure = i, i()
    }, function(e, t) {
        var r;
        r = function() { return this }();
        try { r = r || new Function("return this")() } catch (e) { "object" == typeof window && (r = window) }
        e.exports = r
    }, function(e, t, r) {
        "use strict";
        var i = t;
        i.length = function(e) { var t = e.length; if (!t) return 0; for (var r = 0; --t % 4 > 1 && "=" === e.charAt(t);) ++r; return Math.ceil(3 * e.length) / 4 - r };
        for (var n = new Array(64), o = new Array(123), s = 0; s < 64;) o[n[s] = s < 26 ? s + 65 : s < 52 ? s + 71 : s < 62 ? s - 4 : s - 59 | 43] = s++;
        i.encode = function(e, t, r) {
            for (var i, o = null, s = [], a = 0, f = 0; t < r;) {
                var l = e[t++];
                switch (f) {
                    case 0:
                        s[a++] = n[l >> 2], i = (3 & l) << 4, f = 1;
                        break;
                    case 1:
                        s[a++] = n[i | l >> 4], i = (15 & l) << 2, f = 2;
                        break;
                    case 2:
                        s[a++] = n[i | l >> 6], s[a++] = n[63 & l], f = 0
                }
                a > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, s)), a = 0)
            }
            return f && (s[a++] = n[i], s[a++] = 61, 1 === f && (s[a++] = 61)), o ? (a && o.push(String.fromCharCode.apply(String, s.slice(0, a))), o.join("")) : String.fromCharCode.apply(String, s.slice(0, a))
        }, i.decode = function(e, t, r) {
            for (var i, n = r, s = 0, a = 0; a < e.length;) {
                var f = e.charCodeAt(a++);
                if (61 === f && s > 1) break;
                if (void 0 === (f = o[f])) throw Error("invalid encoding");
                switch (s) {
                    case 0:
                        i = f, s = 1;
                        break;
                    case 1:
                        t[r++] = i << 2 | (48 & f) >> 4, i = f, s = 2;
                        break;
                    case 2:
                        t[r++] = (15 & i) << 4 | (60 & f) >> 2, i = f, s = 3;
                        break;
                    case 3:
                        t[r++] = (3 & i) << 6 | f, s = 0
                }
            }
            if (1 === s) throw Error("invalid encoding");
            return r - n
        }, i.test = function(e) { return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e) }
    }, function(e, t, r) {
        "use strict";

        function i() { this._listeners = {} }
        e.exports = i, i.prototype.on = function(e, t, r) { return (this._listeners[e] || (this._listeners[e] = [])).push({ fn: t, ctx: r || this }), this }, i.prototype.off = function(e, t) {
            if (void 0 === e) this._listeners = {};
            else if (void 0 === t) this._listeners[e] = [];
            else
                for (var r = this._listeners[e], i = 0; i < r.length;) r[i].fn === t ? r.splice(i, 1) : ++i;
            return this
        }, i.prototype.emit = function(e) { var t = this._listeners[e]; if (t) { for (var r = [], i = 1; i < arguments.length;) r.push(arguments[i++]); for (i = 0; i < t.length;) t[i].fn.apply(t[i++].ctx, r) } return this }
    }, function(e, t, r) {
        "use strict";

        function i(e) {
            return "undefined" != typeof Float32Array ? function() {
                function t(e, t, r) { o[0] = e, t[r] = s[0], t[r + 1] = s[1], t[r + 2] = s[2], t[r + 3] = s[3] }

                function r(e, t, r) { o[0] = e, t[r] = s[3], t[r + 1] = s[2], t[r + 2] = s[1], t[r + 3] = s[0] }

                function i(e, t) { return s[0] = e[t], s[1] = e[t + 1], s[2] = e[t + 2], s[3] = e[t + 3], o[0] }

                function n(e, t) { return s[3] = e[t], s[2] = e[t + 1], s[1] = e[t + 2], s[0] = e[t + 3], o[0] }
                var o = new Float32Array([-0]),
                    s = new Uint8Array(o.buffer),
                    a = 128 === s[3];
                e.writeFloatLE = a ? t : r, e.writeFloatBE = a ? r : t, e.readFloatLE = a ? i : n, e.readFloatBE = a ? n : i
            }() : function() {
                function t(e, t, r, i) {
                    var n = t < 0 ? 1 : 0;
                    if (n && (t = -t), 0 === t) e(1 / t > 0 ? 0 : 2147483648, r, i);
                    else if (isNaN(t)) e(2143289344, r, i);
                    else if (t > 34028234663852886e22) e((n << 31 | 2139095040) >>> 0, r, i);
                    else if (t < 11754943508222875e-54) e((n << 31 | Math.round(t / 1401298464324817e-60)) >>> 0, r, i);
                    else {
                        var o = Math.floor(Math.log(t) / Math.LN2);
                        e((n << 31 | o + 127 << 23 | 8388607 & Math.round(t * Math.pow(2, -o) * 8388608)) >>> 0, r, i)
                    }
                }

                function r(e, t, r) {
                    var i = e(t, r),
                        n = 2 * (i >> 31) + 1,
                        o = i >>> 23 & 255,
                        s = 8388607 & i;
                    return 255 === o ? s ? NaN : n * (1 / 0) : 0 === o ? 1401298464324817e-60 * n * s : n * Math.pow(2, o - 150) * (s + 8388608)
                }
                e.writeFloatLE = t.bind(null, n), e.writeFloatBE = t.bind(null, o), e.readFloatLE = r.bind(null, s), e.readFloatBE = r.bind(null, a)
            }(), "undefined" != typeof Float64Array ? function() {
                function t(e, t, r) { o[0] = e, t[r] = s[0], t[r + 1] = s[1], t[r + 2] = s[2], t[r + 3] = s[3], t[r + 4] = s[4], t[r + 5] = s[5], t[r + 6] = s[6], t[r + 7] = s[7] }

                function r(e, t, r) { o[0] = e, t[r] = s[7], t[r + 1] = s[6], t[r + 2] = s[5], t[r + 3] = s[4], t[r + 4] = s[3], t[r + 5] = s[2], t[r + 6] = s[1], t[r + 7] = s[0] }

                function i(e, t) { return s[0] = e[t], s[1] = e[t + 1], s[2] = e[t + 2], s[3] = e[t + 3], s[4] = e[t + 4], s[5] = e[t + 5], s[6] = e[t + 6], s[7] = e[t + 7], o[0] }

                function n(e, t) { return s[7] = e[t], s[6] = e[t + 1], s[5] = e[t + 2], s[4] = e[t + 3], s[3] = e[t + 4], s[2] = e[t + 5], s[1] = e[t + 6], s[0] = e[t + 7], o[0] }
                var o = new Float64Array([-0]),
                    s = new Uint8Array(o.buffer),
                    a = 128 === s[7];
                e.writeDoubleLE = a ? t : r, e.writeDoubleBE = a ? r : t, e.readDoubleLE = a ? i : n, e.readDoubleBE = a ? n : i
            }() : function() {
                function t(e, t, r, i, n, o) {
                    var s = i < 0 ? 1 : 0;
                    if (s && (i = -i), 0 === i) e(0, n, o + t), e(1 / i > 0 ? 0 : 2147483648, n, o + r);
                    else if (isNaN(i)) e(0, n, o + t), e(2146959360, n, o + r);
                    else if (i > 17976931348623157e292) e(0, n, o + t), e((s << 31 | 2146435072) >>> 0, n, o + r);
                    else {
                        var a;
                        if (i < 22250738585072014e-324) e((a = i / 5e-324) >>> 0, n, o + t), e((s << 31 | a / 4294967296) >>> 0, n, o + r);
                        else {
                            var f = Math.floor(Math.log(i) / Math.LN2);
                            1024 === f && (f = 1023), e(4503599627370496 * (a = i * Math.pow(2, -f)) >>> 0, n, o + t), e((s << 31 | f + 1023 << 20 | 1048576 * a & 1048575) >>> 0, n, o + r)
                        }
                    }
                }

                function r(e, t, r, i, n) {
                    var o = e(i, n + t),
                        s = e(i, n + r),
                        a = 2 * (s >> 31) + 1,
                        f = s >>> 20 & 2047,
                        l = 4294967296 * (1048575 & s) + o;
                    return 2047 === f ? l ? NaN : a * (1 / 0) : 0 === f ? 5e-324 * a * l : a * Math.pow(2, f - 1075) * (l + 4503599627370496)
                }
                e.writeDoubleLE = t.bind(null, n, 0, 4), e.writeDoubleBE = t.bind(null, o, 4, 0), e.readDoubleLE = r.bind(null, s, 0, 4), e.readDoubleBE = r.bind(null, a, 4, 0)
            }(), e
        }

        function n(e, t, r) { t[r] = 255 & e, t[r + 1] = e >>> 8 & 255, t[r + 2] = e >>> 16 & 255, t[r + 3] = e >>> 24 }

        function o(e, t, r) { t[r] = e >>> 24, t[r + 1] = e >>> 16 & 255, t[r + 2] = e >>> 8 & 255, t[r + 3] = 255 & e }

        function s(e, t) { return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0 }

        function a(e, t) { return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0 }
        e.exports = i(i)
    }, function(e, t, r) {
        "use strict";
        var i = t;
        i.length = function(e) { for (var t = 0, r = 0, i = 0; i < e.length; ++i)(r = e.charCodeAt(i)) < 128 ? t += 1 : r < 2048 ? t += 2 : 55296 == (64512 & r) && 56320 == (64512 & e.charCodeAt(i + 1)) ? (++i, t += 4) : t += 3; return t }, i.read = function(e, t, r) { if (r - t < 1) return ""; for (var i, n = null, o = [], s = 0; t < r;)(i = e[t++]) < 128 ? o[s++] = i : i > 191 && i < 224 ? o[s++] = (31 & i) << 6 | 63 & e[t++] : i > 239 && i < 365 ? (i = ((7 & i) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]) - 65536, o[s++] = 55296 + (i >> 10), o[s++] = 56320 + (1023 & i)) : o[s++] = (15 & i) << 12 | (63 & e[t++]) << 6 | 63 & e[t++], s > 8191 && ((n || (n = [])).push(String.fromCharCode.apply(String, o)), s = 0); return n ? (s && n.push(String.fromCharCode.apply(String, o.slice(0, s))), n.join("")) : String.fromCharCode.apply(String, o.slice(0, s)) }, i.write = function(e, t, r) { for (var i, n, o = r, s = 0; s < e.length; ++s)(i = e.charCodeAt(s)) < 128 ? t[r++] = i : i < 2048 ? (t[r++] = i >> 6 | 192, t[r++] = 63 & i | 128) : 55296 == (64512 & i) && 56320 == (64512 & (n = e.charCodeAt(s + 1))) ? (i = 65536 + ((1023 & i) << 10) + (1023 & n), ++s, t[r++] = i >> 18 | 240, t[r++] = i >> 12 & 63 | 128, t[r++] = i >> 6 & 63 | 128, t[r++] = 63 & i | 128) : (t[r++] = i >> 12 | 224, t[r++] = i >> 6 & 63 | 128, t[r++] = 63 & i | 128); return r - o }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t, r) {
            var i = r || 8192,
                n = i >>> 1,
                o = null,
                s = i;
            return function(r) {
                if (r < 1 || r > n) return e(r);
                s + r > i && (o = e(i), s = 0);
                var a = t.call(o, s, s += r);
                return 7 & s && (s = 1 + (7 | s)), a
            }
        }
    }, function(e, t, r) {
        "use strict";

        function i(e, t) { this.lo = e >>> 0, this.hi = t >>> 0 }
        e.exports = i;
        var n = r(1),
            o = i.zero = new i(0, 0);
        o.toNumber = function() { return 0 }, o.zzEncode = o.zzDecode = function() { return this }, o.length = function() { return 1 };
        var s = i.zeroHash = "\0\0\0\0\0\0\0\0";
        i.fromNumber = function(e) {
            if (0 === e) return o;
            var t = e < 0;
            t && (e = -e);
            var r = e >>> 0,
                n = (e - r) / 4294967296 >>> 0;
            return t && (n = ~n >>> 0, r = ~r >>> 0, ++r > 4294967295 && (r = 0, ++n > 4294967295 && (n = 0))), new i(r, n)
        }, i.from = function(e) {
            if ("number" == typeof e) return i.fromNumber(e);
            if (n.isString(e)) {
                if (!n.Long) return i.fromNumber(parseInt(e, 10));
                e = n.Long.fromString(e)
            }
            return e.low || e.high ? new i(e.low >>> 0, e.high >>> 0) : o
        }, i.prototype.toNumber = function(e) {
            if (!e && this.hi >>> 31) {
                var t = 1 + ~this.lo >>> 0,
                    r = ~this.hi >>> 0;
                return t || (r = r + 1 >>> 0), -(t + 4294967296 * r)
            }
            return this.lo + 4294967296 * this.hi
        }, i.prototype.toLong = function(e) { return n.Long ? new n.Long(0 | this.lo, 0 | this.hi, Boolean(e)) : { low: 0 | this.lo, high: 0 | this.hi, unsigned: Boolean(e) } };
        var a = String.prototype.charCodeAt;
        i.fromHash = function(e) { return e === s ? o : new i((a.call(e, 0) | a.call(e, 1) << 8 | a.call(e, 2) << 16 | a.call(e, 3) << 24) >>> 0, (a.call(e, 4) | a.call(e, 5) << 8 | a.call(e, 6) << 16 | a.call(e, 7) << 24) >>> 0) }, i.prototype.toHash = function() { return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24) }, i.prototype.zzEncode = function() { var e = this.hi >> 31; return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0, this.lo = (this.lo << 1 ^ e) >>> 0, this }, i.prototype.zzDecode = function() { var e = -(1 & this.lo); return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0, this.hi = (this.hi >>> 1 ^ e) >>> 0, this }, i.prototype.length = function() {
            var e = this.lo,
                t = (this.lo >>> 28 | this.hi << 4) >>> 0,
                r = this.hi >>> 24;
            return 0 === r ? 0 === t ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : r < 128 ? 9 : 10
        }
    }, function(e, t, r) {
        "use strict";

        function i() { o.call(this) }

        function n(e, t, r) { e.length < 40 ? s.utf8.write(e, t, r) : t.utf8Write ? t.utf8Write(e, r) : t.write(e, r) }
        e.exports = i;
        var o = r(9);
        (i.prototype = Object.create(o.prototype)).constructor = i;
        var s = r(1);
        i._configure = function() {
            i.alloc = s._Buffer_allocUnsafe, i.writeBytesBuffer = s.Buffer && s.Buffer.prototype instanceof Uint8Array && "set" === s.Buffer.prototype.set.name ? function(e, t, r) { t.set(e, r) } : function(e, t, r) {
                if (e.copy) e.copy(t, r, 0, e.length);
                else
                    for (var i = 0; i < e.length;) t[r++] = e[i++]
            }
        }, i.prototype.bytes = function(e) { s.isString(e) && (e = s._Buffer_from(e, "base64")); var t = e.length >>> 0; return this.uint32(t), t && this._push(i.writeBytesBuffer, t, e), this }, i.prototype.string = function(e) { var t = s.Buffer.byteLength(e); return this.uint32(t), t && this._push(n, t, e), this }, i._configure()
    }, function(e, t, r) {
        "use strict";

        function i(e) { n.call(this, e) }
        e.exports = i;
        var n = r(10);
        (i.prototype = Object.create(n.prototype)).constructor = i;
        var o = r(1);
        i._configure = function() { o.Buffer && (i.prototype._slice = o.Buffer.prototype.slice) }, i.prototype.string = function() { var e = this.uint32(); return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + e, this.len)) }, i._configure()
    }, function(e, t, r) {
        "use strict";

        function i(e, t, r) {
            if ("function" != typeof e) throw TypeError("rpcImpl must be a function");
            n.EventEmitter.call(this), this.rpcImpl = e, this.requestDelimited = Boolean(t), this.responseDelimited = Boolean(r)
        }
        e.exports = i;
        var n = r(1);
        (i.prototype = Object.create(n.EventEmitter.prototype)).constructor = i, i.prototype.rpcCall = function e(t, r, i, o, s) {
            if (!o) throw TypeError("request must be specified");
            var a = this;
            if (!s) return n.asPromise(e, a, t, r, i, o);
            if (a.rpcImpl) try {
                return a.rpcImpl(t, r[a.requestDelimited ? "encodeDelimited" : "encode"](o).finish(), (function(e, r) {
                    if (e) return a.emit("error", e, t), s(e);
                    if (null !== r) {
                        if (!(r instanceof i)) try { r = i[a.responseDelimited ? "decodeDelimited" : "decode"](r) } catch (e) { return a.emit("error", e, t), s(e) }
                        return a.emit("data", r, t), s(null, r)
                    }
                    a.end(!0)
                }))
            } catch (e) { return a.emit("error", e, t), void setTimeout((function() { s(e) }), 0) } else setTimeout((function() { s(Error("already ended")) }), 0)
        }, i.prototype.end = function(e) { return this.rpcImpl && (e || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this }
    }, function(e, t, r) {
        "use strict";

        function i(e, t) {
            function r(e) {
                if ("string" != typeof e) { var t = n(); if (i.verbose && console.log("codegen: " + t), t = "return " + t, e) { for (var s = Object.keys(e), a = new Array(s.length + 1), f = new Array(s.length), l = 0; l < s.length;) a[l] = s[l], f[l] = e[s[l++]]; return a[l] = t, Function.apply(null, a).apply(null, f) } return Function(t)() }
                for (var u = new Array(arguments.length - 1), h = 0; h < u.length;) u[h] = arguments[++h];
                if (h = 0, e = e.replace(/%([%dfijs])/g, (function(e, t) {
                        var r = u[h++];
                        switch (t) {
                            case "d":
                            case "f":
                                return String(Number(r));
                            case "i":
                                return String(Math.floor(r));
                            case "j":
                                return JSON.stringify(r);
                            case "s":
                                return String(r)
                        }
                        return "%"
                    })), h !== u.length) throw Error("parameter count mismatch");
                return o.push(e), r
            }

            function n(r) { return "function " + (r || t || "") + "(" + (e && e.join(",") || "") + "){\n  " + o.join("\n  ") + "\n}" }
            "string" == typeof e && (t = e, e = void 0);
            var o = [];
            return r.toString = n, r
        }
        e.exports = i, i.verbose = !1
    }, function(e, t, r) {
        "use strict";

        function i(e, t, r) { return "function" == typeof t ? (r = t, t = {}) : t || (t = {}), r ? !t.xhr && o && o.readFile ? o.readFile(e, (function(n, o) { return n && "undefined" != typeof XMLHttpRequest ? i.xhr(e, t, r) : n ? r(n) : r(null, t.binary ? o : o.toString("utf8")) })) : i.xhr(e, t, r) : n(i, this, e, t) }
        e.exports = i;
        var n = r(17),
            o = r(18)("fs");
        i.xhr = function(e, t, r) {
            var i = new XMLHttpRequest;
            i.onreadystatechange = function() { if (4 === i.readyState) { if (0 !== i.status && 200 !== i.status) return r(Error("status " + i.status)); if (t.binary) { var e = i.response; if (!e) { e = []; for (var n = 0; n < i.responseText.length; ++n) e.push(255 & i.responseText.charCodeAt(n)) } return r(null, "undefined" != typeof Uint8Array ? new Uint8Array(e) : e) } return r(null, i.responseText) } }, t.binary && ("overrideMimeType" in i && i.overrideMimeType("text/plain; charset=x-user-defined"), i.responseType = "arraybuffer"), i.open("GET", e), i.send()
        }
    }, function(e, t, r) {
        "use strict";
        var i = t,
            n = i.isAbsolute = function(e) { return /^(?:\/|\w+:)/.test(e) },
            o = i.normalize = function(e) {
                var t = (e = e.replace(/\\/g, "/").replace(/\/{2,}/g, "/")).split("/"),
                    r = n(e),
                    i = "";
                r && (i = t.shift() + "/");
                for (var o = 0; o < t.length;) ".." === t[o] ? o > 0 && ".." !== t[o - 1] ? t.splice(--o, 2) : r ? t.splice(o, 1) : ++o : "." === t[o] ? t.splice(o, 1) : ++o;
                return i + t.join("/")
            };
        i.resolve = function(e, t, r) { return r || (t = o(t)), n(t) ? t : (r || (e = o(e)), (e = e.replace(/(?:\/|^)[^/]+$/, "")).length ? o(e + "/" + t) : t) }
    }, function(e, t, r) {
        "use strict";
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
            n = r(16).ProtoMovieEntity,
            o = r(8).assign,
            s = r(51),
            a = {};
        o(a, s);
        var f = function(e) { for (var t = [], r = 0; r < e.length; r += 32768) t.push(String.fromCharCode.apply(null, e.subarray(r, r + 32768))); return t.join("") },
            l = {
                loadAssets: function(e, t, r) {
                    if ("object" === ("undefined" == typeof JSZipUtils ? "undefined" : i(JSZipUtils)) && "function" == typeof JSZip)
                        if ("[object File]" == e.toString()) l._readBlobAsArrayBuffer(e, (function(e) {
                            var i = new Uint8Array(e, 0, 4);
                            80 == i[0] && 75 == i[1] && 3 == i[2] && 4 == i[3] ? JSZip.loadAsync(e).then((function(e) { l._decodeAssets(e, t) })) : l.load_viaProto(e, t, r)
                        }));
                        else if (e.indexOf("data:svga/1.0;base64,") >= 0) {
                        var n = l._base64ToArrayBuffer(e.substring(21));
                        JSZip.loadAsync(n).then((function(e) { l._decodeAssets(e, t) }))
                    } else if (e.indexOf("data:svga/2.0;base64,") >= 0) {
                        n = l._base64ToArrayBuffer(e.substring(21));
                        l.load_viaProto(n, t, r)
                    } else JSZipUtils.getBinaryContent(e, (function(e, i) {
                        if (e) throw r && r(e), console.error(e), e;
                        var n = new Uint8Array(i, 0, 4);
                        80 == n[0] && 75 == n[1] && 3 == n[2] && 4 == n[3] ? JSZip.loadAsync(i).then((function(e) { l._decodeAssets(e, t) })) : l.load_viaProto(i, t, r)
                    }));
                    else {
                        var o = new XMLHttpRequest;
                        o.open("GET", e, !0), o.responseType = "arraybuffer", o.onload = function() { l.load_viaProto(o.response, t, r) }, o.onerror = function(e) {
                            if (!r) throw console.error(e), e;
                            r(e)
                        }, o.send()
                    }
                },
                load_viaProto: function(e, t, r) {
                    try {
                        var i = a.inflate(e),
                            o = n.decode(i),
                            s = {};
                        l._loadImages(s, void 0, o, (function() { o.ver = "2.0", t({ movie: o, images: s }) }))
                    } catch (e) { if (r) return void r(e); throw console.error(e), e }
                },
                _decodeAssets: function(e, t) {
                    var r = "1.0";
                    e.file("movie.binary") && (r = "1.5"), e.file("movie.spec").async("string").then((function(i) {
                        var n = JSON.parse(i),
                            o = {};
                        n.ver = r, l._loadImages(o, e, n, (function() { t({ movie: n, images: o }) }))
                    }))
                },
                _loadImages: function(e, t, r, o) {
                    var s = this;
                    if ("object" === (void 0 === r ? "undefined" : i(r)) && r.$type == n) {
                        var a = !0;
                        if (t) e: for (var u in r.images) {
                            switch (function(i) {
                                if (r.images.hasOwnProperty(i)) {
                                    var n = r.images[i],
                                        u = f(n);
                                    return e.hasOwnProperty(i) ? "continue" : (a = !1, t.file(u + ".png").async("base64").then(function(n) { e[i] = n, l._loadImages(e, t, r, o) }.bind(s)), "break")
                                }
                            }(u)) {
                                case "continue":
                                    continue;
                                case "break":
                                    break e
                            }
                        } else
                            for (var h in r.images)
                                if (r.images.hasOwnProperty(h)) {
                                    var c = r.images[h],
                                        d = void 0;
                                    try { d = f(c) } catch (e) { d = f(c) }
                                    e[h] = btoa(d)
                                }
                        a && o.call(this)
                    } else {
                        a = !0;
                        for (var p in r.images)
                            if (r.images.hasOwnProperty(p)) {
                                var y = r.images[p];
                                if (e.hasOwnProperty(p)) continue;
                                a = !1, t.file(y + ".png").async("base64").then(function(i) { e[p] = i, l._loadImages(e, t, r, o) }.bind(this));
                                break
                            }
                        a && o.call(this)
                    }
                },
                _base64ToArrayBuffer: function(e) { for (var t = window.atob(e), r = t.length, i = new Uint8Array(r), n = 0; n < r; n++) i[n] = t.charCodeAt(n); return i.buffer },
                _readBlobAsArrayBuffer: function(e, t) {
                    var r = new FileReader;
                    r.onload = function(e) { t(e.target.result) }, r.readAsArrayBuffer(e)
                }
            };
        e.exports = function(e, t, r) { l.loadAssets(e, t, r) }
    }, function(e, t, r) {
        "use strict";

        function i(e) {
            if (!(this instanceof i)) return new i(e);
            this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e || {});
            var t = this.options;
            t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new u, this.strm.avail_out = 0;
            var r = o.inflateInit2(this.strm, t.windowBits);
            if (r !== f.Z_OK) throw new Error(l[r]);
            if (this.header = new h, o.inflateGetHeader(this.strm, this.header), t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = a.string2buf(t.dictionary) : "[object ArrayBuffer]" === c.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (r = o.inflateSetDictionary(this.strm, t.dictionary)) !== f.Z_OK)) throw new Error(l[r])
        }

        function n(e, t) { var r = new i(t); if (r.push(e, !0), r.err) throw r.msg || l[r.err]; return r.result }
        var o = r(52),
            s = r(8),
            a = r(57),
            f = r(58),
            l = r(59),
            u = r(60),
            h = r(61),
            c = Object.prototype.toString;
        i.prototype.push = function(e, t) {
            var r, i, n, l, u, h = this.strm,
                d = this.options.chunkSize,
                p = this.options.dictionary,
                y = !1;
            if (this.ended) return !1;
            i = t === ~~t ? t : !0 === t ? f.Z_FINISH : f.Z_NO_FLUSH, "string" == typeof e ? h.input = a.binstring2buf(e) : "[object ArrayBuffer]" === c.call(e) ? h.input = new Uint8Array(e) : h.input = e, h.next_in = 0, h.avail_in = h.input.length;
            do {
                if (0 === h.avail_out && (h.output = new s.Buf8(d), h.next_out = 0, h.avail_out = d), (r = o.inflate(h, f.Z_NO_FLUSH)) === f.Z_NEED_DICT && p && (r = o.inflateSetDictionary(this.strm, p)), r === f.Z_BUF_ERROR && !0 === y && (r = f.Z_OK, y = !1), r !== f.Z_STREAM_END && r !== f.Z_OK) return this.onEnd(r), this.ended = !0, !1;
                h.next_out && (0 !== h.avail_out && r !== f.Z_STREAM_END && (0 !== h.avail_in || i !== f.Z_FINISH && i !== f.Z_SYNC_FLUSH) || ("string" === this.options.to ? (n = a.utf8border(h.output, h.next_out), l = h.next_out - n, u = a.buf2string(h.output, n), h.next_out = l, h.avail_out = d - l, l && s.arraySet(h.output, h.output, n, l, 0), this.onData(u)) : this.onData(s.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (y = !0)
            } while ((h.avail_in > 0 || 0 === h.avail_out) && r !== f.Z_STREAM_END);
            return r === f.Z_STREAM_END && (i = f.Z_FINISH), i === f.Z_FINISH ? (r = o.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === f.Z_OK) : i !== f.Z_SYNC_FLUSH || (this.onEnd(f.Z_OK), h.avail_out = 0, !0)
        }, i.prototype.onData = function(e) { this.chunks.push(e) }, i.prototype.onEnd = function(e) { e === f.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg }, t.Inflate = i, t.inflate = n, t.inflateRaw = function(e, t) { return (t = t || {}).raw = !0, n(e, t) }, t.ungzip = n
    }, function(e, t, r) {
        "use strict";

        function i(e) { return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24) }

        function n() { this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new d.Buf16(320), this.work = new d.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0 }

        function o(e) { var t; return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = C, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new d.Buf32(ue), t.distcode = t.distdyn = new d.Buf32(he), t.sane = 1, t.back = -1, O) : j }

        function s(e) { var t; return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, o(e)) : j }

        function a(e, t) { var r, i; return e && e.state ? (i = e.state, t < 0 ? (r = 0, t = -t) : (r = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? j : (null !== i.window && i.wbits !== t && (i.window = null), i.wrap = r, i.wbits = t, s(e))) : j }

        function f(e, t) { var r, i; return e ? (i = new n, e.state = i, i.window = null, (r = a(e, t)) !== O && (e.state = null), r) : j }

        function l(e) {
            if (de) {
                var t;
                for (h = new d.Buf32(512), c = new d.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
                for (; t < 256;) e.lens[t++] = 9;
                for (; t < 280;) e.lens[t++] = 7;
                for (; t < 288;) e.lens[t++] = 8;
                for (v(b, e.lens, 0, 288, h, 0, e.work, { bits: 9 }), t = 0; t < 32;) e.lens[t++] = 5;
                v(_, e.lens, 0, 32, c, 0, e.work, { bits: 5 }), de = !1
            }
            e.lencode = h, e.lenbits = 9, e.distcode = c, e.distbits = 5
        }

        function u(e, t, r, i) { var n, o = e.state; return null === o.window && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new d.Buf8(o.wsize)), i >= o.wsize ? (d.arraySet(o.window, t, r - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : ((n = o.wsize - o.wnext) > i && (n = i), d.arraySet(o.window, t, r - i, n, o.wnext), (i -= n) ? (d.arraySet(o.window, t, r - i, i, 0), o.wnext = i, o.whave = o.wsize) : (o.wnext += n, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += n))), 0 }
        var h, c, d = r(8),
            p = r(53),
            y = r(54),
            m = r(55),
            v = r(56),
            g = 0,
            b = 1,
            _ = 2,
            w = 4,
            k = 5,
            x = 6,
            O = 0,
            A = 1,
            S = 2,
            j = -2,
            T = -3,
            E = -4,
            N = -5,
            F = 8,
            C = 1,
            B = 2,
            I = 3,
            P = 4,
            R = 5,
            D = 6,
            M = 7,
            L = 8,
            z = 9,
            J = 10,
            U = 11,
            Z = 12,
            K = 13,
            q = 14,
            $ = 15,
            V = 16,
            H = 17,
            W = 18,
            G = 19,
            Y = 20,
            Q = 21,
            X = 22,
            ee = 23,
            te = 24,
            re = 25,
            ie = 26,
            ne = 27,
            oe = 28,
            se = 29,
            ae = 30,
            fe = 31,
            le = 32,
            ue = 852,
            he = 592,
            ce = 15,
            de = !0;
        t.inflateReset = s, t.inflateReset2 = a, t.inflateResetKeep = o, t.inflateInit = function(e) { return f(e, ce) }, t.inflateInit2 = f, t.inflate = function(e, t) {
            var r, n, o, s, a, f, h, c, ue, he, ce, de, pe, ye, me, ve, ge, be, _e, we, ke, xe, Oe, Ae, Se = 0,
                je = new d.Buf8(4),
                Te = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return j;
            (r = e.state).mode === Z && (r.mode = K), a = e.next_out, o = e.output, h = e.avail_out, s = e.next_in, n = e.input, f = e.avail_in, c = r.hold, ue = r.bits, he = f, ce = h, xe = O;
            e: for (;;) switch (r.mode) {
                case C:
                    if (0 === r.wrap) { r.mode = K; break }
                    for (; ue < 16;) {
                        if (0 === f) break e;
                        f--, c += n[s++] << ue, ue += 8
                    }
                    if (2 & r.wrap && 35615 === c) { r.check = 0, je[0] = 255 & c, je[1] = c >>> 8 & 255, r.check = y(r.check, je, 2, 0), c = 0, ue = 0, r.mode = B; break }
                    if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & c) << 8) + (c >> 8)) % 31) { e.msg = "incorrect header check", r.mode = ae; break }
                    if ((15 & c) !== F) { e.msg = "unknown compression method", r.mode = ae; break }
                    if (ue -= 4, ke = 8 + (15 & (c >>>= 4)), 0 === r.wbits) r.wbits = ke;
                    else if (ke > r.wbits) { e.msg = "invalid window size", r.mode = ae; break }
                    r.dmax = 1 << ke, e.adler = r.check = 1, r.mode = 512 & c ? J : Z, c = 0, ue = 0;
                    break;
                case B:
                    for (; ue < 16;) {
                        if (0 === f) break e;
                        f--, c += n[s++] << ue, ue += 8
                    }
                    if (r.flags = c, (255 & r.flags) !== F) { e.msg = "unknown compression method", r.mode = ae; break }
                    if (57344 & r.flags) { e.msg = "unknown header flags set", r.mode = ae; break }
                    r.head && (r.head.text = c >> 8 & 1), 512 & r.flags && (je[0] = 255 & c, je[1] = c >>> 8 & 255, r.check = y(r.check, je, 2, 0)), c = 0, ue = 0, r.mode = I;
                case I:
                    for (; ue < 32;) {
                        if (0 === f) break e;
                        f--, c += n[s++] << ue, ue += 8
                    }
                    r.head && (r.head.time = c), 512 & r.flags && (je[0] = 255 & c, je[1] = c >>> 8 & 255, je[2] = c >>> 16 & 255, je[3] = c >>> 24 & 255, r.check = y(r.check, je, 4, 0)), c = 0, ue = 0, r.mode = P;
                case P:
                    for (; ue < 16;) {
                        if (0 === f) break e;
                        f--, c += n[s++] << ue, ue += 8
                    }
                    r.head && (r.head.xflags = 255 & c, r.head.os = c >> 8), 512 & r.flags && (je[0] = 255 & c, je[1] = c >>> 8 & 255, r.check = y(r.check, je, 2, 0)), c = 0, ue = 0, r.mode = R;
                case R:
                    if (1024 & r.flags) {
                        for (; ue < 16;) {
                            if (0 === f) break e;
                            f--, c += n[s++] << ue, ue += 8
                        }
                        r.length = c, r.head && (r.head.extra_len = c), 512 & r.flags && (je[0] = 255 & c, je[1] = c >>> 8 & 255, r.check = y(r.check, je, 2, 0)), c = 0, ue = 0
                    } else r.head && (r.head.extra = null);
                    r.mode = D;
                case D:
                    if (1024 & r.flags && ((de = r.length) > f && (de = f), de && (r.head && (ke = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), d.arraySet(r.head.extra, n, s, de, ke)), 512 & r.flags && (r.check = y(r.check, n, de, s)), f -= de, s += de, r.length -= de), r.length)) break e;
                    r.length = 0, r.mode = M;
                case M:
                    if (2048 & r.flags) {
                        if (0 === f) break e;
                        de = 0;
                        do { ke = n[s + de++], r.head && ke && r.length < 65536 && (r.head.name += String.fromCharCode(ke)) } while (ke && de < f);
                        if (512 & r.flags && (r.check = y(r.check, n, de, s)), f -= de, s += de, ke) break e
                    } else r.head && (r.head.name = null);
                    r.length = 0, r.mode = L;
                case L:
                    if (4096 & r.flags) {
                        if (0 === f) break e;
                        de = 0;
                        do { ke = n[s + de++], r.head && ke && r.length < 65536 && (r.head.comment += String.fromCharCode(ke)) } while (ke && de < f);
                        if (512 & r.flags && (r.check = y(r.check, n, de, s)), f -= de, s += de, ke) break e
                    } else r.head && (r.head.comment = null);
                    r.mode = z;
                case z:
                    if (512 & r.flags) {
                        for (; ue < 16;) {
                            if (0 === f) break e;
                            f--, c += n[s++] << ue, ue += 8
                        }
                        if (c !== (65535 & r.check)) { e.msg = "header crc mismatch", r.mode = ae; break }
                        c = 0, ue = 0
                    }
                    r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = Z;
                    break;
                case J:
                    for (; ue < 32;) {
                        if (0 === f) break e;
                        f--, c += n[s++] << ue, ue += 8
                    }
                    e.adler = r.check = i(c), c = 0, ue = 0, r.mode = U;
                case U:
                    if (0 === r.havedict) return e.next_out = a, e.avail_out = h, e.next_in = s, e.avail_in = f, r.hold = c, r.bits = ue, S;
                    e.adler = r.check = 1, r.mode = Z;
                case Z:
                    if (t === k || t === x) break e;
                case K:
                    if (r.last) { c >>>= 7 & ue, ue -= 7 & ue, r.mode = ne; break }
                    for (; ue < 3;) {
                        if (0 === f) break e;
                        f--, c += n[s++] << ue, ue += 8
                    }
                    switch (r.last = 1 & c, ue -= 1, 3 & (c >>>= 1)) {
                        case 0:
                            r.mode = q;
                            break;
                        case 1:
                            if (l(r), r.mode = Y, t === x) { c >>>= 2, ue -= 2; break e }
                            break;
                        case 2:
                            r.mode = H;
                            break;
                        case 3:
                            e.msg = "invalid block type", r.mode = ae
                    }
                    c >>>= 2, ue -= 2;
                    break;
                case q:
                    for (c >>>= 7 & ue, ue -= 7 & ue; ue < 32;) {
                        if (0 === f) break e;
                        f--, c += n[s++] << ue, ue += 8
                    }
                    if ((65535 & c) != (c >>> 16 ^ 65535)) { e.msg = "invalid stored block lengths", r.mode = ae; break }
                    if (r.length = 65535 & c, c = 0, ue = 0, r.mode = $, t === x) break e;
                case $:
                    r.mode = V;
                case V:
                    if (de = r.length) {
                        if (de > f && (de = f), de > h && (de = h), 0 === de) break e;
                        d.arraySet(o, n, s, de, a), f -= de, s += de, h -= de, a += de, r.length -= de;
                        break
                    }
                    r.mode = Z;
                    break;
                case H:
                    for (; ue < 14;) {
                        if (0 === f) break e;
                        f--, c += n[s++] << ue, ue += 8
                    }
                    if (r.nlen = 257 + (31 & c), c >>>= 5, ue -= 5, r.ndist = 1 + (31 & c), c >>>= 5, ue -= 5, r.ncode = 4 + (15 & c), c >>>= 4, ue -= 4, r.nlen > 286 || r.ndist > 30) { e.msg = "too many length or distance symbols", r.mode = ae; break }
                    r.have = 0, r.mode = W;
                case W:
                    for (; r.have < r.ncode;) {
                        for (; ue < 3;) {
                            if (0 === f) break e;
                            f--, c += n[s++] << ue, ue += 8
                        }
                        r.lens[Te[r.have++]] = 7 & c, c >>>= 3, ue -= 3
                    }
                    for (; r.have < 19;) r.lens[Te[r.have++]] = 0;
                    if (r.lencode = r.lendyn, r.lenbits = 7, Oe = { bits: r.lenbits }, xe = v(g, r.lens, 0, 19, r.lencode, 0, r.work, Oe), r.lenbits = Oe.bits, xe) { e.msg = "invalid code lengths set", r.mode = ae; break }
                    r.have = 0, r.mode = G;
                case G:
                    for (; r.have < r.nlen + r.ndist;) {
                        for (; ve = (Se = r.lencode[c & (1 << r.lenbits) - 1]) >>> 16 & 255, ge = 65535 & Se, !((me = Se >>> 24) <= ue);) {
                            if (0 === f) break e;
                            f--, c += n[s++] << ue, ue += 8
                        }
                        if (ge < 16) c >>>= me, ue -= me, r.lens[r.have++] = ge;
                        else {
                            if (16 === ge) {
                                for (Ae = me + 2; ue < Ae;) {
                                    if (0 === f) break e;
                                    f--, c += n[s++] << ue, ue += 8
                                }
                                if (c >>>= me, ue -= me, 0 === r.have) { e.msg = "invalid bit length repeat", r.mode = ae; break }
                                ke = r.lens[r.have - 1], de = 3 + (3 & c), c >>>= 2, ue -= 2
                            } else if (17 === ge) {
                                for (Ae = me + 3; ue < Ae;) {
                                    if (0 === f) break e;
                                    f--, c += n[s++] << ue, ue += 8
                                }
                                ue -= me, ke = 0, de = 3 + (7 & (c >>>= me)), c >>>= 3, ue -= 3
                            } else {
                                for (Ae = me + 7; ue < Ae;) {
                                    if (0 === f) break e;
                                    f--, c += n[s++] << ue, ue += 8
                                }
                                ue -= me, ke = 0, de = 11 + (127 & (c >>>= me)), c >>>= 7, ue -= 7
                            }
                            if (r.have + de > r.nlen + r.ndist) { e.msg = "invalid bit length repeat", r.mode = ae; break }
                            for (; de--;) r.lens[r.have++] = ke
                        }
                    }
                    if (r.mode === ae) break;
                    if (0 === r.lens[256]) { e.msg = "invalid code -- missing end-of-block", r.mode = ae; break }
                    if (r.lenbits = 9, Oe = { bits: r.lenbits }, xe = v(b, r.lens, 0, r.nlen, r.lencode, 0, r.work, Oe), r.lenbits = Oe.bits, xe) { e.msg = "invalid literal/lengths set", r.mode = ae; break }
                    if (r.distbits = 6, r.distcode = r.distdyn, Oe = { bits: r.distbits }, xe = v(_, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, Oe), r.distbits = Oe.bits, xe) { e.msg = "invalid distances set", r.mode = ae; break }
                    if (r.mode = Y, t === x) break e;
                case Y:
                    r.mode = Q;
                case Q:
                    if (f >= 6 && h >= 258) { e.next_out = a, e.avail_out = h, e.next_in = s, e.avail_in = f, r.hold = c, r.bits = ue, m(e, ce), a = e.next_out, o = e.output, h = e.avail_out, s = e.next_in, n = e.input, f = e.avail_in, c = r.hold, ue = r.bits, r.mode === Z && (r.back = -1); break }
                    for (r.back = 0; ve = (Se = r.lencode[c & (1 << r.lenbits) - 1]) >>> 16 & 255, ge = 65535 & Se, !((me = Se >>> 24) <= ue);) {
                        if (0 === f) break e;
                        f--, c += n[s++] << ue, ue += 8
                    }
                    if (ve && 0 == (240 & ve)) {
                        for (be = me, _e = ve, we = ge; ve = (Se = r.lencode[we + ((c & (1 << be + _e) - 1) >> be)]) >>> 16 & 255, ge = 65535 & Se, !(be + (me = Se >>> 24) <= ue);) {
                            if (0 === f) break e;
                            f--, c += n[s++] << ue, ue += 8
                        }
                        c >>>= be, ue -= be, r.back += be
                    }
                    if (c >>>= me, ue -= me, r.back += me, r.length = ge, 0 === ve) { r.mode = ie; break }
                    if (32 & ve) { r.back = -1, r.mode = Z; break }
                    if (64 & ve) { e.msg = "invalid literal/length code", r.mode = ae; break }
                    r.extra = 15 & ve, r.mode = X;
                case X:
                    if (r.extra) {
                        for (Ae = r.extra; ue < Ae;) {
                            if (0 === f) break e;
                            f--, c += n[s++] << ue, ue += 8
                        }
                        r.length += c & (1 << r.extra) - 1, c >>>= r.extra, ue -= r.extra, r.back += r.extra
                    }
                    r.was = r.length, r.mode = ee;
                case ee:
                    for (; ve = (Se = r.distcode[c & (1 << r.distbits) - 1]) >>> 16 & 255, ge = 65535 & Se, !((me = Se >>> 24) <= ue);) {
                        if (0 === f) break e;
                        f--, c += n[s++] << ue, ue += 8
                    }
                    if (0 == (240 & ve)) {
                        for (be = me, _e = ve, we = ge; ve = (Se = r.distcode[we + ((c & (1 << be + _e) - 1) >> be)]) >>> 16 & 255, ge = 65535 & Se, !(be + (me = Se >>> 24) <= ue);) {
                            if (0 === f) break e;
                            f--, c += n[s++] << ue, ue += 8
                        }
                        c >>>= be, ue -= be, r.back += be
                    }
                    if (c >>>= me, ue -= me, r.back += me, 64 & ve) { e.msg = "invalid distance code", r.mode = ae; break }
                    r.offset = ge, r.extra = 15 & ve, r.mode = te;
                case te:
                    if (r.extra) {
                        for (Ae = r.extra; ue < Ae;) {
                            if (0 === f) break e;
                            f--, c += n[s++] << ue, ue += 8
                        }
                        r.offset += c & (1 << r.extra) - 1, c >>>= r.extra, ue -= r.extra, r.back += r.extra
                    }
                    if (r.offset > r.dmax) { e.msg = "invalid distance too far back", r.mode = ae; break }
                    r.mode = re;
                case re:
                    if (0 === h) break e;
                    if (de = ce - h, r.offset > de) { if ((de = r.offset - de) > r.whave && r.sane) { e.msg = "invalid distance too far back", r.mode = ae; break }
                        de > r.wnext ? (de -= r.wnext, pe = r.wsize - de) : pe = r.wnext - de, de > r.length && (de = r.length), ye = r.window } else ye = o, pe = a - r.offset, de = r.length;
                    de > h && (de = h), h -= de, r.length -= de;
                    do { o[a++] = ye[pe++] } while (--de);
                    0 === r.length && (r.mode = Q);
                    break;
                case ie:
                    if (0 === h) break e;
                    o[a++] = r.length, h--, r.mode = Q;
                    break;
                case ne:
                    if (r.wrap) {
                        for (; ue < 32;) {
                            if (0 === f) break e;
                            f--, c |= n[s++] << ue, ue += 8
                        }
                        if (ce -= h, e.total_out += ce, r.total += ce, ce && (e.adler = r.check = r.flags ? y(r.check, o, ce, a - ce) : p(r.check, o, ce, a - ce)), ce = h, (r.flags ? c : i(c)) !== r.check) { e.msg = "incorrect data check", r.mode = ae; break }
                        c = 0, ue = 0
                    }
                    r.mode = oe;
                case oe:
                    if (r.wrap && r.flags) {
                        for (; ue < 32;) {
                            if (0 === f) break e;
                            f--, c += n[s++] << ue, ue += 8
                        }
                        if (c !== (4294967295 & r.total)) { e.msg = "incorrect length check", r.mode = ae; break }
                        c = 0, ue = 0
                    }
                    r.mode = se;
                case se:
                    xe = A;
                    break e;
                case ae:
                    xe = T;
                    break e;
                case fe:
                    return E;
                case le:
                default:
                    return j
            }
            return e.next_out = a, e.avail_out = h, e.next_in = s, e.avail_in = f, r.hold = c, r.bits = ue, (r.wsize || ce !== e.avail_out && r.mode < ae && (r.mode < ne || t !== w)) && u(e, e.output, e.next_out, ce - e.avail_out) ? (r.mode = fe, E) : (he -= e.avail_in, ce -= e.avail_out, e.total_in += he, e.total_out += ce, r.total += ce, r.wrap && ce && (e.adler = r.check = r.flags ? y(r.check, o, ce, e.next_out - ce) : p(r.check, o, ce, e.next_out - ce)), e.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === Z ? 128 : 0) + (r.mode === Y || r.mode === $ ? 256 : 0), (0 === he && 0 === ce || t === w) && xe === O && (xe = N), xe)
        }, t.inflateEnd = function(e) { if (!e || !e.state) return j; var t = e.state; return t.window && (t.window = null), e.state = null, O }, t.inflateGetHeader = function(e, t) { var r; return e && e.state ? 0 == (2 & (r = e.state).wrap) ? j : (r.head = t, t.done = !1, O) : j }, t.inflateSetDictionary = function(e, t) { var r, i = t.length; return e && e.state ? 0 !== (r = e.state).wrap && r.mode !== U ? j : r.mode === U && p(1, t, i, 0) !== r.check ? T : u(e, t, i, i) ? (r.mode = fe, E) : (r.havedict = 1, O) : j }, t.inflateInfo = "pako inflate (from Nodeca project)"
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t, r, i) {
            for (var n = 65535 & e | 0, o = e >>> 16 & 65535 | 0, s = 0; 0 !== r;) {
                r -= s = r > 2e3 ? 2e3 : r;
                do { o = o + (n = n + t[i++] | 0) | 0 } while (--s);
                n %= 65521, o %= 65521
            }
            return n | o << 16 | 0
        }
    }, function(e, t, r) {
        "use strict";
        var i = function() {
            for (var e, t = [], r = 0; r < 256; r++) {
                e = r;
                for (var i = 0; i < 8; i++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                t[r] = e
            }
            return t
        }();
        e.exports = function(e, t, r, n) {
            var o = i,
                s = n + r;
            e ^= -1;
            for (var a = n; a < s; a++) e = e >>> 8 ^ o[255 & (e ^ t[a])];
            return -1 ^ e
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t) {
            var r, i, n, o, s, a, f, l, u, h, c, d, p, y, m, v, g, b, _, w, k, x, O, A, S;
            r = e.state, i = e.next_in, A = e.input, n = i + (e.avail_in - 5), o = e.next_out, S = e.output, s = o - (t - e.avail_out), a = o + (e.avail_out - 257), f = r.dmax, l = r.wsize, u = r.whave, h = r.wnext, c = r.window, d = r.hold, p = r.bits, y = r.lencode, m = r.distcode, v = (1 << r.lenbits) - 1, g = (1 << r.distbits) - 1;
            e: do {
                p < 15 && (d += A[i++] << p, p += 8, d += A[i++] << p, p += 8), b = y[d & v];
                t: for (;;) {
                    if (d >>>= _ = b >>> 24, p -= _, 0 == (_ = b >>> 16 & 255)) S[o++] = 65535 & b;
                    else {
                        if (!(16 & _)) { if (0 == (64 & _)) { b = y[(65535 & b) + (d & (1 << _) - 1)]; continue t } if (32 & _) { r.mode = 12; break e }
                            e.msg = "invalid literal/length code", r.mode = 30; break e }
                        w = 65535 & b, (_ &= 15) && (p < _ && (d += A[i++] << p, p += 8), w += d & (1 << _) - 1, d >>>= _, p -= _), p < 15 && (d += A[i++] << p, p += 8, d += A[i++] << p, p += 8), b = m[d & g];
                        r: for (;;) {
                            if (d >>>= _ = b >>> 24, p -= _, !(16 & (_ = b >>> 16 & 255))) { if (0 == (64 & _)) { b = m[(65535 & b) + (d & (1 << _) - 1)]; continue r }
                                e.msg = "invalid distance code", r.mode = 30; break e }
                            if (k = 65535 & b, p < (_ &= 15) && (d += A[i++] << p, (p += 8) < _ && (d += A[i++] << p, p += 8)), (k += d & (1 << _) - 1) > f) { e.msg = "invalid distance too far back", r.mode = 30; break e }
                            if (d >>>= _, p -= _, k > (_ = o - s)) {
                                if ((_ = k - _) > u && r.sane) { e.msg = "invalid distance too far back", r.mode = 30; break e }
                                if (x = 0, O = c, 0 === h) {
                                    if (x += l - _, _ < w) {
                                        w -= _;
                                        do { S[o++] = c[x++] } while (--_);
                                        x = o - k, O = S
                                    }
                                } else if (h < _) {
                                    if (x += l + h - _, (_ -= h) < w) {
                                        w -= _;
                                        do { S[o++] = c[x++] } while (--_);
                                        if (x = 0, h < w) {
                                            w -= _ = h;
                                            do { S[o++] = c[x++] } while (--_);
                                            x = o - k, O = S
                                        }
                                    }
                                } else if (x += h - _, _ < w) {
                                    w -= _;
                                    do { S[o++] = c[x++] } while (--_);
                                    x = o - k, O = S
                                }
                                for (; w > 2;) S[o++] = O[x++], S[o++] = O[x++], S[o++] = O[x++], w -= 3;
                                w && (S[o++] = O[x++], w > 1 && (S[o++] = O[x++]))
                            } else {
                                x = o - k;
                                do { S[o++] = S[x++], S[o++] = S[x++], S[o++] = S[x++], w -= 3 } while (w > 2);
                                w && (S[o++] = S[x++], w > 1 && (S[o++] = S[x++]))
                            }
                            break
                        }
                    }
                    break
                }
            } while (i < n && o < a);
            i -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, e.next_in = i, e.next_out = o, e.avail_in = i < n ? n - i + 5 : 5 - (i - n), e.avail_out = o < a ? a - o + 257 : 257 - (o - a), r.hold = d, r.bits = p
        }
    }, function(e, t, r) {
        "use strict";
        var i = r(8),
            n = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
            o = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
            s = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
            a = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        e.exports = function(e, t, r, f, l, u, h, c) {
            var d, p, y, m, v, g, b, _, w, k = c.bits,
                x = 0,
                O = 0,
                A = 0,
                S = 0,
                j = 0,
                T = 0,
                E = 0,
                N = 0,
                F = 0,
                C = 0,
                B = null,
                I = 0,
                P = new i.Buf16(16),
                R = new i.Buf16(16),
                D = null,
                M = 0;
            for (x = 0; x <= 15; x++) P[x] = 0;
            for (O = 0; O < f; O++) P[t[r + O]]++;
            for (j = k, S = 15; S >= 1 && 0 === P[S]; S--);
            if (j > S && (j = S), 0 === S) return l[u++] = 20971520, l[u++] = 20971520, c.bits = 1, 0;
            for (A = 1; A < S && 0 === P[A]; A++);
            for (j < A && (j = A), N = 1, x = 1; x <= 15; x++)
                if (N <<= 1, (N -= P[x]) < 0) return -1;
            if (N > 0 && (0 === e || 1 !== S)) return -1;
            for (R[1] = 0, x = 1; x < 15; x++) R[x + 1] = R[x] + P[x];
            for (O = 0; O < f; O++) 0 !== t[r + O] && (h[R[t[r + O]]++] = O);
            if (0 === e ? (B = D = h, g = 19) : 1 === e ? (B = n, I -= 257, D = o, M -= 257, g = 256) : (B = s, D = a, g = -1), C = 0, O = 0, x = A, v = u, T = j, E = 0, y = -1, m = (F = 1 << j) - 1, 1 === e && F > 852 || 2 === e && F > 592) return 1;
            for (;;) {
                b = x - E, h[O] < g ? (_ = 0, w = h[O]) : h[O] > g ? (_ = D[M + h[O]], w = B[I + h[O]]) : (_ = 96, w = 0), d = 1 << x - E, A = p = 1 << T;
                do { l[v + (C >> E) + (p -= d)] = b << 24 | _ << 16 | w | 0 } while (0 !== p);
                for (d = 1 << x - 1; C & d;) d >>= 1;
                if (0 !== d ? (C &= d - 1, C += d) : C = 0, O++, 0 == --P[x]) {
                    if (x === S) break;
                    x = t[r + h[O]]
                }
                if (x > j && (C & m) !== y) {
                    for (0 === E && (E = j), v += A, N = 1 << (T = x - E); T + E < S && !((N -= P[T + E]) <= 0);) T++, N <<= 1;
                    if (F += 1 << T, 1 === e && F > 852 || 2 === e && F > 592) return 1;
                    l[y = C & m] = j << 24 | T << 16 | v - u | 0
                }
            }
            return 0 !== C && (l[v + C] = x - E << 24 | 64 << 16 | 0), c.bits = j, 0
        }
    }, function(e, t, r) {
        "use strict";

        function i(e, t) { if (t < 65534 && (e.subarray && s || !e.subarray && o)) return String.fromCharCode.apply(null, n.shrinkBuf(e, t)); for (var r = "", i = 0; i < t; i++) r += String.fromCharCode(e[i]); return r }
        var n = r(8),
            o = !0,
            s = !0;
        try { String.fromCharCode.apply(null, [0]) } catch (e) { o = !1 }
        try { String.fromCharCode.apply(null, new Uint8Array(1)) } catch (e) { s = !1 }
        for (var a = new n.Buf8(256), f = 0; f < 256; f++) a[f] = f >= 252 ? 6 : f >= 248 ? 5 : f >= 240 ? 4 : f >= 224 ? 3 : f >= 192 ? 2 : 1;
        a[254] = a[254] = 1, t.string2buf = function(e) {
            var t, r, i, o, s, a = e.length,
                f = 0;
            for (o = 0; o < a; o++) 55296 == (64512 & (r = e.charCodeAt(o))) && o + 1 < a && 56320 == (64512 & (i = e.charCodeAt(o + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), o++), f += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
            for (t = new n.Buf8(f), s = 0, o = 0; s < f; o++) 55296 == (64512 & (r = e.charCodeAt(o))) && o + 1 < a && 56320 == (64512 & (i = e.charCodeAt(o + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), o++), r < 128 ? t[s++] = r : r < 2048 ? (t[s++] = 192 | r >>> 6, t[s++] = 128 | 63 & r) : r < 65536 ? (t[s++] = 224 | r >>> 12, t[s++] = 128 | r >>> 6 & 63, t[s++] = 128 | 63 & r) : (t[s++] = 240 | r >>> 18, t[s++] = 128 | r >>> 12 & 63, t[s++] = 128 | r >>> 6 & 63, t[s++] = 128 | 63 & r);
            return t
        }, t.buf2binstring = function(e) { return i(e, e.length) }, t.binstring2buf = function(e) { for (var t = new n.Buf8(e.length), r = 0, i = t.length; r < i; r++) t[r] = e.charCodeAt(r); return t }, t.buf2string = function(e, t) {
            var r, n, o, s, f = t || e.length,
                l = new Array(2 * f);
            for (n = 0, r = 0; r < f;)
                if ((o = e[r++]) < 128) l[n++] = o;
                else if ((s = a[o]) > 4) l[n++] = 65533, r += s - 1;
            else {
                for (o &= 2 === s ? 31 : 3 === s ? 15 : 7; s > 1 && r < f;) o = o << 6 | 63 & e[r++], s--;
                s > 1 ? l[n++] = 65533 : o < 65536 ? l[n++] = o : (o -= 65536, l[n++] = 55296 | o >> 10 & 1023, l[n++] = 56320 | 1023 & o)
            }
            return i(l, n)
        }, t.utf8border = function(e, t) { var r; for ((t = t || e.length) > e.length && (t = e.length), r = t - 1; r >= 0 && 128 == (192 & e[r]);) r--; return r < 0 ? t : 0 === r ? t : r + a[e[r]] > t ? r : t }
    }, function(e, t, r) {
        "use strict";
        e.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 }
    }, function(e, t, r) {
        "use strict";
        e.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" }
    }, function(e, t, r) {
        "use strict";
        e.exports = function() { this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0 }
    }, function(e, t, r) {
        "use strict";
        e.exports = function() { this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1 }
    }, function(e, t, r) {
        "undefined" != typeof self && self, e.exports = function(e) {
            function t(i) { if (r[i]) return r[i].exports; var n = r[i] = { i: i, l: !1, exports: {} }; return e[i].call(n.exports, n, n.exports, t), n.l = !0, n.exports }
            var r = {};
            return t.m = e, t.c = r, t.d = function(e, r, i) { t.o(e, r) || Object.defineProperty(e, r, { configurable: !1, enumerable: !0, get: i }) }, t.n = function(e) { var r = e && e.__esModule ? function() { return e.default } : function() { return e }; return t.d(r, "a", r), r }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 0)
        }([function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 });
            var i = r(1);
            e.exports = i.ValueAnimator
        }, function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 });
            var i = function() {
                function e() { this.startValue = 0, this.endValue = 0, this.duration = 0, this.loops = 1, this.fillRule = 0, this.onStart = function() {}, this.onUpdate = function() {}, this.onEnd = function() {}, this.mRunning = !1, this.mStartTime = 0, this.mCurrentFrication = 0, this.mReverse = !1 }
                return e.prototype.start = function(e) { void 0 === e && (e = void 0), this.doStart(!1, e) }, e.prototype.reverse = function(e) { void 0 === e && (e = void 0), this.doStart(!0, e) }, e.prototype.stop = function() { this.doStop() }, Object.defineProperty(e.prototype, "animatedValue", { get: function() { return (this.endValue - this.startValue) * this.mCurrentFrication + this.startValue }, enumerable: !0, configurable: !0 }), e.prototype.doStart = function(t, r) { void 0 === t && (t = !1), void 0 === r && (r = void 0), this.mReverse = t, this.mRunning = !0, this.mStartTime = e.currentTimeMillsecond(), r && (this.mStartTime -= t ? (1 - r / (this.endValue - this.startValue)) * this.duration : r / (this.endValue - this.startValue) * this.duration), this.mCurrentFrication = 0, this.onStart(), this.doFrame() }, e.prototype.doStop = function() { this.mRunning = !1 }, e.prototype.doFrame = function() { this.mRunning && (this.doDeltaTime(e.currentTimeMillsecond() - this.mStartTime), this.mRunning && e.requestAnimationFrame(this.doFrame.bind(this))) }, e.prototype.doDeltaTime = function(e) { e >= this.duration * this.loops ? (this.mCurrentFrication = 1 === this.fillRule ? 0 : 1, this.mRunning = !1) : (this.mCurrentFrication = e % this.duration / this.duration, this.mReverse && (this.mCurrentFrication = 1 - this.mCurrentFrication)), this.onUpdate(this.animatedValue), !1 === this.mRunning && this.onEnd() }, e.currentTimeMillsecond = function() { return "undefined" == typeof performance ? (new Date).getTime() : performance.now() }, e.requestAnimationFrame = function(e) { return "undefined" == typeof requestAnimationFrame ? setTimeout(e, 16) : window.requestAnimationFrame(e) }, e
            }();
            t.ValueAnimator = i
        }])
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.Player = void 0;
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
            n = function() {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, r, i) { return r && e(t.prototype, r), i && e(t, i), t }
            }(),
            o = r(65),
            s = r(62);
        t.Player = function() {
            function e(t) {
                (function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") })(this, e), this.loops = 0, this.clearsAfterStop = !0, this.fillMode = "Forward", this._asChild = !1, this._container = void 0, this._renderer = void 0, this._animator = void 0, this._drawingCanvas = void 0, this._contentMode = "AspectFit", this._videoItem = void 0, this._forwardAnimating = !1, this._currentFrame = 0, this._dynamicImage = {}, this._dynamicImageTransform = {}, this._dynamicText = {}, this._onFinished = void 0, this._onFrame = void 0, this._onPercentage = void 0, this._container = "string" == typeof t ? document.querySelector(t) : t, this._asChild = void 0 === t, this._init()
            }
            return n(e, [{ key: "setVideoItem", value: function(e) { this._currentFrame = 0, this._videoItem = e, this._renderer.prepare(), this.clear(), this._update() } }, { key: "setContentMode", value: function(e) { this._contentMode = e, this._update() } }, { key: "setClipsToBounds", value: function(e) { this._container instanceof HTMLDivElement && (this._container.style.overflowX = this._container.style.overflowY = e ? "hidden" : void 0) } }, { key: "startAnimation", value: function(e) { this.stopAnimation(!1), this._doStart(void 0, e, void 0) } }, { key: "startAnimationWithRange", value: function(e, t) { this.stopAnimation(!1), this._doStart(e, t, void 0) } }, { key: "pauseAnimation", value: function() { this.stopAnimation(!1) } }, { key: "stopAnimation", value: function(e) { this._forwardAnimating = !1, void 0 !== this._animator && this._animator.stop(), void 0 === e && (e = this.clearsAfterStop), e && this.clear() } }, { key: "clear", value: function() { this._renderer.clear(), this._renderer.clearAudios() } }, { key: "stepToFrame", value: function(e, t) { e >= this._videoItem.frames || e < 0 || (this.pauseAnimation(), this._currentFrame = e, this._update(), t && this._doStart(void 0, !1, this._currentFrame)) } }, {
                key: "stepToPercentage",
                value: function(e, t) {
                    var r = parseInt(e * this._videoItem.frames);
                    r >= this._videoItem.frames && r > 0 && (r = this._videoItem.frames - 1), this.stepToFrame(r, t)
                }
            }, { key: "setImage", value: function(e, t, r) { this._dynamicImage[t] = e, void 0 !== r && r instanceof Array && 6 == r.length && (this._dynamicImageTransform[t] = r) } }, {
                key: "setText",
                value: function(e, t) {
                    var r = "string" == typeof e ? e : e.text,
                        n = ("object" === (void 0 === e ? "undefined" : i(e)) ? e.size : "14px") || "14px",
                        o = ("object" === (void 0 === e ? "undefined" : i(e)) ? e.family : "Arial") || "Arial",
                        s = ("object" === (void 0 === e ? "undefined" : i(e)) ? e.color : "#000000") || "#000000",
                        a = ("object" === (void 0 === e ? "undefined" : i(e)) ? e.offset : { x: 0, y: 0 }) || { x: 0, y: 0 };
                    this._dynamicText[t] = { text: r, style: n + " " + o, color: s, offset: a }
                }
            }, { key: "clearDynamicObjects", value: function() { this._dynamicImage = {}, this._dynamicImageTransform = {}, this._dynamicText = {} } }, { key: "onFinished", value: function(e) { this._onFinished = e } }, { key: "onFrame", value: function(e) { this._onFrame = e } }, { key: "onPercentage", value: function(e) { this._onPercentage = e } }, { key: "drawOnContext", value: function(e, t, r, i, n) { this._drawingCanvas && this._videoItem && e.drawImage(this._drawingCanvas, t, r, i || this._videoItem.videoSize.width, n || this._videoItem.videoSize.height) } }, {
                key: "_init",
                value: function() {
                    if (this._container instanceof HTMLDivElement || this._asChild) {
                        if (this._container)
                            for (var e = this._container.querySelectorAll("canvas"), t = 0; t < e.length; t++) {
                                var r = e[t];
                                void 0 !== r && r.__isPlayer && this._container.removeChild(r)
                            }
                        this._drawingCanvas = document.createElement("canvas"), this._drawingCanvas.__isPlayer = !0, this._drawingCanvas.style.backgroundColor = "transparent", this._container && (this._container.appendChild(this._drawingCanvas), this._container.style.textAlign = "left")
                    }
                    this._renderer = new o.Renderer(this)
                }
            }, {
                key: "_doStart",
                value: function(e, t, r) {
                    var i = this;
                    this._animator = new s, void 0 !== e ? (this._animator.startValue = Math.max(0, e.location), this._animator.endValue = Math.min(this._videoItem.frames - 1, e.location + e.length), this._animator.duration = (this._animator.endValue - this._animator.startValue + 1) * (1 / this._videoItem.FPS) * 1e3) : (this._animator.startValue = 0, this._animator.endValue = this._videoItem.frames - 1, this._animator.duration = this._videoItem.frames * (1 / this._videoItem.FPS) * 1e3), this._animator.loops = this.loops <= 0 ? 1 / 0 : this.loops, this._animator.fillRule = "Backward" === this.fillMode ? 1 : 0, this._animator.onUpdate = function(e) { i._currentFrame !== Math.floor(e) && (i._forwardAnimating && i._currentFrame > Math.floor(e) && i._renderer.clearAudios(), i._currentFrame = Math.floor(e), i._update(), "function" == typeof i._onFrame && i._onFrame(i._currentFrame), "function" == typeof i._onPercentage && i._onPercentage(parseFloat(i._currentFrame + 1) / parseFloat(i._videoItem.frames))) }, this._animator.onEnd = function() { i._forwardAnimating = !1, !0 === i.clearsAfterStop && i.clear(), "function" == typeof i._onFinished && i._onFinished() }, !0 === t ? (this._animator.reverse(r), this._forwardAnimating = !1) : (this._animator.start(r), this._forwardAnimating = !0), this._currentFrame = this._animator.startValue, this._update()
                }
            }, {
                key: "_resize",
                value: function() {
                    var e = !1;
                    if (this._drawingCanvas) {
                        var t;
                        t = this._drawingCanvas.parentNode ? { width: this._drawingCanvas.parentNode.clientWidth, height: this._drawingCanvas.parentNode.clientHeight } : this._videoItem.videoSize;
                        var r = this._videoItem.videoSize;
                        if (t.width >= r.width && t.height >= r.height) this._drawingCanvas.width = t.width, this._drawingCanvas.height = t.height, this._drawingCanvas.style.webkitTransform = this._drawingCanvas.style.transform = "", e = !0;
                        else {
                            if (this._drawingCanvas.width = r.width, this._drawingCanvas.height = r.height, "Fill" === this._contentMode) {
                                var i = t.width / r.width,
                                    n = t.height / r.height,
                                    o = (r.width * i - r.width) / 2,
                                    s = (r.height * n - r.height) / 2;
                                this._drawingCanvas.style.webkitTransform = this._drawingCanvas.style.transform = "matrix(" + i + ", 0.0, 0.0, " + n + ", " + o + ", " + s + ")"
                            } else if ("AspectFit" === this._contentMode || "AspectFill" === this._contentMode) {
                                var a = r.width / r.height,
                                    f = t.width / t.height;
                                if (a >= f && "AspectFit" === this._contentMode || a <= f && "AspectFill" === this._contentMode) {
                                    var l = t.width / r.width,
                                        u = (r.width * l - r.width) / 2,
                                        h = (r.height * l - r.height) / 2 + (t.height - r.height * l) / 2;
                                    this._drawingCanvas.style.webkitTransform = this._drawingCanvas.style.transform = "matrix(" + l + ", 0.0, 0.0, " + l + ", " + u + ", " + h + ")"
                                } else if (a < f && "AspectFit" === this._contentMode || a > f && "AspectFill" === this._contentMode) {
                                    var c = t.height / r.height,
                                        d = (r.width * c - r.width) / 2 + (t.width - r.width * c) / 2,
                                        p = (r.height * c - r.height) / 2;
                                    this._drawingCanvas.style.webkitTransform = this._drawingCanvas.style.transform = "matrix(" + c + ", 0.0, 0.0, " + c + ", " + d + ", " + p + ")"
                                }
                            }
                            this._globalTransform = void 0
                        }
                    }
                    if (void 0 === this._drawingCanvas || !0 === e) {
                        var y = 1,
                            m = 1,
                            v = 0,
                            g = 0,
                            b = { width: void 0 !== this._container ? this._container.clientWidth : 0, height: void 0 !== this._container ? this._container.clientHeight : 0 },
                            _ = this._videoItem.videoSize;
                        if ("Fill" === this._contentMode) y = b.width / _.width, m = b.height / _.height;
                        else if ("AspectFit" === this._contentMode || "AspectFill" === this._contentMode) {
                            var w = _.width / _.height,
                                k = b.width / b.height;
                            w >= k && "AspectFit" === this._contentMode || w <= k && "AspectFill" === this._contentMode ? (y = m = b.width / _.width, g = (b.height - _.height * m) / 2) : (w < k && "AspectFit" === this._contentMode || w > k && "AspectFill" === this._contentMode) && (y = m = b.height / _.height, v = (b.width - _.width * y) / 2)
                        }
                        this._globalTransform = { a: y, b: 0, c: 0, d: m, tx: v, ty: g }
                    }
                }
            }, { key: "_update", value: function() { void 0 !== this._videoItem && (this._resize(), this._renderer.drawFrame(this._currentFrame), this._renderer.playAudio(this._currentFrame)) } }]), e
        }()
    }, function(e, t, r) {
        "use strict";
        var i = r(13),
            n = r(63),
            o = r(66);
        e.exports = { Parser: i.Parser, Player: n.Player, autoload: o.AutoLoader.autoload }, o.AutoLoader.autoload()
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.Renderer = void 0;
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
            n = function() {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, r, i) { return r && e(t.prototype, r), i && e(t, i), t }
            }(),
            o = r(5),
            s = r(15),
            a = r(14);
        t.Renderer = function() {
            function e(t) {
                (function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") })(this, e), this._owner = void 0, this._prepared = !1, this._undrawFrame = void 0, this._bitmapCache = void 0, this._soundsQueue = [], this._owner = t
            }
            return n(e, [{ key: "dataURLtoBlob", value: function(e) { for (var t = e.split(","), r = t[0].match(/:(.*?);/)[1], i = atob(t[1]), n = i.length, o = new Uint8Array(n); n--;) o[n] = i.charCodeAt(n); return new Blob([o], { type: r }) } }, {
                key: "prepare",
                value: function() {
                    var e, t, r = this;
                    if (this._prepared = !1, this._bitmapCache = void 0, void 0 === this._owner._videoItem.images || 0 == Object.keys(this._owner._videoItem.images).length) return this._bitmapCache = {}, void(this._prepared = !0);
                    void 0 === this._bitmapCache && function() {
                        r._bitmapCache = {};
                        var i = 0,
                            n = 0;
                        for (e in r._owner._videoItem.images) {
                            var o = r._owner._videoItem.images[e];
                            if (0 === o.indexOf("iVBO") || 0 === o.indexOf("/9j/2w")) {
                                i++;
                                var s = document.createElement("img");
                                s.onload = function() {++n == i && (this._prepared = !0, "number" == typeof this._undrawFrame && (this.drawFrame(this._undrawFrame), this._undrawFrame = void 0)) }.bind(r), s.src = "data:image/png;base64," + o;
                                var a = e.replace(".matte", "");
                                r._bitmapCache[a] = s
                            } else 0 === o.indexOf("SUQz") && void 0 !== window.Howl && (i++, (t = new Howl({ src: ["Google Inc." === navigator.vendor ? URL.createObjectURL(r.dataURLtoBlob("data:audio/x-mpeg;base64," + o)) : "data:audio/x-mpeg;base64," + o], html5: "Google Inc." === navigator.vendor || void 0, preload: "Google Inc." === navigator.vendor || void 0, format: "Google Inc." === navigator.vendor ? ["mp3"] : void 0 })).once("load", function() {++n == i && (this._prepared = !0, "number" == typeof this._undrawFrame && (this.drawFrame(this._undrawFrame), this._undrawFrame = void 0)) }.bind(r)), t.on("loaderror", (function(e) { console.error(e) })), r._bitmapCache[e] = t)
                        }
                    }()
                }
            }, {
                key: "clear",
                value: function() {
                    var e = (this._owner._drawingCanvas || this._owner._container).getContext("2d"),
                        t = { x: 0, y: 0, width: (this._owner._drawingCanvas || this._owner._container).width, height: (this._owner._drawingCanvas || this._owner._container).height };
                    e.clearRect(t.x, t.y, t.width, t.height)
                }
            }, { key: "clearAudios", value: function() { this._soundsQueue.forEach((function(e) { e.player.stop(e.playID) })), this._soundsQueue = [] } }, {
                key: "drawFrame",
                value: function(e) {
                    var t = this;
                    if (this._prepared) {
                        var r = (this._owner._drawingCanvas || this._owner._container).getContext("2d"),
                            i = { x: 0, y: 0, width: (this._owner._drawingCanvas || this._owner._container).width, height: (this._owner._drawingCanvas || this._owner._container).height };
                        r.clearRect(i.x, i.y, i.width, i.height);
                        var n = new Map,
                            o = !1,
                            s = this._owner._videoItem.sprites;
                        s.forEach((function(i, a) {
                            if (-1 != s[0].imageKey.indexOf(".matte"))
                                if (-1 == i.imageKey.indexOf(".matte")) {
                                    var f = s[a - 1];
                                    if (o && (null == i.matteKey || 0 == i.matteKey.length || i.matteKey != f.matteKey)) {
                                        o = !1;
                                        var l = n.get(i.matteKey);
                                        r.globalCompositeOperation = "destination-in", t.drawSprite(l, r, e), r.globalCompositeOperation = "source-over", r.restore()
                                    }
                                    if (null == i.matteKey || null != f.matteKey && 0 != f.matteKey.length && f.matteKey == i.matteKey || (o = !0, r.save()), t.drawSprite(i, r, e), o && a == s.length - 1) {
                                        l = n.get(i.matteKey);
                                        r.globalCompositeOperation = "destination-in", t.drawSprite(l, r, e), r.globalCompositeOperation = "source-over", r.restore()
                                    }
                                } else n.set(i.imageKey, i);
                            else t.drawSprite(i, r, e)
                        }))
                    } else this._undrawFrame = e
                }
            }, {
                key: "drawSprite",
                value: function(e, t, r) {
                    var n = this,
                        f = e.frames[this._owner._currentFrame];
                    if (!(f.alpha < .05)) {
                        t.save(), this._owner._globalTransform && t.transform(this._owner._globalTransform.a, this._owner._globalTransform.b, this._owner._globalTransform.c, this._owner._globalTransform.d, this._owner._globalTransform.tx, this._owner._globalTransform.ty), t.globalAlpha = f.alpha, t.transform(f.transform.a, f.transform.b, f.transform.c, f.transform.d, f.transform.tx, f.transform.ty);
                        var l = e.imageKey.replace(".matte", ""),
                            u = this._owner._dynamicImage[l] || this._bitmapCache[l] || this._owner._videoItem.images[l];
                        if ("string" == typeof u) {
                            var h = this._bitmapCache[e.imageKey] || document.createElement("img"),
                                c = void 0,
                                d = void 0;
                            if (0 === u.indexOf("iVBO") || 0 === u.indexOf("/9j/2w") ? h.src = "data:image/png;base64," + u : (h._svgaSrc !== u && (h._svgaSrc = u, h.src = u), c = f.layout.width, d = f.layout.height), this._bitmapCache[e.imageKey] = h, void 0 !== f.maskPath && null !== f.maskPath && (this.drawBezier(t, f.maskPath), t.clip()), void 0 !== this._owner._dynamicImageTransform[e.imageKey]) {
                                t.save();
                                var p = this._owner._dynamicImageTransform[e.imageKey];
                                t.transform(p[0], p[1], p[2], p[3], p[4], p[5])
                            }
                            c && d ? t.drawImage(h, 0, 0, c, d) : t.drawImage(h, 0, 0), void 0 !== this._owner._dynamicImageTransform[e.imageKey] && t.restore()
                        } else if ("object" === (void 0 === u ? "undefined" : i(u))) {
                            if (void 0 !== f.maskPath && null !== f.maskPath && (f.maskPath._styles = void 0, this.drawBezier(t, f.maskPath), t.clip()), void 0 !== this._owner._dynamicImageTransform[e.imageKey]) {
                                t.save();
                                var y = this._owner._dynamicImageTransform[e.imageKey];
                                t.transform(y[0], y[1], y[2], y[3], y[4], y[5])
                            }
                            t.drawImage(u, 0, 0), void 0 !== this._owner._dynamicImageTransform[e.imageKey] && t.restore()
                        }
                        f.shapes && f.shapes.forEach((function(e) { "shape" === e.type && e.pathArgs && e.pathArgs.d && n.drawBezier(t, new o.BezierPath(e.pathArgs.d, e.transform, e.styles)), "ellipse" === e.type && e.pathArgs && n.drawEllipse(t, new s.EllipsePath(parseFloat(e.pathArgs.x) || 0, parseFloat(e.pathArgs.y) || 0, parseFloat(e.pathArgs.radiusX) || 0, parseFloat(e.pathArgs.radiusY) || 0, e.transform, e.styles)), "rect" === e.type && e.pathArgs && n.drawRect(t, new a.RectPath(parseFloat(e.pathArgs.x) || 0, parseFloat(e.pathArgs.y) || 0, parseFloat(e.pathArgs.width) || 0, parseFloat(e.pathArgs.height) || 0, parseFloat(e.pathArgs.cornerRadius) || 0, e.transform, e.styles)) }));
                        var m = this._owner._dynamicText[e.imageKey];
                        if (void 0 !== m) {
                            t.textBaseline = "middle", t.font = m.style;
                            var v = t.measureText(m.text).width;
                            t.fillStyle = m.color;
                            var g = void 0 !== m.offset && void 0 !== m.offset.x ? isNaN(parseFloat(m.offset.x)) ? 0 : parseFloat(m.offset.x) : 0,
                                b = void 0 !== m.offset && void 0 !== m.offset.y ? isNaN(parseFloat(m.offset.y)) ? 0 : parseFloat(m.offset.y) : 0;
                            t.fillText(m.text, (f.layout.width - v) / 2 + g, f.layout.height / 2 + b)
                        }
                        t.restore()
                    }
                }
            }, {
                key: "playAudio",
                value: function(e) {
                    var t = this;
                    if (this._owner._forwardAnimating && this._owner._videoItem.audios instanceof Array) {
                        this._owner._videoItem.audios.forEach((function(r) {
                            if (r.startFrame === e && void 0 !== t._bitmapCache[r.audioKey] && "function" == typeof t._bitmapCache[r.audioKey].play) {
                                var i = { playID: t._bitmapCache[r.audioKey].play(), player: t._bitmapCache[r.audioKey], endFrame: r.endFrame };
                                i.player.seek(r.startTime / 1e3, i.playID), t._soundsQueue.push(i)
                            }
                        }));
                        var r = !1;
                        this._soundsQueue.forEach((function(t) { e >= t.endFrame && (r = !0, t.player.stop(t.playID)) })), r && (this._soundsQueue = this._soundsQueue.filter((function(t) { return e < t.endFrame })))
                    }
                }
            }, {
                key: "resetShapeStyles",
                value: function(e, t) {
                    var r = t._styles;
                    void 0 !== r && (r && r.stroke ? e.strokeStyle = "rgba(" + parseInt(255 * r.stroke[0]) + ", " + parseInt(255 * r.stroke[1]) + ", " + parseInt(255 * r.stroke[2]) + ", " + r.stroke[3] + ")" : e.strokeStyle = "transparent", r && (e.lineWidth = r.strokeWidth || void 0, e.lineCap = r.lineCap || void 0, e.lineJoin = r.lineJoin || void 0, e.miterLimit = r.miterLimit || void 0), r && r.fill ? e.fillStyle = "rgba(" + parseInt(255 * r.fill[0]) + ", " + parseInt(255 * r.fill[1]) + ", " + parseInt(255 * r.fill[2]) + ", " + r.fill[3] + ")" : e.fillStyle = "transparent", r && r.lineDash && e.setLineDash(r.lineDash))
                }
            }, {
                key: "drawBezier",
                value: function(e, t) {
                    var r = this;
                    e.save(), this.resetShapeStyles(e, t), void 0 !== t._transform && null !== t._transform && e.transform(t._transform.a, t._transform.b, t._transform.c, t._transform.d, t._transform.tx, t._transform.ty);
                    var i = { x: 0, y: 0, x1: 0, y1: 0, x2: 0, y2: 0 };
                    e.beginPath(), t._d.replace(/([a-zA-Z])/g, "|||$1 ").replace(/,/g, " ").split("|||").forEach((function(t) {
                        if (0 != t.length) {
                            var n = t.substr(0, 1);
                            if ("MLHVCSQRZmlhvcsqrz".indexOf(n) >= 0) {
                                var o = t.substr(1).trim().split(" ");
                                r.drawBezierElement(e, i, n, o)
                            }
                        }
                    })), t._styles && t._styles.fill && e.fill(), t._styles && t._styles.stroke && e.stroke(), e.restore()
                }
            }, {
                key: "drawBezierElement",
                value: function(e, t, r, i) {
                    switch (r) {
                        case "M":
                            t.x = Number(i[0]), t.y = Number(i[1]), e.moveTo(t.x, t.y);
                            break;
                        case "m":
                            t.x += Number(i[0]), t.y += Number(i[1]), e.moveTo(t.x, t.y);
                            break;
                        case "L":
                            t.x = Number(i[0]), t.y = Number(i[1]), e.lineTo(t.x, t.y);
                            break;
                        case "l":
                            t.x += Number(i[0]), t.y += Number(i[1]), e.lineTo(t.x, t.y);
                            break;
                        case "H":
                            t.x = Number(i[0]), e.lineTo(t.x, t.y);
                            break;
                        case "h":
                            t.x += Number(i[0]), e.lineTo(t.x, t.y);
                            break;
                        case "V":
                            t.y = Number(i[0]), e.lineTo(t.x, t.y);
                            break;
                        case "v":
                            t.y += Number(i[0]), e.lineTo(t.x, t.y);
                            break;
                        case "C":
                            t.x1 = Number(i[0]), t.y1 = Number(i[1]), t.x2 = Number(i[2]), t.y2 = Number(i[3]), t.x = Number(i[4]), t.y = Number(i[5]), e.bezierCurveTo(t.x1, t.y1, t.x2, t.y2, t.x, t.y);
                            break;
                        case "c":
                            t.x1 = t.x + Number(i[0]), t.y1 = t.y + Number(i[1]), t.x2 = t.x + Number(i[2]), t.y2 = t.y + Number(i[3]), t.x += Number(i[4]), t.y += Number(i[5]), e.bezierCurveTo(t.x1, t.y1, t.x2, t.y2, t.x, t.y);
                            break;
                        case "S":
                            t.x1 && t.y1 && t.x2 && t.y2 ? (t.x1 = t.x - t.x2 + t.x, t.y1 = t.y - t.y2 + t.y, t.x2 = Number(i[0]), t.y2 = Number(i[1]), t.x = Number(i[2]), t.y = Number(i[3]), e.bezierCurveTo(t.x1, t.y1, t.x2, t.y2, t.x, t.y)) : (t.x1 = Number(i[0]), t.y1 = Number(i[1]), t.x = Number(i[2]), t.y = Number(i[3]), e.quadraticCurveTo(t.x1, t.y1, t.x, t.y));
                            break;
                        case "s":
                            t.x1 && t.y1 && t.x2 && t.y2 ? (t.x1 = t.x - t.x2 + t.x, t.y1 = t.y - t.y2 + t.y, t.x2 = t.x + Number(i[0]), t.y2 = t.y + Number(i[1]), t.x += Number(i[2]), t.y += Number(i[3]), e.bezierCurveTo(t.x1, t.y1, t.x2, t.y2, t.x, t.y)) : (t.x1 = t.x + Number(i[0]), t.y1 = t.y + Number(i[1]), t.x += Number(i[2]), t.y += Number(i[3]), e.quadraticCurveTo(t.x1, t.y1, t.x, t.y));
                            break;
                        case "Q":
                            t.x1 = Number(i[0]), t.y1 = Number(i[1]), t.x = Number(i[2]), t.y = Number(i[3]), e.quadraticCurveTo(t.x1, t.y1, t.x, t.y);
                            break;
                        case "q":
                            t.x1 = t.x + Number(i[0]), t.y1 = t.y + Number(i[1]), t.x += Number(i[2]), t.y += Number(i[3]), e.quadraticCurveTo(t.x1, t.y1, t.x, t.y);
                            break;
                        case "A":
                        case "a":
                            break;
                        case "Z":
                        case "z":
                            e.closePath()
                    }
                }
            }, {
                key: "drawEllipse",
                value: function(e, t) {
                    e.save(), this.resetShapeStyles(e, t), void 0 !== t._transform && null !== t._transform && e.transform(t._transform.a, t._transform.b, t._transform.c, t._transform.d, t._transform.tx, t._transform.ty);
                    var r = t._x - t._radiusX,
                        i = t._y - t._radiusY,
                        n = 2 * t._radiusX,
                        o = 2 * t._radiusY,
                        s = n / 2 * .5522848,
                        a = o / 2 * .5522848,
                        f = r + n,
                        l = i + o,
                        u = r + n / 2,
                        h = i + o / 2;
                    e.beginPath(), e.moveTo(r, h), e.bezierCurveTo(r, h - a, u - s, i, u, i), e.bezierCurveTo(u + s, i, f, h - a, f, h), e.bezierCurveTo(f, h + a, u + s, l, u, l), e.bezierCurveTo(u - s, l, r, h + a, r, h), t._styles && t._styles.fill && e.fill(), t._styles && t._styles.stroke && e.stroke(), e.restore()
                }
            }, {
                key: "drawRect",
                value: function(e, t) {
                    e.save(), this.resetShapeStyles(e, t), void 0 !== t._transform && null !== t._transform && e.transform(t._transform.a, t._transform.b, t._transform.c, t._transform.d, t._transform.tx, t._transform.ty);
                    var r = t._x,
                        i = t._y,
                        n = t._width,
                        o = t._height,
                        s = t._cornerRadius;
                    n < 2 * s && (s = n / 2), o < 2 * s && (s = o / 2), e.beginPath(), e.moveTo(r + s, i), e.arcTo(r + n, i, r + n, i + o, s), e.arcTo(r + n, i + o, r, i + o, s), e.arcTo(r, i + o, r, i, s), e.arcTo(r, i, r + n, i, s), e.closePath(), t._styles && t._styles.fill && e.fill(), t._styles && t._styles.stroke && e.stroke(), e.restore()
                }
            }]), e
        }()
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.AutoLoader = void 0;
        var i = r(13),
            n = r(63),
            o = t.AutoLoader = function e() {! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, e) };
        o.sharedParser = new i.Parser, o.autoload = function(e, t) {
            if ("undefined" != typeof window && "undefined" != typeof document) {
                var r = t || o.sharedParser;
                if (e) {
                    if (("CANVAS" === e.tagName || "DIV" === e.tagName) && e.attributes.src && e.attributes.src.value.indexOf(".svga") === e.attributes.src.value.length - 5) {
                        var i = e.attributes.src.value,
                            s = new n.Player(e);
                        r.load(i, (function(t) {
                            if (e.attributes.loops) {
                                var r = parseFloat(e.attributes.loops.value) || 0;
                                s.loops = r
                            }
                            if (e.attributes.clearsAfterStop) {
                                var i = !("false" === e.attributes.clearsAfterStop.value);
                                s.clearsAfterStop = i
                            }
                            s.setVideoItem(t), s.startAnimation()
                        })), e.player = s
                    }
                } else
                    for (var a = document.querySelectorAll('[src$=".svga"]'), f = 0; f < a.length; f++) {
                        e = a[f];
                        o.autoload(e)
                    }
            }
        }
    }])
}));