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
                        <CacheRoute className='content_window' path='/home' component={Home}/>
                        <CacheRoute className='content_window' path='/mycourse' component={Mycourse}/>
                        <CacheRoute className='content_window' path='/user' component={User}/>
                        <CacheRoute className='content_window_all' path='/search' component={Search}/>
                        <CacheRoute className='content_window_all' path='/detil/:id/:publisherId' component={Detil}/>
                        <Redirect from='/' to='home'/>
                        <CacheRoute className='content_window' component={Home}/>
                    </CacheSwitch>
                    <div className='tab'>
                        <div className='tab-item tab_course active'>
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
