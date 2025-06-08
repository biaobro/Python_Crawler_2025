# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : spa2.py
@Project            : S008_Webpack_spa2
@CreateTime         : 2025/6/8 20:01
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/6/8 20:01 
@Version            : 1.0
@Description        : None
"""
import requests
import execjs
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
}

jscode = execjs.compile(open('simpleApp.js', 'r', encoding='utf-8').read())

for page in range(1,12):
    offset = (page - 1) * 10
    token = jscode.call('getToken', offset)
    params = {
        'limit': '10',
        'offset': offset,
        'token': token
    }
    results = requests.get('https://spa2.scrape.center/api/movie/', params=params, headers=headers).json()['results']
    for result in results:
        print(result)
    break
