const CryptoJS = require('crypto-js')
mappingObj = {}

decryptContent = function (content, key, iv) {
    var keyStr = CryptoJS.enc.Base64.parse(key),
        ivStr = CryptoJS.enc.Base64.parse(iv),
        base64 = CryptoJS.enc.Base64.parse(content),
        srcs = CryptoJS.enc.Base64.stringify(base64),
        descrypted = CryptoJS.AES.decrypt(srcs, keyStr, {
            iv: ivStr,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
    return CryptoJS.enc.Utf8.stringify(descrypted)
}

replaceStr = function (str, index, char) {
    const strAry = str.split('');
    strAry[index] = char
    return strAry.join('')
}

modifyJson = function (obj, encryptField) {
    let i;
    let tag;
    for (const key in obj) {
        // 如果当前属性值是字符串，将其转换为大写
        if (typeof obj[key] === 'string') {
            for (i = 0; i < obj[key].length; i++) {
                if (encryptField.indexOf(key) !== -1) {
                    tag = obj[key].charAt(i);
                    if (mappingObj[tag]) {
                        obj[key] = replaceStr(obj[key], i, mappingObj[tag])
                    }
                }
            }
        } else if (Array.isArray(obj[key])) {
            // 如果当前属性值是数组，将数组中的每个元素乘以2
            for (i = 0; i < obj[key].length; i++) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    modifyJson(obj[key], encryptField)
                }
                if (encryptField.indexOf(key) !== -1) {
                    for (let j = 0; j < obj[key][i].length; j++) {
                        tag = obj[key][i].charAt(j);
                        if (mappingObj[tag]) {
                            obj[key][i] = replaceStr(
                                obj[key][i],
                                j,
                                mappingObj[tag]
                            )
                        }
                    }
                }
            }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            // 如果当前属性值是对象，递归调用modifyJson函数
            modifyJson(obj[key], encryptField)
        }
    }
    return obj
}

decryptEncryptFields = function (res, prop, isJsonFormat) {
    var json = JSON.parse(JSON.stringify(res)),
        copyTxt = isJsonFormat ? json[prop] : JSON.parse(json[prop]),
        base64Key = json.responseSecretKey,
        base64Iv = json.responseKeyOffset,
        base64Mapping = json.mapping,
        encryptField = json.encryptFields,
        mapping = decryptContent(base64Mapping, base64Key, base64Iv),
        mappings = mapping.split(',')

    for (var i = 0; i < mappings.length; i++) {
        var relative = mappings[i].split('-')
        mappingObj[relative[1]] = String(relative[0])
    }
    return modifyJson(copyTxt, encryptField)
}



