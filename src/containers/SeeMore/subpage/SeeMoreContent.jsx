import React from 'react'
import {getMyPurchaseCourseList} from '../../../fetch/my-course/my-course'
import ClassList from '../../../components/ClassList'
import LoadMore from '../../../components/LoadMore'
import './style.less'
import {Toast} from "antd-mobile";

class SeeMoreContent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            courseType: 'public',
            courseList: [],
            page: 1,
            isLoadingMore: true
        }
    }

    componentDidMount() {
        this.getMyPurchaseCourseList(1, '500001020')

        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        const loadMore = document.querySelectorAll('.load_more')[0]
        let timeoutId

        function callback() {
            const top = loadMore.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }

        this.refs.class_list.addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        })
    }

    getMyPurchaseCourseList = (page, id) => {
        //用我的课程模拟数据
        getMyPurchaseCourseList(page, id).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({courseList: this.state.courseList.concat(res.response), page, isLoadingMore: false})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    typeOnChange = (courseType) => {
        this.setState({courseType}, () => {

        })
    }

    /**
     * 加载更多数据
     */
    loadMoreDate = () => {
        this.setState({
            isLoadingMore: true
        }, () => {
            this.getMyPurchaseCourseList(this.state.page + 1, '500001020')
        })
    }

    render() {
        return (
            <div className='my_course_list'>
                <div className='tabTitle' style={{backgroundColor: 'white'}}>
                    <span className={this.state.courseType === 'public' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'public')}>精选公开课</span>
                    <span className={this.state.courseType === 'hotclass' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'hotclass')}>热门课程</span>
                    <span className={this.state.courseType === 'mostnew' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'mostnew')}>最新课程</span>
                    <span className={this.state.courseType === 'weiclass' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'weiclass')}>微课</span>
                </div>
                <div className='class_list' ref='class_list'>
                    <ClassList
                        courseList={this.state.courseList}
                    />
                    <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                              loadMoreFn={this.loadMoreDate.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default SeeMoreContent
