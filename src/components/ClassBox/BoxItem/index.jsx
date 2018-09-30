import React from 'react'
import {NavLink} from "react-router-dom"
import './style.less'
import FormatTime from '../../../util/formatTime'
import {MID_IMG} from '../../../util/const'
import {Toast} from 'antd-mobile'

class BoxItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    openNewPage(id, publisher_id) {

        var data = {
            method: 'openNewPage',
            // url: `http://192.168.50.139:8200/detil/${id}/${publisher_id}/openNewPage`
            url: `http://jiaoxue.maaee.com:8200/detil/${id}/${publisher_id}/openNewPage`
        };

        window.Bridge.callHandler(data, null, function (error) {
            Toast.info(error, 4)
        });
    }

    render() {
        const data = this.props.data
        return (
            <div className='item'>
                {/*<div onClick={this.openNewPage.bind(this, data.id, data.publisher_id)}>*/}
                <NavLink to={`/detil/${data.id}/${data.publisher_id}`}>
                    <div className="imgDiv">
                        <img src={data.image + MID_IMG} alt="" style={{width: '100%'}}/>
                        <span className='sign'>{data.buyUids == null ? '' : `${data.buyUids.length}人报名`}</span>
                    </div>
                    <div className="textCont">
                        <div className='title_color text_hidden'>{data.courseName}</div>
                        <div className='tagDiv'><span className='tag'>{data.courseType.name}</span></div>
                        <div className='time line_public'>
                            <span>{`${FormatTime.formatMD(data.startTime)}-${FormatTime.formatMD(data.endTime)}`}</span>
                            <span className='courseNum'>{data.videos.length}<i>-</i>课时</span>
                        </div>
                        <div className="textBottom my_flex">
                            <img src={data.users[0].avatar} alt=""/>
                            <span className='text_color text_hidden'>{data.users[0].userName}</span>
                            {data.money === '0.00' ?
                                <span className='free'>免费</span> :
                                <span className='price'><span>¥ </span>{data.money}</span>}
                        </div>
                    </div>

                </NavLink>
            </div>
        )
    }
}

export default BoxItem
