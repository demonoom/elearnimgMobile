import {post} from '../post'

/**
 * 获取我的订单
 * @param pageNo
 * @param userId
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