const CryptoJS = require('crypto-js')
function RSAKeyPair(a, b, c) {
    this.e = biFromHex(a),
    this.d = biFromHex(b),
    this.m = biFromHex(c),
    this.chunkSize = 2 * biHighIndex(this.m),
    this.radix = 16,
    this.barrett = new BarrettMu(this.m)
}
function twoDigit(a) {
    return (10 > a ? "0" : "") + String(a)
}
function encryptedString(a, b) {
    for (var f, g, h, i, j, k, l, c = new Array, d = b.length, e = 0; d > e; )
        c[e] = b.charCodeAt(e),
        e++;
    for (; 0 != c.length % a.chunkSize; )
        c[e++] = 0;
    for (f = c.length,
    g = "",
    e = 0; f > e; e += a.chunkSize) {
        for (j = new BigInt,
        h = 0,
        i = e; i < e + a.chunkSize; ++h)
            j.digits[h] = c[i++],
            j.digits[h] += c[i++] << 8;
        k = a.barrett.powMod(j, a.e),
        l = 16 == a.radix ? biToHex(k) : biToString(k, a.radix),
        g += l + " "
    }
    return g.substring(0, g.length - 1)
}
function decryptedString(a, b) {
    var e, f, g, h, c = b.split(" "), d = "";
    for (e = 0; e < c.length; ++e)
        for (h = 16 == a.radix ? biFromHex(c[e]) : biFromString(c[e], a.radix),
        g = a.barrett.powMod(h, a.d),
        f = 0; f <= biHighIndex(g); ++f)
            d += String.fromCharCode(255 & g.digits[f], g.digits[f] >> 8);
    return 0 == d.charCodeAt(d.length - 1) && (d = d.substring(0, d.length - 1)),
    d
}
function setMaxDigits(a) {
    maxDigits = a,
    ZERO_ARRAY = new Array(maxDigits);
    for (var b = 0; b < ZERO_ARRAY.length; b++)
        ZERO_ARRAY[b] = 0;
    bigZero = new BigInt,
    bigOne = new BigInt,
    bigOne.digits[0] = 1
}
function BigInt(a) {
    this.digits = "boolean" == typeof a && 1 == a ? null : ZERO_ARRAY.slice(0),
    this.isNeg = !1
}
function biFromDecimal(a) {
    for (var d, e, f, b = "-" == a.charAt(0), c = b ? 1 : 0; c < a.length && "0" == a.charAt(c); )
        ++c;
    if (c == a.length)
        d = new BigInt;
    else {
        for (e = a.length - c,
        f = e % dpl10,
        0 == f && (f = dpl10),
        d = biFromNumber(Number(a.substr(c, f))),
        c += f; c < a.length; )
            d = biAdd(biMultiply(d, lr10), biFromNumber(Number(a.substr(c, dpl10)))),
            c += dpl10;
        d.isNeg = b
    }
    return d
}
function biCopy(a) {
    var b = new BigInt(!0);
    return b.digits = a.digits.slice(0),
    b.isNeg = a.isNeg,
    b
}
function biFromNumber(a) {
    var c, b = new BigInt;
    for (b.isNeg = 0 > a,
    a = Math.abs(a),
    c = 0; a > 0; )
        b.digits[c++] = a & maxDigitVal,
        a >>= biRadixBits;
    return b
}
function reverseStr(a) {
    var c, b = "";
    for (c = a.length - 1; c > -1; --c)
        b += a.charAt(c);
    return b
}
function biToString(a, b) {
    var d, e, c = new BigInt;
    for (c.digits[0] = b,
    d = biDivideModulo(a, c),
    e = hexatrigesimalToChar[d[1].digits[0]]; 1 == biCompare(d[0], bigZero); )
        d = biDivideModulo(d[0], c),
        digit = d[1].digits[0],
        e += hexatrigesimalToChar[d[1].digits[0]];
    return (a.isNeg ? "-" : "") + reverseStr(e)
}
function biToDecimal(a) {
    var c, d, b = new BigInt;
    for (b.digits[0] = 10,
    c = biDivideModulo(a, b),
    d = String(c[1].digits[0]); 1 == biCompare(c[0], bigZero); )
        c = biDivideModulo(c[0], b),
        d += String(c[1].digits[0]);
    return (a.isNeg ? "-" : "") + reverseStr(d)
}
function digitToHex(a) {
    var b = 15
      , c = "";
    for (i = 0; 4 > i; ++i)
        c += hexToChar[a & b],
        a >>>= 4;
    return reverseStr(c)
}
function biToHex(a) {
    var d, b = "";
    for (biHighIndex(a),
    d = biHighIndex(a); d > -1; --d)
        b += digitToHex(a.digits[d]);
    return b
}
function charToHex(a) {
    var h, b = 48, c = b + 9, d = 97, e = d + 25, f = 65, g = 90;
    return h = a >= b && c >= a ? a - b : a >= f && g >= a ? 10 + a - f : a >= d && e >= a ? 10 + a - d : 0
}
function hexToDigit(a) {
    var d, b = 0, c = Math.min(a.length, 4);
    for (d = 0; c > d; ++d)
        b <<= 4,
        b |= charToHex(a.charCodeAt(d));
    return b
}
function biFromHex(a) {
    var d, e, b = new BigInt, c = a.length;
    for (d = c,
    e = 0; d > 0; d -= 4,
    ++e)
        b.digits[e] = hexToDigit(a.substr(Math.max(d - 4, 0), Math.min(d, 4)));
    return b
}
function biFromString(a, b) {
    var g, h, i, j, c = "-" == a.charAt(0), d = c ? 1 : 0, e = new BigInt, f = new BigInt;
    for (f.digits[0] = 1,
    g = a.length - 1; g >= d; g--)
        h = a.charCodeAt(g),
        i = charToHex(h),
        j = biMultiplyDigit(f, i),
        e = biAdd(e, j),
        f = biMultiplyDigit(f, b);
    return e.isNeg = c,
    e
}
function biDump(a) {
    return (a.isNeg ? "-" : "") + a.digits.join(" ")
}
function biAdd(a, b) {
    var c, d, e, f;
    if (a.isNeg != b.isNeg)
        b.isNeg = !b.isNeg,
        c = biSubtract(a, b),
        b.isNeg = !b.isNeg;
    else {
        for (c = new BigInt,
        d = 0,
        f = 0; f < a.digits.length; ++f)
            e = a.digits[f] + b.digits[f] + d,
            c.digits[f] = 65535 & e,
            d = Number(e >= biRadix);
        c.isNeg = a.isNeg
    }
    return c
}
function biSubtract(a, b) {
    var c, d, e, f;
    if (a.isNeg != b.isNeg)
        b.isNeg = !b.isNeg,
        c = biAdd(a, b),
        b.isNeg = !b.isNeg;
    else {
        for (c = new BigInt,
        e = 0,
        f = 0; f < a.digits.length; ++f)
            d = a.digits[f] - b.digits[f] + e,
            c.digits[f] = 65535 & d,
            c.digits[f] < 0 && (c.digits[f] += biRadix),
            e = 0 - Number(0 > d);
        if (-1 == e) {
            for (e = 0,
            f = 0; f < a.digits.length; ++f)
                d = 0 - c.digits[f] + e,
                c.digits[f] = 65535 & d,
                c.digits[f] < 0 && (c.digits[f] += biRadix),
                e = 0 - Number(0 > d);
            c.isNeg = !a.isNeg
        } else
            c.isNeg = a.isNeg
    }
    return c
}
function biHighIndex(a) {
    for (var b = a.digits.length - 1; b > 0 && 0 == a.digits[b]; )
        --b;
    return b
}
function biNumBits(a) {
    var e, b = biHighIndex(a), c = a.digits[b], d = (b + 1) * bitsPerDigit;
    for (e = d; e > d - bitsPerDigit && 0 == (32768 & c); --e)
        c <<= 1;
    return e
}
function biMultiply(a, b) {
    var d, h, i, k, c = new BigInt, e = biHighIndex(a), f = biHighIndex(b);
    for (k = 0; f >= k; ++k) {
        for (d = 0,
        i = k,
        j = 0; e >= j; ++j,
        ++i)
            h = c.digits[i] + a.digits[j] * b.digits[k] + d,
            c.digits[i] = h & maxDigitVal,
            d = h >>> biRadixBits;
        c.digits[k + e + 1] = d
    }
    return c.isNeg = a.isNeg != b.isNeg,
    c
}
function biMultiplyDigit(a, b) {
    var c, d, e, f;
    for (result = new BigInt,
    c = biHighIndex(a),
    d = 0,
    f = 0; c >= f; ++f)
        e = result.digits[f] + a.digits[f] * b + d,
        result.digits[f] = e & maxDigitVal,
        d = e >>> biRadixBits;
    return result.digits[1 + c] = d,
    result
}
function arrayCopy(a, b, c, d, e) {
    var g, h, f = Math.min(b + e, a.length);
    for (g = b,
    h = d; f > g; ++g,
    ++h)
        c[h] = a[g]
}
function biShiftLeft(a, b) {
    var e, f, g, h, c = Math.floor(b / bitsPerDigit), d = new BigInt;
    for (arrayCopy(a.digits, 0, d.digits, c, d.digits.length - c),
    e = b % bitsPerDigit,
    f = bitsPerDigit - e,
    g = d.digits.length - 1,
    h = g - 1; g > 0; --g,
    --h)
        d.digits[g] = d.digits[g] << e & maxDigitVal | (d.digits[h] & highBitMasks[e]) >>> f;
    return d.digits[0] = d.digits[g] << e & maxDigitVal,
    d.isNeg = a.isNeg,
    d
}
function biShiftRight(a, b) {
    var e, f, g, h, c = Math.floor(b / bitsPerDigit), d = new BigInt;
    for (arrayCopy(a.digits, c, d.digits, 0, a.digits.length - c),
    e = b % bitsPerDigit,
    f = bitsPerDigit - e,
    g = 0,
    h = g + 1; g < d.digits.length - 1; ++g,
    ++h)
        d.digits[g] = d.digits[g] >>> e | (d.digits[h] & lowBitMasks[e]) << f;
    return d.digits[d.digits.length - 1] >>>= e,
    d.isNeg = a.isNeg,
    d
}
function biMultiplyByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, 0, c.digits, b, c.digits.length - b),
    c
}
function biDivideByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, b, c.digits, 0, c.digits.length - b),
    c
}
function biModuloByRadixPower(a, b) {
    var c = new BigInt;
    return arrayCopy(a.digits, 0, c.digits, 0, b),
    c
}
function biCompare(a, b) {
    if (a.isNeg != b.isNeg)
        return 1 - 2 * Number(a.isNeg);
    for (var c = a.digits.length - 1; c >= 0; --c)
        if (a.digits[c] != b.digits[c])
            return a.isNeg ? 1 - 2 * Number(a.digits[c] > b.digits[c]) : 1 - 2 * Number(a.digits[c] < b.digits[c]);
    return 0
}
function biDivideModulo(a, b) {
    var f, g, h, i, j, k, l, m, n, o, p, q, r, s, c = biNumBits(a), d = biNumBits(b), e = b.isNeg;
    if (d > c)
        return a.isNeg ? (f = biCopy(bigOne),
        f.isNeg = !b.isNeg,
        a.isNeg = !1,
        b.isNeg = !1,
        g = biSubtract(b, a),
        a.isNeg = !0,
        b.isNeg = e) : (f = new BigInt,
        g = biCopy(a)),
        new Array(f,g);
    for (f = new BigInt,
    g = a,
    h = Math.ceil(d / bitsPerDigit) - 1,
    i = 0; b.digits[h] < biHalfRadix; )
        b = biShiftLeft(b, 1),
        ++i,
        ++d,
        h = Math.ceil(d / bitsPerDigit) - 1;
    for (g = biShiftLeft(g, i),
    c += i,
    j = Math.ceil(c / bitsPerDigit) - 1,
    k = biMultiplyByRadixPower(b, j - h); -1 != biCompare(g, k); )
        ++f.digits[j - h],
        g = biSubtract(g, k);
    for (l = j; l > h; --l) {
        for (m = l >= g.digits.length ? 0 : g.digits[l],
        n = l - 1 >= g.digits.length ? 0 : g.digits[l - 1],
        o = l - 2 >= g.digits.length ? 0 : g.digits[l - 2],
        p = h >= b.digits.length ? 0 : b.digits[h],
        q = h - 1 >= b.digits.length ? 0 : b.digits[h - 1],
        f.digits[l - h - 1] = m == p ? maxDigitVal : Math.floor((m * biRadix + n) / p),
        r = f.digits[l - h - 1] * (p * biRadix + q),
        s = m * biRadixSquared + (n * biRadix + o); r > s; )
            --f.digits[l - h - 1],
            r = f.digits[l - h - 1] * (p * biRadix | q),
            s = m * biRadix * biRadix + (n * biRadix + o);
        k = biMultiplyByRadixPower(b, l - h - 1),
        g = biSubtract(g, biMultiplyDigit(k, f.digits[l - h - 1])),
        g.isNeg && (g = biAdd(g, k),
        --f.digits[l - h - 1])
    }
    return g = biShiftRight(g, i),
    f.isNeg = a.isNeg != e,
    a.isNeg && (f = e ? biAdd(f, bigOne) : biSubtract(f, bigOne),
    b = biShiftRight(b, i),
    g = biSubtract(b, g)),
    0 == g.digits[0] && 0 == biHighIndex(g) && (g.isNeg = !1),
    new Array(f,g)
}
function biDivide(a, b) {
    return biDivideModulo(a, b)[0]
}
function biModulo(a, b) {
    return biDivideModulo(a, b)[1]
}
function biMultiplyMod(a, b, c) {
    return biModulo(biMultiply(a, b), c)
}
function biPow(a, b) {
    for (var c = bigOne, d = a; ; ) {
        if (0 != (1 & b) && (c = biMultiply(c, d)),
        b >>= 1,
        0 == b)
            break;
        d = biMultiply(d, d)
    }
    return c
}
function biPowMod(a, b, c) {
    for (var d = bigOne, e = a, f = b; ; ) {
        if (0 != (1 & f.digits[0]) && (d = biMultiplyMod(d, e, c)),
        f = biShiftRight(f, 1),
        0 == f.digits[0] && 0 == biHighIndex(f))
            break;
        e = biMultiplyMod(e, e, c)
    }
    return d
}
function BarrettMu(a) {
    this.modulus = biCopy(a),
    this.k = biHighIndex(this.modulus) + 1;
    var b = new BigInt;
    b.digits[2 * this.k] = 1,
    this.mu = biDivide(b, this.modulus),
    this.bkplus1 = new BigInt,
    this.bkplus1.digits[this.k + 1] = 1,
    this.modulo = BarrettMu_modulo,
    this.multiplyMod = BarrettMu_multiplyMod,
    this.powMod = BarrettMu_powMod
}
function BarrettMu_modulo(a) {
    var i, b = biDivideByRadixPower(a, this.k - 1), c = biMultiply(b, this.mu), d = biDivideByRadixPower(c, this.k + 1), e = biModuloByRadixPower(a, this.k + 1), f = biMultiply(d, this.modulus), g = biModuloByRadixPower(f, this.k + 1), h = biSubtract(e, g);
    for (h.isNeg && (h = biAdd(h, this.bkplus1)),
    i = biCompare(h, this.modulus) >= 0; i; )
        h = biSubtract(h, this.modulus),
        i = biCompare(h, this.modulus) >= 0;
    return h
}
function BarrettMu_multiplyMod(a, b) {
    var c = biMultiply(a, b);
    return this.modulo(c)
}
function BarrettMu_powMod(a, b) {
    var d, e, c = new BigInt;
    for (c.digits[0] = 1,
    d = a,
    e = b; ; ) {
        if (0 != (1 & e.digits[0]) && (c = this.multiplyMod(c, d)),
        e = biShiftRight(e, 1),
        0 == e.digits[0] && 0 == biHighIndex(e))
            break;
        d = this.multiplyMod(d, d)
    }
    return c
}
var maxDigits, ZERO_ARRAY, bigZero, bigOne, dpl10, lr10, hexatrigesimalToChar, hexToChar, highBitMasks, lowBitMasks, biRadixBase = 2, biRadixBits = 16, bitsPerDigit = biRadixBits, biRadix = 65536, biHalfRadix = biRadix >>> 1, biRadixSquared = biRadix * biRadix, maxDigitVal = biRadix - 1, maxInteger = 9999999999999998;
setMaxDigits(20),
dpl10 = 15,
lr10 = biFromNumber(1e15),
hexatrigesimalToChar = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"),
hexToChar = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"),
highBitMasks = new Array(0,32768,49152,57344,61440,63488,64512,65024,65280,65408,65472,65504,65520,65528,65532,65534,65535),
lowBitMasks = new Array(0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535);

