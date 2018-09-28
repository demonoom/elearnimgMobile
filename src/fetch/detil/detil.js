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

/**
 * 收藏
 * @param person_id
 * @param course_id
 * @returns {*}
 */
export function addCollection(person_id, course_id) {
    const result = post({
        "method": 'addCollection',
        "person_id": person_id,
        "course_id": course_id
    })
    return result
}

/**
 * 取消收藏
 * @param person_id
 * @param course_id
 * @returns {*}
 */
export function updateCollection(person_id, course_id) {
    const result = post({
        "method": 'updateCollection',
        "person_id": person_id,
        "course_id": course_id
    })
    return result
}