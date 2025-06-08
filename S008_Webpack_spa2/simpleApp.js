const CryptoJS = require('crypto-js')
let getToken = val => {
    t = Math.round((new Date).getTime() / 1e3).toString();
    r = ['/api/movie', val, t];
    o = CryptoJS.SHA1(r.join(",")).toString(CryptoJS.enc.Hex);
    c = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse([o, t].join(",")));
    return c
}
// console.log(getToken(20))