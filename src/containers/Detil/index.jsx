import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast, Icon} from 'antd-mobile'
import DetilHeader from '../../components/DetilHeader'
import CourseTab from './subpage/CourseTab'
import {findCourseByCourseId, addCollection, updateCollection} from '../../../src/fetch/detil/detil'
import {LARGE_IMG} from '../../util/const'

class Detil extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            courseObj: false,     //课程对象
            truelyHeight: '',
            collectionStar: false,
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.detil.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.detil.parentNode.style.height = `${this.state.truelyHeight}px`
        this.findCourseByCourseId()
    }

    componentDidMount() {
        if (window.location.href.indexOf('openNewPage') !== -1) {
            this.setState({show: false})
        } else {
            this.setState({show: true})
        }

        this.findCourseByCourseId()

    }

    findCourseByCourseId() {
        /**
         * 获取课程详情
         */
        findCourseByCourseId(this.props.match.params.id, localStorage.getItem("userId") || '').then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({courseObj: res.response, collectionStar: res.response.collect})
            } else {
                Toast.fail(res.msg, 2)
            }
        }).then(() => {
            // eslint-disable-next-line
            this.state.truelyHeight = this.refs.detil.parentNode.offsetHeight
        })
    }

    courseOnClick = () => {
        var _this = this;

        if (localStorage.getItem("userId") == null) {
            var data = {
                method: 'goLoginPage',
            };

            window.Bridge.callHandler(data, function (res) {
                localStorage.setItem("userId", JSON.parse(res).colUid)
                _this.findCourseByCourseId()
            }, function (error) {
                Toast.info(error, 4)
            });
            return
        }

        if (!this.state.courseObj.buyed) {
            Toast.info('您还没有购买!')
            return
        }

        var datas = {
            method: 'openElearningClass',
            vid: this.state.courseObj.videos[0].virtual_classId,
            videoName: this.state.courseObj.videos[0].name,
            videoStatus: this.state.courseObj.videos[0].videoStatus,
            antUid: this.state.courseObj.videos[0].user.antUid
        };

        window.Bridge.callHandler(datas, null, function (error) {
            Toast.info(error, 4)
        });
    }

    loginSuccess = () => {
        this.findCourseByCourseId()
    }

    /**
     * 买课
     */
    buyCourse = () => {
        var _this = this;

        if (localStorage.getItem("userId") == null) {
            var data = {
                method: 'goLoginPage',
            };

            window.Bridge.callHandler(data, function (res) {
                localStorage.setItem("userId", JSON.parse(res).colUid)
                _this.findCourseByCourseId()
            }, function (error) {
                Toast.info(error, 4)
            });
            return
        }

        const type = this.state.courseObj.money === '0.00' ? 1 : 2

        this.props.history.push(`/placeorder/${type}/${this.state.courseObj.id}`)


    }

    collectionOnClick = () => {

        var collectionStar = this.state.collectionStar
        if (collectionStar) {
            updateCollection(localStorage.getItem("userId"), this.props.match.params.id).then((res) => {
                if (res.msg === '调用成功' && res.success) {
                    this.setState({collectionStar: false})
                } else {
                    Toast.fail(res.msg, 2)
                }
            })
        } else {
            addCollection(localStorage.getItem("userId"), this.props.match.params.id).then((res) => {
                if (res.msg === '调用成功' && res.success) {
                    this.setState({collectionStar: true})
                } else {
                    Toast.fail(res.msg, 2)
                }
            })
        }
    }

    render() {

        if (!!this.state.courseObj) {
            var videoStatus = this.state.courseObj.videos[0].videoStatus
        }

        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div id='detil' ref='detil'>
                    <DetilHeader
                        title={this.state.courseObj.courseName}
                        collectionStar={this.state.collectionStar}
                        ref='header'
                        collectionOnClick={this.collectionOnClick}
                    />
                    <div className='detil_content' style={{height: this.state.courseObj.buyed ? '100%' : ''}}>
                        <div className="imgDiv">
                            <img src={this.state.courseObj.image + LARGE_IMG} alt=""/>
                            <div className="imgMask"><i className='iconfont icon-bofang'
                                                        onClick={this.courseOnClick}
                                                        style={{display: videoStatus === '1' ? 'none' : ''}}></i></div>
                        </div>
                        <div className={this.state.courseObj.buyed ? 'detil-tab' : 'detil-tab borderGray'}>
                            {
                                this.state.courseObj ?
                                    <CourseTab courseObj={this.state.courseObj}
                                               loginSuccess={this.loginSuccess}/> : <Icon type='loading'/>
                            }
                        </div>
                    </div>
                    <div className='detil_content_bottom'
                         style={{display: this.state.courseObj.buyed ? 'none' : ''}}>
                        <div className='detil_content_bottom_left'>
                            {this.state.courseObj.money === '0.00' ?
                                <span className='free'>免费</span> :
                                <span className='price'><span>¥ </span>{this.state.courseObj.money}</span>}
                            <span
                                className='personBuy text_color'>{this.state.courseObj ? this.state.courseObj.buyUids.length : 0}人购买</span>
                        </div>
                        <div onClick={this.buyCourse}
                             className='detil_content_bottom_right'>{this.state.courseObj.money === '0.00' ? '立即报名' : '立即购买'}</div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default Detil
