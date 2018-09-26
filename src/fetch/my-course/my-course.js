import {post} from '../post'

/**
 * 获取我的课程(old)
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

/**
 * 新分页获取我的课程接口
 * @param pageNo
 * @param userId
 * @param courseSort
 * @returns {*}
 */
export function getMyPurchaseCourseListV3(pageNo, userId, courseSort) {
    const result = post({
        "method": 'getMyPurchaseCourseListV3',
        "pageNo": pageNo,
        "userId": userId,
        "courseSort": courseSort,
    })

    return result
}