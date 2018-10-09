import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast} from 'antd-mobile'
import PublicHeader from '../../components/PublicHeader'
import PayList from '../../components/PayList'
import {getCourseByCourseId, createCourseOrder, yueBuyCourseV3} from '../../fetch/place-order/place-order'
import {SimpleWebsocketConnection} from '../../util/simple_websocket_connection'

let simpleMS = null
let orderNoNoom = null

var _this;

class PlaceOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        _this = this;
        this.state = {
            show: false,
            courseObj: false,
            payMethod: 'wxpayjs',
            paySuccess: false,
            scanFlag: false,
            scanSrc: ''
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.PlaceOrder.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.PlaceOrder.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentWillMount() {
        simpleMS = new SimpleWebsocketConnection();
        simpleMS.connect();
    }

    componentDidMount() {
        this.setState({show: true})
        this.simpleListener()
        this.setState({truelyHeight: this.refs.PlaceOrder.parentNode.offsetHeight})
        getCourseByCourseId(this.props.match.params.id).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({courseObj: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    /**
     * 消息监听
     */
    simpleListener() {
        simpleMS.msgWsListener = {
            onError: function (errorMsg) {

            }, onWarn: function (warnMsg) {

            }, onMessage: function (info) {
                if (info.command === "elearning_course_buy_complete") {
                    var orderNo = info.data.order_no;
                    if (orderNo === orderNoNoom) {
                        _this.setState({paySuccess: true})
                    }
                }
            }
        };
    }

    payTypeOnChange = (type) => {
        this.setState({payMethod: type})
    }

    pay = () => {

        if (this.state.payMethod === 'balance') {
            /**
             * 余额支付
             */
            yueBuyCourseV3(localStorage.getItem("userId"), 1).then((res) => {
                console.log(res);
            })
            return
        }

        createCourseOrder(localStorage.getItem("userId"), this.state.payMethod, this.state.courseObj.id, this.state.courseObj.money).then((res) => {

            if (res.msg === '调用成功' && res.success) {
                if (!!res.response.payUrl) {
                    // 客户端支付
                    orderNoNoom = res.response.orderNo
                    document.querySelectorAll('#pay_Iframe')[0].src = res.response.payUrl
                } else if (!!res.response.ewm) {
                    //扫码支付
                    orderNoNoom = res.response.orderNo
                    this.setState({scanFlag: true, scanSrc: res.response.ewm})
                } else {
                    // 免费
                    Toast.success('报名成功', 1)
                    setTimeout(function () {
                        window.history.back()
                    }, 1000)
                }
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    render() {
        const courseObj = this.state.courseObj
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='place_order positionBg' ref='PlaceOrder'>
                    <PublicHeader
                        title={this.props.match.params.type === '1' ? '确认报名' : '确认订单'}
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType=''
                        iconClass=''
                    />
                    <div className="place_orderDiv whiteBg" style={{display: this.state.paySuccess ? 'block' : 'none'}}>
                        <div className="sign_success">
                            <i className="iconfont icon-chenggong"></i>
                            <div className="text">报名成功</div>
                            <div>{courseObj.courseName}</div>
                        </div>
                    </div>
                    <div className="SaoCont" style={{display: this.state.scanFlag ? 'block' : 'none'}}>
                        <img src={this.state.scanSrc} alt=""/>
                        <div>请扫描二维码进行支付</div>
                    </div>
                    <div className="place_orderDiv"
                         style={{display: !this.state.scanFlag ? (!this.state.paySuccess ? 'block' : 'none') : 'none'}}>
                        <div className='place_order_content overflowScroll'>
                            <div className="orderMsg">
                                <div className="line_public">
                                    <div className="title">订单信息</div>
                                    <div className="my_flex font14">
                                        <div>订单名称：</div>
                                        <div className="rightCont">
                                            <div className="text_hidden">{courseObj.courseName}</div>
                                            <div className='font12'>
                                                <span>{courseObj.publisher}</span>
                                                <span>{courseObj.courseClass}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="orderMoney">
                                    订单金额：<span className="price"><span>¥ </span>{courseObj.money}</span>
                                </div>

                            </div>
                            <div className="payWay whiteBg"
                                 style={{display: courseObj.money === '0.00' ? "none" : 'block'}}>
                                <div className="payTitle">
                                    支付方式
                                </div>
                                <PayList rechargeFlag={false} payTypeOnChange={this.payTypeOnChange}/>
                            </div>
                        </div>
                        <div className='balance_content_bottom'>
                            <div className='balance_content_bottom_left'
                                 style={{display: courseObj.money === '0.00' ? "none" : 'block'}}>
                                需支付：<span className='price'><span>¥ </span>{courseObj.money}</span>
                            </div>
                            <div onClick={this.pay} className='balance_content_bottom_right'
                                 style={{width: courseObj.money === '0.00' ? "100%" : ''}}>{this.props.match.params.type === '1' ? '确认报名' : '确认支付'}</div>
                        </div>
                    </div>

                    <iframe title='pay' id="pay_Iframe" src="" frameBorder="0" style={{display: 'none'}}></iframe>
                </div>
            </CSSTransition>
        )
    }
}

export default PlaceOrder
