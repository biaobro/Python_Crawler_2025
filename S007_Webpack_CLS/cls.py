# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : cls.py
@Project            : S007_Webpack_CLS
@CreateTime         : 2025/6/2 20:42
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/6/2 20:42 
@Version            : 1.0
@Description        : None
"""
import pprint

import requests
import execjs

cookies = {
    'HWWAFSESTIME': '1748857724570',
    'HWWAFSESID': '53821cab16a8545974',
    'Hm_lvt_fa5455bb5e9f0f260c32a1d45603ba3e': '1748857727',
    'HMACCOUNT': '6146648EAF245B09',
    'hasTelegraphRemind': 'on',
    'hasTelegraphSound': 'on',
    'vipNotificationState': 'on',
    'hasTelegraphNotification': 'off',
    'Hm_lpvt_fa5455bb5e9f0f260c32a1d45603ba3e': '1748867190',
    'tfstk': 'gWCZCjOVGIjCjsK9I6OqYnmF4pd9sIr7gstXoZbD5hxi1ficLijn1KqOlM8cVMX1fKwOoqROOOGXfldVogO4VuN7NNQ9aIq7V0i_OTAy7FVjidxH6EwWzjmQNNQt-1gC_9NSu62p0IxcmdvHtFKnIfvGmDDHvELmjEcg8y-pumYDoEch-FTjIIAcmw4ekHYMidjc-A6NSZcePd4Asz1HOWwWm3bMYjcryFJgJNkjgj5e7d5mmHccd68wQ3bGa2PBkEWladIuAAtGUsIyPGNn_g7cytvFgDqeMw6P0U5grY-VXwf6K14jeedAn1OhskVkpKfhxej_lxLF3ZfJ6d3xMiShyTdGsoh6XtbhiH1glj-lFadeJsZKsnWhn199Mcq2D67hstSP5mLhpK5AQmD2IeLeVyzEa_YBIpGqLoMxHpAJ83a65xHvIgLeVPasHxptpe-75F1..',
}

headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json;charset=utf-8',
    'Pragma': 'no-cache',
    'Referer': 'https://www.cls.cn/telegraph',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    # 'Cookie': 'HWWAFSESTIME=1748857724570; HWWAFSESID=53821cab16a8545974; Hm_lvt_fa5455bb5e9f0f260c32a1d45603ba3e=1748857727; HMACCOUNT=6146648EAF245B09; hasTelegraphRemind=on; hasTelegraphSound=on; vipNotificationState=on; hasTelegraphNotification=off; Hm_lpvt_fa5455bb5e9f0f260c32a1d45603ba3e=1748867190; tfstk=gWCZCjOVGIjCjsK9I6OqYnmF4pd9sIr7gstXoZbD5hxi1ficLijn1KqOlM8cVMX1fKwOoqROOOGXfldVogO4VuN7NNQ9aIq7V0i_OTAy7FVjidxH6EwWzjmQNNQt-1gC_9NSu62p0IxcmdvHtFKnIfvGmDDHvELmjEcg8y-pumYDoEch-FTjIIAcmw4ekHYMidjc-A6NSZcePd4Asz1HOWwWm3bMYjcryFJgJNkjgj5e7d5mmHccd68wQ3bGa2PBkEWladIuAAtGUsIyPGNn_g7cytvFgDqeMw6P0U5grY-VXwf6K14jeedAn1OhskVkpKfhxej_lxLF3ZfJ6d3xMiShyTdGsoh6XtbhiH1glj-lFadeJsZKsnWhn199Mcq2D67hstSP5mLhpK5AQmD2IeLeVyzEa_YBIpGqLoMxHpAJ83a65xHvIgLeVPasHxptpe-75F1..',
}

jscode = execjs.compile(open('half.js', 'r').read())
sign = jscode.call('genSign')
# print(sign)


params = {
    'app': 'CailianpressWeb',
    'lastTime': '1748862334',
    'last_time': '1748862334',
    'os': 'web',
    'refresh_type': '1',
    'rn': '20',
    'sv': '8.4.6',
    'sign': sign,
}

response = requests.get('https://www.cls.cn/nodeapi/telegraphList', params=params, cookies=cookies, headers=headers)
pprint.pprint(response.text)
