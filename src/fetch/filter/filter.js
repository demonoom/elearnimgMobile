import {post} from '../post'

/**
 * 获取课程查询参数
 * @returns {*}
 */
export function getCourseSearchParamsV3() {
    const result = post({
        "method": 'getCourseSearchParamsV3'
    })
    return result
}