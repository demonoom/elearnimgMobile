import {post} from '../post'

/**
 * 搜索课程
 * @param userId
 * @param pageNo
 * @param value
 * @returns {*}
 */
export function listCourseByKeyWords(userId, pageNo, value) {
    const result = post({
        "method": 'listCourseByKeyWords',
        "pageNo": pageNo,
        "userId": userId,
        "searchKeyWords": value,   //channel：antpay　区分消费记录为账户余额消费
        "versionCode": '',
    })

    return result
}