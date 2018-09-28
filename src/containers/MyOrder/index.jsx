import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast, Icon} from 'antd-mobile'
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
        this.queryPageByOrderV3(localStorage.getItem("userId"), 1)

        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        const loadMore = document.querySelectorAll('.order_content .load_more')[0]
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

        this.refs.order_content.addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        })
    }

    queryPageByOrderV3(id, page) {
        queryPageByOrderV3(id, page).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({
                    myOrderContent: this.state.myOrderContent.concat(res.response),
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
            this.queryPageByOrderV3(localStorage.getItem("userId"), this.state.page + 1)
        })
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
                    <div className='order_content overflowScroll'
                         ref='order_content'
                         style={!myOrderContent.length ? {textAlign: 'center', paddingTop: '.75rem'} : {}}
                    >
                        {
                            myOrderContent.length ? <OrderList
                                myOrderContent={myOrderContent}
                            /> : <Icon type='loading'/>
                        }
                        <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                                  hasMoreClass={this.state.hasMoreClass}
                                  loadMoreFn={this.loadMoreDate.bind(this)}/>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default MyOrder
