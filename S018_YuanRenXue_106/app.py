# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : app.py
@Project            : S018_YuanRenXue_106
@CreateTime         : 2025/8/21 00:02
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/8/21 00:02 
@Version            : 1.0
@Description        : None
"""

import requests
from loguru import logger
import execjs

cookies = {
    'sessionid': 'pv7fbshzl3269rxw95sc9c13zq1pyy4p',
    'qpfccr': 'true',
    'no-alert3': 'true',
    'tk': '4965426488072243109',
}

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=0, i',
    'referer': 'https://match.yuanrenxue.cn/match/6',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    # 'cookie': 'sessionid=pv7fbshzl3269rxw95sc9c13zq1pyy4p; qpfccr=true; no-alert3=true; tk=4965426488072243109',
}

total = 0
for page in range(1, 6):
    jsParams = execjs.compile(open('delect.js', 'r', encoding='utf-8').read()).call('getParams', page)
    params = {
        'page': page,
        'm': jsParams['m'],
        'q': jsParams['q'],
    }
    # logger.debug(params)

    response = requests.get('https://match.yuanrenxue.cn/api/match/6', params=params, cookies=cookies, headers=headers)

    # 直接输出 response.text 的话，中文字符会被编码
    data = response.json()['data']
    numbers = [item[key] for item in data for key in item]
    logger.debug(numbers)
    for number in numbers:
        total = total + number

logger.info(total*24)
