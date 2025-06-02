# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : xiniu.py
@Project            : S006_Webpack_XiniuData
@CreateTime         : 2025/6/2 16:53
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/6/2 16:53 
@Version            : 1.0
@Description        : None
"""
import pprint

import requests
import execjs

cookies = {
    'Hm_lvt_42317524c1662a500d12d3784dbea0f8': '1748779880',
    'HMACCOUNT': '6146648EAF245B09',
    'btoken': 'FIC4AYCJEV61MVYYAN1K6XIX0A6OBBAE',
    'utoken': 'QKUWSFFK8P4MIFNW30PMRKDMZHBHF93B',
    'username': '%E9%AD%8F%E5%BD%AA',
    'Hm_lpvt_42317524c1662a500d12d3784dbea0f8': '1748841948',
}

headers = {
    'accept': 'application/json',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'origin': 'https://www.xiniudata.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.xiniudata.com/industry/newest?from=data',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    # 'cookie': 'Hm_lvt_42317524c1662a500d12d3784dbea0f8=1748779880; HMACCOUNT=6146648EAF245B09; btoken=FIC4AYCJEV61MVYYAN1K6XIX0A6OBBAE; utoken=QKUWSFFK8P4MIFNW30PMRKDMZHBHF93B; username=%E9%AD%8F%E5%BD%AA; Hm_lpvt_42317524c1662a500d12d3784dbea0f8=1748841948',
}

jscode = execjs.compile(open('list_industries_by_sort.js', 'r').read())

args = {
    "sort": 1,
    "start": 20,
    "limit": 20
}

payload, sig = jscode.call('genArgs', args)

json_data = {
    'payload': payload,
    'sig': sig,
    'v': 1,
}

response = requests.post(
    'https://www.xiniudata.com/api2/service/x_service/person_industry_list/list_industries_by_sort',
    cookies=cookies,
    headers=headers,
    json=json_data,
)

# print(response.json())

data_src = response.json()['d']
result = jscode.call('decrypt', data_src)
pprint.pprint(result)

# Note: json_data will not be serialized by requests
# exactly as it was in the original request.
#data = '{"payload":"LBc3V0I6ZGB5bXsxTCQnPRBuBAQVcDhbICcmb2x3AjI=","sig":"CE704F132C4E47B31E91773020275904","v":1}'
#response = requests.post(
#    'https://www.xiniudata.com/api2/service/x_service/person_industry_list/list_industries_by_sort',
#    cookies=cookies,
#    headers=headers,
#    data=data,
#)

