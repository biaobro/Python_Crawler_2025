import {decrypt} from './script.js'
import axios from 'axios';

async function getData(page) {
    let ipp = 10;
    const response = await axios.get('https://apiv3.shanbay.com/wordsapp/user_material_books/juuxc/learning/words/unlearned_items', {
        params: {
            'ipp': ipp,
            'page': page
        },
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'cache-control': 'no-cache',
            'origin': 'https://web.shanbay.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://web.shanbay.com/',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            'x-csrftoken': 'b0d6b105835519338930af9708d7bf68',
            'cookie': 'csrftoken=b0d6b105835519338930af9708d7bf68; sajssdk_2015_cross_new_user=1; _c_WBKFRo=JPbBpINSCA2H6xaZq2Q2cKnA097MCdn8EZ4FllsY; _nb_ioWEgULi=; auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUyMDY3ODM3LCJleHAiOjE3NTgyNjcxNjksImV4cF92MiI6MTc1ODI2NzE2OSwiZGV2aWNlIjoiIiwidXNlcm5hbWUiOiJXZWNoYXRfOWQ2MDM2ZmNiYWY1NTNiZCIsImlzX3N0YWZmIjowLCJzZXNzaW9uX2lkIjoiZWVhM2I0MTY0ZTcxMTFmMGI5ZDQ2NmFhYjQwZWIyYjIifQ.nqJI8w5WXKk8AbabiisS5-A2ub0MnAswWNdazyJzgZ8; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22guurhp%22%2C%22first_id%22%3A%22197916602a15b4-0479e619ece5578-18525636-1128960-197916602a2493%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%A4%BE%E4%BA%A4%E7%BD%91%E7%AB%99%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fopen.weixin.qq.com%2F%22%7D%2C%22%24device_id%22%3A%22197916602a15b4-0479e619ece5578-18525636-1128960-197916602a2493%22%7D; tfstk=g7Vsjp_PkoFEIBhvlAbeOvtXZkljGw5zkEgYrrdwkfh9DIZjYCrVIrkjGPoU_czZ6nEbludwbNX0ADiLrcuVmcPIkorqgRPboIgYkobi0NXUSPcmMgSPz_zgSJqiuzFsHedL-4mxk9k9SMRRagSPa6SY91q14oucg3jIoD3tkjpORX3qyjptkonKp43yXjEYDBdK7VtxDVdtpwgmvmhxMohdRqoKDAdNN2vsYP_ah45TeBjFNDRvMWgsp9ztv7VNucMsoPnC2uFs5nn8WDOvM0Z35Y4YDiOqw8qQGYUlGBcaPJhKlSbJhmM7Blu3c_OtXWaT6cPOYCoTsyezguIeQceSlzybW1dK_54TexFRmKUi_cGtASbDiceakSkb6gLqX5qaOYVDfMo4UyPtduIeOoDbH5lL6MC54NOrVpx9heMkG2iPRw9Dn30m46ymMulSB20UYw_BUtDt-2aFRw9DnA3n-L7CRLWc.'
        }
    });

    // 注意这个返回的格式
    return response.data.data;
}

let pages = Array.from({length: 2}, (_, i) => i + 1)
// console.log(pages)

pages.forEach(page => {
    getData(page).then(res => {
        // console.log(res)
        console.log(JSON.parse(decrypt(res))['objects'])
    })
})