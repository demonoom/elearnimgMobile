import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast} from 'antd-mobile'
import PublicHeader from '../../components/PublicHeader'
import PayList from '../../components/PayList'
import {getCourseByCourseId} from '../../fetch/place-order/place-order'
import {SimpleWebsocketConnection} from '../../util/simple_websocket_connection'

let simpleMS = null

class PlaceOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            courseObj: false,
            payMethod: 'wxpayjs',
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
                console.log(info);
            }
        };
    }

    payTypeOnChange = (type) => {
        this.setState({payMethod: type})
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
                    <div className='place_order_content'>
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
                        <div className="payWay whiteBg">
                            <div className="payTitle">
                                支付方式
                            </div>
                            <PayList rechargeFlag={false} payTypeOnChange={this.payTypeOnChange}/>
                        </div>

                        <div className='balance_content_bottom'>
                            <div className='balance_content_bottom_left'>
                                需支付：<span className='price'><span>¥</span>149</span>
                            </div>
                            <div
                                className='balance_content_bottom_right'>{this.props.match.params.type === '1' ? '确认报名' : '确认支付'}</div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default PlaceOrder
