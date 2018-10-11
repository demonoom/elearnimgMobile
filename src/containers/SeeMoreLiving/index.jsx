import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import PublicHeader from '../../components/PublicHeader'
import {getCourseByTodayV3ByTime} from '../../fetch/seemore-living/seemore-living'
import {Toast} from 'antd-mobile'
import ClassList from '../../components/ClassList'
import FormatTime from '../../util/formatTime'

class SeeMoreLiving extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            truelyHeight: '',
            courseList: [],
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
        this.changeTitleCol('black');
    }

    /**
     * 改变title颜色
     * @param col
     */
    changeTitleCol = (col) => {
        var dataCol = {
            method: 'changeTitleCol',
            col: col,
        };

        window.Bridge.callHandler(dataCol, null, function (error) {
            // Toast.info(error, 4)
        });
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.SeeMoreLiving.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.changeTitleCol('black');
        this.refs.SeeMoreLiving.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        this.setState({show: true})
        /**
         * 获取今日直播
         */
        this.getCourseByTodayV3ByTime(FormatTime.formatYMD(new Date().getTime()), FormatTime.formatYMD(new Date().getTime()))
    }

    getCourseByTodayV3ByTime = (a, b) => {
        getCourseByTodayV3ByTime(a, b).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({
                    courseList: res.response
                })
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    iconOnClick = () => {
        this.props.history.push('/search');
    }

    courseTypeOnClick = (type) => {
        if (type === 'tomorrow') {
            this.getCourseByTodayV3ByTime(FormatTime.formatYMD(new Date().getTime() + 24 * 60 * 60 * 1000), FormatTime.formatYMD(new Date().getTime() + 24 * 60 * 60 * 1000))
        } else {
            this.getCourseByTodayV3ByTime(FormatTime.formatYMD(new Date().getTime()), FormatTime.formatYMD(new Date().getTime()))
        }
    }

    render() {
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='my_seeMoreLiving positionBg' ref='SeeMoreLiving'>
                    <PublicHeader
                        title='see_more_living'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType='icon-sousuo1'
                        iconClass='header-sousuo'
                        courseTypeOnClick={this.courseTypeOnClick}
                    />
                    <div className='collect_content overflowScroll'
                         ref='collect_content'
                    >
                        <ClassList
                            listType='1'
                            courseList={this.state.courseList}
                        />
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default SeeMoreLiving
