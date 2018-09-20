import React from 'react'
import './style.less'
import {NavLink} from "react-router-dom"

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        return (
            <div className='home_header'>
                <div className="p14"></div>
                    <div className='div-input'>
                        <NavLink to='/search' className='div-input' style={{display: 'inline-block'}}>
                            <i className='iconfont icon-tubiao11'></i>&nbsp;搜索课程和老师
                        </NavLink>
                    </div>
            </div>
        )
    }
}

export default HomeHeader
