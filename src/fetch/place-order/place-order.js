import {post} from '../post'

/**
 * 根据课程id获取课程
 * @param id
 * @returns {*}
 */
export function getCourseByCourseId(id) {
    const result = post({
        "method": "getCourseByCourseId",
        "id": id,
        "publisher_id": '',
    })

    return result
}