import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, NavLink} from "react-router-dom"
import CacheRoute, {CacheSwitch} from 'react-router-cache-route'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionFormOtherFile from '../actions/userinfo'
import './App.less'
import Home from '../containers/Home'
import User from '../containers/User'
import MyCourse from '../containers/MyCourse'
import Search from '../containers/Search'
import Detil from '../containers/Detil'
import MyOrder from '../containers/MyOrder'
import MyCollection from '../containers/MyCollection'
import MyBalance from '../containers/MyBalance'
import TransactionHistory from '../containers/TransactionHistory'
import BalanceRecharge from '../containers/BalanceRecharge'
import SetUp from '../containers/SetUp'
import SeeMore from '../containers/SeeMore'
import PlaceOrder from '../containers/PlaceOrder'
import {Toast} from 'antd-mobile'

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            navWord: window.location.pathname,
            cachedStyle: {
                position: 'absolute',
                zIndex: -9999,
                pointerEvents: 'none',
            }
        }
    }

    componentDidMount() {
        //模拟登录
        this.props.userInfoActions.login({userId: '500001020'})
        // localStorage.setItem("userId", "500001020")
    }

    navOnClick = (word) => {
        var _this = this;
        if (localStorage.getItem("userId") == null) {
            var data = {
                method: 'goLoginPage',
            };

            window.Bridge.callHandler(data, function (res) {
                localStorage.setItem("userId", JSON.parse(res).colUid)
                _this.refs.switch.context.router.history.push(word)
                _this.setState({navWord: word})
            }, function (error) {
                Toast.info(error, 4)
            });
            return
        }
        this.setState({navWord: word})
        this.refs.switch.context.router.history.push(word)
    }

    render() {
        return (
            <Router>
                <div>
                    <CacheSwitch ref='switch'>
                        <CacheRoute className='content_window' path='/home' component={Home}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window' path='/mycourse' component={MyCourse}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window' path='/user' component={User}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/search' component={Search}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/detil/:id/:publisherId' component={Detil}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/myorder' component={MyOrder}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/mycollection' component={MyCollection}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/mybalance/:count' component={MyBalance}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/balancerecharge' component={BalanceRecharge}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/transactionhistory'
                                    component={TransactionHistory}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/setup' component={SetUp}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/placeorder/:type/:id' component={PlaceOrder}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <CacheRoute className='content_window_all' path='/seemore/:type' component={SeeMore}
                                    behavior={cached => (cached ? {
                                        style: this.state.cachedStyle,
                                        className: '__CacheRoute__wrapper__cached'
                                    } : {
                                        className: '__CacheRoute__wrapper__uncached'
                                    })}/>
                        <Redirect from='/' to='home'/>
                        <CacheRoute className='content_window' component={Home} behavior={cached => (cached ? {
                            style: this.state.cachedStyle,
                            className: '__CacheRoute__wrapper__cached'
                        } : {
                            className: '__CacheRoute__wrapper__uncached'
                        })}/>
                    </CacheSwitch>
                    <div className='tab'>
                        <div
                            className={this.state.navWord === '/home' ? 'tab-item tab_course active' : 'tab-item tab_course'}>
                            <NavLink className='nav-link' to='/home' onClick={this.navOnClick.bind(this, '/home')}>
                                <i></i>
                                <span>发现课程</span>
                            </NavLink>
                        </div>
                        <div
                            className={this.state.navWord === '/mycourse' ? 'tab-item tab_myCurriculum active' : 'tab-item tab_myCurriculum'}>
                            {/*<NavLink className='nav-link' to='/mycourse'*/}
                            <div className='nav-link'
                                 onClick={this.navOnClick.bind(this, '/mycourse')}>
                                <i></i>
                                <span>我的课表</span>
                            </div>
                        </div>
                        <div
                            className={this.state.navWord === '/user' ? 'tab-item tab_person active' : 'tab-item tab_person'}>
                            <div className='nav-link' onClick={this.navOnClick.bind(this, '/user')}>
                                <i></i>
                                <span>个人中心</span>
                            </div>
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
