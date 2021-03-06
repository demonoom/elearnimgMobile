import React from 'react'
import {getCourseByTodayV3ByTime} from '../../../fetch/seemore-living/seemore-living'
import ClassList from '../../../components/ClassList'
import './style.less'
import {Toast} from 'antd-mobile'
import {NavLink} from 'react-router-dom'
import FormatTime from '../../../util/formatTime'

class Living extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            livingLength: 0,
            networkOver: false
        }
    }

    componentDidMount() {
        this.getCourseByTodayV3()
    }

    getCourseByTodayV3 = () => {
        /**
         * 获取今日直播
         */
        getCourseByTodayV3ByTime(FormatTime.formatYMD(new Date().getTime()), FormatTime.formatYMD(new Date().getTime())).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                var length = res.response.length
                length > 6 ? this.setState({
                    courseList: res.response.splice(0, 6).map((v) => {
                        return v
                    })
                }) : this.setState({
                    courseList: res.response.map((v) => {
                        return v
                    })
                })
                this.setState({livingLength: length, networkOver: true})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    render() {

        return (
            <div style={{display: this.state.livingLength === 0 ? 'none' : ''}}>
                <h4 className='title_color same_title noBottom' style={{textAlign: 'center'}}>
                    今日直播
                </h4>
                <ClassList
                    listType='1'
                    courseList={this.state.courseList}
                    networkOver={this.state.networkOver}
                />
                <div>
                    <NavLink className='item_to_all' to='/seemoreliving' style={{marginTop: '.1rem'}}>
                        查看全部 >
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Living
