import React from 'react'
import './style.less'
import MyCourseLists from './subpage/MyCourseLists'

class MyCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        return (
            <div className='myCourse'>
                <div className='myCourseList_header'>我的课表<i className='iconfont icon-tubiao11'></i></div>
                <div className='myCourseList_content'>
                    <MyCourseLists/>
                </div>
            </div>
        )
    }
}

export default MyCourse
