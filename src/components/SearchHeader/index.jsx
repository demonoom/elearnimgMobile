import React from 'react'
import './style.less'
import {Toast} from 'antd-mobile'

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchKeyWord: ''
        }
    }

    handleClick() {
        window.history.back()
    }

    searchCoruse = () => {
        if (this.state.searchKeyWord.trim() === '') {
            Toast.info('请输入内容再搜索', 2)
            return
        }
        this.props.listCourseByKeyWords(this.state.searchKeyWord)

    }

    inputOnChange = (e) => {
        this.setState({searchKeyWord: e.target.value})
    }

    render() {
        return (
            <div className='search_header line_public lineB'>
                <i className='iconfont icon-houtui searchr-back' onClick={this.handleClick}></i>
                <span className='search_btn' onClick={this.searchCoruse}>搜索</span>
                <input
                    type="text"
                    className='search_input'
                    placeholder='搜索课程或老师'
                    value={this.state.searchKeyWord}
                    onChange={this.inputOnChange}
                />
            </div>
        )
    }
}

export default SearchHeader
