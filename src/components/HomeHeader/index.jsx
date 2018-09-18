import React from 'react'
import './style.less'

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        return (
            <div className='home_header'>
                <div className='div-input'><i className='iconfont icon-tubiao11'></i>&nbsp;搜索课程和老师</div>
            </div>
        )
    }
}

export default HomeHeader
