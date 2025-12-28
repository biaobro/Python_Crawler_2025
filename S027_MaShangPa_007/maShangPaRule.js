const handleAst = require("./maShangPaAstHandle")

module.exports = {
    summary : "ast rule",

    async beforeSendResponse(requestDetail, responseDetail){
        console.log(requestDetail.url)
        if (requestDetail.url.indexOf('pagination7') > -1){
            var body = responseDetail.response.body.toString('utf8');

            // await 会暂停 async 函数的执行，直到 Promise 结果返回
            body = await handleAst(body);

            responseDetail.response.header['content-length'] = body.length;
            responseDetail.response.body = Buffer.from(body);
        }
        return responseDetail
    }
}