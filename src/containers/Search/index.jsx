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
            searchResponse: [],
            truelyHeight: '',
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.Search.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.Search.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        this.setState({show: true, truelyHeight: this.refs.Search.parentNode.offsetHeight})
    }

    /**
     * 搜索课程
     * @param value
     */
    listCourseByKeyWords = (value) => {
        listCourseByKeyWords(localStorage.getItem("userId"), '-1', value).then((res) => {
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
                <div id='search' className='positionBg' ref='Search'>
                    <div className="p14 whiteBg"></div>
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
