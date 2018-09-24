import React from 'react'
import './style.less'
import {LARGE_IMG} from '../../util/const'

class VideoList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        this.buildVideoList(nextProps.videoArr)
    }

    liOnClick = (data) => {
        this.props.listOnClick(data)
    }

    buildVideoList(res) {
        var videoList = []
        if (res.length !== 0) {
            res.forEach((item) => {
                videoList.push(
                    <li key={item.id} className='videoLi'>
                        <img src={item.image + LARGE_IMG} alt=""/>
                        <i className='iconfont icon-bofang' onClick={this.liOnClick.bind(this, item)}></i>
                    </li>
                )
            })
        }
        this.setState({videoList})
    }

    render() {

        return (
            <div id="videoList">
                <ul className='videoUl'>
                    {this.state.videoList}
                </ul>
            </div>
        )
    }
}

export default VideoList