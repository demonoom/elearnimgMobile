import {post, ajax} from '../post'

/**
 * 获取轮播图
 * 同时获取轮播图(num=1)和三个宣传视频(num=2)
 * @returns {*}
 */
export function findAdvanceAll() {
    const result = post({
        "method": 'findAdvanceAll'
    })

    return result
}

/**
 * 获取实景|常规课堂
 * @param pageNo
 * @param courseType
 * @param courseSubject
 * @param courseProperty
 * @param courseStatus
 * @param courseSort
 * @param recommend
 * @param courseGrade
 * @returns {*}
 */
export function getCourseListV3(pageNo, courseType, courseSubject, courseProperty, courseStatus, courseSort, recommend, courseGrade) {
    const result = post({
        "method": 'getCourseListV3',
        "pageNo": pageNo,
        "courseType": courseType,
        "courseSubject": courseSubject,
        "courseProperty": courseProperty,
        "courseStatus": courseStatus,
        "courseSort": courseSort,
        "recommend": recommend,
        "courseGrade": courseGrade,
        "courseOrder": 'desc',
    })
    return result
}

/**
 * 获取今日课程
 * @returns {*}
 */
export function getCourseByTodayV3() {
    var result = ajax({
        "method": "getCourseByTodayV3"
    }).then(res => {
        return res
    })

    return result
}