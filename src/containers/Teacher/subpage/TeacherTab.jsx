import React from 'react'
import {Tabs, Badge, Toast, WhiteSpace} from 'antd-mobile'
import './style.less'
import {findEvaluateByTeacherId, findCourseByTeacherId} from '../../../fetch/teacher/teacher'
import {SMALL_IMG} from '../../../util/const'
import TeacherComList from '../../../components/TeacherComList'
import LoadMore from '../../../components/LoadMore'
import ClassBox from '../../../components/ClassBox'

var loadMore1;
var loadMore3;

class TeacherTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            pageNo1: 1,
            pageNo: 1,
            classContent: [],
            isLoadingMore1: true,
            hasMoreClass1: true,
            isLoadingMore3: true,
            hasMoreClass3: true,
            commentList: [],
        }
    }

    componentDidMount() {
        var _this = this;
        /**
         * 下拉加载更多实现1
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate1
        let timeoutId

        function callback() {
            const top = loadMore1.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if (!_this.state.hasMoreClass1) {
                return
            }
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }

        document.querySelector('.teacher_content').addEventListener('scroll', () => {
            if (this.state.isLoadingMore1) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        })

        /**
         * 下拉加载更多实现2
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn3 = this.loadMoreDate3
        let timeoutId3

        function callback3() {
            const top = loadMore3.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if (!_this.state.hasMoreClass3) {
                return
            }
            if (top && top < windowHeight) {
                loadMoreFn3()
            }
        }

        document.querySelector('.teacher_content').addEventListener('scroll', () => {
            if (this.state.isLoadingMore3) {
                return
            }
            if (timeoutId3) {
                clearTimeout(timeoutId3)
            }
            timeoutId3 = setTimeout(callback3, 50)
        })
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
        findCourseByTeacherId(id, this.state.pageNo1).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                if (this.state.pageNo1 === res.pager.pageCount) {
                    this.setState({hasMoreClass1: false})
                }
                this.setState({
                    classContent: this.state.classContent.concat(res.response)
                }, () => {
                    loadMore1 = document.querySelectorAll('#detil-tab-item1 .load_more')[0]
                })
                this.setState({
                    pageNo1: this.state.pageNo1 + 1,
                    isLoadingMore1: false,
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
                if (this.state.pageNo === res.pager.pageCount) {
                    this.setState({hasMoreClass3: false})
                }
                this.setState({commentList: this.state.commentList.concat(res.response)},()=>{
                    loadMore3 = document.querySelectorAll('#detil-tab-item3 .load_more')[0]
                })
                this.setState({
                    pageNo: this.state.pageNo + 1,
                    isLoadingMore3: false,
                })
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    /**
     * 加载更多数据1
     */
    loadMoreDate1 = () => {
        this.setState({
            isLoadingMore1: true
        }, () => {
            this.findCourseByTeacherId(this.props.teacherObj.colUid)
        })
    }

    /**
     * 加载更多数据3
     */
    loadMoreDate3 = () => {
        this.setState({
            isLoadingMore3: true
        }, () => {
            this.findEvaluateByTeacherId()
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
                          if (index === 2) {
                              this.setState({pageNo: 1}, () => {
                                  this.findEvaluateByTeacherId()
                              })
                          }
                      }}
                >
                    <div className='detil-tab-item' id='detil-tab-item1'>
                        <WhiteSpace/>
                        <ClassBox
                            ref='classBoxCg'
                            classroomContent={this.state.classContent}
                            typeGuoLv={false}
                        />
                        <LoadMore ref='LoadMore1' isLoadingMore={this.state.isLoadingMore1}
                                  hasMoreClass={this.state.hasMoreClass1}
                                  loadMoreFn={this.loadMoreDate1.bind(this)}/>
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
                        <LoadMore ref='LoadMore3' isLoadingMore={this.state.isLoadingMore3}
                                  hasMoreClass={this.state.hasMoreClass3}
                                  loadMoreFn={this.loadMoreDate3.bind(this)}/>
                    </div>
                </Tabs>
            </div>
        )
    }
}

export default TeacherTab
