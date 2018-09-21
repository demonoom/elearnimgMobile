import React from 'react'
import {getMyPurchaseCourseList} from '../../../fetch/my-course/my-course'
// import {getCourseByTodayV3} from '../../../fetch/home/home'
import ClassList from '../../../components/ClassList'
import './style.less'
import {Toast} from 'antd-mobile'

class Living extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {
        //用我的课程模拟数据
        getMyPurchaseCourseList(-1, '500001020').then((res) => {
            this.setState({courseList: res.response.splice(0, 2)})
        })

        /*getCourseByTodayV3().then((res) => {
            if (res.msg === '调用成功' && res.success) {
                console.log(res.response);
            } else {
                Toast.fail(res.msg, 2)
            }
        })*/
    }

    render() {
        return (
            <div>
                <h4 className='title_color same_title noBottom' style={{textAlign: 'center'}}>正在直播</h4>
                <ClassList
                    courseList={this.state.courseList}
                />
            </div>
        )
    }
}

export default Living
