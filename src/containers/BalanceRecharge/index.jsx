import React from 'react'
import {CSSTransition} from 'react-transition-group'
import './style.less'
import PublicHeader from '../../components/PublicHeader'
import PayList from '../../components/PayList'

class BalanceRecharge extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            truelyHeight: '',
            inputValueHtml: '其他数额',
            moneyNum: '10',
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

    payTypeOnChange(type) {
        console.log(type);
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
                    <div className='balance_content' style={{paddingBottom: '.45rem'}}>
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
                        <div className='balance_content_bottom_right'>立即充值</div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default BalanceRecharge
