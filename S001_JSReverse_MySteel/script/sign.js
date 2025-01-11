const md5 = require('md5')

function getSign(appSec, path) {
    const timestamp = new Date().getTime();
    var path = "path" + path + "timestamp" + timestamp + "version1.0.0" + appSec;
    return [md5(path).toUpperCase(), timestamp]
}


function getSignList(){
    const href = "//index.mysteel.com/api/pricetrend/getChartMultiCity.htm"

    // 得到：/api/pricetrend/getChartMultiCity.htm
    const signPath = href.match(/.com(\S*).htm/)[1] + '.htm';
    // var signArr = getSign('3BA6477330684B19AA6AF4485497B5F2',signPath)

    let key = "97e3d765c8574f35";
    if (signPath.indexOf("getChartMultiCatalog.htm") !== -1) {
        key = "a57f694a4dae4918"
    }

    return getSign(key, signPath)
}

// console.log(getSignList())