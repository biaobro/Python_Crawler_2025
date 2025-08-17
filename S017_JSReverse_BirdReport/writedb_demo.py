# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : writedb_demo.py
@Project            : S017_JSReverse_BirdReport
@CreateTime         : 2025/8/17 15:54
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/8/17 15:54 
@Version            : 1.0
@Description        : None
"""
import pymysql  # 导入 MySQL 连接器模块
from faker import Faker  # 导入 Faker 模块，用于生成虚假数据

faker = Faker() # 创建 Faker 实例

conn = pymysql.connect(
    host='localhost',  # 数据库主机地址
    user='root',       # 数据库用户名
    password='Wazg@2020', # 数据库密码
    database='runoob'   # 数据库名称
)

cursor = conn.cursor()  # 创建游标对象，用于执行 SQL 语句

for _ in range(1000):  # 循环100万次，插入100万条数据
    # 使用 Faker 实例生成虚假数据
    name = faker.name()                   # 姓名
    address = faker.address()             # 地址
    email = faker.email()                 # 电子邮件
    phone_number = faker.phone_number()   # 电话号码
    job_title = faker.job()               # 职位
    company = faker.company()             # 公司
    date_of_birth = faker.date_of_birth() # 出生日期
    credit_card_number = faker.credit_card_number()  # 信用卡号

    # 定义 SQL 插入语句
    sql = "INSERT INTO fake_data (name, address, email, phone, job, company, birthdate, creditcard) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"

    # 设置参数值
    val = (name, address, email, phone_number, job_title, company, date_of_birth, credit_card_number)

    # 执行 SQL 插入语句
    cursor.execute(sql, val)

conn.commit()   # 提交事务，保存更改
cursor.close()  # 关闭游标
conn.close()    # 关闭数据库连接
