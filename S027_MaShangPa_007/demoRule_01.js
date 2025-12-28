module.exports = {
    summary : "my rule",

    async beforeSendResponse(requestDetail, responseDetail){
        if (requestDetail.url === 'http://httpbin.org/user-agent'){
            const newResponse = responseDetail.response;
            newResponse.body += '- AnyProxy Hacked!'
        }
        return responseDetail
    }
}