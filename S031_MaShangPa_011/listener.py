# !/usr/bin/env python3
# _*_ coding:utf-8 _*_
"""
@File               : listener.py
@Project            : S031_MaShangPa_011
@CreateTime         : 2026/1/18 10:35
@Author             : biaobro
@Software           : PyCharm
@Last Modify Time   : 2026/1/18 10:35 
@Version            : 1.0
@Description        : None
"""

# python_call.py
import subprocess, json, sys

def get_page(page=1):
    result = subprocess.run(
        ['node', 'caller.js', str(page)],
        capture_output=True,
        text=True
    )
    return json.loads(result.stdout.strip()) if result.returncode == 0 else {'error': result.stderr}

# 使用
print(get_page(1))
