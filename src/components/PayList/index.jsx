import React from 'react'
import './style.less'

class PayList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {

        return (
            <div id="pay_list">
                <div className='payItem'>
                    <div className='title_color'>app支付</div>
                    <div className='cont'>
                        <div className='active'>微信支付</div>
                        <div >支付宝支付</div>
                    </div>
                </div>
                <div className='payItem'>
                    <div className='title_color'>找人代付</div>
                    <div className='cont paySao'>
                        <div>微信扫码支付</div>
                        <div>支付宝扫码支付</div>
                    </div>
                </div>
                <div className="textDec">
                    充值成功后无法退款，不可提现
                </div>
            </div>
        )
    }
}

export default PayList