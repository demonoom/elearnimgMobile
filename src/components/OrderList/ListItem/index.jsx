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
                <div className='orderNum line_public'>
                    <span>订单号:{orderObj.id}</span>
                    <span className='time'>{FormatTime.formatYMD(orderObj.createTime)}</span>
                </div>
                <div className='title_color text_hidden'>{orderObj.course.courseName}</div>
                <div className='bottom'>
                    <span className='teacherName text_hidden'>老师：{
                        orderObj.course.users.map((v, i) => {
                            return <span key={i}>{
                                v.userName
                            }</span>
                        })
                    }</span>
                    {orderObj.course.money === '0.00' ? <span className='free'>免费</span> : <span className='price'>¥ {orderObj.course.money}</span>}
                </div>
            </div>
        )
    }
}

export default ListItem