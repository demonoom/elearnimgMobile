import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import PublicHeader from '../../components/PublicHeader'
import {Button} from 'antd-mobile'

class MyBalance extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            truelyHeight: '',
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.MyBalance.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.MyBalance.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        this.setState({show: true, truelyHeight: this.refs.MyBalance.parentNode.offsetHeight})
    }

    iconOnClick = (word) => {
        this.props.history.push("/transactionhistory");
    }

    recharge = () => {
        this.props.history.push("/balancerecharge");
    }

    render() {
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='my_balance positionBg' ref='MyBalance'>
                    <PublicHeader
                        title='我的余额'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType='交易记录'
                        iconClass='header-jiaoyi'
                    />
                    <div className='balance_content whiteBg'>
                        <div className='account'>
                            <div className='text'>账户余额</div>
                            <div className='title_color'>0<span>元</span></div>
                        </div>
                        <div className='recharge_btn'>
                            <Button type="primary" onClick={this.recharge}>充值</Button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default MyBalance
