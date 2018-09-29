import {post} from '../post'

/**
 * 评论
 * @returns {*}
 */
export function addEvaluate(videoNum, videoId, courseId, content, level, userId) {
    const result = post({
        "method": 'addEvaluate',
        "videoId": videoId,
        "videoNum": videoNum,
        "courseId": courseId,
        "content": content,
        "level": level,
        "userId": userId,
    })
    return result
}