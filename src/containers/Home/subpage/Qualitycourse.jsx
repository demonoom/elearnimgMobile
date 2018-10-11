import React from 'react'
import {getCourseListV3} from '../../../fetch/home/home'
import './style.less'
import {Toast} from 'antd-mobile'
import ClassBox from '../../../components/ClassBox'
import LoadMore from '../../../components/LoadMore'

class Qualitycourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            courseType: '-1',
            recommend: '1',
            classroomContent: [],
            page: 1,
            isLoadingMore: true,
            hasMoreClass: true,
        }
    }

    componentDidMount() {
        var _this = this;
        this.getCourseListV3(false)

        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        const loadMore = document.querySelectorAll('.quality_course .load_more')[0]
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

        document.querySelector('.home_content').addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        })
    }

    getCourseListV3 = (flag) => {
        getCourseListV3(this.state.page, this.state.courseType, -1, -1, 'all', 'hot', this.state.recommend, -1).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                if (this.state.page === res.pager.pageCount) {
                    this.setState({hasMoreClass: false})
                }

                if (flag) {
                    this.setState({
                        classroomContent: res.response,
                        page: this.state.page + 1,
                        isLoadingMore: false,
                    })
                } else {
                    this.setState({
                        classroomContent: this.state.classroomContent.concat(res.response),
                        page: this.state.page + 1,
                        isLoadingMore: false,
                    })
                }

            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    changeCoruseType = (type) => {
        type === 'recommend' ? this.setState({page: 1, courseType: '-1', recommend: 1, hasMoreClass: true}, () => {
            this.getCourseListV3(true)
        }) : this.setState({page: 1, courseType: type, recommend: 0, hasMoreClass: true}, () => {
            this.getCourseListV3(true)
        })
    }

    /**
     * 加载更多数据
     */
    loadMoreDate = () => {
        this.setState({
            isLoadingMore: true
        }, () => {
            this.getCourseListV3(false)
        })
    }

    render() {

        return (
            <div className='quality_course'>
                <h4 className='title_color same_title noBottom noTop' style={{textAlign: 'center'}}>
                    精品课程
                </h4>
                <ClassBox
                    ref='classBoxSj'
                    changeCoruseType={this.changeCoruseType}
                    classroomContent={this.state.classroomContent}
                    typeGuoLv={true}
                />
                <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                          hasMoreClass={this.state.hasMoreClass}
                          loadMoreFn={this.loadMoreDate.bind(this)}/>
            </div>
        )
    }
}

export default Qualitycourse
