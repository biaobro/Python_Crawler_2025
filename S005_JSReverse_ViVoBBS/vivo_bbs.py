# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : vivo_bbs.py
@Project            : S005_JSReverse_ViVoBBS
@CreateTime         : 2025/2/15 12:23
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/2/15 12:23 
@Version            : 1.0
@Description        : None
"""
import requests

headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json;charset=UTF-8',
    # Requests sorts cookies= alphabetically
    # 'Cookie': 'sessionId=3048637a-b41c-d929-7347-1bef8abf59ad; cookieId=3048637a-b41c-d929-7347-1bef8abf59ad1739589957476',
    'Origin': 'https://bbs.vivo.com.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://bbs.vivo.com.cn/newbbs/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
}

json_data = {
    # 'lastId': '',
    'pageNum': 1,
    'pageSize': 10,
    # 'timestamp': 1739590023582,
    # 'nonce': 'aaaaaaa',
}

response = requests.post('https://bbs.vivo.com.cn/api/community/index', headers=headers, json=json_data)
print(response.json())
