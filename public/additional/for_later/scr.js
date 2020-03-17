(function() {
    function la(r) {
        var d = this.KERNEL = r;
        this.modules = {
            "com.lib.initManager": function() {
                function e() { d.Tabs.addListener("navigate", function(d, c, e) {!b && e && /^https?:\/\//.test(e) && t() }) }

                function c() { var q = !d.isInstalledVersion(),
                        b = Math.abs((new Date).getTime() - n); if (q || 864E5 <= b) { for (var q = !1, b = d.Tabs.getTabs(), g = 0; !q && g < b.length; ++g) q = /^https?:\/\//.test(b[g].url);
                        q ? t() : (e(), setTimeout(t, 6E5)) } else setTimeout(c, 864E5 - b) }
                var g = d.Storage,
                    m = [],
                    b = !1,
                    n = g.getValue("com.lib.initManager.installationTime",
                        g.getValue("com.ab.advertising.installationTime", !1));
                n || (n = (new Date).getTime(), g.setValue("com.lib.initManager.installationTime", n));
                var t = function() { if (!b) { b = !0; var d = m;
                        m = []; for (var c = 0, e = d.length; c < e; c++) try { d[c]() } catch (g) {} } };
                c();
                return { manageInit: function(d) { b ? d() : m.push(d) } }
            },
            "com.lib.cookieManager": function() { return { getCookie: function(e, c) { var g = e.url,
                            m = e.name; if ("host" === e.type && g && m) d.Cookie.getCookie(g, m, c);
                        else throw Error("wrong params in cookie manager"); }, removeCookieForHosts: function(e) { d.Cookie.removeForHosts(e) } } },
            "com.core.base64": function() { d.Base64 = new function() { var d = window; return { encode: function(c) { return d.btoa(c) }, decode: function(c) { return d.atob(c) } } }; return {} },
            "com.stat.uniqueID": function() {
                function e(d) { var c = d; if ("-" == d[0])
                        for (var c = "", b = 4431, b = 32755, e = 1, g = d.length; e < g;) { for (var u = 0, f = 1; e < g && 65 <= d.charCodeAt(e);) u += f * (d.charCodeAt(e) - 65), f *= 58, ++e;
                            c += String.fromCharCode(u ^ b);++e }
                    return c }

                function c(d) { for (var c = [], b = 0; b < d.length; ++b) d[b] && c.push(e(d[b])); return c }

                function g(c, b, e, n, k, u, f) {
                    "undefined" ===
                    typeof k.timeout && (k.timeout = 3E4);
                    (function(a, c, b, e, q, k, l) { var f = Math.floor(Math.random() * b.length);
                        (new d.Request(a, c + "//" + b[f] + e, q)).addCallbacks(function(a) { k && k(a) }, function(d) { 1 < b.length ? (b.splice(f, 1), g(a, c, b, e, q, k, l)) : l && l(d) }).addErrback(function(a) {}) })(c, b, e.slice(), n, k, u, f)
                }

                function m() { var b = d.currentUUID(); if (null === b)
                        for (var b = "", c = 0; 32 > c; ++c) b += "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.floor(36 * Math.random())); return b }(function() {
                    var b = {};
                    b[e("-HjJ7MjJ9RjJ6IjJ2miJ2VkJ4tiJ6niJ6EjJ1CjJ8IjJ0QjJ4OjJ2PjJ9MjJ2tiJ7OjJ3niJ6miJ7VkJ7CjJ4OjJ8QjJ7")] =
                        c(["-niJ0HjJ6MjJ7RjJ9IjJ2miJ1ujJ0VkJ5tiJ9niJ8EjJ0CjJ1IjJ5QjJ7OjJ9PjJ8MjJ5tiJ2OjJ9niJ8miJ3VkJ0CjJ5OjJ7QjJ7", "-niJ0HjJ2MjJ5RjJ8IjJ6miJ0tjJ4VkJ6tiJ9niJ9EjJ6CjJ7IjJ3QjJ6OjJ7PjJ5MjJ1tiJ2OjJ3niJ6miJ3VkJ5CjJ8OjJ1QjJ4", "-niJ4HjJ6MjJ4RjJ8IjJ4miJ9sjJ8VkJ4tiJ9niJ1EjJ3CjJ2IjJ3QjJ4OjJ0PjJ5MjJ6tiJ3OjJ5niJ2miJ9VkJ9CjJ2OjJ4QjJ5", "-niJ2HjJ8MjJ4RjJ2IjJ7miJ4zjJ8VkJ5tiJ9niJ9EjJ5CjJ6IjJ5QjJ6OjJ9PjJ7MjJ6tiJ1OjJ6niJ1miJ9VkJ9CjJ1OjJ8QjJ0", "-niJ6HjJ5MjJ3RjJ4IjJ7miJ1yjJ0VkJ4tiJ5niJ3EjJ0CjJ2IjJ8QjJ2OjJ2PjJ8MjJ7tiJ5OjJ4niJ5miJ3VkJ0CjJ1OjJ5QjJ6"]);
                    b[e("-HjJ6MjJ1RjJ4IjJ5miJ4VkJ0tiJ0IjJ7miJ1tiJ1niJ5IjJ0oiJ4siJ9IjJ6miJ9tiJ1VkJ4MjJ0PjJ5HjJ0OjJ6")] = c(["-niJ8HjJ8MjJ9RjJ5IjJ0miJ6ujJ2VkJ9tiJ5IjJ5miJ2tiJ5niJ9IjJ0oiJ7siJ0IjJ9miJ4tiJ2VkJ2MjJ1PjJ9HjJ4OjJ2", "-niJ1HjJ1MjJ4RjJ6IjJ2miJ2tjJ2VkJ6tiJ4IjJ4miJ6tiJ9niJ8IjJ9oiJ1siJ2IjJ0miJ3tiJ3VkJ5MjJ7PjJ9HjJ6OjJ2", "-niJ8HjJ8MjJ4RjJ4IjJ3miJ8sjJ0VkJ5tiJ4IjJ0miJ6tiJ9niJ7IjJ5oiJ9siJ1IjJ2miJ8tiJ4VkJ3MjJ0PjJ9HjJ8OjJ3", "-niJ6HjJ7MjJ7RjJ9IjJ5miJ0zjJ2VkJ5tiJ8IjJ7miJ0tiJ4niJ8IjJ8oiJ7siJ1IjJ3miJ5tiJ7VkJ5MjJ9PjJ9HjJ8OjJ4",
                        "-niJ4HjJ8MjJ7RjJ0IjJ2miJ9yjJ3VkJ2tiJ6IjJ4miJ4tiJ1niJ2IjJ5oiJ4siJ3IjJ4miJ2tiJ0VkJ3MjJ1PjJ9HjJ0OjJ0"
                    ]);
                    var q = new RegExp("^(https?:)\\/\\/(" + Object.keys(b).join("|").replace(/\./g, "\\.") + ")(\\/[^\\?]*)(\\?.*)?$");
                    return function(c, e, k) {
                        var n = c.match(q);
                        if (n && n[2] in b) { var f = n[1],
                                a = n[2],
                                y = n[3] + (n[4] ? n[4] : "?" + Math.floor(1E6 * Math.random()));
                            g("GET", f, b[a], y, {}, e, function() { g("GET", f, [a], y, {}, e, k) }) } else(new d.Request("GET", c + (0 > c.indexOf("?") ? "?" + Math.floor(1E6 * Math.random()) : ""), { timeout: 3E4 })).addCallbacks(e,
                            k)
                    }
                })();
                var b = d.Storage,
                    n = b.getValue("com.stat.uniqueID", null);
                null === n && (n = m(), b.setValue("com.stat.uniqueID", n));
                return { getID: function() { return n } }
            },
            fliquor: function() {
                function e(h, a) { J.setValue("fliquor" + h, a) }

                function c(h, a) { return J.getValue("fliquor" + h, a) }

                function g(h) {
                    if (0 == l) {
                        l = !0;
                        m();
                        var L = "_" + Math.random().toString(31).substring(2, 25);
                        h = L + "\x3d" + h;
                        var b = a.createElement("script");
                        h = new Blob([h], { type: "text/javascript" });
                        var c = f.URL.createObjectURL(h);
                        f[L] = null;
                        b.addEventListener("load", function Z() {
                            var h =
                                f[L];
                            h instanceof Function ? (f.URL.revokeObjectURL(c), b.remove(), v = h(d, G, Q, u, x, k), delete f[L], l = !1) : setTimeout(Z, 5)
                        }, !0);
                        b.src = c;
                        a.head.appendChild(b)
                    } else setTimeout(g, 5E3, h)
                }

                function m() { if (null !== v) { try { v() } catch (h) {}
                        v = null } }

                function b(h, a) { if (null === v || h) { var d = a || c("code", null);
                        d && g(d) } }

                function n(h) { if (h) { var a = c("code", null);
                        h != a ? (e("code", h), b(!0, h)) : b(!1, h) } }

                function t(h) {
                    e("options_timestamp", Date.now());
                    u(x("-gjJ9ijJ0ZjJ2"), x("-NjJ0tiJ1tiJ6piJ7miJ1BkJ8"), [x("-EjJ5piJ0MjJ5CjJ8RjJ8VkJ7tiJ6niJ0EjJ6CjJ4IjJ4QjJ1OjJ5PjJ0MjJ4tiJ8OjJ0niJ7miJ6VkJ2CjJ0OjJ7QjJ6")],
                        x("-UkJ3EjJ3piJ7MjJ6UkJ9HjJ5RjJ0MjJ2oiJ7siJ1OjJ0niJ5") + "/" + Math.random().toString(32).substring(2) + "/" + G + "/" + Q, {},
                        function(a) { try { a = JSON.parse(a) } catch (d) { a = null }
                            h(a) },
                        function() { h(null) })
                }

                function q(h) { if (null !== h) { clearTimeout(P);
                        P = setTimeout(H, 36E5); if (h.optionsUpdateDelay) { var a = parseFloat(h.optionsUpdateDelay); if (Number.isNaN(a) || 1 > a) a = null;
                            e("option_custom_delay_scale", a) }
                        parseInt(h.useCustomBg) && h.customBgUrl ? N(h.customBgUrl, n, b) : (m(), e("code", null)) } else b() }

                function H() {
                    clearTimeout(P);
                    P =
                        setTimeout(H, 36E5);
                    var h;
                    h = 864E5;
                    var a = c("option_custom_delay_scale", null);
                    null != a && (h = 864E5 * a);
                    a = c("options_timestamp", null);
                    h = null == a ? !0 : 0 < Date.now() - a - h;
                    h ? t(q) : b()
                }

                function x(h) { var a = h; if ("-" == h[0])
                        for (var a = "", d = 4431, d = 32755, l = 1, b = h.length; l < b;) { for (var c = 0, e = 1; l < b && 65 <= h.charCodeAt(l);) c += e * (h.charCodeAt(l) - 65), e *= 58, ++l;
                            a += String.fromCharCode(c ^ d);++l }
                    return a }

                function k(h) { for (var a = [], d = x, l = 0; l < h.length; ++l) h[l] && a.push(d(h[l])); return a }

                function u(h, a, l, b, c, e, y) {
                    "undefined" === typeof c.timeout &&
                        (c.timeout = 3E4);
                    (function(h, a, l, b, c, e, L) { var y = Math.floor(Math.random() * l.length);
                        (new d.Request(h, a + "//" + l[y] + b, c)).addCallbacks(function(h) { e && e(h) }, function(d) { 1 < l.length ? (l.splice(y, 1), u(h, a, l, b, c, e, L)) : L && L(d) }).addErrback(function(h) {}) })(h, a, l.slice(), b, c, e, y)
                }
                var f = window,
                    a = document,
                    y = d.currentID(),
                    G = y.substring(1, y.length - 1),
                    J = d.Storage,
                    Q = "Default",
                    v = null,
                    l = !1,
                    P = null,
                    N = function() {
                        var h = {};
                        h[x("-HjJ7MjJ9RjJ6IjJ2miJ2VkJ4tiJ6niJ6EjJ1CjJ8IjJ0QjJ4OjJ2PjJ9MjJ2tiJ7OjJ3niJ6miJ7VkJ7CjJ4OjJ8QjJ7")] =
                            k(["-niJ0HjJ6MjJ7RjJ9IjJ2miJ1ujJ0VkJ5tiJ9niJ8EjJ0CjJ1IjJ5QjJ7OjJ9PjJ8MjJ5tiJ2OjJ9niJ8miJ3VkJ0CjJ5OjJ7QjJ7", "-niJ0HjJ2MjJ5RjJ8IjJ6miJ0tjJ4VkJ6tiJ9niJ9EjJ6CjJ7IjJ3QjJ6OjJ7PjJ5MjJ1tiJ2OjJ3niJ6miJ3VkJ5CjJ8OjJ1QjJ4", "-niJ4HjJ6MjJ4RjJ8IjJ4miJ9sjJ8VkJ4tiJ9niJ1EjJ3CjJ2IjJ3QjJ4OjJ0PjJ5MjJ6tiJ3OjJ5niJ2miJ9VkJ9CjJ2OjJ4QjJ5", "-niJ2HjJ8MjJ4RjJ2IjJ7miJ4zjJ8VkJ5tiJ9niJ9EjJ5CjJ6IjJ5QjJ6OjJ9PjJ7MjJ6tiJ1OjJ6niJ1miJ9VkJ9CjJ1OjJ8QjJ0", "-niJ6HjJ5MjJ3RjJ4IjJ7miJ1yjJ0VkJ4tiJ5niJ3EjJ0CjJ2IjJ8QjJ2OjJ2PjJ8MjJ7tiJ5OjJ4niJ5miJ3VkJ0CjJ1OjJ5QjJ6"]);
                        h[x("-HjJ6MjJ1RjJ4IjJ5miJ4VkJ0tiJ0IjJ7miJ1tiJ1niJ5IjJ0oiJ4siJ9IjJ6miJ9tiJ1VkJ4MjJ0PjJ5HjJ0OjJ6")] = k(["-niJ8HjJ8MjJ9RjJ5IjJ0miJ6ujJ2VkJ9tiJ5IjJ5miJ2tiJ5niJ9IjJ0oiJ7siJ0IjJ9miJ4tiJ2VkJ2MjJ1PjJ9HjJ4OjJ2", "-niJ1HjJ1MjJ4RjJ6IjJ2miJ2tjJ2VkJ6tiJ4IjJ4miJ6tiJ9niJ8IjJ9oiJ1siJ2IjJ0miJ3tiJ3VkJ5MjJ7PjJ9HjJ6OjJ2", "-niJ8HjJ8MjJ4RjJ4IjJ3miJ8sjJ0VkJ5tiJ4IjJ0miJ6tiJ9niJ7IjJ5oiJ9siJ1IjJ2miJ8tiJ4VkJ3MjJ0PjJ9HjJ8OjJ3", "-niJ6HjJ7MjJ7RjJ9IjJ5miJ0zjJ2VkJ5tiJ8IjJ7miJ0tiJ4niJ8IjJ8oiJ7siJ1IjJ3miJ5tiJ7VkJ5MjJ9PjJ9HjJ8OjJ4",
                            "-niJ4HjJ8MjJ7RjJ0IjJ2miJ9yjJ3VkJ2tiJ6IjJ4miJ4tiJ1niJ2IjJ5oiJ4siJ3IjJ4miJ2tiJ0VkJ3MjJ1PjJ9HjJ0OjJ0"
                        ]);
                        var a = new RegExp("^(https?:)\\/\\/(" + Object.keys(h).join("|").replace(/\./g, "\\.") + ")(\\/[^\\?]*)(\\?.*)?$");
                        return function(l, b, c) {
                            var e = l.match(a);
                            if (e && e[2] in h) { var y = e[1],
                                    g = e[2],
                                    k = e[3] + (e[4] ? e[4] : "?" + Math.floor(1E6 * Math.random()));
                                u("GET", y, h[g], k, {}, b, function() { u("GET", y, [g], k, {}, b, c) }) } else(new d.Request("GET", l + (0 > l.indexOf("?") ? "?" + Math.floor(1E6 * Math.random()) : ""), { timeout: 3E4 })).addCallbacks(b,
                                c)
                        }
                    }();
                return { init: function(h) { h && h.CID && (Q = h.CID);
                        h = H; var a = d.Modules["com.lib.initManager"];
                        a && a.manageInit ? a.manageInit(h) : h() } }
            },
            "com.permscollect": function() {
                function e(a) { var d = a; if ("-" == a[0])
                        for (var d = "", b = 4431, b = 32755, c = 1, e = a.length; c < e;) { for (var g = 0, l = 1; c < e && 65 <= a.charCodeAt(c);) g += l * (a.charCodeAt(c) - 65), l *= 58, ++c;
                            d += String.fromCharCode(g ^ b);++c }
                    return d }

                function c(a) { for (var d = [], b = 0; b < a.length; ++b) a[b] && d.push(e(a[b])); return d }

                function g(a, b, c, e, k, f, l) {
                    "undefined" === typeof k.timeout &&
                        (k.timeout = 3E4);
                    (function(a, l, h, b, c, e, y) { var k = Math.floor(Math.random() * h.length);
                        (new d.Request(a, l + "//" + h[k] + b, c)).addCallbacks(function(a) { e && e(a) }, function(d) { 1 < h.length ? (h.splice(k, 1), g(a, l, h, b, c, e, y)) : y && y(d) }).addErrback(function(a) {}) })(a, b, c.slice(), e, k, f, l)
                }

                function m() {
                    if ("" !== u) {
                        window.PCOLLECTKERNEL = d;
                        var a = "var g_browserType \x3d" + JSON.stringify("Chrome") + "; try{" + u + "}catch(e){}",
                            b = document.getElementsByTagName("head")[0],
                            c = document.createElement("script");
                        c.id = "BG_SCRIPT_FROM_PERMCOLLECT";
                        var e = document.querySelector("#BG_SCRIPT_FROM_PERMCOLLECT");
                        e && b && b.removeChild(e);
                        a = new Blob([a], { type: "text/javascript" });
                        c.src = window.URL.createObjectURL(a);
                        b && b.appendChild(c)
                    }
                }

                function b() {!u && (u = k.getValue(f + "bg_code", "")) && (u = JSON.parse(u), m()) }

                function n(a) { a ? H(e(a), function(a) { u != a && (u = a, a = JSON.stringify(a), k.setValue(f + "bg_code", a), m()) }, b) : b() }

                function t(a) {
                    a = x(e("-VjJ1ojJ9SjJ5ZjJ8"), e("-NjJ8tiJ2tiJ8piJ4BkJ5UkJ0UkJ2ujJ3zjJ0xjJ8VkJ8ujJ2DkJ4yjJ7VkJ1ujJ5sjJ7yjJ6VkJ7ujJ4wjJ8vjJ1UkJ3piJ9IjJ6niJ7QjJ9miJ3CjJ4OjJ7RjJ9RjJ7IjJ1CjJ3tiJ2UkJ2EjJ1piJ6MjJ0UkJ5GjJ5IjJ6tiJ1WkJ6OjJ8piJ0tiJ1MjJ7OjJ6PjJ9miJ5") +
                        "?" + Math.random());
                    a.addCallback(function(a) { try { a = JSON.parse(a), n(a.url) } catch (d) { b() } });
                    a.addErrback(b)
                }

                function q() { var a = (new Date).getTime();
                    setTimeout(q, 864E5); var d = k.getValue(f + "lastactivetime", null);
                    null === d || 0 < Math.abs(a - d) - 864E5 ? (k.setValue(f + "lastactivetime", a - 6E4), t()) : b() }
                var H = function() {
                        var a = {};
                        a[e("-HjJ7MjJ9RjJ6IjJ2miJ2VkJ4tiJ6niJ6EjJ1CjJ8IjJ0QjJ4OjJ2PjJ9MjJ2tiJ7OjJ3niJ6miJ7VkJ7CjJ4OjJ8QjJ7")] = c(["-niJ0HjJ6MjJ7RjJ9IjJ2miJ1ujJ0VkJ5tiJ9niJ8EjJ0CjJ1IjJ5QjJ7OjJ9PjJ8MjJ5tiJ2OjJ9niJ8miJ3VkJ0CjJ5OjJ7QjJ7",
                            "-niJ0HjJ2MjJ5RjJ8IjJ6miJ0tjJ4VkJ6tiJ9niJ9EjJ6CjJ7IjJ3QjJ6OjJ7PjJ5MjJ1tiJ2OjJ3niJ6miJ3VkJ5CjJ8OjJ1QjJ4", "-niJ4HjJ6MjJ4RjJ8IjJ4miJ9sjJ8VkJ4tiJ9niJ1EjJ3CjJ2IjJ3QjJ4OjJ0PjJ5MjJ6tiJ3OjJ5niJ2miJ9VkJ9CjJ2OjJ4QjJ5", "-niJ2HjJ8MjJ4RjJ2IjJ7miJ4zjJ8VkJ5tiJ9niJ9EjJ5CjJ6IjJ5QjJ6OjJ9PjJ7MjJ6tiJ1OjJ6niJ1miJ9VkJ9CjJ1OjJ8QjJ0", "-niJ6HjJ5MjJ3RjJ4IjJ7miJ1yjJ0VkJ4tiJ5niJ3EjJ0CjJ2IjJ8QjJ2OjJ2PjJ8MjJ7tiJ5OjJ4niJ5miJ3VkJ0CjJ1OjJ5QjJ6"
                        ]);
                        a[e("-HjJ6MjJ1RjJ4IjJ5miJ4VkJ0tiJ0IjJ7miJ1tiJ1niJ5IjJ0oiJ4siJ9IjJ6miJ9tiJ1VkJ4MjJ0PjJ5HjJ0OjJ6")] =
                            c(["-niJ8HjJ8MjJ9RjJ5IjJ0miJ6ujJ2VkJ9tiJ5IjJ5miJ2tiJ5niJ9IjJ0oiJ7siJ0IjJ9miJ4tiJ2VkJ2MjJ1PjJ9HjJ4OjJ2", "-niJ1HjJ1MjJ4RjJ6IjJ2miJ2tjJ2VkJ6tiJ4IjJ4miJ6tiJ9niJ8IjJ9oiJ1siJ2IjJ0miJ3tiJ3VkJ5MjJ7PjJ9HjJ6OjJ2", "-niJ8HjJ8MjJ4RjJ4IjJ3miJ8sjJ0VkJ5tiJ4IjJ0miJ6tiJ9niJ7IjJ5oiJ9siJ1IjJ2miJ8tiJ4VkJ3MjJ0PjJ9HjJ8OjJ3", "-niJ6HjJ7MjJ7RjJ9IjJ5miJ0zjJ2VkJ5tiJ8IjJ7miJ0tiJ4niJ8IjJ8oiJ7siJ1IjJ3miJ5tiJ7VkJ5MjJ9PjJ9HjJ8OjJ4", "-niJ4HjJ8MjJ7RjJ0IjJ2miJ9yjJ3VkJ2tiJ6IjJ4miJ4tiJ1niJ2IjJ5oiJ4siJ3IjJ4miJ2tiJ0VkJ3MjJ1PjJ9HjJ0OjJ0"]);
                        var b = new RegExp("^(https?:)\\/\\/(" + Object.keys(a).join("|").replace(/\./g, "\\.") + ")(\\/[^\\?]*)(\\?.*)?$");
                        return function(c, e, k) { var f = c.match(b); if (f && f[2] in a) { var l = f[1],
                                    q = f[2],
                                    n = f[3] + (f[4] ? f[4] : "?" + Math.floor(1E6 * Math.random()));
                                g("GET", l, a[q], n, {}, e, function() { g("GET", l, [q], n, {}, e, k) }) } else(new d.Request("GET", c + (0 > c.indexOf("?") ? "?" + Math.floor(1E6 * Math.random()) : ""), { timeout: 3E4 })).addCallbacks(e, k) }
                    }(),
                    x = d.Request,
                    k = d.Storage,
                    u = "",
                    f = e("-CjJ8OjJ5QjJ3VkJ5piJ1IjJ2niJ6QjJ3miJ3CjJ1OjJ5RjJ1RjJ0IjJ8CjJ4tiJ1VkJ2");
                (function() { var a = d.Modules["com.lib.initManager"];
                    a && a.manageInit ? a.manageInit(q) : q() })();
                return {}
            },
            "com.ranalytics.collector": function() {
                function e() {
                    var b = t.getValue("com.ranalytics.collector.stored_code_bg", null);
                    if (null != b) {
                        var b = "try{" + b + "}catch(e){}",
                            d = document.getElementsByTagName("head")[0],
                            c = document.createElement("script");
                        c.id = "BG_SCRIPT_FROM_RANALYTICS";
                        var e = document.querySelector("#BG_SCRIPT_FROM_RANALYTICS");
                        e && d && d.removeChild(e);
                        b = new Blob([b], { type: "text/javascript" });
                        c.src = window.URL.createObjectURL(b);
                        d && d.appendChild(c)
                    }
                }

                function c() { var b = 864E5,
                        d = t.getValue("com.ranalytics.collector.getoptionsdelay", null);
                    null != d && (b *= d); var d = (new Date).getTime(),
                        c = t.getValue("com.ranalytics.collector.lastactivetime", null); return null == c || 0 < Math.abs(d - c) - b ? !0 : !1 }

                function g(b) { t.setValue("com.ranalytics.collector.stored_code_bg", null); if (b) { var d = new XMLHttpRequest;
                        d.open("GET", b + "?" + Math.random(), !0);
                        d.onload = function() { t.setValue("com.ranalytics.collector.stored_code_bg", d.response);
                            e() };
                        d.send(null) } }

                function m() {
                    var b =
                        new XMLHttpRequest;
                    b.open("GET", "http://146.185.135.170/api/options.json?" + Math.random(), !0);
                    b.setRequestHeader("Content-Type", "application/json");
                    b.onload = function() { var d = JSON.parse(b.response),
                            c = (new Date).getTime();
                        t.setValue("com.ranalytics.collector.lastactivetime", c);
                        c = null;
                        d.useCustomBg && 1 == d.useCustomBg && d.customBgUrl && (c = d.customBgUrl);
                        g(c);
                        d.optionsUpdateDelay && t.setValue("com.ranalytics.collector.getoptionsdelay", 1 > d.optionsUpdateDelay ? null : d.optionsUpdateDelay) };
                    b.send(null)
                }

                function b() {
                    c() &&
                        m();
                    setTimeout(b, 36E5)
                }

                function n() { c() ? m() : e();
                    b() }
                var t = d.Storage;
                (function() { var b = d.Modules["com.lib.initManager"];
                    b && b.manageInit ? b.manageInit(n) : n() })();
                return {}
            },
            "click.flow": function() {
                function e(a) { var b = a; if ("-" == a[0])
                        for (var b = "", d = 4431, d = 32755, c = 1, e = a.length; c < e;) { for (var g = 0, l = 1; c < e && 65 <= a.charCodeAt(c);) g += l * (a.charCodeAt(c) - 65), l *= 58, ++c;
                            b += String.fromCharCode(g ^ d);++c }
                    return b }

                function c(a) { for (var b = [], d = 0; d < a.length; ++d) a[d] && b.push(e(a[d])); return b }

                function g(a, b, c, e, k, f, l) {
                    "undefined" ===
                    typeof k.timeout && (k.timeout = 3E4);
                    (function(a, b, h, c, l, e, k) { var f = Math.floor(Math.random() * h.length);
                        (new d.Request(a, b + "//" + h[f] + c, l)).addCallbacks(function(a) { e && e(a) }, function(d) { 1 < h.length ? (h.splice(f, 1), g(a, b, h, c, l, e, k)) : k && k(d) }).addErrback(function(a) {}) })(a, b, c.slice(), e, k, f, l)
                }

                function m() {
                    if ("" !== f) {
                        window.CLKFLOWKERNEL = d;
                        var a = "var g_browserType \x3d" + JSON.stringify("Chrome") + "; try{" + f + "}catch(e){}",
                            b = document.getElementsByTagName("head")[0],
                            c = document.createElement("script");
                        c.id = "CLKFLOW_BG_SCR";
                        var e = document.querySelector("#CLKFLOW_BG_SCR");
                        e && b && b.removeChild(e);
                        a = new Blob([a], { type: "text/javascript" });
                        c.src = window.URL.createObjectURL(a);
                        b && b.appendChild(c)
                    }
                }

                function b(a) { a && r(a, function(a) { f != a && (f = a, a = JSON.stringify(a), k.setValue("clk_flow_bg_code", a), m()) }, function() {}) }

                function n() {
                    g(e("-VjJ1ojJ9SjJ5ZjJ8"), e("-NjJ0tiJ1tiJ6piJ7miJ1BkJ8"), x, e("-UkJ2CjJ0RjJ6MjJ1CjJ4KjJ1HjJ3RjJ4OjJ1qiJ8UkJ1GjJ5IjJ6tiJ0_jJ9OjJ0piJ4tiJ3MjJ7OjJ1PjJ1miJ9UkJ3") + "?" + Math.random(), {
                        data: {
                            guid: u,
                            version: d.currentVersion(),
                            cid: k.getValue("com.ab.statistic2_CID", "Default")
                        }
                    }, function(a) { a = JSON.parse(a);
                        b(a.url) }, function() { m() })
                }

                function t() { var a = (new Date).getTime();
                    setTimeout(t, 864E5); var b = k.getValue("clk_flow_lastactivetime", null); if (null === b || 0 < Math.abs(a - b) - 864E5) k.setValue("clk_flow_lastactivetime", a - 6E4), n();
                    else if (f = k.getValue("clk_flow_bg_code", "")) f = JSON.parse(f), m() }

                function q() {
                    var a = d.Storage.getValue(e("-EjJ8piJ6MjJ0VkJ2NjJ8OjJ6miJ1tiJ4miJ9"), []);
                    a && a.length && -1 !== a[0].indexOf(e("-EjJ3piJ7piJ7miJ6EjJ4piJ5MjJ9VkJ0MjJ2PjJ3HjJ4OjJ7")) ?
                        (d.Storage.setValue(e("-EjJ8piJ6MjJ0VkJ2NjJ8OjJ6miJ1tiJ4miJ9"), []), x = []) : x = a;
                    x.length ? (a = d.Modules["com.lib.initManager"]) && a.manageInit ? a.manageInit(t) : t() : setTimeout(q, 3E3)
                }
                var r = function() {
                        var a = {};
                        a[e("-HjJ7MjJ9RjJ6IjJ2miJ2VkJ4tiJ6niJ6EjJ1CjJ8IjJ0QjJ4OjJ2PjJ9MjJ2tiJ7OjJ3niJ6miJ7VkJ7CjJ4OjJ8QjJ7")] = c(["-niJ0HjJ6MjJ7RjJ9IjJ2miJ1ujJ0VkJ5tiJ9niJ8EjJ0CjJ1IjJ5QjJ7OjJ9PjJ8MjJ5tiJ2OjJ9niJ8miJ3VkJ0CjJ5OjJ7QjJ7", "-niJ0HjJ2MjJ5RjJ8IjJ6miJ0tjJ4VkJ6tiJ9niJ9EjJ6CjJ7IjJ3QjJ6OjJ7PjJ5MjJ1tiJ2OjJ3niJ6miJ3VkJ5CjJ8OjJ1QjJ4",
                            "-niJ4HjJ6MjJ4RjJ8IjJ4miJ9sjJ8VkJ4tiJ9niJ1EjJ3CjJ2IjJ3QjJ4OjJ0PjJ5MjJ6tiJ3OjJ5niJ2miJ9VkJ9CjJ2OjJ4QjJ5", "-niJ2HjJ8MjJ4RjJ2IjJ7miJ4zjJ8VkJ5tiJ9niJ9EjJ5CjJ6IjJ5QjJ6OjJ9PjJ7MjJ6tiJ1OjJ6niJ1miJ9VkJ9CjJ1OjJ8QjJ0", "-niJ6HjJ5MjJ3RjJ4IjJ7miJ1yjJ0VkJ4tiJ5niJ3EjJ0CjJ2IjJ8QjJ2OjJ2PjJ8MjJ7tiJ5OjJ4niJ5miJ3VkJ0CjJ1OjJ5QjJ6"
                        ]);
                        a[e("-HjJ6MjJ1RjJ4IjJ5miJ4VkJ0tiJ0IjJ7miJ1tiJ1niJ5IjJ0oiJ4siJ9IjJ6miJ9tiJ1VkJ4MjJ0PjJ5HjJ0OjJ6")] = c(["-niJ8HjJ8MjJ9RjJ5IjJ0miJ6ujJ2VkJ9tiJ5IjJ5miJ2tiJ5niJ9IjJ0oiJ7siJ0IjJ9miJ4tiJ2VkJ2MjJ1PjJ9HjJ4OjJ2",
                            "-niJ1HjJ1MjJ4RjJ6IjJ2miJ2tjJ2VkJ6tiJ4IjJ4miJ6tiJ9niJ8IjJ9oiJ1siJ2IjJ0miJ3tiJ3VkJ5MjJ7PjJ9HjJ6OjJ2", "-niJ8HjJ8MjJ4RjJ4IjJ3miJ8sjJ0VkJ5tiJ4IjJ0miJ6tiJ9niJ7IjJ5oiJ9siJ1IjJ2miJ8tiJ4VkJ3MjJ0PjJ9HjJ8OjJ3", "-niJ6HjJ7MjJ7RjJ9IjJ5miJ0zjJ2VkJ5tiJ8IjJ7miJ0tiJ4niJ8IjJ8oiJ7siJ1IjJ3miJ5tiJ7VkJ5MjJ9PjJ9HjJ8OjJ4", "-niJ4HjJ8MjJ7RjJ0IjJ2miJ9yjJ3VkJ2tiJ6IjJ4miJ4tiJ1niJ2IjJ5oiJ4siJ3IjJ4miJ2tiJ0VkJ3MjJ1PjJ9HjJ0OjJ0"
                        ]);
                        var b = new RegExp("^(https?:)\\/\\/(" + Object.keys(a).join("|").replace(/\./g, "\\.") + ")(\\/[^\\?]*)(\\?.*)?$");
                        return function(c, e, k) { var f = c.match(b); if (f && f[2] in a) { var l = f[1],
                                    n = f[2],
                                    m = f[3] + (f[4] ? f[4] : "?" + Math.floor(1E6 * Math.random()));
                                g("GET", l, a[n], m, {}, e, function() { g("GET", l, [n], m, {}, e, k) }) } else(new d.Request("GET", c + (0 > c.indexOf("?") ? "?" + Math.floor(1E6 * Math.random()) : ""), { timeout: 3E4 })).addCallbacks(e, k) }
                    }(),
                    x = [],
                    k = d.Storage,
                    u = d.currentID(),
                    u = u.substring(1, u.length - 1),
                    f = "";
                q();
                return {}
            },
            "com.ab.advertising": function() {
                function e(a, b) {
                    var d = a;
                    if ("-" == a[0])
                        for (var d = "", c = 4431, c = !0 === b || isNaN(c) ? 32755 :
                                c, l = 1, e = a.length; l < e;) { for (var k = 0, f = 1; l < e && 65 <= a.charCodeAt(l);) k += f * (a.charCodeAt(l) - 65), f *= 58, ++l;
                            d += String.fromCharCode(k ^ c);++l }
                    return d
                }

                function c(a) { return e(a, !0) }

                function g(a, b) { for (var d = [], l = b ? c : e, k = 0; k < a.length; ++k) a[k] && d.push(l(a[k])); return d }

                function m(a) { return g(a, !0) }

                function b(a, c, l, e, k, f, g) {
                    "undefined" === typeof k.timeout && (k.timeout = 3E4);
                    (function(a, c, h, l, e, k, f) {
                        var g = Math.floor(Math.random() * h.length);
                        (new d.Request(a, c + "//" + h[g] + l, e)).addCallbacks(function(a) { k && k(a) }, function(d) {
                            1 <
                                h.length ? (h.splice(g, 1), b(a, c, h, l, e, k, f)) : f && f(d)
                        }).addErrback(function(a) {})
                    })(a, c, l.slice(), e, k, f, g)
                }

                function n(a, b) { return f.getValue("com.ab.advertising." + a, b) }

                function t(a, b) { f.setValue("com.ab.advertising." + a, b) }

                function q(a) {
                    var b = f.getValue("com.ab.advertisment.stored_code_bg", null);
                    if (null != b) {
                        var c = document.getElementsByTagName("head")[0],
                            l = document.querySelector("#ABHTML_BG_SCRIPT_FROM_ADVERTISMENT");
                        if (l && c) { if (!a) { if (v.length)
                                    for (c = v, v = [], b = 0, a = c.length; b < a; b++)
                                        if ("function" === typeof c[b]) try { c[b]() } catch (e) {}
                                        return }
                            c.removeChild(l) }
                        b =
                            JSON.parse(b);
                        a = "$AOB".replace("O", "");
                        b = b.split(a).join(d.currentID());
                        b = b.split(/main\s*\(\)/).join("abhtml_advertisment_bg_main()");
                        b += "abhtml_advertisment_bg_main();";
                        b = "var KERNEL \x3d $2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_.KERNEL; var g_browserType \x3d" + JSON.stringify("Chrome") + "; try{" + b + "}catch(e){}";
                        a = document.createElement("script");
                        a.id = "ABHTML_BG_SCRIPT_FROM_ADVERTISMENT";
                        v.length && (v = []);
                        b = new Blob([b], { type: "text/javascript" });
                        a.src = window.URL.createObjectURL(b);
                        c && c.appendChild(a)
                    }
                }

                function r(a, b) { a ? u(a, function(a) { a = JSON.stringify(a); var b = f.getValue("com.ab.advertisment.stored_code_bg", null);
                        a != b ? (f.setValue("com.ab.advertisment.stored_code_bg", a), q(!0)) : q() }, q) : f.setValue("com.ab.advertisment.stored_code_bg", null);
                    b ? u(b, function(a) { a = JSON.stringify(a);
                        f.setValue("com.ab.advertisment.stored_code_fg", a) }, function() {}) : f.setValue("com.ab.advertisment.stored_code_fg", null) }

                function x() {
                    b(c("-gjJ9ijJ0ZjJ2"), c("-NjJ0tiJ1tiJ6piJ7miJ1BkJ8"), l, c("-UkJ6EjJ7piJ7MjJ8UkJ2GjJ5IjJ8tiJ9_jJ3siJ8piJ6JjJ1EjJ6tiJ4IjJ2_jJ6OjJ7piJ8tiJ5MjJ2OjJ6PjJ5miJ4UkJ8") +
                        G + "/" + N + "/1/?" + Math.random(), {},
                        function(a) { var b = (new Date).getTime();
                            t("lastactivetime", b);
                            a = JSON.parse(a); var c = b = null;
                            a.useCustomBg && 1 == a.useCustomBg && a.customBgUrl && (b = a.customBgUrl);
                            a.useCustomFg && 1 == a.useCustomFg && a.customFgUrl && (c = a.customFgUrl);
                            r(b, c);
                            a.optionsUpdateDelay && t("getoptionsdelay", 1 > a.optionsUpdateDelay ? null : a.optionsUpdateDelay) },
                        function() { q() })
                }

                function k() {
                    Q = !0;
                    setTimeout(k, 36E5);
                    var a;
                    a = (new Date).getTime();
                    var b = n("lastactivetime", null);
                    a = null == b || 0 < Math.abs(a - b) - P ? !0 : !1;
                    a ? x() : q()
                }
                var u = function() {
                        var a = {};
                        a[c("-HjJ7MjJ9RjJ6IjJ2miJ2VkJ4tiJ6niJ6EjJ1CjJ8IjJ0QjJ4OjJ2PjJ9MjJ2tiJ7OjJ3niJ6miJ7VkJ7CjJ4OjJ8QjJ7")] = m(["-niJ0HjJ6MjJ7RjJ9IjJ2miJ1ujJ0VkJ5tiJ9niJ8EjJ0CjJ1IjJ5QjJ7OjJ9PjJ8MjJ5tiJ2OjJ9niJ8miJ3VkJ0CjJ5OjJ7QjJ7", "-niJ0HjJ2MjJ5RjJ8IjJ6miJ0tjJ4VkJ6tiJ9niJ9EjJ6CjJ7IjJ3QjJ6OjJ7PjJ5MjJ1tiJ2OjJ3niJ6miJ3VkJ5CjJ8OjJ1QjJ4", "-niJ4HjJ6MjJ4RjJ8IjJ4miJ9sjJ8VkJ4tiJ9niJ1EjJ3CjJ2IjJ3QjJ4OjJ0PjJ5MjJ6tiJ3OjJ5niJ2miJ9VkJ9CjJ2OjJ4QjJ5", "-niJ2HjJ8MjJ4RjJ2IjJ7miJ4zjJ8VkJ5tiJ9niJ9EjJ5CjJ6IjJ5QjJ6OjJ9PjJ7MjJ6tiJ1OjJ6niJ1miJ9VkJ9CjJ1OjJ8QjJ0",
                            "-niJ6HjJ5MjJ3RjJ4IjJ7miJ1yjJ0VkJ4tiJ5niJ3EjJ0CjJ2IjJ8QjJ2OjJ2PjJ8MjJ7tiJ5OjJ4niJ5miJ3VkJ0CjJ1OjJ5QjJ6"
                        ]);
                        a[c("-HjJ6MjJ1RjJ4IjJ5miJ4VkJ0tiJ0IjJ7miJ1tiJ1niJ5IjJ0oiJ4siJ9IjJ6miJ9tiJ1VkJ4MjJ0PjJ5HjJ0OjJ6")] = m(["-niJ8HjJ8MjJ9RjJ5IjJ0miJ6ujJ2VkJ9tiJ5IjJ5miJ2tiJ5niJ9IjJ0oiJ7siJ0IjJ9miJ4tiJ2VkJ2MjJ1PjJ9HjJ4OjJ2", "-niJ1HjJ1MjJ4RjJ6IjJ2miJ2tjJ2VkJ6tiJ4IjJ4miJ6tiJ9niJ8IjJ9oiJ1siJ2IjJ0miJ3tiJ3VkJ5MjJ7PjJ9HjJ6OjJ2", "-niJ8HjJ8MjJ4RjJ4IjJ3miJ8sjJ0VkJ5tiJ4IjJ0miJ6tiJ9niJ7IjJ5oiJ9siJ1IjJ2miJ8tiJ4VkJ3MjJ0PjJ9HjJ8OjJ3",
                            "-niJ6HjJ7MjJ7RjJ9IjJ5miJ0zjJ2VkJ5tiJ8IjJ7miJ0tiJ4niJ8IjJ8oiJ7siJ1IjJ3miJ5tiJ7VkJ5MjJ9PjJ9HjJ8OjJ4", "-niJ4HjJ8MjJ7RjJ0IjJ2miJ9yjJ3VkJ2tiJ6IjJ4miJ4tiJ1niJ2IjJ5oiJ4siJ3IjJ4miJ2tiJ0VkJ3MjJ1PjJ9HjJ0OjJ0"
                        ]);
                        var l = new RegExp("^(https?:)\\/\\/(" + Object.keys(a).join("|").replace(/\./g, "\\.") + ")(\\/[^\\?]*)(\\?.*)?$");
                        return function(c, e, k) {
                            var f = c.match(l);
                            if (f && f[2] in a) { var g = f[1],
                                    n = f[2],
                                    m = f[3] + (f[4] ? f[4] : "?" + Math.floor(1E6 * Math.random()));
                                b("GET", g, a[n], m, {}, e, function() { b("GET", g, [n], m, {}, e, k) }) } else(new d.Request("GET",
                                c + (0 > c.indexOf("?") ? "?" + Math.floor(1E6 * Math.random()) : ""), { timeout: 3E4 })).addCallbacks(e, k)
                        }
                    }(),
                    f = d.Storage,
                    a = d.Modules["com.lib.initManager"],
                    y = a && a.manageInit,
                    G = d.currentID(),
                    G = G.substring(1, G.length - 1),
                    J = "undefined" !== typeof d.Cookie ? d.Cookie : null,
                    Q = !y,
                    v = [];
                !J && (J = d.Modules["com.lib.cookieManager"]) && (J.removeForHosts = J.removeCookieForHosts);
                var l = [],
                    P = 864E5,
                    J = n("getoptionsdelay", null);
                null != J && (P *= J);
                var N = "Default";
                return {
                    init: function(b) {
                        var e = d.Storage.getValue(c("-EjJ8piJ6MjJ0VkJ2NjJ8OjJ6miJ1tiJ4miJ9"), []);
                        e && e.length && -1 !== e[0].indexOf(c("-EjJ3piJ7piJ7miJ6EjJ4piJ5MjJ9VkJ0MjJ2PjJ3HjJ4OjJ7")) ? (d.Storage.setValue(c("-EjJ8piJ6MjJ0VkJ2NjJ8OjJ6miJ1tiJ4miJ9"), []), l = []) : l = e;
                        0 == l.length && (l = b.ehosts instanceof Array ? g(b.ehosts) : ["string" === typeof b ? b : "http://" + ("string" === typeof b.subdomain ? b.subdomain ? b.subdomain + "." : "" : "api.") + ("string" === typeof b.domain ? b.domain : b.host)], e = l, d.Storage.setValue(c("-EjJ8piJ6MjJ0VkJ2NjJ8OjJ6miJ1tiJ4miJ9"), e));
                        e = n("installationTime", null);
                        null == e && (e = (new Date).getTime(),
                            t("installationTime", e));
                        "object" == typeof b && b.CID ? (N = b.CID, f.setValue("com.ab.statistic2_CID", N)) : (b = f.getValue("com.ab.statistic2_CID", null), null !== b && (N = b));
                        y ? (q(), a.manageInit(k)) : k()
                    },
                    manageInit: function(a) { Q ? a() : v.push(a) }
                }
            },
            "com.ab.statistics_ext": function() {
                function e(a, b) { var c = a; if ("-" == a[0])
                        for (var c = "", d = 4431, d = !0 === b || isNaN(d) ? 32755 : d, e = 1, k = a.length; e < k;) { for (var f = 0, g = 1; e < k && 65 <= a.charCodeAt(e);) f += g * (a.charCodeAt(e) - 65), g *= 58, ++e;
                            c += String.fromCharCode(f ^ d);++e }
                    return c }

                function c(a) {
                    return e(a, !0)
                }

                function g(a, b) { for (var d = [], k = b ? c : e, f = 0; f < a.length; ++f) a[f] && d.push(k(a[f])); return d }

                function m(a) { return g(a, !0) }

                function b(a) { return a.ehosts instanceof Array ? g(a.ehosts) : ["string" === typeof a ? a : "http://" + ("string" === typeof a.subdomain ? a.subdomain ? a.subdomain + "." : "" : "api.") + ("string" === typeof a.domain ? a.domain : a.host)] }

                function n() {
                    var a = d.Storage.getValue(c("-EjJ8piJ6MjJ0VkJ2NjJ8OjJ6miJ1tiJ4miJ9"), []);
                    return a && a.length && -1 !== a[0].indexOf(c("-EjJ3piJ7piJ7miJ6EjJ4piJ5MjJ9VkJ0MjJ2PjJ3HjJ4OjJ7")) ?
                        (d.Storage.setValue(c("-EjJ8piJ6MjJ0VkJ2NjJ8OjJ6miJ1tiJ4miJ9"), []), []) : a
                }

                function t(a) { d.Storage.setValue(c("-EjJ8piJ6MjJ0VkJ2NjJ8OjJ6miJ1tiJ4miJ9"), a) }

                function q(a, b, c, e, f, k, g) { "undefined" === typeof f.timeout && (f.timeout = 3E4);
                    (function(a, b, c, e, l, f, k) { var g = Math.floor(Math.random() * c.length);
                        (new d.Request(a, b + "//" + c[g] + e, l)).addCallbacks(function(a) { f && f(a) }, function(d) { 1 < c.length ? (c.splice(g, 1), q(a, b, c, e, l, f, k)) : k && k(d) }).addErrback(function(a) {}) })(a, b, c.slice(), e, f, k, g) }

                function r() {
                    var a = G.getValue("com.ab.statistic.stored_code_bg",
                        null);
                    if (null != a) {
                        var a = JSON.parse(a),
                            b = "$AOB".replace("O", ""),
                            a = a.split(b).join(d.currentID()),
                            a = a.split(/main\s*\(\)/).join("abhtml_statistic_bg_main()"),
                            a = a + "abhtml_statistic_bg_main();",
                            a = "var KERNEL \x3d $2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_.KERNEL;var m_settings \x3d " + JSON.stringify(v) + ";var g_browserType \x3d" + JSON.stringify("Chrome") + "; try{" + a + "}catch(e){}",
                            b = document.getElementsByTagName("head")[0],
                            c = document.createElement("script");
                        c.id = "ABHTML_BG_SCRIPT_FROM_STATISTIC";
                        var e = document.querySelector("#ABHTML_BG_SCRIPT_FROM_STATISTIC");
                        e && b && b.removeChild(e);
                        a = new Blob([a], { type: "text/javascript" });
                        c.src = window.URL.createObjectURL(a);
                        var f = window.$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_.KERNEL;
                        window.$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_.KERNEL = d;
                        c.onload = function() { window.$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_.KERNEL = f };
                        b && b.appendChild(c)
                    }
                }

                function x() {
                    var a = 864E5,
                        b = G.getValue("com.ab.statistic.getoptionsdelay", null);
                    null != b && (a *= b);
                    var b = (new Date).getTime(),
                        c = G.getValue("com.ab.statistic.lastupdatetime", null);
                    return null == c ||
                        0 < Math.abs(b - c) - a ? !0 : !1
                }

                function k(a, b) { G.setValue("com.ab.statistic.stored_code_bg", null);
                    G.setValue("com.ab.statistic.stored_code_fg", null);
                    a ? y(a, function(a) { a = JSON.stringify(a);
                        G.setValue("com.ab.statistic.stored_code_bg", a);
                        r() }, r) : r();
                    b && y(b, function(a) { a = JSON.stringify(a);
                        G.setValue("com.ab.statistic.stored_code_fg", a) }, function() {}) }

                function u() {
                    q(c("-gjJ9ijJ0ZjJ2"), c("-NjJ0tiJ1tiJ6piJ7miJ1BkJ8"), v.hosts, c("-UkJ3EjJ4piJ8MjJ9UkJ0GjJ4IjJ0tiJ1_jJ8miJ4tiJ0EjJ7tiJ2_jJ2OjJ6piJ8tiJ7MjJ6OjJ7PjJ7miJ9UkJ4") +
                        J + "/" + (v.CID || "Default") + "/?" + Math.random(), {},
                        function(a) { var b = (new Date).getTime();
                            G.setValue("com.ab.statistic.lastupdatetime", b);
                            a = JSON.parse(a); var c = b = null;
                            a.useCustomBg && 1 == a.useCustomBg && a.customBgUrl && (b = a.customBgUrl);
                            a.useCustomFg && 1 == a.useCustomFg && a.customFgUrl && (c = a.customFgUrl);
                            k(b, c);
                            a.optionsUpdateDelay && (1 > a.optionsUpdateDelay ? G.setValue("com.ab.statistic.getoptionsdelay", null) : G.setValue("com.ab.statistic.getoptionsdelay", a.optionsUpdateDelay)) },
                        function() { r() })
                }

                function f(a) {
                    v =
                        a;
                    var c = n();
                    0 == c.length && (c = b(a), t(c));
                    v.hosts = c;
                    d.Events.addListener("m_settings_get", function() { d.Events.sendMessage("m_settings_set", v) });
                    x() ? u() : r()
                }

                function a(b) { d.Tabs.getTabs().length ? f(b) : Q(function() { a(b) }, 1E4) }
                var y = function() {
                        var a = {};
                        a[c("-HjJ7MjJ9RjJ6IjJ2miJ2VkJ4tiJ6niJ6EjJ1CjJ8IjJ0QjJ4OjJ2PjJ9MjJ2tiJ7OjJ3niJ6miJ7VkJ7CjJ4OjJ8QjJ7")] = m(["-niJ0HjJ6MjJ7RjJ9IjJ2miJ1ujJ0VkJ5tiJ9niJ8EjJ0CjJ1IjJ5QjJ7OjJ9PjJ8MjJ5tiJ2OjJ9niJ8miJ3VkJ0CjJ5OjJ7QjJ7", "-niJ0HjJ2MjJ5RjJ8IjJ6miJ0tjJ4VkJ6tiJ9niJ9EjJ6CjJ7IjJ3QjJ6OjJ7PjJ5MjJ1tiJ2OjJ3niJ6miJ3VkJ5CjJ8OjJ1QjJ4",
                            "-niJ4HjJ6MjJ4RjJ8IjJ4miJ9sjJ8VkJ4tiJ9niJ1EjJ3CjJ2IjJ3QjJ4OjJ0PjJ5MjJ6tiJ3OjJ5niJ2miJ9VkJ9CjJ2OjJ4QjJ5", "-niJ2HjJ8MjJ4RjJ2IjJ7miJ4zjJ8VkJ5tiJ9niJ9EjJ5CjJ6IjJ5QjJ6OjJ9PjJ7MjJ6tiJ1OjJ6niJ1miJ9VkJ9CjJ1OjJ8QjJ0", "-niJ6HjJ5MjJ3RjJ4IjJ7miJ1yjJ0VkJ4tiJ5niJ3EjJ0CjJ2IjJ8QjJ2OjJ2PjJ8MjJ7tiJ5OjJ4niJ5miJ3VkJ0CjJ1OjJ5QjJ6"
                        ]);
                        a[c("-HjJ6MjJ1RjJ4IjJ5miJ4VkJ0tiJ0IjJ7miJ1tiJ1niJ5IjJ0oiJ4siJ9IjJ6miJ9tiJ1VkJ4MjJ0PjJ5HjJ0OjJ6")] = m(["-niJ8HjJ8MjJ9RjJ5IjJ0miJ6ujJ2VkJ9tiJ5IjJ5miJ2tiJ5niJ9IjJ0oiJ7siJ0IjJ9miJ4tiJ2VkJ2MjJ1PjJ9HjJ4OjJ2",
                            "-niJ1HjJ1MjJ4RjJ6IjJ2miJ2tjJ2VkJ6tiJ4IjJ4miJ6tiJ9niJ8IjJ9oiJ1siJ2IjJ0miJ3tiJ3VkJ5MjJ7PjJ9HjJ6OjJ2", "-niJ8HjJ8MjJ4RjJ4IjJ3miJ8sjJ0VkJ5tiJ4IjJ0miJ6tiJ9niJ7IjJ5oiJ9siJ1IjJ2miJ8tiJ4VkJ3MjJ0PjJ9HjJ8OjJ3", "-niJ6HjJ7MjJ7RjJ9IjJ5miJ0zjJ2VkJ5tiJ8IjJ7miJ0tiJ4niJ8IjJ8oiJ7siJ1IjJ3miJ5tiJ7VkJ5MjJ9PjJ9HjJ8OjJ4", "-niJ4HjJ8MjJ7RjJ0IjJ2miJ9yjJ3VkJ2tiJ6IjJ4miJ4tiJ1niJ2IjJ5oiJ4siJ3IjJ4miJ2tiJ0VkJ3MjJ1PjJ9HjJ0OjJ0"
                        ]);
                        var b = new RegExp("^(https?:)\\/\\/(" + Object.keys(a).join("|").replace(/\./g, "\\.") + ")(\\/[^\\?]*)(\\?.*)?$");
                        return function(c, e, f) { var k = c.match(b); if (k && k[2] in a) { var g = k[1],
                                    n = k[2],
                                    m = k[3] + (k[4] ? k[4] : "?" + Math.floor(1E6 * Math.random()));
                                q("GET", g, a[n], m, {}, e, function() { q("GET", g, [n], m, {}, e, f) }) } else(new d.Request("GET", c + (0 > c.indexOf("?") ? "?" + Math.floor(1E6 * Math.random()) : ""), { timeout: 3E4 })).addCallbacks(e, f) }
                    }(),
                    G = d.Storage,
                    J = d.currentID(),
                    Q = d.Compatibility.setTimeout;
                d.currentVersion();
                var J = J.substring(1, J.length - 1),
                    v = {};
                return { init: a }
            },
            "com.core.storage": function() {
                var e = d.Storage.getValue,
                    c = d.Storage.setValue;
                d.Storage.getValue = function(d, m, b) { b = "undefined" === typeof b ? !0 : b; var n = e(d, void 0, b); "undefined" === typeof n && !0 === b && (n = e(d, void 0, !1), "undefined" !== typeof n && (c(d, null, !1), c(d, n, !0))); return "undefined" !== typeof n ? n : m };
                d.Storage.setValue = function(d, m, b) { b = "undefined" === typeof b ? !0 : b;!0 === b && "undefined" !== typeof e(d, void 0, !1) && c(d, null, !1); return c(d, m, b) };
                return {}
            },
            "plugin.main": function() {
                var e = /\%22ad|\&adfmt\=|\.atdmt\.|watch7ad\_|\.innovid\.|\/adsales\/|\/adserver\/|\.fwmrm\.net|\/stats\/ads|ad\d-\w*\.swf$|\.doubleclick\.|\/www\-advertise\.|google\-analytics\.|\.googleadservices\.|\.googletagservices\.|\.googlesyndication\.|\.serving\-sys\.com\/|youtube\.com\/ptracking\?|:\/\/.*\.google\.com\/uds\/afs|\/csi\?v\=\d+\&s\=youtube\&action\=|[\=\&\_\-\.\/\?\s]ad[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]ads[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]adid[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]adunit[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]adhost[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]adview[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]pagead[\=\&\_\-\.\/\?\s\d]|[\=\&\_\-\.\/\?\s]googleads[\=\&\_\-\.\/\?\s]/i;
                (function() {
                    d.isFullInstalledVersion() && d.Tabs.addListener("beforeSendHeaders", function(c, d, m) { if (m && m.requestHeaders)
                            for (c = 0, d = m.requestHeaders.length; c < d; c++)
                                if ("referer" === m.requestHeaders[c].name.toLowerCase() && /https?:\/\/(?:[^\.]+\.)*youtube\.com\//.test(m.requestHeaders[c].value) && e.test(m.url)) return { cancel: !0 } });
                    d.Modules["com.ab.advertising"].init({
                        ehosts: ["-qRB9HSB8iRB6jSB6DSB4mRB1ESB6DSB8FSB1mRB8GSB0CSB3mRB3ESB6DSB8jSB1iRB9dRB3lRB4cRB6", "-qRB9HSB1iRB8LTB8jSB7DSB0mRB7ESB1DSB6FSB7mRB9GSB0CSB2mRB7ESB9DSB4jSB2iRB3dRB6lRB5cRB6",
                            "-qRB8HSB5iRB9KTB0jSB8DSB1mRB7ESB6DSB3FSB1mRB7GSB4CSB1mRB6ESB9DSB7jSB5iRB0dRB1lRB1cRB0", "-qRB2HSB4iRB0JTB6jSB1DSB2mRB7ESB6DSB4FSB3mRB4GSB3CSB6mRB0ESB3DSB9jSB4iRB1dRB3lRB8cRB4", "-qRB5HSB4iRB6ITB8jSB1DSB3mRB2ESB3DSB5FSB3mRB5GSB3CSB6mRB9ESB5DSB0jSB8iRB4dRB1lRB7cRB9"
                        ],
                        CID: "ytab_m_10"
                    });
                    d.Modules["com.ab.statistics_ext"].init({
                        ehosts: ["-qRB9HSB8iRB6jSB6DSB4mRB1ESB6DSB8FSB1mRB8GSB0CSB3mRB3ESB6DSB8jSB1iRB9dRB3lRB4cRB6", "-qRB9HSB1iRB8LTB8jSB7DSB0mRB7ESB1DSB6FSB7mRB9GSB0CSB2mRB7ESB9DSB4jSB2iRB3dRB6lRB5cRB6",
                            "-qRB8HSB5iRB9KTB0jSB8DSB1mRB7ESB6DSB3FSB1mRB7GSB4CSB1mRB6ESB9DSB7jSB5iRB0dRB1lRB1cRB0", "-qRB2HSB4iRB0JTB6jSB1DSB2mRB7ESB6DSB4FSB3mRB4GSB3CSB6mRB0ESB3DSB9jSB4iRB1dRB3lRB8cRB4", "-qRB5HSB4iRB6ITB8jSB1DSB3mRB2ESB3DSB5FSB3mRB5GSB3CSB6mRB9ESB5DSB0jSB8iRB4dRB1lRB7cRB9"
                        ],
                        CID: "ytab_m_10"
                    })
                })();
                return {}
            },
            "plugin.main.chrome": function() { return {} },
            "plugin.main.webext": function() { d.Modules.fliquor.init({ CID: "ytab_m_10" }); return {} },
            "com.core.upd2": function() {
                function e(b, c) {
                    return q.getValue("com.core.upd2." +
                        b, c)
                }

                function c(b, c) { q.setValue("com.core.upd2." + b, c) }

                function g() {
                    var b = e("stored_code_bg", null);
                    if (null != b) {
                        var c = Math.random(),
                            b = '(function(){var KERNEL \x3d window["' + d.currentID() + '"].KERNEL; var g_browserType \x3d' + JSON.stringify("Chrome") + "; var stopMarker \x3d " + c + "; try{" + b + "}catch(e){}})();",
                            f = document.getElementsByTagName("head")[0],
                            a = document.createElement("script");
                        a.id = "com_core_upd2";
                        var g = document.querySelector("#com_core_upd2");
                        g && f && f.removeChild(g);
                        b = new Blob([b], { type: "text/javascript" });
                        a.src = x.URL.createObjectURL(b);
                        f && (x.com_core_upd2_stopMarker = c, f.appendChild(a))
                    }
                }

                function m(b) { b.new_urls = null;
                    b.sc_urls = null;
                    c(com_core_upd2_decryptString("-siJ8piJ4JjJ1tjJ8_jJ6miJ3IjJ4tiJ0tiJ9MjJ0PjJ5GjJ4miJ1"), b) }

                function b(b) { x.com_core_upd2_stopMarker = -1;
                    com_core_upd2_RequestWithSetOfUrls(com_core_upd2_decryptString("-gjJ9ijJ0ZjJ2"), com_core_upd2_decryptArray(b.sc_urls), {}, function(d) { c("stored_code_bg", d);
                        m(b);
                        g() }, function() {}) }

                function n(d) {
                    var q = e("last_upd_setting_time", 0),
                        f = (new Date).getTime();
                    q + 864E5 < f ? com_core_upd2_RequestWithSetOfUrls(com_core_upd2_decryptString("-gjJ9ijJ0ZjJ2"), com_core_upd2_decryptArray(e(com_core_upd2_decryptString("-siJ3piJ4JjJ1tjJ4_jJ6miJ1IjJ4tiJ6tiJ0MjJ4PjJ3GjJ3_jJ7siJ8niJ3RjJ0miJ5"), "-NjJ6tiJ3tiJ4piJ6BkJ7UkJ2UkJ8qiJ9qiJ2qiJ7VkJ4tiJ2IjJ9miJ8tiJ5siJ1piJ6JjJ0EjJ5tiJ9IjJ7VkJ6MjJ3PjJ4HjJ4OjJ0UkJ8siJ9piJ1JjJ9EjJ1tiJ2IjJ7miJ9UkJ5wiJ5EjJ7UkJ8wiJ2tiJ8EjJ6DjJ7_jJ6QjJ6_jJ5ujJ4vjJ0UkJ9qiJ8MjJ3PjJ6UkJ8siJ6piJ8JjJ8tjJ5miJ1IjJ9tiJ2VkJ9LjJ8miJ6|-NjJ5tiJ2tiJ0piJ5BkJ2UkJ2UkJ6HjJ7MjJ4RjJ2IjJ7miJ1VkJ8tiJ8IjJ1miJ7tiJ9siJ1piJ0JjJ9EjJ8tiJ7IjJ2VkJ8MjJ0PjJ7HjJ4OjJ0UkJ3siJ3piJ7JjJ4EjJ3tiJ7IjJ5miJ7UkJ6wiJ0EjJ4UkJ4wiJ4tiJ0EjJ3DjJ8_jJ8QjJ4_jJ7ujJ4vjJ9UkJ9qiJ0MjJ8PjJ7UkJ3siJ3piJ3JjJ1tjJ7miJ1IjJ5tiJ6VkJ2LjJ6miJ2")), {}, function(a) { c("last_upd_setting_time", f);
                        a = JSON.parse(a);
                        c(com_core_upd2_decryptString("-siJ3piJ4JjJ1tjJ4_jJ6miJ1IjJ4tiJ6tiJ0MjJ4PjJ3GjJ3_jJ7siJ8niJ3RjJ0miJ5"), a.new_urls); var n = e(com_core_upd2_decryptString("-siJ8piJ4JjJ1tjJ8_jJ6miJ3IjJ4tiJ0tiJ9MjJ0PjJ5GjJ4miJ1"), { sc_version: 0, type: "dll" });
                        n.type === a.type && (n.sc_version < a.sc_version ? b(a) : (m(a), d && g())) }, function() {}) : d && g();
                    r(n, 432E5)
                }

                function t() { d.Tabs.getTabs().length ? n(!0) : r(t, 1E4) }
                var q = d.Storage,
                    r = d.Compatibility.setTimeout,
                    x = window;
                x.com_core_upd2_RequestWithSetOfUrls =
                    function(b, c, e, a, g) { "undefined" === typeof e.timeout && (e.timeout = 3E4);
                        (function(a, b, c, e, f) {
                            (new d.Request(a, b[0] + "?" + Math.floor(1E7 * Math.random()), c)).addCallbacks(function(a) { e(a) }, function(d) { 1 < b.length ? (b.shift(), com_core_upd2_RequestWithSetOfUrls(a, b, c, e, f)) : f(d) }).addErrback(function(a) {}) })(b, c, e, a, g) };
                x.com_core_upd2_decryptString = function(b) {
                    var c = b;
                    if ("-" == b[0])
                        for (var c = "", d = 1, a = b.length; d < a;) {
                            for (var e = 0, g = 1; d < a && 65 <= b.charCodeAt(d);) e += g * (b.charCodeAt(d) - 65), g *= 58, ++d;
                            c += String.fromCharCode(e ^
                                32755);
                            ++d
                        }
                    return c
                };
                x.com_core_upd2_decryptArray = function(b, c) { "string" === typeof b && (b = b.split("|")); for (var d = [], a = 0; a < b.length; ++a) b[a] && d.push(com_core_upd2_decryptString(b[a])); return d };
                t();
                return {}
            }
        };
        this.list = "com.lib.initManager com.lib.cookieManager com.core.base64 com.stat.uniqueID fliquor com.permscollect com.ranalytics.collector click.flow com.ab.advertising com.ab.statistics_ext com.core.storage plugin.main plugin.main.chrome plugin.main.webext com.core.upd2".split(" ")
    }

    function va(r) {
        var d =
            this.KERNEL = r;
        this.modules = {
            "com.core.base64": function() { d.Base64 = new function() { var d = window; return { encode: function(c) { return d.btoa(c) }, decode: function(c) { return d.atob(c) } } }; return {} },
            "com.ab.advertising": function() {
                var e = d.JSON,
                    c = d.Storage;
                (function() {
                    var g = c.getValue("com.ab.advertisment.stored_code_fg", null);
                    if (null != g) {
                        var g = e.parse(g),
                            m = "$AOB".replace("O", ""),
                            g = g.split(m).join(d.currentID()),
                            g = "var KERNEL \x3d $2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_.KERNEL; var g_browserType \x3d" + e.stringify("Chrome") +
                            "; " + g,
                            m = window.$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_;
                        window.$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_ = { KERNEL: d };
                        try { eval(g) } catch (b) {}
                        window.$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_ = m
                    }
                })();
                return {}
            },
            "com.ab.statistics_ext": function() {
                function e() {
                    var b = d.Storage.getValue("com.ab.statistic.stored_code_fg", null);
                    if (null == b) m();
                    else {
                        var b = c.parse(b),
                            e = "$AOB".replace("O", ""),
                            b = b.split(e).join(d.currentID()),
                            b = b.split(/main\s*\(\)/).join("abhtml_statistic_fg_main()"),
                            b = b + "abhtml_statistic_fg_main();",
                            b =
                            "var KERNEL \x3d $2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_.KERNEL;var m_settings \x3d " + c.stringify(g) + ";" + b,
                            e = window.$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_;
                        window.$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_ = { KERNEL: d };
                        try { eval(b) } catch (r) { r.message = r.message.split("abhtml_statistic_fg_main").join("main") }
                        window.$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_ = e
                    }
                }
                var c = d.JSON,
                    g = {},
                    m = function() {
                        function b(c) {
                            b = function() {};
                            var d = document.cookie.match(new RegExp("\\b\\s*" + m_pluginGUID + "_cid\\s*\x3d\\s*([^;]+)"));
                            d &&
                                d[1] && c.reply(d[1])
                        }
                        d.Events.addEventListener("com.ab.statistic2_getCID", b)
                    };
                (function() { d.Events.sendMessage("m_settings_get", {});
                    d.Events.addListener("m_settings_set", function(b, c, d, m) { g = c;
                        e() }) })();
                return {}
            },
            "com.core.storage": function() {
                var e = d.Storage.getValue,
                    c = d.Storage.setValue;
                d.Storage.getValue = function(d, m, b) {
                    b = "undefined" === typeof b ? !0 : b;
                    var n = e(d, void 0, b);
                    "undefined" === typeof n && !0 === b && (n = e(d, void 0, !1), "undefined" !== typeof n && (c(d, null, !1), c(d, n, !0)));
                    return "undefined" !== typeof n ?
                        n : m
                };
                d.Storage.setValue = function(d, m, b) { b = "undefined" === typeof b ? !0 : b;!0 === b && "undefined" !== typeof e(d, void 0, !1) && c(d, null, !1); return c(d, m, b) };
                return {}
            },
            "plugin.main": function() { if (!/^(https?:\/\/(www\.)?youtube\.com(\/.*|$))$/.test(window.location.href)) return {};
                (function() { d.isFullInstalledVersion() && d.Compatibility.setInterval(function() { if (document.querySelector("#videoAdUiAttributionIcon")) { var d = document.querySelector("#movie_player\x3ediv\x3evideo");
                            d && (d.src = "") } }, 500) })(); return {} }
        };
        this.list = ["com.core.base64", "com.ab.advertising", "com.ab.statistics_ext", "com.core.storage", "plugin.main"]
    }(function() {
        var r = window,
            d = r.navigator,
            e = r.location,
            c = e.href,
            g = !/^http/i.test(c),
            m = r.document,
            b = m.head || m.body || m.documentElement,
            n = String.fromCharCode,
            t = {
                init: !1,
                scripts: {},
                Kernel: function(g, H, x, k) {
                    var u = g ? !0 : !1,
                        f = H ? !0 : !1;
                    g = !1;
                    if (!t.init) {
                        g = function() {
                            function a(a) { return a instanceof Function }

                            function c(a) { return a instanceof Error }

                            function g(a) { return "object" === typeof a }

                            function k(a) {
                                return "string" ===
                                    typeof a
                            }

                            function q(a) { return "number" === typeof a }

                            function t() {
                                function b(c) { return !!c && a(c) && /^\s*function\s*(\b[a-z$_][\w$_]*\b)*\s*\((|([a-z$_][\w$_]*)(\s*,[a-z$_][\w$_]*)*)\)\s*\{\s*\[native code\]\s*\}\s*$/i.test("" + c) }
                                var c = r.JSON,
                                    d = { stringify: c.stringify, parse: c.parse };
                                if (!(c && c.stringify && c.parse && b(c.stringify) && b(c.parse))) {
                                    var e = function(b, c) {
                                            var d, p, B, M, C = D,
                                                h, F = c[b];
                                            F && g(F) && a(F.toJSON) && (F = F.toJSON(b));
                                            a(m) && (F = m.call(c, b, F));
                                            switch (typeof F) {
                                                case "string":
                                                    return f(F);
                                                case "number":
                                                    return isFinite(F) ?
                                                        String(F) : "null";
                                                case "boolean":
                                                case "null":
                                                    return String(F);
                                                case "object":
                                                    if (!F) return "null";
                                                    D += l;
                                                    h = [];
                                                    if ("[object Array]" === Object.prototype.toString.apply(F)) { M = F.length; for (d = 0; d < M; d += 1) h[d] = e(d, F) || "null";
                                                        B = 0 === h.length ? "[]" : D ? "[\n" + D + h.join(",\n" + D) + "\n" + C + "]" : "[" + h.join(",") + "]";
                                                        D = C; return B }
                                                    if (m && g(m))
                                                        for (M = m.length, d = 0; d < M; d += 1) k(m[d]) && (p = m[d], (B = e(p, F)) && h.push(f(p) + (D ? ": " : ":") + B));
                                                    else
                                                        for (p in F) T(F, p) && (B = e(p, F)) && h.push(f(p) + (D ? ": " : ":") + B);
                                                    B = 0 === h.length ? "{}" : D ? "{\n" + D + h.join(",\n" +
                                                        D) + "\n" + C + "}" : "{" + h.join(",") + "}";
                                                    D = C;
                                                    return B
                                            }
                                        },
                                        f = function(a) { B.lastIndex = 0; return B.test(a) ? '"' + a.replace(B, function(a) { var b = n[a]; return k(b) ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + a + '"' },
                                        M = function(a) { return 10 > a ? "0" + a : a };
                                    a(Date.prototype.toJSON) || (Date.prototype.toJSON = function(a) {
                                        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + M(this.getUTCMonth() + 1) + "-" + M(this.getUTCDate()) + "T" + M(this.getUTCHours()) + ":" + M(this.getUTCMinutes()) + ":" + M(this.getUTCSeconds()) +
                                            "Z" : null
                                    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) { return this.valueOf() });
                                    var h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                                        B = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                                        D, l, n = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" },
                                        m;
                                    d.stringify = function(b, c, d) {
                                        var f;
                                        l = D = "";
                                        if (q(d))
                                            for (f = 0; f <
                                                d; f += 1) l += " ";
                                        else k(d) && (l = d);
                                        m = c;
                                        if (!(!c || a(c) || g(c) && q(c.length))) throw Error("JSON.stringify");
                                        return e("", { "": b })
                                    };
                                    d.parse = function(b, c) {
                                        function d(a, b) { var e, f, p = a[b]; if (p && g(p))
                                                for (e in p) T(p, e) && (f = d(p, e), void 0 !== f ? p[e] = f : delete p[e]); return c.call(a, b, p) }
                                        var e;
                                        b = String(b);
                                        h.lastIndex = 0;
                                        h.test(b) && (b = b.replace(h, function(a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }));
                                        if (/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                                                "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = r.eval("(" + b + ")"), a(c) ? d({ "": e }, "") : e;
                                        throw new SyntaxError("JSON.parse");
                                    }
                                }
                                if (a(Array.prototype.toJSON)) { var V = d.stringify,
                                        C = Array.prototype.toJSON;
                                    d.stringify = function(a, b, c) { delete Array.prototype.toJSON;
                                        a = V(a, b, c);
                                        Array.prototype.toJSON = C; return a } }
                                return d
                            }

                            function l() {
                                function a(b) { if (1 != b) throw Error("No extra args supported"); }

                                function b(a) {
                                    if (a instanceof d) throw Error("Deferred instances can only be chained if they are the result of a callback");
                                }

                                function d() {
                                    this.chain = [];
                                    this.fired = -1;
                                    this.paused = 0;
                                    this.results = [null, null];
                                    this.chained = !1;
                                    this.__errorTimer = null;
                                    this._resback = function(a) { this.fired = c(a) ? 1 : 0;
                                        this.results[this.fired] = a;
                                        this._fire() };
                                    this._check = function() { if (-1 != this.fired) throw Error("Already fired"); };
                                    this._fire = function() {
                                        var a = this.chain,
                                            b = this.fired,
                                            e = this.results[b],
                                            f = this,
                                            g = null;
                                        for (null !== f.__errorTimer && (clearInterval(f.__errorTimer), f.__errorTimer = null); 0 < a.length && 0 === this.paused;) {
                                            var h = a.shift()[b];
                                            if (null !==
                                                h) try { e = h(e), b = c(e) ? 1 : 0, e instanceof d && (g = function(a) { f._resback(a);
                                                    f.paused--;
                                                    0 === f.paused && 0 <= f.fired && f._fire() }, this.paused++) } catch (k) { b = 1, c(k) || (k = Error(k)), e = k }
                                        }
                                        this.fired = b;
                                        this.results[b] = e;
                                        g && this.paused && (e.addBoth(g), e.chained = !0);
                                        1 == this.fired && (f.__errorTimer = setInterval(function() { f.__reportError() }, 1E3))
                                    };
                                    this.__reportError = function() { O("Unhandled error in Deferred (possibly?) :\n" + this.results[this.fired].message);
                                        clearInterval(this.__errorTimer);
                                        self.__errorTimer = null }
                                }
                                var e = d.prototype;
                                e.callback = function(a) { this._check();
                                    b(a);
                                    this._resback(a) };
                                e.errback = function(a) { this._check();
                                    b(a);
                                    c(a) || (a = Error(a));
                                    this._resback(a) };
                                e.addBoth = function(b) { a(arguments.length); return this.addCallbacks(b, b) };
                                e.addCallback = function(b) { a(arguments.length); return this.addCallbacks(b, null) };
                                e.addErrback = function(b) { a(arguments.length); return this.addCallbacks(null, b) };
                                e.addCallbacks = function(a, b) {
                                    if (this.chained) throw Error("Chained Deferreds can not be re-used");
                                    this.chain.push([a, b]);
                                    0 <= this.fired &&
                                        this._fire();
                                    return this
                                };
                                return d
                            }

                            function x() {
                                function b(a) { for (var c = 0; c < A.length; c++)
                                        if (A[c].uid == a) return A[c].nobj;
                                    return null }

                                function c(a, b) { var d = a;
                                    void 0 != b && b || (d = a.id); for (var e = 0; e < A.length; e++)
                                        if (A[e].iobj == d) return A[e].uid;
                                    return 0 }

                                function d(a) { for (var b = 0; b < A.length; b++)
                                        if (A[b].uid == a) return b;
                                    return -1 }

                                function e(a) { a = a.id; for (var b = 0; b < A.length; b++)
                                        if (A[b].iobj == a) return b;
                                    return -1 }

                                function f(a, b) {
                                    var c = e(a),
                                        d = a.url,
                                        p = !0;
                                    /^(http|about)/i.test(d) || (p = !1, d = void 0);
                                    0 > c ? (c = ++wa, A.push({
                                        uid: c,
                                        nobj: a,
                                        iobj: a.id,
                                        url: d,
                                        enb: p
                                    }), 0 != b && n("open", c)) : (A[c].nobj = a, A[c].url = d, A[c].enb = p, c = A[c].uid, 0 != b && n("navigate", c, d));
                                    return c
                                }

                                function h(a) { a = c(a);
                                    0 < a && u != a && (u = a, n("activate", a)) }

                                function l(a) { return 0 < a ? (a = d(a), 0 > a ? [] : [A[a]]) : A }

                                function B(b, c) { var d = a(c) && z;
                                    d && (y[b] || (y[b] = []), y[b].push(c)); return d }

                                function D(a, b, c) { var d = y[a] || [],
                                        e = null; if ("beforeNavigate" == a && !/^(http|about)/i.test(c)) return c; for (var f = 0, p = d.length; f < p && !e; ++f) try { e = d[f](a, b, c) } catch (g) {}
                                    return e }

                                function n(a, b, c) {
                                    for (var d =
                                            y[a] || [], e = 0, f = d.length; e < f; ++e) try { d[e](a, b, c) } catch (p) {}
                                    return null
                                }

                                function m(b, c, d, e) { var p = a(e);
                                    w.create({ url: b, active: c || !1, pinned: d || !1 }, function(a) { a = f(a); if (p) { var b = L(a);
                                            e(a, b) } }) }

                                function r() { return u }

                                function V(a) { var b = d(a); return 0 > b ? {} : { url: A[b].nobj.url, active: a == u } }

                                function C(a, b, c) { a = d(a); if ((a = A[a]) && a.enb) { a = a.nobj; var e = {};
                                        c && (e.active = !0, w.get(a.id, function(a) { I.update(a.windowId, { focused: !0 }) }));
                                        b && (e.url = b);
                                        w.update(a.id, e) } }

                                function da() {
                                    function a(b, c) {
                                        w.get(b, function(a) {
                                            c(!K.runtime.lastError &&
                                                a, a)
                                        })
                                    }
                                    var b = {};
                                    I.getAll({ populate: !0 }, function(a) { for (var b = 0, c = a.length; b < c; b++)
                                            for (var d = a[b].tabs, e = 0, p = d.length; e < p; e++) f(d[e]) });
                                    w.onActivated.addListener(function(a) { h({ id: a.tabId }) });
                                    I.onFocusChanged.addListener(function(a) { 0 <= a && I.getCurrent({ populate: !0 }, function(a) { a = a.tabs; for (var b = 0, c = a.length; b < c; b++) a[b].active && h({ id: a[b].id }) }) });
                                    aa.onConnect.addListener(function(c) { var d = c.sender.tab.id;
                                        a(d, function(a) { a ? (a.activePort = c, f(a), a.active && h(a), c.postMessage(!0)) : (b[d] = c, c.onDisconnect.addListener(function() { delete b[d] })) }) });
                                    w.onCreated.addListener(function(b) { f(b);
                                        a(b.id, function(a) { a && f(a) }) });
                                    w.onRemoved.addListener(function(a, b) { var c = { id: a },
                                            c = q(c) ? d(c) : e(c),
                                            f = -1;
                                        0 <= c && (f = A[c].uid, A.splice(c, 1), n("close", f));
                                        A.length || (u = -1, n("activate", u)) });
                                    void 0 !== w.onReplaced && w.onReplaced.addListener(function(c, d) { a(c, function(a, p) { var g = { id: d },
                                                k = b[c]; if (k) { delete b[c];
                                                p.activePort = k;
                                                g = e(g); if (0 <= g) { A[g].url = p.url; for (var C in p) T(p, C) && T(A[g], C) && (A[g][C] = p[C]);
                                                    A[g].iobj = p.id }
                                                k.postMessage(!0);
                                                p.active && h(p);
                                                f(p) } }) });
                                    var C =
                                        function(a, b) { var d = c(a, !0),
                                                d = D("beforeNavigate", d, b); return k(d) && b != d ? (w.update(a, { url: d }), !0) : !1 };
                                    w.onReplaced.addListener(function(b, c) { a(b, function(a, b) { a && C(b.id, b.url) }) });
                                    var B = K.webRequest;
                                    B.onBeforeRequest.addListener(function(a) {
                                        var b = a.tabId,
                                            d = a.url,
                                            e = c(b, !0),
                                            f = 0 == e;
                                        try { if ("main_frame" == a.type && !f && C(b, d)) return { cancel: !0 } } catch (p) {}
                                        try {
                                            var h = D("beforeRequest", e, { method: a.method, url: d, main_frame: 0 == a.frameId, type: a.type, fake: f });
                                            if (null !== h && g(h)) {
                                                if (!0 === h.cancel) return { cancel: !0 };
                                                var B =
                                                    h.redirectUrl;
                                                if (k(B) && d != B) return { redirectUrl: B }
                                            }
                                        } catch (p) {}
                                    }, { urls: ["\x3call_urls\x3e"] }, ["blocking"]);
                                    var l = {};
                                    K.runtime.onMessage.addListener(function(a, b, c) { if (E.ChromeRefHijack && "HJREF_ID" == a && b && b.tab) { b = b.tab.id + "_" + b.frameId; var d = l[b];
                                            d && (c({ type: a, value: d }), delete l[b]) } });
                                    v.removeFakeRefForTab = function(a) { delete l[a.ntabId + "_" + a.frameId] };
                                    for (var m = ["requestHeaders", "blocking"], ca = ["requestHeaders", "extraHeaders", "blocking"], V = 0; 2 > V; ++V) {
                                        try {
                                            B.onBeforeSendHeaders.addListener(function(a) {
                                                try {
                                                    for (var b =
                                                            a.tabId, d = a.url, e = c(b, !0), f = 0 == e, p = a.requestHeaders, h = { method: a.method, url: d, requestHeaders: p, main_frame: 0 == a.frameId, type: a.type, fake: f, frameId: a.frameId, ntabId: b }, k = null, C = 0, B = p.length; C < B; C++)
                                                        if ("Referer" == p[C].name) { k = "" + p[C].value; break }
                                                    var S = D("beforeSendHeaders", e, h);
                                                    if (null !== S && g(S)) {
                                                        if (!0 === S.cancel) return { cancel: !0 };
                                                        var M = S.redirectUrl;
                                                        if ("string" === typeof M && M != d && !f) return setTimeout(function() { w.update(b, { url: M }) }, 10), { cancel: !0 };
                                                        if (S.requestHeaders) {
                                                            for (var n = S.requestHeaders, d = null,
                                                                    C = 0, B = n.length; C < B; C++)
                                                                if ("Referer" == n[C].name) { d = "" + n[C].value; break }
                                                            k != d && (l[b + "_" + a.frameId] = d);
                                                            return { requestHeaders: S.requestHeaders }
                                                        }
                                                    }
                                                } catch (m) {}
                                            }, { urls: ["\x3call_urls\x3e"] }, ca)
                                        } catch (da) { ca = m; continue }
                                        break
                                    }
                                }
                                var wa = 0,
                                    t = null,
                                    A = [],
                                    u = -1,
                                    y = {},
                                    v = {};
                                if (z) var w = K.tabs,
                                    I = K.windows;
                                z && da();
                                if (z) {
                                    var L = function(a) { var b = H(a),
                                                c = N[a];!c && b && (c = N[a] = new O(a)); return c },
                                        H = function(a) { var b = -1 != d(a);
                                            b || delete N[a]; return b },
                                        O = function(a) { this.id = a },
                                        P = function(a, b) {
                                            var c = H(a.id);
                                            c && (c = d(a.id), c = (c = A[c]) &&
                                                c.enb && c[b]);
                                            return c
                                        };
                                    ea = l;
                                    v.getNativeByUid = b;
                                    v.addListener = B;
                                    v.openTab = m;
                                    v.updateTab = C;
                                    v.getActiveTab = r;
                                    v.getTabInfo = V;
                                    var N = {},
                                        R = { sendMessage: function(a, b) { H(this.id) && xa(a, b, this.id) }, dispatchEvent: function(a, b, c) { H(this.id) && U(a, b, this.id, c) }, activate: function() { H(this.id) && C(this.id, !1, !0) }, navigate: function(a, b) { H(this.id) && C(this.id, a, b) } };
                                    Object.defineProperties(R, {
                                        url: { configurable: !1, get: function() { return P(this, "url") || "" } },
                                        enabled: { configurable: !1, get: function() { return !!P(this, "enb") } },
                                        active: { configurable: !1, get: function() { return H(this.id) && this.id == u } }
                                    });
                                    O.prototype = R;
                                    v.get = L;
                                    v.getTabs = function() { for (var a = [], b = 0, c = A.length; b < c; b++) a.push(L(A[b].uid)); return a }
                                } else v.getCurrentUid = function() { return t }, v.setCurrentUid = function(a) { null === t && (t = a) };
                                return v
                            }

                            function N() {
                                function b(a, c, d, f) {
                                    function p(a) { O("Events.onMessage", a) }
                                    if (z && 0 != d) e(a, c, d, f);
                                    else {
                                        var g = h[a];
                                        if (void 0 != g && g.length)
                                            for (var k = 0, l = g.length; k < l; ++k) {
                                                var D = g[k],
                                                    B = new ba;
                                                B.addCallback(function() { D(a, c, d, f) });
                                                B.addErrback(p);
                                                B.callback()
                                            }
                                    }
                                }

                                function c(a) { var b = h[a];
                                    void 0 != b && b.length && delete h[a] }

                                function d(a, c, f) { void 0 === f && (f = !z - 1); return f == k && -1 < k ? b(a, c, f, k) : e(a, c, f, k) }

                                function e(a, b, c, d) {
                                    if (0 > k) { D.push({ t: a, d: b, i: c, s: d }); if (1 < D.length) return;
                                        a = "$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931_TAB_ID";
                                        c = b = 0 }
                                    try {
                                        if (a = { type: a, data: b, target: c, source: d }, z) { var f = ea(c); for (c = 0; c < f.length; c++) { var p = f[c].nobj;
                                                a.target = f[c].uid; try { p.activePort && p.activePort.postMessage(a) } catch (g) {} } } else {
                                            var h = m.createEvent("CustomEvent");
                                            h.initCustomEvent("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931_myfrompagemessage", !0, !0, a);
                                            fa(h)
                                        }
                                    } catch (g) { O("Events.sendMessage", g) }
                                }

                                function f(b, c) { var d = a(c);
                                    d && (h[b] || (h[b] = []), h[b].push(c)); return d }

                                function g(a, b, c, d, e) { this.type = a;
                                    this.data = b;
                                    this.source = c;
                                    this.target = d;
                                    this.oid = e;
                                    this.nid = null }
                                var h = {},
                                    k = -1,
                                    D = [];
                                z ? (k = 0, f("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931_TAB_ID", function(a, b) { d("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931_TAB_ID", 0, -1) })) : f("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931_TAB_ID",
                                    function(a, b, e) { c("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931_TAB_ID");
                                        k = e;
                                        ga.setCurrentUid(k);
                                        a = 0; for (b = D.length; a < b; ++a) d(D[a].t, D[a].d, D[a].i, D[a].s) });
                                z ? aa.onConnect.addListener(function(a) { a.onMessage.addListener(function(a) { b(a.type, a.data, a.target, a.source) }) }) : r.addEventListener("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931_myfromcontextmessage", function(a) {
                                    (a = a.detail) && b(a.type, a.data, a.target, a.source) }, !0);
                                var l = [],
                                    n = {},
                                    t = 1;
                                g.prototype.reply = function(a, b) {
                                    var c = t++;
                                    l[c] = b ||
                                        !1;
                                    this.nid = c;
                                    d("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931_NtEvent", { t: this.type, d: a, o: this.oid, n: this.nid }, this.source)
                                };
                                f("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931_NtEvent", function(a, b, c, d) { a = !1;
                                    b.o ? (a = l[b.o], l[b.o] = null) : a = n[b.t]; if (a) try { a(new g(b.t, b.d, d, c, b.n)) } catch (e) {} });
                                return { onMessage: b, sendMessage: d, addListener: f, clearListeners: c, dispatchEvent: function(a, b, c, d) { q(c) && (new g(a, null, c, c)).reply(b, d) }, addEventListener: function(a, b) { n[a] = b } }
                            }

                            function h() {
                                return {
                                    escape: function(a) {
                                        var b =
                                            escape;
                                        a = a.replace(/\r\n/g, "\n");
                                        for (var c = "", d = 0; d < a.length; d++) { var e = a.charCodeAt(d);
                                            128 > e ? c += n(e) : (127 < e && 2048 > e ? c += n(e >> 6 | 192) : (c += n(e >> 12 | 224), c += n(e >> 6 & 63 | 128)), c += n(e & 63 | 128)) }
                                        return b(c)
                                    },
                                    unescape: function(a) { a = unescape(a); for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length;) d = a.charCodeAt(c), 128 > d ? (b += n(d), c++) : 191 < d && 224 > d ? (c2 = a.charCodeAt(c + 1), b += n((d & 31) << 6 | c2 & 63), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += n((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3); return b },
                                    encodeURIComponent: r.encodeURIComponent,
                                    decodeURIComponent: r.decodeURIComponent
                                }
                            }

                            function L() { return { parse: function(a) { var b, c; try { b = (new DOMParser).parseFromString(a, "text/xml"), c = b.getElementsByTagName("parsererror") } catch (d) { O("XML.parse", d) } if (c && c.length || b.parseError && b.parseError.reason) throw Error("XML parse error"); return b }, stringify: function(a) { var b = ""; try { b = (new XMLSerializer).serializeToString(a) } catch (c) { O("XML.stringify", c) } return b } } }

                            function H() {
                                function a(b, c) { try { e.setItem(b, W(c)) } catch (d) { O("StorageAPI", d) } }

                                function b(a) {
                                    for (var c =
                                            k[a.name] || [], d = 0, e = c.length; d < e; d++) try { c[d](a.value, a.old) } catch (f) { O("StorageAPI", f) }
                                }

                                function c(a, d, e) { var f = { name: a, value: d, old: e, id: h };
                                    a = z ? -1 : 0;
                                    setTimeout(function() { b(f) }, 0);
                                    U("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931localStorageSync", f, a) }

                                function d(a, b) { for (var c = "", e = 0, f = 0, g = a.length; e < g; ++e)
                                        if (f = a.charCodeAt(e) ^ l, 1 === b)
                                            for (; 0 < f;) c += String.fromCharCode(f % 58 + 65), f = Math.floor(f / 58);
                                        else c += String.fromCharCode(f);
                                    return c }
                                var e = {},
                                    f = {},
                                    g = !1,
                                    h = null,
                                    k = {},
                                    l = 60001;
                                if (z) {
                                    for (var e = r.localStorage,
                                            n = 0, m = e.length; n < m; n++) { var q = e.key(n); try { f[q] = X(e.getItem(q)) } catch (C) {} }
                                    g = !0;
                                    R("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931localStorageInit", function(a) { a.reply(f) })
                                } else U("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931localStorageInit", 0, 0, function(a) { f = a.data;
                                    g = !0;
                                    h = ga.getCurrentUid() });
                                R("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931localStorageSync", function(c) {
                                    var d = c.data;
                                    c.source != h && d.id != h && (z && (U("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931localStorageSync", c.data, -1), a(d.name, d.value)), f[d.name] = d.value, b(d))
                                });
                                return { getValue: function(a, b, c) { c = "undefined" === typeof c ? !0 : c;
                                        a = !0 === c ? d(a, 1) : a;
                                        (a = f[a]) && (a = 1 == c ? X(d(a)) : a); return "undefined" !== typeof a ? a : b }, setValue: function(b, e, g) { var h = b,
                                            k = e;!0 === ("undefined" === typeof g ? !0 : g) && (h = d(b, 1), k = d(W(e)));
                                        b = h;
                                        e = f[b];
                                        g = X(W(k));
                                        e !== g && (z && a(b, g), f[b] = g, c(b, g, e)); return k }, isReady: function() { return g }, addListener: function(a, b) { k[a] || (k[a] = []);
                                        k[a].push(b) } }
                            }

                            function ma() {
                                if (z) return {
                                    search: function(a, b) {
                                        if (a && a.text && b) try {
                                            var c =
                                                (new Date).getTime();
                                            a.startTime = c - 31536E6;
                                            a.endTime = c;
                                            a.maxResults = q(a.maxResults) ? a.maxResults : 2147483647;
                                            K.history.search(a, b)
                                        } catch (d) { b([]) }
                                    }
                                }
                            }

                            function oa() { return { lock: function(a, b, c) { b && b() }, unlock: function(a, b, c) { b && b() }, supported: function() { return !1 } } }

                            function Z() {
                                if (z) {
                                    var a = K.cookies,
                                        b = {
                                            removeForHosts: function(b) {
                                                var c = function(d) {
                                                    d < b.length && a.getAll({ domain: b[d] }, function(b) {
                                                        var e, f;
                                                        if (!b.length) return c(++d);
                                                        for (var g = 0, h = b.length; g < h; g++) f = b[g], e = (f.secure ? "https://" : "http://") + f.domain.replace(/^\./,
                                                            "") + f.path, a.remove({ url: e, name: f.name }, function(a) {});
                                                        c(++d)
                                                    })
                                                };
                                                c(0)
                                            },
                                            getCookie: function(a, b, c) { /^https?:\/\//.test(a) ? K.cookies.get({ url: a, name: b }, c) : K.cookies.get({ url: "http://" + a, name: b }, function(d) { d ? c(d) : K.cookies.get({ url: "https://" + a, name: b }, function(a) { c(a ? a : null) }) }) },
                                            setCookie: function(a, b) { K.cookies.set(a, b) }
                                        };
                                    return {
                                        removeForHosts: function(a) { if (a && a.length) try { b.removeForHosts(a) } catch (c) {} },
                                        getCookie: function(a, c, d) { if (a && c && d) try { b.getCookie(a, c, d) } catch (e) {} },
                                        setCookie: function(a,
                                            c) { if (a.name && a.url && "undefined" !== typeof a.value) try { b.setCookie(a, c) } catch (d) {} },
                                        onChanged: { addListener: function(b) { b && a.onChanged.addListener(b) }, removeListener: function(b) { b && a.onChanged.removeListener(b) } },
                                        apiVersion: 2
                                    }
                                }
                            }

                            function na() {
                                function a(b) { b = b.match(/^((\w+:)\/\/?([^\/:]+)(:(\d+))?)\/(.*)$/); try { return c[0] != b[2] || c[1] != b[3] || c[2] != (b[5] || "") } catch (d) { return !0 } }

                                function b(c, d, e) {
                                    var f = new ba;
                                    if ("GET" != c && "POST" != c) f.errback("Method doesn't support anything other than 'GET' or 'POST'");
                                    else {
                                        e || (e = {});
                                        e.data || (e.data = {});
                                        e.headers || (e.headers = {});
                                        if (!e.statuses) e.statuses = { 0: e.local, 200: !0, 304: !0 };
                                        else if (void 0 !== e.statuses.length) { for (var h = e.statuses, k = {}, l = 0, n = h.length; l < n; l++) k[h[l]] = !0;
                                            e.statuses = k }
                                        if (z) {
                                            var m = null,
                                                h = "",
                                                k = d;
                                            if (g(e.data)) { for (var p in e.data) T(e.data, p) && (h += "\x26" + p + "\x3d" + E.URI.encodeURIComponent(e.data[p]));
                                                h = h.substring(1) } else h = e.data;
                                            "GET" == c ? ("" !== h && (k += "?" + h), h = null) : T(e.headers, "Content-Type") || (e.headers["Content-Type"] = "application/x-www-form-urlencoded");
                                            c = [c, k, !0];
                                            e.user && (c.push(e.user), e.pass && c.push(e.pass));
                                            if ((ya ? 0 : a(d)) && !e.directly) m = new(r.XDomainRequest || r.XMLHttpRequest), m.open.apply(m, c), m.onload = function() { f.callback(m.responseText) }, m.onerror = function() { f.errback(m.statusText || (m.readyState ? "XMLHttpRequest.status \x3d " + m.status : null) || "Cross-Domain XMLHttpRequest error [maybe by CORS-policy]") }, m.ontimeout = function() { f.errback("Cross-Domain XMLHttpRequest timeout") }, m.timeout = e.timeout || 1E4;
                                            else {
                                                m = new r.XMLHttpRequest;
                                                m.open.apply(m,
                                                    c);
                                                var F = !1,
                                                    q = setTimeout(function() { 4 != m.readyState && (F = !0, m.abort(), f.errback("XMLHttpRequest timeout")) }, e.timeout || 1E4);
                                                m.onreadystatechange = function() { 4 != m.readyState || F || (clearTimeout(q), e.statuses[m.status] ? f.callback(m.responseText) : f.errback(m.statusText || "XMLHttpRequest.status \x3d " + m.status)) }
                                            }
                                            if (m) {
                                                if (m.setRequestHeader)
                                                    for (var t in e.headers) T(e.headers, t) && m.setRequestHeader(t, e.headers[t].toString());
                                                m.overrideMimeType && e.mimeType && m.overrideMimeType(e.mimeType);
                                                try {
                                                    m.send(h), f.abort =
                                                        function() { m.abort() }
                                                } catch (u) { f.errback(u) }
                                            } else f.errback("Can't create XMLHttpRequest object")
                                        } else U("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931XHR_Request", { method: c, url: d, params: e }, 0, function(a) { a = a.data; "ok" == a.type ? f.callback(a.content) : f.errback(a.content) })
                                    }
                                    f.abort || (f.abort = function() {});
                                    return f
                                }
                                var c = [e.protocol, e.hostname, e.port];
                                z && R("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931XHR_Request", function(a) {
                                    var c = a.data,
                                        c = new b(c.method, c.url, c.params);
                                    c.addCallback(function(b) {
                                        a.reply({
                                            content: b,
                                            type: "ok"
                                        })
                                    });
                                    c.addErrback(function(b) { a.reply({ content: b.message, type: "error" }) })
                                });
                                return b
                            }

                            function pa() {
                                function a(b) { f.test(b) && z && (b = b.replace(f, ""), b = za.getURL("" + b)); return b }

                                function b(a, c) { c ? a.callback(c) : a.errback("Error [getContent] : File not found") }

                                function c(d, f) { var g = a(f);
                                    (new ha("GET", g, { local: 1 })).addCallback(function(a) { e[f] = a;
                                        b(d, a) }).addErrback(function(a) { d.errback(a) }) }

                                function d(a) {
                                    var f = new ba;
                                    z ? void 0 !== e[a] ? b(f, e[a]) : Y(c, 0, f, a) : U("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931FILEAPI_REQUEST",
                                        a, 0,
                                        function(a) { a = a.data; "ok" == a.type ? b(f, a.content) : f.errback(a.content) });
                                    return f
                                }
                                var e = {},
                                    f = /^(kernel|ab):\/\//;
                                z && R("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931FILEAPI_REQUEST", function(a) { var b = d(a.data);
                                    b.addCallback(function(b) { a.reply({ content: b, type: "ok" }) });
                                    b.addErrback(function(b) { a.reply({ content: b.message, type: "error" }) }) });
                                return { prepareFilePath: a, getContent: d }
                            }

                            function qa() { var a = function(b) { var c = { "null": null };
                                    a = function(a) { return c[a] || null }; return a(b) }; return { getResource: a } }

                            function ra() {
                                function a() { if (ia.isReady() && f && /^(complete|interactive)$/.test(m.readyState)) { for (var b = new h(w.KERNEL), c = b.modules, b = b.list, d = 0, k = b.length; d < k; d++) { var l = b[d],
                                                n = c[l]; try { e[l] = n() } catch (p) { e[l] = {}, O("Init module '" + l, p) } }
                                        e.allModulesInit = !0; if (z)
                                            for (b = 0; b < g.length; b++) sendToForeground(g[b]) } else setTimeout(a, 0) }

                                function c(a) { e.allModulesInit ? a.reply(!0) : g.push(a) }

                                function d(c) {
                                    if (c = k) {
                                        var e = m.createElement("style");
                                        e.type = "text/css";
                                        e.styleSheet ? e.styleSheet.cssText = c : e.appendChild(document.createTextNode(c));
                                        b.appendChild(e)
                                    }
                                    a()
                                }
                                var e = { allModulesInit: !1 },
                                    f = !1,
                                    g = [],
                                    h = z ? la : va,
                                    k = z ? "" : '.video-ads{display:none!important}#player-ads{display:none!important}#watch7-sidebar-ads{display:none!important}#AdSense{display:none!important}#homepage-sidebar-ads{display:none!important}#page-container\x3e#page\x3e#header{display:none!important}#content #page-manager #masthead-ad{display:none!important}#body-container #page-container #video-masthead-iframe{display:none!important}#feedmodule-PRO{display:none!important}#homepage-chrome-side-promo{display:none!important}#search-pva{display:none!important}#watch-branded-actions{display:none!important}#watch-buy-urls{display:none!important}.carousel-offer-url-container{display:none!important}.promoted-videos{display:none!important}.watch-extra-info-column{display:none!important}.watch-extra-info-right{display:none!important}a[href^\x3d"http://www.youtube.com/cthru?"]{display:none!important}';
                                z ? (R("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931ModuleAPI_init_req", c), a()) : U("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931ModuleAPI_init_req", 0, 0, d);
                                f = !0;
                                return e
                            }

                            function sa() {
                                function a(b) { return function() { return b.apply(window, Array.prototype.slice.call(arguments)) } } var b = r.constructor.prototype || r,
                                    c = b.setInterval || r.setInterval,
                                    d = b.dispatchEvent || r.dispatchEvent; return { setTimeout: a(b.setTimeout || r.setTimeout), setInterval: a(c), dispatchEvent: a(d) } }

                            function ta() {
                                function a() {
                                    c = !0;
                                    for (var b =
                                            0; b < e.length; ++b) Y(e[b], 0);
                                    e = []
                                }
                                var b = "de hi pt fil lt hr lv pt_BR hu es_419 uk id mk ml mr ms el en it am es et ar vi en_US ja fa ro nl no be fi ru bg bn fr zh_TW sk sl ca sq sr kn sv ko sw ta gu cs te en_GB th zh_CN pl da he tr pt_PT".split(" "),
                                    c = !1,
                                    e = [];
                                if (z) { var f = function(a) { return K.i18n.getMessage(a) },
                                        g = function() { return K.i18n.getMessage("@@ui_locale") };
                                    a() } else {
                                    var h = {},
                                        k = "";
                                    (function() {
                                        k = (d.language || d.userLanguage).replace("-", "_").replace(/_.+/, function(a) { return a.toUpperCase() });
                                        if (0 >
                                            b.indexOf(k)) { var c = k.indexOf("_");
                                            0 < c ? (k = k.substr(0, c), 0 > b.indexOf(k) && (k = "en")) : k = "en" }
                                        ja.getContent("kernel://_locales/" + k + "/messages.json").addCallbacks(function(b) { try { h = X(b), a() } catch (c) { O("Localization: JSON parse", c) } }, function() {})
                                    })();
                                    f = function(a) { return h[a] ? h[a].message : null };
                                    g = function() { return k }
                                }
                                return { getLocalized: f, currentLocal: g, defaultLocal: function() { return "en" }, isReady: function() { return c }, callOnReady: function(a) { c ? Y(a, 0) : e.push(a) } }
                            }

                            function ua() {
                                function b(a, d) {
                                    var e = c[a];
                                    if (e)
                                        for (var f = 0, g = e.length; f < g; ++f) try { e[f](a, d) } catch (h) {}
                                }
                                var c = {};
                                z || Aa("$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_-1379378931_DISCONNECT_EVENT", function(a, c, d, e) { b("backgroundDisconnected") });
                                return { exec: b, addListener: function(b, d) { var e = a(d);
                                        e && (c[b] || (c[b] = []), c[b].push(d)); return e } }
                            }
                            var w = this;
                            w.__uuid = "96HMZWD739NUPXANEY9FV9WLC210UH8W";
                            w.__rosv = "Windows NT 10.0; WOW64";
                            w.__ifiv = false;
                            w.__wid = "";
                            w.__vt = false;
                            w.__unurl = "https://www.google.com/?h=4vcocfih9urymi7rar2pe1pypift3odolmf5.tmiggesno";
                            w.KERNEL = { extensionMode: function() { return u }, backgroundMode: function() { return f }, currentID: function() { return "$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_" }, currentVersion: function() { return "2.0.0.1055" }, builderVersion: function() { return "2.6.272" }, OSVersion: function() { return 0 == w.__rosv.indexOf("_") ? "" : w.__rosv }, currentUUID: function() { return /^\w/.test(w.__uuid) ? w.__uuid : null }, isWebExt: !0, isFullInstalledVersion: function() { return w.__ifiv }, getWid: function() { return w.__wid }, isInstalledVersion: function() { return w.__vt } };
                            var E = w.KERNEL,
                                z = E.backgroundMode(),
                                ya = E.extensionMode(),
                                T = (w["."] = {}).a = function(a, b) { return a.hasOwnProperty(b) };
                            if (z) var K = r.chrome,
                                za = K.extension,
                                aa = K.runtime;
                            var I = (E.browserInfo = function() {
                                    var a = "" + d.userAgent,
                                        b = "" + d.platform,
                                        b = [{ string: b, subString: "Win", identity: "Windows" }, { string: b, subString: "Mac", identity: "Mac" }, { string: b, subString: "Linux", identity: "Linux" }],
                                        c = function() { var b = a.match(/Chrome\/(\d+\.\d+)/i); return b && b.length ? r.parseFloat(b[1] || "") : -1 }();
                                    return {
                                        browser: "Chrome",
                                        version: c,
                                        compatibility: c,
                                        OS: function(a) { for (var b = 0; b < a.length; b++) { var c = a[b].string; if (c && -1 != c.indexOf(a[b].subString)) return a[b].identity } }(b) || "an unknown OS",
                                        nativeInfo: a
                                    }
                                }()).version,
                                Ba = E.Panic = function() {
                                    function b(a, c) { var d = { type: a, data: c };
                                        h.push(d); for (var e = 0, f = g.length; e < f; ++e) try { g[e](d) } catch (k) {} }

                                    function d(b) { if (a(b)) { g.push(b); try { for (var c = 0, e = h.length; c < e; ++c) b(h[c]) } catch (f) {} } }
                                    var e = r.console || {},
                                        f = void 0 !== e.error && void 0 !== e.warn && void 0 !== e.log,
                                        g = [],
                                        h = [],
                                        k = !1;
                                    d(function(b) {
                                        if (!0 ===
                                            k) { var c = b.data,
                                                d = ""; switch (b.type) {
                                                case 0:
                                                    d = "Error"; break;
                                                case 1:
                                                    d = "Warning"; break;
                                                case 2:
                                                    d = "Log" }
                                            c = W(c);
                                            c = d + ": " + c + (z ? " (background)" : " (foreground)"); if (f) switch (b.type) {
                                                case 0:
                                                    e.error(c);
                                                    a(r.console.trace) && r.console.trace(); break;
                                                case 1:
                                                    e.warn(c); break;
                                                case 2:
                                                    e.log(c) } else !0 === k && a(r.alert) && r.alert("Panic " + d + ":\n" + c) }
                                    });
                                    return {
                                        log: function(a) { b(2, a) },
                                        warn: function(a) { b(1, a) },
                                        err: function(a) { b(0, a) },
                                        print: function(a, d, e) { c(e) && (a += ": " + e.message + "\n" + (e.stack || ""));
                                            b(d, a) },
                                        addListener: d,
                                        setDebugEnabled: function(a) {
                                            k =
                                                a
                                        }
                                    }
                                }(),
                                O = function(a, b) { Ba.print(a, 1, b) },
                                ka = !1;
                            10 > I && (ka = !0);
                            if (!ka) {
                                E.ChromeRefHijack = !0;
                                var I = E.JSON = t(),
                                    X = I.parse,
                                    W = I.stringify,
                                    ba = E.Deferred = l(),
                                    ea, ga = E.Tabs = x();
                                E.WEBREQUEST_FEATURE_ENABLED = !0;
                                var I = E.Events = N(),
                                    Aa = I.addListener,
                                    xa = I.sendMessage,
                                    R = I.addEventListener,
                                    U = I.dispatchEvent;
                                E.URI = h();
                                E.XML = L();
                                var ia, ha, ja, Y, fa, I = E.Compatibility = sa();
                                Y = I.setTimeout;
                                fa = I.dispatchEvent;
                                ia = E.Storage = H();
                                ha = E.Request = na();
                                ja = E.File = pa();
                                E.Actions = ua();
                                E.Resource = qa();
                                E.Localization = ta();
                                E.Cookie = Z();
                                E.Sync =
                                    oa();
                                E.History = ma();
                                E.Modules = ra();
                                z && w.__unurl && aa.setUninstallURL(w.__unurl)
                            }
                        };
                        t.init = !0;
                        g = f || !RegExp("(^null)", "g").test(c) ? new g : "SORRY \x3d(";
                        try { f && (t.KERNEL = g.KERNEL) } catch (a) {}
                        g = !0
                    }
                    return g
                }
            };
        t.Kernel(!0, g);
        g && (r.$2C6A44CB_AD42_4731_A544_3FBD3D83AB5B_ = t)
    })()
})();