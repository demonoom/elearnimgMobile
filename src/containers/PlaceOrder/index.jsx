import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast} from 'antd-mobile'
import PublicHeader from '../../components/PublicHeader'
import PayList from '../../components/PayList'
import {getCourseByCourseId} from '../../fetch/place-order/place-order'

class PlaceOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            courseObj: false,
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

    componentDidMount() {
        this.setState({show: true})
        this.setState({truelyHeight: this.refs.PlaceOrder.parentNode.offsetHeight})
        getCourseByCourseId(this.props.match.params.id).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({courseObj: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    render() {
        const courseObj = this.state.courseObj
        console.log(courseObj);
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
                        <div>
                            <div>订单信息</div>
                            <div>订单名称:
                                <span>{courseObj.courseName}</span>
                                <span>{courseObj.publisher}</span>
                                <span>{courseObj.courseClass}</span>
                            </div>
                        </div>
                        <div>
                            订单金额:¥{courseObj.money}
                        </div>
                        <div>
                            支付方式
                        </div>
                        <PayList rechargeFlag={false}/>
                        <div>
                            <span>需支付:¥149</span>
                            <span>{this.props.match.params.type === '1' ? '确认报名' : '确认支付'}</span>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default PlaceOrder
