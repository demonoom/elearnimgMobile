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
            <div id='comment_list_item'>
                <div>
                    <img src={itemObj.user.avatar + SMALL_IMG} alt=""/>
                    <span>{itemObj.user.userName}</span>
                    <span>{FormatTime.formatAllTime(itemObj.createTime)}</span>
                </div>
                <div>{itemObj.content}</div>
            </div>
        )
    }
}

export default ListItem
