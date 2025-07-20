
#!/usr/bin/env python

# -*- coding: UTF-8 -*-

'''

@Project ：pythonProject 

@File    ：demo.py

@IDE     ：PyCharm 

@Author  ：haozaispider

@Date    ：2025/6/5 下午2:41 

'''

# -*- coding: utf-8 -*-



import execjs
import requests
from loguru import logger

encrypt_all = execjs.compile(open('bilibili.js', 'r', encoding='utf-8').read()).call('encrypt')
logger.info('加密的结果：' + str(encrypt_all))
headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
}
total = 0
results = []
for page in range(1, 6):
    url = f"https://match.yuanrenxue.cn/api/match/5?page={page}"
    cookies = {
        "m": encrypt_all['cookies_m'],
        "RM4hZBv0dDon443M": encrypt_all['cookies_RM4']
    }
    params = {
        "m": encrypt_all['params_m'],
        "f": encrypt_all['params_f']
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    logger.debug(f"第{page}页的请求结果：{response.json()['data']}")
    if response.status_code == 200:
        items = response.json()['data']
        results.extend(item['value'] for item in items)
logger.warning(f"最终统计的直播间热度: {results}")
results = sorted(results, reverse=True)
logger.debug(f"前5名直播间热度: {results[:5]}")
total = sum(results[:5])
logger.success('前5名直播间热度的加和: ' + str(total))


