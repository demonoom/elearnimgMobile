import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect} from "react-router-dom"
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
import SeeMoreLiving from '../containers/SeeMoreLiving'
import Teacher from '../containers/Teacher'
import BindPhoneNum from '../containers/BindPhoneNum'
import {Toast} from 'antd-mobile'
// import VConsole from 'vconsole/dist/vconsole.min.js'

// let vConsole = new VConsole()

let navClickFlag = false
let timeout

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
        window.__quit__ = this.quit
    }

    quit = () => {
        this.setState({navWord: '/home'})
        this.refs.switch.context.router.history.replace('/home')
    }

    componentDidMount() {
        //模拟登录
        this.props.userInfoActions.login({userId: '500001020'})
        // localStorage.setItem("antUid", 23993)
        // localStorage.setItem("userId", "500001051")
        // localStorage.setItem("userId", "500001326")
        // localStorage.setItem("version", this.refs.switch.context.router.route.location.pathname.split('/')[2])
    }

    navOnClick = (word) => {

        if (word === this.refs.switch.context.router.route.location.pathname) {
            return
        }

        var _this = this;
        if (word !== '/home' && word !== '/seemore/sjkc' && localStorage.getItem("userId") == null) {
            var data = {
                method: 'goLoginPage',
            };

            if (this.refs.switch.context.router.route.location.pathname === '/seemore/sjkc') {
                data.col = 'black'
            } else {
                data.col = 'white'
            }

            window.Bridge.callHandler(data, function (res) {
                localStorage.setItem("userId", JSON.parse(res).colUid)
                if (!!JSON.parse(res).antUid) {
                    //这个判断用于是小蚂蚁账号登录的
                    localStorage.setItem("antUid", JSON.parse(res).antUid)
                }
                _this.refs.switch.context.router.history.push(word)
                _this.setState({navWord: word})
                _this.forcedReturn(res)
            }, function (error) {
                Toast.info(error, 4)
            });
            return
        }
        if (!navClickFlag) {
            navClickFlag = true
            this.setState({navWord: word})
            this.refs.switch.context.router.history.replace(word)
            if (timeout) {
                clearTimeout(timeout)
            }
            timeout = setTimeout(function () {
                navClickFlag = false
            }, 400)
        }
    }

    /**
     * 强制退出
     */
    forcedReturn = (res) => {
        var _this = this;
        var data = {
            method: 'forcedReturn',
            data: res
        };
        window.Bridge.callHandler(data, function (res) {
            Toast.info('您的账号在别处登录,您已被强制下线!', 3)
            localStorage.removeItem("userId");
            localStorage.removeItem("antUid");
            setTimeout(function () {
                _this.quit()
            }, 3000)
        }, function (error) {
            Toast.info(error, 4)
        });
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
                        <CacheRoute className='content_window' path='/seemore/:type' component={SeeMore}
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
                        <CacheRoute className='content_window_all' path='/bindPhoneNum/:id/:name'
                                    component={BindPhoneNum}
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
                        <CacheRoute className='content_window_all' path='/seemoreliving' component={SeeMoreLiving}
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
                        <CacheRoute className='content_window_all' path='/teacher/:id' component={Teacher}
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
                            <div className='nav-link' onClick={this.navOnClick.bind(this, '/home')}>
                                <i></i>
                                <span>首页</span>
                            </div>
                        </div>
                        <div
                            className={this.state.navWord === '/seemore/sjkc' ? 'tab-item tab_sort active' : 'tab-item tab_sort'}>
                            <div className='nav-link' onClick={this.navOnClick.bind(this, '/seemore/sjkc')}>
                                <i></i>
                                <span>分类</span>
                            </div>
                        </div>
                        <div
                            className={this.state.navWord === '/mycourse' ? 'tab-item tab_myCurriculum active' : 'tab-item tab_myCurriculum'}>
                            {/*<NavLink className='nav-link' to='/mycourse'*/}
                            <div className='nav-link'
                                 onClick={this.navOnClick.bind(this, '/mycourse')}>
                                <i></i>
                                <span>课表</span>
                            </div>
                        </div>
                        <div
                            className={this.state.navWord === '/user' ? 'tab-item tab_person active' : 'tab-item tab_person'}>
                            <div className='nav-link' onClick={this.navOnClick.bind(this, '/user')}>
                                <i></i>
                                <span>我的</span>
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
