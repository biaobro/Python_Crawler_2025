# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : BirdReport.py
@Project            : S017_JSReverse_BirdReport
@CreateTime         : 2025/8/16 20:55
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/8/16 20:55 
@Version            : 1.0
@Description        : None
"""
import datetime
import json
import time

import requests
import execjs
from loguru import logger
import pandas as pd

headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://www.birdreport.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://www.birdreport.cn/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'requestId': 'requestId',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sign': 'sign',
    'timestamp': 'timestamp',
}

df = pd.DataFrame()
for page in range(1, 6):
    options = f'page={page}&limit=20'
    params = execjs.compile(open('app_whole.js', 'r', encoding='utf-8').read()).call('ajaxSetup', options)

    headers['requestId'] = params['requestId']
    headers['sign'] = params['sign']
    headers['timestamp'] = str(params['timestamp'])
    data = params['formdata']
    response = requests.post('https://api.birdreport.cn/front/activity/search', headers=headers, data=data)
    respDataEncrypt = response.json()['data']
    respDataDecrypt = execjs.compile(open('app_whole.js', 'r', encoding='utf-8').read()).call('decrypt',
                                                                                              respDataEncrypt)
    # logger.debug(respDataDecrypt)
    # logger.debug(type(respDataDecrypt))
    logger.debug(f'page {page} get {len(respDataDecrypt)} records successfully.')
    df = pd.concat([df, pd.DataFrame(respDataDecrypt)])
    time.sleep(10)
df.to_excel(f'BirdReport_{datetime.datetime.now().strftime("%Y%m%d%H%M%S")}.xlsx', index=False)
