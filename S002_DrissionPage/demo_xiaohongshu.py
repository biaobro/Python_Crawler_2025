# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : demo_xiaohongshu.py
@Project            : S002_DrissionPage
@CreateTime         : 2025/1/11 22:31
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/1/11 22:31 
@Version            : 1.0
@Description        : None
"""
import time
import random
from DrissionPage import ChromiumPage

page = ChromiumPage()
page.get('https://www.xiaohongshu.com/explore')
page.listen.start('/api/sns/web/v1/homefeed')

genList = []
for down in range(1,10000):
    i = down/10
    js_code = f'document.documentElement.scrollTop = document.documentElement.scrollHeight * {i}'
    page.run_js(js_code)
    time.sleep(random.randint(400,800)/1000)
    apiListFlag = page.listen.wait(count=5, timeout=1)
    print('data status : ', apiListFlag)
    if apiListFlag:
        for item in apiListFlag:
            print(item.response.body)

if __name__ == '__main__':
    pass
