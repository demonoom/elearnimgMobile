import React from 'react'
import './style.less'
import {getMyPurchaseCourseList} from '../../../fetch/my-course/my-course'
import ClassList from '../../../components/ClassList'

class MyCourseLists extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            courseList: false,
            courseType: 'realLesson',
        }
    }

    componentDidMount() {
        getMyPurchaseCourseList(-1, '500001020').then((res) => {
            this.setState({courseList: res.response})
        })
    }

    typeOnChange = (courseType) => {
        this.setState({courseType})
    }

    render() {
        return (
            <div className='my_course_list'>
                <div className='tabTitle' style={{backgroundColor: 'white'}}>
                    <span className={this.state.courseType === 'realLesson' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'realLesson')}>实景课堂</span>
                    <span className={this.state.courseType === 'publicLesson' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'publicLesson')}>常规课堂</span>
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
