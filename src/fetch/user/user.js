import {post} from '../post'

/**
 * 获取用户信息
 * @param userId
 * @returns {*}
 */
export function findUserById(userId) {
    const result = post({
        "method": 'findUserById',
        "colUid": userId,
    })

    return result
}