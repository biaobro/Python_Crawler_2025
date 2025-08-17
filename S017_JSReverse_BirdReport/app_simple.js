window = global;
global.self = global;

const JSEncrypt = require("jsencrypt")
JSEncrypt.prototype.encryptLong = function (str) {
    try {
        var encrypted = this.getKey().encryptLong(str) || "";
        var uncrypted = this.getKey().decryptLong(encrypted) || "";
        var count = 0;
        var reg = /null$/g;
        while (reg.test(uncrypted)) {
            count++;
            encrypted = this.getKey().encryptLong(str) || "";
            uncrypted = this.getKey().decryptLong(encrypted) || "";
            if (count > 10) {
                break
            }
        }
        return encrypted
    } catch (ex) {
        return false
    }
}
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";

function hex2b64(h) {
    var i;
    var c;
    var ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
        c = parseInt(h.substring(i, i + 3), 16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63)
    }
    if (i + 1 === h.length) {
        c = parseInt(h.substring(i, i + 1), 16);
        ret += b64map.charAt(c << 2)
    } else if (i + 2 === h.length) {
        c = parseInt(h.substring(i, i + 2), 16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4)
    }
    while ((ret.length & 3) > 0) {
        ret += b64pad
    }
    return ret
}

const paramPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvxXa98E1uWXnBzXkS2yHUfnBM6n3PCwLdfIox03T91joBvjtoDqiQ5x3tTOfpHs3LtiqMMEafls6b0YWtgB1dse1W5m+FpeusVkCOkQxB4SZDH6tuerIknnmB/Hsq5wgEkIvO5Pff9biig6AyoAkdWpSek/1/B7zYIepYY0lxKQIDAQAB";
const encrypt = new JSEncrypt;
encrypt.setPublicKey(paramPublicKey);
encrypt.encryptLong = function (text) {
    var _this = this.getKey();
    var maxLength = (_this.n.bitLength() + 7 >> 3) - 11;
    try {
        var ct_1 = "";
        if (text.length > maxLength) {
            var lt = text.match(/.{1,117}/g);
            lt.forEach(function (entry) {
                var t1 = _this.encrypt(entry);
                ct_1 += t1
            });
            return hex2b64(ct_1)
        }
        var t = _this.encrypt(text);
        var y = hex2b64(t);
        return y
    } catch (ex) {
        return false
    }
}

const CryptoJS = require("crypto-js")
let MD5 = val => CryptoJS.MD5(val).toString();


function getUuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1)
    }
    s[14] = "4";
    s[19] = hexDigits.substr(s[19] & 3 | 8, 1);
    s[8] = s[13] = s[18] = s[23];
    var uuid = s.join("");
    return uuid
}

function sort_ASCII(obj) {
    var arr = new Array;
    var num = 0;
    for (var i in obj) {
        arr[num] = i;
        num++
    }
    var sortArr = arr.sort();
    var sortObj = {};
    for (var i in sortArr) {
        sortObj[sortArr[i]] = obj[sortArr[i]]
    }
    return sortObj
}

function dataTojson(data) {
    var arr = [];
    var res = {};
    arr = data.split("&");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf("=") != -1) {
            var str = arr[i].split("=");
            if (str.length == 2) {
                res[str[0]] = str[1]
            } else {
                res[str[0]] = ""
            }
        } else {
            res[arr[i]] = ""
        }
    }
    return res
}


function ajaxSetup(val) {
    var timestamp = Date.parse(new Date);
    var requestId = getUuid();
    var data = JSON.stringify(sort_ASCII(dataTojson(val || "{}")));

    var formdata = encrypt.encryptLong(data);
    var sign = MD5(data + requestId + timestamp);
    return {timestamp, requestId, formdata, sign}
}

console.log(ajaxSetup('page=1&limit=20'))


