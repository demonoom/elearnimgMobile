import React from 'react'
import './style.less'
import FormatTime from '../../../util/formatTime'

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const recordObj = this.props.recordObj

        return (
            <div id="orderListItem">
                <div>
                    {
                        recordObj.courseId == null ? <div>{recordObj.payResult === 1 ? '充值成功' : '充值失敗'}</div> :
                            <div>{recordObj.course.courseName}</div>
                    }
                    <div>{FormatTime.formatYMD(recordObj.createTime)}</div>
                </div>
                <div>{recordObj.courseId == null ? `-${recordObj.payPrice}元` : `+${recordObj.price}元`}</div>
            </div>
        )
    }
}

export default ListItem