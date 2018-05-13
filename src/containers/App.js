import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './App.css'
import Home from '../containers/Home'
import Detil from '../containers/Detil'
import User from '../containers/User'
import Mycourse from '../containers/MyCourse'
import Search from '../containers/Search'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <header>
                        <h2>Header</h2>
                    </header>
                    <div>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/mycourse' component={Mycourse}/>
                            <Route path='/user' component={User}/>
                            <Route path='/detil' component={Detil}/>
                            <Route path='/search' component={Search}/>
                            <Redirect from='/' to='home'/>
                            <Route component={Home}/>
                        </Switch>
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

export default App;
