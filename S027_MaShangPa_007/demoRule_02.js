const ast = require("./maShangPaAstHandle")
const fs = require("fs/promises");
const path = require("path");

module.exports = {
    summary : "a rule to hack response",

    async beforeSendResponse(requestDetail, responseDetail){
        const res = await rule(requestDetail, responseDetail);
        return res
    }
}

async function rule(req, res){
    console.log('[ req.url ] >', req.url)
    if (req.url.indexOf("jquery-3.4.1.min")>-1){
        try{
            // 构建文件路径
            const filePath = path.resolve(__dirname, "./raw/yrx" + "jquery-3.4.1.min.js");

            // 读取文件内容
            const fileContent = await fs.readFile(filePath,"utf8");

            const minifiedCode = Buffer.from(
                await ast.minifiedHandle(fileContent), "utf-8"
            )

            // 修改response
            res.response.body = minifiedCode;
            res.response.header["content-length"] = minifiedCode.length;
        } catch (error) {
            console.error(" read file error : ", error)
        }
    }
    return res
}