import {post} from '../post'

/**
 * 获取课程详情
 * @param courseId
 * @param userId
 * @returns {*}
 */
export function findCourseByCourseId(courseId, userId) {
    const result = post({
        "method": 'findCourseByCourseId',
        "id": courseId,
        "publisher_id": userId
    })
    return result
}