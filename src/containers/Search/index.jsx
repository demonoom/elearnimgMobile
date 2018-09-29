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
            filterObj: false,
            courseType: '-1',
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
        this.setState({courseType: '-1'}, () => {
            this.refs.filter.setDefault()
        })
    }

    filterOpen = () => {
        getCourseSearchParamsV3().then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({filterObj: res.response})
                this.buildParamsArr(res.response)
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    changeType = (courseType) => {
        this.setState({courseType}, (() => {
            this.buildParamsArr(this.state.filterObj)
        }))
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
        if (this.state.courseType === 'sjkc') {
            for (var k in data) {
                if (data[k].type === 'courseStatus') {
                    params.courseStatus.push(data[k])
                }
                if (data[k].type === 'courseType' && data[k].value === 'sjkc') {
                    params.courseSubject = data[k].courseTypes
                }
            }
        } else if (this.state.courseType === 'cgkc') {
            for (var j in data) {
                if (data[j].type === 'courseStatus') {
                    params.courseStatus.push(data[j])
                }
                if (data[j].type === 'courseType' && data[j].value === "cgkc") {
                    params.courseSubject = data[j].courseTypes
                    params.courseGrade = data[j].courseGrade
                }
            }
        } else if (this.state.courseType === '-1') {
            for (var t in data) {
                if (data[t].type === 'courseStatus') {
                    params.courseStatus.push(data[t])
                }
            }
        }
        for (var m in data) {
            if (data[m].type === 'courseType') {
                params.coursaType.push(data[m])
            }
        }
        this.setState({searchParams: params, filterDisplsy: true})
    }

    shadeOnClick = () => {
        this.setState({filterDisplsy: false})
    }

    filterMakeChose = (status, subject, grade, type) => {
        this.refs.search_content.filterMakeChose(status, subject, grade, type)
    }

    passSearchValue = (e) => {
        this.refs.search_header.passSearchValue(e)
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
                        ref="search_header"
                        listCourseByKeyWords={this.listCourseByKeyWords}
                    />
                    <SearchContent
                        filterOpen={this.filterOpen}
                        ref='search_content'
                        passSearchValue={this.passSearchValue}
                    />
                    <Filter ref='filter' data={this.state.searchParams} filterDisplsy={this.state.filterDisplsy}
                            filterMakeChose={this.filterMakeChose}
                            shadeOnClick={this.shadeOnClick}
                            changeType={this.changeType}
                    />
                </div>
            </CSSTransition>
        )
    }
}

export default Search
