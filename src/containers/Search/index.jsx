import React from 'react'
import {CSSTransition} from 'react-transition-group'
import SearchHeader from '../../components/SearchHeader'
import SearchContent from './subpage/SearchContent'
import './style.less'
import Filter from '../../components/Filter'
import {Toast} from 'antd-mobile'
import {getCourseSearchParamsV3} from '../../fetch/filter/filter'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            truelyHeight: '',
            filterDisplsy: false,
            searchParams: false,
            searchParams2: false,
            courseType: 'cgkc',
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
        this.refs.search_content.getCourseListV3(value, true)
    }

    filterOpen = () => {
        getCourseSearchParamsV3().then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.buildParamsArr(res.response)
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    /**
     * 构建筛选数据
     * @param data
     */
    buildParamsArr(data) {
        var params = {
            coursaType: [],
            courseStatus: [],
            courseSubject: [],
            courseGrade: [],
        }
        var params2 = {
            coursaType: [],
            courseStatus: [],
            courseSubject: [],
            courseGrade: [],
        }
        for (var k in data) {
            if (data[k].type === 'courseStatus') {
                params.courseStatus.push(data[k])
            }
            if (data[k].type === 'courseType' && data[k].value === 'sjkc') {
                params.courseSubject = data[k].courseTypes
            }
        }
        for (var j in data) {
            if (data[j].type === 'courseStatus') {
                params2.courseStatus.push(data[j])
            }
            if (data[j].type === 'courseType' && data[j].value === "cgkc") {
                params2.courseSubject = data[j].courseTypes
                params2.courseGrade = data[j].courseGrade
            }
        }
        for (var m in data) {
            if (data[m].type === 'courseType') {
                params.coursaType.push(data[m])
                params2.coursaType.push(data[m])
            }
        }
        this.setState({searchParams: params, filterDisplsy: true, searchParams2: params2})
    }

    shadeOnClick = () => {
        this.setState({filterDisplsy: false})
    }

    filterMakeChose = (status, subject, grade, type) => {
        console.log(status);
        console.log(subject);
        console.log(grade);
        console.log(type);
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
                        filterOpen={this.filterOpen}
                        ref='search_content'
                    />
                    <Filter ref='filter' data={this.state.searchParams} filterDisplsy={this.state.filterDisplsy}
                            filterMakeChose={this.filterMakeChose}
                            shadeOnClick={this.shadeOnClick}
                            data2={this.state.searchParams2}
                    />
                </div>
            </CSSTransition>
        )
    }
}

export default Search
