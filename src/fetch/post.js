import 'whatwg-fetch'
import 'es6-promise'

var isDebug = false;
var domain = isDebug ? '192.168.50.15:9007' : 'www.maaee.com'
var fetchUrl = 'http://' + domain + '/elearning/elearningControl/'

function obj2params(obj) {
    var result = encodeURI('params=' + JSON.stringify(obj));
    return result;
}

// 发送 post 请求
export function post(paramsObj) {
    var result = fetch(fetchUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessUser': '',
            'machineType': 'web',
            'version': '1.0'
        },
        body: obj2params(paramsObj)
    }).then(res => {
        return res.json()
    });

    return result;
}


