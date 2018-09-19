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
                <span className='searchr-back' onClick={this.handleClick}>
                    <i className='iconfont icon-houtui'></i>
                </span>
            </div>
        )
    }
}

export default SearchHeader
