import React from 'react'
import './style.less'

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    handleClick() {
        window.history.back()
    }

    render() {
        return (
            <div className='search_header'>
                <i className='iconfont icon-houtui searchr-back' onClick={this.handleClick}></i>
                <span className='search_btn'>搜索</span>
                <input type="text" className='search_input' placeholder='搜索课程或老师'/>
            </div>
        )
    }
}

export default SearchHeader
