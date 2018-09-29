import React from 'react'
import {Tabs, Badge, WhiteSpace, Toast} from 'antd-mobile'
import './style.less'
import FormatTime from '../../../util/formatTime'
import {SMALL_IMG} from '../../../util/const'
import {queryEvaluatePageByCourseId} from '../../../fetch/detil/detil'
import {addEvaluate} from '../../../fetch/comment/comment'
import CommentList from '../../../components/CommentList'
import LoadMore from '../../../components/LoadMore'
import Comment from '../../../components/Comment'

var loadMore;

class CourseTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            CommentArr: [],
            isLoadingMore: true,
            hasMoreClass: true,
            commentFlag: false
        }
    }

    componentDidMount() {
        var _this = this;
        /**
         * 下拉加载更多实现
         * @type {SeeMoreContent.loadMoreDate}
         */
        const loadMoreFn = this.loadMoreDate
        let timeoutId

        function callback() {
            const top = loadMore.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if (!_this.state.hasMoreClass) {
                return
            }
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }

        document.querySelector('.detil_content').addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        })
    }

    queryEvaluatePageByCourseId = () => {
        queryEvaluatePageByCourseId(this.props.courseObj.id, this.state.page).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                if (this.state.page === res.pager.pageCount) {
                    this.setState({hasMoreClass: false})
                }
                this.setState({
                    CommentArr: this.state.CommentArr.concat(res.response),
                    page: this.state.page + 1,
                    isLoadingMore: false,
                }, () => {
                    if (this.state.page === 2) {
                        loadMore = document.querySelectorAll('#comment_tab .load_more')[0]
                    }
                })
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    /**
     * 加载更多数据
     */
    loadMoreDate = () => {
        this.setState({
            isLoadingMore: true
        }, () => {
            this.queryEvaluatePageByCourseId()
        })
    }

    /**
     * 开课
     * @param obj
     */
    courseOnPlay = (obj) => {

        var _this = this;

        if (localStorage.getItem("userId") == null) {
            var data = {
                method: 'goLoginPage',
            };

            window.Bridge.callHandler(data, function (res) {
                localStorage.setItem("userId", JSON.parse(res).colUid)
                _this.props.loginSuccess()
            }, function (error) {
                Toast.info(error, 4)
            });
            return
        }
        if (!this.props.courseObj.buyed) {
            Toast.info('您还没有购买!', 2)
            return
        }

        var datas = {
            method: 'openElearningClass',
            vid: obj.virtual_classId,
            videoName: obj.name,
            videoStatus: obj.videoStatus,
            antUid: obj.user.antUid
        };

        window.Bridge.callHandler(datas, null, function (error) {
            Toast.info(error, 4)
        });
    }

    /**
     * 去评论
     */
    goToComment = () => {
        var _this = this;

        if (localStorage.getItem("userId") == null) {
            var data = {
                method: 'goLoginPage',
            };

            window.Bridge.callHandler(data, function (res) {
                localStorage.setItem("userId", JSON.parse(res).colUid)
                _this.props.loginSuccess()
            }, function (error) {
                Toast.info(error, 4)
            });
            return
        }
        if (!this.props.courseObj.buyed) {
            Toast.info('您还没有购买!', 2)
            return
        }

        this.setState({commentFlag: true})


    }

    /**
     * 评论
     * @param score
     * @param commentValue
     * @param videoId
     */
    comment = (videoNum, score, commentValue, videoId) => {
        addEvaluate(videoNum, videoId, this.props.courseObj.id, commentValue, score, localStorage.getItem("userId")).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                Toast.success('评论成功', 1)
                this.setState({commentFlag: false, page: 1}, () => {
                    this.queryEvaluatePageByCourseId()
                })
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    render() {

        const tabs = [
            {title: <Badge>课程详情</Badge>, index: 0},
            {title: <Badge>课程目录</Badge>, index: 1},
            {title: <Badge>课程评价</Badge>, index: 2},
        ];

        const courseObj = this.props.courseObj

        return (
            <div>
                <Tabs tabs={tabs}
                      initialPage={0}
                      swipeable={false}
                      animated={false}
                      useOnPan={false}
                      onChange={(tab, index) => {
                          if (index === 2) {
                              this.queryEvaluatePageByCourseId()
                              this.setState({commentFlag: false})
                          }
                      }}
                >
                    <div className='detil-tab-item courseDetail'>
                        <WhiteSpace/>
                        <div className='topCont text_color whiteBg'>
                            <div><span
                                className="title_color studyNum">{courseObj.buyUids.length}人学习</span><span>{courseObj.evaluatesCount}人评论</span>
                            </div>
                            <div>授课时间：{FormatTime.formatYMD(courseObj.courseTime)}</div>
                            <div>课时：{courseObj.videoNum}课时</div>
                        </div>
                        <WhiteSpace/>
                        <div className='whiteBg teachDec'>
                            <div className='title title_color'>老师简介</div>
                            {
                                courseObj.users.map((v, i) => {
                                    return <div className='teach_item my_flex' key={i}>
                                        <img src={v.avatar + SMALL_IMG} alt=""/>
                                        <div className='right'>
                                            <div className='userName title_color text_hidden'>{v.userName}</div>
                                            <div className='text text_color text_hidden2'>{v.userContent}</div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <WhiteSpace/>
                        <div className='whiteBg courseDec'>
                            <div className='title title_color'>课程简介</div>
                            <div className='text text_color'>
                                {courseObj.content || ''}
                            </div>
                        </div>
                    </div>
                    <div className='detil-tab-item courseList'>
                        <WhiteSpace/>
                        <div className='whiteBg'>
                            {
                                courseObj.videos.map((v, i) => {
                                    return <div className='my_flex line_public' key={i}>
                                        <div className='num text_color'>{FormatTime.formatNum(i + 1)}</div>
                                        <div className='textCont'>
                                            <div className='title_color'>{v.name}</div>
                                            <div className='text_color'>
                                                授课时间：{FormatTime.formatAllTime(v.liveTime)}
                                                {
                                                    v.videoStatus === '1' ?
                                                        <span className='status text_color'>未开课</span> :
                                                        <span
                                                            className={v.videoStatus === '2' ? 'status icon_live' : 'status icon_playBack'}
                                                            onClick={this.courseOnPlay.bind(this, v)}></span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className='detil-tab-item' id='detil-tab-item3'>
                        <WhiteSpace/>
                        <div className="core whiteBg">
                            <div className="star">
                                <span className="title_color">{courseObj.evaluateAvgNum}</span>
                                {
                                    [1, 2, 3, 4, 5].map((v, i) => {
                                        if (courseObj.evaluateAvgNum > i) {
                                            return <i key={i} className='iconfont icon-shiwujiaoxing'></i>
                                        } else {
                                            return <i key={i} className='iconfont icon-kongwujiaoxing'></i>
                                        }
                                    })
                                }
                                <div className='editorBtn' onClick={this.goToComment}>撰写评论</div>
                            </div>
                            <div className="num">
                                {courseObj.evaluatesCount}人评价
                            </div>
                        </div>
                        <div id='comment_tab'>
                            <CommentList
                                commentList={this.state.CommentArr}
                            />
                            <LoadMore ref='LoadMore' isLoadingMore={this.state.isLoadingMore}
                                      hasMoreClass={this.state.hasMoreClass}
                                      loadMoreFn={this.loadMoreDate.bind(this)}/>
                        </div>
                    </div>
                </Tabs>
                <Comment
                    comment={this.comment}
                    commentFlag={this.state.commentFlag}
                    courseArr={courseObj.videos}
                    closeUl={() => {
                        this.setState({commentFlag: false})
                    }}
                />
            </div>
        )
    }
}

export default CourseTab
