import React from 'react'
import {CSSTransition} from 'react-transition-group'
import './style.less'
import {Toast} from 'antd-mobile'
import PublicHeader from '../../components/PublicHeader'

class BalanceRecharge extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            truelyHeight: '',
            inputValueHtml: '其他数额',
            moneyNum: 10,
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

    componentDidMount() {
        this.setState({show: true, truelyHeight: this.refs.balanceRecharge.parentNode.offsetHeight})
    }

    moneyBtnOnClick = (num) => {
        this.setState({moneyNum: num})
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
                    <div className='balance_content'>
                        <div className='rechargeAmount'>
                            <div>
                                请选择充值金额
                            </div>
                            <div>
                                <span onClick={this.moneyBtnOnClick.bind(this, '10')} className='moneyBtn'>10元</span>
                                <span onClick={this.moneyBtnOnClick.bind(this, '20')} className='moneyBtn'>20元</span>
                                <span onClick={this.moneyBtnOnClick.bind(this, '50')} className='moneyBtn'>50元</span>
                            </div>
                        </div>
                        <div className='rechargeMethod'>

                        </div>
                    </div>
                    <div className='balance_content_bottom'>
                        <div className='balance_content_bottom_left'>
                            需支付:¥{this.state.moneyNum}
                        </div>
                        <div className='balance_content_bottom_right'>立即充值</div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default BalanceRecharge
