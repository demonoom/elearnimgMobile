import {post} from '../post'

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