_0x291626='KMZexLigJzPGSJdRO07+zuuOr9enEkZi8kSPzxvc8rBnITdK5+FvMEkgqiwEirGdoWOEc/WHCgN5X7Z7N/DbwNWoHhM8CujP2JYBMJlGcQg0VkB0il/BKoaYqYYjeOFycksAQPtOF3S54poBklxpYT6fuN90wrgyNkXitdWwJ/IKi2V4xhac4LM1QsuPR2oc7JX82GJezi7i6qvfhJsE7Av9JyyTN+NiuM1Qelx7ol1W9G2qdHhEXnWe7j5GT0fMnnggApXvF1e1Z0oN04kvbpuaqs3vy8KV/CM33jf1FE8666tOi/naRMYzGiWp1IvaJ+8i9BIl1MKDLlnbXRJ1FguHuzfOtyL6AYTHlU9r4OTdILWzz/upycL3HVuFEGMW2cjpy0bTMNhaMS1HACb+BHYWG+K7txeN9AeS0ISfmW5DOFEkOR/lwdvyqHHaHhVb0ANzadf1jVaybUKkboItRIZbcTl5rpm3PhFzBfTS+jbg3V6sFAqKb+xKL71uS2/Y+CUZkZ44O9mb/0Qotfod1GlaXeeKoApgw3Z50hN14etfQ1DSZznXXqw+t7fqutR7YTcFidREFDHErRNmtsXPmwZbUBGtdwiBhLKhnorIly4/1FjwHgIfdgP0T19I4dM9Jok/o2A1/oVNCPTujFoffgpGJk8w9EtjnlrRD+yUBc4jejpq2HHYhWb72X7fKYauP8ZL+e4vjNNEK19QLY95TFCjrDpvTZLNoLwTHxcBTEjd7FEBcQqA71LotVh1yFvt3YwsJ4SYjVOctNiu1aMzlUHyuf/U1x4vkUnU/bN9JwcAjx/sok2YTnmFqSu1hIrShMISnIn7dXCK2qHslnloj22fZSxuk5Jw87maV66aAs9UCTpveWlfI81DkRoNO6wqHf1L7KuDYqAJNDNI/UcQ3ct04IpVHlMbaBqz3O03FtM9zfYtb12ZbtkDzdXTO5QJQbX2rHZTilYY4j95xV3xbw4GkvSFYEeg/7a/FH8yscRNttJ/Q/hpHZmLrXsYB6joJo8VICJ2YOzpf3lOf89n1MvJ+YdHjMmlgGG6rp6U9vkXU4uwFRNeXzAQ9wu85Bq6ZyPMwhaQhNa1lw6D9QYQTgA9VwpY2B4XNZGjUOJV5hpW6UsAUHTYkPVz209uN+DSJ7qIra45j3kH1VTLgeaTK7J96RPUjLo/z0tLBxjLwAbTU4L2P6oMTG1vd09WZCC5NpuLx4z4bdGBZM7ypJCy2dZub6ac9tBZ3pTvR9HI4dAn3ZKtD7ER27uo4/FYHEG36ETb8xx16BIJZeLcL4F4RUGjyuu43SRSvwdmLJ5f+PxBD6GgdDO9DGfY3HtGC5d2eBnHoHkvbmB3mNCVJeW6ck8ql7GoCWT2jRqzikgB71byEUCnIbo6PBMVHx7xVFs3BbPbnnN7faDwGwnRiesoWDQGYxcW1sUjdckoXcZIu11hPh3Dh47gMY2qE9Nnk36DJVp0/MLDaDAqxZT2olqeeSrmvgHEWW3GJqJD6Qr3k+5HkeEd0EN0lGBrHdySXrmaxN1RqHwLI9jqSFi0JJZuCdtKLyp2J5RDWgkjGta3MpIvE3/Rv3oL9uaP0Te48pPYDXYypUp5F1PelMCw8igCg3tZX7+xdIgKBqD387T45qwn2NLL9vAh4NY/gOJ61KrpH76iEP54IJI4ehRg+5sw0ZJFrMNPuj0ddVqvfgq2lui9p/SCDzNn5EJ3qIwXijQVpnaEy9+Qd7rJNRgZai7sNF8zO5uhuEV+EYCbBDqMc0IzGKgqk9iqo7DJoO7JOd69/ghn5GzwqvWBe1WOaBCgEbu5AT6zE+ctTaLGzcs1DVeM++fj4rKofMTO894xMdXFDlgQgt6KZNdWLr99TFfzeVSG2UsvnKAo+vINHIPG470/cD/6eML8EiGauJxAgTdPw4eDYlRsECG6OLRvBpjXDsLU9SrA+7SH+2FSkjVw0ZNb3lbrz8xYRK/KrmUo8FUUU7pRwKnqbcfEcAm76QMniJJbMCuIcbtHLHCFolsCD/bGKQfFlOwteC1auuQV4JHzkV4fDnIiWvADCwAFldaSsObcNH8wB3PmmD7O8W4RDWPhd9VdbPcTR3WcIfTPtOEdUQiRZKvTp9xGX0p55jwGuC7ogdRBxRV8EEmDI6GSf6SFUOTMG/yUa2qkfoF9Y17cxER1vCEIkLv4YE29qxduP4IgRC4X10m/mux04mMa7zNnfiXlAum4dAKNUBezKEytIjoasTvlI4DxAQKzOE9oNBTpjtH/nsS3Nm5oQoDWXmyeUPWYYME+HiBQ+LUabcEWrGZ0Cp97yevQ03VBCn3LjWW86rFAe5lWxMKqwazLs/n1PSMvikat/AeKlFYcPAdpam+rrQeJglhr4K2Pzj+0oknvT8c6Fc1zqyXaHH5xpjK3lZzhRE9p4EG0bTogDfc9BGTLmInVOcq+yOKoXY2El+NWMz1XEHrUVe8TIbgbWfW0XbBFcK4IbfuAI16H7aaf62tAVxQrnf8WfTlu+sbDUsJAmOad5hBMby9/bjQOX332G7wmyuKbZlBF+DYBaOEvVkasejgEHD0/g5kLpomoZfsrbQAVEaTAoZPQb6uXXaltcHgMq3hgp+uXz8t++0zCuDxmnb2yfqAE4W4EzX34paGJiiKi4ZoJNL2hxQnAxxsRSEeLLXspGaKwXoT3RH7Fubj2h48xrb6EAzaXy4W4Xd/O+wqYPyl0kaXpgGAYmfNr1xmM/MnRUBxjy5IigM48B4/EQI651GDxzAxOv1kFYxptbDXGieUX92lYexDhsHgZsFd8/0ib9uyAMo0QE8d6H97p3KPOX0clRymtkOQX2Mk2Bs0g1ZmS2HRDB/LqZZlqD9QbXkljQi0UTxXrwApuawULT4mLxi8HbzsBF4UVfCVX4wdPLcxg1JjeweY67gJApm1rS2ikxtVgoLvyuYXYnTg16zKR0xKx1o0sSqwyeZki6aF+4hq1vhmATxiZuvIkWhVkdC6luURlU6sJPVaoS8STh+cFh0lFJrfFZr4p6BUNuHn2NAAy+k95kaLtD5lun8HR8LsKKSvgHUIq3/eF1RsU0onWsavftn5y9nSA31XZdRbYInir5eOxUilHsdtQe8CPWF5EgmEFPL/zk8HUGMSRhK9pFRChgPefwVb/MoKA+hwk+r8CUjtUwR0MoyMeBIiXmbkl+/1VhWlN8MC80CFaTpQJUu5gK8GhHZ/DU2q9oqM2dTMOIelkHz9dcT14NXXRmaEsrFEDdZlTHCkIFxbLqxFoQQdFNRKROy8lLNfxRBSlzd3Q3vA+DWayd5DF6qrQsozi/BBiV0jP2gQR96br3voDoS/Sj8BCeCnIEWbP1EmLTOhteVLdgzvuZgcI52LH3uQdIQu9HgrGK7cYKCEYZNAy1pWoa2TP9bbucyb9QvPQtxKQAZzWukkOUdsbruh9oLS374zR7uGCmUV8wAl53t3U6r3Z0IZsaAkct1FlfN500uY/MMOPnt9JNYSJhJeuj1KoGlvDsNoRU9gT39u5WSNVONFmijPyuR8JXTFw/BFovVarZqAWpSmsayL+oxIZe0UuvpZoNQX2AUeaFKg3IU1h+5HK502fTN8Xmrd7FmZwA/444fTHBMw3lzxQZEMmhuDYJoQT0K2G4lAgAygES4/uVcyESC9VbD1e0c5/hkCnRUtyT25WFwB3LIov51RYUj2BvSXb/b8J4d2i2wNDjJd2I32ISHwisGz/q3a3YkcsUKW5bZSHtmb7Gt+bKfCSF+qPQb5fZ0vyk0GYcpnisn9BqdcxuAP42tTo2vJVDl8LfGCrmJwPsmvllS20w+F16NRYAq49S5K4nP2yx+r9YPYGttOu3E7gFEYODRC2Q/4VNuiyQgwIUKrWfjWXMcRXDe8mg/AHwx8RkY+bCZwuu9SiRsdvxdL8Es0Svhgm0dpUdIFh1gaVhyIoOYplGcLHRpHYFgZ6xzgmCPvIxH8JjrxTcREAyBTBEiC117Dm5Sofk/bfl5MmmpNywtd465dqkM178xi7FsTSnbC+aQNPGrSHhNIu03miZNMSAaK4TQ0cMoe3LarBhLQxKuj7d/ra6I78gCLSrGzHtVwkXR0i0956vKz3lZydRzK8Uxz1lmBxaGqzQVRw6B/LZlVKirtzkmvBWWPzB/npQEE2VMJlAXHGeaqwVNtNTEvhBnRgshd7RtOW9d0LcueYpaWFrUJHXWCr4lCXuiKiHVa6GBqjMjiVQpwi9ebSVuCvXQ2HYQljUrMzOg4RtIo3hC30nhQys0YLgOpMLbaOT/FWYYxcVEsZIXMfxrcuO0It9ZvoBREA++QibafMTDzmbDszKUaepufO2yoFO9Jr49MPniSytiysIhQBCakK3IiQgZ4ypJg57FWrrsAd2WWsr5QTAj3QRqUwALwW4v0JIgxIAePYBfOOhROg5gHzHIXZa+AwxkjIBzwEEvXI2bmQLwvcL8fKWgeU2tT6wOYzFVYZ19416fczxXT6yAjRsbBfK0tkten78rwEkBFDtwzlHFkqWBX1u8JOPygTKCJcRR66eeX5R+8wgvOolizC+oKbnTmbnhBoPRToyH0B5KYaHhvAKTqocAjcEwTIawusR6XCOmKMQHCh2mErF52WvkwAdjhY0oJ27TD/ti0HyNtR0MAsT3Fq/GsdsNzvimSTblRBKOWG3/bz49f0BtFe8GGfxEIA9e757SwX6r71dloVQL9XulMPvEq3Tl4LOqCOYf/SudPYD6BrehLknj8YBRuaZ8NqZv52zXK8iyQhpGdJmLU21SpJ1QUsz3nV5GAft5t7aVEbPvrw/JzJ1lHlmGZY1vppXmoA054MyB/NUdIhH4zFVAKjWbMmsNJnN3VUrAI8qasZUUd5Gj9g1vm39pM4Xe4eaWJvF8Ai4sj2AXaPaZV8MV8WBuqDhYw1qQ6ZaWpCGlkyXEh81yvALuIm0v2VIfKXXvCMjUIzER08ZOTqx60E9UnVFFRP2ynsZOEiqwkcCZP44x+7ykft62d/1/3J5XwFDL2imQCWAfSlTmJhmVg5jk3/jVTl3E4gmMioAcYdZNCKeTp4nNvY4RRkGvX+dg9GpD/ygH+mJtG0e3nrdKsL9QFd0UOmwRRvSyUEG0TeqmWoWKigldcqKa6TO1wgrY3VeDqyX4mP7J1KNMjkTeIbj2rQKzdcbdQi5zBwnXEp/CaKrQ0zDr/QfMMfi3AQYB3mxlO6vVYj4M0IWqymVCJUYvncnSSMznVOtLRa7suNbmrCg0SvJmkABYtmXzvsG02FSw7g7DugblAff4SLz3swKVxfTkS49l2KdrvT8rYeFVSUeULE8ZIXz0u5BnFMCcq24MX1/5AvsMl0Bl8PQSlrKBpqNUyJYqe1QYAd4jqhLQ8cIscFqWii8qnOXzFsKOMFOAj/3MhCdf0U/XIukvIq7hqD0hHl7Zh74FPx56TMhRnxSdCkSGyim1s8FeCA87NgpflDeA8mPlZrr4/JYAhB5JFIwN4Qw//0jb29o+j+fWrKq9W6/jk3kfpHQ6gX/yXwcYpzDz5T3zASoxvzE+p63dU8/bZ8hj2jH/+w16anuwdO9IEdsAk2CeQ9ZxL1/QydcOa573V5c1zIGKkLo0C6MUcHV7ycUb4wdNaFhkCZSsu3etKD04wpzk4hufJ+J7L1gsuZX6F4sYmzNx0YwZfndCCA9ipxFEHLQ12GQnpEqmQ5IJvPmtHf5CbYJzQZ7DbkChbvqI90auiyHOscot7ezCg8n5O0GWN65F2f3pIoayoHbxGW68SEr7+KSvmna+OpzQlgTw27lsSpFwJM4fnCdePL1T730tGesFRf1asGSK4yPfmkeZYU4K3Wem9dH8HajIhzd+6KZ7PqYRME37Xy9gEK7lV0guufeKD/JQMGBH11289iOWlp4NpnUXrnZ0hgs0mLPFrOaLHb1AXsj/bNS6W2TZb26Q5cxzksRFawYFKkKHcD+8cdU8lo5naRfkLFiRzJAjxPB2jYXHJnfq1FdvnAD375dyJIiNJzOK1uDuESVKUwqTqKTdKH2xkKMjyHZO8nrPQ4mExR7RFJrbvM9O13YDWNiTeWWStgD0SvYQ7ELHbXzLpvUMoaiA3jIg6oFie14aOqE+ZRWqFx7J5kVdd1fNyZ25YxlziGU8+PUS5iEYI883M/w5TobkonRDwvW3LJuqTNzn7DfVPUfb7p8iLaA+08poIpiiSbFrQZbsjsrRgZpu37TvLCct2UVEa5mpzU0M4f1+mqM2qiEiBg98y7c0aqHdviYaClfVrcoAeU2ViWe+aRO9V3urKvEPgibyz7gvtdcbUu6JF1s94nXQApPrKt8WPpQRzpyPhEvEvlbSr+tpGX7L0/GoQBqt+xXoGEd9JljcMu8he6lL9EltueMtQ28anKUkXKj5U7oGmfJI40cQPC3WKw5fmfgWAsFZA7PYJI29E4GW4q08bbyCT37lYYDIk3B7CU8H4i1uvyUNEMdWFRKIz+KBkydpXiuX1Opydi1tIwykONNTmKf2oYFL9wQ30rIv0Vx2hME8kaCNuFJxNQ6FxPUIsa3/vv5O4Nupma8WTfapeIlNLb8oysg7/7IaQggNQVCv7xypwOvBhuL3XyHnPZepECciUk5tz2nhxMKCOEjvKoETZF9vH9T5GPXjbG4UeLSljOGEUoVnftVal8tEKUV5WmDg+vvs+0sQElCJ3diJ5dX5lvdcH/6KASpgvqpQjITT9Npp43T8e03b9r7BK9qNUwNjQqF5t3yivXc3rrozfakvJczqn2LKC38Z961b4zSPJ+dZh4MAFY66cFZ/EBrTd0zmdfgKcn2z0AYnvQYTGOOYMLKubODNCdIOqw/SghX8hvkBeN6eQQQI2YPPKoaS+7C2RldDfY04YNxJ78wlJqnx0sRtwbTLooZ+NCJKaACT9As1J4Fo+SyDkXELWC8kJ+x0ZM3E05SoFW66gtr0Gu9gP3kPqyGGydFF6wFvdcyiEkwXk2i1K4xPyVBaAnjXZFA9j5GYLil1/lXgWRl+aA16LG+Hl7OdhnyBZ0b9nPWc539Jkp9E96XFohv6SqzBz2QXGiFLOGwWpImN29FoDKQulkhU4ycyJ5QTwzNg9YI8H5H9l4h5OL1QLgc/bXRSkiiChlC1jTntt/OCsw50hClMFT1jrtiPZ3T1fJd/8a68g77DE3EYLt56BAfbQ+2U4FObUgt+D+J71RcVcmbMpps/CaZlcMfwDAoNPEggmURBC/AFOA7S/ihFkyStectx62UP+vHNKEchlhmw4nUn54d8gs4w2JvhYH00ChKKQJO8r5sk7vnrRMx44pSPu7f18EJA1BHCwtrJuYCfSHqAq/KYm76HqC+ofcQzreoHM70BiZ0iBLQgZJxPN+xOMxF/c5hqy42YfH05qxWregaRrtrOVbGf3BmgWm5KVU9RUXYU1+iA947Hn7TayD+id3b/gXe52NqVlMggtHpEMmGM32G+TdE1VeiaU27c3fUUO7LHa0FD5mRdkTW8WROFS64sSTNfM1agzKoeh223kK7+7WzwH/84cUvzvo37EliCXEQGeqF2D36y6E4YPwevXHiYD8S5xXEvFtJ+HI2KZhyAV7slFr9hSuUXGzVSrD8mpopRQHUUlIhqi4C3YojZrSECOZlgWORYFM75nTQSaMdv0K+3fzn7AXrVtL/aLnLIiclSJurQhaXOZK6ccaItFEpG26vvfwOVKy3XzeUd6qh965jC/8Q53O1m4OoQwat8Dv08dq6ryvshGnJOFDey54KtHPNyoWU28SZIlwJajv0L9KBy3lheYRx8VBX5Z66CxrK2T8V5zSiqR2zhC5B8/hTVcpRqCJ1awKonvh+5/RALkZkXhsr1NuvZEl/Cy5A1t8TbG3FBimmJMCyiG0Q+L0zUbdkHqsCz8FMuUgbFzKMWrbzmp2THIf6O0+56z943sCs0saB256FqbuB1e3SAlV2uCVPUadH9nWV+njYee8S+NebeJxC3YNb4awPB3eRfG6of0/REiXR2qCd3/K36rmhAOTpgpbBUG6tTqQt2PhvqOah9Yh7DJZlOC2rk52d+xkCqFhWIUfvB2E3eJxKa6zEpreReMD9eSVbPZpEfJ94AqrcDpGrLA6ee3E1MbA4y2MT3eRd6AFf2OlQaxeWKMxCbnQU1aVUXkkPJf0GnjvdFQi/4isFrUAVPt0tfGoSAJts4FkDnlmflQKTTespUqztescVsQu/h8EXjbSPbTCqzNwBki2njusRzp7qnVqaondcbfgoaKVDcroX4oxoXT7KguJyDtA00WI05wb9O0/Zm3FpG/xClq103lFhOpUAyvqfM690sZiixNVx999gxbbChMXokPu04f++jf6zS2gQc+iTyFdthkJY8BmF8Tfv8MJMeZjzOsZES7NtwGvpvA8NFEOTXur5vekCLzQxX8eW+xHUmBUdIWiMWFSx0rm6eVN+3d+P6rcHi5WmCCfjqqpirQrtGAD4viJF+vvaVF2I1csYs3Nxv1VrSRsYao/072M/ks1hQXZkZFqwfRa1v5yTITofFJf5IOp/jrWFNMin/+ZJeo8Ff1V2JzvsEYFBztk0MrZbrJsm3kqdjL0k1aE+DEOR1fWqORswOxf/+K6/022vscby3fv0EA5E0W+T7YEp08K9nDAHxHmVvdF57LrJ5sPsQn2NnaBAeTKoBaxTMjZ+3QpIo7z9tuKXCfhSGdkATGFxSKrCn9MvAUdwtLFfIH8Zra50c86p2pcVLbf93ouslVOl+sGK59VJ2+eRjcZopg5xtJzpmmPMeJ7oVFyM1iW2cy8Day2U+wcR+bASVwxVVyeuv9xxU2geel4AoehlUolZJVScQNqNALg9JyUnTTBZFd1r8DLK2QKa7bKkIu0yFmZLD8KJ93wWg9imNgOUPaiM6gmMr9IxypA2raUjsVRByUMLchIexhm76hpX8NA6qIT43t0xeydLur1OuR0F/DLrgdWgsFw6c7xD2U1ivlyrbEOqRMotu4mxQYLrX5TL0rgjLaJyEf+DJRDAAxJ2XGbuf/hd0Tbo92oTJQySn01kAu0BsDmLAao7K0/8UymOrhELYhHlgeUMSGgVsvPuB1Ua+rw0sgcYx7SNE+hrjeuGtpnalvOwWMnx2eZc5Gm1GedkszHsPUmFRx5e4TUdbgcFM5x7LTj7Mbzxi1rEhfZgyl7jOk6kjGU00KH5kz28Moz8V50yfyEN4Y6MxtzQoh225DK1vawesCuVAm7R9Co6OG6tG8Iq+lP6ebSCVTMaWLuSpIohK+LvBffOsaSyi2HRIDozxoQqTc1AQXnPb15TvTjfG/1pMWjFhfCYq88zgUEv+Cw2HZ74ikQXpoNqdKhyZ3kn2t0E/x3pw/p3SVO+cTIFfp2wF5e6Tfvdm3sLDHKBD3RQxUtuc5+5+fvld1QlsKp13TMqez94TFvTiRzbMJ6SmtpjYkkS0aAmKKRZflibHsoBNfh1X7XPGLbQGxquy8PIn/dgHKioVzAQ2hZhE/U2bxU0SyHDw6xDy4RsCBK1Sa7le1RRSmbtm1zxsSfn4uimOuXdM4htJaKQbypYvlGxayRW6Ve1hZehCZvMpkCbQrKPmUkoYST1N/twOztA1Xa2VZm1putlPtXzh3mnt6y21r+ySgFcHt7hfZ+cr+90vVtEMUzXWHTaJZHFzQxPwZJgq7yJvnudB06uPVMVP730Sn4fq/RDgY60Q04rEe8/i0ZBivehX1lZNO0/9O9X+zEWjp8hOL7zrLtwpsxgL2vQmNMwGzH0qdoc6lWF5mbdOlX+WAiNak5uk6Uxx4Y3qLeMd/VRf9O19KgSSzX8g=='
function decrypt(_0x291626) {
    // key 和 iv 都是固定值，所以直接从网页中抓值就行，不需要抓算法
    let key = 'C8EB5514AF5ADDB94B2207B08C66601C'
    let iv = '55DD79C6F04E1A67'
    var _0x3c6fa1 = CryptoJS['enc']['Utf8']['parse'](key) //(this['getMapping'](this['key']))
      , _0x3ec027 = CryptoJS['enc']['Utf8']['parse'](iv) //(this['getMapping'](this['iv']));
    var decryptData = CryptoJS['AES']['decrypt'](_0x291626, _0x3c6fa1, {
        'iv': _0x3ec027,
        'mode': CryptoJS['mode']['CBC'],
        'padding': CryptoJS['pad']['Pkcs7']
    })['toString'](CryptoJS['enc']['Utf8'])

    // decryptData 是个字符串，转换成 list 后返回
    return JSON.parse(decryptData)
}

// console.log(decrypt(_0x291626))
