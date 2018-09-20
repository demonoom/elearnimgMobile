import React from 'react'
import './style.less'
import ClassBox from '../../../components/ClassBox'

class SearchContent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const searchResponse = this.props.searchResponse
        console.log(searchResponse);
        return (
            <div className='search_content'>
                {searchResponse.length === 0 ? <div className='search_history'>
                    <div className='topCont'>
                        <span>最近搜索</span>
                        <span>清空搜索记录</span>
                    </div>
                    <div className='searchTagCont'>
                        <span className='grayTag_deep title_color'>传统节日</span>
                    </div>
                </div> :
                    <div style={{height: '100%'}}>
                    <div className='tabTitle'  style={{paddingTop: '15px'}}>
                        <span className='active'>按热度排序</span>
                        <span>最新课程</span>
                    </div>
                    <div className='search_response'>
                        <ClassBox
                            classroomContent={searchResponse}
                            typeGuoLv={false}
                        />
                    </div>
                </div>}
            </div>
        )
    }
}

export default SearchContent
