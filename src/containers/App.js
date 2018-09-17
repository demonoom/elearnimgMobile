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
                    <header>
                        <h2>Header</h2>
                    </header>
                    <div>
                        <CacheSwitch>
                            <CacheRoute exact path='/home' component={Home}/>
                            <CacheRoute exact path='/mycourse' component={Mycourse}/>
                            <CacheRoute exact path='/user' component={User}/>
                            <CacheRoute exact path='/search' component={Search}/>
                            <CacheRoute exact path='/Detil' component={Detil}/>
                            <Redirect from='/' to='home'/>
                            <CacheRoute exact component={Home}/>
                        </CacheSwitch>
                    </div>
                    <div className='tab'>
                        <div className='tab-item'>
                            <NavLink className='nav-link' to='/home'>
                                <span>发现课程</span>
                            </NavLink>
                        </div>
                        <div className='tab-item'>
                            <NavLink className='nav-link' to='/mycourse'>
                                <span>我的课程</span>
                            </NavLink>
                        </div>
                        <div className='tab-item'>
                            <NavLink className='nav-link' to='/user'>
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
