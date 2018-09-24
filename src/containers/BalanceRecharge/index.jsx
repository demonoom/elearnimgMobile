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
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        this.setState({truelyHeight: this.refs.home.parentNode.offsetHeight})
        setTimeout((() => {
            this.refs.detil.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.balanceRecharge.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        this.setState({show: true})
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
                        123
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default BalanceRecharge
