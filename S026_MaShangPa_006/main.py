# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : main.py
@Project            : S026_MaShangPa_006
@CreateTime         : 2025/10/18 12:49
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/10/18 12:49 
@Version            : 1.0
@Description        : None
"""


import requests
from loguru import logger
import numpy as np
import time
import execjs

cookies = {
    'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0': '1758466522,1760573355',
    'HMACCOUNT': 'D83614B29E21DC52',
    'sessionid': 'ngtooju9bghxim30dkfhceh3so0uh3ey',
    'Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0': '1760762359',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.mashangpa.com/problem-detail/6/',
    's': 'b8b3d6dc1eb29010ffb15fc0d15a531e',
    'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'tt': '1760762548091',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
    # 'cookie': 'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0=1758466522,1760573355; HMACCOUNT=D83614B29E21DC52; sessionid=ngtooju9bghxim30dkfhceh3so0uh3ey; Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0=1760762359',
}

data_array = []

for page in range(1, 21):
    params = {
        'page': page,
    }

    # js 中新增了2个 header 参数
    headersParams = execjs.compile(open('pagination.js', encoding='utf-8').read()).call('addHeaderParams')
    # logger.info(headersParams)
    headers['s'] = headersParams['s']
    headers['tt'] = str(headersParams['tt'])

    response = requests.get('https://www.mashangpa.com/api/problem-detail/6/data/', cookies=cookies, headers=headers,
                             params=params)

    data = response.json()['t']

    # 调用 js 解析返回的密文
    xl = execjs.compile(open('pagination.js', encoding='utf-8').read()).call('decrypt', data)
    # logger.info(xl)

    # Note: json_data will not be serialized by requests
    # exactly as it was in the original request.
    # data = '{"xl":"b2b5e02b7b8f057b6c56709d8402c21b7088ae5c147c358f70b052be85317879"}'
    # response = requests.post('https://www.mashangpa.com/api/problem-detail/5/data/', cookies=cookies, headers=headers, data=data)

    # logger.info(response.text)
    current_array = xl['current_array']
    # logger.info(current_array)

    # extend 是将新的和已有的 list进行组合， append 是拼接，得到嵌套列表
    data_array.extend(current_array)
    logger.info(response.url)
    time.sleep(1)

logger.info(data_array)
logger.info(np.sum(data_array))


