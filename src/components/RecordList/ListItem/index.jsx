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
            <div className="orderListItem line_public">
                <div>
                    {
                        recordObj.courseId == null ? <div className="title_color text_hidden">{recordObj.payResult === 1 ? '充值成功' : '充值失败'}</div> :
                            <div className="title_color text_hidden">{recordObj.course.courseName}</div>
                    }
                    <div className='time'>{FormatTime.formatYMD(recordObj.createTime)}</div>
                </div>
                <div className="moneyRecording title_color">{recordObj.courseId == null ? `-${recordObj.payPrice}元` : `+${recordObj.price}元`}</div>
            </div>
        )
    }
}

export default ListItem