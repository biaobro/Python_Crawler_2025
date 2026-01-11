# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : main.py
@Project            : S030_MaShangPa_010
@CreateTime         : 2026/1/11 16:17
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2026/1/11 16:17 
@Version            : 1.0
@Description        : None
"""
from loguru import logger
import numpy as np
import execjs
import requests

cookies = {
    'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0': '1766300402',
    'HMACCOUNT': '3B1EAE3980EA95FE',
    's': '51b351b351b351b370b090905171d030709051f071',
    'sessionid': 'p32vcgnppl284peklm5oz2178h9liay2',
    'Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0': '1768119240',
}

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.mashangpa.com/problem-detail/10/',
    'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    # 'cookie': 'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0=1766300402; HMACCOUNT=3B1EAE3980EA95FE; s=51b351b351b351b370b090905171d030709051f071; sessionid=p32vcgnppl284peklm5oz2178h9liay2; Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0=1768119240',
}

data_array = []
for page in range(1, 21):
    arg_url = f'/api/problem-detail/10/data/?page={page}'
    t = execjs.compile(open('pagination10.js', encoding='utf-8').read()).call('OOOO', arg_url)
    params = {
        'page': page,
        't': t,
    }

    response = requests.get('https://www.mashangpa.com/api/problem-detail/10/data/', params=params, cookies=cookies, headers=headers)
    current_array = response.json()['current_array']
    logger.info(f"page : {page} : {current_array}")
    data_array.extend(current_array)

logger.warning(data_array)
logger.warning(np.sum(data_array))
