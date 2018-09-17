import {post} from '../post'

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
 * 制作list模拟数据
 * @returns {*}
 */
export function getElearningIndex() {
    const result = post({
        "method": 'getElearningIndex',
        "course_class": '29',
        "coursetypeid": '',
        "versionCode": '',
        "userId": '',
    })

    return result
}