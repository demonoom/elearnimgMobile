import {post} from '../post'

export function getCourseByTodayV3ByTime(startTime, endTime) {
    const result = post({
        "method": 'getCourseByTodayV3',
        "pageNo": 1,
        "startTime": startTime,
        "endTime": endTime,
    })

    return result
}