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
                        <div className="userName text_hidden">
                            {itemObj.user.userName}
                        </div>
                        <div className="content title_color">{itemObj.content}</div>
                        <div className="timeCont">
                            <span className="courseName">评价来自<span className='blue'>{`《${itemObj.course.courseName}》`}</span></span>
                            <span> {FormatTime.formatAllTime(itemObj.createTime)}</span>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default ListItem
