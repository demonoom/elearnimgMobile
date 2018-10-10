import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast, PullToRefresh} from 'antd-mobile'
import PublicHeader from '../../components/PublicHeader'
import {queryPageByOrderV3} from '../../../src/fetch/my-order/my-order'
import OrderList from '../../components/OrderList'
import LoadMore from '../../components/LoadMore'

class MyOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            truelyHeight: '',
            myOrderContent: [],
            page: 1,
            isLoadingMore: true,
            hasMoreClass: true,
            refreshing: false,
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.MyOrder.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.MyOrder.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        var _this = this;
        this.setState({show: true})
        this.queryPageByOrderV3(localStorage.getItem("userId"), 1, false)

        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        const loadMore = document.querySelectorAll('.order_content_div .load_more')[0]
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

        document.querySelector('.order_content_pull').addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        })
    }

    queryPageByOrderV3(id, page, flag) {
        queryPageByOrderV3(id, page).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                if (flag) {
                    this.setState({
                        page,
                        isLoadingMore: false,
                        myOrderContent: res.response,
                        refreshing: false,
                        hasMoreClass: true,
                    })
                } else {
                    this.setState({
                        myOrderContent: this.state.myOrderContent.concat(res.response),
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
                this.setState({truelyHeight: this.refs.MyOrder.parentNode.offsetHeight})
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
            this.queryPageByOrderV3(localStorage.getItem("userId"), this.state.page + 1, false)
        })
    }

    handlePullToRefresh = () => {
        this.setState({refreshing: true}, () => {
            this.queryPageByOrderV3(localStorage.getItem("userId"), 1, true)
        });
    }

    render() {
        const myOrderContent = this.state.myOrderContent
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='my_order positionBg' ref='MyOrder'>
                    <PublicHeader
                        title='我的订单'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType=''
                        iconClass=''
                    />
                    <PullToRefresh
                        className='overflowScroll order_content_pull order_content'
                        damping={60}
                        indicator={this.state.down ? {} : {deactivate: '上拉可以刷新'}}
                        direction={'down'}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handlePullToRefresh}
                    >
                        <div className='order_content_div'
                             ref='order_content'
                             style={!myOrderContent.length ? {textAlign: 'center', paddingTop: '.75rem'} : {}}
                        >
                            {
                                myOrderContent.length ? <OrderList
                                    myOrderContent={myOrderContent}
                                /> : <span>暂无订单</span>
                            }
                            <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                                      hasMoreClass={this.state.hasMoreClass}
                                      loadMoreFn={this.loadMoreDate.bind(this)}/>
                        </div>
                    </PullToRefresh>
                </div>
            </CSSTransition>
        )
    }
}

export default MyOrder
