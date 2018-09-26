import React from 'react'
import './style.less'
import {getMyPurchaseCourseList, getMyPurchaseCourseListV3} from '../../../fetch/my-course/my-course'
import ClassList from '../../../components/ClassList'
import {Toast} from 'antd-mobile'

class MyCourseLists extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            courseList: false,
            courseType: 'mostnew',
        }
    }

    componentDidMount() {
        /**
         * 老版获取我的课程
         */
        getMyPurchaseCourseList(-1, '500001020').then((res) => {
            this.setState({courseList: res.response})
        })
        /*this.getMyPurchaseCourseList()*/
    }

    /**
     * 获取我的课程
     */
    getMyPurchaseCourseList() {
        getMyPurchaseCourseListV3(-1, '500001129', this.state.courseType).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({courseList: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    typeOnChange = (courseType) => {
        this.setState({courseType}, () => {
            this.getMyPurchaseCourseList()
        })
    }

    render() {
        return (
            <div className='my_course_list'>
                <div className='tabTitle' style={{backgroundColor: 'white'}}>
                    <span className={this.state.courseType === 'mostnew' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'mostnew')}>最新课程</span>
                    <span className="tabFilter">筛选<i className='icon-shaixuan2 iconfont'></i></span>
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
