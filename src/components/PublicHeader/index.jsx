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

    /**
     * 右侧Icon被点击
     * @param word
     */
    iconOnClick = (word) => {
        this.props.iconOnClick(word)
    }

    render() {
        return (
            <div id="public_header" className='Bg'>
                <span className='header-back' onClick={this.handleClick}>
                    <i className='iconfont icon-houtui'></i>
                </span>
                <span className={this.props.iconClass} onClick={this.iconOnClick.bind(this, this.props.iconClass)}>
                    <i className={`${this.props.iconType} iconfont`}></i>
                </span>
                <div className='header-title'>
                    {this.props.title}
                </div>
            </div>
        )
    }
}

export default DetilHeader