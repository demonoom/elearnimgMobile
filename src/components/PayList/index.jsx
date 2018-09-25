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
                <div>
                    <div>app支付</div>
                    <div>微信支付</div>
                    <div>支付宝支付</div>
                </div>
                <div>
                    <div>找人代付</div>
                    <div>微信扫码支付</div>
                    <div>支付宝扫码支付</div>
                </div>
            </div>
        )
    }
}

export default PayList