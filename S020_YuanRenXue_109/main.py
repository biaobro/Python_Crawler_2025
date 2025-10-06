# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : main.py
@Project            : S020_YuanRenXue_109
@CreateTime         : 2025/9/27 18:35
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/9/27 18:35 
@Version            : 1.0
@Description        : None
"""
import requests
from loguru import logger

cookies = {
    'Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3': '1750606060',
    'no-alert3': 'true',
    'tk': '5228908307399203021',
    'sessionid': 'tehte8lud61fjv71rot25qwoge26tkoy',
    'm': '4P5LhDrYm33NzerhB%2FRemymrp32DsElw8UcyKQTXAgropZLRwHe9Eq%2BucCfzqguDUDslRr8Fpj7gifMBueo9EyKmWfWajH0jQdGUdWTfFpyhD1zOjm9mtWZjAm6DMOr591ttIivALxZgH%2F3WhBb4Fn%2FV4rFG320I%2BNk7p00uxYJOIMkOjaRtSIUH%2B%2BPxS30spjGrrmVxezBAVJXBfDXAn%2BH3dNg%2B0zq0SjNiA%2FvPmM9cj3um1HSkWdVuJhGfqtTZEptAMxcqBhdyQEXmab%2FoXfV%2B0y6ynpATADEkb4VNmEygnleP8%2FJB3Nte%2FGOs5Sx2QyCJrOMlo0KhZqetQazLqPA%3D%3Dr',
}

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=0, i',
    'referer': 'https://match.yuanrenxue.cn/match/9',
    'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    # 'cookie': 'Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3=1750606060; no-alert3=true; tk=5228908307399203021; sessionid=tehte8lud61fjv71rot25qwoge26tkoy; m=4P5LhDrYm33NzerhB%2FRemymrp32DsElw8UcyKQTXAgropZLRwHe9Eq%2BucCfzqguDUDslRr8Fpj7gifMBueo9EyKmWfWajH0jQdGUdWTfFpyhD1zOjm9mtWZjAm6DMOr591ttIivALxZgH%2F3WhBb4Fn%2FV4rFG320I%2BNk7p00uxYJOIMkOjaRtSIUH%2B%2BPxS30spjGrrmVxezBAVJXBfDXAn%2BH3dNg%2B0zq0SjNiA%2FvPmM9cj3um1HSkWdVuJhGfqtTZEptAMxcqBhdyQEXmab%2FoXfV%2B0y6ynpATADEkb4VNmEygnleP8%2FJB3Nte%2FGOs5Sx2QyCJrOMlo0KhZqetQazLqPA%3D%3Dr',
}

params = {
    'page': '2',
}

response = requests.get('https://match.yuanrenxue.cn/api/match/9', params=params, cookies=cookies, headers=headers)
logger.info(response.text)

