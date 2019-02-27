import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast, Icon} from 'antd-mobile'
import DetilHeader from '../../components/DetilHeader'
import CourseTab from './subpage/CourseTab'
import {findCourseByCourseId, addCollection, updateCollection} from '../../../src/fetch/detil/detil'
import {LARGE_IMG, LIVE_MANAGER_ARRAY, YICHANG_DIANJUN_LIVE_ARRAY} from '../../util/const'
import Comment from '../../components/Comment'
import {addEvaluate} from '../../../src/fetch/comment/comment'
import defaultImg from '../../static/img/error.png'
import {findUserById} from '../../fetch/user/user'

class Detil extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            courseObj: false,     //课程对象
            collectionStar: false,
            commentFlag: false
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
        this.changeTitleCol('white');
    }

    /**
     * 改变title颜色
     * @param col
     */
    changeTitleCol = (col) => {
        var dataCol = {
            method: 'changeTitleCol',
            col: col,
        };

        window.Bridge.callHandler(dataCol, null, function (error) {
            // Toast.info(error, 4)
        });
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
        this.changeTitleCol('white');
        this.refs.detil.parentNode.style.height = `${window.innerHeight}px`
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
                var courseObj = res.response
                if (LIVE_MANAGER_ARRAY.indexOf(Number(localStorage.getItem('antUid'))) !== -1 || YICHANG_DIANJUN_LIVE_ARRAY.indexOf(Number(localStorage.getItem('antUid'))) !== -1) {
                    courseObj.buyed = true
                }
                this.setState({courseObj, collectionStar: courseObj.collect})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    courseOnClick = () => {
        var _this = this;

        if (localStorage.getItem("userId") == null) {
            var data = {
                method: 'goLoginPage',
            };

            window.Bridge.callHandler(data, function (res) {
                findUserById(JSON.parse(res).colUid).then((res) => {
                    if (res.msg === '调用成功' && res.success) {
                        console.log(res.response.schoolId);
                        localStorage.setItem("schoolId", res.response.schoolId)
                    } else {
                        Toast.fail(res.msg, 2)
                    }
                })
                localStorage.setItem("userId", JSON.parse(res).colUid)
                if (!!JSON.parse(res).antUid) {
                    localStorage.setItem("antUid", JSON.parse(res).antUid)
                }
                _this.findCourseByCourseId()
                _this.forcedReturn(res)
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
                col: 'white'
            };

            window.Bridge.callHandler(data, function (res) {
                findUserById(JSON.parse(res).colUid).then((res) => {
                    if (res.msg === '调用成功' && res.success) {
                        console.log(res.response.schoolId);
                        localStorage.setItem("schoolId", res.response.schoolId)
                    } else {
                        Toast.fail(res.msg, 2)
                    }
                })
                localStorage.setItem("userId", JSON.parse(res).colUid)
                if (!!JSON.parse(res).antUid) {
                    localStorage.setItem("antUid", JSON.parse(res).antUid)
                }
                _this.findCourseByCourseId()
                _this.forcedReturn(res)
            }, function (error) {
                Toast.info(error, 4)
            });
            return
        }

        const type = Number(this.state.courseObj.money) > 0 ? 2 : 1

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

    /**
     * 评论
     * @param score
     * @param commentValue
     * @param videoId
     */
    comment = (videoNum, score, commentValue, videoId) => {
        addEvaluate(videoNum, videoId, this.state.courseObj.id, commentValue, score, localStorage.getItem("userId")).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                Toast.success('评论成功', 1)
                this.setState({commentFlag: false}, () => {
                    this.refs.course_tab.queryEvaluatePageByCourseIdUseFirstPage()
                })
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    setCommentFlag = (flag) => {
        this.setState({commentFlag: flag})
    }

    imgOnError = (e) => {
        e.target.src = defaultImg
    }

    /**
     * 强制退出
     */
    forcedReturn = (res) => {
        var data = {
            method: 'forcedReturn',
            data: res
        };
        window.Bridge.callHandler(data, function (res) {
            Toast.info('您的账号在别处登录,您已被强制下线!', 3)
            localStorage.removeItem("userId");
            localStorage.removeItem("antUid");
            localStorage.removeItem("schoolId");
            setTimeout(function () {
                window.__quit__()
            }, 3000)
        }, function (error) {
            // Toast.info(error, 4)
        });
    }

    render() {

        if (!!this.state.courseObj) {
            var videoStatus = this.state.courseObj.videos[0].videoStatus
            // const courseObj = this.state.courseObj

        }

        // console.log(this.state.courseObj);
        // if (!!this.state.courseObj) {
        //     const courseObj = this.state.courseObj;
        // }

        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div id='detil' ref='detil'>
                    <DetilHeader
                        collectFlag={false}
                        title={this.state.courseObj.courseName}
                        collectionStar={this.state.collectionStar}
                        ref='header'
                        collectionOnClick={this.collectionOnClick}
                    />
                    <div className='detil_content' style={{height: this.state.courseObj.buyed ? '100%' : ''}}>
                        <div className="imgDiv">
                            <img src={this.state.courseObj.image + LARGE_IMG} alt="" onError={this.imgOnError}/>
                            <div className="imgMask"><i className='iconfont icon-bofang'
                                                        onClick={this.courseOnClick}
                                                        style={{display: videoStatus === '1' ? 'none' : ''}}></i></div>
                        </div>
                        <div className={this.state.courseObj.buyed ? 'detil-tab' : 'detil-tab borderGray'}
                             style={{
                                 textAlign: this.state.courseObj ? '' : 'center',
                                 marginTop: this.state.courseObj ? '' : '0.1rem'
                             }}
                        >
                            {
                                this.state.courseObj ?
                                    <CourseTab ref='course_tab' setCommentFlag={this.setCommentFlag}
                                               courseObj={this.state.courseObj}
                                               loginSuccess={this.loginSuccess}/> : <Icon type='loading'/>
                            }
                        </div>
                    </div>
                    <Comment
                        comment={this.comment}
                        commentFlag={this.state.commentFlag}
                        courseArr={this.state.courseObj.videos}
                        closeUl={() => {
                            this.setState({commentFlag: false})
                        }}
                    />
                    <div className='detil_content_bottom'
                         style={{display: this.state.courseObj.buyed ? 'none' : ''}}>
                        <div className='detil_content_bottom_left'>
                            {Number(this.state.courseObj.money) > 0 ?
                                <span className='price'><span>¥ </span>{this.state.courseObj.money}</span> :
                                <span className='free'>免费</span>
                            }
                            <span
                                className='personBuy text_color'>{this.state.courseObj ? this.state.courseObj.buyUids.length : 0}人购买</span>
                        </div>
                        <div onClick={this.buyCourse}
                             className='detil_content_bottom_right'>{Number(this.state.courseObj.money) > 0 ? '立即购买' : '立即报名'}</div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default Detil
