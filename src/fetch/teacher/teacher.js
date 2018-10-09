import {post} from '../post'

/**
 * 获取教师信息
 * @param colUid
 * @returns {*}
 */
export function findUserById(colUid) {
    const result = post({
        "method": 'findUserById',
        "colUid": colUid,
    })

    return result
}

/**
 * 获取老师的课程
 * @param personId
 * @param pageNo
 * @returns {*}
 */
export function findCourseByTeacherId(personId, pageNo) {
    const result = post({
        "method": 'findCourseByTeacherId',
        "personId": personId,
        "pageNo": pageNo,
    })

    return result
}

/**
 * 获取老师评价
 * @param userId
 * @param pageNo
 * @returns {*}
 */
export function findEvaluateByTeacherId(userId, pageNo) {
    const result = post({
        "method": 'findEvaluateByTeacherId',
        "userId": userId,
        "pageNo": pageNo,
    })

    return result
}