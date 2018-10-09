import React from 'react'
import './style.less'
import UserList from './subpage/UserList'
import {findUserById} from '../../fetch/user/user'
import {Toast} from 'antd-mobile'
import {SMALL_IMG} from '../../util/const'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionFormOtherFile from '../../actions/userinfo'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            truelyHeight: '',
            loginUser: false
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.User.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.User.parentNode.style.height = `${this.state.truelyHeight}px`
        if (localStorage.getItem("userId") == null) {
            return
        }
        findUserById(localStorage.getItem("userId")).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({loginUser: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    componentDidMount() {
        findUserById(localStorage.getItem("userId")).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({loginUser: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        }).then(() => {
            this.setState({truelyHeight: this.refs.User.parentNode.offsetHeight})
        })
    }

    render() {
        return (
            <div className='user overflowScroll' ref='User'>
                {
                    this.state.loginUser == null ? '' : <div className='user_header'>
                        <img
                            src={this.state.loginUser.avatar + SMALL_IMG}
                            alt=""/>
                        <div className='textCont'>
                            <div className='text_hidden'>{this.state.loginUser.userName}</div>
                            {/*<div className='idNUm'>id</div>*/}
                        </div>
                    </div>
                }
                <UserList
                    count={this.state.loginUser.count}
                    phoneNumber={this.state.loginUser.phoneNumber}
                    colUid={this.state.loginUser.colUid}
                    userName={this.state.loginUser.userName}
                />
            </div>
        )
    }
}

/**
 * 展示信息(从state获取)
 * @returns {{}}
 */
function mapStateToProps(state) {
    return {
        userInfo: state.userinfo
    }
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


export default connect(mapStateToProps, mapDispatchToProps)(User)
