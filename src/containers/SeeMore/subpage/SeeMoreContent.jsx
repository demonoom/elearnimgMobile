import React from 'react'
import {getMyPurchaseCourseList} from '../../../fetch/my-course/my-course'
import ClassList from '../../../components/ClassList'
import LoadMore from '../../../components/LoadMore'
import './style.less'

class SeeMoreContent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            courseType: 'public',
            courseList: [],
            page: 1,
            isLoadingMore: false
        }
    }

    componentDidMount() {
        this.getMyPurchaseCourseList(this.state.page, '500001020')
    }

    getMyPurchaseCourseList = (page, id) => {
        //用我的课程模拟数据
        getMyPurchaseCourseList(page, id).then((res) => {
            this.setState({courseList: this.state.courseList.concat(res.response)})
        })
    }

    typeOnChange = (courseType) => {
        this.setState({courseType}, () => {

        })
    }

    /**
     * 加载更多数据
     */
    loadMoreDate() {
        this.setState({
            isLoadingMore: true
        })
        const page = this.state.page + 1
        this.getMyPurchaseCourseList(page, '500001020')
        this.setState({page, isLoadingMore: false})
    }

    render() {
        return (
            <div className='my_course_list'>
                <div className='tabTitle' style={{backgroundColor: 'white'}}>
                    <span className={this.state.courseType === 'public' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'public')}>精选公开课</span>
                    <span className={this.state.courseType === 'hotclass' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'hotclass')}>热门课程</span>
                    <span className={this.state.courseType === 'mostnew' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'mostnew')}>最新课程</span>
                    <span className={this.state.courseType === 'weiclass' ? 'active' : ''}
                          onClick={this.typeOnChange.bind(this, 'weiclass')}>微课</span>
                </div>
                <div className='class_list'>
                    <ClassList
                        courseList={this.state.courseList}
                    />
                    <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreDate.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default SeeMoreContent
