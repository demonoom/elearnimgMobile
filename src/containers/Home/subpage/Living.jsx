import React from 'react'
import {getCourseByTodayV3} from '../../../fetch/home/home'
import ClassList from '../../../components/ClassList'
import './style.less'
import {Toast} from 'antd-mobile'

class Living extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            livingLength: 0,
        }
    }

    componentDidMount() {
        /**
         * 获取今日直播
         */
        getCourseByTodayV3().then((res) => {
            if (res.msg === '调用成功' && res.success) {
                var length = res.response.length
                length > 2 ? this.setState({
                    courseList: res.response.splice(0, 2).map((v) => {
                        return v.course
                    })
                }) : this.setState({
                    courseList: res.response.map((v) => {
                        return v.course
                    })
                })
                this.setState({livingLength: length})
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
                    <i className="iconfont icon-shenglvehao1"></i>
                </h4>
                <ClassList
                    courseList={this.state.courseList}
                />
            </div>
        )
    }
}

export default Living
