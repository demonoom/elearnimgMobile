import React from 'react'
import {getMyPurchaseCourseList} from '../../../fetch/my-course/my-course'
import ClassList from '../../../components/ClassList'

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
    }

    render() {
        return (
            <div>
                <h4 style={{textAlign: 'center'}}>正在直播</h4>
                <ClassList
                    courseList={this.state.courseList}
                />
            </div>
        )
    }
}

export default Living
