# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : app.py
@Project            : S014_YuanRenXue_116
@CreateTime         : 2025/7/27 12:40
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/7/27 12:40 
@Version            : 1.0
@Description        : None
"""
import requests
import execjs
from loguru import logger

cookies = {
    'no-alert3': 'true',
    'Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3': '1750606060',
    'HMACCOUNT': 'D83614B29E21DC52',
    'Hm_lpvt_434c501fe98c1a8ec74b813751d4e3e3': '1751026916',
    'm': '4baee6ff4559acd573a01799f438fbe9',
    'RM4hZBv0dDon443M': 'szlz4ZrlOqacarV2fslbrFDzvBfsKJ8u/hR6Xhw/V387OUN0QhfzRtmZVmeEvmTGaQBHRHhB6rcE6Lfd/biXuk64vELqpn5N8BqeqRQqPZ0pYy/xZQR6WSnyTjqZbYGFrdLRDfDTT+82/XtM7RpeZrI/hbVXtvI94vtSzy1DXxOleDTZ6S13M7NuMltncB478PCVtp3c92n7DOByCs8hrVAodt/gMCk2nVU0ABr/1Vg=',
    'sessionid': 'u7yul55wzv3nf04w7mbi4f0szxb8b2fb',
    'tk': '5454580145530424375',
}

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=0, i',
    'referer': 'https://match.yuanrenxue.cn/match/16',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    # 'cookie': 'no-alert3=true; Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3=1750606060; HMACCOUNT=D83614B29E21DC52; Hm_lpvt_434c501fe98c1a8ec74b813751d4e3e3=1751026916; m=4baee6ff4559acd573a01799f438fbe9; RM4hZBv0dDon443M=szlz4ZrlOqacarV2fslbrFDzvBfsKJ8u/hR6Xhw/V387OUN0QhfzRtmZVmeEvmTGaQBHRHhB6rcE6Lfd/biXuk64vELqpn5N8BqeqRQqPZ0pYy/xZQR6WSnyTjqZbYGFrdLRDfDTT+82/XtM7RpeZrI/hbVXtvI94vtSzy1DXxOleDTZ6S13M7NuMltncB478PCVtp3c92n7DOByCs8hrVAodt/gMCk2nVU0ABr/1Vg=; sessionid=u7yul55wzv3nf04w7mbi4f0szxb8b2fb; tk=5454580145530424375',
}

total = 0
for page in range(1,6):
    jsParams = execjs.compile(open('webpack.js', mode='r', encoding='utf-8').read()).call('genParams')
    # print(jsParams)

    params = {
        'page': page,
        'm': jsParams['m'],
        't': jsParams['t'],
    }

    response = requests.get('https://match.yuanrenxue.cn/api/match/16', params=params, cookies=cookies, headers=headers)
    # logger.info(response.text)

    values = response.json()['data']
    # logger.info(values)

    for value in values:
        total = total + value['value']
logger.info(total)


