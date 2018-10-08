import {post} from '../post'

/**
 * 根据课程id获取课程
 * @param id
 * @returns {*}
 */
export function getCourseByCourseId(id) {
    const result = post({
        "method": "getCourseByCourseId",
        "id": id,
        "publisher_id": '',
    })

    return result
}

/**
 * 创建订单
 * @param userId
 * @param channel
 * @param courseId
 * @param coursePrice
 * @returns {*}
 */
export function createCourseOrder(userId, channel, courseId, coursePrice) {
    const result = post({
        "method": "createCourseOrder",
        "userId": userId,
        "channel": channel,
        "courseId": courseId,
        "coursePrice": coursePrice,
    })

    return result
}

/**
 * 余额支付
 * @param userId
 * @param price
 * @returns {*}
 */
export function yueBuyCourseV3(userId, price) {
    const result = post({
        "method": "yueBuyCourseV3",
        "userId": userId,
        "price": price,
    })

    return result
}