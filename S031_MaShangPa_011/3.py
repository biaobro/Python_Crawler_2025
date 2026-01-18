# simple_call.py
import subprocess, json, sys, os


def get_page(page):
    """一行命令调用 JS"""
    js_code = f'''
    window=global;
    eval(require("fs").readFileSync("pagination11.js","utf8"));
    loadPage({page}).then(r=>console.log(JSON.stringify(r)));
    '''

    result = subprocess.run(
        ['node', '-e', js_code],
        capture_output=True,
        text=True,
        timeout=30
    )

    try:
        return json.loads(result.stdout.strip())
    except:
        return {'error': result.stderr}


# 使用
data = get_page(1)
print(json.dumps(data, ensure_ascii=False))