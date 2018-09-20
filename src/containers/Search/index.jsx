import React from 'react'
import {CSSTransition} from 'react-transition-group'
import SearchHeader from '../../components/SearchHeader'
import SearchContent from './subpage/SearchContent'
import './style.less'
import {listCourseByKeyWords} from '../../fetch/search/search'
import {Toast} from 'antd-mobile'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            searchResponse: []
        }
    }

    componentDidMount() {
        this.setState({show: true})
    }

    /**
     * 搜索课程
     * @param value
     */
    listCourseByKeyWords = (value) => {
        listCourseByKeyWords('500001020', '-1', value).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({searchResponse: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    render() {
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div id='search'>
                    <SearchHeader
                        listCourseByKeyWords={this.listCourseByKeyWords}
                    />
                    <SearchContent
                        searchResponse={this.state.searchResponse}
                    />
                </div>
            </CSSTransition>
        )
    }
}

export default Search
