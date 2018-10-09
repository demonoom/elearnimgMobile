import React from 'react'
import {CSSTransition} from 'react-transition-group'
import './style.less'
import PublicHeader from '../../components/PublicHeader'
import PayList from '../../components/PayList'
import {createRechargeOrder} from '../../fetch/balance-recharge/balance-recharge'
import {Toast} from 'antd-mobile'
import {SimpleWebsocketConnection} from '../../util/simple_websocket_connection'

let simpleMS = null
let orderNoNoom = null
var _this;

class BalanceRecharge extends React.Component {
    constructor(props, context) {
        super(props, context);
        _this = this;
        this.state = {
            show: false,
            truelyHeight: '',
            inputValueHtml: '其他数额',
            moneyNum: '10',
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
            this.refs.balanceRecharge.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.balanceRecharge.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentWillMount() {
        simpleMS = new SimpleWebsocketConnection();
        simpleMS.connect();
    }

    componentDidMount() {
        this.simpleListener()
        this.setState({show: true, truelyHeight: this.refs.balanceRecharge.parentNode.offsetHeight})
    }

    /**
     * 消息监听
     */
    simpleListener() {
        simpleMS.msgWsListener = {
            onError: function (errorMsg) {

            }, onWarn: function (warnMsg) {

            }, onMessage: function (info) {
                if (info.command === "elearning_recharge_complete") {
                    var orderNo = info.data.order_no;
                    if (orderNo === orderNoNoom) {
                        _this.setState({paySuccess: true})
                    }
                }
            }
        };
    }

    moneyBtnOnClick = (num) => {
        this.setState({moneyNum: num})
    }

    payTypeOnChange = (type) => {
        this.setState({payMethod: type})
    }

    createRechargeOrder = () => {
        createRechargeOrder(localStorage.getItem("userId"), this.state.payMethod, this.state.moneyNum).then((res) => {
            // createRechargeOrder(localStorage.getItem("userId"), this.state.payMethod, 0.01).then((res) => {

            if (res.msg === '调用成功' && res.success) {
                if (!!res.response.payUrl) {
                    // 客户端支付
                    orderNoNoom = res.response.orderNo
                    document.querySelectorAll('#charge_Iframe')[0].src = res.response.payUrl
                } else if (!!res.response.ewm) {
                    //扫码支付
                    orderNoNoom = res.response.orderNo
                    this.setState({scanFlag: true, scanSrc: res.response.ewm})
                }
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    render() {
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='my_balance positionBg' ref='balanceRecharge'>
                    <PublicHeader
                        title='余额充值'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType=''
                        iconClass=''
                    />

                    <div className="place_orderDiv whiteBg" style={{display: this.state.paySuccess ? 'block' : 'none'}}>
                        <div className="sign_success">
                            <i className="iconfont icon-chenggong"></i>
                            <div className="text">充值成功</div>
                        </div>
                    </div>

                    <div className="SaoCont" style={{display: this.state.scanFlag ? 'block' : 'none'}}>
                        <img src={this.state.scanSrc} alt=""/>
                        <div>请扫描二维码进行支付</div>
                    </div>

                    <div style={{display: !this.state.scanFlag ? (!this.state.paySuccess ? 'block' : 'none') : 'none',height:'100%'}}>
                        <div className='balance_content overflowScroll' style={{paddingBottom: '.45rem'}}>
                            <div className='rechargeAmount'>
                                <div className='title_color'>
                                    请选择充值金额
                                </div>
                                <div className='my_flex'>
                                <span onClick={this.moneyBtnOnClick.bind(this, '10')}
                                      className={this.state.moneyNum === '10' ? 'active' : ''}>10元</span>
                                    <span onClick={this.moneyBtnOnClick.bind(this, '20')}
                                          className={this.state.moneyNum === '20' ? 'active' : ''}>20元</span>
                                    <span onClick={this.moneyBtnOnClick.bind(this, '50')}
                                          className={this.state.moneyNum === '50' ? 'active' : ''}>50元</span>
                                </div>
                            </div>
                            <div className='rechargeMethod'>
                                <PayList rechargeFlag={true} payTypeOnChange={this.payTypeOnChange}/>
                            </div>
                        </div>
                        <div className='balance_content_bottom'>
                            <div className='balance_content_bottom_left'>
                                需支付：<span className='price'><span>¥</span>{this.state.moneyNum}</span>
                            </div>
                            <div className='balance_content_bottom_right' onClick={this.createRechargeOrder}>立即充值</div>
                        </div>
                    </div>
                    <iframe title='pay' id="charge_Iframe" src="" frameBorder="0" style={{display: 'none'}}></iframe>
                </div>
            </CSSTransition>
        )
    }
}

export default BalanceRecharge
