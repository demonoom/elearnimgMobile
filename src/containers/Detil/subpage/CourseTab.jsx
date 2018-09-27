import React from 'react'
import {Tabs, Badge, WhiteSpace, Toast} from 'antd-mobile'
import './style.less'
import FormatTime from '../../../util/formatTime'
import {SMALL_IMG} from '../../../util/const'
import {queryEvaluatePageByCourseId} from '../../../fetch/detil/detil'
import CommentList from '../../../components/CommentList'

class CourseTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            CommentArr: [],
        }
    }

    queryEvaluatePageByCourseId = () => {
        queryEvaluatePageByCourseId(this.props.courseObj.id, this.state.page).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({CommentArr: this.state.CommentArr.concat(res.response)})
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
            <Tabs tabs={tabs}
                  initialPage={0}
                  swipeable={false}
                  animated={false}
                  useOnPan={false}
                  onChange={(tab, index) => {
                      if (index === 2) {
                          this.queryEvaluatePageByCourseId()
                      }
                  }}
            >
                <div className='detil-tab-item courseDetail'>
                    <WhiteSpace/>
                    <div className='topCont text_color'>
                        <div>好评率：98% <span>{courseObj.evaluates.length}人评论</span></div>
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
                                        <div className='text text_color'>{v.userContent}</div>
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
                    <WhiteSpace/>
                </div>
                <div className='detil-tab-item courseList'>
                    <WhiteSpace/>
                    {
                        courseObj.videos.map((v, i) => {
                            return <div className='my_flex line_public' key={i}>
                                <div className='num text_color'>{FormatTime.formatNum(i + 1)}</div>
                                <div className='textCont'>
                                    <div className='title_color'>{v.name}</div>
                                    <div className='text_color'>
                                        授课时间：{FormatTime.formatAllTime(v.liveTime)}
                                        {/*<span className='status text_color'>未开课</span>*/}
                                        {/*<span className='status icon_record'></span>*/}
                                        {/*<span className='status icon_live'></span>*/}
                                        <span className='status icon_playBack'></span>

                                    </div>
                                </div>
                            </div>
                        })
                    }
                    <WhiteSpace/>
                </div>
                <div className='detil-tab-item'>
                    <WhiteSpace/>
                    <div className="core">
                        <div className="star">
                            <span className="title_color">8.2</span>
                            <i className="iconfont icon-shiwujiaoxing"></i>
                            <i className="iconfont icon-shiwujiaoxing"></i>
                            <i className="iconfont icon-shiwujiaoxing"></i>
                            <i className="iconfont icon-shiwujiaoxing"></i>
                            <i className="iconfont icon-kongwujiaoxing"></i>
                            <div className='editorBtn'>撰写评论</div>
                        </div>
                        <div className="num">
                            1123人评价
                        </div>
                    </div>
                    <WhiteSpace/>
                    <div>
                        <CommentList
                            commentList={this.state.CommentArr}
                        />
                    </div>
                </div>
            </Tabs>
        )
    }
}

export default CourseTab
