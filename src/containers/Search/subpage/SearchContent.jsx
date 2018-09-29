import React from 'react'
import './style.less'
import ClassBox from '../../../components/ClassBox'
import LoadMore from '../../../components/LoadMore'
import {getCourseListV3} from '../../../fetch/search/search'
import {Toast} from 'antd-mobile'

class SearchContent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchResponse: [],
            page: 1,
            isLoadingMore: true,
            hasMoreClass: true,
            searchValue: '',
            courseProperty: 'all',
            courseSort: 'hot',
            courseType: '-1',
            courseSubject: '-1',
            courseStatus: 'all',
            courseGrade: '-1',
        }
    }

    lisitenDom = () => {
        var _this = this;
        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        const loadMore = document.querySelectorAll('.search_response .load_more')[0]
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

        this.refs.search_response.addEventListener('scroll', () => {
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
     * 搜索课程
     * @param value
     */
    getCourseListV3 = (value, falg) => {
        if (falg) {
            this.setState({
                page: 1,
                searchValue: value,
                hasMoreClass: true,
                courseProperty: 'all',
                courseSort: 'hot',
                courseType: 'sjkc',
                courseSubject: '-1',
                courseStatus: 'all',
                courseGrade: '-1',
            }, () => {
                this.searchList(value, falg)
            })
        } else {
            this.setState({searchValue: value}, () => {
                this.searchList(value, falg)
            })
        }
    }

    searchList(value, falg) {
        getCourseListV3(this.state.page, this.state.courseType, this.state.courseSubject, this.state.courseStatus, this.state.courseSort, this.state.courseGrade, value).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                if (this.state.page === res.pager.pageCount) {
                    this.setState({hasMoreClass: false})
                }
                this.setState({
                    searchResponse: this.state.searchResponse.concat(res.response),
                    page: this.state.page + 1,
                    isLoadingMore: false,
                })
                if (falg) {
                    this.setState({searchResponse: res.response})
                } else {
                    this.setState({searchResponse: this.state.searchResponse.concat(res.response)})
                }
                if (res.success.length !== 0) {
                    this.lisitenDom()
                }
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    /**
     * 加载更多数据
     */
    loadMoreDate = () => {
        this.setState({
            isLoadingMore: true
        }, () => {
            this.getCourseListV3(this.state.searchValue, false)
        })
    }

    changeCourseSort = (type) => {
        this.setState({courseSort: type, page: 1, hasMoreClass: true}, () => {
            this.searchList(this.state.searchValue, true)
        })
    }

    filterOpen = () => {
        this.props.filterOpen()
    }

    render() {
        const searchResponse = this.state.searchResponse
        return (
            <div className='search_content'>
                {searchResponse.length === 0 ? <div className='search_history'>
                        <div className='topCont'>
                            <span>最近搜索</span>
                            <span>清空搜索记录</span>
                        </div>
                        <div className='searchTagCont'>
                            <span className='grayTag_deep title_color'>传统节日</span>
                        </div>
                    </div> :
                    <div style={{height: '100%'}}>
                        <div className='tabTitle' style={{paddingTop: '.15rem'}}>
                            <span className={this.state.courseSort === 'hot' ? 'active' : ''}
                                  onClick={this.changeCourseSort.bind(this, 'hot')}>按热度排序</span>
                            <span className={this.state.courseSort === 'mostnew' ? 'active' : ''}
                                  onClick={this.changeCourseSort.bind(this, 'mostnew')}>最新课程</span>
                            <span className="tabFilter" onClick={this.filterOpen}>筛选<i
                                className='icon-shaixuan2 iconfont'></i></span>
                        </div>
                        <div className='search_response overflowScroll' ref='search_response'>
                            <ClassBox
                                classroomContent={searchResponse}
                                typeGuoLv={false}
                            />
                            <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                                      hasMoreClass={this.state.hasMoreClass}
                                      loadMoreFn={this.loadMoreDate.bind(this)}/>
                        </div>
                    </div>}
            </div>
        )
    }
}

export default SearchContent
