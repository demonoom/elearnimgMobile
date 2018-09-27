import React from 'react'
import './style.less'
import {getMyPurchaseCourseListV3} from '../../../fetch/my-course/my-course'
import ClassList from '../../../components/ClassList'
import {Toast} from 'antd-mobile'
import LoadMore from '../../../components/LoadMore'

class MyCourseLists extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            courseType: 'mostnew',
            page: 1,
            isLoadingMore: true,
            courseList: [],
            hasMoreClass: true,
        }
    }

    componentDidMount() {
        var _this = this
        /**
         * 获取我的课程
         */
        this.getMyPurchaseCourseList(1, localStorage.getItem("userId"))

        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        const loadMore = document.querySelectorAll('.class_list_myCourse .load_more')[0]
        let timeoutId

        function callback() {
            const top = loadMore.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if (!_this.state.hasMoreClass) {
                return
            }
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }

        this.refs.class_list_myCourse.addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        })
    }

    /**
     * 获取我的课程
     */
    getMyPurchaseCourseList(page, id) {
        getMyPurchaseCourseListV3(page, id, this.state.courseType).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({
                    courseList: this.state.courseList.concat(res.response),
                    page,
                    isLoadingMore: false,
                }, () => {
                    if (page === 1) {
                        this.props.setTruelyHeight()
                    }
                })
                if (page === res.pager.pageCount) {
                    this.setState({hasMoreClass: false})
                }
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    typeOnChange = (courseType) => {
        this.setState({courseType}, () => {
            this.getMyPurchaseCourseList(1, localStorage.getItem("userId"))
        })
    }

    /**
     * 加载更多数据
     */
    loadMoreDate = () => {
        this.setState({
            isLoadingMore: true
        }, () => {
            this.getMyPurchaseCourseList(this.state.page + 1, localStorage.getItem("userId"))
        })
    }

    render() {
        return (
            <div className='my_course_list'>
                <div className='tabTitle' style={{backgroundColor: 'white'}}>
                    <span className={this.state.courseType === 'mostnew' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'mostnew')}>最新课程</span>
                    {/*<span className="tabFilter">筛选<i className='icon-shaixuan2 iconfont'></i></span>*/}
                </div>
                <div className='class_list class_list_myCourse' ref='class_list_myCourse'>
                    <ClassList
                        courseList={this.state.courseList}
                    />
                    <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                              hasMoreClass={this.state.hasMoreClass}
                              loadMoreFn={this.loadMoreDate.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default MyCourseLists
