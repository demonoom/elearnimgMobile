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
                <div className='detil-tab-item'>
                    <WhiteSpace/>
                    <div>
                        <span>好评率:98%</span>
                        <span>{courseObj.evaluates.length}人评论</span>
                        <span>授课时间:{FormatTime.formatYMD(courseObj.courseTime)}</span>
                        <span>课时:{courseObj.videoNum}课时</span>
                    </div>
                    <WhiteSpace/>
                    <div>
                        <div>老师简介</div>
                        {
                            courseObj.users.map((v, i) => {
                                return <div key={i}>
                                    <img src={v.avatar} alt=""/>
                                    <span>{v.userName}</span>
                                    <span>{v.userContent}</span>
                                </div>
                            })
                        }
                    </div>
                    <WhiteSpace/>
                    <div>
                        <div>课程简介</div>
                        <div>
                            {courseObj.content || ''}
                        </div>
                    </div>
                </div>
                <div className='detil-tab-item'>
                    <WhiteSpace/>
                    {
                        courseObj.videos.map((v, i) => {
                            return <div key={i}>
                                <div>{FormatTime.formatNum(i + 1)}</div>
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
