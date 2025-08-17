# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : BirdReport.py
@Project            : S017_JSReverse_BirdReport
@CreateTime         : 2025/8/16 20:55
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/8/16 20:55 
@Version            : 1.0
@Description        : None
"""
import datetime
import json
import time

import requests
import execjs
from loguru import logger
import pandas as pd

import pymysql  # 导入 MySQL 连接器模块

conn = pymysql.connect(
    host='localhost',  # 数据库主机地址
    user='root',  # 数据库用户名
    password='Wazg@2020',  # 数据库密码
    database='runoob'  # 数据库名称
)

cursor = conn.cursor()  # 创建游标对象，用于执行 SQL 语句

headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://www.birdreport.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://www.birdreport.cn/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'requestId': 'requestId',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sign': 'sign',
    'timestamp': 'timestamp',
}

df = pd.DataFrame()
for page in range(1, 2):
    options = f'page={page}&limit=20'
    params = execjs.compile(open('app_whole.js', 'r', encoding='utf-8').read()).call('ajaxSetup', options)

    headers['requestId'] = params['requestId']
    headers['sign'] = params['sign']
    headers['timestamp'] = str(params['timestamp'])
    data = params['formdata']
    response = requests.post('https://api.birdreport.cn/front/activity/search', headers=headers, data=data)
    respDataEncrypt = response.json()['data']
    respDataDecrypt = execjs.compile(open('app_whole.js', 'r', encoding='utf-8').read()).call('decrypt',
                                                                                              respDataEncrypt)
    # logger.debug(respDataDecrypt)
    # logger.debug(type(respDataDecrypt))
    logger.debug(f'page {page} get {len(respDataDecrypt)} records successfully.')

    # 定义 SQL 插入语句
    # 对于int 类型的字段，不需要使用 %d，统一使用 %s
    sql = (
        "INSERT INTO birdreport (address,endTime,id,outsideCount,pointId,pointName,reportId,serialId,startTime,"
        "taxonCount,userId,username,visitsCount)"
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")

    dataFrame = pd.DataFrame(respDataDecrypt)
    data_list = list(zip(dataFrame['address'],
                         dataFrame['endTime'],
                         dataFrame['id'],
                         dataFrame['outsideCount'],
                         dataFrame['pointId'],
                         dataFrame['pointName'],
                         dataFrame['reportId'],
                         dataFrame['serialId'],
                         dataFrame['startTime'],
                         dataFrame['taxonCount'],
                         dataFrame['userId'],
                         dataFrame['username'],
                         dataFrame['visitsCount']))
    # logger.debug(dataFrame['address'])
    # logger.debug(data_list)
    try:
        cursor.executemany(sql, data_list)
        conn.commit()
        logger.debug("插入成功")
    except Exception as e:
        logger.debug("插入失败:", str(e))
        conn.rollback()

    df = pd.concat([df, pd.DataFrame(respDataDecrypt)])
    time.sleep(10)
df.to_excel(f'BirdReport_{datetime.datetime.now().strftime("%Y%m%d%H%M%S")}.xlsx', index=False)
conn.close()
