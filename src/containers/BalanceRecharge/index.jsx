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
        }
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
                <div className='my_balance positionBg'>
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
