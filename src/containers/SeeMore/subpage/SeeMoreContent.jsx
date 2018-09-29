import React from 'react'
import {getCourseListV3} from '../../../fetch/home/home'
import ClassList from '../../../components/ClassList'
import LoadMore from '../../../components/LoadMore'
import './style.less'
import {Toast} from "antd-mobile";

let loadMoreFlag = false

class SeeMoreContent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            coursePropertyOnClick: 'hot',
            courseProperty: 'all',
            courseSort: 'hot',
            courseType: this.props.courseType,
            hasMoreClass: true,
            courseList: [],
            page: 1,
            isLoadingMore: true,
            courseSubject: '-1',
            courseStatus: 'all',
            courseGrade: '-1',
        }
    }

    componentDidMount() {
        this.getCourseListV3()

        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        const loadMore = document.querySelectorAll('.class_list_seemore .load_more')[0]
        let timeoutId

        function callback() {
            if (loadMoreFlag) {
                loadMoreFlag = false
                return
            }
            const top = loadMore.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }

        this.refs.class_list_seemore.addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        })
    }

    getCourseListV3(flag) {
        getCourseListV3(this.state.page, this.state.courseType, this.state.courseSubject, this.state.courseProperty, this.state.courseStatus, this.state.courseSort, 0, this.state.courseGrade).then((res) => {

            if (res.msg === '调用成功' && res.success) {
                if (this.state.page === res.pager.pageCount) {
                    this.setState({hasMoreClass: false})
                }
                if (flag) {
                    this.setState({courseList: res.response, page: this.state.page + 1, isLoadingMore: false})
                } else {
                    this.setState({
                        courseList: this.state.courseList.concat(res.response),
                        page: this.state.page + 1,
                        isLoadingMore: false,
                    })
                }
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    courseTypeOnChange(type) {
        this.setState({
            courseType: type,
            page: 1,
            hasMoreClass: true,
            courseSubject: '-1',
            courseStatus: 'all',
            courseGrade: '-1'
        }, () => {
            this.getCourseListV3(true)
            loadMoreFlag = true
            this.refs.class_list_seemore.scrollTop = 0
        })
    }

    typeOnChange = (type) => {

        type === 'little' ? this.setState({
            courseSort: -1,
            courseProperty: type,
            coursePropertyOnClick: type,
            page: 1,
            hasMoreClass: true
        }, () => {
            this.getCourseListV3(true)
            loadMoreFlag = true
            this.refs.class_list_seemore.scrollTop = 0
        }) : this.setState({
            courseSort: type,
            courseProperty: 'all',
            coursePropertyOnClick: type,
            page: 1,
            hasMoreClass: true
        }, () => {
            this.getCourseListV3(true)
            loadMoreFlag = true
            this.refs.class_list_seemore.scrollTop = 0
        })
    }

    /**
     * 加载更多数据
     */
    loadMoreDate = () => {
        this.setState({
            isLoadingMore: true
        }, () => {
            this.getCourseListV3()
        })
    }

    filterOpen = () => {
        this.props.filterOpen()
    }

    filterMakeChose = (status, subject, grade) => {
        this.setState({
            courseSubject: subject, courseStatus: status, courseGrade: grade, page: 1,
            hasMoreClass: true
        }, () => {
            this.getCourseListV3(true)
            loadMoreFlag = true
            this.refs.class_list_seemore.scrollTop = 0
        })
    }

    render() {
        return (
            <div className='my_course_list'>
                <div className='tabTitle_index noPadding' style={{backgroundColor: 'white'}}>
                    <span className={this.state.coursePropertyOnClick === 'hot' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'hot')}>热门课程</span>
                    <span className={this.state.coursePropertyOnClick === 'mostnew' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'mostnew')}>最新课程</span>
                    <span className={this.state.coursePropertyOnClick === 'little' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'little')}>微课</span>
                    <span onClick={this.filterOpen} className="tabFilter">筛选<i className='icon-shaixuan2 iconfont'></i></span>
                </div>
                <div className='class_list class_list_seemore overflowScroll' ref='class_list_seemore'>
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

export default SeeMoreContent
