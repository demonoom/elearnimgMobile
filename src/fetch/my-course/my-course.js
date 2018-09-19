import {post} from '../post'

/**
 * 获取我的课程
 * @param pageNo
 * @param userId
 * @returns {*}
 */
export function getMyPurchaseCourseList(pageNo, userId) {
    const result = post({
        "method": 'getMyPurchaseCourseList',
        "pageNo": pageNo,
        "userId": userId,
        "coursetypeid": '',
        "versionCode": '',
    })

    return result
}