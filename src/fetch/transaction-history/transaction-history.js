import {post} from '../post'

/**
 * 获取消费记录
 * @param userId
 * @param pageNo
 * @param value
 * @returns {*}
 */
export function queryPageByOrder(userId, pageNo) {
    const result = post({
        "method": 'queryPageByOrder',
        "pageNo": pageNo,
        "person_id": userId,
        "channel": '',   //channel：antpay　区分消费记录为账户余额消费
        "status": '',
    })

    return result
}

/**
 * 获取充值记录
 * @param userId
 * @param pageNo
 * @returns {*}
 */
export function queryPageByRecharge(userId, pageNo) {
    const result = post({
        "method": 'queryPageByRecharge',
        "pageNo": pageNo,
        "personId": userId,
    })

    return result
}