// 本地调试
// res = {
//     "mapping": "R/tEcNgH/6HRAm4fCpSXcfXhNgQIoPnumJtGVasgwqQ/KJThf/9lVpef/8E27Irc",
//     "data": [
//         {
//             "dateValueMap": [
//                 {
//                     "date": "2024-01-11",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-01-12",
//                     "value": "HAHP"
//                 },
//                 {
//                     "date": "2024-01-15",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-01-16",
//                     "value": "HAPP"
//                 },
//                 {
//                     "date": "2024-01-17",
//                     "value": "HAPP"
//                 },
//                 {
//                     "date": "2024-01-18",
//                     "value": "HZAP"
//                 },
//                 {
//                     "date": "2024-01-19",
//                     "value": "HAPP"
//                 },
//                 {
//                     "date": "2024-01-22",
//                     "value": "HAIP"
//                 },
//                 {
//                     "date": "2024-01-23",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-01-24",
//                     "value": "HAWP"
//                 },
//                 {
//                     "date": "2024-01-25",
//                     "value": "HAKP"
//                 },
//                 {
//                     "date": "2024-01-26",
//                     "value": "HAKP"
//                 },
//                 {
//                     "date": "2024-01-29",
//                     "value": "HAKP"
//                 },
//                 {
//                     "date": "2024-01-30",
//                     "value": "HAKP"
//                 },
//                 {
//                     "date": "2024-01-31",
//                     "value": "HAWP"
//                 },
//                 {
//                     "date": "2024-02-01",
//                     "value": "HAWP"
//                 },
//                 {
//                     "date": "2024-02-02",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-02-04",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-02-05",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-02-06",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-02-07",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-02-08",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-02-09",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-02-18",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-02-19",
//                     "value": "HAHP"
//                 },
//                 {
//                     "date": "2024-02-20",
//                     "value": "HZAP"
//                 },
//                 {
//                     "date": "2024-02-21",
//                     "value": "HZZP"
//                 },
//                 {
//                     "date": "2024-02-22",
//                     "value": "HZSP"
//                 },
//                 {
//                     "date": "2024-02-23",
//                     "value": "HZWP"
//                 },
//                 {
//                     "date": "2024-02-26",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-02-27",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-02-28",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-02-29",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-03-01",
//                     "value": "HYAP"
//                 },
//                 {
//                     "date": "2024-03-04",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-03-05",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-03-06",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-03-07",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-03-08",
//                     "value": "HKAP"
//                 },
//                 {
//                     "date": "2024-03-11",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-03-12",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-03-13",
//                     "value": "HSAP"
//                 },
//                 {
//                     "date": "2024-03-14",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-03-15",
//                     "value": "HSIP"
//                 },
//                 {
//                     "date": "2024-03-18",
//                     "value": "HSFP"
//                 },
//                 {
//                     "date": "2024-03-19",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2024-03-20",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-03-21",
//                     "value": "HKPP"
//                 },
//                 {
//                     "date": "2024-03-22",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-03-25",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-03-26",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-03-27",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-03-28",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-03-29",
//                     "value": "HWHP"
//                 },
//                 {
//                     "date": "2024-04-01",
//                     "value": "HWIP"
//                 },
//                 {
//                     "date": "2024-04-02",
//                     "value": "HWSP"
//                 },
//                 {
//                     "date": "2024-04-03",
//                     "value": "HWKP"
//                 },
//                 {
//                     "date": "2024-04-07",
//                     "value": "HWHP"
//                 },
//                 {
//                     "date": "2024-04-08",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-04-09",
//                     "value": "HSFP"
//                 },
//                 {
//                     "date": "2024-04-10",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-04-11",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2024-04-12",
//                     "value": "HSAP"
//                 },
//                 {
//                     "date": "2024-04-15",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-04-16",
//                     "value": "HSAP"
//                 },
//                 {
//                     "date": "2024-04-17",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-04-18",
//                     "value": "HKSP"
//                 },
//                 {
//                     "date": "2024-04-19",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-04-22",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-04-23",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-04-24",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-04-25",
//                     "value": "HKSP"
//                 },
//                 {
//                     "date": "2024-04-26",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-04-28",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-04-29",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-04-30",
//                     "value": "HKSP"
//                 },
//                 {
//                     "date": "2024-05-06",
//                     "value": "HKZP"
//                 },
//                 {
//                     "date": "2024-05-07",
//                     "value": "HKAP"
//                 },
//                 {
//                     "date": "2024-05-08",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-05-09",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-05-10",
//                     "value": "HKPP"
//                 },
//                 {
//                     "date": "2024-05-11",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-05-13",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-05-14",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-05-15",
//                     "value": "HSAP"
//                 },
//                 {
//                     "date": "2024-05-16",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-05-17",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-05-20",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-05-21",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-05-22",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-05-23",
//                     "value": "HYHP"
//                 },
//                 {
//                     "date": "2024-05-24",
//                     "value": "HYWP"
//                 },
//                 {
//                     "date": "2024-05-27",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-05-28",
//                     "value": "HYHP"
//                 },
//                 {
//                     "date": "2024-05-29",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-05-30",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-05-31",
//                     "value": "HKYP"
//                 },
//                 {
//                     "date": "2024-06-03",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-06-04",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-06-05",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-06-06",
//                     "value": "HKPP"
//                 },
//                 {
//                     "date": "2024-06-07",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-06-11",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-06-12",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-06-13",
//                     "value": "HSAP"
//                 },
//                 {
//                     "date": "2024-06-14",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-06-17",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-06-18",
//                     "value": "HSAP"
//                 },
//                 {
//                     "date": "2024-06-19",
//                     "value": "HSYP"
//                 },
//                 {
//                     "date": "2024-06-20",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2024-06-21",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-06-24",
//                     "value": "HWAP"
//                 },
//                 {
//                     "date": "2024-06-25",
//                     "value": "HWZP"
//                 },
//                 {
//                     "date": "2024-06-26",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-06-27",
//                     "value": "HWAP"
//                 },
//                 {
//                     "date": "2024-06-28",
//                     "value": "HWZP"
//                 },
//                 {
//                     "date": "2024-07-01",
//                     "value": "HWAP"
//                 },
//                 {
//                     "date": "2024-07-02",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-07-03",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-07-04",
//                     "value": "HSWP"
//                 },
//                 {
//                     "date": "2024-07-05",
//                     "value": "HSFP"
//                 },
//                 {
//                     "date": "2024-07-08",
//                     "value": "HWZP"
//                 },
//                 {
//                     "date": "2024-07-09",
//                     "value": "HWKP"
//                 },
//                 {
//                     "date": "2024-07-10",
//                     "value": "HWSP"
//                 },
//                 {
//                     "date": "2024-07-11",
//                     "value": "HWSP"
//                 },
//                 {
//                     "date": "2024-07-12",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-07-15",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-07-16",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-07-17",
//                     "value": "HWFP"
//                 },
//                 {
//                     "date": "2024-07-18",
//                     "value": "HHKP"
//                 },
//                 {
//                     "date": "2024-07-19",
//                     "value": "HHWP"
//                 },
//                 {
//                     "date": "2024-07-22",
//                     "value": "HHHP"
//                 },
//                 {
//                     "date": "2024-07-23",
//                     "value": "HFKP"
//                 },
//                 {
//                     "date": "2024-07-24",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-07-25",
//                     "value": "HIYP"
//                 },
//                 {
//                     "date": "2024-07-26",
//                     "value": "HFFP"
//                 },
//                 {
//                     "date": "2024-07-29",
//                     "value": "HFIP"
//                 },
//                 {
//                     "date": "2024-07-30",
//                     "value": "HIZP"
//                 },
//                 {
//                     "date": "2024-07-31",
//                     "value": "HFPP"
//                 },
//                 {
//                     "date": "2024-08-01",
//                     "value": "HFFP"
//                 },
//                 {
//                     "date": "2024-08-02",
//                     "value": "HFIP"
//                 },
//                 {
//                     "date": "2024-08-05",
//                     "value": "HFSP"
//                 },
//                 {
//                     "date": "2024-08-06",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-08-07",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-08-08",
//                     "value": "HFPP"
//                 },
//                 {
//                     "date": "2024-08-09",
//                     "value": "HFFP"
//                 },
//                 {
//                     "date": "2024-08-12",
//                     "value": "HFPP"
//                 },
//                 {
//                     "date": "2024-08-13",
//                     "value": "HIZP"
//                 },
//                 {
//                     "date": "2024-08-14",
//                     "value": "HIHP"
//                 },
//                 {
//                     "date": "2024-08-15",
//                     "value": "HIIP"
//                 },
//                 {
//                     "date": "2024-08-16",
//                     "value": "HIFP"
//                 },
//                 {
//                     "date": "2024-08-19",
//                     "value": "HIWP"
//                 },
//                 {
//                     "date": "2024-08-20",
//                     "value": "HIZP"
//                 },
//                 {
//                     "date": "2024-08-21",
//                     "value": "HFIP"
//                 },
//                 {
//                     "date": "2024-08-22",
//                     "value": "HFFP"
//                 },
//                 {
//                     "date": "2024-08-23",
//                     "value": "HIAP"
//                 },
//                 {
//                     "date": "2024-08-26",
//                     "value": "HFSP"
//                 },
//                 {
//                     "date": "2024-08-27",
//                     "value": "HFYP"
//                 },
//                 {
//                     "date": "2024-08-28",
//                     "value": "HFAP"
//                 },
//                 {
//                     "date": "2024-08-29",
//                     "value": "HHPP"
//                 },
//                 {
//                     "date": "2024-08-30",
//                     "value": "HFAP"
//                 },
//                 {
//                     "date": "2024-09-02",
//                     "value": "HFZP"
//                 },
//                 {
//                     "date": "2024-09-03",
//                     "value": "HFSP"
//                 },
//                 {
//                     "date": "2024-09-04",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-09-05",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-09-06",
//                     "value": "HIAP"
//                 },
//                 {
//                     "date": "2024-09-09",
//                     "value": "HFIP"
//                 },
//                 {
//                     "date": "2024-09-10",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-09-11",
//                     "value": "HFKP"
//                 },
//                 {
//                     "date": "2024-09-12",
//                     "value": "HHPP"
//                 },
//                 {
//                     "date": "2024-09-13",
//                     "value": "HHFP"
//                 },
//                 {
//                     "date": "2024-09-14",
//                     "value": "HHHP"
//                 },
//                 {
//                     "date": "2024-09-18",
//                     "value": "HHPP"
//                 },
//                 {
//                     "date": "2024-09-19",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2024-09-20",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2024-09-23",
//                     "value": "HFKP"
//                 },
//                 {
//                     "date": "2024-09-24",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2024-09-25",
//                     "value": "HHSP"
//                 },
//                 {
//                     "date": "2024-09-26",
//                     "value": "HHWP"
//                 },
//                 {
//                     "date": "2024-09-27",
//                     "value": "HWIP"
//                 },
//                 {
//                     "date": "2024-09-29",
//                     "value": "HKPP"
//                 },
//                 {
//                     "date": "2024-09-30",
//                     "value": "HKZP"
//                 },
//                 {
//                     "date": "2024-10-08",
//                     "value": "HYHP"
//                 },
//                 {
//                     "date": "2024-10-09",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-10-10",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-10-11",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-10-12",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-10-14",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-10-15",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-10-16",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-10-17",
//                     "value": "HSWP"
//                 },
//                 {
//                     "date": "2024-10-18",
//                     "value": "HSIP"
//                 },
//                 {
//                     "date": "2024-10-21",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-10-22",
//                     "value": "HWAP"
//                 },
//                 {
//                     "date": "2024-10-23",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-10-24",
//                     "value": "HWSP"
//                 },
//                 {
//                     "date": "2024-10-25",
//                     "value": "HWZP"
//                 },
//                 {
//                     "date": "2024-10-28",
//                     "value": "HSYP"
//                 },
//                 {
//                     "date": "2024-10-29",
//                     "value": "HSWP"
//                 },
//                 {
//                     "date": "2024-10-30",
//                     "value": "HSSP"
//                 },
//                 {
//                     "date": "2024-10-31",
//                     "value": "HSWP"
//                 },
//                 {
//                     "date": "2024-11-01",
//                     "value": "HSFP"
//                 },
//                 {
//                     "date": "2024-11-04",
//                     "value": "HSFP"
//                 },
//                 {
//                     "date": "2024-11-05",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2024-11-06",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-11-07",
//                     "value": "HSSP"
//                 },
//                 {
//                     "date": "2024-11-08",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-11-11",
//                     "value": "HWZP"
//                 },
//                 {
//                     "date": "2024-11-12",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-11-13",
//                     "value": "HSIP"
//                 },
//                 {
//                     "date": "2024-11-14",
//                     "value": "HWZP"
//                 },
//                 {
//                     "date": "2024-11-15",
//                     "value": "HWFP"
//                 },
//                 {
//                     "date": "2024-11-18",
//                     "value": "HWSP"
//                 },
//                 {
//                     "date": "2024-11-19",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-11-20",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-11-21",
//                     "value": "HWKP"
//                 },
//                 {
//                     "date": "2024-11-22",
//                     "value": "HWHP"
//                 },
//                 {
//                     "date": "2024-11-25",
//                     "value": "HWHP"
//                 },
//                 {
//                     "date": "2024-11-26",
//                     "value": "HWWP"
//                 },
//                 {
//                     "date": "2024-11-27",
//                     "value": "HWWP"
//                 },
//                 {
//                     "date": "2024-11-28",
//                     "value": "HWHP"
//                 },
//                 {
//                     "date": "2024-11-29",
//                     "value": "HWSP"
//                 },
//                 {
//                     "date": "2024-12-02",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-12-03",
//                     "value": "HWZP"
//                 },
//                 {
//                     "date": "2024-12-04",
//                     "value": "HWKP"
//                 },
//                 {
//                     "date": "2024-12-05",
//                     "value": "HWHP"
//                 },
//                 {
//                     "date": "2024-12-06",
//                     "value": "HWHP"
//                 },
//                 {
//                     "date": "2024-12-09",
//                     "value": "HWHP"
//                 },
//                 {
//                     "date": "2024-12-10",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-12-11",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-12-12",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-12-13",
//                     "value": "HWHP"
//                 },
//                 {
//                     "date": "2024-12-16",
//                     "value": "HWFP"
//                 },
//                 {
//                     "date": "2024-12-17",
//                     "value": "HWHP"
//                 },
//                 {
//                     "date": "2024-12-18",
//                     "value": "HWPP"
//                 },
//                 {
//                     "date": "2024-12-19",
//                     "value": "HHYP"
//                 },
//                 {
//                     "date": "2024-12-20",
//                     "value": "HHYP"
//                 },
//                 {
//                     "date": "2024-12-23",
//                     "value": "HHAP"
//                 },
//                 {
//                     "date": "2024-12-24",
//                     "value": "HHAP"
//                 },
//                 {
//                     "date": "2024-12-25",
//                     "value": "HHAP"
//                 },
//                 {
//                     "date": "2024-12-26",
//                     "value": "HWPP"
//                 },
//                 {
//                     "date": "2024-12-27",
//                     "value": "HHYP"
//                 },
//                 {
//                     "date": "2024-12-30",
//                     "value": "HHAP"
//                 },
//                 {
//                     "date": "2024-12-31",
//                     "value": "HWPP"
//                 },
//                 {
//                     "date": "2025-01-02",
//                     "value": "HWPP"
//                 },
//                 {
//                     "date": "2025-01-03",
//                     "value": "HHKP"
//                 },
//                 {
//                     "date": "2025-01-06",
//                     "value": "HHKP"
//                 },
//                 {
//                     "date": "2025-01-07",
//                     "value": "HHWP"
//                 },
//                 {
//                     "date": "2025-01-08",
//                     "value": "HHHP"
//                 },
//                 {
//                     "date": "2025-01-09",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2025-01-10",
//                     "value": "HHIP"
//                 }
//             ],
//             "lineName": "上海"
//         },
//         {
//             "dateValueMap": [
//                 {
//                     "date": "2024-01-11",
//                     "value": "HZKP"
//                 },
//                 {
//                     "date": "2024-01-12",
//                     "value": "HZKP"
//                 },
//                 {
//                     "date": "2024-01-15",
//                     "value": "HZWP"
//                 },
//                 {
//                     "date": "2024-01-16",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-01-17",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-01-18",
//                     "value": "HZFP"
//                 },
//                 {
//                     "date": "2024-01-19",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-01-22",
//                     "value": "HZWP"
//                 },
//                 {
//                     "date": "2024-01-23",
//                     "value": "HZSP"
//                 },
//                 {
//                     "date": "2024-01-24",
//                     "value": "HZKP"
//                 },
//                 {
//                     "date": "2024-01-25",
//                     "value": "HZZP"
//                 },
//                 {
//                     "date": "2024-01-26",
//                     "value": "HZZP"
//                 },
//                 {
//                     "date": "2024-01-29",
//                     "value": "HZZP"
//                 },
//                 {
//                     "date": "2024-01-30",
//                     "value": "HZZP"
//                 },
//                 {
//                     "date": "2024-01-31",
//                     "value": "HZKP"
//                 },
//                 {
//                     "date": "2024-02-01",
//                     "value": "HZKP"
//                 },
//                 {
//                     "date": "2024-02-02",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-02-04",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-02-05",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-02-06",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-02-07",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-02-08",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-02-09",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-02-18",
//                     "value": "HZSP"
//                 },
//                 {
//                     "date": "2024-02-19",
//                     "value": "HZWP"
//                 },
//                 {
//                     "date": "2024-02-20",
//                     "value": "HZFP"
//                 },
//                 {
//                     "date": "2024-02-21",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-02-22",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-02-23",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-02-26",
//                     "value": "HYAP"
//                 },
//                 {
//                     "date": "2024-02-27",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-02-28",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-02-29",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-03-01",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-03-04",
//                     "value": "HYZP"
//                 },
//                 {
//                     "date": "2024-03-05",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-03-06",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-03-07",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-03-08",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-03-11",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-03-12",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-03-13",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-03-14",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2024-03-15",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-03-18",
//                     "value": "HSFP"
//                 },
//                 {
//                     "date": "2024-03-19",
//                     "value": "HSSP"
//                 },
//                 {
//                     "date": "2024-03-20",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-03-21",
//                     "value": "HSAP"
//                 },
//                 {
//                     "date": "2024-03-22",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-03-25",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-03-26",
//                     "value": "HSSP"
//                 },
//                 {
//                     "date": "2024-03-27",
//                     "value": "HSFP"
//                 },
//                 {
//                     "date": "2024-03-28",
//                     "value": "HSIP"
//                 },
//                 {
//                     "date": "2024-03-29",
//                     "value": "HWAP"
//                 },
//                 {
//                     "date": "2024-04-01",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-04-02",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-04-03",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-04-07",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-04-08",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-04-09",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2024-04-10",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2024-04-11",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-04-12",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-04-15",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-04-16",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-04-17",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-04-18",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-04-19",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-04-22",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-04-23",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-04-24",
//                     "value": "HYKP"
//                 },
//                 {
//                     "date": "2024-04-25",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-04-26",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-04-28",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-04-29",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-04-30",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-05-06",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-05-07",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-05-08",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-05-09",
//                     "value": "HYAP"
//                 },
//                 {
//                     "date": "2024-05-10",
//                     "value": "HYZP"
//                 },
//                 {
//                     "date": "2024-05-11",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-05-13",
//                     "value": "HYKP"
//                 },
//                 {
//                     "date": "2024-05-14",
//                     "value": "HYKP"
//                 },
//                 {
//                     "date": "2024-05-15",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-05-16",
//                     "value": "HYKP"
//                 },
//                 {
//                     "date": "2024-05-17",
//                     "value": "HYAP"
//                 },
//                 {
//                     "date": "2024-05-20",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-05-21",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-05-22",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-05-23",
//                     "value": "HZWP"
//                 },
//                 {
//                     "date": "2024-05-24",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-05-27",
//                     "value": "HZFP"
//                 },
//                 {
//                     "date": "2024-05-28",
//                     "value": "HZFP"
//                 },
//                 {
//                     "date": "2024-05-29",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-05-30",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-05-31",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-06-03",
//                     "value": "HYAP"
//                 },
//                 {
//                     "date": "2024-06-04",
//                     "value": "HYAP"
//                 },
//                 {
//                     "date": "2024-06-05",
//                     "value": "HYZP"
//                 },
//                 {
//                     "date": "2024-06-06",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-06-07",
//                     "value": "HYZP"
//                 },
//                 {
//                     "date": "2024-06-11",
//                     "value": "HYKP"
//                 },
//                 {
//                     "date": "2024-06-12",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-06-13",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-06-14",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-06-17",
//                     "value": "HYWP"
//                 },
//                 {
//                     "date": "2024-06-18",
//                     "value": "HYWP"
//                 },
//                 {
//                     "date": "2024-06-19",
//                     "value": "HYHP"
//                 },
//                 {
//                     "date": "2024-06-20",
//                     "value": "HYHP"
//                 },
//                 {
//                     "date": "2024-06-21",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-06-24",
//                     "value": "HKSP"
//                 },
//                 {
//                     "date": "2024-06-25",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-06-26",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-06-27",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-06-28",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-07-01",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-07-02",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-07-03",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-07-04",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-07-05",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-07-08",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-07-09",
//                     "value": "HKPP"
//                 },
//                 {
//                     "date": "2024-07-10",
//                     "value": "HSYP"
//                 },
//                 {
//                     "date": "2024-07-11",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-07-12",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-07-15",
//                     "value": "HSAP"
//                 },
//                 {
//                     "date": "2024-07-16",
//                     "value": "HSAP"
//                 },
//                 {
//                     "date": "2024-07-17",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2024-07-18",
//                     "value": "HSSP"
//                 },
//                 {
//                     "date": "2024-07-19",
//                     "value": "HSWP"
//                 },
//                 {
//                     "date": "2024-07-22",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-07-23",
//                     "value": "HWSP"
//                 },
//                 {
//                     "date": "2024-07-24",
//                     "value": "HWIP"
//                 },
//                 {
//                     "date": "2024-07-25",
//                     "value": "HHSP"
//                 },
//                 {
//                     "date": "2024-07-26",
//                     "value": "HHKP"
//                 },
//                 {
//                     "date": "2024-07-29",
//                     "value": "HHHP"
//                 },
//                 {
//                     "date": "2024-07-30",
//                     "value": "HHPP"
//                 },
//                 {
//                     "date": "2024-07-31",
//                     "value": "HHPP"
//                 },
//                 {
//                     "date": "2024-08-01",
//                     "value": "HHPP"
//                 },
//                 {
//                     "date": "2024-08-02",
//                     "value": "HHPP"
//                 },
//                 {
//                     "date": "2024-08-05",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2024-08-06",
//                     "value": "HFAP"
//                 },
//                 {
//                     "date": "2024-08-07",
//                     "value": "HFZP"
//                 },
//                 {
//                     "date": "2024-08-08",
//                     "value": "HFYP"
//                 },
//                 {
//                     "date": "2024-08-09",
//                     "value": "HFSP"
//                 },
//                 {
//                     "date": "2024-08-12",
//                     "value": "HFPP"
//                 },
//                 {
//                     "date": "2024-08-13",
//                     "value": "HIYP"
//                 },
//                 {
//                     "date": "2024-08-14",
//                     "value": "HIFP"
//                 },
//                 {
//                     "date": "2024-08-15",
//                     "value": "HIFP"
//                 },
//                 {
//                     "date": "2024-08-16",
//                     "value": "HIIP"
//                 },
//                 {
//                     "date": "2024-08-19",
//                     "value": "HIFP"
//                 },
//                 {
//                     "date": "2024-08-20",
//                     "value": "HIHP"
//                 },
//                 {
//                     "date": "2024-08-21",
//                     "value": "HIWP"
//                 },
//                 {
//                     "date": "2024-08-22",
//                     "value": "HISP"
//                 },
//                 {
//                     "date": "2024-08-23",
//                     "value": "HIWP"
//                 },
//                 {
//                     "date": "2024-08-26",
//                     "value": "HIYP"
//                 },
//                 {
//                     "date": "2024-08-27",
//                     "value": "HFPP"
//                 },
//                 {
//                     "date": "2024-08-28",
//                     "value": "HFIP"
//                 },
//                 {
//                     "date": "2024-08-29",
//                     "value": "HFFP"
//                 },
//                 {
//                     "date": "2024-08-30",
//                     "value": "HFFP"
//                 },
//                 {
//                     "date": "2024-09-02",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-09-03",
//                     "value": "HIAP"
//                 },
//                 {
//                     "date": "2024-09-04",
//                     "value": "HIYP"
//                 },
//                 {
//                     "date": "2024-09-05",
//                     "value": "HIWP"
//                 },
//                 {
//                     "date": "2024-09-06",
//                     "value": "HIFP"
//                 },
//                 {
//                     "date": "2024-09-09",
//                     "value": "HIFP"
//                 },
//                 {
//                     "date": "2024-09-10",
//                     "value": "HIWP"
//                 },
//                 {
//                     "date": "2024-09-11",
//                     "value": "HFPP"
//                 },
//                 {
//                     "date": "2024-09-12",
//                     "value": "HFWP"
//                 },
//                 {
//                     "date": "2024-09-13",
//                     "value": "HFZP"
//                 },
//                 {
//                     "date": "2024-09-14",
//                     "value": "HFZP"
//                 },
//                 {
//                     "date": "2024-09-18",
//                     "value": "HFYP"
//                 },
//                 {
//                     "date": "2024-09-19",
//                     "value": "HHFP"
//                 },
//                 {
//                     "date": "2024-09-20",
//                     "value": "HHFP"
//                 },
//                 {
//                     "date": "2024-09-23",
//                     "value": "HHPP"
//                 },
//                 {
//                     "date": "2024-09-24",
//                     "value": "HHYP"
//                 },
//                 {
//                     "date": "2024-09-25",
//                     "value": "HWWP"
//                 },
//                 {
//                     "date": "2024-09-26",
//                     "value": "HWAP"
//                 },
//                 {
//                     "date": "2024-09-27",
//                     "value": "HSYP"
//                 },
//                 {
//                     "date": "2024-09-29",
//                     "value": "HZSP"
//                 },
//                 {
//                     "date": "2024-09-30",
//                     "value": "HAHP"
//                 },
//                 {
//                     "date": "2024-10-08",
//                     "value": "HAPP"
//                 },
//                 {
//                     "date": "2024-10-09",
//                     "value": "HZSP"
//                 },
//                 {
//                     "date": "2024-10-10",
//                     "value": "HZFP"
//                 },
//                 {
//                     "date": "2024-10-11",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-10-12",
//                     "value": "HZWP"
//                 },
//                 {
//                     "date": "2024-10-14",
//                     "value": "HZWP"
//                 },
//                 {
//                     "date": "2024-10-15",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-10-16",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-10-17",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-10-18",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-10-21",
//                     "value": "HKZP"
//                 },
//                 {
//                     "date": "2024-10-22",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-10-23",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-10-24",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2024-10-25",
//                     "value": "HSYP"
//                 },
//                 {
//                     "date": "2024-10-28",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-10-29",
//                     "value": "HSAP"
//                 },
//                 {
//                     "date": "2024-10-30",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-10-31",
//                     "value": "HSYP"
//                 },
//                 {
//                     "date": "2024-11-01",
//                     "value": "HSSP"
//                 },
//                 {
//                     "date": "2024-11-04",
//                     "value": "HSFP"
//                 },
//                 {
//                     "date": "2024-11-05",
//                     "value": "HSHP"
//                 },
//                 {
//                     "date": "2024-11-06",
//                     "value": "HSIP"
//                 },
//                 {
//                     "date": "2024-11-07",
//                     "value": "HSIP"
//                 },
//                 {
//                     "date": "2024-11-08",
//                     "value": "HWZP"
//                 },
//                 {
//                     "date": "2024-11-11",
//                     "value": "HHSP"
//                 },
//                 {
//                     "date": "2024-11-12",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2024-11-13",
//                     "value": "HHFP"
//                 },
//                 {
//                     "date": "2024-11-14",
//                     "value": "HFYP"
//                 },
//                 {
//                     "date": "2024-11-15",
//                     "value": "HFFP"
//                 },
//                 {
//                     "date": "2024-11-18",
//                     "value": "HFFP"
//                 },
//                 {
//                     "date": "2024-11-19",
//                     "value": "HFKP"
//                 },
//                 {
//                     "date": "2024-11-20",
//                     "value": "HFKP"
//                 },
//                 {
//                     "date": "2024-11-21",
//                     "value": "HFKP"
//                 },
//                 {
//                     "date": "2024-11-22",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-11-25",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-11-26",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-11-27",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-11-28",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-11-29",
//                     "value": "HFSP"
//                 },
//                 {
//                     "date": "2024-12-02",
//                     "value": "HFYP"
//                 },
//                 {
//                     "date": "2024-12-03",
//                     "value": "HFAP"
//                 },
//                 {
//                     "date": "2024-12-04",
//                     "value": "HFAP"
//                 },
//                 {
//                     "date": "2024-12-05",
//                     "value": "HFZP"
//                 },
//                 {
//                     "date": "2024-12-06",
//                     "value": "HFYP"
//                 },
//                 {
//                     "date": "2024-12-09",
//                     "value": "HFYP"
//                 },
//                 {
//                     "date": "2024-12-10",
//                     "value": "HHWP"
//                 },
//                 {
//                     "date": "2024-12-11",
//                     "value": "HHYP"
//                 },
//                 {
//                     "date": "2024-12-12",
//                     "value": "HWPP"
//                 },
//                 {
//                     "date": "2024-12-13",
//                     "value": "HHYP"
//                 },
//                 {
//                     "date": "2024-12-16",
//                     "value": "HHKP"
//                 },
//                 {
//                     "date": "2024-12-17",
//                     "value": "HHYP"
//                 },
//                 {
//                     "date": "2024-12-18",
//                     "value": "HHSP"
//                 },
//                 {
//                     "date": "2024-12-19",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2024-12-20",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2024-12-23",
//                     "value": "HHHP"
//                 },
//                 {
//                     "date": "2024-12-24",
//                     "value": "HHFP"
//                 },
//                 {
//                     "date": "2024-12-25",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2024-12-26",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2024-12-27",
//                     "value": "HFAP"
//                 },
//                 {
//                     "date": "2024-12-30",
//                     "value": "HFAP"
//                 },
//                 {
//                     "date": "2024-12-31",
//                     "value": "HFAP"
//                 },
//                 {
//                     "date": "2025-01-02",
//                     "value": "HHPP"
//                 },
//                 {
//                     "date": "2025-01-03",
//                     "value": "HFZP"
//                 },
//                 {
//                     "date": "2025-01-06",
//                     "value": "HFKP"
//                 },
//                 {
//                     "date": "2025-01-07",
//                     "value": "HFWP"
//                 },
//                 {
//                     "date": "2025-01-08",
//                     "value": "HFIP"
//                 },
//                 {
//                     "date": "2025-01-09",
//                     "value": "HFPP"
//                 },
//                 {
//                     "date": "2025-01-10",
//                     "value": "HFPP"
//                 }
//             ],
//             "lineName": "北京"
//         },
//         {
//             "dateValueMap": [
//                 {
//                     "date": "2024-01-11",
//                     "value": "WFFP"
//                 },
//                 {
//                     "date": "2024-01-12",
//                     "value": "WFHP"
//                 },
//                 {
//                     "date": "2024-01-15",
//                     "value": "WFFP"
//                 },
//                 {
//                     "date": "2024-01-16",
//                     "value": "WFFP"
//                 },
//                 {
//                     "date": "2024-01-17",
//                     "value": "WFIP"
//                 },
//                 {
//                     "date": "2024-01-18",
//                     "value": "WFIP"
//                 },
//                 {
//                     "date": "2024-01-19",
//                     "value": "WFHP"
//                 },
//                 {
//                     "date": "2024-01-22",
//                     "value": "WFHP"
//                 },
//                 {
//                     "date": "2024-01-23",
//                     "value": "WFHP"
//                 },
//                 {
//                     "date": "2024-01-24",
//                     "value": "WFHP"
//                 },
//                 {
//                     "date": "2024-01-25",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-01-26",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-01-29",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-01-30",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-01-31",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-02-01",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-02-02",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-02-04",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-02-05",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-02-06",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-02-07",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-02-08",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-02-09",
//                     "value": "WFSP"
//                 },
//                 {
//                     "date": "2024-02-18",
//                     "value": "WFYP"
//                 },
//                 {
//                     "date": "2024-02-19",
//                     "value": "WFYP"
//                 },
//                 {
//                     "date": "2024-02-20",
//                     "value": "WFKP"
//                 },
//                 {
//                     "date": "2024-02-21",
//                     "value": "WFKP"
//                 },
//                 {
//                     "date": "2024-02-22",
//                     "value": "WFKP"
//                 },
//                 {
//                     "date": "2024-02-23",
//                     "value": "WFKP"
//                 },
//                 {
//                     "date": "2024-02-26",
//                     "value": "WFFP"
//                 },
//                 {
//                     "date": "2024-02-27",
//                     "value": "WFFP"
//                 },
//                 {
//                     "date": "2024-02-28",
//                     "value": "WFFP"
//                 },
//                 {
//                     "date": "2024-02-29",
//                     "value": "WIAP"
//                 },
//                 {
//                     "date": "2024-03-01",
//                     "value": "WIKP"
//                 },
//                 {
//                     "date": "2024-03-04",
//                     "value": "WIIP"
//                 },
//                 {
//                     "date": "2024-03-05",
//                     "value": "WPYP"
//                 },
//                 {
//                     "date": "2024-03-06",
//                     "value": "WPHP"
//                 },
//                 {
//                     "date": "2024-03-07",
//                     "value": "WPIP"
//                 },
//                 {
//                     "date": "2024-03-08",
//                     "value": "HAZP"
//                 },
//                 {
//                     "date": "2024-03-11",
//                     "value": "HAHP"
//                 },
//                 {
//                     "date": "2024-03-12",
//                     "value": "HAIP"
//                 },
//                 {
//                     "date": "2024-03-13",
//                     "value": "HZZP"
//                 },
//                 {
//                     "date": "2024-03-14",
//                     "value": "HZWP"
//                 },
//                 {
//                     "date": "2024-03-15",
//                     "value": "HYAP"
//                 },
//                 {
//                     "date": "2024-03-18",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-03-19",
//                     "value": "HYAP"
//                 },
//                 {
//                     "date": "2024-03-20",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-03-21",
//                     "value": "HZFP"
//                 },
//                 {
//                     "date": "2024-03-22",
//                     "value": "HZWP"
//                 },
//                 {
//                     "date": "2024-03-25",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-03-26",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-03-27",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-03-28",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-03-29",
//                     "value": "HYHP"
//                 },
//                 {
//                     "date": "2024-04-01",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-04-02",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-04-03",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-04-07",
//                     "value": "HYHP"
//                 },
//                 {
//                     "date": "2024-04-08",
//                     "value": "HYWP"
//                 },
//                 {
//                     "date": "2024-04-09",
//                     "value": "HYZP"
//                 },
//                 {
//                     "date": "2024-04-10",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-04-11",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-04-12",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-04-15",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-04-16",
//                     "value": "HZSP"
//                 },
//                 {
//                     "date": "2024-04-17",
//                     "value": "HZZP"
//                 },
//                 {
//                     "date": "2024-04-18",
//                     "value": "HAFP"
//                 },
//                 {
//                     "date": "2024-04-19",
//                     "value": "HAHP"
//                 },
//                 {
//                     "date": "2024-04-22",
//                     "value": "HAIP"
//                 },
//                 {
//                     "date": "2024-04-23",
//                     "value": "HAPP"
//                 },
//                 {
//                     "date": "2024-04-24",
//                     "value": "HAPP"
//                 },
//                 {
//                     "date": "2024-04-25",
//                     "value": "HAIP"
//                 },
//                 {
//                     "date": "2024-04-26",
//                     "value": "HZAP"
//                 },
//                 {
//                     "date": "2024-04-28",
//                     "value": "HZZP"
//                 },
//                 {
//                     "date": "2024-04-29",
//                     "value": "HZYP"
//                 },
//                 {
//                     "date": "2024-04-30",
//                     "value": "HZYP"
//                 },
//                 {
//                     "date": "2024-05-06",
//                     "value": "HZAP"
//                 },
//                 {
//                     "date": "2024-05-07",
//                     "value": "HAPP"
//                 },
//                 {
//                     "date": "2024-05-08",
//                     "value": "HZKP"
//                 },
//                 {
//                     "date": "2024-05-09",
//                     "value": "HZSP"
//                 },
//                 {
//                     "date": "2024-05-10",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-05-11",
//                     "value": "HZSP"
//                 },
//                 {
//                     "date": "2024-05-13",
//                     "value": "HZSP"
//                 },
//                 {
//                     "date": "2024-05-14",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-05-15",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-05-16",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-05-17",
//                     "value": "HZYP"
//                 },
//                 {
//                     "date": "2024-05-20",
//                     "value": "HZYP"
//                 },
//                 {
//                     "date": "2024-05-21",
//                     "value": "HZKP"
//                 },
//                 {
//                     "date": "2024-05-22",
//                     "value": "HAPP"
//                 },
//                 {
//                     "date": "2024-05-23",
//                     "value": "HZYP"
//                 },
//                 {
//                     "date": "2024-05-24",
//                     "value": "HZSP"
//                 },
//                 {
//                     "date": "2024-05-27",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-05-28",
//                     "value": "HZHP"
//                 },
//                 {
//                     "date": "2024-05-29",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-05-30",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-05-31",
//                     "value": "HYZP"
//                 },
//                 {
//                     "date": "2024-06-03",
//                     "value": "HYWP"
//                 },
//                 {
//                     "date": "2024-06-04",
//                     "value": "HYHP"
//                 },
//                 {
//                     "date": "2024-06-05",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-06-06",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-06-07",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-06-11",
//                     "value": "HKZP"
//                 },
//                 {
//                     "date": "2024-06-12",
//                     "value": "HKYP"
//                 },
//                 {
//                     "date": "2024-06-13",
//                     "value": "HKYP"
//                 },
//                 {
//                     "date": "2024-06-14",
//                     "value": "HKZP"
//                 },
//                 {
//                     "date": "2024-06-17",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-06-18",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-06-19",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-06-20",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-06-21",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-06-24",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-06-25",
//                     "value": "HKPP"
//                 },
//                 {
//                     "date": "2024-06-26",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-06-27",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-06-28",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-07-01",
//                     "value": "HKSP"
//                 },
//                 {
//                     "date": "2024-07-02",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-07-03",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-07-04",
//                     "value": "HYHP"
//                 },
//                 {
//                     "date": "2024-07-05",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-07-08",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-07-09",
//                     "value": "HKAP"
//                 },
//                 {
//                     "date": "2024-07-10",
//                     "value": "HKZP"
//                 },
//                 {
//                     "date": "2024-07-11",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-07-12",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-07-15",
//                     "value": "HYWP"
//                 },
//                 {
//                     "date": "2024-07-16",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-07-17",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-07-18",
//                     "value": "HKAP"
//                 },
//                 {
//                     "date": "2024-07-19",
//                     "value": "HKZP"
//                 },
//                 {
//                     "date": "2024-07-22",
//                     "value": "HKKP"
//                 },
//                 {
//                     "date": "2024-07-23",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-07-24",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-07-25",
//                     "value": "HSWP"
//                 },
//                 {
//                     "date": "2024-07-26",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2024-07-29",
//                     "value": "HSWP"
//                 },
//                 {
//                     "date": "2024-07-30",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-07-31",
//                     "value": "HWAP"
//                 },
//                 {
//                     "date": "2024-08-01",
//                     "value": "HWAP"
//                 },
//                 {
//                     "date": "2024-08-02",
//                     "value": "HWAP"
//                 },
//                 {
//                     "date": "2024-08-05",
//                     "value": "HSPP"
//                 },
//                 {
//                     "date": "2024-08-06",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-08-07",
//                     "value": "HWSP"
//                 },
//                 {
//                     "date": "2024-08-08",
//                     "value": "HWIP"
//                 },
//                 {
//                     "date": "2024-08-09",
//                     "value": "HWFP"
//                 },
//                 {
//                     "date": "2024-08-12",
//                     "value": "HHKP"
//                 },
//                 {
//                     "date": "2024-08-13",
//                     "value": "HHWP"
//                 },
//                 {
//                     "date": "2024-08-14",
//                     "value": "HFZP"
//                 },
//                 {
//                     "date": "2024-08-15",
//                     "value": "HFSP"
//                 },
//                 {
//                     "date": "2024-08-16",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-08-19",
//                     "value": "HFHP"
//                 },
//                 {
//                     "date": "2024-08-20",
//                     "value": "HFWP"
//                 },
//                 {
//                     "date": "2024-08-21",
//                     "value": "HFZP"
//                 },
//                 {
//                     "date": "2024-08-22",
//                     "value": "HFAP"
//                 },
//                 {
//                     "date": "2024-08-23",
//                     "value": "HFKP"
//                 },
//                 {
//                     "date": "2024-08-26",
//                     "value": "HHSP"
//                 },
//                 {
//                     "date": "2024-08-27",
//                     "value": "HHYP"
//                 },
//                 {
//                     "date": "2024-08-28",
//                     "value": "HHAP"
//                 },
//                 {
//                     "date": "2024-08-29",
//                     "value": "HHAP"
//                 },
//                 {
//                     "date": "2024-08-30",
//                     "value": "HHZP"
//                 },
//                 {
//                     "date": "2024-09-02",
//                     "value": "HHSP"
//                 },
//                 {
//                     "date": "2024-09-03",
//                     "value": "HHWP"
//                 },
//                 {
//                     "date": "2024-09-04",
//                     "value": "HHHP"
//                 },
//                 {
//                     "date": "2024-09-05",
//                     "value": "HHIP"
//                 },
//                 {
//                     "date": "2024-09-06",
//                     "value": "HFZP"
//                 },
//                 {
//                     "date": "2024-09-09",
//                     "value": "HFKP"
//                 },
//                 {
//                     "date": "2024-09-10",
//                     "value": "HFAP"
//                 },
//                 {
//                     "date": "2024-09-11",
//                     "value": "HHFP"
//                 },
//                 {
//                     "date": "2024-09-12",
//                     "value": "HHZP"
//                 },
//                 {
//                     "date": "2024-09-13",
//                     "value": "HWIP"
//                 },
//                 {
//                     "date": "2024-09-14",
//                     "value": "HWIP"
//                 },
//                 {
//                     "date": "2024-09-18",
//                     "value": "HHZP"
//                 },
//                 {
//                     "date": "2024-09-19",
//                     "value": "HWPP"
//                 },
//                 {
//                     "date": "2024-09-20",
//                     "value": "HWPP"
//                 },
//                 {
//                     "date": "2024-09-23",
//                     "value": "HHKP"
//                 },
//                 {
//                     "date": "2024-09-24",
//                     "value": "HWFP"
//                 },
//                 {
//                     "date": "2024-09-25",
//                     "value": "HWYP"
//                 },
//                 {
//                     "date": "2024-09-26",
//                     "value": "HWZP"
//                 },
//                 {
//                     "date": "2024-09-27",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2024-09-29",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-09-30",
//                     "value": "WPFP"
//                 },
//                 {
//                     "date": "2024-10-08",
//                     "value": "WPKP"
//                 },
//                 {
//                     "date": "2024-10-09",
//                     "value": "WPIP"
//                 },
//                 {
//                     "date": "2024-10-10",
//                     "value": "HAKP"
//                 },
//                 {
//                     "date": "2024-10-11",
//                     "value": "HAHP"
//                 },
//                 {
//                     "date": "2024-10-12",
//                     "value": "HASP"
//                 },
//                 {
//                     "date": "2024-10-14",
//                     "value": "HAKP"
//                 },
//                 {
//                     "date": "2024-10-15",
//                     "value": "HAWP"
//                 },
//                 {
//                     "date": "2024-10-16",
//                     "value": "HAIP"
//                 },
//                 {
//                     "date": "2024-10-17",
//                     "value": "HZIP"
//                 },
//                 {
//                     "date": "2024-10-18",
//                     "value": "HYAP"
//                 },
//                 {
//                     "date": "2024-10-21",
//                     "value": "HYAP"
//                 },
//                 {
//                     "date": "2024-10-22",
//                     "value": "HYKP"
//                 },
//                 {
//                     "date": "2024-10-23",
//                     "value": "HYHP"
//                 },
//                 {
//                     "date": "2024-10-24",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-10-25",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-10-28",
//                     "value": "HZPP"
//                 },
//                 {
//                     "date": "2024-10-29",
//                     "value": "HYYP"
//                 },
//                 {
//                     "date": "2024-10-30",
//                     "value": "HYSP"
//                 },
//                 {
//                     "date": "2024-10-31",
//                     "value": "HYWP"
//                 },
//                 {
//                     "date": "2024-11-01",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-11-04",
//                     "value": "HKZP"
//                 },
//                 {
//                     "date": "2024-11-05",
//                     "value": "HYFP"
//                 },
//                 {
//                     "date": "2024-11-06",
//                     "value": "HKAP"
//                 },
//                 {
//                     "date": "2024-11-07",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-11-08",
//                     "value": "HYIP"
//                 },
//                 {
//                     "date": "2024-11-11",
//                     "value": "HKSP"
//                 },
//                 {
//                     "date": "2024-11-12",
//                     "value": "HKSP"
//                 },
//                 {
//                     "date": "2024-11-13",
//                     "value": "HKSP"
//                 },
//                 {
//                     "date": "2024-11-14",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-11-15",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-11-18",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-11-19",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-11-20",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-11-21",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-11-22",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-11-25",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-11-26",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-11-27",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-11-28",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-11-29",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-12-02",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-12-03",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-12-04",
//                     "value": "HKHP"
//                 },
//                 {
//                     "date": "2024-12-05",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-12-06",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-12-09",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-12-10",
//                     "value": "HYPP"
//                 },
//                 {
//                     "date": "2024-12-11",
//                     "value": "HKYP"
//                 },
//                 {
//                     "date": "2024-12-12",
//                     "value": "HKYP"
//                 },
//                 {
//                     "date": "2024-12-13",
//                     "value": "HKYP"
//                 },
//                 {
//                     "date": "2024-12-16",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-12-17",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-12-18",
//                     "value": "HKWP"
//                 },
//                 {
//                     "date": "2024-12-19",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-12-20",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-12-23",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-12-24",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-12-25",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-12-26",
//                     "value": "HKFP"
//                 },
//                 {
//                     "date": "2024-12-27",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-12-30",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2024-12-31",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2025-01-02",
//                     "value": "HKIP"
//                 },
//                 {
//                     "date": "2025-01-03",
//                     "value": "HSZP"
//                 },
//                 {
//                     "date": "2025-01-06",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2025-01-07",
//                     "value": "HSKP"
//                 },
//                 {
//                     "date": "2025-01-08",
//                     "value": "HSSP"
//                 },
//                 {
//                     "date": "2025-01-09",
//                     "value": "HSWP"
//                 },
//                 {
//                     "date": "2025-01-10",
//                     "value": "HSWP"
//                 }
//             ],
//             "lineName": "广州"
//         }
//     ],
//     "responseKeyOffset": "NWEyOWJlNWZjMTcwNDk0YQ==",
//     "isEncrypted": true,
//     "appKey": "OTdlM2Q3NjVjODU3NGYzNQ==",
//     "encryptAll": false,
//     "encryptFields": [
//         "value"
//     ],
//     "title": "螺纹钢 HRB400E Φ20 走势图",
//     "responseSecretKey": "YTgzYjRhZTExNDNlNGY0Zg==",
//     "status": 200
// }

function getContent(res){
    let prop = 'data'
    let isJsonFormat = true

    // 默认得到的是 JSON 对象，对于Python 是个List
    return  decryptEncryptFields(res, prop, isJsonFormat)

    // 如果需要返回字典
    // return {
    //     data: decryptEncryptFields(res, prop, isJsonFormat)
    // }

    // 如果需要返回字符串
    // return JSON.stringify(decryptEncryptFields(res,prop,isJsonFormat))
}

// console.log(getContent(res))