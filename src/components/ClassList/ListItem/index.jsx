import React from 'react'
import './style.less'
import {NavLink} from "react-router-dom"
import {MID_IMG} from '../../../util/const'
import FormatTime from '../../../util/formatTime'
import defaultImg from '../../../static/img/error.png'

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    imgOnError = (e) => {
        e.target.src = defaultImg
    }

    render() {

        const itemObj = this.props.itemObj;
        const listType = this.props.listType;

        var arr = []
        itemObj.videos.forEach((v) => {
            arr.push(v.videoStatus)
        })

        return (
            <NavLink to={`/detil/${itemObj.id}/${itemObj.publisher_id}`} className='list_item'>
                <div className='imgCont'>
                    <img src={itemObj.image + MID_IMG} alt="" onError={this.imgOnError}/>
                    <div className='buyPerson text_hidden'
                         style={{display: listType === '2' ? 'none' : listType === '1' ? 'none' : arr.indexOf('2') !== -1 ? 'none' : ''}}>{itemObj.buyUids.length}人购买
                    </div>
                </div>
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
                    <div className='icon_live'
                         style={{display: listType === '2' ? 'none' : arr.indexOf('2') === -1 ? 'none' : ''}}>直播中
                    </div>
                    <div className='timeCont'
                         style={{display: listType !== '1' ? '' : arr.indexOf('2') === -1 ? '' : 'none'}}>
                        <span
                            style={{display: listType === '1' ? itemObj.courseStatus === '3' ? 'none' : arr.indexOf('2') === -1 ? '' : 'none' : 'none'}}>
                             开课时间：
                            {
                                FormatTime.getLastLivTime(itemObj)
                            }
                        </span>
                        <span
                            style={{display: listType === '1' ? itemObj.courseStatus === '3' ? '' : 'none' : 'none'}}>
                             直播结束
                        </span>
                        <span style={{display: listType === '1' ? 'none' : ''}}>

                            {
                                FormatTime.formatYMD(itemObj.startTime)
                            }
                        </span>
                        <span className='progress'
                              style={{display: listType === '3' ? 'none' : listType === '1' ? 'none' : ''}}>
                            {
                                `进度:${itemObj.jindu}`
                            }
                        </span>
                        <span style={{display: listType === '2' ? 'none' : listType === '1' ? 'none' : ''}}>
                            {
                                itemObj.money === '0.00' ? <span className='free'>免费</span> :
                                    <span className='price'><span>¥</span>itemObj.money</span>
                            }
                        </span>
                    </div>

                </div>
            </NavLink>
        )
    }
}

export default ListItem
