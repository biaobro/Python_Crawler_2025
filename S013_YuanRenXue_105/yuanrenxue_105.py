# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : yuanrenxue_105.py
@Project            : S013_YuanRenXue_105
@CreateTime         : 2025/6/22 22:58
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/6/22 22:58 
@Version            : 1.0
@Description        : None
"""

import requests
import execjs
from loguru import logger

jsData = execjs.compile(open('app.js', mode='r', encoding='utf-8').read()).call('encrypt')

results = []
for page in range(1,6):
    # 如果有必要，可以在每次请求中都更新 m 和 RM4
    cookies = {
        # 'tk': '9107033490374454247',
        # 'no-alert3': 'true',
        # 'Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3': '1750606060',
        # 'HMACCOUNT': 'D83614B29E21DC52',
        # 'Hm_lpvt_434c501fe98c1a8ec74b813751d4e3e3': '1751026916',
        # 'sessionid': 'q4hndlzm0izklgy7ymttsev4fnas6d6k',
        'm': jsData['cookies_m'],
        'RM4hZBv0dDon443M': jsData['cookies_RM4'],
    }

    headers = {
        # 'accept': 'application/json, text/javascript, */*; q=0.01',
        # 'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        # 'cache-control': 'no-cache',
        # 'pragma': 'no-cache',
        # 'priority': 'u=0, i',
        # 'referer': 'https://match.yuanrenxue.cn/match/5',
        # 'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        # 'sec-ch-ua-mobile': '?0',
        # 'sec-ch-ua-platform': '"macOS"',
        # 'sec-fetch-dest': 'empty',
        # 'sec-fetch-mode': 'cors',
        # 'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        # 'x-requested-with': 'XMLHttpRequest',
        # 'cookie': 'tk=9107033490374454247; no-alert3=true; Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3=1750606060; HMACCOUNT=D83614B29E21DC52; Hm_lpvt_434c501fe98c1a8ec74b813751d4e3e3=1751026916; sessionid=q4hndlzm0izklgy7ymttsev4fnas6d6k; m=e4a71ac4bacb21657547ffddf56cc16c; RM4hZBv0dDon443M=om83hnoZqDSQofbfK4Wf56q8r6jXkP4hAId/wxShPwhSFLYyq5E4Rkm+sH/PFt2Grtztw+Znow5CznYe3j/+Tcyi/0jEqWJGw/nP9jiKtyBZj1ja4qYNum4UcfdSy+ygtp6YrSljNBmEvh4glES3oBtAoH1GrO/HOJDYoQFfleCcFFQYz4D46QlNAVMaNhANGzdvPrGfCLVRvWvKxFlwnEhV8/zwPcEq/VI/BuEScHI=',
    }

    params = {
        'm': jsData['params_m'],
        'f': jsData['params_f'],
        'page': page
    }

    response = requests.get('https://match.yuanrenxue.cn/api/match/5', params=params, cookies=cookies, headers=headers)
    logger.debug(response.url)
    if response.status_code == 200:
        logger.debug(f"第{page}页的请求结果：{response.json()['data']}")
        items = response.json()['data']
        results.extend(item['value'] for item in items)

logger.warning(f"最终统计的直播间热度: {results}")
results = sorted(results, reverse=True)
logger.debug(f"前5名直播间热度: {results[:5]}")
total = sum(results[:5])
logger.success('前5名直播间热度的加和: ' + str(total))
