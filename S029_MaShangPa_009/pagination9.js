
const CryptoJs = require('crypto-js')
dd = {
    aa: CryptoJs
}

function get_sign(){
    const time = (new Date)["getTime"](),
        m = dd.aa["HmacSHA1"]('9527' + time, "xxxooo")["toString"](),
        tt = btoa(time);
    return {
        'm':m,
        'tt': tt
    }
}
console.log(get_sign())