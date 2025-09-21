# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : step2.py
@Project            : S019_YuanRenXue_107
@CreateTime         : 2025/9/21 20:32
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/9/21 20:32 
@Version            : 1.0
@Description        : None
"""
from fontTools.ttLib import TTFont  # pip install fontTools
from base64 import b64decode
from parsel import Selector
import requests


on_map = {
    '101010101101010001010101101010101010010010010101001000010': '8',  # 'a174',
    '100110101001010101011110101000': '2',  # 'a285',
    '1110101001001010110101010100101011111': '5',  # 'a714',
    '10010101001110101011010101010101000100100': '9',  # 'a796',
    '1001101111': '1',  # 'b154',
    '10101010100001010111010101101010010101000': '6',  # 'b531',
    '111111111111111': '4',  # 'b728',
    '10101100101000111100010101011010100101010100': '3',  # 'b982',
    '1111111': '7',  # 'c573',
    '10100100100101010010010010': '0',  # 'c963',
}


def save_font(font_data):
    with open('7.ttf', mode='wb') as f:
        f.write(b64decode(font_data['woff']))  # 保存字体文件

    font = TTFont('7.ttf')  # 加载字体文件
    font.saveXML('7.xml')  # 保存为xml文件

    # 读取 xml 文件
    with open('7.xml', mode='r', encoding='utf-8') as f:
        xml_data = f.read()

    select = Selector(xml_data)
    # 获取 <glyf> --> 所有 TTGlyph 标签
    TTGlyph = select.css('glyf > TTGlyph')[1:]  # 第 0 个标签的信息不需要，从第 1 个标签开始获取
    rep_dist = {}
    for tt in TTGlyph:
        name = tt.css('::attr(name)').get().replace('uni', '')  # TTGlyph标签 --> name 值
        pt = tt.css('pt')  # 获取 Glyph标签 --> TTGlyph标签 --> pt标签对应的 on 值
        on_list = []
        for pt_tag in pt:
            on_list.append(pt_tag.css('::attr(on)').get())
        rep_dist[name] = on_map[''.join(on_list)]  # 根据映射将 on 值替换成正确的数字

    print(rep_dist)

    result_dict = []
    for data in font_data['data']:
        num_list = []
        for nums in data['value'].replace('&#x', '').split(' ')[0:-1]:
            num_list.append(rep_dist[nums])
        result_dict.append(int(''.join(num_list)))

    return result_dict


headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
}
cookies = {
    "sessionid": "mhgiqaaxkqpt3ybutbub96ubi9rr5gtk"
}
url = "https://match.yuanrenxue.cn/api/match/7?page=1"
resp = requests.get(url, headers=headers, cookies=cookies)
print(save_font(resp.json()))
