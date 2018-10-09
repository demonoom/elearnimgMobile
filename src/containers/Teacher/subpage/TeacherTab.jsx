import React from 'react'
import {Tabs, Badge, Toast, WhiteSpace} from 'antd-mobile'
import './style.less'
import {findEvaluateByTeacherId, findCourseByTeacherId} from '../../../fetch/teacher/teacher'
import {SMALL_IMG} from '../../../util/const'
import TeacherComList from '../../../components/TeacherComList'

import ClassBox from '../../../components/ClassBox'

class TeacherTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            pageNo: 1,
            classContent: [],
            isLoadingMore: true,
            hasMoreClass: true,
            commentList: [],
        }
    }

    componentDidMount() {
        var _this = this;
        // /**
        //  * 下拉加载更多实现
        //  * @type {SeeMoreContent.loadMoreDate}
        //  */
        // const loadMoreFn = this.loadMoreDate
        // let timeoutId
        //
        // function callback() {
        //     const top = loadMore.getBoundingClientRect().top
        //     const windowHeight = window.screen.height
        //     if (!_this.state.hasMoreClass) {
        //         return
        //     }
        //     if (top && top < windowHeight) {
        //         loadMoreFn()
        //     }
        // }
        //
        // document.querySelector('.detil_content').addEventListener('scroll', () => {
        //     if (this.state.isLoadingMore) {
        //         return
        //     }
        //     if (timeoutId) {
        //         clearTimeout(timeoutId)
        //     }
        //     timeoutId = setTimeout(callback, 50)
        // })
    }

    componentWillReceiveProps(nextprops) {
        if (!!nextprops.teacherObj) {
            this.findCourseByTeacherId(nextprops.teacherObj.colUid)
        }
    }

    /**
     * 获取老师课程
     * @param id
     */
    findCourseByTeacherId = (id) => {
        findCourseByTeacherId(id, this.state.pageNo).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({
                    classContent: res.response
                })
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    /**
     * 获取老师评价
     */
    findEvaluateByTeacherId = () => {
        findEvaluateByTeacherId(this.props.teacherObj.colUid, this.state.pageNo).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({commentList: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    render() {

        const teacherObj = this.props.teacherObj

        const tabs = [
            {title: <Badge>所有课程</Badge>, index: 0},
            {title: <Badge>老师介绍</Badge>, index: 1},
            {title: <Badge>评价</Badge>, index: 2},
        ];

        return (
            <div>
                <Tabs tabs={tabs}
                      initialPage={0}
                      swipeable={false}
                      animated={false}
                      useOnPan={false}
                      onChange={(tab, index) => {
                          this.setState({pageNo: 1})
                          if (index === 2) {
                              this.findEvaluateByTeacherId()
                          }
                      }}
                >
                    <div className='detil-tab-item'>
                        <WhiteSpace/>
                        <ClassBox
                            ref='classBoxCg'
                            classroomContent={this.state.classContent}
                            typeGuoLv={false}
                        />
                    </div>
                    <div className='detil-tab-item'>
                        <WhiteSpace/>
                        <div className='whiteBg teachDec'>
                            <div className='title title_color'>老师简介</div>
                            <div className='teach_item my_flex'>
                                  <img src={teacherObj.avatar + SMALL_IMG} alt=""/>
                                 <div className='right'>
                                    <div className='userName title_color text_hidden'>{teacherObj.userName}</div>
                                    <div
                                        className='text text_color text_hidden2'>{!!teacherObj.userContent ? teacherObj.userContent : '暂无介绍'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='detil-tab-item' id='detil-tab-item3'>
                        <TeacherComList
                            commentList={this.state.commentList}
                        />
                    </div>
                </Tabs>
            </div>
        )
    }
}

export default TeacherTab