// var bVk3x = window.asrsea(JSON.stringify(i3x), bsc9T(["流泪", "强"]), bsc9T(RU4Y.md), bsc9T(["爱心", "女孩", "惊恐", "大笑"]));

// paramA = {'csrf_token':'90034247236ad3bce9419c4ba49b7da9'};  // i3x 其实就是Token值
paramB = '010001';
paramC = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
paramD = '0CoJUm6Qyw8W8jud';


function a(a) {
    var d, e, b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", c = "";
    for (d = 0; a > d; d += 1)
        e = Math.random() * b.length,
            e = Math.floor(e),
            c += b.charAt(e);
    return c
}

function b(a, b) {
    var c = CryptoJS.enc.Utf8.parse(b)
        , d = CryptoJS.enc.Utf8.parse("0102030405060708")
        , e = CryptoJS.enc.Utf8.parse(a)
        , f = CryptoJS.AES.encrypt(e, c, {
        iv: d,
        mode: CryptoJS.mode.CBC
    });
    return f.toString()
}

function c(a, b, c) {
    var d, e;
    return setMaxDigits(131),
        d = new RSAKeyPair(b, "", c),
        e = encryptedString(d, a)
}

// window.asrsea
function asrsea(d, e, f, g) {
    var h = {}
        , i = a(16);
    return h.encText = b(d, g),
        h.encText = b(h.encText, i),
        h.encSecKey = c(i, e, f),
        h
}


