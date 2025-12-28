# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : main.py
@Project            : S029_MaShangPa_009
@CreateTime         : 2025/12/28 14:08
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/12/28 14:08 
@Version            : 1.0
@Description        : None
"""
import numpy as np
from loguru import logger
import execjs
import requests

data_array = []
for page in range(1, 21):
    params = execjs.compile(open('pagination9.js', encoding='utf-8').read()).call('get_sign')
    cookies = {
        'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0': '1766300402',
        'HMACCOUNT': '3B1EAE3980EA95FE',
        'sessionid': 'sjqdkix3ohnnztjohq4n01h1f6d82ukh',
        's': '51b351b351b351b370b090905171d030709051f071',
        'Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0': '1766899166',
    }

    headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'origin': 'https://www.mashangpa.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.mashangpa.com/problem-detail/9/',
        'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        # 'cookie': 'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0=1766300402; HMACCOUNT=3B1EAE3980EA95FE; sessionid=sjqdkix3ohnnztjohq4n01h1f6d82ukh; s=51b351b351b351b370b090905171d030709051f071; Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0=1766899166',
    }

    json_data = {
        'page': page,
        'm': params['m'],
        'tt': params['tt'],
    }

    response = requests.post('https://www.mashangpa.com/api/problem-detail/9/data/', cookies=cookies, headers=headers, json=json_data)
    current_array = response.json()['current_array']
    logger.info(f"page : {page} : {current_array}")
    data_array.extend(current_array)

logger.warning(data_array)
logger.warning(np.sum(data_array))
