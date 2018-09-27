import {post} from '../post'

/**
 * 获取课程详情
 * @param courseId
 * @param userId
 * @returns {*}
 */
export function findCourseByCourseId(courseId, userId) {
    const result = post({
        "method": 'getCourseByCourseId',
        "id": courseId,
        "publisher_id": userId
    })
    return result
}

/**
 * 获取评价
 * @param courseId
 * @param pageNo
 * @returns {*}
 */
export function queryEvaluatePageByCourseId(courseId, pageNo) {
    const result = post({
        "method": 'queryEvaluatePageByCourseId',
        "courseId": courseId,
        "pageNo": pageNo
    })
    return result
}