# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : main.py
@Project            : S031_MaShangPa_011
@CreateTime         : 2026/1/11 23:32
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2026/1/11 23:32 
@Version            : 1.0
@Description        : None
"""
import json
import subprocess

from loguru import logger
import numpy as np
import execjs

import requests


def getheadersParams(page):
    """一行命令调用 JS"""
    js_code = f'''
    window=global;
    eval(require("fs").readFileSync("pagination11.js","utf8"));
    loadPage({page}).then(r=>console.log(JSON.stringify(r)));
    '''

    result = subprocess.run(
        ['node', '-e', js_code],
        capture_output=True,
        text=True,
        timeout=30
    )

    try:
        return json.loads(result.stdout.strip())
    except:
        return {'error': result.stderr}


cookies = {
    'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0': '1766300402',
    'HMACCOUNT': '3B1EAE3980EA95FE',
    's': '51b351b351b351b370b090905171d030709051f071',
    'sessionid': 'p32vcgnppl284peklm5oz2178h9liay2',
    'Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0': '1768145345',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.mashangpa.com/problem-detail/11/',
    'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
    # 'cookie': 'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0=1766300402; HMACCOUNT=3B1EAE3980EA95FE; s=51b351b351b351b370b090905171d030709051f071; sessionid=p32vcgnppl284peklm5oz2178h9liay2; Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0=1768145345',
}

data_array = []
for page in range(1, 21):
    headersParams = getheadersParams(page)
    params = {
        'page': page,
        'm': headersParams['m'],
        '_ts': headersParams['_ts'],
    }

    response = requests.get('https://mashangpa.com/api/problem-detail/11/data/', params=params, cookies=cookies,
                            headers=headers)
    current_array = response.json()['current_array']
    logger.info(f"page : {page} : {current_array}")
    data_array.extend(current_array)

logger.warning(data_array)
logger.warning(np.sum(data_array))


