# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : minmetals.py
@Project            : S009_Webpack_Minmetals
@CreateTime         : 2025/6/14 22:47
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/6/14 22:47 
@Version            : 1.0
@Description        : None
"""
import pprint
import requests
import execjs

cookiesDict = {
    'SUNWAY-ESCM-COOKIE': '2bd57ac1-4c89-4c4b-9619-95dfeada5fe0',
    '__jsluid_s': 'fbb777f5343d8a83d95ecef81cd988b0',
    'JSESSIONID': '9F08F9D9DAF9BDF76D1AE564B03B804D',
}

# 服务端有校验header，不能不写
headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    # 'Content-Length': '0',
    'Origin': 'https://ec.minmetals.com.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://ec.minmetals.com.cn/open/home/purchase-info',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    # 'Cookie': 'SUNWAY-ESCM-COOKIE=2bd57ac1-4c89-4c4b-9619-95dfeada5fe0; __jsluid_s=fbb777f5343d8a83d95ecef81cd988b0; JSESSIONID=9F08F9D9DAF9BDF76D1AE564B03B804D',
}

# 因为2次请求共用headers和cookies，所以我们使用session
session = requests.Session()

# cookies 需要转成 session 可识别的格式
# 如果使用 requests，可以直接使用字典格式的 cookies
cookiesJar = requests.cookies.cookiejar_from_dict(cookiesDict)
session.cookies = cookiesJar
session.headers = headers

# 第1步，请求 public 接口
response = session.post('https://ec.minmetals.com.cn/open/homepage/public')
publicResp = response.text
# print(publicResp)

# 对 public 接口返回字符串，加上本地时间戳，页码等信息，加密
jsCode = execjs.compile(open('index.js', 'r', encoding='utf-8').read())
pageInfo = {
    "inviteMethod": "",
    "businessClassfication": "",
    "mc": "",
    "lx": "ZBGG",
    "dwmc": "",
    "pageIndex": 1
}

param = jsCode.call('getParam', publicResp, pageInfo)
json_data = {'param': param}
# print(json_data)

# 第2步，请求页面数据
response = session.post(
    'https://ec.minmetals.com.cn/open/homepage/zbs/by-lx-page',
    json=json_data,
)

pprint.pprint(response.text)
