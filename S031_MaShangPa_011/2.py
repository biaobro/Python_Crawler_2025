# call_js.py
import subprocess
import json
import sys
import os


def call_loadpage(page, js_file='pagination11.js'):
    """
    调用 JS 的 loadPage 函数

    Args:
        page: 页码
        js_file: JS 文件路径

    Returns:
        dict: {page, m, _ts} 或包含 error 的字典
    """
    # 工作目录设为 JS 文件所在目录
    work_dir = os.path.dirname(os.path.abspath(js_file))

    # JS 调用代码
    js_code = f'''
// 设置全局变量
window = global;
const fs = require("fs");
const path = require("path");

// 加载并执行 JS 文件
eval(fs.readFileSync("{js_file}", "utf8"));

// 调用 loadPage
loadPage({page})
    .then(result => console.log(JSON.stringify(result)))
    .catch(error => {{
        console.error(JSON.stringify({{error: error.message}}));
        process.exit(1);
    }});
'''

    try:
        # 执行 Node.js
        result = subprocess.run(
            ['node', '-e', js_code],
            cwd=work_dir,
            capture_output=True,
            text=True,
            timeout=30
        )

        if result.returncode == 0:
            output = result.stdout.strip()
            print(output)
            print(json.loads(output))
            if output:
                return json.loads(output)
            else:
                return {'error': '无输出'}
        else:
            error_output = result.stderr.strip()
            try:
                return json.loads(error_output) if error_output else {'error': '执行失败'}
            except:
                return {'error': error_output or '未知错误'}

    except subprocess.TimeoutExpired:
        return {'error': '执行超时'}
    except json.JSONDecodeError:
        return {'error': '输出不是有效的 JSON'}
    except Exception as e:
        return {'error': str(e)}


# 使用示例
if __name__ == '__main__':
    # 从命令行读取页码，默认第1页
    page = int(sys.argv[1]) if len(sys.argv) > 1 else 1

    result = call_loadpage(page)

    if 'error' in result:
        print(f"调用失败: {result['error']}")
    else:
        print(f"页码: {result['page']}")
        print(f"加密结果(m): {result['m']}")
        print(f"时间戳(_ts): {result['_ts']}")