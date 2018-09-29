import React from 'react'
import './style.less'
import MyCourseLists from './subpage/MyCourseLists'

class MyCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            truelyHeight: '',
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    componentDidMount() {

    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.MyCourse.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.MyCourse.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    setTruelyHeight = () => {
        this.setState({truelyHeight: this.refs.MyCourse.parentNode.offsetHeight})
    }

    /**
     * 跳转至搜索页面
     */
    turnToPage = () => {
        this.props.history.push('/search');
    }

    render() {
        return (
            <div className='myCourse' ref='MyCourse'>
                <div className="p14 whiteBg"></div>
                <div className='myCourseList_header title_color'>
                    我的课表
                    <i className='iconfont icon-sousuo1'
                       onClick={this.turnToPage}></i>
                </div>
                <div className='myCourseList_content'>
                    <MyCourseLists
                        setTruelyHeight={this.setTruelyHeight}
                    />
                </div>
            </div>
        )
    }
}

export default MyCourse
