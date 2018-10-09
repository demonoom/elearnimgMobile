import React from 'react'
import './style.less'

class PayList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            payMethod: 'wxpayjs'
        }
    }

    payMethodOnChange = (method) => {
        this.setState({payMethod: method})
        this.props.payTypeOnChange(method)
    }

    render() {

        return (
            <div id="pay_list">
                <div className='payItem'>
                    <div className='title_color'>app支付</div>
                    <div className='cont'>
                        <div onClick={this.payMethodOnChange.bind(this, 'wxpayjs')}
                             className={this.state.payMethod === 'wxpayjs' ? 'active' : ''}>微信支付
                        </div>
                        <div onClick={this.payMethodOnChange.bind(this, 'alipayjs')}
                             className={this.state.payMethod === 'alipayjs' ? 'active' : ''}>支付宝支付
                        </div>
                    </div>
                </div>
                <div className='payItem'>
                    <div className='title_color'>找人代付</div>
                    <div className='cont paySao'>
                        <div onClick={this.payMethodOnChange.bind(this, 'wxpayqr')}
                             className={this.state.payMethod === 'wxpayqr' ? 'active' : ''}>微信扫码支付
                        </div>
                        <div onClick={this.payMethodOnChange.bind(this, 'alipayqr')}
                             className={this.state.payMethod === 'alipayqr' ? 'active' : ''}>支付宝扫码支付
                        </div>
                    </div>
                </div>
                {/*<div className='payItem' style={{display: !this.props.rechargeFlag ? '' : 'none'}}>*/}
                    {/*<div className='title_color'>其他支付</div>*/}
                    {/*<div className='cont elsePay'>*/}
                        {/*<div onClick={this.payMethodOnChange.bind(this, 'balance')}*/}
                             {/*className={this.state.payMethod === 'balance' ? 'active' : ''}>余额支付*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="textDec" style={{display: this.props.rechargeFlag ? '' : 'none'}}>
                    充值成功后无法退款，不可提现
                </div>
            </div>
        )
    }
}

export default PayList