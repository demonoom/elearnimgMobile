import React from 'react'
import {Tabs, Badge, WhiteSpace} from 'antd-mobile'
import './style.less'
import FormatTime from '../../../util/formatTime'

class CourseTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
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
            >
                <div className='detil-tab-item courseDetail'>
                    <WhiteSpace/>
                    <div className='topCont text_color'>
                        <div>好评率：98%  <span>{courseObj.evaluates.length}人评论</span></div>
                        <div>授课时间：{FormatTime.formatYMD(courseObj.courseTime)}</div>
                        <div>课时：{courseObj.videoNum}课时</div>
                    </div>
                    <WhiteSpace/>
                    <div className='whiteBg teachDec'>
                        <div className='title title_color'>老师简介</div>
                        {
                            courseObj.users.map((v, i) => {
                                return <div className='teach_item my_flex' key={i}>
                                    <img src={v.avatar} alt=""/>
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
                                <div className=''>{FormatTime.formatNum(i + 1)}</div>
                                <div>
                                    <div>{v.name}</div>
                                    <div>授课时间：{FormatTime.formatAllTime(v.liveTime)}</div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className='detil-tab-item'>
                    <WhiteSpace/>
                </div>
            </Tabs>
        )
    }
}

export default CourseTab
