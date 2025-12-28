# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : main.py
@Project            : S028_MaShangPa_008
@CreateTime         : 2025/12/28 11:11
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/12/28 11:11 
@Version            : 1.0
@Description        : None
"""
from loguru import logger
import execjs
import numpy as np
import requests

data_array = []

for page in range(1,21):
    params = execjs.compile(open('pagination8_target.js', encoding='utf-8').read()).call('getSign', page)
    cookies = {
        'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0': '1766300402',
        'HMACCOUNT': '3B1EAE3980EA95FE',
        'sessionid': 'sjqdkix3ohnnztjohq4n01h1f6d82ukh',
        'Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0': '1766891018',
        's': '51b351b351b351b370b0909051717030309010b090',
    }

    headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'm': params['m'],
        'origin': 'https://www.mashangpa.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.mashangpa.com/problem-detail/8/',
        'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        't': params['t'],
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        # 'cookie': 'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0=1766300402; HMACCOUNT=3B1EAE3980EA95FE; sessionid=sjqdkix3ohnnztjohq4n01h1f6d82ukh; Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0=1766891018; s=51b351b351b351b370b0909051717030309010b090',
    }

    json_data = {
        'page': page,
    }

    response = requests.post('https://www.mashangpa.com/api/problem-detail/8/data/', cookies=cookies, headers=headers, json=json_data)
    # logger.info(response.text)

    current_array = response.json()['current_array']
    logger.info(f'page : {page} : {current_array}')
    data_array.extend(current_array)

logger.info(data_array)
logger.info(np.sum(data_array))