import {post} from '../post'

/**
 * 发送验证码
 * @param phone
 * @returns {*}
 */
export function sendMessagebindPhone(phone) {
    const result = post({
        "method": 'sendMessagebindPhone',
        "phone": phone,
    })
    return result
}

/**
 * 绑定手机
 * @param phone
 * @param message
 * @returns {*}
 */
export function validMessagePhoneV3(phone, message) {
    const result = post({
        "method": 'validMessagePhoneV3',
        "phone": phone,
        "message": message,
    })
    return result
}

export function updateUserV3(phone, userName, userId) {
    const result = post({
        "method": 'updateUserV3',
        "phone": phone,
        "userName": userName,
        "sendMessage": true,
        "userId": userId,
    })
    return result
}