import React from 'react'
import './style.less'
import {getMyPurchaseCourseList} from '../../../fetch/my-course/my-course'
import ClassList from '../../../components/ClassList'

class MyCourseLists extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            courseList: false,
        }
    }

    componentDidMount() {
        getMyPurchaseCourseList(-1, '500001020').then((res) => {
            this.setState({courseList: res.response})
        })
    }

    render() {
        return (
            <div className='my_course_list'>
                <div style={{backgroundColor: 'white'}}>
                    <span>实景课堂</span>
                    <span>常规课堂</span>
                </div>
                <div className='class_list'>
                    <ClassList
                        courseList={this.state.courseList}
                    />
                </div>
            </div>
        )
    }
}

export default MyCourseLists
