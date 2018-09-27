import React from 'react'
import './style.less'
import {Tabs, Badge, Toast, Icon} from 'antd-mobile'
import {queryPageByOrder, queryPageByRecharge} from '../../../fetch/transaction-history/transaction-history'
import RecordList from '../../../components/RecordList'
import LoadMore from '../../../components/LoadMore'

class RecordTabs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            recordType: 0,
            recordArr: [],
            page: 1,
            isLoadingMore: true,
            hasMoreClass: true,
        }
    }

    componentDidMount() {
        var _this = this;
        this.queryRecord()
        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        const loadMoreLeft = document.querySelectorAll('#record_left .load_more')[0]
        const loadMoreRight = document.querySelectorAll('#record_right .load_more')[0]
        let timeoutId

        function callbackLeft() {
            const top = loadMoreLeft.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if (!_this.state.hasMoreClass) {
                return
            }
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }

        function callbackRight() {
            const top = loadMoreRight.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if (!_this.state.hasMoreClass) {
                return
            }
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }

        document.getElementById('record_left').parentNode.addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callbackLeft, 50)
        })

        document.getElementById('record_right').parentNode.addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callbackRight, 50)
        })
    }

    queryRecord() {
        this.state.recordType === 0 ? queryPageByRecharge(localStorage.getItem("userId"), this.state.page).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                if (this.state.page === res.pager.pageCount) {
                    this.setState({hasMoreClass: false})
                }
                this.setState({
                    recordArr: this.state.recordArr.concat(res.response),
                    isLoadingMore: false,
                    page: this.state.page + 1
                })
            } else {
                Toast.fail(res.msg, 2)
            }

        }) : queryPageByOrder(localStorage.getItem("userId"), -1).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                // if (this.state.page === res.pager.pageCount) {
                //     this.setState({hasMoreClass: false})
                // }
                this.setState({
                    recordArr: res.response,
                    isLoadingMore: false,
                    page: this.state.page + 1,
                    hasMoreClass: false
                })
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
            this.queryRecord()
        })
    }

    render() {

        const tabs = [
            {title: <Badge>充值记录</Badge>, index: 0},
            {title: <Badge>消费记录</Badge>, index: 1},
        ];

        const recordArr = this.state.recordArr

        return (
            <Tabs tabs={tabs}
                  initialPage={0}
                  swipeable={false}
                  animated={false}
                  useOnPan={false}
                  onChange={(tab, index) => {
                      this.setState({
                          recordType: index,
                          recordArr: [],
                          page: 1,
                          hasMoreClass: true,
                          isLoadingMore: true
                      }, () => {
                          this.queryRecord()
                      })
                  }}
            >
                <div id='record_left' style={!!recordArr ? {} : {textAlign: 'center', paddingTop: '.15rem'}}>
                    {
                        !!recordArr ? <RecordList
                            recordArr={recordArr}
                        /> : <Icon type='loading'/>
                    }
                    <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                              hasMoreClass={this.state.hasMoreClass}
                              loadMoreFn={this.loadMoreDate.bind(this)}/>
                </div>
                <div id='record_right' style={!!recordArr ? {} : {textAlign: 'center', paddingTop: '.15rem'}}>
                    {
                        !!recordArr ? <RecordList
                            recordArr={recordArr}
                        /> : <Icon type='loading'/>
                    }
                    <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                              hasMoreClass={this.state.hasMoreClass}
                              loadMoreFn={this.loadMoreDate.bind(this)}/>
                </div>
            </Tabs>
        )
    }
}

export default RecordTabs
