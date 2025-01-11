# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : dataframe_demo.py
@Project            : S001_JSReverse_MySteel
@CreateTime         : 2025/1/11 20:30
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2025/1/11 20:30 
@Version            : 1.0
@Description        : None
"""
import numpy as np
import pandas as pd
from pandas import Series, DataFrame

df1 = DataFrame({'key': ['b', 'b', 'a', 'c', 'a', 'a', 'b'],
                 'data1': range(7)})
df2 = DataFrame({'key': ['a', 'b', 'd'],
                 'data2': range(3)})

df = pd.merge(df1, df2, on='key', how='outer')
print(df)