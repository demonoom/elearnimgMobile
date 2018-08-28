import React from 'react'
import './style.less'

class Header extends React.Component {
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
                <span className='header-back' onClick={this.handleClick}>
                    后退
                </span>
                <div className='header-title'>
                    {this.props.title}
                </div>
            </div>
        )
    }
}

export default Header