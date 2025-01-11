# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : demo_yijiupi.py
@Project            : S002_DrissionPage
@CreateTime         : 2025/1/11 23:12
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/1/11 23:12 
@Version            : 1.0
@Description        : DrissionPage 看起来要比 Selenium 快，但也只适用于未加密的简单网站
"""
import time
import random
from DrissionPage import ChromiumPage

page = ChromiumPage()

page.get('https://www.yijiupi.com/#/index/list?searchKey=%E6%B1%BE%E9%85%92')
page.listen.start('Product/List')


def get_page():
    count = 1
    while count < 5:
        btn = page('下一页', timeout=2)
        print(btn)
        if btn:
            btn.click()
            page.wait.load_start()
            count += 1
        else:
            break

        packet = page.listen.wait()
        print('get api data : ', packet.response.body)


get_page()
