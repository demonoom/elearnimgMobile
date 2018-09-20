import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, NavLink} from "react-router-dom"
import CacheRoute, {CacheSwitch} from 'react-router-cache-route'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionFormOtherFile from '../actions/userinfo'
import './App.less'
import Home from '../containers/Home'
import User from '../containers/User'
import Mycourse from '../containers/MyCourse'
import Search from '../containers/Search'
import Detil from '../containers/Detil'

class App extends Component {

    componentDidMount() {
        this.props.userInfoActions.login({ident: '23836'})
    }

    render() {
        return (
            <Router>
                <div>
                    <CacheSwitch>
                        <CacheRoute className='content_window' path='/home' component={Home}
                                    behavior={cached => (cached ? {
                                        style: {
                                            position: 'absolute',
                                            zIndex: -9999,
                                            opacity: 0,
                                            visibility: 'hidden',
                                            pointerEvents: 'none'
                                        },
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window' path='/mycourse' component={Mycourse}
                                    behavior={cached => (cached ? {
                                        style: {
                                            position: 'absolute',
                                            zIndex: -9999,
                                            opacity: 0,
                                            visibility: 'hidden',
                                            pointerEvents: 'none'
                                        },
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window' path='/user' component={User}
                                    behavior={cached => (cached ? {
                                        style: {
                                            position: 'absolute',
                                            zIndex: -9999,
                                            opacity: 0,
                                            visibility: 'hidden',
                                            pointerEvents: 'none'
                                        },
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/search' component={Search}
                                    behavior={cached => (cached ? {
                                        style: {
                                            position: 'absolute',
                                            zIndex: -9999,
                                            opacity: 0,
                                            visibility: 'hidden',
                                            pointerEvents: 'none'
                                        },
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/detil/:id/:publisherId' component={Detil}
                                    behavior={cached => (cached ? {
                                        style: {
                                            position: 'absolute',
                                            zIndex: -9999,
                                            opacity: 0,
                                            visibility: 'hidden',
                                            pointerEvents: 'none'
                                        },
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <Redirect from='/' to='home'/>
                        <CacheRoute className='content_window' component={Home} behavior={cached => (cached ? {
                            style: {
                                position: 'absolute',
                                zIndex: -9999,
                                opacity: 0,
                                visibility: 'hidden',
                                pointerEvents: 'none'
                            },
                            className: '__CacheRoute__wrapper__cached'
                        } : {
                            className: '__CacheRoute__wrapper__uncached'
                        })}/>
                    </CacheSwitch>
                    <div className='tab'>
                        <div className='tab-item tab_course'>
                            <NavLink className='nav-link' to='/home'>
                                <i></i>
                                <span>发现课程</span>
                            </NavLink>
                        </div>
                        <div className='tab-item tab_myCurriculum'>
                            <NavLink className='nav-link' to='/mycourse'>
                                <i></i>
                                <span>我的课表</span>
                            </NavLink>
                        </div>
                        <div className='tab-item tab_person'>
                            <NavLink className='nav-link' to='/user'>
                                <i></i>
                                <span>个人中心</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

/**
 * 展示信息(从state获取)
 * @returns {{}}
 */
function mapStateToProps() {
    return {}
}

/**
 * 设置到state
 * @param dispatch
 * @returns {{userInfoActions: (ActionCreator<A> | ActionCreator<any> | ActionCreatorsMapObject<A> | ActionCreatorsMapObject<any>)}}
 */
function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionFormOtherFile, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
