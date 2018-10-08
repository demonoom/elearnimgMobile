import {post} from '../post'

/**
 *  充值
 * @param userId
 * @param channel
 * @param payPrice
 * @returns {*}
 */
export function createRechargeOrder(userId, channel, payPrice) {
    const result = post({
        "method": 'createRechargeOrder',
        "payPrice": payPrice,
        "channel": channel,
        "userId": userId,
    })
    return result
}
