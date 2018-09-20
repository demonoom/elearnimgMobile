import React from 'react'
import {NavLink} from "react-router-dom"
import './style.less'
import FormatTime from '../../../util/formatTime'

class BoxItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const data = this.props.data
        return (
            <div className='item'>
                <NavLink to={`/detil/${data.id}/${data.publisher_id}`}>
                    <div className="imgDiv">
                        <img src={data.image} alt="" style={{width: '100%'}}/>
                        <span className='sign'>{data.buyUids.length}人报名</span>
                    </div>
                    <div className="textCont">
                        <div className='title_color text_hidden'>{data.courseName}</div>
                        <div className='tagDiv'><span className='tag'>{data.courseType.name}</span></div>
                        <div className='time line_public'>
                            <span>{`${FormatTime.formatMD(data.startTime)}-${FormatTime.formatMD(data.endTime)}`}</span>
                            <span className='courseNum'>{data.videos.length}课时</span>
                        </div>
                        <div className="textBottom my_flex">
                            <img src={data.users[0].avatar} alt=""/>
                            <span className='text_color text_hidden'>{data.users[0].userName}</span>
                            {data.money === '1.00' ?
                                <span className='free'>免费</span> :
                                <span className='price'>¥ {data.money}</span>}
                        </div>
                    </div>

                </NavLink>
            </div>
        )
    }
}

export default BoxItem