// 这个函数其实是唬人的，就是从 cookie 中提取 csrf，所以其实可以跳过
// 但为了连贯，可以保留


function geti3x(cookie, Z3x) {
    Z3x = '__csrf';
    var tk7d = cookie
        , vh8Z = "\\b" + Z3x + "="
        , bfm6g = tk7d.search(vh8Z);
    if (bfm6g < 0)
        return "";
    bfm6g += vh8Z.length - 2;
    var zl9c = tk7d.indexOf(";", bfm6g);
    if (zl9c < 0)
        zl9c = tk7d.length;

    return tk7d.substring(bfm6g, zl9c) || ""
};

// console.log(geti3x(cookie))
const be3x = {}
const Hb2x = function (i3x, u3x) {
    try {
        u3x = u3x.toLowerCase();
        if (i3x === null)
            return u3x === "null";
        if (i3x === undefined)
            return u3x === "undefined";
        return be3x.toString.call(i3x).toLowerCase() === "[object " + u3x + "]"
    } catch (e) {
        return !1
    }
};

const fS4W = function (i3x) {
    return Hb2x(i3x, "string")
}

const F = function (bU3x, x) {
    return !1
}

const X = function (gL5Q, bU3x, ej4n) {
    if (!gL5Q || !bU3x)
        return gL5Q;
    ej4n = ej4n || F;
    for (var x in bU3x) {
        if (bU3x.hasOwnProperty(x) && !ej4n(bU3x[x], x))
            gL5Q[x] = bU3x[x]
    }
    return gL5Q
}

