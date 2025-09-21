# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : step1.py
@Project            : S019_YuanRenXue_107
@CreateTime         : 2025/9/21 17:47
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/9/21 17:47 
@Version            : 1.0
@Description        : None
"""
from fontTools.ttLib import TTFont  # pip install fontTools
from base64 import b64decode
from parsel import Selector  # pip install parsel


def demo(data):
    """data为接口返回的内容"""

    with open('7.ttf', mode='wb') as file:
        file.write(b64decode(data['woff']))  # 将 woff 字段 b64解码后写入到文件

    font = TTFont('7.ttf')  # 加载字体文件
    font.saveXML('7.xml')  # 保存为xml文件
    # 读取 xml 文件
    with open('7.xml', mode='r', encoding='utf-8') as f:
        xml_data = f.read()

    select = Selector(xml_data)
    glyf = select.css('glyf > TTGlyph')  # 获取 glyf 下所有的 TTglyph 标签
    for TTGlyph in glyf[1:]:  # 第 0 个标签的值是不需要的，所以从 第 1 个元素开始遍历
        name = TTGlyph.css('::attr(name)').get().replace('uni', '')  # 获取 TTGlyph 标签里对应的 name 属性，并将 uni 替换为空

        pt_tag = TTGlyph.css('pt')  # 获取 TTGlyph 下所有的 pt 标签
        on_list = []
        for pt in pt_tag:  # 遍历 pt 标签
            on = pt.css('::attr(on)').get()  # 获取 pt 标签里对应的 on 属性
            on_list.append(on)  # 将解析的到 on 属性值添加到列表中
        print(f"'{''.join(on_list)}': '{name}',")  # 打印出字典形式的字符串
    # ''.join(on_list) 对应字典键
    # name 对应字典值


resp = {
    "woff": "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",
    "status": "1",
    "state": "success",
    "data": [
        {
            "value": "&#xb982 &#xa285 &#xb982 &#xb531 "
        },
        {
            "value": "&#xa714 &#xc963 &#xb728 &#xb154 "
        },
        {
            "value": "&#xb982 &#xa796 &#xa714 &#xa174 "
        },
        {
            "value": "&#xa174 &#xa714 &#xa714 &#xc963 "
        },
        {
            "value": "&#xc573 &#xc963 &#xb982 &#xc573 "
        },
        {
            "value": "&#xa174 &#xa174 &#xa796 &#xa174 "
        },
        {
            "value": "&#xa285 &#xb154 &#xa796 &#xc963 "
        },
        {
            "value": "&#xa174 &#xb728 &#xc963 &#xc963 "
        },
        {
            "value": "&#xb728 &#xa714 &#xc963 &#xc963 "
        },
        {
            "value": "&#xc573 &#xb728 &#xc573 &#xa174 "
        }
    ]
}
demo(resp)
