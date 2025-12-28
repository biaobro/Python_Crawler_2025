# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : main.py
@Project            : S027_MaShangPa_007
@CreateTime         : 2025/12/28 10:35
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/12/28 10:35 
@Version            : 1.0
@Description        : None
"""
import time

import execjs
from loguru import logger
import numpy as np
import requests

data_array = []

for page in range(1,21):
    logger.warning(f'page : {page}')
    cookies = {
        'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0': '1766300402',
        'HMACCOUNT': '3B1EAE3980EA95FE',
        'sessionid': 'sjqdkix3ohnnztjohq4n01h1f6d82ukh',
        'Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0': '1766888686',
    }

    params = execjs.compile(open('pagination7.js', encoding='utf-8').read()).call('get_sign')
    logger.info(params)

    headers = {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'm': params['O'],
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.mashangpa.com/problem-detail/7/',
        'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'ts': params['ts'],
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        # 'cookie': 'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0=1766300402; HMACCOUNT=3B1EAE3980EA95FE; sessionid=sjqdkix3ohnnztjohq4n01h1f6d82ukh; Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0=1766888686',
    }

    params = {
        'page': str(page),
        'x': params['x'],
    }

    response = requests.get('https://www.mashangpa.com/api/problem-detail/7/data/', params=params, cookies=cookies, headers=headers)
    # logger.info(response.text)

    dataEncrypt = response.json()['r']
    dataDecrypt = execjs.compile(open('pagination7.js', encoding='utf-8').read()).call('des_data',dataEncrypt)
    # logger.info(dataDecrypt)

    current_array = dataDecrypt['current_array']
    logger.info(current_array)

    data_array.extend(current_array)
    logger.info(response.url)
    time.sleep(1)

logger.info(data_array)
logger.info(np.sum(data_array))
