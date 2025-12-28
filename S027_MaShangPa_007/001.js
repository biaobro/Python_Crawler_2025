const CryptoJS = require('crypto-js');
window = global;
delete global;
// console_log = console.log;
window.jQuery = window.$ = function(){}

// 反混淆后的核心功能代码
const originalJSON = JSON;

// 创建JSON代理，用于拦截JSON.stringify和JSON.parse
const jsonProxy = new Proxy(originalJSON, {
    'get'(target, property) {
        if (property === 'stringify') {
            return function(...args) {
                return target.stringify(...args);
            };
        }
        if (property === 'parse') {
            return function(...args) {
                return target.parse(...args);
            };
        }
        return target[property];
    }
});

// 控制台日志
console.log("pagination loaded");
console.log("starting pagination system");

// 初始化CryptoJS相关的变量
const cryptoLib = {};
cryptoLib['a'] = CryptoJS;

// 初始化密钥和IV（保持与原始代码一致）
const encryptionKey = cryptoLib['a'].enc.Utf8.parse("defaultkey12345678".substring(0, 16)); // AES-128需要16字节
const initializationVector = cryptoLib['a'].enc.Utf8.parse("initvector123456".substring(0, 16)); // 需要16字节

// 加密函数 - 修复版
function encryptData(data) {
    try {
        // 直接将字符串转换为Utf8，而不是Hex
        const dataUtf8 = CryptoJS.enc.Utf8.parse(data);

        const config = {
            'mode': CryptoJS.mode.CBC,
            'padding': CryptoJS.pad.Pkcs7,
            'iv': initializationVector
        };

        const encrypted = CryptoJS.AES.encrypt(dataUtf8, encryptionKey, config);
        return encrypted.toString();
    } catch (error) {
        console.error("Encryption error:", error);
        return data; // 出错时返回原始数据
    }
}

// 解密函数
function decryptData(encryptedBase64) {
    try {
        const config = {
            'mode': CryptoJS.mode.CBC,
            'padding': CryptoJS.pad.Pkcs7,
            'iv': initializationVector
        };

        const decrypted = CryptoJS.AES.decrypt(encryptedBase64, encryptionKey, config);
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Decryption error:", error);
        return encryptedBase64; // 出错时返回原始数据
    }
}

// 页面加载函数
// function loadPage(page) {
//     const params = new URLSearchParams({page: page});
//
//     $.ajax({
//         'url': '/api/problem' + problemId + '/page?' + params,
//         'method': 'GET',
//         'dataType': 'json',
//         'success': function(response) {
//             updatePageContent(response);
//         },
//         'error': function(xhr, status, error) {
//             console.error('Fetching problem details:', status, error);
//         }
//     });
// }

// 请求拦截器
// (function($) {
//     const interceptors = [];
//     const responseInterceptors = [];
//
//     // 添加请求拦截器
//     $.addRequestInterceptor = function(interceptor) {
//         interceptors.push(interceptor);
//     };
//
//     // 添加响应拦截器
//     $.addResponseInterceptor = function(interceptor) {
//         responseInterceptors.push(interceptor);
//     };
//
//     // 重写ajax方法
//     const originalAjax = $.ajax;
//     $.ajax = function(config) {
//         // 应用请求拦截器
//         interceptors.forEach(interceptor => {
//             config = interceptor(config) || config;
//         });
//
//         // 保存原始success和error回调
//         const originalSuccess = config.success;
//         const originalError = config.error;
//
//         // 包装success回调以应用响应拦截器
//         if (originalSuccess) {
//             config.success = function(data, textStatus, jqXHR) {
//                 let processedData = data;
//                 // 应用响应拦截器
//                 responseInterceptors.forEach(interceptor => {
//                     processedData = interceptor(config, jqXHR, processedData) || processedData;
//                 });
//                 originalSuccess.call(this, processedData, textStatus, jqXHR);
//             };
//         }
//
//         // 包装error回调
//         if (originalError) {
//             config.error = function(jqXHR, textStatus, errorThrown) {
//                 originalError.call(this, jqXHR, textStatus, errorThrown);
//             };
//         }
//
//         return originalAjax.call($, config);
//     };
// }(jQuery));

// // 请求拦截器 - 添加时间戳和签名
// $.addRequestInterceptor(function(config) {
//     const timestamp = new Date().getTime();
//     const dataToEncrypt = "timestamp:" + timestamp;
//     const encrypted = encryptData(dataToEncrypt);
//
//     config.headers = config.headers || {};
//     config.headers['m'] = encrypted;
//     config.headers['ts'] = timestamp;
//
//     // 计算签名（使用MD5）
//     const signature = CryptoJS.MD5(encrypted + "secret").toString();
//     config.url += (config.url.indexOf('?') === -1 ? '?' : '&') + 'x=' + encodeURIComponent(signature);
//
//     return config;
// });
//
// // 响应拦截器 - 处理加密响应
// $.addResponseInterceptor(function(config, xhr, response) {
//     // 检查响应状态
//     if (xhr.status === 200) {
//         try {
//             // 如果响应数据是加密的，尝试解密
//             if (typeof response === 'string' && response.includes('U2FsdGVk')) {
//                 const decrypted = decryptData(response);
//                 // 尝试解析为JSON
//                 try {
//                     return JSON.parse(decrypted);
//                 } catch (e) {
//                     return decrypted;
//                 }
//             }
//             // 如果已经是JSON，直接返回
//             if (typeof response === 'object') {
//                 return response;
//             }
//             // 尝试解析JSON
//             try {
//                 return JSON.parse(response);
//             } catch (e) {
//                 return response;
//             }
//         } catch (error) {
//             console.error("Response processing error:", error);
//             return response;
//         }
//     }
//     return response;
// });
//
// // 简化的调试函数（如果需要）
// function safeDebug(message, data) {
//     if (typeof console !== 'undefined' && console.log) {
//         console.log(message, data);
//     }
// }

function get_sign() {
    let config = []
    const timestamp = new Date().getTime();
    const encrypted = encryptData("timestamp:" + timestamp);

    config['m'] = encrypted;
    config['ts'] = timestamp;
    config['x'] = encodeURIComponent(CryptoJS.MD5(encrypted + "secret").toString());

    return config;
};

console.log(get_sign())