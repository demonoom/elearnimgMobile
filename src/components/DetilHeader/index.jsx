import React from 'react'
import './style.less'

class DetilHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    /**
     * 使用history.goBack()来实现路由的回退
     */
    handleClick() {
        window.history.back()
    }

    render() {

        return (
            <div id="header">
                <div className="p14"></div>
                <div className="headerCont">
                    <span className='header-back' onClick={this.handleClick}>
                    <i className='iconfont icon-houtui'></i>
                </span>
                    <span className='header-collect'>
                    <i className='iconfont icon-shoucang2'></i>
                </span>
                    <div className='header-title'>
                        {this.props.title}
                    </div>
                </div>

            </div>
        )
    }
}

export default DetilHeader