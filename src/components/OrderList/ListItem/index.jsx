import React from 'react'
import './style.less'
import FormatTime from '../../../util/formatTime'

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const orderObj = this.props.orderObj

        return (
            <div id="orderListItem">
                <div>
                    <span>订单号:{orderObj.id}</span>
                    <span>{FormatTime.formatYMD(orderObj.createTime)}</span>
                </div>
                <div>{orderObj.course.courseName}</div>
                <div>
                    <span>老师:{
                        orderObj.course.users.map((v, i) => {
                            return <span key={i}>{
                                v.userName
                            }</span>
                        })
                    }</span>
                    <span>{orderObj.course.money === '0.00' ? '免费' : orderObj.course.money}</span>
                </div>
            </div>
        )
    }
}

export default ListItem