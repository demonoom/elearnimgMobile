import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast, Icon} from 'antd-mobile'
import PublicHeader from '../../components/PublicHeader'
import {getMyCollectCourseListV3} from '../../../src/fetch/my-collection/my-collection'
import ClassBox from '../../components/ClassBox'
import Filter from '../../components/Filter'
import LoadMore from '../../components/LoadMore'

class MyCollection extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            truelyHeight: '',
            filterDisplsy: false,
            myCollectionContent: [],
            page: 1,
            isLoadingMore: true,
            hasMoreClass: true,
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.MyCollection.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.MyCollection.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        var _this = this;
        this.setState({show: true})
        this.getMyCollectCourseListV3(localStorage.getItem("userId"), 1)
        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        const loadMore = document.querySelectorAll('.collect_content .load_more')[0]
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

        this.refs.collect_content.addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        })
    }

    getMyCollectCourseListV3(id, page) {
        /**
         * 获取我的收藏
         */
        getMyCollectCourseListV3(id, page).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({
                    myCollectionContent: this.state.myCollectionContent.concat(res.response),
                    page,
                    isLoadingMore: false,
                })
                if (page === res.pager.pageCount) {
                    this.setState({hasMoreClass: false})
                }

            } else {
                Toast.fail(res.msg, 2)
            }
        }).then(() => {
            if (page === 1) {
                this.setState({truelyHeight: this.refs.MyCollection.parentNode.offsetHeight})
            }
        })
    }

    /**
     * 右侧Icon被点击
     * @param word
     */
    iconOnClick = (word) => {
        this.setState({filterDisplsy: true})
    }

    /**
     * 加载更多数据
     */
    loadMoreDate = () => {
        this.setState({
            isLoadingMore: true
        }, () => {
            this.getMyCollectCourseListV3(localStorage.getItem("userId"), this.state.page + 1)
        })
    }

    render() {
        const myCollectionContent = this.state.myCollectionContent
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='my_collection positionBg' ref='MyCollection'>
                    <PublicHeader
                        title='我的收藏'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType='icon-shaixuan2'
                        iconClass='header-shaixuan'
                    />
                    <div className='collect_content'
                         ref='collect_content'
                         style={!myCollectionContent.length ? {textAlign: 'center', paddingTop: '.74rem'} : {}}>
                        {
                            myCollectionContent.length ? <ClassBox
                                classroomContent={myCollectionContent}
                                typeGuoLv={false}
                            /> : <Icon type='loading'/>
                        }
                        <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                                  hasMoreClass={this.state.hasMoreClass}
                                  loadMoreFn={this.loadMoreDate.bind(this)}/>
                    </div>
                    <Filter filterDisplsy={this.state.filterDisplsy}/>
                </div>
            </CSSTransition>
        )
    }
}

export default MyCollection
