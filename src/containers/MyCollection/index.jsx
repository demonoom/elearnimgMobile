import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast, PullToRefresh, Icon} from 'antd-mobile'
import PublicHeader from '../../components/PublicHeader'
import {getMyCollectCourseListV3} from '../../../src/fetch/my-collection/my-collection'
import ClassBox from '../../components/ClassBox'
import LoadMore from '../../components/LoadMore'
import none_img from '../../static/img/none.png'

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
            refreshing: false,
            networkOver: false,
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
        this.changeTitleCol('black');
    }

    /**
     * 改变title颜色
     * @param col
     */
    changeTitleCol = (col) => {
        var dataCol = {
            method: 'changeTitleCol',
            col: col,
        };

        window.Bridge.callHandler(dataCol, null, function (error) {
            // Toast.info(error, 4)
        });
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
        this.changeTitleCol('black');
        this.refs.MyCollection.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        var _this = this;
        this.setState({show: true})
        this.getMyCollectCourseListV3(localStorage.getItem("userId"), 1, false)
        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        const loadMore = document.querySelectorAll('.collect_content_div .load_more')[0]
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

        document.querySelector('.collect_content_pull').addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        })
    }

    getMyCollectCourseListV3(id, page, flag) {
        /**
         * 获取我的收藏
         */
        getMyCollectCourseListV3(id, page).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({networkOver: true})
                if (flag) {
                    this.setState({
                        page,
                        isLoadingMore: false,
                        myCollectionContent: res.response,
                        refreshing: false,
                        hasMoreClass: true,
                    })
                } else {
                    this.setState({
                        myCollectionContent: this.state.myCollectionContent.concat(res.response),
                        page,
                        isLoadingMore: false,
                    })
                }
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
     * 加载更多数据
     */
    loadMoreDate = () => {
        this.setState({
            isLoadingMore: true
        }, () => {
            this.getMyCollectCourseListV3(localStorage.getItem("userId"), this.state.page + 1, false)
        })
    }

    handlePullToRefresh = () => {
        this.setState({refreshing: true}, () => {
            this.getMyCollectCourseListV3(localStorage.getItem("userId"), 1, true)
        });
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
                        iconType=''
                        iconClass=''
                    />
                    <PullToRefresh
                        className='overflowScroll collect_content_pull collect_content'
                        damping={130}
                        indicator={this.state.down ? {} : {deactivate: '上拉可以刷新'}}
                        direction={'down'}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handlePullToRefresh}
                    >
                        <div className='collect_content_div'>
                            {
                                myCollectionContent.length ? <ClassBox
                                    classroomContent={myCollectionContent}
                                    typeGuoLv={false}
                                /> : this.state.networkOver ? <div style={{textAlign: "center", paddingTop: '1rem'}}>
                                    <img src={none_img} alt=""/>
                                    <div style={{marginTop: '.2rem', fontSize: '.15rem', color: '#2A3350'}}>还没有内容哦</div>
                                </div> : <Icon type='loading'/>
                            }
                            <div style={myCollectionContent.length ? {display: 'block'} : {display: 'none'}}>
                                <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                                          hasMoreClass={this.state.hasMoreClass}
                                          loadMoreFn={this.loadMoreDate.bind(this)}/>
                            </div>

                        </div>
                    </PullToRefresh>
                </div>
            </CSSTransition>
        )
    }
}

export default MyCollection
