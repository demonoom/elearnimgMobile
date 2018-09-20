import {post} from '../post'

/**
 * 获取我收藏的课程
 * @param pageNo
 * @param userId
 * @returns {*}
 */
export function listCourseByCollect(userId, pageNo) {
    const result = post({
        "method": 'listCourseByCollect',
        "pageNo": pageNo,
        "isseries": '',
        "coursetypeid": '',
        "person_id": userId,
    })

    return result
}