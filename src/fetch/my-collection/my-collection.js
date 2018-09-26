import {post} from '../post'

/**
 * 获取我的收藏
 * @param userId
 * @param pageNo
 * @returns {*}
 */
export function getMyCollectCourseListV3(userId, pageNo) {
    const result = post({
        "method": 'getMyCollectCourseListV3',
        "pageNo": pageNo,
        "userId": userId,
    })

    return result
}