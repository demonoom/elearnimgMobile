import React from 'react'
import './style.less'
import PublicHeader from '../../components/PublicHeader'
import SeeMoreContent from './subpage/SeeMoreContent'
import Filter from '../../components/Filter'
import {getCourseSearchParamsV3} from '../../fetch/filter/filter'
import {Toast} from 'antd-mobile'

class SeeMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            truelyHeight: '',
            courseType: this.props.match.params.type,
            filterDisplsy: false,
            searchParams: false
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.SeeMore.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.SeeMore.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        this.setState({truelyHeight: this.refs.SeeMore.parentNode.offsetHeight})
    }

    iconOnClick = () => {
        this.props.history.push('/search');
    }

    courseTypeOnClick = (type) => {
        this.setState({courseType: type})
        this.refs.seeMore_content.courseTypeOnChange(type)
        this.refs.filter.setDefault()
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
            courseStatus: [],
            courseSubject: [],
            courseType: [],
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
        } else {
            for (var j in data) {
                if (data[j].type === 'courseStatus') {
                    params.courseStatus.push(data[j])
                }
                if (data[j].type === 'courseType' && data[j].value === "cgkc") {
                    params.courseSubject = data[j].courseTypes
                    params.courseGrade = data[j].courseGrade
                }
            }
        }
        this.setState({searchParams: params, filterDisplsy: true})
    }

    shadeOnClick = () => {
        this.setState({filterDisplsy: false})
    }

    filterMakeChose = (status, subject, grade) => {
        this.refs.seeMore_content.filterMakeChose(status, subject, grade)
    }

    render() {
        return (
            <div className='see_more' ref='SeeMore'>
                <PublicHeader
                    courseType={this.props.match.params.type}
                    boxShadowFlag={true}
                    title='see_more'
                    ref='header'
                    iconOnClick={this.iconOnClick}
                    iconType='icon-sousuo1'
                    iconClass='header-sousuo'
                    courseTypeOnClick={this.courseTypeOnClick}
                    backFlag={true}
                />
                <div className='see_more_content overflowScroll'>
                    <SeeMoreContent
                        ref='seeMore_content'
                        courseType={this.state.courseType}
                        filterOpen={this.filterOpen}
                    />
                </div>
                <Filter ref='filter' data={this.state.searchParams} filterDisplsy={this.state.filterDisplsy}
                        filterMakeChose={this.filterMakeChose}
                        shadeOnClick={this.shadeOnClick}/>
            </div>
        )
    }
}

export default SeeMore
