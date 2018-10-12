import {ajax} from '../post'

export function getCourseByTodayV3ByTime(startTime, endTime) {
    var result = ajax({
        "method": 'getCourseByTodayV3',
        "pageNo": 1,
        "startTime": startTime,
        "endTime": endTime,
    }).then(res => {
        return res
    })
    return result
}