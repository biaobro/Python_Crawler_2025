# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : demo.py
@Project            : S012_Webpack_ShuWeiGuanCha
@CreateTime         : 2025/6/22 18:45
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/6/22 18:45 
@Version            : 1.0
@Description        : None
"""

import requests

cookies = {
    'webapp': '1',
    'siteCode': 'sxzfcg',
    'siteGuid': '6883226032309207040',
    'regioncode': '140001000',
    'regionguid': '140001',
    'theme': 'default',
    'regionpguid': '232',
    'rootregionguid': '232',
    'isOpenArea': 'true',
    'platform': '0',
    'regionname': '%E7%9C%81%E6%9C%AC%E7%BA%A7',
}

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'nsssjss': 'd8HCj/YD/BAqUCSANXE0B1XbaLr2uxXi7yVlJ0LvFhMpRa7/F9iwW1OtgytqidKc8J5Ts7vNTnglZQ4Avmty1xo+jWuuKa8YEOSO7aLeA4nA1dkLtJhD6GOeA6uR1ilcYScWP7U+dxRSBLZBdRMG5TjrrQnv45fvKx1W3faQavA=',
    'origin': 'https://shanxisheng-zfcgdzmcgov.cn',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://shanxisheng-zfcgdzmcgov.cn/gpmall-main-web/basic/sxNotice',
    'regioncode': '140001000',
    'regionguid': '140001',
    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sign': 'c5f90306aec5f29eb53151796bf4412b',
    'sitecode': 'sxzfcg',
    'siteguid': '6883226032309207040',
    'time': '1750589012425',
    'timestamp': '1750589012424',
    'url': '/gateway/gpfa-bpoc/api/notice/kc/v1/ignore/pagingKcAgreementNotice',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    'webapp': '1',
    # 'cookie': 'webapp=1; siteCode=sxzfcg; siteGuid=6883226032309207040; regioncode=140001000; regionguid=140001; theme=default; regionpguid=232; rootregionguid=232; isOpenArea=true; platform=0; regionname=%E7%9C%81%E6%9C%AC%E7%BA%A7',
}

for page in range(1,3):
    json_data = {
        'regionGuid': '232',
        'regionCode': '140000000',
        'pageSize': 10,
        'pageNum': page,
        'noticeTypeList': [
            'gpfa_notice',
            'gpfa_notice_modify',
            'gpfa_notice_resume',
            'gpfa_notice_pause',
        ],
    }

    response = requests.post(
        'https://shanxisheng-zfcgdzmcgov.cn/gateway/gpfa-bpoc/api/notice/kc/v1/ignore/pagingKcAgreementNotice',
        cookies=cookies,
        headers=headers,
        json=json_data,
    )

    # Note: json_data will not be serialized by requests
    # exactly as it was in the original request.
    #data = '{"regionGuid":"232","regionCode":"140000000","pageSize":10,"pageNum":2,"noticeTypeList":["gpfa_notice","gpfa_notice_modify","gpfa_notice_resume","gpfa_notice_pause"]}'
    #response = requests.post(
    #    'https://shanxisheng-zfcgdzmcgov.cn/gateway/gpfa-bpoc/api/notice/kc/v1/ignore/pagingKcAgreementNotice',
    #    cookies=cookies,
    #    headers=headers,
    #    data=data,
    #)
    print(response.text)
