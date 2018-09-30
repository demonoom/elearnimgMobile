import React from 'react'
import './style.less'
import {NavLink} from "react-router-dom"
import {MID_IMG} from '../../../util/const'

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {

        const itemObj = this.props.itemObj;

        var arr = []
        itemObj.videos.forEach((v) => {
            arr.push(v.videoStatus)
        })

        return (
            <NavLink to={`/detil/${itemObj.id}/${itemObj.publisher_id}`} className='list_item'>
                <img src={itemObj.image + MID_IMG} alt=""/>
                <div className='rightCont text_color my_flex'>
                    <div className='title_color text_hidden'>{itemObj.courseName}</div>
                    <div className='tagDiv'><span className='tag'>{itemObj.courseType.name}</span></div>
                    <div className='name text_hidden'>
                        {
                            itemObj.users.map((v, i) => {
                                return <span key={i}>{v.userName}</span>
                            })
                        }
                    </div>
                    <div className='icon_live' style={{display: arr.indexOf('2') === -1 ? 'none' : ''}}>直播中</div>
                    <div className='name'
                         style={{display: arr.indexOf('2') !== -1 ? 'none' : ''}}>{itemObj.buyUids.length}人购买
                    </div>
                </div>
            </NavLink>
        )
    }
}

export default ListItem
