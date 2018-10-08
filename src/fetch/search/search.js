import {post} from '../post'

/**
 * 新版搜索
 * @param pageNo
 * @param courseType 类别
 * @param courseSubject 科目
 * @param courseStatus
 * @param courseSort
 * @param courseGrade 年级
 * @param searchKeyWords
 * @returns {*}
 */
export function getCourseListV3(pageNo, courseType, courseSubject, courseStatus, courseSort, courseGrade, searchKeyWords) {
    const result = post({
        "method": 'getCourseListV3',
        "pageNo": pageNo,
        "courseType": courseType,
        "courseSubject": courseSubject,
        "courseProperty": '-1',
        "courseStatus": courseStatus,
        "courseSort": courseSort,
        "recommend": 0,
        "courseGrade": courseGrade,
        "courseOrder": 'desc',
        "searchKeyWords": searchKeyWords,
    })

    return result
}