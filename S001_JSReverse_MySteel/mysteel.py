# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : mysteel.py
@Project            : S001_JSReverse_MySteel
@CreateTime         : 2025/1/11 17:32
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/1/11 17:32 
@Version            : 1.0
@Description        : None
"""
import time
from urllib.parse import urlencode, quote

import execjs
import pandas as pd

# 模拟浏览器，可使用工具：在线curl命令转代码
import requests

cookies = {
    'BURIED_STARTUP': 'eyJTVEFSVFVQIjp0cnVlLCJTVEFSVFVQVElNRSI6IjIwMjQtMTItMDcgMjE6NDg6MzUuNTYyIn0%3D',
    'buriedDistinctId': '44c2e8b5e76e4e7183cb2a9bfaa13f0d',
    'HMACCOUNT': '441FD09B979CC2DB',
    'WM_TID': 'PZiYpS8D4kdBFAAUEFeGG8xTLFZDjmUw',
    'href': 'https%3A%2F%2Findex.mysteel.com%2Fprice%2FindexPrice.html',
    'uuid_5d36a9e0-919c-11e9-903c-ab24dbab411b': '2556eb79-652f-4be0-aec2-335b1aa21bc3',
    'accessId': '5d36a9e0-919c-11e9-903c-ab24dbab411b',
    'WM_NI': 'YzYA2AFxsXmTi52m4GLUsb5z2CtQt5z%2BQVGh9o%2FIVcnmeGyh1aYGfVklBMquEf7eqCI23aNLonHDnTYQHzr4JUdarb%2B9MeT35j0L%2FZBaOWqrxkWrQ3S2Aq1EGDDIgKHea0Q%3D',
    'WM_NIKE': '9ca17ae2e6ffcda170e2e6ee83d73e878bb784ec39fcac8ea3c45e878a9faccb429187ffa5d350a9968ab2d72af0fea7c3b92a9ba697a2b14b86a8bdb9f060abebfe8eb74d908bbd83b872f29dbcb2f73fbaf59fb7c664fbb1e1aad569aeb3aba8fc64f3bf97a8e55ea9b48eaef47f87baf986f4498beefd82cd48adb288a5ed609b8f889bf1408a8bac82f16ae9e78386d739f7b600adae5282bf81b8f47abcb59993d43991ee8f92b44f859c8caae6418cbbafd1d437e2a3',
    'Hm_lvt_1c4432afacfa2301369a5625795031b8': '1736580347',
    'MYSTEEL_GLOBAL_BURIED_IDENTITY': 'dcb877f654882f5a7c78f71fa66b3178',
    'pageViewNum': '3',
    'Hm_lpvt_1c4432afacfa2301369a5625795031b8': '1736580754',
    'gdxidpyhxdE': 't92osA7DJ2m%2FZAy6K8%2BKHqABvSVGPCTZhmEbChqupLliGz9vHasVeDvt9Kl%2B1C1MZEkWoQTThMAsoHi7P1%2BOmH76PvpEhrDZv1xY2niMSMYyYxgv%5Cnh5g347u8N0n6JtDqnQTULuSfuXGzqpU21zw8xYsY%2BjMJO7emts1x53JDwDzdKM%3A1736582428409',
}

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    # Requests sorts cookies= alphabetically
    # 'Cookie': 'BURIED_STARTUP=eyJTVEFSVFVQIjp0cnVlLCJTVEFSVFVQVElNRSI6IjIwMjQtMTItMDcgMjE6NDg6MzUuNTYyIn0%3D; buriedDistinctId=44c2e8b5e76e4e7183cb2a9bfaa13f0d; HMACCOUNT=441FD09B979CC2DB; WM_TID=PZiYpS8D4kdBFAAUEFeGG8xTLFZDjmUw; href=https%3A%2F%2Findex.mysteel.com%2Fprice%2FindexPrice.html; uuid_5d36a9e0-919c-11e9-903c-ab24dbab411b=2556eb79-652f-4be0-aec2-335b1aa21bc3; accessId=5d36a9e0-919c-11e9-903c-ab24dbab411b; WM_NI=YzYA2AFxsXmTi52m4GLUsb5z2CtQt5z%2BQVGh9o%2FIVcnmeGyh1aYGfVklBMquEf7eqCI23aNLonHDnTYQHzr4JUdarb%2B9MeT35j0L%2FZBaOWqrxkWrQ3S2Aq1EGDDIgKHea0Q%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6ee83d73e878bb784ec39fcac8ea3c45e878a9faccb429187ffa5d350a9968ab2d72af0fea7c3b92a9ba697a2b14b86a8bdb9f060abebfe8eb74d908bbd83b872f29dbcb2f73fbaf59fb7c664fbb1e1aad569aeb3aba8fc64f3bf97a8e55ea9b48eaef47f87baf986f4498beefd82cd48adb288a5ed609b8f889bf1408a8bac82f16ae9e78386d739f7b600adae5282bf81b8f47abcb59993d43991ee8f92b44f859c8caae6418cbbafd1d437e2a3; Hm_lvt_1c4432afacfa2301369a5625795031b8=1736580347; MYSTEEL_GLOBAL_BURIED_IDENTITY=dcb877f654882f5a7c78f71fa66b3178; pageViewNum=3; Hm_lpvt_1c4432afacfa2301369a5625795031b8=1736580754; gdxidpyhxdE=t92osA7DJ2m%2FZAy6K8%2BKHqABvSVGPCTZhmEbChqupLliGz9vHasVeDvt9Kl%2B1C1MZEkWoQTThMAsoHi7P1%2BOmH76PvpEhrDZv1xY2niMSMYyYxgv%5Cnh5g347u8N0n6JtDqnQTULuSfuXGzqpU21zw8xYsY%2BjMJO7emts1x53JDwDzdKM%3A1736582428409',
    'Pragma': 'no-cache',
    'Referer': 'https://index.mysteel.com/price/indexPrice.html',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
}

# 包装参数
catalogName = '螺纹钢'
catalog = quote(catalogName)

specName = 'HRB400E Φ20'
spec1 = quote(specName)
spec2 = quote(specName.replace(' ', '_'))

# 城市，可以传入多个，逗号不参与编码
cityList = ['上海', '北京', '广州']
cities = ','.join(quote(_) for _ in cityList)

ts_13bits = str(int(time.time() * 1000))
startDate = '2024-01-11'
endDate = '2025-01-11'
signList = execjs.compile(open('script/sign.js', encoding='utf-8').read()).call('getSignList')

params = {
    'catalog': f'{catalog}_:_{catalog}',
    'city': cities,
    'spec': f'{spec1}_:_{spec2}',
    'startTime': startDate,
    'endTime': endDate,
    'callback': 'json',
    'v': ts_13bits,
    'Api-Token': signList[0],
    'Timestamp': signList[1],
}

# 发送请求
response = requests.get('https://index.mysteel.com/api/pricetrend/getChartMultiCity.htm', params=params,
                        cookies=cookies, headers=headers)

# 得到数据
resp_json = response.json()
datas = execjs.compile(open('script/modal.js', encoding='utf-8').read()).call('getContent', resp_json)

# 传入几个城市，就返回几组数据
# 格式是字典数组，即每个元素都是个字典
# 每个字典里包含2个 key-value
# 第1个 key-value，key 是dateValueMap， value 是列表，列表中又是字典数组
# 第2个 key-value，key 是lineName， value 是城市名称
df = pd.DataFrame()
for data in datas:
    temp = pd.DataFrame(data['dateValueMap'])

    # 在 DataFrame 上补1列城市名
    temp['city'] = data['lineName']

    # 默认是按行拼接，即追加
    # 合理的方式是按列凭借，日期作为主键
    df = pd.concat([df, temp], ignore_index=True)

# 上面得到的表结构是3列，日期，数值，城市
# 通过 pivot 转成 日期，按城市列出数值
df = df.pivot(index='date', columns='city', values='value')

# 保存文件，列名：日期，数值，城市
df['catalog'] = catalogName
df['specName'] = specName

# index列是日期，需要保留下来
df.to_excel('data.xlsx', index=True)

if __name__ == '__main__':
    pass
