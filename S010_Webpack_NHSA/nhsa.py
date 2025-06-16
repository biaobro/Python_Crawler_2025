# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : nhsa.py
@Project            : S010_Webpack_NHSA
@CreateTime         : 2025/6/15 10:19
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/6/15 10:19 
@Version            : 1.0
@Description        : None
"""
import pprint

import requests
import execjs
import json

jscode = execjs.compile(open('app.js', 'r', encoding='utf-8').read())

cookies = {
    'amap_local': '110000',
}

# x-tif 的几个值实际有在js 中计算并生成
# 但是实际测试发现，用不变的值也能拿到数据
# 应该服务端没有校验这个
headers = {
    'Accept': 'application/json',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Origin': 'https://fuwu.nhsa.gov.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://fuwu.nhsa.gov.cn/nationalHallSt/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    'X-Tingyun': 'c=B|4Nl_NnGbjwY;x=17f235f2eb204ea5',
    'channel': 'web',
    'contentType': 'application/x-www-form-urlencoded',
    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'x-tif-nonce': 'n6ZHWcPG',
    'x-tif-paasid': 'undefined',
    'x-tif-signature': '1b75d404ce1b225d0fad25567d2bf0b513118b3e02fa67f9f9466ad81dee25c0',
    'x-tif-timestamp': '1749953819',
    # 'Cookie': 'amap_local=110000',
}

# 在e 参数里翻页，即可请求全部数据
e = {
    "transformRequest": {},
    "transformResponse": {},
    "timeout": 30000,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "headers": {
        "common": {
            "Accept": "application/json, text/plain, */*"
        },
        "delete": {},
        "get": {},
        "head": {},
        "post": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "put": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "patch": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "Accept": "application/json",
        "Content-Type": "application/json",
        "channel": "web"
    },
    # 这里在 Js 里实际应该是 false
    # 但在Python中是False
    "withCredentials": False,
    "baseURL": "/ebus/fuwu/api",
    "method": "post",
    "url": "/nthl/api/CommQuery/queryFixedHospital",
    "data": {
        "addr": "",
        "regnCode": "110000",
        "medinsName": "",
        "medinsLvCode": "",
        "medinsTypeCode": "",
        "outMedOpenFlag": "",
        "pageNum": 1,
        "pageSize": 10,
        "queryDataSource": "es"
    }
}

reqParam = jscode.call('encrypt', e)

# convert string to json
json_data = json.loads(reqParam['data'])


response = requests.post(
    'https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital',
    cookies=cookies,
    headers=headers,
    json=json_data,
)

# 将字符串转换为字典
# print(response.json())

hospitals = jscode.call('decrypt', response.json())['list']
for hospital in hospitals:
    pprint.pprint(hospital)

# Note: json_data will not be serialized by requests
# exactly as it was in the original request.
# data = '{"data":{"data":{"encData":"3DFBCA4667B978F639BB23B95DCE4CC74CE34C33DC32F1068E9E23CA546C9EA8CCD20943B4DAE96380B41164D761DE9742C84A985FE3BABC31CB352556BB87C9C1495DB24A29AB6BC3A85AB7FCA00F33C56677481A67C67F739EE2C7D589054DC373615B5DDB33C24C5B31E61CB7643E00DDA865C3B75C85735F0744B0227B5CD0B4E7BB97C60BF8E5275CAFCAFD1E13E384C10195003FD638576645B5EF45EA"},"appCode":"T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ","version":"1.0.0","encType":"SM4","signType":"SM2","timestamp":1749953819,"signData":"EduINIpphTlZMj9CfU7z5XAoXs1fkOL4ARaQuUGvpmy1V/DVUToa5rdUp6E76p5gFvA3U6hUSvXSMHp6OsORbw=="}}'
# response = requests.post(
#    'https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital',
#    cookies=cookies,
#    headers=headers,
#    data=data,
# )
