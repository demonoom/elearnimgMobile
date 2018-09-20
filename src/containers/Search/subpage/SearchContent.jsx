import React from 'react'
import './style.less'

class SearchContent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='search_content'>
                <div className='topCont'>
                    <span>最近搜索</span>
                    <span>清空搜索记录</span>
                </div>
                <div className='searchTagCont'>
                    {/*SearchContent*/}
                    <span className='grayTag_deep title_color'>传统节日</span>
                </div>
            </div>
        )
    }
}

export default SearchContent
