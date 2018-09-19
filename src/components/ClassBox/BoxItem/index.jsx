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
                    <img src={data.image} alt="" style={{width: '100%'}}/>
                    <div>{data.courseName}</div>
                    <div>{data.courseType.name}</div>
                    <div>
                        <span>{`${FormatTime.formatMD(data.startTime)}-${FormatTime.formatMD(data.endTime)}`}</span>
                        <span>{data.videos.length}课时</span>
                    </div>
                    <div>
                        <img src={data.users[0].avatar} alt=""/>
                        <span>{data.users[0].userName}</span>
                        <span>{data.money === '0.00' ? '免费' : `¥${data.money}`}</span>
                    </div>
                </NavLink>
            </div>
        )
    }
}

export default BoxItem
