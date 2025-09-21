# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : final.py
@Project            : S019_YuanRenXue_107
@CreateTime         : 2025/9/21 22:32
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/9/21 22:32 
@Version            : 1.0
@Description        : None
"""
import requests
from base64 import b64decode
from fontTools.ttLib import TTFont  # pip install fontTools
from parsel import Selector

heroNames = [
    '爷灬霸气傀儡', '梦战苍穹', '傲世哥',
    'мaη肆風聲', '一刀メ隔世', '横刀メ绝杀',
    'Q不死你R死你', '魔帝殤邪', '封刀不再战',
    '倾城孤狼', '戎马江湖', '狂得像风',
    '影之哀伤', '謸氕づ独尊', '傲视狂杀',
    '追风之梦', '枭雄在世', '傲视之巅',
    '黑夜刺客', '占你心为王', '爷来取你狗命',
    '御风踏血', '凫矢暮城', '孤影メ残刀',
    '野区霸王', '噬血啸月', '风逝无迹',
    '帅的睡不着', '血色杀戮者', '冷视天下',
    '帅出新高度', '風狆瑬蒗', '灵魂禁锢',
    'ヤ地狱篮枫ゞ', '溅血メ破天', '剑尊メ杀戮',
    '塞外う飛龍', '哥‘K纯帅', '逆風祈雨',
    '恣意踏江山', '望断、天涯路', '地獄惡灵',
    '疯狂メ孽杀', '寂月灭影', '骚年霸称帝王',
    '狂杀メ无赦', '死灵的哀伤', '撩妹界扛把子',
    '霸刀☆藐视天下', '潇洒又能打'
]

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

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
}
cookies = {
    "sessionid": "xxxxx"
}


# 每页得到的 woff 都不同
def send_match7(page):
    url = "https://match.yuanrenxue.cn/api/match/7"
    params = {
        "page": f"{page}"
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    return {
        'woff': response.json()['woff'],
        'data': response.json()['data']
    }


# 得到具体数字
def save_font(font_data):
    with open('7.ttf', mode='wb') as f:
        f.write(b64decode(font_data['woff']))  # 保存字体文件

    font = TTFont('7.ttf')  # 加载字体文件
    font.saveXML('7.xml')  # 保存为xml文件

    # 读取 xml 文件
    with open('7.xml', mode='r', encoding='utf-8') as f:
        xml_data = f.read()

    select = Selector(xml_data)
    # 获取 <glyf> --> TTGlyph
    TTGlyph = select.css('glyf > TTGlyph')[1:]  # 第 0 个标签的信息不需要，从第 1 个标签开始获取
    rep_dist = {}
    for tt in TTGlyph:
        name = tt.css('::attr(name)').get().replace('uni', '')  # TTGlyph标签 --> name 值
        pt = tt.css('pt')  # 获取 Glyph标签 --> TTGlyph标签 --> pt标签对应的 on 值
        on_list = []
        for pt_tag in pt:
            on_list.append(pt_tag.css('::attr(on)').get())
        rep_dist[name] = on_map[''.join(on_list)]  # 根据映射将 on 值替换成正确的数字

    result_dict = []
    for data in font_data['data']:
        num_list = []
        for nums in data['value'].replace('&#x', '').split(' ')[0:-1]:
            num_list.append(rep_dist[nums])
        result_dict.append(int(''.join(num_list)))
    return result_dict


if __name__ == '__main__':
    hero_nums = []  # 声明一个列表，用于存储所有的数值
    for page in range(1, 6):
        match7_data = send_match7(page)
        nums_list = save_font(match7_data)
        print(page, nums_list)  # 打印请求的页数，对应的列表(数值)
        for num in nums_list:  # 遍历每页得到的列表
            hero_nums.append(num)  # 将列表数值添加到 hreo_nums 列表中
    print(hero_nums)  # 打印所有页面的数值

    max_num = 0  # 定义一个变量，用于存储最大的数值
    for num in hero_nums:
        # 将 hero_nums 中的每一个数值与 max_num 作比较
        if num > max_num:  # 如果改数值比 max_num 大
            max_num = num  # max_num 就等于改数值

    hero_index = hero_nums.index(max_num)  # 获取列表中最大数值的索引
    print(heroNames[hero_index])  # 获取对应英雄列表的英雄名
