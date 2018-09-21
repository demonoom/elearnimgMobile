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
        }
    }

    componentDidMount() {
        this.setState({show: true})
    }

    iconOnClick(word) {
        console.log(word);
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
                        title='我的余额'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType='交易记录'
                        iconClass='header-jiaoyi'
                    />
                    <div className='balance_content'>
                        <div className='account'>
                            <div className='text'>账户余额</div>
                            <div className='title_color'>0<span>元</span></div>
                        </div>
                        <div className='recharge_btn'>
                            <Button type="primary">充值</Button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default MyBalance
