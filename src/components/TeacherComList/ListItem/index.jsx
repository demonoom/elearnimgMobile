import React from 'react'
import './style.less'
import {SMALL_IMG} from '../../../util/const'
import FormatTime from '../../../util/formatTime'

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {

        const itemObj = this.props.itemObj;

        return (
            <div id='tercomment_list_item'>
                <div className="my_flex item line_public">
                    <img src={itemObj.user.avatar + SMALL_IMG} alt=""/>
                    <div className="rightCont">
                        <div className="userName">
                            <span className="text_hidden title_color">{itemObj.user.userName}</span>
                            <span
                                className="time">{`评价来自<<${itemObj.course.courseName}>>`} {FormatTime.formatAllTime(itemObj.createTime)}</span>
                        </div>
                        <div className="content">{itemObj.content}</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ListItem
