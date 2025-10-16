# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : main.py
@Project            : S022_MaShangPa_002
@CreateTime         : 2025/10/16 08:31
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/10/16 08:31 
@Version            : 1.0
@Description        : None
"""

# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : main.py
@Project            : S021_MaShangPa_001
@CreateTime         : 2025/10/16 08:13
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/10/16 08:13 
@Version            : 1.0
@Description        : None
"""

import requests
from loguru import logger
import numpy as np
import time

cookies = {
    'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0': '1758466522,1760573355',
    'HMACCOUNT': 'D83614B29E21DC52',
    'sessionid': 'ngtooju9bghxim30dkfhceh3so0uh3ey',
    'Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0': '1760573416',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.mashangpa.com/problem-detail/1/',
    'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
    # 'cookie': 'Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0=1758466522,1760573355; HMACCOUNT=D83614B29E21DC52; sessionid=ngtooju9bghxim30dkfhceh3so0uh3ey; Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0=1760573416',
}

data_array = []
for page in range(1, 21):
    params = {
        'page': page,
    }

    response = requests.get('https://www.mashangpa.com/api/problem-detail/2/data/', params=params, cookies=cookies,
                            headers=headers)
    current_array = response.json()['current_array']

    # extend 是将新的和已有的 list进行组合， append 是拼接，得到嵌套列表
    data_array.extend(current_array)
    logger.info(response.url)
    time.sleep(1)

logger.info(data_array)
logger.info(np.sum(data_array))


