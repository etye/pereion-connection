/*
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corp. 2017
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 * @version 5.4.1.1813
 * @flags w3c,NDEBUG
 */
/* pako 1.0.4 nodeca/pako with Dojo/AMD/RequireJS Fix */
! function(b) {
    if ("object" == typeof exports && "undefined" != typeof module) {
        module.exports = b()
    } else {
        var a;
        a = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, a.pako = b()
    }
}(function() {
    return function a(c, b, f) {
        function g(m, i) {
            if (!b[m]) {
                if (!c[m]) {
                    var j = "function" == typeof require && require;
                    if (!i && j) {
                        return j(m, !0)
                    }
                    if (d) {
                        return d(m, !0)
                    }
                    var k = new Error("Cannot find module '" + m + "'");
                    throw k.code = "MODULE_NOT_FOUND", k
                }
                var e = b[m] = {
                    exports: {}
                };
                c[m][0].call(e.exports, function(n) {
                    var l = c[m][1][n];
                    return g(l ? l : n)
                }, e, e.exports, a, c, b, f)
            }
            return b[m].exports
        }
        for (var d = "function" == typeof require && require, h = 0; h < f.length; h++) {
            g(f[h])
        }
        return g
    }({
        1: [function(h, c, b) {
            var f = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
            b.assign = function(l) {
                for (var j = Array.prototype.slice.call(arguments, 1); j.length;) {
                    var i = j.shift();
                    if (i) {
                        if ("object" != typeof i) {
                            throw new TypeError(i + "must be non-object")
                        }
                        for (var k in i) {
                            i.hasOwnProperty(k) && (l[k] = i[k])
                        }
                    }
                }
                return l
            }, b.shrinkBuf = function(j, i) {
                return j.length === i ? j : j.subarray ? j.subarray(0, i) : (j.length = i, j)
            };
            var g = {
                    arraySet: function(p, k, j, m, o) {
                        if (k.subarray && p.subarray) {
                            return void p.set(k.subarray(j, j + m), o)
                        }
                        for (var l = 0; l < m; l++) {
                            p[o + l] = k[j + l]
                        }
                    },
                    flattenChunks: function(q) {
                        var k, j, m, o, l, p;
                        for (m = 0, k = 0, j = q.length; k < j; k++) {
                            m += q[k].length
                        }
                        for (p = new Uint8Array(m), o = 0, k = 0, j = q.length; k < j; k++) {
                            l = q[k], p.set(l, o), o += l.length
                        }
                        return p
                    }
                },
                d = {
                    arraySet: function(p, k, j, m, o) {
                        for (var l = 0; l < m; l++) {
                            p[o + l] = k[j + l]
                        }
                    },
                    flattenChunks: function(e) {
                        return [].concat.apply([], e)
                    }
                };
            b.setTyped = function(e) {
                e ? (b.Buf8 = Uint8Array, b.Buf16 = Uint16Array, b.Buf32 = Int32Array, b.assign(b, g)) : (b.Buf8 = Array, b.Buf16 = Array, b.Buf32 = Array, b.assign(b, d))
            }, b.setTyped(f)
        }, {}],
        2: [function(o, c, b) {
            function j(p, i) {
                if (i < 65537 && (p.subarray && m || !p.subarray && f)) {
                    return String.fromCharCode.apply(null, k.shrinkBuf(p, i))
                }
                for (var h = "", l = 0; l < i; l++) {
                    h += String.fromCharCode(p[l])
                }
                return h
            }
            var k = o("./common"),
                f = !0,
                m = !0;
            try {
                String.fromCharCode.apply(null, [0])
            } catch (o) {
                f = !1
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (o) {
                m = !1
            }
            for (var d = new k.Buf8(256), g = 0; g < 256; g++) {
                d[g] = g >= 252 ? 6 : g >= 248 ? 5 : g >= 240 ? 4 : g >= 224 ? 3 : g >= 192 ? 2 : 1
            }
            d[254] = d[254] = 1, b.string2buf = function(y) {
                var q, p, w, u, x, r = y.length,
                    v = 0;
                for (u = 0; u < r; u++) {
                    p = y.charCodeAt(u), 55296 === (64512 & p) && u + 1 < r && (w = y.charCodeAt(u + 1), 56320 === (64512 & w) && (p = 65536 + (p - 55296 << 10) + (w - 56320), u++)), v += p < 128 ? 1 : p < 2048 ? 2 : p < 65536 ? 3 : 4
                }
                for (q = new k.Buf8(v), x = 0, u = 0; x < v; u++) {
                    p = y.charCodeAt(u), 55296 === (64512 & p) && u + 1 < r && (w = y.charCodeAt(u + 1), 56320 === (64512 & w) && (p = 65536 + (p - 55296 << 10) + (w - 56320), u++)), p < 128 ? q[x++] = p : p < 2048 ? (q[x++] = 192 | p >>> 6, q[x++] = 128 | 63 & p) : p < 65536 ? (q[x++] = 224 | p >>> 12, q[x++] = 128 | p >>> 6 & 63, q[x++] = 128 | 63 & p) : (q[x++] = 240 | p >>> 18, q[x++] = 128 | p >>> 12 & 63, q[x++] = 128 | p >>> 6 & 63, q[x++] = 128 | 63 & p)
                }
                return q
            }, b.buf2binstring = function(e) {
                return j(e, e.length)
            }, b.binstring2buf = function(p) {
                for (var i = new k.Buf8(p.length), h = 0, l = i.length; h < l; h++) {
                    i[h] = p.charCodeAt(h)
                }
                return i
            }, b.buf2string = function(x, n) {
                var h, v, p, w, q = n || x.length,
                    u = new Array(2 * q);
                for (v = 0, h = 0; h < q;) {
                    if (p = x[h++], p < 128) {
                        u[v++] = p
                    } else {
                        if (w = d[p], w > 4) {
                            u[v++] = 65533, h += w - 1
                        } else {
                            for (p &= 2 === w ? 31 : 3 === w ? 15 : 7; w > 1 && h < q;) {
                                p = p << 6 | 63 & x[h++], w--
                            }
                            w > 1 ? u[v++] = 65533 : p < 65536 ? u[v++] = p : (p -= 65536, u[v++] = 55296 | p >> 10 & 1023, u[v++] = 56320 | 1023 & p)
                        }
                    }
                }
                return j(u, v)
            }, b.utf8border = function(l, i) {
                var h;
                for (i = i || l.length, i > l.length && (i = l.length), h = i - 1; h >= 0 && 128 === (192 & l[h]);) {
                    h--
                }
                return h < 0 ? i : 0 === h ? i : h + d[l[h]] > i ? h : i
            }
        }, {
            "./common": 1
        }],
        3: [function(f, c, b) {
            function d(o, h, g, k) {
                for (var l = 65535 & o | 0, j = o >>> 16 & 65535 | 0, m = 0; 0 !== g;) {
                    m = g > 2000 ? 2000 : g, g -= m;
                    do {
                        l = l + h[k++] | 0, j = j + l | 0
                    } while (--m);
                    l %= 65521, j %= 65521
                }
                return l | j << 16 | 0
            }
            c.exports = d
        }, {}],
        4: [function(h, c, b) {
            function f() {
                for (var l, j = [], i = 0; i < 256; i++) {
                    l = i;
                    for (var k = 0; k < 8; k++) {
                        l = 1 & l ? 3988292384 ^ l >>> 1 : l >>> 1
                    }
                    j[i] = l
                }
                return j
            }

            function g(p, j, i, l) {
                var m = d,
                    o = l + i;
                p ^= -1;
                for (var k = l; k < o; k++) {
                    p = p >>> 8 ^ m[255 & (p ^ j[k])]
                }
                return p ^ -1
            }
            var d = f();
            c.exports = g
        }, {}],
        5: [function(a8, ap, ad) {
            function aR(c, b) {
                return c.msg = aV[b], b
            }

            function a2(b) {
                return (b << 1) - (b > 4 ? 9 : 0)
            }

            function aD(c) {
                for (var b = c.length; --b >= 0;) {
                    c[b] = 0
                }
            }

            function a5(d) {
                var c = d.state,
                    b = c.pending;
                b > d.avail_out && (b = d.avail_out), 0 !== b && (aG.arraySet(d.output, c.pending_buf, c.pending_out, b, d.next_out), d.next_out += b, c.pending_out += b, d.total_out += b, d.avail_out -= b, c.pending -= b, 0 === c.pending && (c.pending_out = 0))
            }

            function aA(c, b) {
                bc._tr_flush_block(c, c.block_start >= 0 ? c.block_start : -1, c.strstart - c.block_start, b), c.block_start = c.strstart, a5(c.strm)
            }

            function aL(c, b) {
                c.pending_buf[c.pending++] = b
            }

            function aU(c, b) {
                c.pending_buf[c.pending++] = b >>> 8 & 255, c.pending_buf[c.pending++] = 255 & b
            }

            function ab(g, c, b, d) {
                var f = g.avail_in;
                return f > d && (f = d), 0 === f ? 0 : (g.avail_in -= f, aG.arraySet(c, g.input, g.next_in, f, b), 1 === g.state.wrap ? g.adler = an(g.adler, c, f, b) : 2 === g.state.wrap && (g.adler = aE(g.adler, c, f, b)), g.next_in += f, g.total_in += f, f)
            }

            function am(B, m) {
                var g, x, z = B.max_chain_length,
                    v = B.strstart,
                    A = B.prev_length,
                    q = B.nice_match,
                    w = B.strstart > B.w_size - ao ? B.strstart - (B.w_size - ao) : 0,
                    y = B.window,
                    b = B.w_mask,
                    k = B.prev,
                    C = B.strstart + ac,
                    p = y[v + A - 1],
                    j = y[v + A];
                B.prev_length >= B.good_match && (z >>= 2), q > B.lookahead && (q = B.lookahead);
                do {
                    if (g = m, y[g + A] === j && y[g + A - 1] === p && y[g] === y[v] && y[++g] === y[v + 1]) {
                        v += 2, g++;
                        do {} while (y[++v] === y[++g] && y[++v] === y[++g] && y[++v] === y[++g] && y[++v] === y[++g] && y[++v] === y[++g] && y[++v] === y[++g] && y[++v] === y[++g] && y[++v] === y[++g] && v < C);
                        if (x = ac - (C - v), v = C - ac, x > A) {
                            if (B.match_start = m, A = x, x >= q) {
                                break
                            }
                            p = y[v + A - 1], j = y[v + A]
                        }
                    }
                } while ((m = k[m & b]) > w && 0 !== --z);
                return A <= B.lookahead ? A : B.lookahead
            }

            function bb(j) {
                var c, b, f, g, d, h = j.w_size;
                do {
                    if (g = j.window_size - j.lookahead - j.strstart, j.strstart >= h + (h - ao)) {
                        aG.arraySet(j.window, j.window, h, h, 0), j.match_start -= h, j.strstart -= h, j.block_start -= h, b = j.hash_size, c = b;
                        do {
                            f = j.head[--c], j.head[c] = f >= h ? f - h : 0
                        } while (--b);
                        b = h, c = b;
                        do {
                            f = j.prev[--c], j.prev[c] = f >= h ? f - h : 0
                        } while (--b);
                        g += h
                    }
                    if (0 === j.strm.avail_in) {
                        break
                    }
                    if (b = ab(j.strm, j.window, j.strstart + j.lookahead, g), j.lookahead += b, j.lookahead + j.insert >= aW) {
                        for (d = j.strstart - j.insert, j.ins_h = j.window[d], j.ins_h = (j.ins_h << j.hash_shift ^ j.window[d + 1]) & j.hash_mask; j.insert && (j.ins_h = (j.ins_h << j.hash_shift ^ j.window[d + aW - 1]) & j.hash_mask, j.prev[d & j.w_mask] = j.head[j.ins_h], j.head[j.ins_h] = d, d++, j.insert--, !(j.lookahead + j.insert < aW));) {}
                    }
                } while (j.lookahead < ao && 0 !== j.strm.avail_in)
            }

            function au(f, c) {
                var b = 65535;
                for (b > f.pending_buf_size - 5 && (b = f.pending_buf_size - 5);;) {
                    if (f.lookahead <= 1) {
                        if (bb(f), 0 === f.lookahead && c === a0) {
                            return bg
                        }
                        if (0 === f.lookahead) {
                            break
                        }
                    }
                    f.strstart += f.lookahead, f.lookahead = 0;
                    var d = f.block_start + b;
                    if ((0 === f.strstart || f.strstart >= d) && (f.lookahead = f.strstart - d, f.strstart = d, aA(f, !1), 0 === f.strm.avail_out)) {
                        return bg
                    }
                    if (f.strstart - f.block_start >= f.w_size - ao && (aA(f, !1), 0 === f.strm.avail_out)) {
                        return bg
                    }
                }
                return f.insert = 0, c === aS ? (aA(f, !0), 0 === f.strm.avail_out ? aK : bs) : f.strstart > f.block_start && (aA(f, !1), 0 === f.strm.avail_out) ? bg : bg
            }

            function aj(f, c) {
                for (var b, d;;) {
                    if (f.lookahead < ao) {
                        if (bb(f), f.lookahead < ao && c === a0) {
                            return bg
                        }
                        if (0 === f.lookahead) {
                            break
                        }
                    }
                    if (b = 0, f.lookahead >= aW && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + aW - 1]) & f.hash_mask, b = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), 0 !== b && f.strstart - b <= f.w_size - ao && (f.match_length = am(f, b)), f.match_length >= aW) {
                        if (d = bc._tr_tally(f, f.strstart - f.match_start, f.match_length - aW), f.lookahead -= f.match_length, f.match_length <= f.max_lazy_match && f.lookahead >= aW) {
                            f.match_length--;
                            do {
                                f.strstart++, f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + aW - 1]) & f.hash_mask, b = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart
                            } while (0 !== --f.match_length);
                            f.strstart++
                        } else {
                            f.strstart += f.match_length, f.match_length = 0, f.ins_h = f.window[f.strstart], f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + 1]) & f.hash_mask
                        }
                    } else {
                        d = bc._tr_tally(f, 0, f.window[f.strstart]), f.lookahead--, f.strstart++
                    }
                    if (d && (aA(f, !1), 0 === f.strm.avail_out)) {
                        return bg
                    }
                }
                return f.insert = f.strstart < aW - 1 ? f.strstart : aW - 1, c === aS ? (aA(f, !0), 0 === f.strm.avail_out ? aK : bs) : f.last_lit && (aA(f, !1), 0 === f.strm.avail_out) ? bg : bp
            }

            function aX(g, c) {
                for (var b, d, f;;) {
                    if (g.lookahead < ao) {
                        if (bb(g), g.lookahead < ao && c === a0) {
                            return bg
                        }
                        if (0 === g.lookahead) {
                            break
                        }
                    }
                    if (b = 0, g.lookahead >= aW && (g.ins_h = (g.ins_h << g.hash_shift ^ g.window[g.strstart + aW - 1]) & g.hash_mask, b = g.prev[g.strstart & g.w_mask] = g.head[g.ins_h], g.head[g.ins_h] = g.strstart), g.prev_length = g.match_length, g.prev_match = g.match_start, g.match_length = aW - 1, 0 !== b && g.prev_length < g.max_lazy_match && g.strstart - b <= g.w_size - ao && (g.match_length = am(g, b), g.match_length <= 5 && (g.strategy === aH || g.match_length === aW && g.strstart - g.match_start > 4096) && (g.match_length = aW - 1)), g.prev_length >= aW && g.match_length <= g.prev_length) {
                        f = g.strstart + g.lookahead - aW, d = bc._tr_tally(g, g.strstart - 1 - g.prev_match, g.prev_length - aW), g.lookahead -= g.prev_length - 1, g.prev_length -= 2;
                        do {
                            ++g.strstart <= f && (g.ins_h = (g.ins_h << g.hash_shift ^ g.window[g.strstart + aW - 1]) & g.hash_mask, b = g.prev[g.strstart & g.w_mask] = g.head[g.ins_h], g.head[g.ins_h] = g.strstart)
                        } while (0 !== --g.prev_length);
                        if (g.match_available = 0, g.match_length = aW - 1, g.strstart++, d && (aA(g, !1), 0 === g.strm.avail_out)) {
                            return bg
                        }
                    } else {
                        if (g.match_available) {
                            if (d = bc._tr_tally(g, 0, g.window[g.strstart - 1]), d && aA(g, !1), g.strstart++, g.lookahead--, 0 === g.strm.avail_out) {
                                return bg
                            }
                        } else {
                            g.match_available = 1, g.strstart++, g.lookahead--
                        }
                    }
                }
                return g.match_available && (d = bc._tr_tally(g, 0, g.window[g.strstart - 1]), g.match_available = 0), g.insert = g.strstart < aW - 1 ? g.strstart : aW - 1, c === aS ? (aA(g, !0), 0 === g.strm.avail_out ? aK : bs) : g.last_lit && (aA(g, !1), 0 === g.strm.avail_out) ? bg : bp
            }

            function ax(j, c) {
                for (var b, f, g, d, h = j.window;;) {
                    if (j.lookahead <= ac) {
                        if (bb(j), j.lookahead <= ac && c === a0) {
                            return bg
                        }
                        if (0 === j.lookahead) {
                            break
                        }
                    }
                    if (j.match_length = 0, j.lookahead >= aW && j.strstart > 0 && (g = j.strstart - 1, f = h[g], f === h[++g] && f === h[++g] && f === h[++g])) {
                        d = j.strstart + ac;
                        do {} while (f === h[++g] && f === h[++g] && f === h[++g] && f === h[++g] && f === h[++g] && f === h[++g] && f === h[++g] && f === h[++g] && g < d);
                        j.match_length = ac - (d - g), j.match_length > j.lookahead && (j.match_length = j.lookahead)
                    }
                    if (j.match_length >= aW ? (b = bc._tr_tally(j, 1, j.match_length - aW), j.lookahead -= j.match_length, j.strstart += j.match_length, j.match_length = 0) : (b = bc._tr_tally(j, 0, j.window[j.strstart]), j.lookahead--, j.strstart++), b && (aA(j, !1), 0 === j.strm.avail_out)) {
                        return bg
                    }
                }
                return j.insert = 0, c === aS ? (aA(j, !0), 0 === j.strm.avail_out ? aK : bs) : j.last_lit && (aA(j, !1), 0 === j.strm.avail_out) ? bg : bp
            }

            function aO(d, c) {
                for (var b;;) {
                    if (0 === d.lookahead && (bb(d), 0 === d.lookahead)) {
                        if (c === a0) {
                            return bg
                        }
                        break
                    }
                    if (d.match_length = 0, b = bc._tr_tally(d, 0, d.window[d.strstart]), d.lookahead--, d.strstart++, b && (aA(d, !1), 0 === d.strm.avail_out)) {
                        return bg
                    }
                }
                return d.insert = 0, c === aS ? (aA(d, !0), 0 === d.strm.avail_out ? aK : bs) : d.last_lit && (aA(d, !1), 0 === d.strm.avail_out) ? bg : bp
            }

            function ag(g, c, b, d, f) {
                this.good_length = g, this.max_lazy = c, this.nice_length = b, this.max_chain = d, this.func = f
            }

            function bh(b) {
                b.window_size = 2 * b.w_size, aD(b.head), b.max_lazy_match = aq[b.level].max_lazy, b.good_match = aq[b.level].good_length, b.nice_match = aq[b.level].nice_length, b.max_chain_length = aq[b.level].max_chain, b.strstart = 0, b.block_start = 0, b.lookahead = 0, b.insert = 0, b.match_length = b.prev_length = aW - 1, b.match_available = 0, b.ins_h = 0
            }

            function be() {
                this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = br, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new aG.Buf16(2 * aC), this.dyn_dtree = new aG.Buf16(2 * (2 * aF + 1)), this.bl_tree = new aG.Buf16(2 * (2 * a7 + 1)), aD(this.dyn_ltree), aD(this.dyn_dtree), aD(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new aG.Buf16(aN + 1), this.heap = new aG.Buf16(2 * a4 + 1), aD(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new aG.Buf16(2 * a4 + 1), aD(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
            }

            function bn(c) {
                var b;
                return c && c.state ? (c.total_in = c.total_out = 0, c.data_type = bo, b = c.state, b.pending = 0, b.pending_out = 0, b.wrap < 0 && (b.wrap = -b.wrap), b.status = b.wrap ? aw : ai, c.adler = 2 === b.wrap ? 0 : 1, b.last_flush = a0, bc._tr_init(b), aB) : aR(c, aJ)
            }

            function aI(c) {
                var b = bn(c);
                return b === aB && bh(c.state), b
            }

            function bq(c, b) {
                return c && c.state ? 2 !== c.state.wrap ? aJ : (c.state.gzhead = b, aB) : aJ
            }

            function bk(m, c, b, j, f, k) {
                if (!m) {
                    return aJ
                }
                var d = 1;
                if (c === ay && (c = 6), j < 0 ? (d = 0, j = -j) : j > 15 && (d = 2, j -= 16), f < 1 || f > aa || b !== br || j < 8 || j > 15 || c < 0 || c > 9 || k < 0 || k > bi) {
                    return aR(m, aJ)
                }
                8 === j && (j = 9);
                var g = new be;
                return m.state = g, g.strm = m, g.wrap = d, g.gzhead = null, g.w_bits = j, g.w_size = 1 << g.w_bits, g.w_mask = g.w_size - 1, g.hash_bits = f + 7, g.hash_size = 1 << g.hash_bits, g.hash_mask = g.hash_size - 1, g.hash_shift = ~~((g.hash_bits + aW - 1) / aW), g.window = new aG.Buf8(2 * g.w_size), g.head = new aG.Buf16(g.hash_size), g.prev = new aG.Buf16(g.w_size), g.lit_bufsize = 1 << f + 6, g.pending_buf_size = 4 * g.lit_bufsize, g.pending_buf = new aG.Buf8(g.pending_buf_size), g.d_buf = 1 * g.lit_bufsize, g.l_buf = 3 * g.lit_bufsize, g.level = c, g.strategy = k, g.method = b, aI(m)
            }

            function ah(c, b) {
                return bk(c, b, br, ba, ar, bl)
            }

            function ae(n, k) {
                var g, m, b, j;
                if (!n || !n.state || k > a3 || k < 0) {
                    return n ? aR(n, aJ) : aJ
                }
                if (m = n.state, !n.output || !n.input && 0 !== n.avail_in || m.status === bj && k !== aS) {
                    return aR(n, 0 === n.avail_out ? aY : aJ)
                }
                if (m.strm = n, g = m.last_flush, m.last_flush = k, m.status === aw) {
                    if (2 === m.wrap) {
                        n.adler = 0, aL(m, 31), aL(m, 139), aL(m, 8), m.gzhead ? (aL(m, (m.gzhead.text ? 1 : 0) + (m.gzhead.hcrc ? 2 : 0) + (m.gzhead.extra ? 4 : 0) + (m.gzhead.name ? 8 : 0) + (m.gzhead.comment ? 16 : 0)), aL(m, 255 & m.gzhead.time), aL(m, m.gzhead.time >> 8 & 255), aL(m, m.gzhead.time >> 16 & 255), aL(m, m.gzhead.time >> 24 & 255), aL(m, 9 === m.level ? 2 : m.strategy >= a1 || m.level < 2 ? 4 : 0), aL(m, 255 & m.gzhead.os), m.gzhead.extra && m.gzhead.extra.length && (aL(m, 255 & m.gzhead.extra.length), aL(m, m.gzhead.extra.length >> 8 & 255)), m.gzhead.hcrc && (n.adler = aE(n.adler, m.pending_buf, m.pending, 0)), m.gzindex = 0, m.status = al) : (aL(m, 0), aL(m, 0), aL(m, 0), aL(m, 0), aL(m, 0), aL(m, 9 === m.level ? 2 : m.strategy >= a1 || m.level < 2 ? 4 : 0), aL(m, bm), m.status = ai)
                    } else {
                        var o = br + (m.w_bits - 8 << 4) << 8,
                            l = -1;
                        l = m.strategy >= a1 || m.level < 2 ? 0 : m.level < 6 ? 1 : 6 === m.level ? 2 : 3, o |= l << 6, 0 !== m.strstart && (o |= bd), o += 31 - o % 31, m.status = ai, aU(m, o), 0 !== m.strstart && (aU(m, n.adler >>> 16), aU(m, 65535 & n.adler)), n.adler = 1
                    }
                }
                if (m.status === al) {
                    if (m.gzhead.extra) {
                        for (b = m.pending; m.gzindex < (65535 & m.gzhead.extra.length) && (m.pending !== m.pending_buf_size || (m.gzhead.hcrc && m.pending > b && (n.adler = aE(n.adler, m.pending_buf, m.pending - b, b)), a5(n), b = m.pending, m.pending !== m.pending_buf_size));) {
                            aL(m, 255 & m.gzhead.extra[m.gzindex]), m.gzindex++
                        }
                        m.gzhead.hcrc && m.pending > b && (n.adler = aE(n.adler, m.pending_buf, m.pending - b, b)), m.gzindex === m.gzhead.extra.length && (m.gzindex = 0, m.status = aZ)
                    } else {
                        m.status = aZ
                    }
                }
                if (m.status === aZ) {
                    if (m.gzhead.name) {
                        b = m.pending;
                        do {
                            if (m.pending === m.pending_buf_size && (m.gzhead.hcrc && m.pending > b && (n.adler = aE(n.adler, m.pending_buf, m.pending - b, b)), a5(n), b = m.pending, m.pending === m.pending_buf_size)) {
                                j = 1;
                                break
                            }
                            j = m.gzindex < m.gzhead.name.length ? 255 & m.gzhead.name.charCodeAt(m.gzindex++) : 0, aL(m, j)
                        } while (0 !== j);
                        m.gzhead.hcrc && m.pending > b && (n.adler = aE(n.adler, m.pending_buf, m.pending - b, b)), 0 === j && (m.gzindex = 0, m.status = az)
                    } else {
                        m.status = az
                    }
                }
                if (m.status === az) {
                    if (m.gzhead.comment) {
                        b = m.pending;
                        do {
                            if (m.pending === m.pending_buf_size && (m.gzhead.hcrc && m.pending > b && (n.adler = aE(n.adler, m.pending_buf, m.pending - b, b)), a5(n), b = m.pending, m.pending === m.pending_buf_size)) {
                                j = 1;
                                break
                            }
                            j = m.gzindex < m.gzhead.comment.length ? 255 & m.gzhead.comment.charCodeAt(m.gzindex++) : 0, aL(m, j)
                        } while (0 !== j);
                        m.gzhead.hcrc && m.pending > b && (n.adler = aE(n.adler, m.pending_buf, m.pending - b, b)), 0 === j && (m.status = aQ)
                    } else {
                        m.status = aQ
                    }
                }
                if (m.status === aQ && (m.gzhead.hcrc ? (m.pending + 2 > m.pending_buf_size && a5(n), m.pending + 2 <= m.pending_buf_size && (aL(m, 255 & n.adler), aL(m, n.adler >> 8 & 255), n.adler = 0, m.status = ai)) : m.status = ai), 0 !== m.pending) {
                    if (a5(n), 0 === n.avail_out) {
                        return m.last_flush = -1, aB
                    }
                } else {
                    if (0 === n.avail_in && a2(k) <= a2(g) && k !== aS) {
                        return aR(n, aY)
                    }
                }
                if (m.status === bj && 0 !== n.avail_in) {
                    return aR(n, aY)
                }
                if (0 !== n.avail_in || 0 !== m.lookahead || k !== a0 && m.status !== bj) {
                    var i = m.strategy === a1 ? aO(m, k) : m.strategy === bf ? ax(m, k) : aq[m.level].func(m, k);
                    if (i !== aK && i !== bs || (m.status = bj), i === bg || i === aK) {
                        return 0 === n.avail_out && (m.last_flush = -1), aB
                    }
                    if (i === bp && (k === a9 ? bc._tr_align(m) : k !== a3 && (bc._tr_stored_block(m, 0, 0, !1), k === aM && (aD(m.head), 0 === m.lookahead && (m.strstart = 0, m.block_start = 0, m.insert = 0))), a5(n), 0 === n.avail_out)) {
                        return m.last_flush = -1, aB
                    }
                }
                return k !== aS ? aB : m.wrap <= 0 ? av : (2 === m.wrap ? (aL(m, 255 & n.adler), aL(m, n.adler >> 8 & 255), aL(m, n.adler >> 16 & 255), aL(m, n.adler >> 24 & 255), aL(m, 255 & n.total_in), aL(m, n.total_in >> 8 & 255), aL(m, n.total_in >> 16 & 255), aL(m, n.total_in >> 24 & 255)) : (aU(m, n.adler >>> 16), aU(m, 65535 & n.adler)), a5(n), m.wrap > 0 && (m.wrap = -m.wrap), 0 !== m.pending ? aB : av)
            }

            function ak(c) {
                var b;
                return c && c.state ? (b = c.state.status, b !== aw && b !== al && b !== aZ && b !== az && b !== aQ && b !== ai && b !== bj ? aR(c, aJ) : (c.state = null, b === ai ? aR(c, aP) : aB)) : aJ
            }

            function a6(u, g) {
                var c, k, p, q, i, j, m, b, f = g.length;
                if (!u || !u.state) {
                    return aJ
                }
                if (c = u.state, q = c.wrap, 2 === q || 1 === q && c.status !== aw || c.lookahead) {
                    return aJ
                }
                for (1 === q && (u.adler = an(u.adler, g, f, 0)), c.wrap = 0, f >= c.w_size && (0 === q && (aD(c.head), c.strstart = 0, c.block_start = 0, c.insert = 0), b = new aG.Buf8(c.w_size), aG.arraySet(b, g, f - c.w_size, c.w_size, 0), g = b, f = c.w_size), i = u.avail_in, j = u.next_in, m = u.input, u.avail_in = f, u.next_in = 0, u.input = g, bb(c); c.lookahead >= aW;) {
                    k = c.strstart, p = c.lookahead - (aW - 1);
                    do {
                        c.ins_h = (c.ins_h << c.hash_shift ^ c.window[k + aW - 1]) & c.hash_mask, c.prev[k & c.w_mask] = c.head[c.ins_h], c.head[c.ins_h] = k, k++
                    } while (--p);
                    c.strstart = k, c.lookahead = aW - 1, bb(c)
                }
                return c.strstart += c.lookahead, c.block_start = c.strstart, c.insert = c.lookahead, c.lookahead = 0, c.match_length = c.prev_length = aW - 1, c.match_available = 0, u.next_in = j, u.input = m, u.avail_in = i, c.wrap = q, aB
            }
            var aq, aG = a8("../utils/common"),
                bc = a8("./trees"),
                an = a8("./adler32"),
                aE = a8("./crc32"),
                aV = a8("./messages"),
                a0 = 0,
                a9 = 1,
                aM = 3,
                aS = 4,
                a3 = 5,
                aB = 0,
                av = 1,
                aJ = -2,
                aP = -3,
                aY = -5,
                ay = -1,
                aH = 1,
                a1 = 2,
                bf = 3,
                bi = 4,
                bl = 0,
                bo = 2,
                br = 8,
                aa = 9,
                ba = 15,
                ar = 8,
                af = 29,
                aT = 256,
                a4 = aT + 1 + af,
                aF = 30,
                a7 = 19,
                aC = 2 * a4 + 1,
                aN = 15,
                aW = 3,
                ac = 258,
                ao = ac + aW + 1,
                bd = 32,
                aw = 42,
                al = 69,
                aZ = 73,
                az = 91,
                aQ = 103,
                ai = 113,
                bj = 666,
                bg = 1,
                bp = 2,
                aK = 3,
                bs = 4,
                bm = 3;
            aq = [new ag(0, 0, 0, 0, au), new ag(4, 4, 8, 4, aj), new ag(4, 5, 16, 8, aj), new ag(4, 6, 32, 32, aj), new ag(4, 4, 16, 16, aX), new ag(8, 16, 32, 32, aX), new ag(8, 16, 128, 128, aX), new ag(8, 32, 128, 256, aX), new ag(32, 128, 258, 1024, aX), new ag(32, 258, 258, 4096, aX)], ad.deflateInit = ah, ad.deflateInit2 = bk, ad.deflateReset = aI, ad.deflateResetKeep = bn, ad.deflateSetHeader = bq, ad.deflate = ae, ad.deflateEnd = ak, ad.deflateSetDictionary = a6, ad.deflateInfo = "pako deflate (from Nodeca project)"
        }, {
            "../utils/common": 1,
            "./adler32": 3,
            "./crc32": 4,
            "./messages": 6,
            "./trees": 7
        }],
        6: [function(d, c, b) {
            c.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        }, {}],
        7: [function(a4, ao, ad) {
            function aN(c) {
                for (var b = c.length; --b >= 0;) {
                    c[b] = 0
                }
            }

            function aY(g, c, b, d, f) {
                this.static_tree = g, this.extra_bits = c, this.extra_base = b, this.elems = d, this.max_length = f, this.has_stree = g && g.length
            }

            function aB(c, b) {
                this.dyn_tree = c, this.max_code = 0, this.stat_desc = b
            }

            function a1(b) {
                return b < 256 ? aK[b] : aK[256 + (b >>> 7)]
            }

            function ay(c, b) {
                c.pending_buf[c.pending++] = 255 & b, c.pending_buf[c.pending++] = b >>> 8 & 255
            }

            function aI(d, c, b) {
                d.bi_valid > bd - b ? (d.bi_buf |= c << d.bi_valid & 65535, ay(d, d.bi_buf), d.bi_buf = c >> bd - d.bi_valid, d.bi_valid += b - bd) : (d.bi_buf |= c << d.bi_valid & 65535, d.bi_valid += b)
            }

            function aQ(d, c, b) {
                aI(d, b[2 * c], b[2 * c + 1])
            }

            function ab(d, c) {
                var b = 0;
                do {
                    b |= 1 & d, d >>>= 1, b <<= 1
                } while (--c > 0);
                return b >>> 1
            }

            function al(b) {
                16 === b.bi_valid ? (ay(b, b.bi_buf), b.bi_buf = 0, b.bi_valid = 0) : b.bi_valid >= 8 && (b.pending_buf[b.pending++] = 255 & b.bi_buf, b.bi_buf >>= 8, b.bi_valid -= 8)
            }

            function a7(D, m) {
                var g, y, B, w, C, v, x = m.dyn_tree,
                    z = m.max_code,
                    b = m.stat_desc.static_tree,
                    k = m.stat_desc.has_stree,
                    E = m.stat_desc.extra_bits,
                    q = m.stat_desc.extra_base,
                    j = m.stat_desc.max_length,
                    A = 0;
                for (w = 0; w <= bb; w++) {
                    D.bl_count[w] = 0
                }
                for (x[2 * D.heap[D.heap_max] + 1] = 0, g = D.heap_max + 1; g < aX; g++) {
                    y = D.heap[g], w = x[2 * x[2 * y + 1] + 1] + 1, w > j && (w = j, A++), x[2 * y + 1] = w, y > z || (D.bl_count[w]++, C = 0, y >= q && (C = E[y - q]), v = x[2 * y], D.opt_len += v * (w + C), k && (D.static_len += v * (b[2 * y + 1] + C)))
                }
                if (0 !== A) {
                    do {
                        for (w = j - 1; 0 === D.bl_count[w];) {
                            w--
                        }
                        D.bl_count[w]--, D.bl_count[w + 1] += 2, D.bl_count[j]--, A -= 2
                    } while (A > 0);
                    for (w = j; 0 !== w; w--) {
                        for (y = D.bl_count[w]; 0 !== y;) {
                            B = D.heap[--g], B > z || (x[2 * B + 1] !== w && (D.opt_len += (w - x[2 * B + 1]) * x[2 * B], x[2 * B + 1] = w), y--)
                        }
                    }
                }
            }

            function ar(l, c, b) {
                var g, j, f = new Array(bb + 1),
                    k = 0;
                for (g = 1; g <= bb; g++) {
                    f[g] = k = k + b[g - 1] << 1
                }
                for (j = 0; j <= c; j++) {
                    var d = l[2 * j + 1];
                    0 !== d && (l[2 * j] = ab(f[d]++, d))
                }
            }

            function ai() {
                var h, c, b, f, d, g = new Array(bb + 1);
                for (b = 0, f = 0; f < aH - 1; f++) {
                    for (ac[f] = b, h = 0; h < 1 << aq[f]; h++) {
                        aS[b++] = f
                    }
                }
                for (aS[b - 1] = f, d = 0, f = 0; f < 16; f++) {
                    for (an[f] = d, h = 0; h < 1 << af[f]; h++) {
                        aK[d++] = f
                    }
                }
                for (d >>= 7; f < ax; f++) {
                    for (an[f] = d << 7, h = 0; h < 1 << af[f] - 7; h++) {
                        aK[256 + d++] = f
                    }
                }
                for (c = 0; c <= bb; c++) {
                    g[c] = 0
                }
                for (h = 0; h <= 143;) {
                    a3[2 * h + 1] = 8, h++, g[8]++
                }
                for (; h <= 255;) {
                    a3[2 * h + 1] = 9, h++, g[9]++
                }
                for (; h <= 279;) {
                    a3[2 * h + 1] = 7, h++, g[7]++
                }
                for (; h <= 287;) {
                    a3[2 * h + 1] = 8, h++, g[8]++
                }
                for (ar(a3, aU + 1, g), h = 0; h < ax; h++) {
                    aA[2 * h + 1] = 5, aA[2 * h] = ab(h, 5)
                }
                a9 = new aY(a3, aq, aM + 1, aU, bb), av = new aY(aA, af, 0, ax, bb), ak = new aY(new Array(0), aP, 0, aF, bf)
            }

            function aT(c) {
                var b;
                for (b = 0; b < aU; b++) {
                    c.dyn_ltree[2 * b] = 0
                }
                for (b = 0; b < ax; b++) {
                    c.dyn_dtree[2 * b] = 0
                }
                for (b = 0; b < aF; b++) {
                    c.bl_tree[2 * b] = 0
                }
                c.dyn_ltree[2 * bh] = 1, c.opt_len = c.static_len = 0, c.last_lit = c.matches = 0
            }

            function aw(b) {
                b.bi_valid > 8 ? ay(b, b.bi_buf) : b.bi_valid > 0 && (b.pending_buf[b.pending++] = b.bi_buf), b.bi_buf = 0, b.bi_valid = 0
            }

            function aL(f, c, b, d) {
                aw(f), d && (ay(f, b), ay(f, ~b)), am.arraySet(f.pending_buf, f.window, c, b, f.pending), f.pending += b
            }

            function ag(h, c, b, f) {
                var g = 2 * c,
                    d = 2 * b;
                return h[g] < h[d] || h[g] === h[d] && f[c] <= f[b]
            }

            function bc(g, c, b) {
                for (var d = g.heap[b], f = b << 1; f <= g.heap_len && (f < g.heap_len && ag(c, g.heap[f + 1], g.heap[f], g.depth) && f++, !ag(c, d, g.heap[f], g.depth));) {
                    g.heap[b] = g.heap[f], b = f, f <<= 1
                }
                g.heap[b] = d
            }

            function ba(l, d, c) {
                var j, k, g, f, b = 0;
                if (0 !== l.last_lit) {
                    do {
                        j = l.pending_buf[l.d_buf + 2 * b] << 8 | l.pending_buf[l.d_buf + 2 * b + 1], k = l.pending_buf[l.l_buf + b], b++, 0 === j ? aQ(l, k, d) : (g = aS[k], aQ(l, g + aM + 1, d), f = aq[g], 0 !== f && (k -= ac[g], aI(l, k, f)), j--, g = a1(j), aQ(l, g, c), f = af[g], 0 !== f && (j -= an[g], aI(l, j, f)))
                    } while (b < l.last_lit)
                }
                aQ(l, bh, d)
            }

            function bg(q, c) {
                var b, j, m, f = c.dyn_tree,
                    p = c.stat_desc.static_tree,
                    d = c.stat_desc.has_stree,
                    g = c.stat_desc.elems,
                    k = -1;
                for (q.heap_len = 0, q.heap_max = aX, b = 0; b < g; b++) {
                    0 !== f[2 * b] ? (q.heap[++q.heap_len] = k = b, q.depth[b] = 0) : f[2 * b + 1] = 0
                }
                for (; q.heap_len < 2;) {
                    m = q.heap[++q.heap_len] = k < 2 ? ++k : 0, f[2 * m] = 1, q.depth[m] = 0, q.opt_len--, d && (q.static_len -= p[2 * m + 1])
                }
                for (c.max_code = k, b = q.heap_len >> 1; b >= 1; b--) {
                    bc(q, f, b)
                }
                m = g;
                do {
                    b = q.heap[1], q.heap[1] = q.heap[q.heap_len--], bc(q, f, 1), j = q.heap[1], q.heap[--q.heap_max] = b, q.heap[--q.heap_max] = j, f[2 * m] = f[2 * b] + f[2 * j], q.depth[m] = (q.depth[b] >= q.depth[j] ? q.depth[b] : q.depth[j]) + 1, f[2 * b + 1] = f[2 * j + 1] = m, q.heap[1] = m++, bc(q, f, 1)
                } while (q.heap_len >= 2);
                q.heap[--q.heap_max] = q.heap[1], a7(q, c), ar(f, k, q.bl_count)
            }

            function aG(q, c, b) {
                var j, m, f = -1,
                    p = c[1],
                    d = 0,
                    g = 7,
                    k = 4;
                for (0 === p && (g = 138, k = 3), c[2 * (b + 1) + 1] = 65535, j = 0; j <= b; j++) {
                    m = p, p = c[2 * (j + 1) + 1], ++d < g && m === p || (d < k ? q.bl_tree[2 * m] += d : 0 !== m ? (m !== f && q.bl_tree[2 * m]++, q.bl_tree[2 * bj]++) : d <= 10 ? q.bl_tree[2 * aa]++ : q.bl_tree[2 * a6]++, d = 0, f = m, 0 === p ? (g = 138, k = 3) : m === p ? (g = 6, k = 3) : (g = 7, k = 4))
                }
            }

            function bi(p, g, c) {
                var l, m, k = -1,
                    o = g[1],
                    j = 0,
                    b = 7,
                    f = 4;
                for (0 === o && (b = 138, f = 3), l = 0; l <= c; l++) {
                    if (m = o, o = g[2 * (l + 1) + 1], !(++j < b && m === o)) {
                        if (j < f) {
                            do {
                                aQ(p, m, p.bl_tree)
                            } while (0 !== --j)
                        } else {
                            0 !== m ? (m !== k && (aQ(p, m, p.bl_tree), j--), aQ(p, bj, p.bl_tree), aI(p, j - 3, 2)) : j <= 10 ? (aQ(p, aa, p.bl_tree), aI(p, j - 3, 3)) : (aQ(p, a6, p.bl_tree), aI(p, j - 11, 7))
                        }
                        j = 0, k = m, 0 === o ? (b = 138, f = 3) : m === o ? (b = 6, f = 3) : (b = 7, f = 4)
                    }
                }
            }

            function be(c) {
                var b;
                for (aG(c, c.dyn_ltree, c.l_desc.max_code), aG(c, c.dyn_dtree, c.d_desc.max_code), bg(c, c.bl_desc), b = aF - 1; b >= 3 && 0 === c.bl_tree[2 * a0[b] + 1]; b--) {}
                return c.opt_len += 3 * (b + 1) + 5 + 5 + 4, b
            }

            function ah(g, c, b, d) {
                var f;
                for (aI(g, c - 257, 5), aI(g, b - 1, 5), aI(g, d - 4, 4), f = 0; f < d; f++) {
                    aI(g, g.bl_tree[2 * a0[f] + 1], 3)
                }
                bi(g, g.dyn_ltree, c - 1), bi(g, g.dyn_dtree, b - 1)
            }

            function ae(d) {
                var c, b = 4093624447;
                for (c = 0; c <= 31; c++, b >>>= 1) {
                    if (1 & b && 0 !== d.dyn_ltree[2 * c]) {
                        return aR
                    }
                }
                if (0 !== d.dyn_ltree[18] || 0 !== d.dyn_ltree[20] || 0 !== d.dyn_ltree[26]) {
                    return aW
                }
                for (c = 32; c < aM; c++) {
                    if (0 !== d.dyn_ltree[2 * c]) {
                        return aW
                    }
                }
                return aR
            }

            function aj(b) {
                aV || (ai(), aV = !0), b.l_desc = new aB(b.dyn_ltree, a9), b.d_desc = new aB(b.dyn_dtree, av), b.bl_desc = new aB(b.bl_tree, ak), b.bi_buf = 0, b.bi_valid = 0, aT(b)
            }

            function a2(f, c, b, d) {
                aI(f, (aJ << 1) + (d ? 1 : 0), 3), aL(f, c, b, !0)
            }

            function ap(b) {
                aI(b, aO << 1, 3), aQ(b, bh, a3), al(b)
            }

            function aE(j, c, b, f) {
                var g, d, h = 0;
                j.level > 0 ? (j.strm.data_type === a5 && (j.strm.data_type = ae(j)), bg(j, j.l_desc), bg(j, j.d_desc), h = be(j), g = j.opt_len + 3 + 7 >>> 3, d = j.static_len + 3 + 7 >>> 3, d <= g && (g = d)) : g = d = b + 5, b + 4 <= g && c !== -1 ? a2(j, c, b, f) : j.strategy === aC || d === g ? (aI(j, (aO << 1) + (f ? 1 : 0), 3), ba(j, a3, aA)) : (aI(j, (aZ << 1) + (f ? 1 : 0), 3), ah(j, j.l_desc.max_code + 1, j.d_desc.max_code + 1, h + 1), ba(j, j.dyn_ltree, j.dyn_dtree)), aT(j), f && aw(j)
            }

            function a8(d, c, b) {
                return d.pending_buf[d.d_buf + 2 * d.last_lit] = c >>> 8 & 255, d.pending_buf[d.d_buf + 2 * d.last_lit + 1] = 255 & c, d.pending_buf[d.l_buf + d.last_lit] = 255 & b, d.last_lit++, 0 === c ? d.dyn_ltree[2 * b]++ : (d.matches++, c--, d.dyn_ltree[2 * (aS[b] + aM + 1)]++, d.dyn_dtree[2 * a1(c)]++), d.last_lit === d.lit_bufsize - 1
            }
            var am = a4("../utils/common"),
                aC = 4,
                aR = 0,
                aW = 1,
                a5 = 2,
                aJ = 0,
                aO = 1,
                aZ = 2,
                az = 3,
                au = 258,
                aH = 29,
                aM = 256,
                aU = aM + 1 + aH,
                ax = 30,
                aF = 19,
                aX = 2 * aU + 1,
                bb = 15,
                bd = 16,
                bf = 7,
                bh = 256,
                bj = 16,
                aa = 17,
                a6 = 18,
                aq = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                af = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                aP = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                a0 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                aD = 512,
                a3 = new Array(2 * (aU + 2));
            aN(a3);
            var aA = new Array(2 * ax);
            aN(aA);
            var aK = new Array(aD);
            aN(aK);
            var aS = new Array(au - az + 1);
            aN(aS);
            var ac = new Array(aH);
            aN(ac);
            var an = new Array(ax);
            aN(an);
            var a9, av, ak, aV = !1;
            ad._tr_init = aj, ad._tr_stored_block = a2, ad._tr_flush_block = aE, ad._tr_tally = a8, ad._tr_align = ap
        }, {
            "../utils/common": 1
        }],
        8: [function(f, c, b) {
            function d() {
                this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
            }
            c.exports = d
        }, {}],
        "/lib/deflate.js": [function(L, z, k) {
            function G(f) {
                if (!(this instanceof G)) {
                    return new G(f)
                }
                this.options = E.assign({
                    level: q,
                    method: N,
                    chunkSize: 16384,
                    windowBits: 15,
                    memLevel: 8,
                    strategy: O,
                    to: ""
                }, f || {});
                var c = this.options;
                c.raw && c.windowBits > 0 ? c.windowBits = -c.windowBits : c.gzip && c.windowBits > 0 && c.windowBits < 16 && (c.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new y, this.strm.avail_out = 0;
                var b = C.deflateInit2(this.strm, c.level, c.method, c.windowBits, c.memLevel, c.strategy);
                if (b !== I) {
                    throw new Error(j[b])
                }
                if (c.header && C.deflateSetHeader(this.strm, c.header), c.dictionary) {
                    var d;
                    if (d = "string" == typeof c.dictionary ? H.string2buf(c.dictionary) : "[object ArrayBuffer]" === M.call(c.dictionary) ? new Uint8Array(c.dictionary) : c.dictionary, b = C.deflateSetDictionary(this.strm, d), b !== I) {
                        throw new Error(j[b])
                    }
                    this._dict_set = !0
                }
            }

            function J(d, c) {
                var b = new G(c);
                if (b.push(d, !0), b.err) {
                    throw b.msg || j[b.err]
                }
                return b.result
            }

            function D(c, b) {
                return b = b || {}, b.raw = !0, J(c, b)
            }

            function K(c, b) {
                return b = b || {}, b.gzip = !0, J(c, b)
            }
            var C = L("./zlib/deflate"),
                E = L("./utils/common"),
                H = L("./utils/strings"),
                j = L("./zlib/messages"),
                y = L("./zlib/zstream"),
                M = Object.prototype.toString,
                A = 0,
                x = 4,
                I = 0,
                B = 1,
                F = 2,
                q = -1,
                O = 0,
                N = 8;
            G.prototype.push = function(h, c) {
                var b, f, g = this.strm,
                    d = this.options.chunkSize;
                if (this.ended) {
                    return !1
                }
                f = c === ~~c ? c : c === !0 ? x : A, "string" == typeof h ? g.input = H.string2buf(h) : "[object ArrayBuffer]" === M.call(h) ? g.input = new Uint8Array(h) : g.input = h, g.next_in = 0, g.avail_in = g.input.length;
                do {
                    if (0 === g.avail_out && (g.output = new E.Buf8(d), g.next_out = 0, g.avail_out = d), b = C.deflate(g, f), b !== B && b !== I) {
                        return this.onEnd(b), this.ended = !0, !1
                    }
                    0 !== g.avail_out && (0 !== g.avail_in || f !== x && f !== F) || ("string" === this.options.to ? this.onData(H.buf2binstring(E.shrinkBuf(g.output, g.next_out))) : this.onData(E.shrinkBuf(g.output, g.next_out)))
                } while ((g.avail_in > 0 || 0 === g.avail_out) && b !== B);
                return f === x ? (b = C.deflateEnd(this.strm), this.onEnd(b), this.ended = !0, b === I) : f !== F || (this.onEnd(I), g.avail_out = 0, !0)
            }, G.prototype.onData = function(b) {
                this.chunks.push(b)
            }, G.prototype.onEnd = function(b) {
                b === I && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = E.flattenChunks(this.chunks)), this.chunks = [], this.err = b, this.msg = this.strm.msg
            }, k.Deflate = G, k.deflate = J, k.deflateRaw = D, k.gzip = K
        }, {
            "./utils/common": 1,
            "./utils/strings": 2,
            "./zlib/deflate": 5,
            "./zlib/messages": 6,
            "./zlib/zstream": 8
        }]
    }, {}, [])("/lib/deflate.js")
});
/* Tealeaf UI Capture 5.4.1 */
if (window.TLT) {
    throw "Attempting to recreate TLT. Library may be included more than once on the page."
}
window.TLT = (function() {
    function O(f, i, j, g) {
        var d = null,
            h = null,
            c = TLT.getService("queue"),
            a = TLT.getModule("replay"),
            e = TLT.getModule("TLCookie"),
            k = null,
            b = TLT.utils.getOriginAndPath();
        if (!i || typeof i !== "string") {
            return
        }
        if (!j || typeof j !== "string") {
            j = ""
        }
        h = {
            type: 2,
            screenview: {
                type: f,
                name: i,
                url: b.path,
                host: b.origin,
                referrer: j
            }
        };
        if (f === "LOAD") {
            k = {
                type: "screenview_load",
                name: i
            }
        } else {
            if (f === "UNLOAD") {
                k = {
                    type: "screenview_unload",
                    name: i
                }
            }
        }
        if (k && a) {
            d = a.onevent(k)
        }
        if (d) {
            h.dcid = d
        }
        if (f === "LOAD" || f === "UNLOAD") {
            c.post("", h, "DEFAULT")
        }
        if (k && e) {
            e.onevent(k)
        }
    }

    function P(b) {
        var c, a = TLT.getService("queue");
        if (!b || !b.coords) {
            return
        }
        c = {
            type: 13,
            geolocation: {
                lat: b.coords.latitude,
                "long": b.coords.longitude,
                accuracy: Math.ceil(b.coords.accuracy)
            }
        };
        a.post("", c, "DEFAULT")
    }

    function J() {
        var b, a = TLT.getService("queue");
        b = {
            type: 13,
            geolocation: {
                errorCode: 201,
                error: "Permission denied."
            }
        };
        a.post("", b, "DEFAULT")
    }
    var S = (new Date()).getTime(),
        N, T = {},
        y = {},
        B = false,
        D = null,
        L = (function() {
            var c, a = [];

            function d(i) {
                var h = R.getService("browser"),
                    e = R.getCoreConfig().framesBlacklist,
                    g, f;
                c = c || [];
                i = i || null;
                if (typeof e !== "undefined" && e.length > 0) {
                    for (f = 0; f < e.length; f += 1) {
                        g = h.queryAll(e[f], i);
                        if (g && g.length > 0) {
                            c = c.concat(g)
                        }
                    }
                    a = a.concat(h.queryAll("iframe", i))
                }
            }

            function b(e) {
                if (R.utils.indexOf(a, e) < 0) {
                    d(e.ownerDocument)
                }
                return R.utils.indexOf(c, e) > -1
            }
            b.clearCache = function() {
                c = null
            };
            return b
        }()),
        M = null,
        E = {
            config: ["getConfig", "updateConfig", "getCoreConfig", "updateCoreConfig", "getModuleConfig", "updateModuleConfig", "getServiceConfig", "updateServiceConfig"],
            queue: ["post", "setAutoFlush", "flushAll"],
            browserBase: ["getXPathFromNode", "processDOMEvent"]
        },
        Q = (function() {
            var a = {};
            return {
                normalizeModuleEvents: function(d, b, g, i) {
                    var h = a[d],
                        f = false,
                        c = false,
                        e = R.getService("browser");
                    g = g || R._getLocalTop();
                    i = i || g.document;
                    if (h) {
                        return
                    }
                    a[d] = {
                        loadFired: false,
                        pageHideFired: false
                    };
                    R.utils.forEach(b, function(j) {
                        switch (j.name) {
                            case "load":
                                f = true;
                                b.push(R.utils.mixin(R.utils.mixin({}, j), {
                                    name: "pageshow"
                                }));
                                break;
                            case "unload":
                                c = true;
                                b.push(R.utils.mixin(R.utils.mixin({}, j), {
                                    name: "pagehide"
                                }));
                                b.push(R.utils.mixin(R.utils.mixin({}, j), {
                                    name: "beforeunload"
                                }));
                                break;
                            case "change":
                                if (R.utils.isLegacyIE && R.getFlavor() === "w3c") {
                                    b.push(R.utils.mixin(R.utils.mixin({}, j), {
                                        name: "propertychange"
                                    }))
                                }
                                break
                        }
                    });
                    if (!f && !c) {
                        delete a[d];
                        return
                    }
                    a[d].silentLoad = !f;
                    a[d].silentUnload = !c;
                    if (!f) {
                        b.push({
                            name: "load",
                            target: g
                        })
                    }
                    if (!c) {
                        b.push({
                            name: "unload",
                            target: g
                        })
                    }
                },
                canPublish: function(c, b) {
                    var d;
                    if (a.hasOwnProperty(c) === false) {
                        return true
                    }
                    d = a[c];
                    switch (b.type) {
                        case "load":
                            d.pageHideFired = false;
                            d.loadFired = true;
                            return !d.silentLoad;
                        case "pageshow":
                            d.pageHideFired = false;
                            b.type = "load";
                            return !d.loadFired && !d.silentLoad;
                        case "pagehide":
                            b.type = "unload";
                            d.loadFired = false;
                            d.pageHideFired = true;
                            return !d.silentUnload;
                        case "unload":
                        case "beforeunload":
                            b.type = "unload";
                            d.loadFired = false;
                            return !d.pageHideFired && !d.silentUnload
                    }
                    return true
                },
                isUnload: function(b) {
                    return typeof b === "object" ? (b.type === "unload" || b.type === "beforeunload" || b.type === "pagehide") : false
                }
            }
        }()),
        z = {},
        x = {},
        G = function() {},
        I = null,
        H = true,
        A = function() {},
        F = false,
        K = (function() {
            var b = window.location,
                d = b.pathname,
                c = b.hash,
                a = "";
            return function() {
                var g = b.pathname,
                    e = b.hash,
                    f = a;
                if (g !== d) {
                    f = g + e
                } else {
                    if (e !== c) {
                        f = e
                    }
                }
                if (f !== a) {
                    if (a) {
                        O("UNLOAD", a)
                    }
                    O("LOAD", f);
                    a = f;
                    d = g;
                    c = e
                }
            }
        }()),
        C = function(a, h) {
            var b, k, c, g = false,
                i = R.getService("browser"),
                j = R.getCoreConfig().blockedElements,
                e, f, d;
            if (!j || !j.length) {
                C = function() {
                    return false
                };
                return g
            }
            if (!a || !a.nodeType) {
                return g
            }
            h = h || R.utils.getDocument(a);
            for (b = 0, c = j.length; b < c && !g; b += 1) {
                f = i.queryAll(j[b], h);
                for (k = 0, d = f.length; k < d && !g; k += 1) {
                    e = f[k];
                    g = e.contains ? e.contains(a) : e === a
                }
            }
            return g
        },
        R = {
            getStartTime: function() {
                return S
            },
            getPageId: function() {
                return N || "#"
            },
            getLibraryVersion: function() {
                return "5.4.1.1813"
            },
            init: function(b, c) {
                var a;
                I = c;
                if (!H) {
                    throw "init must only be called once!"
                }
                N = "P." + this.utils.getRandomString(28);
                H = false;
                a = function(d) {
                    d = d || window.event || {};
                    if (document.addEventListener || d.type === "load" || document.readyState === "complete") {
                        if (document.removeEventListener) {
                            document.removeEventListener("DOMContentLoaded", a, false);
                            window.removeEventListener("load", a, false)
                        } else {
                            document.detachEvent("onreadystatechange", a);
                            window.detachEvent("onload", a)
                        }
                        G(b, c)
                    }
                };
                if (document.readyState === "complete") {
                    setTimeout(a)
                } else {
                    if (document.addEventListener) {
                        document.addEventListener("DOMContentLoaded", a, false);
                        window.addEventListener("load", a, false)
                    } else {
                        document.attachEvent("onreadystatechange", a);
                        window.attachEvent("onload", a)
                    }
                }
            },
            isInitialized: function() {
                return B
            },
            getState: function() {
                return D
            },
            destroy: function(h) {
                var g = "",
                    a = "",
                    d = null,
                    e = null,
                    b = null,
                    i = null,
                    f = false;
                if (H) {
                    return false
                }
                this.stopAll();
                if (!h) {
                    i = this.getService("browser");
                    for (g in z) {
                        if (z.hasOwnProperty(g) && i !== null) {
                            a = g.split("|")[0];
                            d = z[g].target;
                            f = z[g].delegateTarget || undefined;
                            i.unsubscribe(a, d, this._publishEvent, f)
                        }
                    }
                }
                for (e in y) {
                    if (y.hasOwnProperty(e)) {
                        b = y[e].instance;
                        if (b && typeof b.destroy === "function") {
                            b.destroy()
                        }
                        y[e].instance = null
                    }
                }
                L.clearCache();
                z = {};
                B = false;
                H = true;
                D = "destroyed";
                if (typeof I === "function") {
                    try {
                        I("destroyed")
                    } catch (c) {}
                }
            },
            _updateModules: function(b) {
                var a = this.getCoreConfig(),
                    g = this.getService("browser"),
                    d = null,
                    f = null,
                    e = true;
                if (a && g && a.modules) {
                    try {
                        for (f in a.modules) {
                            if (a.modules.hasOwnProperty(f)) {
                                d = a.modules[f];
                                if (T.hasOwnProperty(f)) {
                                    if (d.enabled === false) {
                                        this.stop(f);
                                        continue
                                    }
                                    this.start(f);
                                    if (d.events) {
                                        this._registerModuleEvents(f, d.events, b)
                                    }
                                }
                            }
                        }
                        this._registerModuleEvents.clearCache()
                    } catch (c) {
                        R.destroy();
                        e = false
                    }
                } else {
                    e = false
                }
                return e
            },
            rebind: function(a) {
                R._updateModules(a)
            },
            getSessionData: function() {
                if (!R.isInitialized()) {
                    return
                }
                var b = null,
                    d = null,
                    e, a, c = R.getCoreConfig();
                if (!c || !c.sessionDataEnabled) {
                    return null
                }
                d = c.sessionData || {};
                e = d.sessionQueryName;
                if (e) {
                    a = R.utils.getQueryStringValue(e, d.sessionQueryDelim)
                } else {
                    e = d.sessionCookieName || "TLTSID";
                    a = R.utils.getCookieValue(e)
                }
                if (e && a) {
                    b = b || {};
                    b.tltSCN = e;
                    b.tltSCV = a;
                    b.tltSCVNeedsHashing = !!d.sessionValueNeedsHashing
                }
                return b
            },
            logGeolocation: function(c) {
                var b = R.getModuleConfig("replay") || {},
                    a = R.utils.getValue(b, "geolocation.options", {
                        timeout: 30000,
                        enableHighAccuracy: true,
                        maximumAge: 0
                    }),
                    e = R.utils.getValue(b, "geolocation.enabled", false),
                    d = window.navigator;
                if (!c) {
                    if (!e || !d || !d.geolocation || !d.geolocation.getCurrentPosition) {
                        return
                    }
                    d.geolocation.getCurrentPosition(P, J, a)
                } else {
                    P(c)
                }
            },
            logCustomEvent: function(a, c) {
                if (!R.isInitialized()) {
                    return
                }
                var d = null,
                    b = this.getService("queue");
                if (!a || typeof a !== "string") {
                    a = "CUSTOM"
                }
                c = c || {};
                d = {
                    type: 5,
                    customEvent: {
                        name: a,
                        data: c
                    }
                };
                b.post("", d, "DEFAULT")
            },
            logExceptionEvent: function(b, e, d) {
                if (!R.isInitialized()) {
                    return
                }
                var a = null,
                    c = this.getService("queue");
                if (!b || typeof b !== "string") {
                    return
                }
                e = e || "";
                d = d || "";
                a = {
                    type: 6,
                    exception: {
                        description: b,
                        url: e,
                        line: d
                    }
                };
                c.post("", a)
            },
            logFormCompletion: function(c, a) {
                if (!R.isInitialized()) {
                    return
                }
                var b = this.getService("queue"),
                    d = {
                        type: 15,
                        formCompletion: {
                            submitted: !!c,
                            valid: (typeof a === "boolean" ? a : null)
                        }
                    };
                b.post("", d)
            },
            logScreenviewLoad: function(c, b, a) {
                if (!R.isInitialized()) {
                    return
                }
                O("LOAD", c, b, a)
            },
            logScreenviewUnload: function(a) {
                if (!R.isInitialized()) {
                    return
                }
                O("UNLOAD", a)
            },
            logDOMCapture: function(h, c) {
                var d = null,
                    b, g, a, e, f;
                if (!this.isInitialized()) {
                    return d
                }
                if (R.utils.isLegacyIE) {
                    return d
                }
                g = this.getService("domCapture");
                if (g) {
                    h = h || window.document;
                    a = this.getServiceConfig("domCapture");
                    c = this.utils.mixin({}, a.options, c);
                    b = g.captureDOM(h, c);
                    if (b) {
                        d = c.dcid || ("dcid-" + this.utils.getSerialNumber() + "." + (new Date()).getTime());
                        b.dcid = d;
                        b.eventOn = !!c.eventOn;
                        e = {
                            type: 12,
                            domCapture: b
                        };
                        f = this.getService("queue");
                        f.post("", e, "DEFAULT");
                        if (c.qffd !== false && !F && e.domCapture.fullDOM) {
                            f.flush();
                            F = true
                        }
                    } else {
                        d = null
                    }
                }
                return d
            },
            performDOMCapture: function(c, a, b) {
                return this.logDOMCapture(a, b)
            },
            performFormCompletion: function(b, a, c) {
                return this.logFormCompletion(a, c)
            },
            _bridgeCallback: function(b) {
                var a = x[b];
                if (a && a.enabled) {
                    return a
                }
                return null
            },
            logScreenCapture: function() {
                if (!R.isInitialized()) {
                    return
                }
                var a = R._bridgeCallback("screenCapture");
                if (a !== null) {
                    a.cbFunction()
                }
            },
            enableTealeafFramework: function() {
                if (!R.isInitialized()) {
                    return
                }
                var a = R._bridgeCallback("enableTealeafFramework");
                if (a !== null) {
                    a.cbFunction()
                }
            },
            disableTealeafFramework: function() {
                if (!R.isInitialized()) {
                    return
                }
                var a = R._bridgeCallback("disableTealeafFramework");
                if (a !== null) {
                    a.cbFunction()
                }
            },
            startNewTLFSession: function() {
                if (!R.isInitialized()) {
                    return
                }
                var a = R._bridgeCallback("startNewTLFSession");
                if (a !== null) {
                    a.cbFunction()
                }
            },
            currentSessionId: function() {
                if (!R.isInitialized()) {
                    return
                }
                var b, a = R._bridgeCallback("currentSessionId");
                if (a !== null) {
                    b = a.cbFunction()
                }
                return b
            },
            defaultValueForConfigurableItem: function(a) {
                if (!R.isInitialized()) {
                    return
                }
                var c, b = R._bridgeCallback("defaultValueForConfigurableItem");
                if (b !== null) {
                    c = b.cbFunction(a)
                }
                return c
            },
            valueForConfigurableItem: function(a) {
                if (!R.isInitialized()) {
                    return
                }
                var c, b = R._bridgeCallback("valueForConfigurableItem");
                if (b !== null) {
                    c = b.cbFunction(a)
                }
                return c
            },
            setConfigurableItem: function(c, a) {
                if (!R.isInitialized()) {
                    return
                }
                var b = false,
                    d = R._bridgeCallback("setConfigurableItem");
                if (d !== null) {
                    b = d.cbFunction(c, a)
                }
                return b
            },
            addAdditionalHttpHeader: function(c, a) {
                if (!R.isInitialized()) {
                    return
                }
                var b = false,
                    d = R._bridgeCallback("addAdditionalHttpHeader");
                if (d !== null) {
                    b = d.cbFunction(c, a)
                }
                return b
            },
            logCustomEventBridge: function(e, a, d) {
                if (!R.isInitialized()) {
                    return
                }
                var c = false,
                    b = R._bridgeCallback("logCustomEventBridge");
                if (b !== null) {
                    c = b.cbFunction(e, a, d)
                }
                return c
            },
            registerBridgeCallbacks: function(e) {
                var b, j, c, i = null,
                    a, g, h, f = this.utils;
                if (!e) {
                    return false
                }
                if (e.length === 0) {
                    x = {};
                    return false
                }
                try {
                    for (b = 0, c = e.length; b < c; b += 1) {
                        i = e[b];
                        if (typeof i === "object" && i.cbType && i.cbFunction) {
                            a = {
                                enabled: i.enabled,
                                cbFunction: i.cbFunction,
                                cbOrder: i.order || 0
                            };
                            if (f.isUndefOrNull(x[i.cbType])) {
                                x[i.cbType] = a
                            } else {
                                if (!f.isArray(x[i.cbType])) {
                                    x[i.cbType] = [x[i.cbType]]
                                }
                                g = x[i.cbType];
                                for (j = 0, h = g.length; j < h; j += 1) {
                                    if (g[j].cbOrder > a.cbOrder) {
                                        break
                                    }
                                }
                                g.splice(j, 0, a)
                            }
                        }
                    }
                } catch (d) {
                    return false
                }
                return true
            },
            redirectQueue: function(d) {
                var c, b, e, j, g, h, i, f = this.utils,
                    a;
                if (!d || !d.length) {
                    return d
                }
                j = x.messageRedirect;
                if (!j) {
                    return d
                }
                if (!f.isArray(j)) {
                    g = [j]
                } else {
                    g = j
                }
                a = R.getService("serializer");
                for (b = 0, h = g.length; b < h; b += 1) {
                    j = g[b];
                    if (j && j.enabled) {
                        for (c = 0, e = d.length; c < e; c += 1) {
                            i = j.cbFunction(a.serialize(d[c]), d[c]);
                            if (i && typeof i === "object") {
                                d[c] = i
                            } else {
                                d.splice(c, 1);
                                c -= 1;
                                e = d.length
                            }
                        }
                    }
                }
                return d
            },
            _hasSameOrigin: function(a) {
                try {
                    return a.document.location.host === document.location.host && a.document.location.protocol === document.location.protocol
                } catch (b) {}
                return false
            },
            provideRequestHeaders: function() {
                var b = null,
                    a = x.addRequestHeaders;
                if (a && a.enabled) {
                    b = a.cbFunction()
                }
                return b
            },
            _registerModuleEvents: (function() {
                var f, b = 0,
                    a = function(i, h, g) {
                        if (i === "window") {
                            return h
                        }
                        if (i === "document") {
                            return g
                        }
                        return i
                    };

                function c(g, n, q) {
                    var p = R.getService("browserBase"),
                        k = R.getService("browser"),
                        o = R.utils.getDocument(q),
                        i = R._getLocalTop(),
                        h = R.utils.isIFrameDescendant(q),
                        m, l, j;
                    q = q || o;
                    Q.normalizeModuleEvents(g, n, i, o);
                    if (h) {
                        m = p.ElementData.prototype.examineID(q).id;
                        if (typeof m === "string") {
                            m = m.slice(0, m.length - 1);
                            for (l in z) {
                                if (z.hasOwnProperty(l)) {
                                    for (j = 0; j < z[l].length; j += 1) {
                                        if (g === z[l][j]) {
                                            if (l.indexOf(m) !== -1) {
                                                delete z[l];
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    R.utils.forEach(n, function(r) {
                        var u = a(r.target, i, o) || o,
                            t = a(r.delegateTarget, i, o),
                            s = "";
                        if (r.recurseFrames !== true && h) {
                            return
                        }
                        if (typeof u === "string") {
                            if (r.delegateTarget && R.getFlavor() === "jQuery") {
                                s = R._buildToken4delegateTarget(r.name, u, r.delegateTarget);
                                if (!z.hasOwnProperty(s)) {
                                    z[s] = [g];
                                    z[s].target = u;
                                    z[s].delegateTarget = t;
                                    k.subscribe(r.name, u, R._publishEvent, t, s)
                                } else {
                                    z[s].push(g)
                                }
                            } else {
                                R.utils.forEach(k.queryAll(u, q), function(v) {
                                    var w = f.get(v);
                                    if (!w) {
                                        w = p.ElementData.prototype.examineID(v);
                                        f.set(v, w)
                                    }
                                    s = r.name + "|" + w.id + w.idType;
                                    if (R.utils.indexOf(z[s], g) !== -1) {
                                        return
                                    }
                                    z[s] = z[s] || [];
                                    z[s].push(g);
                                    z[s].target = v;
                                    k.subscribe(r.name, v, R._publishEvent)
                                })
                            }
                        } else {
                            s = R._buildToken4bubbleTarget(r.name, u, typeof r.target === "undefined");
                            if (!z.hasOwnProperty(s)) {
                                z[s] = [g];
                                k.subscribe(r.name, u, R._publishEvent)
                            } else {
                                if (R.utils.indexOf(z[s], g) === -1) {
                                    z[s].push(g)
                                }
                            }
                        }
                        if (s !== "") {
                            if (typeof u !== "string") {
                                z[s].target = u
                            }
                        }
                    })
                }

                function e(g) {
                    var h = R.utils.getIFrameWindow(g);
                    return (h !== null) && R._hasSameOrigin(h) && (h.document !== null) && h.document.readyState === "complete"
                }

                function d(h, n, p) {
                    p = p || R._getLocalTop().document;
                    f = f || new R.utils.WeakMap();
                    c(h, n, p);
                    if (h !== "performance") {
                        var l = null,
                            g = null,
                            i = R.getService("browser"),
                            o = R.getService("domCapture"),
                            m = i.queryAll("iframe, frame", p),
                            k, j;
                        for (k = 0, j = m.length; k < j; k += 1) {
                            l = m[k];
                            if (L(l)) {
                                continue
                            }
                            if (e(l)) {
                                g = R.utils.getIFrameWindow(l);
                                R._registerModuleEvents(h, n, g.document);
                                o.observeWindow(g);
                                continue
                            }
                            b += 1;
                            (function(s, q, t) {
                                var r = null,
                                    u = {
                                        moduleName: s,
                                        moduleEvents: q,
                                        hIFrame: t,
                                        _registerModuleEventsDelayed: function() {
                                            var v = null;
                                            if (!L(t)) {
                                                v = R.utils.getIFrameWindow(t);
                                                if (R._hasSameOrigin(v)) {
                                                    R._registerModuleEvents(s, q, v.document);
                                                    o.observeWindow(v)
                                                }
                                            }
                                            b -= 1;
                                            if (!b) {
                                                R._publishEvent({
                                                    type: "loadWithFrames",
                                                    custom: true
                                                })
                                            }
                                        }
                                    };
                                R.utils.addEventListener(t, "load", function() {
                                    u._registerModuleEventsDelayed()
                                });
                                if (R.utils.isLegacyIE && e(t)) {
                                    r = R.utils.getIFrameWindow(t);
                                    R.utils.addEventListener(r.document, "readystatechange", function() {
                                        u._registerModuleEventsDelayed()
                                    })
                                }
                            }(h, n, l))
                        }
                    }
                }
                d.clearCache = function() {
                    if (f) {
                        f.clear();
                        f = null
                    }
                };
                return d
            }()),
            _buildToken4currentTarget: function(b) {
                var c = b.nativeEvent ? b.nativeEvent.currentTarget : null,
                    a = c ? this.getService("browserBase").ElementData.prototype.examineID(c) : {
                        id: b.target ? b.target.id : null,
                        idType: b.target ? b.target.idType : -1
                    };
                return b.type + "|" + a.id + a.idType
            },
            _buildToken4delegateTarget: function(a, c, b) {
                return a + "|" + c + "|" + b
            },
            _buildToken4bubbleTarget: function(m, f, e, j) {
                var c = R._getLocalTop(),
                    l, n = R.getService("browser"),
                    k = function(o) {
                        var p = null;
                        if (R._hasSameOrigin(l.parent)) {
                            R.utils.forEach(n.queryAll("iframe, frame", l.parent.document), function(q) {
                                var r = null;
                                if (!L(q)) {
                                    r = R.utils.getIFrameWindow(q);
                                    if (R._hasSameOrigin(r) && r.document === o) {
                                        p = q
                                    }
                                }
                            })
                        }
                        return p
                    },
                    g = R.utils.getDocument(f),
                    i = this.getService("browserBase"),
                    h = null,
                    b, a = m,
                    d;
                if (g) {
                    l = g.defaultView || g.parentWindow
                }
                if (f === window || f === window.window) {
                    a += "|null-2|window"
                } else {
                    if (e && l && R._hasSameOrigin(l.parent) && typeof g !== "undefined" && c.document !== g) {
                        h = k(g);
                        if (h) {
                            b = i.ElementData.prototype.examineID(h);
                            a += "|" + b.xPath + "-2"
                        }
                    } else {
                        if (j && j !== document && R.getFlavor() === "jQuery") {
                            a += "|null-2|" + R.utils.getTagName(f) + "|" + R.utils.getTagName(j)
                        } else {
                            a += "|null-2|document"
                        }
                    }
                }
                return a
            },
            _reinitConfig: function() {
                R._updateModules()
            },
            _publishEvent: function(m) {
                var n = null,
                    b = null,
                    d = (m.delegateTarget && m.data) ? m.data : R._buildToken4currentTarget(m),
                    e = null,
                    f, g, h, a = null,
                    i = false,
                    j = false,
                    c = R.getCoreConfig(),
                    o = R.getService("browser"),
                    l = m.delegateTarget || null,
                    k;
                if (m.type.match(/^(click|change|blur|mouse|touch)/)) {
                    A()
                }
                k = R.utils.getValue(c, "screenviewAutoDetect", true);
                if (k) {
                    K()
                }
                if ((m.type === "load" || m.type === "pageshow") && !m.nativeEvent.customLoad) {
                    return
                }
                if (R.utils.isIE) {
                    if (m.type === "click") {
                        M = m.target.element
                    }
                    if (m.type === "beforeunload") {
                        i = false;
                        R.utils.forEach(c.ieExcludedLinks, function(q) {
                            var r, p, s = o.queryAll(q);
                            for (r = 0, p = s ? s.length : 0; r < p; r += 1) {
                                if (typeof s[r] !== undefined && s[r] === M) {
                                    i = true;
                                    return
                                }
                            }
                        });
                        if (i) {
                            return
                        }
                    }
                }
                if (Q.isUnload(m)) {
                    D = "unloading"
                }
                if (m.type === "change" && R.utils.isLegacyIE && R.getFlavor() === "w3c" && (m.target.element.type === "checkbox" || m.target.element.type === "radio")) {
                    return
                }
                if (m.type === "propertychange") {
                    if (m.nativeEvent.propertyName === "checked" && (m.target.element.type === "checkbox" || (m.target.element.type === "radio" && m.target.element.checked))) {
                        m.type = "change";
                        m.target.type = "INPUT"
                    } else {
                        return
                    }
                }
                if (m.target && C(m.target.element)) {
                    return
                }
                if (!z.hasOwnProperty(d)) {
                    if (m.hasOwnProperty("nativeEvent")) {
                        h = m.nativeEvent.currentTarget || m.nativeEvent.target
                    }
                    d = R._buildToken4bubbleTarget(m.type, h, true, l)
                }
                if (z.hasOwnProperty(d)) {
                    e = z[d];
                    for (f = 0, g = e.length; f < g; f += 1) {
                        n = e[f];
                        b = R.getModule(n);
                        a = R.utils.mixin({}, m);
                        if (b && R.isStarted(n) && typeof b.onevent === "function") {
                            j = Q.canPublish(n, a);
                            if (j) {
                                b.onevent(a)
                            }
                        }
                    }
                }
                if (a && a.type === "unload" && j) {
                    R.destroy()
                }
            },
            _getLocalTop: function() {
                return window.window
            },
            addModule: function(a, b) {
                T[a] = {
                    creator: b,
                    instance: null,
                    context: null,
                    messages: []
                };
                if (this.isInitialized()) {
                    this.start(a)
                }
            },
            getModule: function(a) {
                if (T[a] && T[a].instance) {
                    return T[a].instance
                }
                return null
            },
            removeModule: function(a) {
                this.stop(a);
                delete T[a]
            },
            isStarted: function(a) {
                return T.hasOwnProperty(a) && T[a].instance !== null
            },
            start: function(b) {
                var c = T[b],
                    a = null;
                if (c && c.instance === null) {
                    c.context = new TLT.ModuleContext(b, this);
                    a = c.instance = c.creator(c.context);
                    if (typeof a.init === "function") {
                        a.init()
                    }
                }
            },
            startAll: function() {
                var a = null;
                for (a in T) {
                    if (T.hasOwnProperty(a)) {
                        this.start(a)
                    }
                }
            },
            stop: function(b) {
                var c = T[b],
                    a = null;
                if (c && c.instance !== null) {
                    a = c.instance;
                    if (typeof a.destroy === "function") {
                        a.destroy()
                    }
                    c.instance = c.context = null
                }
            },
            stopAll: function() {
                var a = null;
                for (a in T) {
                    if (T.hasOwnProperty(a)) {
                        this.stop(a)
                    }
                }
            },
            addService: function(b, a) {
                y[b] = {
                    creator: a,
                    instance: null
                }
            },
            getService: function(a) {
                if (y.hasOwnProperty(a)) {
                    if (!y[a].instance) {
                        try {
                            y[a].instance = y[a].creator(this);
                            if (typeof y[a].instance.init === "function") {
                                y[a].instance.init()
                            }
                        } catch (b) {
                            return null
                        }
                        if (typeof y[a].instance.getServiceName !== "function") {
                            y[a].instance.getServiceName = function() {
                                return a
                            }
                        }
                    }
                    return y[a].instance
                }
                return null
            },
            removeService: function(a) {
                delete y[a]
            },
            broadcast: function(a) {
                var e = 0,
                    c = 0,
                    b = null,
                    d = null;
                if (a && typeof a === "object") {
                    for (b in T) {
                        if (T.hasOwnProperty(b)) {
                            d = T[b];
                            if (R.utils.indexOf(d.messages, a.type) > -1) {
                                if (typeof d.instance.onmessage === "function") {
                                    d.instance.onmessage(a)
                                }
                            }
                        }
                    }
                }
            },
            listen: function(a, c) {
                var b = null;
                if (this.isStarted(a)) {
                    b = T[a];
                    if (R.utils.indexOf(b.messages, c) === -1) {
                        b.messages.push(c)
                    }
                }
            },
            fail: function(c, b, a) {
                c = "UIC FAILED. " + c;
                try {
                    R.destroy(!!a)
                } finally {
                    R.utils.clog(c);
                    throw new R.UICError(c, b)
                }
            },
            UICError: (function() {
                function a(b, c) {
                    this.message = b;
                    this.code = c
                }
                a.prototype = new Error();
                a.prototype.name = "UICError";
                a.prototype.constructor = a;
                return a
            }()),
            getFlavor: function() {
                return "w3c"
            }
        };
    A = function() {
        var d = R.getCoreConfig(),
            a = null,
            c = R.utils.getValue(d, "inactivityTimeout", 600000);
        if (!c) {
            A = function() {};
            return
        }

        function b() {
            R.utils.clog("UIC self-terminated due to inactivity timeout.");
            R.destroy()
        }
        A = function() {
            if (a) {
                clearTimeout(a);
                a = null
            }
            a = setTimeout(b, c)
        };
        A()
    };
    G = function(o, a) {
        var n, f, d, m, j, l, r, e, g, k, i, q, p, h;
        if (B) {
            R.utils.clog("TLT.init() called more than once. Ignoring.");
            return
        }
        if (TLT && TLT.replay) {
            return
        }
        n = R.getService("config");
        n.updateConfig(o);
        l = n.getModuleConfig("TLCookie") || {};
        k = l.sessionizationCookieName || "TLTSID";
        i = R.utils.getCookieValue(k);
        if (i === "DND") {
            if (D !== "destroyed") {
                R.destroy()
            }
            return
        }
        if (!R._updateModules()) {
            if (D !== "destroyed") {
                R.destroy()
            }
            return
        }
        if (n.subscribe) {
            n.subscribe("configupdated", R._reinitConfig)
        }
        B = true;
        D = "loaded";
        try {
            if (typeof TLFExtensionNotify === "function") {
                TLFExtensionNotify("Initialized")
            }
        } catch (c) {}
        f = {
            type: "load",
            target: window.window,
            srcElement: window.window,
            currentTarget: window.window,
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            timeStamp: +new Date(),
            customLoad: true
        };
        m = R.getService("browserBase");
        d = new m.WebEvent(f);
        R._publishEvent(d);
        e = R.getService("ajax");
        r = R.getServiceConfig("queue");
        g = r.queues || [];
        for (h = 0; h < g.length; h += 1) {
            if (!i && l.tlAppKey) {
                q = g[h].endpoint;
                p = g[h].killswitchURL || (q.match("collectorPost") ? q.replace("collectorPost", "switch/" + l.tlAppKey) : null);
                if (p) {
                    e.sendRequest({
                        type: "GET",
                        url: p,
                        async: true,
                        timeout: 5000,
                        oncomplete: function(s) {
                            if (s.responseText === "0") {
                                R.setAutoFlush(false);
                                R.utils.setCookie(k, "DND");
                                R.destroy()
                            }
                        }
                    })
                }
            }
            if (g[h].checkEndpoint) {
                e.sendRequest({
                    oncomplete: function(s) {},
                    timeout: g[h].endpointCheckTimeout || 3000,
                    url: g[h].endpoint,
                    headers: {
                        "X-PageId": N,
                        "X-Tealeaf-SaaS-AppKey": l.tlAppKey,
                        "X-Tealeaf-EndpointCheck": true
                    },
                    async: true,
                    error: function(s) {
                        if (s.success) {
                            return
                        }
                        R.setAutoFlush(false);
                        R.destroy()
                    }
                })
            }
        }
        if (typeof I === "function") {
            try {
                I("initialized")
            } catch (b) {}
        }
    };
    (function() {
        var b = null,
            c, a;
        for (b in E) {
            if (E.hasOwnProperty(b)) {
                for (c = 0, a = E[b].length; c < a; c += 1) {
                    (function(e, d) {
                        R[d] = function() {
                            var f = this.getService(e);
                            if (f) {
                                return f[d].apply(f, arguments)
                            }
                        }
                    }(b, E[b][c]))
                }
            }
        }
    }());
    return R
}());
(function() {
    var j = window.navigator.userAgent.toLowerCase(),
        r = (j.indexOf("msie") !== -1 || j.indexOf("trident") !== -1),
        k = (function() {
            var a = !!window.performance;
            return (r && (!a || document.documentMode < 9))
        }()),
        n = (j.indexOf("android") !== -1),
        o = /(ipad|iphone|ipod)/.test(j),
        l = (j.indexOf("opera mini") !== -1),
        q = 1,
        m = {
            "a:": "link",
            "button:button": "button",
            "button:submit": "button",
            "input:button": "button",
            "input:checkbox": "checkBox",
            "input:color": "colorPicker",
            "input:date": "datePicker",
            "input:datetime": "datetimePicker",
            "input:datetime-local": "datetime-local",
            "input:email": "emailInput",
            "input:file": "fileInput",
            "input:image": "button",
            "input:month": "month",
            "input:number": "numberPicker",
            "input:password": "textBox",
            "input:radio": "radioButton",
            "input:range": "slider",
            "input:reset": "button",
            "input:search": "searchBox",
            "input:submit": "button",
            "input:tel": "tel",
            "input:text": "textBox",
            "input:time": "timePicker",
            "input:url": "urlBox",
            "input:week": "week",
            "select:": "selectList",
            "select:select-one": "selectList",
            "textarea:": "textBox",
            "textarea:textarea": "textBox"
        },
        p = {
            isIE: r,
            isLegacyIE: k,
            isAndroid: n,
            isLandscapeZeroDegrees: false,
            isiOS: o,
            isOperaMini: l,
            isUndefOrNull: function(a) {
                return typeof a === "undefined" || a === null
            },
            isArray: function(a) {
                return !!(a && Object.prototype.toString.call(a) === "[object Array]")
            },
            getSerialNumber: function() {
                var a;
                a = q;
                q += 1;
                return a
            },
            getRandomString: function(f, e) {
                var d, c, a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
                    b = "";
                if (!f) {
                    return b
                }
                if (typeof e !== "string") {
                    e = a
                }
                for (d = 0, c = e.length; d < f; d += 1) {
                    b += e.charAt(Math.floor(Math.random() * c))
                }
                return b
            },
            getValue: function(f, e, b) {
                var d, a, c;
                b = typeof b === "undefined" ? null : b;
                if (!f || typeof f !== "object" || typeof e !== "string") {
                    return b
                }
                c = e.split(".");
                for (d = 0, a = c.length; d < a; d += 1) {
                    if (this.isUndefOrNull(f) || typeof f[c[d]] === "undefined") {
                        return b
                    }
                    f = f[c[d]]
                }
                return f
            },
            indexOf: function(d, c) {
                var b, a;
                if (d && d.indexOf) {
                    return d.indexOf(c)
                }
                if (d && d instanceof Array) {
                    for (b = 0, a = d.length; b < a; b += 1) {
                        if (d[b] === c) {
                            return b
                        }
                    }
                }
                return -1
            },
            forEach: function(e, d, c) {
                var b, a;
                if (!e || !e.length || !d || !d.call) {
                    return
                }
                for (b = 0, a = e.length; b < a; b += 1) {
                    d.call(c, e[b], b, e)
                }
            },
            some: function(e, d) {
                var b, a, c = false;
                for (b = 0, a = e.length; b < a; b += 1) {
                    c = d(e[b], b, e);
                    if (c) {
                        return c
                    }
                }
                return c
            },
            convertToArray: function(c) {
                var d = 0,
                    b = c.length,
                    a = [];
                while (d < b) {
                    a.push(c[d]);
                    d += 1
                }
                return a
            },
            mixin: function(e) {
                var d, c, b, a;
                for (b = 1, a = arguments.length; b < a; b += 1) {
                    c = arguments[b];
                    for (d in c) {
                        if (Object.prototype.hasOwnProperty.call(c, d)) {
                            e[d] = c[d]
                        }
                    }
                }
                return e
            },
            extend: function(a, b, c) {
                var d = "";
                for (d in c) {
                    if (Object.prototype.hasOwnProperty.call(c, d)) {
                        if (a && Object.prototype.toString.call(c[d]) === "[object Object]") {
                            if (typeof b[d] === "undefined") {
                                b[d] = {}
                            }
                            p.extend(a, b[d], c[d])
                        } else {
                            b[d] = c[d]
                        }
                    }
                }
                return b
            },
            clone: function(b) {
                var c, a;
                if (null === b || "object" !== typeof b) {
                    return b
                }
                if (b instanceof Object) {
                    c = (Object.prototype.toString.call(b) === "[object Array]") ? [] : {};
                    for (a in b) {
                        if (Object.prototype.hasOwnProperty.call(b, a)) {
                            c[a] = p.clone(b[a])
                        }
                    }
                    return c
                }
            },
            parseVersion: function(c) {
                var d, a, b = [];
                if (!c || !c.length) {
                    return b
                }
                b = c.split(".");
                for (d = 0, a = b.length; d < a; d += 1) {
                    b[d] = /^[0-9]+$/.test(b[d]) ? parseInt(b[d], 10) : b[d]
                }
                return b
            },
            isEqual: function(c, b) {
                var d, a;
                if (c === b) {
                    return true
                }
                if (typeof c !== typeof b) {
                    return false
                }
                if (c instanceof Object) {
                    if (Object.prototype.toString.call(c) === "[object Array]") {
                        if (c.length !== b.length) {
                            return false
                        }
                        for (d = 0, a = c.length; d < a; d += 1) {
                            if (!this.isEqual(c[d], b[d])) {
                                return false
                            }
                        }
                        return true
                    }
                }
                return false
            },
            createObject: (function() {
                var a = null,
                    b = null;
                if (typeof Object.create === "function") {
                    a = Object.create
                } else {
                    b = function() {};
                    a = function(c) {
                        if (typeof c !== "object" && typeof c !== "function") {
                            throw new TypeError("Object prototype need to be an object!")
                        }
                        b.prototype = c;
                        return new b()
                    }
                }
                return a
            }()),
            access: function(f, d) {
                var e = d || window,
                    b, c, a;
                if (typeof f !== "string" || (typeof e !== "object" && e !== null)) {
                    return
                }
                b = f.split(".");
                for (c = 0, a = b.length; c < a; c += 1) {
                    if (c === 0 && b[c] === "window") {
                        continue
                    }
                    if (!Object.prototype.hasOwnProperty.call(e, b[c])) {
                        return
                    }
                    e = e[b[c]];
                    if (c < (a - 1) && !(e instanceof Object)) {
                        return
                    }
                }
                return e
            },
            isNumeric: function(a) {
                var b = false;
                if (p.isUndefOrNull(a) || a === "") {
                    return b
                }
                b = !isNaN(a * 2);
                return b
            },
            isUpperCase: function(a) {
                return a === a.toUpperCase() && a !== a.toLowerCase()
            },
            isLowerCase: function(a) {
                return a === a.toLowerCase() && a !== a.toUpperCase()
            },
            extractResponseHeaders: function(c) {
                var e = {},
                    b, a, d = null;
                if (!c || !c.length) {
                    c = []
                } else {
                    c = c.split("\n")
                }
                for (b = 0, a = c.length; b < a; b += 1) {
                    d = c[b].split(": ");
                    if (d.length === 2) {
                        e[d[0]] = d[1]
                    }
                }
                return e
            },
            getDocument: function(a) {
                if (a && a.nodeType !== 9) {
                    return (!p.isUndefOrNull(a.ownerDocument)) ? (a.ownerDocument) : (a.document)
                }
                return a
            },
            getWindow: function(b) {
                try {
                    if (b.self !== b) {
                        var a = p.getDocument(b);
                        return (!p.isUndefOrNull(a.defaultView)) ? (a.defaultView) : (a.parentWindow)
                    }
                } catch (c) {
                    b = null
                }
                return b
            },
            getOriginAndPath: function(a) {
                var c = {},
                    b;
                a = a || window.location;
                if (a.origin) {
                    c.origin = a.origin
                } else {
                    c.origin = (a.protocol || "") + "//" + (a.host || "")
                }
                c.path = (a.pathname || "").split(";", 1)[0];
                if (c.origin.indexOf("file://") > -1) {
                    b = c.path.match(/(.*)(\/.*app.*)/);
                    if (b !== null) {
                        c.path = b[2]
                    }
                }
                return c
            },
            getIFrameWindow: function(c) {
                var a = null;
                if (!c) {
                    return a
                }
                try {
                    a = c.contentWindow || (c.contentDocument ? c.contentDocument.parentWindow : null)
                } catch (b) {}
                return a
            },
            getTagName: function(b) {
                var a = "";
                if (p.isUndefOrNull(b)) {
                    return a
                }
                if (b === document || b.nodeType === 9) {
                    a = "document"
                } else {
                    if (b === window || b === window.window) {
                        a = "window"
                    } else {
                        if (typeof b === "string") {
                            a = b.toLowerCase()
                        } else {
                            if (b.tagName) {
                                a = b.tagName.toLowerCase()
                            } else {
                                if (b.nodeName) {
                                    a = b.nodeName.toLowerCase()
                                } else {
                                    a = ""
                                }
                            }
                        }
                    }
                }
                return a
            },
            getTlType: function(c) {
                var a, b, d = "";
                if (p.isUndefOrNull(c) || !c.type) {
                    return d
                }
                a = c.type.toLowerCase();
                b = a + ":";
                if (c.subType) {
                    b += c.subType.toLowerCase()
                }
                d = m[b] || a;
                return d
            },
            isIFrameDescendant: function(b) {
                var a = p.getWindow(b);
                return (a ? (a != TLT._getLocalTop()) : false)
            },
            getOrientationMode: function(a) {
                var b = "INVALID";
                if (typeof a !== "number") {
                    return b
                }
                switch (a) {
                    case 0:
                    case 180:
                    case 360:
                        b = "PORTRAIT";
                        break;
                    case 90:
                    case -90:
                    case 270:
                        b = "LANDSCAPE";
                        break;
                    default:
                        b = "UNKNOWN";
                        break
                }
                return b
            },
            clog: (function(a) {
                return function() {}
            }(window)),
            trim: function(a) {
                if (!a || !a.toString) {
                    return a
                }
                return a.toString().replace(/^\s+|\s+$/g, "")
            },
            ltrim: function(a) {
                if (!a || !a.toString) {
                    return a
                }
                return a.toString().replace(/^\s+/, "")
            },
            rtrim: function(a) {
                if (!a || !a.toString) {
                    return a
                }
                return a.toString().replace(/\s+$/, "")
            },
            setCookie: function(i, a, h, v, d) {
                var f, g, e, c, b = "",
                    u;
                if (!i) {
                    return
                }
                i = encodeURIComponent(i);
                a = encodeURIComponent(a);
                e = (d || location.hostname).split(".");
                u = ";path=" + (v || "/");
                if (typeof h === "number") {
                    if (this.isIE) {
                        c = new Date();
                        c.setTime(c.getTime() + (h * 1000));
                        b = ";expires=" + c.toUTCString()
                    } else {
                        b = ";max-age=" + h
                    }
                }
                for (g = e.length, f = (g === 1 ? 1 : 2); f <= g; f += 1) {
                    document.cookie = i + "=" + a + ";domain=" + e.slice(-f).join(".") + u + b;
                    if (this.getCookieValue(i) === a) {
                        break
                    }
                    if (g === 1) {
                        document.cookie = i + "=" + a + u + b
                    }
                }
            },
            getCookieValue: function(g, i) {
                var d, e, c, h, b = null,
                    a;
                try {
                    i = i || document.cookie;
                    if (!g || !g.toString) {
                        return null
                    }
                    g += "=";
                    a = g.length;
                    h = i.split(";");
                    for (d = 0, e = h.length; d < e; d += 1) {
                        c = h[d];
                        c = p.ltrim(c);
                        if (c.indexOf(g) === 0) {
                            b = c.substring(a, c.length);
                            break
                        }
                    }
                } catch (f) {
                    b = null
                }
                return b
            },
            getQueryStringValue: function(e, h, a) {
                var d, c, i, b = null,
                    f;
                try {
                    a = a || window.location.search;
                    i = a.length;
                    if (!e || !e.toString || !i) {
                        return null
                    }
                    h = h || "&";
                    a = h + a.substring(1);
                    e = h + e + "=";
                    d = a.indexOf(e);
                    if (d !== -1) {
                        f = d + e.length;
                        c = a.indexOf(h, f);
                        if (c === -1) {
                            c = i
                        }
                        b = decodeURIComponent(a.substring(f, c))
                    }
                } catch (g) {}
                return b
            },
            addEventListener: (function() {
                if (window.addEventListener) {
                    return function(b, a, c) {
                        b.addEventListener(a, c, false)
                    }
                }
                return function(b, a, c) {
                    b.attachEvent("on" + a, c)
                }
            }()),
            matchTarget: function(x, g) {
                var e, c, d, w = -1,
                    i, a, b, f, h, y = document;
                if (!x || !g) {
                    return w
                }
                if (!this.browserService || !this.browserBaseService) {
                    this.browserService = TLT.getService("browser");
                    this.browserBaseService = TLT.getService("browserBase")
                }
                if (g.idType === -2) {
                    d = this.browserBaseService.getNodeFromID(g.id, g.idType);
                    y = this.getDocument(d)
                }
                for (e = 0, f = x.length; e < f && w === -1; e += 1) {
                    h = x[e];
                    if (typeof h === "string") {
                        i = this.browserService.queryAll(h, y);
                        for (c = 0, a = i ? i.length : 0; c < a; c += 1) {
                            if (i[c]) {
                                b = this.browserBaseService.ElementData.prototype.examineID(i[c]);
                                if (b.idType === g.idType && b.id === g.id) {
                                    w = e;
                                    break
                                }
                            }
                        }
                    } else {
                        if (h && h.id && h.idType && g.idType && g.idType.toString() === h.idType.toString()) {
                            switch (typeof h.id) {
                                case "string":
                                    if (h.id === g.id) {
                                        w = e
                                    }
                                    break;
                                case "object":
                                    if (!h.cRegex) {
                                        h.cRegex = new RegExp(h.id.regex, h.id.flags)
                                    }
                                    h.cRegex.lastIndex = 0;
                                    if (h.cRegex.test(g.id)) {
                                        w = e
                                    }
                                    break
                            }
                        }
                    }
                }
                return w
            },
            WeakMap: (function() {
                function a(e, d) {
                    var c, b;
                    e = e || [];
                    for (c = 0, b = e.length; c < b; c += 1) {
                        if (e[c][0] === d) {
                            return c
                        }
                    }
                    return -1
                }
                return function() {
                    var b = [];
                    this.set = function(d, e) {
                        var c = a(b, d);
                        b[c > -1 ? c : b.length] = [d, e]
                    };
                    this.get = function(d) {
                        var c = b[a(b, d)];
                        return (c ? c[1] : undefined)
                    };
                    this.clear = function() {
                        b = []
                    };
                    this.has = function(c) {
                        return (a(b, c) >= 0)
                    };
                    this.remove = function(d) {
                        var c = a(b, d);
                        if (c >= 0) {
                            b.splice(c, 1)
                        }
                    };
                    this["delete"] = this.remove
                }
            }())
        };
    if (typeof TLT === "undefined" || !TLT) {
        window.TLT = {}
    }
    TLT.utils = p
}());
(function() {
    TLT.EventTarget = function() {
        this._handlers = {}
    };
    TLT.EventTarget.prototype = {
        constructor: TLT.EventTarget,
        publish: function(i, l) {
            var j = 0,
                g = 0,
                h = this._handlers[i],
                k = {
                    type: i,
                    data: l
                };
            if (typeof h !== "undefined") {
                for (g = h.length; j < g; j += 1) {
                    h[j](k)
                }
            }
        },
        subscribe: function(c, d) {
            if (!this._handlers.hasOwnProperty(c)) {
                this._handlers[c] = []
            }
            this._handlers[c].push(d)
        },
        unsubscribe: function(h, j) {
            var i = 0,
                f = 0,
                g = this._handlers[h];
            if (g) {
                for (f = g.length; i < f; i += 1) {
                    if (g[i] === j) {
                        g.splice(i, 1);
                        return
                    }
                }
            }
        }
    }
}());
TLT.ModuleContext = (function() {
    var b = ["broadcast", "getConfig:getModuleConfig", "listen", "post", "getXPathFromNode", "performDOMCapture", "performFormCompletion", "isInitialized", "getStartTime"];
    return function(m, k) {
        var o = {},
            n = 0,
            a = b.length,
            p = null,
            l = null,
            i = null;
        for (n = 0; n < a; n += 1) {
            p = b[n].split(":");
            if (p.length > 1) {
                i = p[0];
                l = p[1]
            } else {
                i = p[0];
                l = p[0]
            }
            o[i] = (function(c) {
                return function() {
                    var d = k.utils.convertToArray(arguments);
                    d.unshift(m);
                    return k[c].apply(k, d)
                }
            }(l))
        }
        o.utils = k.utils;
        return o
    }
}());
TLT.addService("config", function(e) {
    function h(b, a) {
        e.utils.extend(true, b, a);
        g.publish("configupdated", g.getConfig())
    }
    var f = {
            core: {},
            modules: {},
            services: {}
        },
        g = e.utils.extend(false, e.utils.createObject(new TLT.EventTarget()), {
            getConfig: function() {
                return f
            },
            updateConfig: function(a) {
                h(f, a)
            },
            getCoreConfig: function() {
                return f.core
            },
            updateCoreConfig: function(a) {
                h(f.core, a)
            },
            getServiceConfig: function(a) {
                return f.services[a] || {}
            },
            updateServiceConfig: function(b, a) {
                if (typeof f.services[b] === "undefined") {
                    f.services[b] = {}
                }
                h(f.services[b], a)
            },
            getModuleConfig: function(a) {
                return f.modules[a] || {}
            },
            updateModuleConfig: function(b, a) {
                if (typeof f.modules[b] === "undefined") {
                    f.modules[b] = {}
                }
                h(f.modules[b], a)
            },
            destroy: function() {
                f = {
                    core: {},
                    modules: {},
                    services: {}
                }
            }
        });
    return g
});
TLT.addService("queue", function(ao) {
    var M = ao.utils,
        aa = null,
        T = {},
        ag = 600000,
        V = ao.getService("ajax"),
        af = ao.getService("browser"),
        ah = ao.getService("encoder"),
        ac = ao.getService("serializer"),
        U = ao.getService("config"),
        Z = ao.getService("message"),
        ak = null,
        Y = {},
        N = true,
        an = {
            5: {
                limit: 300,
                count: 0
            },
            6: {
                limit: 400,
                count: 0
            }
        },
        ae = [],
        aj = false,
        ad = (function() {
            var e = {};

            function h(i) {
                return typeof e[i] !== "undefined"
            }

            function a(i, j) {
                if (!h(i)) {
                    e[i] = {
                        lastOffset: 0,
                        data: [],
                        queueId: i,
                        url: j.url,
                        eventThreshold: j.eventThreshold,
                        sizeThreshold: j.sizeThreshold || 0,
                        size: -1,
                        serializer: j.serializer,
                        encoder: j.encoder,
                        crossDomainEnabled: !!j.crossDomainEnabled,
                        crossDomainIFrame: j.crossDomainIFrame
                    }
                }
                return e[i]
            }

            function c(i) {
                if (h(i)) {
                    delete e[i]
                }
            }

            function f(i) {
                if (h(i)) {
                    return e[i]
                }
                return null
            }

            function d(j) {
                var i = f(j);
                if (i !== null) {
                    i.data = []
                }
            }

            function g(i) {
                var j = null;
                if (h(i)) {
                    j = f(i).data;
                    d(i)
                }
                return j
            }

            function b(k, m) {
                var i = null,
                    l = null,
                    o = window.tlBridge,
                    j = window.iOSJSONShuttle;
                try {
                    l = ac.serialize(m)
                } catch (n) {
                    l = "Serialization failed: " + (n.name ? n.name + " - " : "") + n.message;
                    m = {
                        error: l
                    }
                }
                if ((typeof o !== "undefined") && (typeof o.addMessage === "function")) {
                    o.addMessage(l)
                } else {
                    if ((typeof j !== "undefined") && (typeof j === "function")) {
                        j(l)
                    } else {
                        if (h(k)) {
                            i = f(k);
                            i.data.push(m);
                            i.data = ao.redirectQueue(i.data);
                            if (i.sizeThreshold) {
                                l = ac.serialize(i.data);
                                i.size = l.length
                            }
                            return i.data.length
                        }
                    }
                }
                return 0
            }
            return {
                exists: h,
                add: a,
                remove: c,
                reset: function() {
                    e = {}
                },
                get: f,
                clear: d,
                flush: g,
                push: b
            }
        }());

    function L(a) {
        if (a && a.id) {
            M.extend(true, ae[a.id - 1], {
                xhrRspEnd: Z.createMessage({
                    type: 0
                }).offset,
                success: a.success,
                statusCode: a.statusCode,
                statusText: a.statusText
            })
        }
    }

    function ai() {
        return window.location.pathname
    }

    function J(c, g, d, f) {
        var a = ad.get(c),
            e = {
                name: g,
                value: d
            },
            b = null;
        if (typeof g !== "string" || typeof d !== "string") {
            return
        }
        if (!a.headers) {
            a.headers = {
                once: [],
                always: []
            }
        }
        b = !!f ? a.headers.always : a.headers.once;
        b.push(e)
    }

    function W(c, f) {
        var e = 0,
            b = 0,
            a = ad.get(c),
            g = a.headers,
            d = null;
        f = f || {};

        function h(j, l) {
            var k = 0,
                i = 0,
                m = null;
            for (k = 0, i = j.length; k < i; k += 1) {
                m = j[k];
                l[m.name] = m.value
            }
        }
        if (g) {
            d = [g.always, g.once];
            for (e = 0, b = d.length; e < b; e += 1) {
                h(d[e], f)
            }
        }
        return f
    }

    function aq(b) {
        var a = null,
            c = null;
        if (!ad.exists(b)) {
            throw new Error("Queue: " + b + " does not exist!")
        }
        a = ad.get(b);
        c = a ? a.headers : null;
        if (c) {
            c.once = []
        }
    }

    function S() {
        var b = 0,
            a, d, c = ao.provideRequestHeaders();
        if (c && c.length) {
            for (b = 0, a = c.length; b < a; b += 1) {
                d = c[b];
                J("DEFAULT", d.name, d.value, d.recurring)
            }
        }
        return b
    }

    function X(e) {
        var d, a, c = [],
            b = "";
        if (!e || !e.length) {
            return b
        }
        for (d = 0, a = e.length; d < a; d += 1) {
            c[e[d].type] = true
        }
        for (d = 0, a = c.length; d < a; d += 1) {
            if (c[d]) {
                if (b) {
                    b += ","
                }
                b += d
            }
        }
        return b
    }

    function K(c, n) {
        var i = ad.get(c),
            h = i.url ? ad.flush(c) : null,
            j = h ? h.length : 0,
            d = {
                "Content-Type": "application/json",
                "X-PageId": ao.getPageId(),
                "X-Tealeaf": "device (UIC) Lib/5.4.1.1813",
                "X-TealeafType": "GUI",
                "X-TeaLeaf-Page-Url": ai(),
                "X-Tealeaf-SyncXHR": (!!n).toString()
            },
            l = null,
            f = Z.createMessage({
                type: 0
            }).offset,
            o = i.serializer || "json",
            b = i.encoder,
            e, g, a, m = null;
        if (!j || !i) {
            return
        }
        a = f - h[j - 1].offset;
        if (a > (ag + 60000)) {
            return
        }
        i.lastOffset = h[j - 1].offset;
        d["X-Tealeaf-MessageTypes"] = X(h);
        h = Z.wrapMessages(h);
        if (aa.xhrLogging) {
            l = h.serialNumber;
            ae[l - 1] = {
                serialNumber: l,
                xhrReqStart: f
            };
            h.log = {
                xhr: ae
            }
        }
        if (o) {
            h = ac.serialize(h, o)
        }
        if (b) {
            g = ah.encode(h, b);
            if (g) {
                if (g.data && !g.error) {
                    h = g.data;
                    d["Content-Encoding"] = g.encoding
                } else {
                    h = g.error
                }
            }
        }
        S();
        W(c, d);
        if (i.crossDomainEnabled) {
            m = M.getIFrameWindow(i.crossDomainIFrame);
            if (!m) {
                return
            }
            e = {
                request: {
                    id: l,
                    url: i.url,
                    async: !n,
                    headers: d,
                    data: h
                }
            };
            if (!M.isIE && typeof window.postMessage === "function") {
                m.postMessage(e, i.crossDomainIFrame.src)
            } else {
                try {
                    m.sendMessage(e)
                } catch (k) {
                    return
                }
            }
        } else {
            V.sendRequest({
                id: l,
                oncomplete: L,
                url: i.url,
                async: !n,
                headers: d,
                data: h
            })
        }
        aq(c)
    }

    function R(d) {
        var a = null,
            c = aa.queues,
            b = 0;
        for (b = 0; b < c.length; b += 1) {
            a = c[b];
            K(a.qid, d)
        }
        return true
    }

    function ab(c, e) {
        var b, f = Z.createMessage(e),
            a = ad.get(c),
            d, g;
        b = a.data.length;
        if (b) {
            g = f.offset - a.data[b - 1].offset;
            if (g > ag) {
                ad.flush(c);
                ao.destroy();
                return
            }
        }
        b = ad.push(c, f);
        d = a.size;
        if ((b >= a.eventThreshold || d >= a.sizeThreshold) && N && ao.getState() !== "unloading") {
            K(c)
        }
    }

    function al(c) {
        var a, b = false;
        if (!c || !c.type) {
            return true
        }
        a = an[c.type];
        if (a) {
            a.count += 1;
            if (a.count > a.limit) {
                b = true;
                if (a.count === a.limit + 1) {
                    ab("DEFAULT", {
                        type: 16,
                        dataLimit: {
                            messageType: c.type,
                            maxCount: a.limit
                        }
                    })
                }
            }
        }
        return b
    }

    function P(c) {
        var b = null,
            f = aa.queues,
            e = "",
            d = 0,
            a = 0;
        for (d = 0; d < f.length; d += 1) {
            b = f[d];
            if (b && b.modules) {
                for (a = 0; a < b.modules.length; a += 1) {
                    e = b.modules[a];
                    if (e === c) {
                        return b.qid
                    }
                }
            }
        }
        return ak.qid
    }

    function O(c, a) {
        Y[c] = window.setTimeout(function b() {
            K(c);
            Y[c] = window.setTimeout(b, a)
        }, a)
    }

    function ar() {
        var a = 0;
        for (a in Y) {
            if (Y.hasOwnProperty(a)) {
                window.clearTimeout(Y[a]);
                delete Y[a]
            }
        }
        Y = {}
    }

    function ap(a) {}

    function am(a) {
        aa = a;
        T = ao.getCoreConfig();
        ag = M.getValue(T, "inactivityTimeout", 600000);
        M.forEach(aa.queues, function(b, c) {
            var d = null;
            if (b.qid === "DEFAULT") {
                ak = b
            }
            if (b.crossDomainEnabled) {
                d = af.query(b.crossDomainFrameSelector);
                if (!d) {
                    ao.fail("Cross domain iframe not found")
                }
            }
            ad.add(b.qid, {
                url: b.endpoint,
                eventThreshold: b.maxEvents,
                sizeThreshold: b.maxSize || 0,
                serializer: b.serializer,
                encoder: b.encoder,
                timerInterval: b.timerInterval || 0,
                crossDomainEnabled: b.crossDomainEnabled || false,
                crossDomainIFrame: d
            });
            if (typeof b.timerInterval !== "undefined" && b.timerInterval > 0) {
                O(b.qid, b.timerInterval)
            }
        });
        U.subscribe("configupdated", ap);
        aj = true
    }

    function Q() {
        if (N) {
            R(!aa.asyncReqOnUnload)
        }
        U.unsubscribe("configupdated", ap);
        ar();
        ad.reset();
        aa = null;
        ak = null;
        aj = false
    }
    return {
        init: function() {
            if (!aj) {
                am(U.getServiceConfig("queue") || {})
            } else {}
        },
        destroy: function() {
            Q()
        },
        _getQueue: function(a) {
            return ad.get(a).data
        },
        setAutoFlush: function(a) {
            if (a === true) {
                N = true
            } else {
                N = false
            }
        },
        flush: function(a) {
            a = a || ak.qid;
            if (!ad.exists(a)) {
                throw new Error("Queue: " + a + " does not exist!")
            }
            K(a)
        },
        flushAll: function(a) {
            return R(!!a)
        },
        post: function(b, c, a) {
            if (!ao.isInitialized()) {
                return
            }
            a = a || P(b);
            if (!ad.exists(a)) {
                return
            }
            if (!al(c)) {
                ab(a, c)
            }
        }
    }
});
TLT.addService("browserBase", function(ap) {
    var aa, aj = ap.utils,
        ac = {
            optgroup: true,
            option: true,
            nobr: true
        },
        ao = {},
        U, al = null,
        N, av, Y, at, X = false;

    function aq() {
        U = ap.getService("config");
        al = ap.getService("serializer");
        N = U ? U.getServiceConfig("browser") : {};
        av = N.hasOwnProperty("blacklist") ? N.blacklist : [];
        Y = N.hasOwnProperty("customid") ? N.customid : []
    }

    function O() {
        aq();
        if (U) {
            U.subscribe("configupdated", aq)
        }
        X = true
    }

    function Z() {
        if (U) {
            U.unsubscribe("configupdated", aq)
        }
        X = false
    }

    function au(d) {
        var b, a, c;
        if (!d || !d.id || typeof d.id !== "string") {
            return false
        }
        for (b = 0, a = av.length; b < a; b += 1) {
            if (typeof av[b] === "string") {
                if (d.id === av[b]) {
                    return false
                }
            } else {
                if (typeof av[b] === "object") {
                    if (!av[b].cRegex) {
                        av[b].cRegex = new RegExp(av[b].regex, av[b].flags)
                    }
                    av[b].cRegex.lastIndex = 0;
                    if (av[b].cRegex.test(d.id)) {
                        return false
                    }
                }
            }
        }
        return true
    }

    function an(c, d) {
        var a = {
                type: null,
                subType: null
            },
            b;
        if (!c) {
            return a
        }
        b = c.type;
        switch (b) {
            case "focusin":
                b = "focus";
                break;
            case "focusout":
                b = "blur";
                break;
            default:
                break
        }
        a.type = b;
        return a
    }

    function ax(b) {
        var a = {
            type: null,
            subType: null
        };
        if (!b) {
            return a
        }
        a.type = aj.getTagName(b);
        a.subType = b.type || null;
        return a
    }

    function Q(a, c, b) {
        var g = {
                HTML_ID: "-1",
                XPATH_ID: "-2",
                ATTRIBUTE_ID: "-3"
            },
            f, d = null,
            e;
        if (!a || !c) {
            return d
        }
        f = b || window.document;
        c = c.toString();
        if (c === g.HTML_ID) {
            if (f.getElementById) {
                d = f.getElementById(a)
            } else {
                if (f.querySelector) {
                    d = f.querySelector("#" + a)
                }
            }
        } else {
            if (c === g.ATTRIBUTE_ID) {
                e = a.split("=");
                if (f.querySelector) {
                    d = f.querySelector("[" + e[0] + '="' + e[1] + '"]')
                }
            } else {
                if (c === g.XPATH_ID) {
                    d = ao.xpath(a, f)
                }
            }
        }
        return d
    }
    at = (function() {
        var a = {
            nobr: true,
            p: true
        };

        function b(g, e) {
            var j, h, i = false,
                m = null,
                c = null,
                n = null,
                l = [],
                k = true,
                f = ap._getLocalTop(),
                d = "";
            while (k) {
                k = false;
                if (!aj.isUndefOrNull(g)) {
                    d = aj.getTagName(g);
                    if (!aj.isUndefOrNull(d)) {
                        if (a.hasOwnProperty(d)) {
                            g = g.parentNode;
                            d = aj.getTagName(g)
                        }
                    }
                    for (i = au(g); g !== document && (!i || e); i = au(g)) {
                        n = g.parentNode;
                        if (!n) {
                            c = ap.utils.getWindow(g);
                            if (!c) {
                                return l
                            }
                            n = (c !== f) ? c.frameElement : document
                        }
                        m = n.firstChild;
                        if (typeof m === "undefined") {
                            return l
                        }
                        for (h = 0; m; m = m.nextSibling) {
                            if (m.nodeType === 1 && aj.getTagName(m) === d) {
                                if (m === g) {
                                    l[l.length] = [d, h];
                                    break
                                }
                                h += 1
                            }
                        }
                        g = n;
                        d = aj.getTagName(g)
                    }
                    if (i && !e) {
                        l[l.length] = [g.id];
                        if (ap.utils.isIFrameDescendant(g)) {
                            k = true;
                            g = ap.utils.getWindow(g).frameElement
                        }
                    }
                }
            }
            return l
        }
        return function(f, d) {
            var c = b(f, !!d),
                g = [],
                e = c.length;
            if (e < 1) {
                return "null"
            }
            while (e) {
                e -= 1;
                if (c[e].length > 1) {
                    g[g.length] = '["' + c[e][0] + '",' + c[e][1] + "]"
                } else {
                    g[g.length] = "[" + al.serialize(c[e][0], "json") + "]"
                }
            }
            return ("[" + g.join(",") + "]")
        }
    }());

    function ah(b) {
        var c = {
                left: -1,
                top: -1
            },
            a;
        b = b || document;
        a = b.documentElement || b.body.parentNode || b.body;
        c.left = Math.round((typeof window.pageXOffset === "number") ? window.pageXOffset : a.scrollLeft);
        c.top = Math.round((typeof window.pageYOffset === "number") ? window.pageYOffset : a.scrollTop);
        return c
    }

    function af(a) {
        return a && typeof a.originalEvent !== "undefined" && typeof a.isDefaultPrevented !== "undefined" && !a.isSimulated
    }

    function ag(a) {
        if (!a) {
            return null
        }
        if (a.type && a.type.indexOf("touch") === 0) {
            if (af(a)) {
                a = a.originalEvent
            }
            if (a.type === "touchstart") {
                a = a.touches[a.touches.length - 1]
            } else {
                if (a.type === "touchend") {
                    a = a.changedTouches[0]
                }
            }
        }
        return a
    }

    function ar(d) {
        var g = d || window.event,
            f = document.documentElement,
            a = document.body,
            e = false,
            c = null,
            b = 0;
        if (af(g)) {
            g = g.originalEvent
        }
        if (typeof d === "undefined" || typeof g.target === "undefined") {
            g.target = g.srcElement || window.window;
            g.timeStamp = Number(new Date());
            if (g.pageX === null || typeof g.pageX === "undefined") {
                g.pageX = g.clientX + ((f && f.scrollLeft) || (a && a.scrollLeft) || 0) - ((f && f.clientLeft) || (a && a.clientLeft) || 0);
                g.pageY = g.clientY + ((f && f.scrollTop) || (a && a.scrollTop) || 0) - ((f && f.clientTop) || (a && a.clientTop) || 0)
            }
            g.preventDefault = function() {
                this.returnValue = false
            };
            g.stopPropagation = function() {
                this.cancelBubble = true
            }
        }
        if (window.chrome && g.path !== undefined && g.type === "click") {
            if (g.path.length === undefined) {
                return g
            }
            for (b = 0; b < g.path.length; b++) {
                if (aj.getTagName(g.path[b]) === "button") {
                    e = true;
                    c = g.path[b];
                    b = g.path.length
                }
            }
            if (e) {
                return {
                    originalEvent: g,
                    target: c,
                    srcElement: c,
                    type: g.type,
                    pageX: document.body.scrollLeft + c.getBoundingClientRect().left,
                    pageY: document.body.scrollTop + c.getBoundingClientRect().top
                }
            }
        }
        return g
    }

    function aw(b) {
        var a = null;
        if (!b) {
            return null
        }
        if (b.srcElement) {
            a = b.srcElement
        } else {
            a = b.target;
            if (!a) {
                a = b.explicitOriginalTarget
            }
            if (!a) {
                a = b.originalTarget
            }
        }
        if (!a && b.type.indexOf("touch") === 0) {
            a = ag(b).target
        }
        while (a && ac[aj.getTagName(a)]) {
            a = a.parentNode
        }
        if (!a && b.srcElement === null) {
            a = window.window
        }
        return a
    }

    function ad(b) {
        var e = 0,
            d = 0,
            c = document.documentElement,
            a = document.body;
        b = ag(b);
        if (b) {
            if (b.pageX || b.pageY) {
                e = b.pageX;
                d = b.pageY
            } else {
                if (b.clientX || b.clientY) {
                    e = b.clientX + (c ? c.scrollLeft : (a ? a.scrollLeft : 0)) - (c ? c.clientLeft : (a ? a.clientLeft : 0));
                    d = b.clientY + (c ? c.scrollTop : (a ? a.scrollTop : 0)) - (c ? c.clientTop : (a ? a.clientTop : 0))
                }
            }
        }
        return {
            x: e,
            y: d
        }
    }
    ao.xpath = function(i, k) {
        var g = null,
            b, h = null,
            a, e, d, c, f, j;
        if (!i) {
            return null
        }
        g = al.parse(i);
        k = k || document;
        b = k;
        if (!g) {
            return null
        }
        for (e = 0, f = g.length; e < f && b; e += 1) {
            h = g[e];
            if (h.length === 1) {
                if (k.getElementById) {
                    b = k.getElementById(h[0])
                } else {
                    if (k.querySelector) {
                        b = k.querySelector("#" + h[0])
                    } else {
                        b = null
                    }
                }
            } else {
                for (d = 0, c = -1, j = b.childNodes.length; d < j; d += 1) {
                    if (b.childNodes[d].nodeType === 1 && aj.getTagName(b.childNodes[d]) === h[0].toLowerCase()) {
                        c += 1;
                        if (c === h[1]) {
                            b = b.childNodes[d];
                            break
                        }
                    }
                }
                if (c === -1) {
                    return null
                }
            }
            a = aj.getTagName(b);
            if (a === "frame" || a === "iframe") {
                b = aj.getIFrameWindow(b).document;
                k = b
            }
        }
        return (b === k || !b) ? null : b
    };

    function ak(a, b) {
        this.x = a || 0;
        this.y = b || 0
    }

    function M(b, a) {
        this.width = Math.round(b || 0);
        this.height = Math.round(a || 0)
    }

    function S(b, c) {
        var e, a, d;
        c = aw(b);
        e = this.examineID(c);
        a = ax(c);
        d = this.examinePosition(b, c);
        this.element = c;
        this.id = e.id;
        this.idType = e.idType;
        this.type = a.type;
        this.subType = a.subType;
        this.state = this.examineState(c);
        this.position = new ak(d.x, d.y);
        this.size = new M(d.width, d.height);
        this.xPath = e.xPath;
        this.name = e.name
    }
    S.HTML_ID = -1;
    S.XPATH_ID = -2;
    S.ATTRIBUTE_ID = -3;
    S.prototype.examineID = function(g) {
        var c, i, j, a, b, e = Y.length,
            d;
        try {
            j = at(g)
        } catch (f) {}
        b = g.name;
        try {
            if (!ap.utils.getWindow(g) || !ap.utils.isIFrameDescendant(g)) {
                if (au(g)) {
                    c = g.id;
                    i = S.HTML_ID
                } else {
                    if (Y.length && g.attributes) {
                        while (e) {
                            e -= 1;
                            d = g.attributes[Y[e]];
                            if (typeof d !== "undefined") {
                                c = Y[e] + "=" + (d.value || d);
                                i = S.ATTRIBUTE_ID
                            }
                        }
                    }
                }
            }
        } catch (h) {}
        if (!c) {
            c = j;
            i = S.XPATH_ID
        }
        return {
            id: c,
            idType: i,
            xPath: j,
            name: b
        }
    };
    S.prototype.examineState = function(g) {
        var a = {
                a: ["innerText", "href"],
                input: {
                    range: ["maxValue:max", "value"],
                    checkbox: ["value", "checked"],
                    radio: ["value", "checked"],
                    image: ["src"]
                },
                select: ["value"],
                button: ["value", "innerText"],
                textarea: ["value"]
            },
            b = aj.getTagName(g),
            h = a[b] || null,
            c = null,
            j = null,
            d = 0,
            f = 0,
            e = null,
            i = "";
        if (h !== null) {
            if (Object.prototype.toString.call(h) === "[object Object]") {
                h = h[g.type] || ["value"]
            }
            j = {};
            for (i in h) {
                if (h.hasOwnProperty(i)) {
                    if (h[i].indexOf(":") !== -1) {
                        e = h[i].split(":");
                        j[e[0]] = g[e[1]]
                    } else {
                        if (h[i] === "innerText") {
                            j[h[i]] = ap.utils.trim(g.innerText || g.textContent)
                        } else {
                            j[h[i]] = g[h[i]]
                        }
                    }
                }
            }
        }
        if (b === "select" && g.options && !isNaN(g.selectedIndex)) {
            j.index = g.selectedIndex;
            if (j.index >= 0 && j.index < g.options.length) {
                c = g.options[g.selectedIndex];
                j.value = c.getAttribute("value") || c.getAttribute("label") || c.text || c.innerText;
                j.text = c.text || c.innerText
            }
        }
        return j
    };

    function V() {
        var b = 1,
            c, e, a;
        if (document.body.getBoundingClientRect) {
            try {
                c = document.body.getBoundingClientRect()
            } catch (d) {
                ap.utils.clog("getBoundingClientRect failed.", d);
                return b
            }
            e = c.right - c.left;
            a = document.body.offsetWidth;
            b = Math.round((e / a) * 100) / 100
        }
        return b
    }

    function am(b) {
        var d, a, c, f;
        if (!b || !b.getBoundingClientRect) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }
        try {
            d = b.getBoundingClientRect();
            f = ah(document)
        } catch (e) {
            ap.utils.clog("getBoundingClientRect failed.", e);
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }
        a = {
            x: d.left + f.left,
            y: d.top + f.top,
            width: d.right - d.left,
            height: d.bottom - d.top
        };
        if (ap.utils.isIE) {
            a.x -= document.documentElement.clientLeft;
            a.y -= document.documentElement.clientTop;
            c = V();
            if (c !== 1) {
                a.x = Math.round(a.x / c);
                a.y = Math.round(a.y / c);
                a.width = Math.round(a.width / c);
                a.height = Math.round(a.height / c)
            }
        }
        return a
    }
    S.prototype.examinePosition = function(b, c) {
        var d = ad(b),
            a = am(c);
        a.x = (d.x || d.y) ? Math.round(Math.abs(d.x - a.x)) : a.width / 2;
        a.y = (d.x || d.y) ? Math.round(Math.abs(d.y - a.y)) : a.height / 2;
        return a
    };

    function ab() {
        var a = (typeof window.orientation === "number") ? window.orientation : 0;
        if (ap.utils.isLandscapeZeroDegrees) {
            if (Math.abs(a) === 180 || Math.abs(a) === 0) {
                a = 90
            } else {
                if (Math.abs(a) === 90) {
                    a = 0
                }
            }
        }
        return a
    }

    function P(g) {
        var d, a, f, e, c, b;
        if (g) {
            return g
        }
        f = ap.getCoreConfig() || {};
        c = f.modules;
        g = {};
        for (b in c) {
            if (c.hasOwnProperty(b) && c[b].events) {
                for (d = 0, a = c[b].events.length; d < a; d += 1) {
                    e = c[b].events[d];
                    if (e.state) {
                        g[e.name] = e.state
                    }
                }
            }
        }
        return g
    }

    function ae(a) {
        var b;
        aa = P(aa);
        if (aa[a.type]) {
            b = aj.getValue(a, aa[a.type], null)
        }
        return b
    }

    function ai(b) {
        var d, a, c;
        this.data = b.data || null;
        this.delegateTarget = b.delegateTarget || null;
        if (b.gesture || (b.originalEvent && b.originalEvent.gesture)) {
            this.gesture = b.gesture || b.originalEvent.gesture;
            this.gesture.idType = (new S(this.gesture, this.gesture.target)).idType
        }
        b = ar(b);
        d = ad(b);
        this.custom = false;
        this.nativeEvent = this.custom === true ? null : b;
        this.position = new ak(d.x, d.y);
        this.target = new S(b, b.target);
        this.orientation = ab();
        c = ae(b);
        if (c) {
            this.target.state = c
        }
        this.timestamp = (new Date()).getTime();
        a = an(b, this.target);
        this.type = a.type;
        this.subType = a.subType
    }

    function T(a) {
        if (ap.isInitialized()) {
            ap._publishEvent(new ai(a))
        } else {}
    }

    function W(e, c) {
        var h, f, g = false,
            k = null,
            a = null,
            l = null,
            j = [],
            i = true,
            d = ap._getLocalTop(),
            b = "";
        while (i) {
            i = false;
            if (aj.isUndefOrNull(e)) {
                break
            }
            b = aj.getTagName(e);
            if (!aj.isUndefOrNull(b)) {
                if (W.specialChildNodes.hasOwnProperty(b)) {
                    e = e.parentNode;
                    i = true;
                    continue
                }
            }
            for (g = au(e); e !== document && (!g || c); g = au(e)) {
                l = e.parentNode;
                if (!l) {
                    a = ap.utils.getWindow(e);
                    if (!a || e.nodeType !== 9) {
                        j.push([b, 0]);
                        break
                    }
                    l = (a !== d) ? a.frameElement : document
                }
                k = l.firstChild;
                if (typeof k === "undefined") {
                    break
                }
                for (f = 0; k; k = k.nextSibling) {
                    if (k.nodeType === 1 && aj.getTagName(k) === b) {
                        if (k === e) {
                            j[j.length] = [b, f];
                            break
                        }
                        f += 1
                    }
                }
                e = l;
                b = aj.getTagName(e)
            }
            if (g && !c) {
                j[j.length] = [e.id];
                if (ap.utils.isIFrameDescendant(e)) {
                    i = true;
                    e = ap.utils.getWindow(e).frameElement
                }
            }
        }
        j.reverse();
        return j
    }
    W.specialChildNodes = {
        nobr: true,
        p: true
    };

    function R(a) {
        var b;
        if (!a || !a.length) {
            return null
        }
        b = al.serialize(a, "json");
        return b
    }

    function ay(e) {
        var d = "",
            b = [],
            a = "",
            c = [];
        if (!(this instanceof ay)) {
            return null
        }
        if (typeof e !== "object") {
            this.fullXpath = "";
            this.xpath = "";
            this.fullXpathList = [];
            this.xpathList = [];
            return
        }
        c = W(e, false);
        if (c.length && c[0].length === 1) {
            b = W(e, true)
        } else {
            b = aj.clone(c)
        }
        this.xpath = R(c);
        this.xpathList = c;
        this.fullXpath = R(b);
        this.fullXpathList = b;
        this.applyPrefix = function(h) {
            var f, g;
            if (!(h instanceof ay) || !h.fullXpathList.length) {
                return
            }
            g = h.fullXpathList[h.fullXpathList.length - 1];
            f = this.fullXpathList.shift();
            if (aj.isEqual(f[0], g[0])) {
                this.fullXpathList = h.fullXpathList.concat(this.fullXpathList)
            } else {
                this.fullXpathList.unshift(f);
                return
            }
            this.fullXpath = R(this.fullXpathList);
            f = this.xpathList.shift();
            if (f.length === 1) {
                this.xpathList.unshift(f);
                return
            }
            this.xpathList = h.xpathList.concat(this.xpathList);
            this.xpath = R(this.xpathList)
        };
        this.compare = function(f) {
            if (!(f instanceof ay)) {
                return 0
            }
            return (this.fullXpathList.length - f.fullXpathList.length)
        };
        this.isSame = function(f) {
            var g = false;
            if (!(f instanceof ay)) {
                return g
            }
            if (this.compare(f) === 0) {
                g = (this.fullXpath === f.fullXpath)
            }
            return g
        };
        this.containedIn = function(g) {
            var h, f;
            if (!(g instanceof ay)) {
                return false
            }
            if (g.fullXpathList.length > this.fullXpathList.length) {
                return false
            }
            for (h = 0, f = g.fullXpathList.length; h < f; h += 1) {
                if (!aj.isEqual(g.fullXpathList[h], this.fullXpathList[h])) {
                    return false
                }
            }
            return true
        }
    }
    ay.prototype = (function() {
        return {}
    }());
    return {
        init: function() {
            if (!X) {
                O()
            } else {}
        },
        destroy: function() {
            Z()
        },
        WebEvent: ai,
        ElementData: S,
        Xpath: ay,
        processDOMEvent: T,
        getNormalizedOrientation: ab,
        getXPathFromNode: function(b, c, a, d) {
            return at(c, a, d)
        },
        getNodeFromID: Q,
        queryDom: ao
    }
});
TLT.addService("browser", function(s) {
    var A = s.utils,
        w = s.getService("config"),
        u = s.getService("browserBase"),
        B = s.getService("ajax"),
        v = null,
        r = null,
        y = w ? w.getServiceConfig("browser") : {},
        q = A.getValue(y, "useCapture", true),
        z = false,
        t = {
            NO_QUERY_SELECTOR: "NOQUERYSELECTOR"
        },
        D = function(a) {
            return function(c) {
                var b = new u.WebEvent(c);
                if (c.type === "resize" || c.type === "hashchange") {
                    setTimeout(function() {
                        a(b)
                    }, 5)
                } else {
                    a(b)
                }
            }
        },
        p = {
            list2Array: function(c) {
                var b = c.length,
                    a = [],
                    d;
                if (typeof c.length === "undefined") {
                    return [c]
                }
                for (d = 0; d < b; d += 1) {
                    a[d] = c[d]
                }
                return a
            },
            find: function(c, b, a) {
                a = a || "css";
                return this.list2Array(this[a](c, b))
            },
            css: function(b, e) {
                var f = this,
                    i = null,
                    g = document.getElementsByTagName("body")[0],
                    h = y.jQueryObject ? A.access(y.jQueryObject) : window.jQuery,
                    d = y.sizzleObject ? A.access(y.sizzleObject) : window.Sizzle;
                if (typeof document.querySelectorAll === "undefined") {
                    f.css = function(k, j) {
                        j = j || document;
                        return f.Sizzle(k, j)
                    };
                    if (typeof f.Sizzle === "undefined") {
                        try {
                            if (g === d("html > body", document)[0]) {
                                f.Sizzle = d
                            }
                        } catch (c) {
                            try {
                                if (g === h(document).find("html > body").get()[0]) {
                                    f.Sizzle = function(k, j) {
                                        return h(j).find(k).get()
                                    }
                                }
                            } catch (a) {
                                s.fail("Sizzle was not found", t.NO_QUERY_SELECTOR)
                            }
                        }
                    }
                } else {
                    f.css = function(k, j) {
                        j = j || document;
                        return j.querySelectorAll(k)
                    }
                }
                return f.css(b, e)
            }
        },
        C = (function() {
            var a = new A.WeakMap();
            return {
                add: function(b) {
                    var c = a.get(b) || [D(b), 0];
                    c[1] += 1;
                    a.set(b, c);
                    return c[0]
                },
                find: function(b) {
                    var c = a.get(b);
                    return c ? c[0] : null
                },
                remove: function(b) {
                    var c = a.get(b);
                    if (c) {
                        c[1] -= 1;
                        if (c[1] <= 0) {
                            a.remove(b)
                        }
                    }
                }
            }
        }());

    function x() {
        p.xpath = u.queryDom.xpath;
        if (typeof document.addEventListener === "function") {
            v = function(c, a, b) {
                c.addEventListener(a, b, q)
            };
            r = function(c, a, b) {
                c.removeEventListener(a, b, q)
            }
        } else {
            if (typeof document.attachEvent !== "undefined") {
                v = function(c, a, b) {
                    c.attachEvent("on" + a, b)
                };
                r = function(c, a, b) {
                    c.detachEvent("on" + a, b)
                }
            } else {
                throw new Error("Unsupported browser")
            }
        }
        z = true
    }
    return {
        init: function() {
            if (!z) {
                x()
            } else {}
        },
        destroy: function() {
            z = false
        },
        getServiceName: function() {
            return "W3C"
        },
        query: function(d, b, a) {
            try {
                return p.find(d, b, a)[0] || null
            } catch (c) {
                return []
            }
        },
        queryAll: function(d, b, a) {
            try {
                return p.find(d, b, a)
            } catch (c) {
                return []
            }
        },
        subscribe: function(a, d, b) {
            var c = C.add(b);
            v(d, a, c)
        },
        unsubscribe: function(a, e, b) {
            var c = C.find(b);
            if (c) {
                try {
                    r(e, a, c)
                } catch (d) {}
                C.remove(b)
            }
        }
    }
});
TLT.addService("ajax", function(o) {
    var t = o.utils,
        r, v = false,
        s = false;

    function p(c) {
        var b = "",
            a = [];
        for (b in c) {
            if (c.hasOwnProperty(b)) {
                a.push([b, c[b]])
            }
        }
        return a
    }

    function q(c) {
        var b = "",
            a = "?";
        for (b in c) {
            if (c.hasOwnProperty(b)) {
                a += encodeURIComponent(b) + "=" + encodeURIComponent(c[b]) + "&"
            }
        }
        return a.slice(0, -1)
    }

    function u(a) {
        var c, d = false,
            b = q(a.headers);
        if (typeof a.data === "string") {
            c = a.data
        } else {
            c = a.data ? new Uint8Array(a.data) : ""
        }
        d = navigator.sendBeacon(a.url + b, c);
        return d
    }

    function l(b) {
        if (typeof b !== "function") {
            return
        }
        return function a(d) {
            var f, c, e = false;
            if (!d) {
                return
            }
            f = d.target;
            if (!f) {
                return b(d)
            }
            c = f.status;
            if (c >= 200 && c < 300) {
                e = true
            }
            b({
                headers: t.extractResponseHeaders(f.getAllResponseHeaders()),
                responseText: f.responseText,
                statusCode: c,
                statusText: f.statusText,
                id: f.id,
                success: e
            })
        }
    }

    function n(i) {
        var h = r(),
            b = [
                ["X-Requested-With", "XMLHttpRequest"]
            ],
            g = 0,
            c = typeof i.async !== "boolean" ? true : i.async,
            e = "",
            f = null,
            d, a;
        if (i.headers) {
            b = b.concat(p(i.headers))
        }
        if (i.contentType) {
            b.push(["Content-Type", i.contentType])
        }
        h.open(i.type.toUpperCase(), i.url, c);
        for (d = 0, a = b.length; d < a; d += 1) {
            e = b[d];
            if (e[0] && e[1]) {
                h.setRequestHeader(e[0], e[1])
            }
        }
        if (i.error) {
            i.error = l(i.error);
            h.addEventListener("error", i.error)
        }
        h.onreadystatechange = f = function() {
            if (h.readyState === 4) {
                h.onreadystatechange = f = function() {};
                if (i.timeout) {
                    window.clearTimeout(g)
                }
                i.oncomplete({
                    id: i.id,
                    headers: t.extractResponseHeaders(h.getAllResponseHeaders()),
                    responseText: (h.responseText || null),
                    statusCode: h.status,
                    statusText: h.statusText,
                    success: (h.status >= 200 && h.status < 300)
                });
                h = null
            }
        };
        h.send(i.data || null);
        f();
        if (i.timeout) {
            g = window.setTimeout(function() {
                if (!h) {
                    return
                }
                h.onreadystatechange = function() {};
                if (h.readyState !== 4) {
                    h.abort();
                    if (typeof i.error === "function") {
                        i.error({
                            id: i.id,
                            statusCode: h.status,
                            statusText: "timeout",
                            success: false
                        })
                    }
                }
                i.oncomplete({
                    id: i.id,
                    headers: t.extractResponseHeaders(h.getAllResponseHeaders()),
                    responseText: (h.responseText || null),
                    statusCode: h.status,
                    statusText: "timeout",
                    success: false
                });
                h = null
            }, i.timeout)
        }
    }

    function m() {
        var a = o.getServiceConfig("queue");
        if (typeof window.XMLHttpRequest !== "undefined") {
            r = function() {
                return new XMLHttpRequest()
            }
        } else {
            r = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
        }
        v = !!a.useBeacon && (typeof navigator.sendBeacon === "function");
        s = true
    }
    return {
        init: function() {
            if (!s) {
                m()
            }
        },
        destroy: function() {
            s = false
        },
        sendRequest: function(a) {
            var c = o.getState() === "unloading",
                b;
            a.type = a.type || "POST";
            if ((c || !a.async) && v) {
                b = u(a);
                if (!b) {
                    n(a)
                }
            } else {
                n(a)
            }
        }
    }
});
TLT.addService("domCapture", function(aS) {
    var al = aS.getService("config"),
        an = aS.getService("browserBase"),
        aM, aj, af = {
            captureFrames: false,
            removeScripts: true,
            removeComments: true
        },
        aJ = {
            childList: true,
            attributes: true,
            attributeOldValue: true,
            characterData: true,
            subtree: true
        },
        X = (typeof window.MutationObserver !== "undefined"),
        aO, ag = aJ,
        aq = [],
        aL = [],
        aK = [],
        aQ = 0,
        ac = 100,
        ab = false,
        aA = false,
        at = false,
        ai = 1,
        aE = function() {},
        aG = function() {},
        aU = function() {},
        aR = aS.utils;

    function ae() {
        aL = [];
        aK = [];
        aQ = 0;
        ab = false
    }

    function aB(a) {
        var d, c, b;
        if (!a || !a.length) {
            return
        }
        a = a.sort(function(f, e) {
            return f.compare(e)
        });
        for (d = 0; d < a.length; d += 1) {
            b = a[d];
            for (c = d + 1; c < a.length; c += 0) {
                if (a[c].containedIn(b)) {
                    a.splice(c, 1)
                } else {
                    c += 1
                }
            }
        }
    }

    function aC(c) {
        var b, a;
        if (!c) {
            return c
        }
        for (b = 0, a = c.length; b < a; b += 1) {
            delete c[b].oldValue
        }
        return c
    }

    function ad(b, e) {
        var d, c, a = false;
        if (!b || !e) {
            return a
        }
        for (d = 0, c = b.length; d < c; d += 1) {
            if (b[d].name === e) {
                a = true;
                break
            }
        }
        return a
    }

    function aT(a, c) {
        var f, e, d, b;
        for (f = 0, e = a.length, b = false; f < e; f += 1) {
            d = a[f];
            if (d.name === c.name) {
                if (d.oldValue === c.value) {
                    a.splice(f, 1)
                } else {
                    d.value = c.value
                }
                b = true;
                break
            }
        }
        if (!b) {
            a.push(c)
        }
        return a
    }

    function ao(a, g) {
        var c, b, h, f, d, e;
        a.removedNodes = g.removedNodes.length;
        a.addedNodes = aR.convertToArray(g.addedNodes);
        for (c = 0, f = aL.length; c < f; c += 1) {
            e = aL[c];
            if (a.isSame(e)) {
                if (a.removedNodes) {
                    for (b = 0; b < g.removedNodes.length; b += 1) {
                        h = e.addedNodes.indexOf(g.removedNodes[b]);
                        if (h !== -1) {
                            e.addedNodes.splice(h, 1);
                            a.removedNodes -= 1
                        }
                    }
                }
                e.removedNodes += a.removedNodes;
                e.addedNodes.concat(a.addedNodes);
                if (!e.removedNodes && !e.addedNodes.length) {
                    aL.splice(c, 1)
                }
                d = true;
                break
            }
        }
        if (!d) {
            aL.push(a)
        }
    }

    function aD(g, c) {
        var a, h, f, d = false,
            b, e;
        for (a = 0, f = aL.length; !d && a < f; a += 1) {
            e = aL[a];
            if (g.containedIn(e)) {
                b = e.addedNodes;
                for (h = 0; h < b.length; h += 1) {
                    if (b[h].contains && b[h].contains(c)) {
                        d = true;
                        break
                    }
                }
            }
        }
        return d
    }

    function aa(h, g) {
        var c, f, b, a, d, e = null;
        b = g.attributeName;
        if (b === "checked" || b === "selected") {
            e = an.ElementData.prototype.examineID(g.target);
            if (aM.isPrivacyMatched(e)) {
                return
            }
            e = null
        }
        if (b === "value") {
            e = an.ElementData.prototype.examineID(g.target);
            e.currState = an.ElementData.prototype.examineState(g.target) || {};
            if (e.currState.value) {
                aM.applyPrivacyToTarget(e)
            } else {
                e = null
            }
        }
        h.attributes = [{
            name: b,
            oldValue: g.oldValue,
            value: e ? e.currState.value : g.target.getAttribute(b)
        }];
        a = h.attributes[0];
        if (a.oldValue === a.value) {
            return
        }
        for (c = 0, f = aK.length, d = false; c < f; c += 1) {
            e = aK[c];
            if (h.isSame(e)) {
                e.attributes = aT(e.attributes, a);
                if (!e.attributes.length) {
                    aK.splice(c, 1)
                } else {
                    if (aD(h, g.target)) {
                        aK.splice(c, 1)
                    }
                }
                d = true;
                break
            }
        }
        if (!d && !aD(h, g.target)) {
            aK.push(h)
        }
    }

    function au(a) {
        var c, d, b, e, f;
        if (!a || !a.length) {
            return
        }
        aQ += a.length;
        if (aQ >= ac) {
            if (!ab) {
                ab = true
            }
            return
        }
        for (c = 0, d = a.length; c < d; c += 1) {
            e = a[c];
            f = new an.Xpath(e.target);
            if (f) {
                b = f.fullXpathList;
                if (b.length && b[0][0] === "html") {
                    switch (e.type) {
                        case "characterData":
                        case "childList":
                            ao(f, e);
                            break;
                        case "attributes":
                            aa(f, e);
                            break;
                        default:
                            aR.clog("Unknown mutation type: " + e.type);
                            break
                    }
                }
            }
        }
    }

    function aI() {
        var a;
        a = new window.MutationObserver(function(b) {
            if (b) {
                au(b);
                aR.clog("Processed [" + b.length + "] mutation records.")
            }
        });
        return a
    }

    function ap(b) {
        var c, a;
        al.subscribe("configupdated", aU);
        aM = aS.getService("message");
        aj = b;
        aj.options = aR.mixin({}, af, aj.options);
        X = X && aR.getValue(aj, "diffEnabled", true);
        ac = aR.getValue(aj.options, "maxMutations", 100);
        if (X) {
            ag = aR.getValue(aj, "diffObserverConfig", aJ);
            aO = aI();
            aq.push(window)
        }
        at = true
    }

    function az() {
        al.unsubscribe("configupdated", aU);
        if (aO) {
            aO.disconnect()
        }
        at = false
    }

    function aw() {
        var a;
        a = "tlt-" + aR.getSerialNumber();
        return a
    }

    function ah(a, d) {
        var c, b;
        if (!a || !a.getElementsByTagName || !d) {
            return
        }
        b = a.getElementsByTagName(d);
        if (b && b.length) {
            for (c = b.length - 1; c >= 0; c -= 1) {
                b[c].parentNode.removeChild(b[c])
            }
        }
        return a
    }

    function am(d, b) {
        var c, a;
        for (c = 0; d.hasChildNodes() && c < d.childNodes.length; c += 1) {
            a = d.childNodes[c];
            if (a.nodeType === b) {
                d.removeChild(a);
                c -= 1
            } else {
                if (a.hasChildNodes()) {
                    am(a, b)
                }
            }
        }
        return d
    }

    function aH(c) {
        var b, a = null;
        if (!c || !c.doctype) {
            return null
        }
        b = c.doctype;
        if (b) {
            a = "<!DOCTYPE " + b.name + (b.publicId ? ' PUBLIC "' + b.publicId + '"' : "") + (!b.publicId && b.systemId ? " SYSTEM" : "") + (b.systemId ? ' "' + b.systemId + '"' : "") + ">"
        }
        return a
    }

    function aF(d, e) {
        var c, h, b, a, g, f;
        if (!e) {
            return
        }
        a = d.getElementsByTagName("input");
        g = e.getElementsByTagName("input");
        if (g) {
            for (c = 0, f = g.length; c < f; c += 1) {
                h = a[c];
                b = g[c];
                switch (b.type) {
                    case "checkbox":
                    case "radio":
                        if (aR.isIE ? h.checked : b.checked) {
                            b.setAttribute("checked", "checked")
                        } else {
                            b.removeAttribute("checked")
                        }
                        break;
                    default:
                        b.setAttribute("value", b.value);
                        if (!b.getAttribute("type")) {
                            b.setAttribute("type", "text")
                        }
                        break
                }
            }
        }
    }

    function ar(d, e) {
        var a, f, c, g, h, b;
        if (!d || !d.getElementsByTagName || !e || !e.getElementsByTagName) {
            return
        }
        g = d.getElementsByTagName("textarea");
        b = e.getElementsByTagName("textarea");
        if (g && b) {
            for (a = 0, f = g.length; a < f; a += 1) {
                c = g[a];
                h = b[a];
                h.setAttribute("value", c.value);
                h.value = h.textContent = c.value
            }
        }
    }

    function av(g, c) {
        var h, e, d, f, a, i, b;
        if (!g || !g.getElementsByTagName || !c || !c.getElementsByTagName) {
            return
        }
        e = g.getElementsByTagName("select");
        f = c.getElementsByTagName("select");
        if (e) {
            for (a = 0, b = e.length; a < b; a += 1) {
                h = e[a];
                d = f[a];
                for (i = 0; i < h.options.length; i += 1) {
                    if (i === h.selectedIndex || h.options[i].selected) {
                        d.options[i].setAttribute("selected", "selected")
                    } else {
                        d.options[i].removeAttribute("selected")
                    }
                }
            }
        }
    }

    function Y(b) {
        var a, c = null;
        if (b) {
            a = b.nodeType || -1;
            switch (a) {
                case 9:
                    c = b.documentElement ? b.documentElement.outerHTML : "";
                    break;
                case 1:
                    c = b.outerHTML;
                    break;
                default:
                    c = null;
                    break
            }
        }
        return c
    }

    function aP(c) {
        var a, b = false;
        if (c && typeof c === "object") {
            a = c.nodeType || -1;
            switch (a) {
                case 9:
                case 1:
                    b = true;
                    break;
                default:
                    b = false;
                    break
            }
        }
        return b
    }

    function Z(e, n, r) {
        var h, g, i, o, f = ["iframe", "frame"],
            m, s, c, l, a, k, b = {
                frames: []
            },
            p, d, q;
        for (g = 0; g < f.length; g += 1) {
            o = f[g];
            p = e.getElementsByTagName(o);
            d = n.getElementsByTagName(o);
            if (p) {
                for (h = 0, i = p.length; h < i; h += 1) {
                    try {
                        m = p[h];
                        s = aR.getIFrameWindow(m);
                        if (s && s.document && s.location.href !== "about:blank") {
                            c = s.document;
                            l = aG(c, c, "", r);
                            a = aw();
                            d[h].setAttribute("tltid", a);
                            l.tltid = a;
                            q = aR.getOriginAndPath(c.location);
                            l.host = q.origin;
                            l.url = q.path;
                            l.charset = c.characterSet || c.charset;
                            k = d[h].getAttribute("src");
                            if (!k) {
                                k = s.location.href;
                                d[h].setAttribute("src", k)
                            }
                            b.frames = b.frames.concat(l.frames);
                            delete l.frames;
                            b.frames.push(l)
                        }
                    } catch (j) {}
                }
            }
        }
        return b
    }

    function aN(d) {
        var b, h, f, a, g, c, e = 0;
        if (!d) {
            return e
        }
        if (d.root) {
            e += d.root.length;
            if (d.frames) {
                for (b = 0, f = d.frames.length; b < f; b += 1) {
                    if (d.frames[b].root) {
                        e += d.frames[b].root.length
                    }
                }
            }
        } else {
            if (d.diffs) {
                for (b = 0, f = d.diffs.length; b < f; b += 1) {
                    c = d.diffs[b];
                    e += c.xpath.length;
                    if (c.root) {
                        e += c.root.length
                    } else {
                        if (c.attributes) {
                            for (h = 0, a = c.attributes.length; h < a; h += 1) {
                                g = c.attributes[h];
                                e += g.name.length;
                                if (g.value) {
                                    e += g.value.length
                                }
                            }
                        }
                    }
                }
            }
        }
        return e
    }

    function ax() {
        var a, d, b, c;
        for (a = 0, b = aL.length; a < b && aK.length; a += 1) {
            c = aL[a];
            for (d = 0; d < aK.length; d += 1) {
                if (aK[d].containedIn(c)) {
                    aK.splice(d, 1);
                    d -= 1
                }
            }
        }
    }

    function ay(d, c) {
        var a, b;
        a = aG(d, d, null, c);
        if (!a) {
            a = {}
        }
        a.charset = d.characterSet || d.charset;
        b = aR.getOriginAndPath(d.location);
        a.host = b.origin;
        a.url = b.path;
        return a
    }

    function ak(h) {
        var b, f, a = {
                fullDOM: false,
                diffs: [],
                attributeDiffs: {}
            },
            e, d, g;
        aB(aL);
        ax();
        for (b = 0, f = aL.length; b < f; b += 1) {
            g = aL[b];
            d = an.getNodeFromID(g.xpath, -2);
            if (d === window.document.body) {
                return ay(window.document, h)
            }
            e = aG(window.document, d, g, h);
            e.xpath = g.xpath;
            a.diffs.push(e)
        }

        function c(j, i) {
            if (!j || !j.name) {
                return
            }
            a.attributeDiffs[e.xpath][j.name] = {
                value: j.value
            }
        }
        for (b = 0, f = aK.length; b < f; b += 1) {
            g = aK[b];
            e = {
                xpath: ad(g.attributes, "id") ? g.fullXpath : g.xpath,
                attributes: aC(g.attributes)
            };
            a.diffs.push(e);
            a.attributeDiffs[e.xpath] = {};
            aR.forEach(e.attributes, c)
        }
        return a
    }
    aE = function(a) {
        var b = null;
        if (aP(a)) {
            b = a.cloneNode(true);
            if (!b && a.documentElement) {
                b = a.documentElement.cloneNode(true)
            }
        }
        return b
    };
    aG = function(e, d, b, f) {
        var g, h, a = {},
            c, i;
        if (!e || !d) {
            return a
        }
        g = aE(d, e);
        if (!g) {
            return a
        }
        if (!!f.removeScripts) {
            ah(g, "script");
            ah(g, "noscript")
        }
        if (!!f.removeComments) {
            am(g, 8)
        }
        av(d, g);
        aF(d, g);
        ar(d, g);
        g = aM.applyPrivacyToNode(g, b, e);
        if (!!f.captureFrames) {
            h = Z(d, g, f)
        }
        if (h) {
            a = aR.mixin(a, h)
        }
        c = (aH(d) || "") + Y(g);
        a.root = aM.applyPrivacyPatterns(c);
        return a
    };
    aU = function() {
        al = aS.getService("config");
        ap(al.getServiceConfig("domCapture") || {})
    };
    return {
        init: function() {
            al = aS.getService("config");
            if (!at) {
                ap(al.getServiceConfig("domCapture") || {})
            } else {}
        },
        destroy: function() {
            az()
        },
        observeWindow: function(c) {
            var b, a;
            if (!c) {
                return
            }
            if (!aR.getValue(aj, "options.captureFrames", false) && !(c === window)) {
                return
            }
            if (aR.indexOf(aq, c) === -1) {
                aq.push(c)
            }
        },
        captureDOM: function(g, h) {
            var a, f, d = null,
                b, e = 0;
            if (!at || aR.isLegacyIE) {
                return d
            }
            h = aR.mixin({}, aj.options, h);
            g = g || window.document;
            if (!aA || !X || ab || h.forceFullDOM) {
                if (aO) {
                    aO.disconnect()
                }
                d = ay(g, h);
                d.fullDOM = true;
                d.forced = !!(ab || h.forceFullDOM);
                aA = true;
                if (aO) {
                    for (a = 0, f = aq.length; a < f; a += 1) {
                        b = aq[a];
                        try {
                            aO.observe(b.document, ag)
                        } catch (c) {
                            aq.splice(a, 1);
                            f = aq.length;
                            a -= 1
                        }
                    }
                }
            } else {
                d = ak(h);
                d.fullDOM = d.diffs ? false : true
            }
            if (X) {
                d.mutationCount = aQ
            }
            ae();
            if (h.maxLength) {
                e = aN(d);
                if (e > h.maxLength) {
                    d = {
                        errorCode: 101,
                        error: "Captured length (" + e + ") exceeded limit (" + h.maxLength + ")."
                    }
                }
            }
            return d
        }
    }
});
TLT.addService("encoder", function(i) {
    var n = {},
        o = null,
        j = null,
        l = false;

    function m(b) {
        var a = null;
        if (!b) {
            return a
        }
        a = n[b];
        if (a && typeof a.encode === "string") {
            a.encode = i.utils.access(a.encode)
        }
        return a
    }

    function p(a) {
        n = a;
        o.subscribe("configupdated", j);
        l = true
    }

    function k() {
        o.unsubscribe("configupdated", j);
        l = false
    }
    j = function() {
        o = i.getService("config");
        p(o.getServiceConfig("encoder") || {})
    };
    return {
        init: function() {
            o = i.getService("config");
            if (!l) {
                p(o.getServiceConfig("encoder") || {})
            } else {}
        },
        destroy: function() {
            k()
        },
        encode: function(e, d) {
            var c, a, b = {
                data: null,
                encoding: null,
                error: null
            };
            if ((typeof e !== "string" && !e) || !d) {
                b.error = "Invalid " + (!e ? "data" : "type") + " parameter.";
                return b
            }
            c = m(d);
            if (!c) {
                b.error = "Specified encoder (" + d + ") not found.";
                return b
            }
            if (typeof c.encode !== "function") {
                b.error = "Configured encoder (" + d + ") encode method is not a function.";
                return b
            }
            try {
                a = c.encode(e)
            } catch (f) {
                b.error = "Encoding failed: " + (f.name ? f.name + " - " : "") + f.message;
                return b
            }
            if (!a || i.utils.getValue(a, "buffer", null) === null) {
                b.error = "Encoder (" + d + ") returned an invalid result.";
                return b
            }
            b.data = a.buffer;
            b.encoding = c.defaultEncoding;
            return b
        }
    }
});
TLT.addService("message", function(aC) {
    var au = aC.utils,
        ax = 0,
        az = 0,
        ad = 0,
        ai = 0,
        ay = new Date(),
        ag = aC.getService("browserBase"),
        S = aC.getService("browser"),
        ae = aC.getService("config"),
        aG = ae.getServiceConfig("message") || {},
        ao = window.location.href,
        an = window.location.hostname,
        aw = aG.hasOwnProperty("privacy") ? aG.privacy : [],
        U, V = {},
        ap = {
            lower: "x",
            upper: "X",
            numeric: "9",
            symbol: "@"
        },
        aa = parseFloat((window.devicePixelRatio || 1).toFixed(2)),
        ac = window.screen || {},
        Q = ac.width || 0,
        aE = ac.height || 0,
        ar = ag.getNormalizedOrientation(),
        ak = !au.isiOS ? Q : Math.abs(ar) === 90 ? aE : Q,
        T = !au.isiOS ? aE : Math.abs(ar) === 90 ? Q : aE,
        aj = (window.screen ? window.screen.height - window.screen.availHeight : 0),
        ah = window.innerWidth || document.documentElement.clientWidth,
        aq = window.innerHeight || document.documentElement.clientHeight,
        ab = false;

    function Y(b) {
        var a = "",
            c = b.timestamp || (new Date()).getTime();
        delete b.timestamp;
        this.type = b.type;
        this.offset = c - ay.getTime();
        this.screenviewOffset = 0;
        if (b.type === 2) {
            ax = az;
            az = c;
            if (b.screenview.type === "UNLOAD") {
                this.screenviewOffset = c - (ax || ay.getTime())
            }
        } else {
            if (az) {
                this.screenviewOffset = c - az
            }
        }
        if (!this.type) {
            return
        }
        this.count = (ai += 1);
        this.fromWeb = true;
        for (a in b) {
            if (b.hasOwnProperty(a)) {
                this[a] = b[a]
            }
        }
    }
    V.PVC_MASK_EMPTY = function(a) {
        return ""
    };
    V.PVC_MASK_BASIC = function(b) {
        var a = "XXXXX";
        if (typeof b !== "string") {
            return ""
        }
        return (b.length ? a : "")
    };
    V.PVC_MASK_TYPE = function(e) {
        var b, d = 0,
            a = 0,
            c = "";
        if (typeof e !== "string") {
            return c
        }
        b = e.split("");
        for (d = 0, a = b.length; d < a; d += 1) {
            if (au.isNumeric(b[d])) {
                c += ap.numeric
            } else {
                if (au.isUpperCase(b[d])) {
                    c += ap.upper
                } else {
                    if (au.isLowerCase(b[d])) {
                        c += ap.lower
                    } else {
                        c += ap.symbol
                    }
                }
            }
        }
        return c
    };
    V.PVC_MASK_EMPTY.maskType = 1;
    V.PVC_MASK_BASIC.maskType = 2;
    V.PVC_MASK_TYPE.maskType = 3;
    V.PVC_MASK_CUSTOM = {
        maskType: 4
    };

    function W(a, c) {
        var b = V.PVC_MASK_BASIC;
        if (typeof c !== "string") {
            return c
        }
        if (!a) {
            b = V.PVC_MASK_BASIC
        } else {
            if (a.maskType === V.PVC_MASK_EMPTY.maskType) {
                b = V.PVC_MASK_EMPTY
            } else {
                if (a.maskType === V.PVC_MASK_BASIC.maskType) {
                    b = V.PVC_MASK_BASIC
                } else {
                    if (a.maskType === V.PVC_MASK_TYPE.maskType) {
                        b = V.PVC_MASK_TYPE
                    } else {
                        if (a.maskType === V.PVC_MASK_CUSTOM.maskType) {
                            if (typeof a.maskFunction === "string") {
                                b = au.access(a.maskFunction)
                            } else {
                                b = a.maskFunction
                            }
                            if (typeof b !== "function") {
                                b = V.PVC_MASK_BASIC
                            }
                        }
                    }
                }
            }
        }
        return b(c)
    }

    function R(a, b) {
        var c;
        if (!a || !b) {
            return
        }
        for (c in b) {
            if (b.hasOwnProperty(c)) {
                if (c === "value") {
                    b[c] = W(a, b[c])
                } else {
                    delete b[c]
                }
            }
        }
    }

    function al(a, b) {
        return (au.matchTarget(a, b) !== -1)
    }

    function Z(f) {
        var b, a, c, e, d;
        if (!f) {
            return ""
        }
        for (b = 0, a = U.length; b < a; b += 1) {
            d = U[b];
            d.cRegex.lastIndex = 0;
            f = f.replace(d.cRegex, d.replacement)
        }
        return f
    }

    function X(h) {
        var e, a, d, b, g = false,
            f, c;
        if (!h || (!h.currState && !h.prevState)) {
            return h
        }
        f = h.prevState;
        c = h.currState;
        for (e = 0, a = aw.length; e < a; e += 1) {
            b = aw[e];
            d = au.getValue(b, "exclude", false);
            if (al(b.targets, h) !== d) {
                R(b, f);
                R(b, c);
                g = true;
                break
            }
        }
        if (!g) {
            if (f && f.value) {
                f.value = Z(f.value)
            }
            if (c && c.value) {
                c.value = Z(c.value)
            }
        }
        return h
    }

    function at(a) {
        if (!a || !a.target) {
            return a
        }
        X(a.target);
        return a
    }

    function am(d, b) {
        var c, a, f, e;
        if (!b || !d) {
            return
        }
        if (d.value) {
            f = W(b, d.value);
            d.setAttribute("value", f);
            d.value = f
        }
        if (d.checked) {
            d.removeAttribute("checked")
        }
        if (au.getTagName(d) === "select") {
            d.selectedIndex = -1;
            for (c = 0, a = d.options.length; c < a; c += 1) {
                e = d.options[c];
                e.removeAttribute("selected");
                e.selected = false
            }
        } else {
            if (au.getTagName(d) === "textarea") {
                d.textContent = d.value
            }
        }
    }

    function aB(c, s, d, i, o, r) {
        var e, b, a, f, l, m, q = [],
            g, j, p, n, h, k;
        if (!c.length && !o.length && !r) {
            return []
        }
        k = S.queryAll("input, select, textarea", s);
        if (!k || !k.length) {
            return []
        }
        for (e = 0, f = o.length; e < f; e += 1) {
            b = k.indexOf(o[e]);
            if (b !== -1) {
                k.splice(b, 1)
            }
        }
        if (c.length) {
            for (e = 0, f = k.length, q = []; e < f; e += 1) {
                if (k[e].value) {
                    m = ag.ElementData.prototype.examineID(k[e]);
                    if (m.idType === -2) {
                        g = new ag.Xpath(k[e]);
                        g.applyPrefix(d);
                        m.id = g.xpath
                    }
                    q.push({
                        id: m.id,
                        idType: m.idType,
                        element: k[e]
                    })
                }
            }
        }
        for (e = 0, f = c.length; e < f; e += 1) {
            n = aw[c[e].ruleIndex];
            j = au.getValue(n, "exclude", false);
            h = n.targets[c[e].targetIndex];
            if (typeof h.id === "string" && h.idType === -2) {
                for (b = 0; b < q.length; b += 1) {
                    if (q[b].idType === h.idType && q[b].id === h.id) {
                        if (!j) {
                            l = q[b].element;
                            am(l, n)
                        } else {
                            a = k.indexOf(l);
                            k.splice(a, 1)
                        }
                    }
                }
            } else {
                for (b = 0; b < q.length; b += 1) {
                    h.cRegex.lastIndex = 0;
                    if (q[b].idType === h.idType && h.cRegex.test(q[b].id)) {
                        l = q[b].element;
                        if (!j) {
                            am(l, n)
                        } else {
                            a = k.indexOf(l);
                            k.splice(a, 1)
                        }
                    }
                }
            }
        }
        if (r) {
            for (e = 0, f = k.length; e < f; e += 1) {
                am(k[e], r)
            }
        }
    }

    function av(q, c, i) {
        var d, s, r, l, j, m = [],
            p, e, a, n, k, f, b = [],
            h, g, o;
        if (!q || !i) {
            return null
        }
        for (d = 0, e = aw.length; d < e; d += 1) {
            a = aw[d];
            j = au.getValue(a, "exclude", false);
            if (j) {
                p = a
            }
            g = a.targets;
            for (s = 0, o = g.length; s < o; s += 1) {
                h = g[s];
                if (typeof h === "string") {
                    k = S.queryAll(h, q);
                    if (!j) {
                        for (r = 0, f = k.length; r < f; r += 1) {
                            l = k[r];
                            am(l, a)
                        }
                    } else {
                        m = m.concat(k)
                    }
                } else {
                    if (typeof h.id === "string") {
                        switch (h.idType) {
                            case -1:
                            case -3:
                                l = ag.getNodeFromID(h.id, h.idType, q);
                                if (!j) {
                                    am(l, a)
                                } else {
                                    m.push(l)
                                }
                                break;
                            case -2:
                                b.push({
                                    ruleIndex: d,
                                    targetIndex: s,
                                    exclude: j
                                });
                                break;
                            default:
                                break
                        }
                    } else {
                        b.push({
                            ruleIndex: d,
                            targetIndex: s,
                            exclude: j
                        })
                    }
                }
            }
        }
        aB(b, q, c, i, m, p);
        return q
    }

    function aA(e) {
        var c, a, b, d = false;
        if (!e) {
            return d
        }
        for (c = 0, a = aw.length; c < a; c += 1) {
            b = aw[c];
            if (al(b.targets, e)) {
                d = true;
                break
            }
        }
        return d
    }

    function aD() {
        var d, c, a, g, h, f, b, e;
        ae = aC.getService("config");
        aG = ae.getServiceConfig("message") || {};
        aw = aG.privacy || [];
        U = aG.privacyPatterns || [];
        for (d = 0, h = aw.length; d < h; d += 1) {
            g = aw[d];
            b = g.targets;
            for (c = 0, e = b.length; c < e; c += 1) {
                f = b[c];
                if (typeof f === "object") {
                    if (typeof f.idType === "string") {
                        f.idType = +f.idType
                    }
                    if (typeof f.id === "object") {
                        f.cRegex = new RegExp(f.id.regex, f.id.flags)
                    }
                }
            }
        }
        for (a = U.length, d = a - 1; d >= 0; d -= 1) {
            g = U[d];
            if (typeof g.pattern === "object") {
                g.cRegex = new RegExp(g.pattern.regex, g.pattern.flags)
            } else {
                U.splice(d, 1)
            }
        }
    }

    function aF() {
        if (ae.subscribe) {
            ae.subscribe("configupdated", aD)
        }
        aD();
        ab = true
    }

    function af() {
        ae.unsubscribe("configupdated", aD);
        ab = false
    }
    return {
        init: function() {
            if (!ab) {
                aF()
            } else {}
        },
        destroy: function() {
            af()
        },
        applyPrivacyToNode: av,
        applyPrivacyToMessage: at,
        applyPrivacyToTarget: X,
        applyPrivacyPatterns: Z,
        isPrivacyMatched: aA,
        createMessage: function(a) {
            if (typeof a.type === "undefined") {
                throw new TypeError("Invalid queueEvent given!")
            }
            return at(new Y(a))
        },
        wrapMessages: function(b) {
            var a = {
                    messageVersion: "9.0.0.0",
                    serialNumber: (ad += 1),
                    sessions: [{
                        id: aC.getPageId(),
                        startTime: ay.getTime(),
                        timezoneOffset: ay.getTimezoneOffset(),
                        messages: b,
                        clientEnvironment: {
                            webEnvironment: {
                                libVersion: "5.4.1.1813",
                                domain: an,
                                page: ao,
                                referrer: document.referrer,
                                screen: {
                                    devicePixelRatio: aa,
                                    deviceWidth: ak,
                                    deviceHeight: T,
                                    deviceToolbarHeight: aj,
                                    width: ah,
                                    height: aq,
                                    orientation: ar
                                }
                            }
                        }
                    }]
                },
                c = a.sessions[0].clientEnvironment.webEnvironment.screen;
            c.orientationMode = au.getOrientationMode(c.orientation);
            return a
        }
    }
});
TLT.addService("serializer", function(core) {
    function serializeToJSON(obj) {
        var str, key, len = 0;
        if (typeof obj !== "object" || obj === null) {
            switch (typeof obj) {
                case "function":
                case "undefined":
                    return "null";
                case "string":
                    return '"' + obj.replace(/\"/g, '\\"') + '"';
                default:
                    return String(obj)
            }
        } else {
            if (Object.prototype.toString.call(obj) === "[object Array]") {
                str = "[";
                for (key = 0, len = obj.length; key < len; key += 1) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        str += serializeToJSON(obj[key]) + ","
                    }
                }
            } else {
                str = "{";
                for (key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        str = str.concat('"', key, '":', serializeToJSON(obj[key]), ",");
                        len += 1
                    }
                }
            }
        }
        if (len > 0) {
            str = str.substring(0, str.length - 1)
        }
        str += String.fromCharCode(str.charCodeAt(0) + 2);
        return str
    }
    var configService = core.getService("config"),
        serialize = {},
        parse = {},
        defaultSerializers = {
            json: (function() {
                if (typeof window.JSON !== "undefined") {
                    return {
                        serialize: window.JSON.stringify,
                        parse: window.JSON.parse
                    }
                }
                return {
                    serialize: serializeToJSON,
                    parse: function(data) {
                        return eval("(" + data + ")")
                    }
                }
            }())
        },
        updateConfig = null,
        isInitialized = false;

    function addObjectIfExist(paths, rootObj, propertyName) {
        var i, len, obj;
        paths = paths || [];
        for (i = 0, len = paths.length; i < len; i += 1) {
            obj = paths[i];
            if (typeof obj === "string") {
                obj = core.utils.access(obj)
            }
            if (typeof obj === "function") {
                rootObj[propertyName] = obj;
                break
            }
        }
    }

    function checkParserAndSerializer() {
        var isParserAndSerializerInvalid;
        if (typeof serialize.json !== "function" || typeof parse.json !== "function") {
            isParserAndSerializerInvalid = true
        } else {
            if (typeof parse.json('{"foo": "bar"}') === "undefined") {
                isParserAndSerializerInvalid = true
            } else {
                isParserAndSerializerInvalid = parse.json('{"foo": "bar"}').foo !== "bar"
            }
            if (typeof parse.json("[1, 2]") === "undefined") {
                isParserAndSerializerInvalid = true
            } else {
                isParserAndSerializerInvalid = isParserAndSerializerInvalid || parse.json("[1, 2]")[0] !== 1;
                isParserAndSerializerInvalid = isParserAndSerializerInvalid || parse.json("[1,2]")[1] !== 2
            }
            isParserAndSerializerInvalid = isParserAndSerializerInvalid || serialize.json({
                foo: "bar"
            }) !== '{"foo":"bar"}';
            isParserAndSerializerInvalid = isParserAndSerializerInvalid || serialize.json([1, 2]) !== "[1,2]"
        }
        return isParserAndSerializerInvalid
    }

    function initSerializerService(config) {
        var format;
        for (format in config) {
            if (config.hasOwnProperty(format)) {
                addObjectIfExist(config[format].stringifiers, serialize, format);
                addObjectIfExist(config[format].parsers, parse, format)
            }
        }
        if (!(config.json && config.json.hasOwnProperty("defaultToBuiltin")) || config.json.defaultToBuiltin === true) {
            serialize.json = serialize.json || defaultSerializers.json.serialize;
            parse.json = parse.json || defaultSerializers.json.parse
        }
        if (typeof serialize.json !== "function" || typeof parse.json !== "function") {
            core.fail("JSON parser and/or serializer not provided in the UIC config. Can't continue.")
        }
        if (checkParserAndSerializer()) {
            core.fail("JSON stringification and parsing are not working as expected")
        }
        if (configService) {
            configService.subscribe("configupdated", updateConfig)
        }
        isInitialized = true
    }

    function destroy() {
        serialize = {};
        parse = {};
        if (configService) {
            configService.unsubscribe("configupdated", updateConfig)
        }
        isInitialized = false
    }
    updateConfig = function() {
        configService = core.getService("config");
        initSerializerService(configService.getServiceConfig("serializer"))
    };
    return {
        init: function() {
            var ssConfig;
            if (!isInitialized) {
                ssConfig = configService ? configService.getServiceConfig("serializer") : {};
                initSerializerService(ssConfig)
            } else {}
        },
        destroy: function() {
            destroy()
        },
        parse: function(data, type) {
            type = type || "json";
            return parse[type](data)
        },
        serialize: function(data, type) {
            var serializedData;
            type = type || "json";
            serializedData = serialize[type](data);
            return serializedData
        }
    }
});
TLT.addModule("TLCookie", function(u) {
    var G = {},
        y = "WCXSID",
        r = "TLTSID",
        C = "CoreID6",
        w, z, B = null,
        x = 1800,
        A, t, E = u.utils;

    function s() {
        var a = "123456789",
            b = E.getRandomString(1, a) + E.getRandomString(31, a + "0");
        E.setCookie(r, b);
        return E.getCookieValue(r)
    }

    function v() {
        if (!window.cmRetrieveUserID) {
            return
        }
        window.cmRetrieveUserID(function(a) {
            B = a
        })
    }

    function F(a) {
        var b = [];
        if (a.tlAppKey) {
            A = a.tlAppKey;
            b.push({
                name: "X-Tealeaf-SaaS-AppKey",
                value: A
            })
        }
        if (a.visitorCookieName) {
            C = a.visitorCookieName
        }
        if (a.wcxCookieName) {
            y = a.wcxCookieName
        }
        w = E.getCookieValue(y);
        if (w) {
            b.push({
                name: "X-WCXSID",
                value: w
            })
        }
        if (a.sessionizationCookieName) {
            r = a.sessionizationCookieName
        }
        z = E.getCookieValue(r);
        if (!z) {
            if (w) {
                z = w
            } else {
                z = s()
            }
        }
        b.push({
            name: "X-Tealeaf-SaaS-TLTSID",
            value: z
        });
        if (b.length) {
            TLT.registerBridgeCallbacks([{
                enabled: true,
                cbType: "addRequestHeaders",
                cbFunction: function() {
                    return b
                }
            }])
        }
    }

    function D(f) {
        var c, b, a = false,
            e, d = G.appCookieWhitelist;
        if (!d || !d.length) {
            return a
        }
        for (c = 0, b = d.length; c < b && !a; c += 1) {
            e = d[c];
            if (e.regex) {
                if (!e.cRegex) {
                    e.cRegex = new RegExp(e.regex, e.flags)
                }
                e.cRegex.lastIndex = 0;
                a = e.cRegex.test(f)
            } else {
                a = (e === f)
            }
        }
        return a
    }

    function H() {
        var g, f, h, i = {},
            d, b = document.cookie,
            e = [],
            a = "",
            c = "";
        if (!b) {
            return
        }
        e = b.split("; ");
        for (g = 0, h = e.length; g < h; g += 1) {
            d = e[g];
            f = d.indexOf("=");
            if (f >= 0) {
                try {
                    a = decodeURIComponent(d.substr(0, f))
                } catch (k) {
                    a = d.substr(0, f)
                }
            }
            c = d.substr(f + 1);
            if (D(a)) {
                try {
                    i[a] = decodeURIComponent(c)
                } catch (j) {
                    i[a] = c
                }
            }
        }
        if (B && !i[C]) {
            i[C] = B
        }
        u.post({
            type: 14,
            cookies: i
        })
    }
    return {
        init: function() {
            G = u.getConfig() || {};
            F(G);
            v()
        },
        destroy: function() {},
        onevent: function(a) {
            switch (a.type) {
                case "screenview_load":
                    if (E.getValue(G, "appCookieWhitelist.length", 0)) {
                        v();
                        H()
                    }
                    break;
                default:
                    break
            }
        }
    }
});
if (TLT && typeof TLT.addModule === "function") {
    TLT.addModule("overstat", function(P) {
        var I = P.utils,
            ad = {},
            M = {
                updateInterval: 250,
                hoverThresholdMin: 1000,
                hoverThresholdMax: 2 * 60 * 1000,
                gridCellMaxX: 10,
                gridCellMaxY: 10,
                gridCellMinWidth: 20,
                gridCellMinHeight: 20
            },
            N = 50;

        function am(a) {
            var b = P.getConfig() || {},
                c = b[a];
            return typeof c === "number" ? c : M[a]
        }

        function U(g, a) {
            var f = I.getValue(g, "webEvent.target", {}),
                b = I.getValue(f, "element.tagName") || "",
                c = b.toLowerCase() === "input" ? I.getValue(f, "element.type") : "",
                e = I.getTlType(f),
                d = {
                    type: 9,
                    event: {
                        hoverDuration: g.hoverDuration,
                        hoverToClick: I.getValue(a, "hoverToClick")
                    },
                    target: {
                        id: f.id || "",
                        idType: f.idType || "",
                        name: f.name || "",
                        tlType: e,
                        type: b,
                        subType: c,
                        position: {
                            width: I.getValue(f, "element.offsetWidth", 0),
                            height: I.getValue(f, "element.offsetHeight", 0),
                            relXY: g.relXY
                        }
                    }
                };
            if ((typeof d.target.id) === undefined || d.target.id === "") {
                return
            }
            P.post(d)
        }

        function W(a) {
            if (a && !a.nodeType && a.element) {
                a = a.element
            }
            return a
        }

        function ag(a) {
            a = W(a);
            return !a || a === document.body || a === document.html || a === document
        }

        function X(a) {
            a = W(a);
            if (!a) {
                return null
            }
            return a.parentNode
        }

        function ab(a) {
            a = W(a);
            if (!a) {
                return null
            }
            return a.offsetParent || a.parentElement || X(a)
        }

        function ak(b, c) {
            var a = 0;
            if (!c || c === b) {
                return false
            }
            c = X(c);
            while (!ag(c) && a++ < N) {
                if (c === b) {
                    return true
                }
                c = X(c)
            }
            if (a >= N) {
                I.clog("Overstat isChildOf() hit iterations limit")
            }
            return false
        }

        function Q(a) {
            if (a.nativeEvent) {
                a = a.nativeEvent
            }
            return a
        }

        function an(a) {
            return Q(a).target
        }

        function V(a) {
            a = W(a);
            if (!a) {
                return -1
            }
            return a.nodeType || -1
        }

        function O(a) {
            a = W(a);
            if (!a) {
                return ""
            }
            return a.tagName ? a.tagName.toUpperCase() : ""
        }

        function ah(a) {
            if (!a) {
                return
            }
            if (a.nativeEvent) {
                a = a.nativeEvent
            }
            if (a.stopPropagation) {
                a.stopPropagation()
            } else {
                if (a.cancelBubble) {
                    a.cancelBubble()
                }
            }
        }

        function aa(b) {
            var a = O(b);
            return V(b) !== 1 || a === "TR" || a === "TBODY" || a === "THEAD"
        }

        function T(a) {
            if (!a) {
                return ""
            }
            if (a.xPath) {
                return a.xPath
            }
            a = W(a);
            return P.getXPathFromNode(a)
        }

        function K(b, a) {
            var c = ad[b];
            if (c && c[a]) {
                return c[a]()
            }
        }

        function aj(b, d, c, a) {
            this.xPath = b !== null ? T(b) : "";
            this.domNode = b;
            this.hoverDuration = 0;
            this.hoverUpdateTime = 0;
            this.gridX = Math.max(d, 0);
            this.gridY = Math.max(c, 0);
            this.parentKey = "";
            this.updateTimer = -1;
            this.disposed = false;
            this.childKeys = {};
            this.webEvent = a;
            this.getKey = function() {
                return this.xPath + ":" + this.gridX + "," + this.gridY
            };
            this.update = function() {
                var f = new Date().getTime(),
                    e = this.getKey();
                if (this.hoverUpdateTime !== 0) {
                    this.hoverDuration += f - this.hoverUpdateTime
                }
                this.hoverUpdateTime = f;
                clearTimeout(this.updateTimer);
                this.updateTimer = setTimeout(function() {
                    K(e, "update")
                }, am("updateInterval"))
            };
            this.dispose = function(e) {
                clearTimeout(this.updateTimer);
                delete ad[this.getKey()];
                this.disposed = true;
                if (e) {
                    var f = this.clone();
                    ad[f.getKey()] = f;
                    f.update()
                }
            };
            this.process = function(i) {
                clearTimeout(this.updateTimer);
                if (this.disposed) {
                    return false
                }
                var g = false,
                    h = this,
                    f = null,
                    e = 0;
                if (this.hoverDuration >= am("hoverThresholdMin")) {
                    this.hoverDuration = Math.min(this.hoverDuration, am("hoverThresholdMax"));
                    g = true;
                    U(this, {
                        hoverToClick: !!i
                    });
                    while (typeof h !== "undefined" && e++ < N) {
                        h.dispose(i);
                        h = ad[h.parentKey]
                    }
                    if (e >= N) {
                        I.clog("Overstat process() hit iterations limit")
                    }
                } else {
                    this.dispose(i)
                }
                return g
            };
            this.clone = function() {
                var e = new aj(this.domNode, this.gridX, this.gridY);
                e.parentKey = this.parentKey;
                return e
            }
        }

        function S(c, a, d, b) {
            return new aj(c, a, d, b)
        }

        function af(c) {
            if (c && c.position) {
                return {
                    x: c.position.x,
                    y: c.position.y
                }
            }
            c = W(c);
            var a = c && c.getBoundingClientRect ? c.getBoundingClientRect() : null,
                g = a ? a.left : (c ? c.offsetLeft : 0),
                f = a ? a.top : (c ? c.offsetHeight : 0),
                i = g,
                h = f,
                d = 0,
                b = 0,
                e = ab(c),
                j = 0;
            while (e && j++ < N) {
                if (ag(e)) {
                    break
                }
                d = e.offsetLeft - (e.scrollLeft || 0);
                b = e.offsetTop - (e.scrollTop || 0);
                if (d !== i || b !== h) {
                    g += d;
                    f += b;
                    i = d;
                    h = b
                }
                e = ab(e)
            }
            if (j >= N) {
                I.clog("Overstat calculateNodeOffset() hit iterations limit")
            }
            if (isNaN(g)) {
                g = 0
            }
            if (isNaN(f)) {
                f = 0
            }
            return {
                x: g,
                y: f
            }
        }

        function H(e, c, b) {
            e = W(e);
            var d = af(e),
                a = c - d.x,
                f = b - d.y;
            if (!isFinite(a)) {
                a = 0
            }
            if (!isFinite(f)) {
                f = 0
            }
            return {
                x: a,
                y: f
            }
        }

        function al(a, b) {
            a = Math.floor(Math.min(Math.max(a, 0), 1) * 100) / 100;
            b = Math.floor(Math.min(Math.max(b, 0), 1) * 100) / 100;
            return a + "," + b
        }

        function R(e, h, g) {
            e = W(e);
            var c = e.getBoundingClientRect ? e.getBoundingClientRect() : null,
                m = c ? c.width : e.offsetWidth,
                d = c ? c.height : e.offsetHeight,
                f = m && m > 0 ? Math.max(m / am("gridCellMaxX"), am("gridCellMinWidth")) : am("gridCellMinWidth"),
                j = d && d > 0 ? Math.max(d / am("gridCellMaxY"), am("gridCellMinHeight")) : am("gridCellMinHeight"),
                b = Math.floor(h / f),
                a = Math.floor(g / j),
                l = m > 0 ? h / m : 0,
                i = d > 0 ? g / d : 0,
                k = "";
            if (!isFinite(b)) {
                b = 0
            }
            if (!isFinite(a)) {
                a = 0
            }
            k = al(l, i);
            return {
                x: b,
                y: a,
                relXY: k
            }
        }

        function L(f) {
            var g = f,
                h = f.getKey(),
                b = {},
                c = null,
                e = null,
                d = false,
                a = 0;
            b[h] = true;
            while (typeof g !== "undefined" && a++ < N) {
                b[g.parentKey] = true;
                if (g.parentKey === "" || g.parentKey === g.getKey()) {
                    break
                }
                if (a >= N) {
                    I.clog("Overstat cleanupHoverEvents() hit iterations limit")
                }
                g = ad[g.parentKey]
            }
            for (c in ad) {
                if (ad.hasOwnProperty(c) && !b[c]) {
                    g = ad[c];
                    if (g) {
                        if (!d) {
                            d = g.process()
                        } else {
                            g.dispose()
                        }
                    }
                }
            }
        }

        function ai(b, d) {
            var e = null,
                a = null,
                c = false;
            for (a in ad) {
                if (ad.hasOwnProperty(a)) {
                    e = ad[a];
                    if (e && e.domNode === b && e.getKey() !== d) {
                        if (!c) {
                            c = e.process()
                        } else {
                            e.dispose()
                        }
                    }
                }
            }
        }

        function J(e, c, d) {
            if (!c) {
                c = e.target
            }
            if (ag(c)) {
                return null
            }
            if (I.isiOS || I.isAndroid) {
                return null
            }
            var a, j, f, i, g, h, b;
            if (!aa(c)) {
                a = H(c, e.position.x, e.position.y);
                j = R(c, a.x, a.y);
                f = new aj(c, j.x, j.y, e);
                f.relXY = j.relXY;
                i = f.getKey();
                if (ad[i]) {
                    f = ad[i]
                } else {
                    ad[i] = f
                }
                f.update();
                if (!d) {
                    b = ab(c);
                    if (b) {
                        h = J(e, b, true);
                        if (h !== null) {
                            g = h.getKey();
                            i = f.getKey();
                            if (i !== g) {
                                f.parentKey = g
                            }
                        }
                    }
                    L(f)
                }
            } else {
                f = J(e, ab(c), d)
            }
            return f
        }

        function ae(a) {
            a = Q(a);
            if (ak(a.target, a.relatedTarget)) {
                return
            }
            ai(a.target)
        }

        function Z(c) {
            var d = null,
                a = null,
                b = false;
            for (a in ad) {
                if (ad.hasOwnProperty(a)) {
                    d = ad[a];
                    if (d) {
                        if (!b) {
                            b = d.process(true)
                        } else {
                            d.dispose()
                        }
                    }
                }
            }
        }

        function ac(a) {
            P.performFormCompletion(true)
        }

        function Y(b) {
            var a = I.getValue(b, "target.id");
            if (!a) {
                return
            }
            switch (b.type) {
                case "mousemove":
                    J(b);
                    break;
                case "mouseout":
                    ae(b);
                    break;
                case "click":
                    Z(b);
                    break;
                case "submit":
                    ac(b);
                    break;
                default:
                    break
            }
        }
        return {
            init: function() {},
            destroy: function() {
                var b, a;
                for (b in ad) {
                    if (ad.hasOwnProperty(b)) {
                        ad[b].dispose();
                        delete ad[b]
                    }
                }
            },
            onevent: function(a) {
                if (typeof a !== "object" || !a.type) {
                    return
                }
                Y(a)
            },
            onmessage: function(a) {},
            createHoverEvent: S,
            cleanupHoverEvents: L,
            eventMap: ad
        }
    })
} else {}
if (TLT && typeof TLT.addModule === "function") {
    TLT.addModule("performance", function(k) {
        var q = {
                loadReceived: false,
                unloadReceived: false,
                perfEventSent: false
            },
            o = 0,
            m, r = k.utils;

        function p(b, a) {
            if (typeof b !== "string") {
                return false
            }
            if (!a || typeof a !== "object") {
                return false
            }
            return (a[b] === true)
        }

        function l(c, a) {
            var e = 0,
                b = {},
                f = "",
                d = 0;
            if (!c || typeof c !== "object" || !c.navigationStart) {
                return {}
            }
            e = c.navigationStart;
            for (f in c) {
                if (Object.prototype.hasOwnProperty.call(c, f) || typeof c[f] === "number") {
                    if (!p(f, a)) {
                        d = c[f];
                        if (typeof d === "number" && d && f !== "navigationStart") {
                            b[f] = d - e
                        } else {
                            b[f] = d
                        }
                    }
                }
            }
            return b
        }

        function n(c) {
            var d = 0,
                b, a;
            if (c) {
                b = (c.responseEnd > 0 && c.responseEnd < c.domLoading) ? c.responseEnd : c.domLoading;
                a = c.loadEventStart;
                if (r.isNumeric(b) && r.isNumeric(a) && a > b) {
                    d = a - b
                }
            }
            return d
        }

        function s(b) {
            var a = k.getStartTime();
            if (b.timestamp > a && !o) {
                o = b.timestamp - a
            }
        }

        function t(d) {
            var b = "UNKNOWN",
                e = {
                    type: 7,
                    performance: {}
                },
                a, f, c;
            if (!d || q.perfEventSent) {
                return
            }
            f = d.performance || {};
            c = f.timing;
            a = f.navigation;
            if (c) {
                e.performance.timing = l(c, m.filter);
                e.performance.timing.renderTime = n(c)
            } else {
                if (m.calculateRenderTime) {
                    e.performance.timing = {
                        renderTime: o,
                        calculated: true
                    }
                } else {
                    return
                }
            }
            if (m.renderTimeThreshold && e.performance.timing.renderTime > m.renderTimeThreshold) {
                e.performance.timing.invalidRenderTime = e.performance.timing.renderTime;
                delete e.performance.timing.renderTime
            }
            if (a) {
                switch (a.type) {
                    case 0:
                        b = "NAVIGATE";
                        break;
                    case 1:
                        b = "RELOAD";
                        break;
                    case 2:
                        b = "BACKFORWARD";
                        break;
                    default:
                        b = "UNKNOWN";
                        break
                }
                e.performance.navigation = {
                    type: b,
                    redirectCount: a.redirectCount
                }
            }
            k.post(e);
            q.perfEventSent = true
        }
        return {
            init: function() {
                m = k.getConfig()
            },
            destroy: function() {
                m = null
            },
            onevent: function(a) {
                if (typeof a !== "object" || !a.type) {
                    return
                }
                switch (a.type) {
                    case "load":
                        q.loadReceived = true;
                        s(a);
                        setTimeout(function() {
                            if (k.isInitialized()) {
                                t(window)
                            }
                        }, r.getValue(m, "delay", 2000));
                        break;
                    case "unload":
                        q.unloadReceived = true;
                        if (!q.perfEventSent) {
                            t(window)
                        }
                        break;
                    default:
                        break
                }
            },
            onmessage: function(a) {}
        }
    })
} else {}
TLT.addModule("replay", function(ax) {
    var ay = ax.utils,
        aO = 0,
        ar = {
            scale: 0,
            timestamp: 0
        },
        bi = {},
        aI = null,
        aF = [],
        bk = 0,
        aE = true,
        bm = null,
        am = null,
        ba = false,
        aT = 0,
        a6 = "",
        bj = "",
        aU = (new Date()).getTime(),
        aR = 0,
        aY = null,
        av = null,
        aW = null,
        aA = null,
        at = null,
        a8 = null,
        be = 0,
        bd = 0,
        ap = null,
        bb = {
            inFocus: false
        },
        aQ = null,
        an = ax.getConfig() || {},
        bh = ay.getValue(an, "viewPortWidthHeightLimit", 10000),
        aq = 1,
        aC = 1,
        a0, ao = {
            cellMaxX: 10,
            cellMaxY: 10,
            cellMinWidth: 20,
            cellMinHeight: 20
        };

    function a7() {
        var a;
        for (a in bi) {
            if (bi.hasOwnProperty(a)) {
                bi[a].visitedCount = 0
            }
        }
    }

    function a5(c) {
        var a = false,
            b = "|button|image|submit|reset|",
            d = null;
        if (typeof c !== "object" || !c.type) {
            return a
        }
        switch (c.type.toLowerCase()) {
            case "input":
                d = "|" + (c.subType || "") + "|";
                if (b.indexOf(d.toLowerCase()) === -1) {
                    a = false
                } else {
                    a = true
                }
                break;
            case "select":
            case "textarea":
                a = false;
                break;
            default:
                a = true;
                break
        }
        return a
    }

    function aL(b) {
        var a = [];
        b = b.parentNode;
        while (b) {
            a.push(b);
            b = b.parentNode
        }
        return a
    }

    function bf(a) {
        return ay.some(a, function(c) {
            var b = ay.getTagName(c);
            if (b === "a" || b === "button") {
                return c
            }
            return null
        })
    }

    function aX(a) {
        var b = a.type,
            c = a.target;
        if (typeof b === "string") {
            b = b.toLowerCase()
        } else {
            b = "unknown"
        }
        if (b === "blur") {
            b = "focusout"
        }
        if (b === "change") {
            if (c.type === "INPUT") {
                switch (c.subType) {
                    case "text":
                    case "date":
                    case "time":
                        b = c.subType + "Change";
                        break;
                    default:
                        b = "valueChange";
                        break
                }
            } else {
                if (c.type === "TEXTAREA") {
                    b = "textChange"
                } else {
                    b = "valueChange"
                }
            }
        }
        return b
    }

    function bl(a, c, b) {
        var d = null;
        if (!a) {
            return d
        }
        c = c || {};
        c.eventOn = aE;
        aE = false;
        if (b) {
            d = "dcid-" + ay.getSerialNumber() + "." + (new Date()).getTime() + "s";
            window.setTimeout(function() {
                c.dcid = d;
                ax.performDOMCapture(a, c)
            }, b)
        } else {
            delete c.dcid;
            d = ax.performDOMCapture(a, c)
        }
        return d
    }

    function aM(d, p, e) {
        var k, i, b = false,
            f = {},
            a = false,
            h, m, o = null,
            j = 0,
            n, l, c, g;
        if (!d || (!p && !e)) {
            return o
        }
        if (!p && !(d === "load" || d === "unload")) {
            return o
        }
        an = ax.getConfig() || {};
        a = ay.getValue(an, "domCapture.enabled", false);
        if (!a || ay.isLegacyIE) {
            return o
        }
        m = ay.getValue(an, "domCapture.triggers") || [];
        for (k = 0, n = m.length; !b && k < n; k += 1) {
            h = m[k];
            if (h.event === d) {
                if (d === "load" || d === "unload") {
                    if (h.screenviews) {
                        c = h.screenviews;
                        for (i = 0, g = c.length; !b && i < g; i += 1) {
                            l = c[i];
                            switch (typeof l) {
                                case "object":
                                    if (!l.cRegex) {
                                        l.cRegex = new RegExp(l.regex, l.flags)
                                    }
                                    l.cRegex.lastIndex = 0;
                                    b = l.cRegex.test(e);
                                    break;
                                case "string":
                                    b = (l === e);
                                    break;
                                default:
                                    break
                            }
                        }
                    } else {
                        b = true
                    }
                } else {
                    if (h.targets) {
                        b = (-1 !== ay.matchTarget(h.targets, p))
                    } else {
                        b = true
                    }
                }
            }
        }
        if (b) {
            j = h.delay || (h.event === "load" ? 7 : 0);
            f.forceFullDOM = !!h.fullDOMCapture;
            o = bl(window.document, f, j)
        }
        return o
    }

    function bg(k) {
        var c, d, e = ay.getValue(k, "webEvent.target", {}),
            a = e.type,
            g = e.subType || "",
            b = ay.getTlType(e),
            h = aL(ay.getValue(e, "element")),
            j = null,
            f = ay.getValue(e, "position.relXY"),
            i = ay.getValue(k, "webEvent.subType", null);
        c = {
            timestamp: ay.getValue(k, "webEvent.timestamp", 0),
            type: 4,
            target: {
                id: e.id || "",
                idType: e.idType,
                name: e.name,
                tlType: b,
                type: a,
                position: {
                    width: ay.getValue(e, "size.width"),
                    height: ay.getValue(e, "size.height")
                },
                currState: k.currState || null
            },
            event: {
                tlEvent: aX(ay.getValue(k, "webEvent")),
                type: ay.getValue(k, "webEvent.type", "UNKNOWN")
            }
        };
        if (g) {
            c.target.subType = g
        }
        if (f) {
            c.target.position.relXY = f
        }
        if (typeof k.dwell === "number" && k.dwell > 0) {
            c.target.dwell = k.dwell
        }
        if (typeof k.visitedCount === "number") {
            c.target.visitedCount = k.visitedCount
        }
        if (typeof k.prevState !== "undefined") {
            c.prevState = k.prevState
        }
        if (i) {
            c.event.subType = i
        }
        j = bf(h);
        c.target.isParentLink = !!j;
        if (j) {
            if (j.href) {
                c.target.currState = c.target.currState || {};
                c.target.currState.href = c.target.currState.href || j.href
            }
            if (j.value) {
                c.target.currState = c.target.currState || {};
                c.target.currState.value = c.target.currState.value || j.value
            }
            if (j.innerText || j.textContent) {
                c.target.currState = c.target.currState || {};
                c.target.currState.innerText = ay.trim(c.target.currState.innerText || j.innerText || j.textContent)
            }
        }
        if (ay.isUndefOrNull(c.target.currState)) {
            delete c.target.currState
        }
        if (ay.isUndefOrNull(c.target.name)) {
            delete c.target.name
        }
        if (c.event.type !== "click" || a5(e)) {
            d = aM(c.event.type, e);
            if (d) {
                c.dcid = d
            }
        }
        return c
    }

    function aG(a) {
        ax.post(a)
    }

    function aK(e) {
        var c = 0,
            a, f = e.length,
            h, g, d, i = {
                mouseout: true,
                mouseover: true
            },
            b = [];
        for (c = 0; c < f; c += 1) {
            h = e[c];
            if (!h) {
                continue
            }
            if (i[h.event.type]) {
                b.push(h)
            } else {
                for (a = c + 1; a < f && e[a]; a += 1) {
                    if (!i[e[a].event.type]) {
                        break
                    }
                }
                if (a < f) {
                    g = e[a];
                    if (g && h.target.id === g.target.id && h.event.type !== g.event.type) {
                        if (h.event.type === "click") {
                            d = h;
                            h = g;
                            g = d
                        }
                        if (g.event.type === "click") {
                            h.target.position = g.target.position;
                            c += 1
                        } else {
                            if (g.event.type === "blur") {
                                h.target.dwell = g.target.dwell;
                                h.target.visitedCount = g.target.visitedCount;
                                h.focusInOffset = g.focusInOffset;
                                h.target.position = g.target.position;
                                c += 1
                            }
                        }
                        e[a] = null;
                        e[c] = h
                    }
                }
                b.push(e[c])
            }
        }
        for (h = b.shift(); h; h = b.shift()) {
            ax.post(h)
        }
        e.splice(0, e.length)
    }
    if (typeof window.onerror !== "function") {
        window.onerror = function(d, c, a) {
            var b = null;
            if (typeof d !== "string") {
                return
            }
            a = a || -1;
            b = {
                type: 6,
                exception: {
                    description: d,
                    url: c,
                    line: a
                }
            };
            aT += 1;
            ax.post(b)
        };
        ba = true
    }

    function aZ(b, a) {
        bb = a;
        bb.inFocus = true;
        if (typeof bi[b] === "undefined") {
            bi[b] = {}
        }
        bi[b].focus = bb.dwellStart = Number(new Date());
        bi[b].focusInOffset = aW ? bb.dwellStart - Number(aW) : -1;
        bi[b].prevState = ay.getValue(a, "target.state");
        bi[b].visitedCount = bi[b].visitedCount + 1 || 1
    }

    function bc(a, b) {
        aF.push(bg({
            webEvent: a,
            id: b,
            currState: ay.getValue(a, "target.state")
        }))
    }

    function aD(f, b) {
        var c = false,
            e, a, d = 0;
        if (typeof f === "undefined" || f === null || typeof b === "undefined" || b === null) {
            return
        }
        if (typeof bi[f] !== "undefined" && bi[f].hasOwnProperty("focus")) {
            bi[f].dwell = Number(new Date()) - bi[f].focus
        } else {
            bi[f] = {};
            bi[f].dwell = 0
        }
        if (aF.length === 0) {
            if (!bb.inFocus) {
                return
            }
            bc(b, f)
        }
        bb.inFocus = false;
        if (aF[aF.length - 1]) {
            for (d = aF.length - 1; d >= 0; d--) {
                aF[d].target.visitedCount = bi[f].visitedCount
            }
        }
        a = aF[aF.length - 1];
        if (a) {
            a.target.dwell = bi[f].dwell;
            a.focusInOffset = bi[f].focusInOffset;
            a.target.visitedCount = bi[f].visitedCount;
            if (a.event.type === "click") {
                if (!a5(a.target)) {
                    a.target.currState = ay.getValue(b, "target.state") || ay.getValue(b, "target.currState");
                    c = true
                }
            } else {
                if (a.event.type === "focus") {
                    c = true
                }
            }
            if (c) {
                a.event.type = "blur";
                a.event.tlEvent = "focusout";
                e = aM(a.event.type, b.target);
                if (e) {
                    a.dcid = e
                }
            }
        }
        aK(aF)
    }

    function aV(e, c) {
        var b = false,
            d = aF.length,
            a = d > 0 ? aF[d - 1] : null;
        if (!a) {
            return b
        }
        if (a.target.id !== e && a.target.tltype !== "selectList") {
            if (c.type === "focus" || c.type === "click" || c.type === "change") {
                aD(a.target.id, a);
                b = true
            }
        }
        return b
    }

    function aB(b, a) {
        if (typeof bi[b] !== "undefined" && !bi[b].hasOwnProperty("focus")) {
            aZ(b, a)
        }
        bc(a, b);
        if (typeof bi[b] !== "undefined" && typeof bi[b].prevState !== "undefined") {
            if (aF[aF.length - 1].target.tlType === "textBox" || aF[aF.length - 1].target.tlType === "selectList") {
                aF[aF.length - 1].target.prevState = bi[b].prevState
            }
        }
    }

    function a3(f) {
        var e, i, b, a, d = ay.getValue(f, "target.element", {}),
            j = ay.getValue(f, "target.size.width", d.offsetWidth),
            c = ay.getValue(f, "target.size.height", d.offsetHeight),
            h = ay.getValue(f, "target.position.x", 0),
            g = ay.getValue(f, "target.position.y", 0);
        e = j ? Math.max(j / ao.cellMaxX, ao.cellMinWidth) : ao.cellMinWidth;
        i = c ? Math.max(c / ao.cellMaxY, ao.cellMinHeight) : ao.cellMinHeight;
        b = Math.floor(h / e);
        a = Math.floor(g / i);
        if (!isFinite(b)) {
            b = 0
        }
        if (!isFinite(a)) {
            a = 0
        }
        return b + "," + a
    }

    function az(e, c) {
        var b, a = true,
            d = 0;
        if (c.target.type === "select" && aQ && aQ.target.id === e) {
            aQ = null;
            return
        }
        if (!bb.inFocus) {
            aZ(e, c)
        }
        d = aF.length;
        if (d && ay.getValue(aF[d - 1], "event.type") !== "change") {
            aB(e, c)
        }
        b = a3(c);
        d = aF.length;
        if (c.position.x === 0 && c.position.y === 0 && d && ay.getValue(aF[d - 1], "target.tlType") === "radioButton") {
            a = false
        } else {
            c.target.position.relXY = b
        }
        if (d && ay.getValue(aF[d - 1], "target.id") === e) {
            if (a) {
                aF[d - 1].target.position.relXY = b
            }
        } else {
            bc(c, e);
            if (a5(c.target)) {
                aD(e, c)
            }
        }
        aQ = c
    }

    function al(b) {
        var a = b.orientation,
            c = {
                type: 4,
                event: {
                    type: "orientationchange"
                },
                target: {
                    prevState: {
                        orientation: aO,
                        orientationMode: ay.getOrientationMode(aO)
                    },
                    currState: {
                        orientation: a,
                        orientationMode: ay.getOrientationMode(a)
                    }
                }
            };
        aG(c);
        aO = a
    }

    function aw(b) {
        var a = false;
        if (!b) {
            return a
        }
        a = (ar.scale === b.scale && Math.abs((new Date()).getTime() - ar.timestamp) < 500);
        return a
    }

    function aP(a) {
        ar.scale = a.scale;
        ar.rotation = a.rotation;
        ar.timestamp = (new Date()).getTime()
    }

    function aS() {
        var a, b;
        a = aq - aC;
        if (isNaN(a)) {
            b = "INVALID"
        } else {
            if (a < 0) {
                b = "CLOSE"
            } else {
                if (a > 0) {
                    b = "OPEN"
                } else {
                    b = "NONE"
                }
            }
        }
        return b
    }

    function aJ(e) {
        var j = document.documentElement,
            g = document.body,
            k = window.screen,
            b = k.width,
            c = k.height,
            f = ay.getValue(e, "orientation", 0),
            h = !ay.isiOS ? b : Math.abs(f) === 90 ? c : b,
            d = {
                type: 1,
                clientState: {
                    pageWidth: document.width || (!j ? 0 : j.offsetWidth),
                    pageHeight: Math.max((!document.height ? 0 : document.height), (!j ? 0 : j.offsetHeight), (!j ? 0 : j.scrollHeight)),
                    viewPortWidth: window.innerWidth || j.clientWidth,
                    viewPortHeight: window.innerHeight || j.clientHeight,
                    viewPortX: Math.round(window.pageXOffset || (!j ? (!g ? 0 : g.scrollLeft) : j.scrollLeft || 0)),
                    viewPortY: Math.round(window.pageYOffset || (!j ? (!g ? 0 : g.scrollTop) : j.scrollTop || 0)),
                    deviceOrientation: f,
                    event: ay.getValue(e, "type")
                }
            },
            i = d.clientState,
            a;
        am = am || d;
        if (i.event === "unload" && i.viewPortHeight === i.pageHeight && i.viewPortWidth === i.pageWidth) {
            if (am.clientState.viewPortHeight < i.viewPortHeight) {
                i.viewPortHeight = am.clientState.viewPortHeight;
                i.viewPortWidth = am.clientState.viewPortWidth
            }
        }
        if ((i.viewPortY + i.viewPortHeight) > i.pageHeight) {
            i.viewPortY = i.pageHeight - i.viewPortHeight
        }
        if (i.viewPortY < 0) {
            i.viewPortY = 0
        }
        a = !i.viewPortWidth ? 1 : (h / i.viewPortWidth);
        i.deviceScale = a.toFixed(3);
        i.viewTime = 0;
        if (aA && at) {
            i.viewTime = at.getTime() - aA.getTime()
        }
        if (e.type === "scroll") {
            i.viewPortXStart = am.clientState.viewPortX;
            i.viewPortYStart = am.clientState.viewPortY
        }
        return d
    }

    function a1() {
        var a;
        if (bm) {
            a = bm.clientState;
            if (a.viewPortHeight > 0 && a.viewPortHeight < bh && a.viewPortWidth > 0 && a.viewPortWidth < bh) {
                aG(bm)
            }
            am = bm;
            bm = null;
            aA = a8 || aA;
            at = null
        }
        a1.timeoutId = 0
    }

    function a2(a) {
        var b = null;
        if (ay.isOperaMini) {
            return
        }
        bm = aJ(a);
        if (a.type === "scroll" || a.type === "resize") {
            if (a1.timeoutId) {
                window.clearTimeout(a1.timeoutId)
            }
            a1.timeoutId = window.setTimeout(a1, ay.getValue(an, "scrollTimeout", 2000))
        } else {
            if (a.type === "touchstart" || a.type === "load") {
                if (bm) {
                    aC = parseFloat(bm.clientState.deviceScale)
                }
            } else {
                if (a.type === "touchend") {
                    if (bm) {
                        aq = parseFloat(bm.clientState.deviceScale);
                        a1()
                    }
                }
            }
        }
        if (a.type === "load" || a.type === "unload") {
            if (a.type === "unload" && aU) {
                b = ay.clone(bm);
                b.clientState.event = "attention";
                b.clientState.viewTime = (new Date()).getTime() - aU
            }
            a1();
            if (b) {
                bm = b;
                a1()
            }
        }
        return bm
    }

    function au(b) {
        var a = ay.getValue(b, "nativeEvent.touches.length", 0);
        if (a === 2) {
            a2(b)
        }
    }

    function aN(d) {
        var c, b = {},
            e = ay.getValue(d, "nativeEvent.rotation", 0) || ay.getValue(d, "nativeEvent.touches[0].webkitRotationAngle", 0),
            f = ay.getValue(d, "nativeEvent.scale", 1),
            a = null,
            g = {
                type: 4,
                event: {
                    type: "touchend"
                },
                target: {
                    id: ay.getValue(d, "target.id"),
                    idType: ay.getValue(d, "target.idType")
                }
            };
        c = ay.getValue(d, "nativeEvent.changedTouches.length", 0) + ay.getValue(d, "nativeEvent.touches.length", 0);
        if (c !== 2) {
            return
        }
        a2(d);
        a = {
            rotation: e ? e.toFixed(2) : 0,
            scale: aq ? aq.toFixed(2) : 1
        };
        a.pinch = aS();
        b.scale = aC ? aC.toFixed(2) : 1;
        g.target.prevState = b;
        g.target.currState = a;
        aG(g)
    }

    function aH(k, d) {
        var h = ["type", "name", "target.id"],
            c = null,
            e, g, f = true,
            i = 10,
            b = 0,
            j = 0,
            a = 0;
        if (!k || !d || typeof k !== "object" || typeof d !== "object") {
            return false
        }
        for (e = 0, g = h.length; f && e < g; e += 1) {
            c = h[e];
            if (ay.getValue(k, c) !== ay.getValue(d, c)) {
                f = false;
                break
            }
        }
        if (f) {
            j = ay.getValue(k, "timestamp");
            a = ay.getValue(d, "timestamp");
            if (!(isNaN(j) && isNaN(a))) {
                b = Math.abs(ay.getValue(k, "timestamp") - ay.getValue(d, "timestamp"));
                if (isNaN(b) || b > i) {
                    f = false
                }
            }
        }
        return f
    }

    function a9(a) {
        var c = {
                type: 4,
                event: {
                    type: a.type
                },
                target: {
                    id: ay.getValue(a, "target.id"),
                    idType: ay.getValue(a, "target.idType"),
                    currState: ay.getValue(a, "target.state")
                }
            },
            b;
        b = aM(a.type, a.target);
        if (b) {
            c.dcid = b
        }
        aG(c)
    }

    function a4(b) {
        var a = ay.getValue(an, "geolocation"),
            c;
        if (!a || !a.enabled) {
            return
        }
        c = a.triggers || [];
        if (!c.length) {
            return
        }
        if (c[0].event === b) {
            TLT.logGeolocation()
        }
    }
    return {
        init: function() {
            aF = []
        },
        destroy: function() {
            aD(aI);
            aF = [];
            if (a1.timeoutId) {
                window.clearTimeout(a1.timeoutId);
                a1.timeoutId = 0
            }
            if (ba) {
                window.onerror = null;
                ba = false
            }
        },
        onevent: function(b) {
            var e = null,
                c = null,
                a, d;
            if (typeof b !== "object" || !b.type) {
                return
            }
            if (aH(b, aY)) {
                aY = b;
                return
            }
            aY = b;
            e = ay.getValue(b, "target.id");
            if (Object.prototype.toString.call(bi[e]) !== "[object Object]") {
                bi[e] = {}
            }
            aV(e, b);
            ap = new Date();
            switch (b.type) {
                case "hashchange":
                    break;
                case "focus":
                    c = aZ(e, b);
                    break;
                case "blur":
                    c = aD(e, b);
                    break;
                case "click":
                    c = az(e, b);
                    break;
                case "change":
                    c = aB(e, b);
                    break;
                case "orientationchange":
                    c = al(b);
                    break;
                case "touchstart":
                    au(b);
                    break;
                case "touchend":
                    c = aN(b);
                    break;
                case "loadWithFrames":
                    TLT.logScreenviewLoad("rootWithFrames");
                    break;
                case "load":
                    aO = b.orientation;
                    aA = new Date();
                    if (typeof window.orientation !== "number" || ay.isAndroid) {
                        d = (window.screen.width > window.screen.height ? 90 : 0);
                        a = window.orientation;
                        if (Math.abs(a) !== d && !(a === 180 && d === 0)) {
                            ay.isLandscapeZeroDegrees = true;
                            if (Math.abs(a) === 180 || Math.abs(a) === 0) {
                                aO = 90
                            } else {
                                if (Math.abs(a) === 90) {
                                    aO = 0
                                }
                            }
                        }
                    }
                    setTimeout(function() {
                        if (ax.isInitialized()) {
                            a2(b)
                        }
                    }, 100);
                    a4(b.type);
                    TLT.logScreenviewLoad("root");
                    break;
                case "screenview_load":
                    aW = new Date();
                    a7();
                    c = aM("load", null, b.name);
                    break;
                case "screenview_unload":
                    c = aM("unload", null, b.name);
                    break;
                case "resize":
                case "scroll":
                    if (!at) {
                        at = new Date()
                    }
                    a8 = new Date();
                    a2(b);
                    break;
                case "unload":
                    if (aF !== null) {
                        aK(aF)
                    }
                    at = new Date();
                    a2(b);
                    TLT.logScreenviewUnload("root");
                    break;
                default:
                    a9(b);
                    break
            }
            aI = e;
            return c
        },
        onmessage: function() {}
    }
});
TLT.addModule("digitalData", function(b) {
    var a = {},
        g = {},
        f, h = false,
        i = b.utils;

    function e(k, j, m) {
        var l = {
            description: k,
            action: j,
            value: m
        };
        TLT.logCustomEvent("Query String", l)
    }

    function d() {
        f = (location.search.length > 1 ? location.search.substring(1).split("&") : []);
        for (var j = 0; j < f.length; j++) {
            g[f[j].match(/^[^=^,^.^%^-^20]+/)] = f[j].replace(/^[^=^,^.^%^-^20]+=?/, "")
        }
        if (j > 0) {
            e("QueryString Values", "Retrieve", g)
        }
    }

    function c() {
        window.onerror = function(j, l, k) {
            e("Error: " + j, "Captured", {
                url: l,
                lineNumber: k,
                errorMsg: j
            })
        }
    }
    return {
        init: function() {
            a = b.getConfig()
        },
        destroy: function() {
            a = null
        },
        onevent: function(j) {
            if (typeof j !== "object" || !j.type) {
                return
            }
            if (j) {
                d()
            }
        }
    }
});
TLT.addModule("tabMonitoring", function(a) {
    function b() {
        var d = new Date(),
            j = d.getTime(),
            c = document.referrer,
            g = window.sessionStorage.tlReferrer,
            f = parseInt(window.localStorage.tlLastTimer),
            e = parseInt(window.localStorage.tlHitNumber),
            i = parseInt(window.localStorage.tlTabTotal),
            h = parseInt(window.sessionStorage.tlTabCurrent);
        if (f) {
            if (j - 30 * 60 * 1000 > f) {
                e = 0
            }
        }
        if (!e) {
            e = 0;
            i = 0;
            h = 0
        }
        if (!h) {
            if (!c || !g || e == 0) {
                if (e == 0) {
                    i = 1
                } else {
                    i = parseInt(i) + 1
                }
                h = i;
                window.sessionStorage.tlTabCurrent = h;
                window.localStorage.tlTabTotal = i
            }
        }
        e = e + 1;
        window.localStorage.tlHitNumber = e;
        window.sessionStorage.tlReferrer = c;
        window.localStorage.tlLastTimer = j
    }
    return {
        init: function() {},
        destroy: function() {},
        onevent: function(c) {
            if (typeof c !== "object" || !c.type) {
                return
            }
            if (c) {
                b()
            }
        }
    }
});
TLT.addModule("performanceData", function(d) {
    var e, k = TLT.getCoreConfig().modules.performanceData.responseTime,
        i = TLT.getCoreConfig().modules.performanceData.monitorJS,
        g = TLT.getCoreConfig().modules.performanceData.monitorCSS,
        h = TLT.getCoreConfig().modules.performanceData.monitorImages,
        j = TLT.getCoreConfig().modules.performanceData.monitorXHR,
        a = TLT.getCoreConfig().modules.performanceData.blacklist;

    function l(m, t, s, n, p, r, q) {
        var o = {
            description: m,
            urlNormalized: t,
            urlFull: s,
            initiator: n,
            "response time": p,
            "total time": r,
            "size(kBytes)": q
        };
        TLT.logCustomEvent("Performance Data", o)
    }

    function f() {
        if (typeof window.location.host != "undefined") {
            c()
        }
    }

    function b(m) {
        for (var n = 0; n < a.length; ++n) {
            e = a[n];
            if (m.indexOf(e) > -1) {
                return true
            }
            epBlock = false
        }
        return epBlock
    }

    function c() {
        if (performance !== undefined) {
            var n = performance.getEntriesByType("resource");
            for (var m = 0; m < n.length; m++) {
                if ((n[m].initiatorType.indexOf("script") > -1 && i) || (n[m].initiatorType.indexOf("css") > -1 && g) || (n[m].initiatorType.indexOf("img") > -1 && h) || (n[m].initiatorType.indexOf("xmlhttprequest") > -1 && j)) {
                    var r = n[m].name;
                    if (!b(r)) {
                        var q = (n[m].responseEnd).toFixed(2);
                        var o = (n[m].responseEnd - n[m].startTime).toFixed(2);
                        var p = (n[m].transferSize / 1024).toFixed(2);
                        if (r.indexOf("?") > -1) {
                            r = r.substr(0, r.indexOf("?"))
                        }
                        if (o > k) {
                            l("Slow Resource - " + n[m].initiatorType + " (" + (o / 1000).toFixed(2) + " secs)", r, n[m].name, n[m].initiatorType, o, q, p)
                        }
                    }
                }
            }
        }
    }
    return {
        init: function() {},
        destroy: function() {},
        onevent: function(m) {
            if (typeof m !== "object" || !m.type) {
                return
            }
            if (m) {
                f()
            }
        }
    }
});
(function() {
    var h = window.TLT,
        b;
    if (h.getFlavor() === "w3c" && h.utils.isLegacyIE) {
        b = "input, select, textarea, button"
    }
    h.registerBridgeCallbacks([{
        enabled: true,
        cbType: "messageRedirect",
        cbFunction: function(i, j) {
            if (i && j.type) {
                var k = window.sessionStorage.tlTabCurrent,
                    l = window.sessionStorage.tlReferrer;
                if (k) {
                    if (j.type === 2) {
                        j.tabIndex = parseInt(k);
                        j.tabReferrer = l
                    } else {
                        j.tabIndex = parseInt(k)
                    }
                }
            }
            return j
        }
    }]);
    var c = {
        core: {
            blockedElements: [],
            ieExcludedLinks: ['a[href*="javascript:void"]', "input[onclick*='javascript:']"],
            inactivityTimeout: 1000 * 60 * 20,
            modules: {
                replay: {
                    events: [{
                        name: "change",
                        target: b,
                        recurseFrames: true
                    }, {
                        name: "click",
                        recurseFrames: true
                    }, {
                        name: "hashchange",
                        target: window
                    }, {
                        name: "focus",
                        target: "input, select, textarea, button",
                        recurseFrames: true
                    }, {
                        name: "blur",
                        target: "input, select, textarea, button",
                        recurseFrames: true
                    }, {
                        name: "load",
                        target: window
                    }, {
                        name: "lazyload",
                        target: window
                    }, {
                        name: "unload",
                        target: window
                    }, {
                        name: "resize",
                        target: window
                    }, {
                        name: "scroll",
                        target: window
                    }, {
                        name: "orientationchange",
                        target: window
                    }, {
                        name: "touchend"
                    }, {
                        name: "touchstart"
                    }]
                },
                digitalData: {
                    enabled: true,
                    events: [{
                        name: "load",
                        target: window
                    }]
                },
                tabMonitoring: {
                    enabled: true,
                    events: [{
                        name: "load",
                        target: window
                    }]
                },
                performanceData: {
                    enabled: true,
                    responseTime: 3000,
                    useDOMContentLoaded: true,
                    monitorJS: true,
                    monitorCSS: true,
                    monitorImages: true,
                    monitorXHR: true,
                    blacklist: ["twitter.com", "google"],
                    events: [{
                        name: "load",
                        target: window
                    }]
                },
                overstat: {
                    enabled: true,
                    events: [{
                        name: "click",
                        recurseFrames: true
                    }, {
                        name: "mousemove",
                        recurseFrames: true
                    }, {
                        name: "mouseout",
                        recurseFrames: true
                    }, {
                        name: "submit",
                        recurseFrames: true
                    }]
                },
                performance: {
                    enabled: true,
                    events: [{
                        name: "load",
                        target: window
                    }, {
                        name: "unload",
                        target: window
                    }]
                },
                TLCookie: {
                    enabled: true
                }
            },
            sessionDataEnabled: false,
            sessionData: {
                sessionValueNeedsHashing: true,
                sessionQueryName: "sessionID",
                sessionQueryDelim: ";",
                sessionCookieName: "jsessionid"
            },
            screenviewAutoDetect: true,
            framesBlacklist: []
        },
        services: {
            queue: {
                asyncReqOnUnload: false,
                useBeacon: true,
                xhrLogging: true,
                queues: [{
                    qid: "DEFAULT",
                    endpoint: "https://uscollector.tealeaf.ibmcloud.com/collector/collectorPost",
                    maxEvents: 30,
                    timerInterval: 30000,
                    maxSize: 350000,
                    checkEndpoint: true,
                    endpointCheckTimeout: 3000,
                    encoder: "gzip"
                }]
            },
            message: {
                privacy: [{
                    targets: ["input[type=password]", ".tlPrivate", "input[name=samplename]", "input[name^=account_]", {
                        id: "sampleid",
                        idType: -1
                    }, 
					{
                        id: {
                            regex: "security[0-9]|answer[0-9]"
                        },
                        idType: -1
                    }, {
                        id: {
                            regex: "account_.*"
                        },
                        idType: -1
                    }, {
                        id: "saPhone",
                        idType: -1
                    }, {
						id: "baPhone",
						idType: -1
					), {
                        id: {
                            regex: "saStreetAddress.*"
                        },
                        idType: -1
                    }, {
                        id: "shippingCitiesAndStates",
                        idType: -1
                    }, {
                        id: "cc_number",
                        idType: -1
                    }, {
                        id: "cc_cid",
                        idType: -1
                    }, {
                        id: "expiredmonth",
                        idType: -1
                    }, {
                        id: "expiredyear",
                        idType: -1
                    }, {
                        id: "createAccountPhone",
                        idType: -1
                    }, {
                        id: "createAccountPassword",
                        idType: -1
                    }, {
                        id: "invalidPassword",
                        idType: -1
                    }, {
                        id: "createAccountConfirmPassword",
                        idType: -1
                    }, {
                        id: {
                            regex: "ct.*AddressInformationControl.*"
                        },
                        idType: -1
                    },
					{ id : "saFirstName", idType : -1 }, //------------------------------ Mask form field firstname
					{ id : "saLastName", idType : -1 }, //------------------------------ Mask form field lastname
					{ id : "createAccountFirstName", idType : -1 }, //------------------------------ Mask form field firstname 
					{ id : "createAccountLastName", idType : -1 }, //------------------------------ Mask form field lastname 
					{ id : "FirstName_1", idType : -1 }, //------------------------------ Mask form field firstname
					{ id : "LastName_1", idType : -1 }, //------------------------------ Mask form field lastname
					{ id : "baFirstName", idType : -1 }, //------------------------------ Mask form field firstname
					{ id : "baLastName", idType : -1 }, //------------------------------ Mask form field lastname
					{ id : "ctl01_Content_personalInfoControl_firstNameTextBox", idType : -1 }, //------------------------------ Mask form field firstname
					{ id : "ctl01_Content_personalInfoControl_lastNameTextBox", idType : -1 }, //------------------------------ Mask form field lastname
					
					//Streetaddress
					{ id : "baStreetAddress1", idType : -1 }, //------------------------------ Mask form field street address
					{ id : "baStreetAddress2", idType : -1 }, //------------------------------ Mask form field street address
					{ id : "ctl01_Content_userContactControl_contactAddressInformationControl_address1Textbox", idType : -1 }, //------------------------------ Mask form field street address
					{ id : "ctl01_Content_userContactControl_contactAddressInformationControl_address2Textbox", idType : -1 }, //------------------------------ Mask form field street address
					
					//all emails
					{ id : "saEmail", idType : -1 }, //------------------------------ Mask form field email
					{ id : "loginId", idType : -1 }, //------------------------------ Mask form field email
					{ id : "accountEmail", idType : -1 }, //------------------------------ Mask form field email 
					{ id : "createAccountEmail", idType : -1 }, //------------------------------ Mask form field email 
					{ id : "username", idType : -1 }, //------------------------------ Mask form field email 
					{ id : "Email_1", idType : -1 }, //------------------------------ Mask form field email 
					{ id : "billingEmailAddressID0", idType : -1 }, //------------------------------ Mask form field email 
					{ id : "shippingEmailAddressID0", idType : -1 }, //------------------------------ Mask form field email 
					{ id : "ctl01_Content_personalInfoControl_emailAddressTextBox", idType : -1 }, //------------------------------ Mask form field email 
					],
                    maskType: 3
                }],
                privacyPatterns: []
            },
            serializer: {
                json: {
                    defaultToBuiltin: true,
                    parsers: ["JSON.parse"],
                    stringifiers: ["JSON.stringify"]
                }
            },
            encoder: {
                gzip: {
                    encode: "window.pako.gzip",
                    defaultEncoding: "gzip"
                }
            },
            domCapture: {
                diffEnabled: true,
                options: {
                    maxMutations: 300,
                    maxLength: 2000000,
                    captureFrames: false,
                    removeScripts: true,
                    removeComments: true
                }
            },
            browser: {
                useCapture: true,
                sizzleObject: "window.Sizzle",
                jQueryObject: "window.jQuery",
                customid: ["name"]
            }
        },
        modules: {
            overstat: {
                hoverThreshold: 2000
            },
            performance: {
                calculateRenderTime: true,
                renderTimeThreshold: 600000,
                filter: {
                    navigationStart: false,
                    unloadEventStart: false,
                    unloadEventEnd: false,
                    redirectStart: false,
                    redirectEnd: false,
                    fetchStart: false,
                    domainLookupStart: false,
                    domainLookupEnd: false,
                    connectStart: false,
                    connectEnd: false,
                    secureConnectionStart: false,
                    requestStart: false,
                    responseStart: false,
                    responseEnd: false,
                    domLoading: false,
                    domInteractive: false,
                    domContentLoadedEventStart: false,
                    domContentLoadedEventEnd: false,
                    domComplete: false,
                    loadEventStart: false,
                    loadEventEnd: false
                }
            },
            replay: {
                geolocation: {
                    enabled: false,
                    triggers: [{
                        event: "load"
                    }]
                },
                domCapture: {
                    enabled: true,
                    triggers: [{
                        event: "click"
                    }, {
                        event: "change"
                    }, {
                        event: "lazyload",
                        delay: 200
                    }, {
                        event: "load",
                        fullDOMCapture: true,
                        delay: 100
                    }]
                }
            },
            TLCookie: {
                appCookieWhitelist: [{
                    regex: ".*"
                }],
                tlAppKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            }
        }
    };
    var a = window.location.pathname;
    if (a.indexOf("/sampleURL1") > -1 || a.indexOf("/sampleURL2") > -1 || a === "/sampleURL3" || a === "/sampleURL4") {
        c.services.queue.asyncReqOnUnload = false
    }
    var a = window.location.pathname;
    if (a === "/sample-confirmation-page1" || a === "/sample-confirmation-page2") {
        c.modules.replay.domCapture.triggers = [{
            event: "click"
        }, {
            event: "change"
        }, {
            event: "lazyload",
            delay: 200
        }, {
            event: "load",
            delay: 100,
            fullDOMCapture: true
        }, {
            event: "unload"
        }]
    }
    var f = function(j) {
        var i = document.createElement("a");
        i.href = j;
        return i
    };
    var e = f(document.URL).hostname;
    if (e === "www.connection.com") {
        c.modules.TLCookie.tlAppKey = "3647c1ab28564c938efd205fe5412328"
    }
	else if (e === "www.macconnection.com") {
        c.modules.TLCookie.tlAppKey = "27ec9575136940aea4d8da51bce80da2"
    }
	else if (e === "www.govconnection.com") {
        c.modules.TLCookie.tlAppKey = "88347306214f41249e41202f16e63e1b"
    }
	else {
		if(e === "qa.connection.com") {
			c.modules.TLCookie.tlAppKey = "4cc3bcce09fc419a868e19ae2ef868be"
		}
		else if(e === "qaipa.govconnection.com") {
			c.modules.TLCookie.tlAppKey = "c5724ed57a7c4fd1b3dca24f17a52748"
		}
		else if(e === "qa.macconnection.com") {
			c.modules.TLCookie.tlAppKey = "5987e7a3a1b7408c8544da765837293a"		
		}
    }
    var g = false;
    if (document.documentMode === 8) {
        g = true
    }
    if (document.documentMode === 9) {
        c.modules.replay.domCapture.enabled = false;
        c.services.domCapture.diffEnabled = false
    }
    if (document.documentMode === 10) {
        c.services.domCapture.diffEnabled = false;
        c.modules.replay.domCapture.triggers = [{
            event: "change"
        }, {
            event: "load",
            delay: 100
        }]
    }
    var d = false;
    if (typeof window.TLT !== "undefined" && typeof window.TLT.isInitialized === "function" && !(h.isInitialized()) && typeof c === "object" && g === false && d === false) {
        window.TLT.init(c)
    }
}());