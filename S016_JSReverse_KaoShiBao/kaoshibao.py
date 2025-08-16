# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : kaoshibao.py
@Project            : S016_JSReverse_KaoShiBao
@CreateTime         : 2025/8/16 17:14
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/8/16 17:14 
@Version            : 1.0
@Description        : None
"""

import requests

cookies = {
    'Hm_lvt_975400bd703f587eef8de1efe396089d': '1754840064',
    'HMACCOUNT': 'D83614B29E21DC52',
    'uu': 'e85b40fe-e18b-4787-8f8d-395a388a7cc5',
    'UM_distinctid': '198949e61f1a78-0705058a02991f8-17525636-113a00-198949e61f2e78',
    'CNZZDATA1278923901': '1901701287-1754840064-%7C1755330303',
    'Hm_lpvt_975400bd703f587eef8de1efe396089d': '1755330303',
}

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'client-identifier': 'e85b40fe-e18b-4787-8f8d-395a388a7cc5',
    'content-type': 'application/json;charset=UTF-8',
    'origin': 'https://www.kaoshibao.com',
    'platform': 'web',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.kaoshibao.com/online/paper/detail/?paperid=16882563',
    'request-id': '12f61ef5-c28e-4e2d-85e4-d67ffea08e3d',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sign': '43c8bcf105d40d1a5323df9a660111df',
    'timestamp': '1755334974804',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    # 'cookie': 'Hm_lvt_975400bd703f587eef8de1efe396089d=1754840064; HMACCOUNT=D83614B29E21DC52; uu=e85b40fe-e18b-4787-8f8d-395a388a7cc5; UM_distinctid=198949e61f1a78-0705058a02991f8-17525636-113a00-198949e61f2e78; CNZZDATA1278923901=1901701287-1754840064-%7C1755330303; Hm_lpvt_975400bd703f587eef8de1efe396089d=1755330303',
}

json_data = {
    'paperid': '16882563',
    'type': 'all',
    'size': 10,
    'page': 1,
}

response = requests.post('https://www.kaoshibao.com/api/questions/lists', cookies=cookies, headers=headers, json=json_data)

# 方法1
# print(response.json())

# 方法2
res_text = response.text
print(res_text.encode("utf-8").decode("unicode_escape"))


# Note: json_data will not be serialized by requests
# exactly as it was in the original request.
#data = '{"paperid":"16882563","type":"all","size":10,"page":1}'
#response = requests.post('https://www.kaoshibao.com/api/questions/lists', cookies=cookies, headers=headers, data=data)

