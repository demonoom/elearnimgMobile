import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast, Icon} from 'antd-mobile'
import DetilHeader from '../../components/DetilHeader'
import CourseTab from './subpage/CourseTab'
import {findCourseByCourseId} from '../../../src/fetch/detil/detil'

class Detil extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            courseObj: false,     //课程对象
        }
    }

    componentDidMount() {
        this.setState({show: true})
        /**
         * 获取课程详情
         */
        findCourseByCourseId(this.props.match.params.id, this.props.match.params.publisherId).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({courseObj: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    courseOnClick = () => {
        console.log(this.state.courseObj);

        var data = {
            method: 'openElearningClass',
            vid: 210984,
            videoName: 4,
            videoStatus: 3,
            antUid: 141088
        };

        window.Bridge.callHandler(data, null, function (error) {
            Toast.info(error, 4)
        });
    }

    render() {
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div id='detil'>
                    <DetilHeader
                        title={this.state.courseObj.courseName}
                        ref='header'
                    />
                    <div className='detil_content'>
                        <div className="imgDiv">
                            <img src={this.state.courseObj.image} alt=""/>
                            <div className="imgMask"><i className='iconfont icon-bofang'
                                                        onClick={this.courseOnClick}></i></div>
                        </div>
                        <div className='detil-tab'>
                            {
                                this.state.courseObj ?
                                    <CourseTab courseObj={this.state.courseObj}/> : <Icon type='loading'/>
                            }
                        </div>
                    </div>
                    <div className='detil_content_bottom'>
                        <div className='detil_content_bottom_left'>
                            {this.state.courseObj.money === '0.00' ?
                                <span className='free'>免费</span> :
                                <span className='price'>¥ {this.state.courseObj.money}</span>}
                            <span
                                className='personBuy text_color'>{this.state.courseObj ? this.state.courseObj.buyUids.length : 0}人购买</span>
                        </div>
                        <div className='detil_content_bottom_right'>立即购买</div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default Detil
