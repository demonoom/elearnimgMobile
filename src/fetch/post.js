import 'whatwg-fetch'
import 'es6-promise'
import $ from 'jquery'

var isDebug = false;
var domain = isDebug ? '192.168.50.15:9007' : 'www.maaee.com'
var fetchUrl = 'http://' + domain + '/elearning/elearningControl/'

function obj2params(obj) {
    var result = encodeURI('params=' + JSON.stringify(obj));
    return result;
}

var phoneType = navigator.userAgent;
var phone;
if (phoneType.indexOf('iPhone') > -1 || phoneType.indexOf('iPad') > -1) {
    phone = 'ios'
} else {
    phone = 'android'
}

/**
 * ajax请求
 * @param paramsObj
 * @returns {Promise}
 */
export function ajax(paramsObj) {
    var res = new Promise((reslove, reject) => {
        $.ajax({
            type: "post",
            url: fetchUrl,
            data: obj2params(paramsObj),
            dataType: "json",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'accessUser': localStorage.getItem("userId") || '',
                'machineType': phone,
                'version': localStorage.getItem("version") || '',
            },
            success: function (result) {
                reslove(result)
            }, error: function (error) {
            }
        });
    });

    return res

}

// 发送 post 请求
export function post(paramsObj) {
    var result = fetch(fetchUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessUser': localStorage.getItem("userId") || '',
            'machineType': phone,
            'version': localStorage.getItem("version") || '',
        },
        body: obj2params(paramsObj)
    }).then(res => {
        return res.json()
    });

    return result;
}