gO5T = function (i3x) {
    return Hb2x(i3x, "function")
}

bh3x = function (k3x, cH4L, O3x) {
    if (!k3x || !k3x.length || !gO5T(cH4L))
        return this;
    if (!!k3x.forEach) {
        k3x.forEach(cH4L, O3x);
        return this
    }
    for (var i = 0, l = k3x.length; i < l; i++)
        cH4L.call(O3x, k3x[i], i, k3x);
    return this
}

Xn5s = function (is5x, Xi5n) {
    var iH5M = {};
    bh3x((is5x || "").split(Xi5n), function (Z3x) {
        var bfC6w = Z3x.split("=");
        if (!bfC6w || !bfC6w.length)
            return;
        var J3x = bfC6w.shift();
        if (!J3x)
            return;
        iH5M[decodeURIComponent(J3x)] = decodeURIComponent(bfC6w.join("="))
    });
    return iH5M
}

const gU5Z = function (bt3x) {
    return Xn5s(bt3x, "&")
}

function getEncryptParams(data, cookie){
    let i3x = {};
    i3x = X(i3x, fS4W(data)? gU5Z(data) : data)
    i3x["csrf_token"] = geti3x(cookie);

    console.log(i3x)

    // i3x =  {
    //     logs: "[{\"action\":\"recommendclick\",\"json\":{\"id\":1913753881,\"alg\":\"alg-music-rec-unite-daily-vec-MIND_Embedding_202312043\",\"scene\":\"user-song\",\"position\":2,\"mainsite\":\"1\"}}]",
    //     csrf_token: "90034247236ad3bce9419c4ba49b7da9"
    // }

    // dddd = '{"logs":"[{\"action\":\"recommendclick\",\"json\":{\"id\":1913753881,\"alg\":\"alg-music-rec-unite-daily-vec-MIND_Embedding_202312043\",\"scene\":\"user-song\",\"position\":2,\"mainsite\":\"1\"}}]","csrf_token":"90034247236ad3bce9419c4ba49b7da9"}'
    // console.log(dddd)
    //
    paramA = JSON.stringify(i3x)//.replace(/\\"/g, '"')
    console.log(paramA)
    console.log(typeof(i3x))
    console.log(typeof(paramA))
    //
    // console.log(dddd === paramA)

    return asrsea(paramA, paramB, paramC, paramD)
}

// data = 'resourcePositions=MainTabFollow'
// data = "logs=%5B%7B%22action%22%3A%22recommendclick%22%2C%22json%22%3A%7B%22id%22%3A1400453707%2C%22alg%22%3A%22alg-music-rec-a3_recall-author-hpCover-unrestricted%22%2C%22scene%22%3A%22user-song%22%2C%22position%22%3A0%2C%22mainsite%22%3A%221%22%7D%7D%5D"
// cookie = 'NTES_P_UTID=9cbVR7YaULdNkh7EveYAUAHjGtu6xn2r|1723680676; P_INFO=biaobro@163.com|1723680676|0|mail163|00&99|bej&1723647087&mail163#bej&null#10#0#0|&0|mail163|biaobro@163.com; nts_mail_user=biaobro@163.com:-1:1; _ntes_origin_from=google; NMTID=00OvmzaV4OIuhVwoUqPhnv78is21qUAAAGUWGE6tg; _iuqxldmzr_=32; _ntes_nnid=5b5e7787ebf5e761569ef6b0301df071,1736649554638; _ntes_nuid=5b5e7787ebf5e761569ef6b0301df071; WEVNSM=1.0.0; WNMCID=vbehmi.1736649554906.01.0; WM_NI=EQio7qxGNdM8Yi5qXmQZGxNDusmS4qZR10ZqIhim91Ty59b8jzKjTxz1kw0Fvon4Kh9Q%2BSvMtPvoFGidHcdoHPs%2BS71aWLmSkxp7xMLqfXjAvolCwqaOrB5HiJ87bCuNNXY%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eea4c67aedafbeb1c174abb88fa6c45b839a8a87d64681bf9e86c546a9989d94d32af0fea7c3b92a878fa790b67bbc998285d0349bb7fb92db6793868999cd50b7ada3b4b77b9a8effd1d97b8bb8a78ebc3b98a7fbdae134aaa6858bd774baefa598b34eb6b1a2d5ca64fb8fe5b4f547b890ba90c54dabbc8884e7658c90bdccd23df3bf99adf059a9a8c0d8fb4790afaab9e94bb6b1a4a4f67ba391bea3b844ab96f8d8e149b79282b9dc37e2a3; ntes_utid=tid._.akJiVJkWY6FFRgFAVEPWZDfQKBZ1entO._.0; sDeviceId=YD-2Nj%2FhdViOYdBU0BUBUODIXeBKQc1e3o2; __snaker__id=hYVqnoPW3Sua3caN; WM_TID=uSwf1189LFZAAAQRAFeGMTfQPRNgCXs4; gdxidpyhxdE=IWbKMCsxtfatXZA3Y7CRkLGW7BPfAsxk6mbwwM7YTNeOgCs4CC5pjo%2F1qvujMWSXuqncX3P7%2FDVqP1was9RxPlDnsJu0nZ6M2SQbxQ9f2pp6TYGv2pG9wyk%2B3GdYNMjxDEAmHTf8mqr%2Bb5vACH2VnJ%2Fh6%2Fbr5h%2BwhpZA6SWbnV7byldt%3A1736650642034; __csrf=90034247236ad3bce9419c4ba49b7da9; ntes_kaola_ad=1; playerid=19538913; JSESSIONID-WYYY=Y%5C8e9sBp8I35DiEsJfmi1EQsSCRu9%2BhwdbWZdNGAjFfeIrOFd0kSw1r%5C0X%5CAx0qZjjst%2B520W8QNJCvg%2FTmEP%2FCGnsqbO6%2B5iOCs91GZOENVHBdHgP2Ae9FumPxjfJ%5CD2dmEMK55iZG2KHjD9uiJfjp4aqCSGa2%2Fm3%5Ce53vfglZ07iaK%3A1736656269280'
//
// console.log(getEncryptParams(data, cookie))
// kk = {
//   logs: '[{"action":"recommendclick","json":{"id":1810657045,"alg":"alg-music-rec-unite-daily-vec-MIND_Embedding_202312041","scene":"user-song","position":1,"mainsite":"1"}}]',
//   csrf_token: '90034247236ad3bce9419c4ba49b7da9'
// }
//
// console.log(JSON.stringify(kk).replace(/\\"/g,'\\\\"'))

