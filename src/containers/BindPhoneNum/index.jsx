import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast} from 'antd-mobile'
import PublicHeader from '../../components/PublicHeader'
import {sendMessagebindPhone, validMessagePhoneV3, updateUserV3} from '../../fetch/bind-phone/bind-phone'

class BindPhoneNum extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            truelyHeight: '',
            phoneNum: '',
            code: '',
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
        this.changeTitleCol('black');
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
            this.refs.Bind_Phone.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.changeTitleCol('black');
        this.refs.Bind_Phone.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        this.setState({show: true})
    }

    phoneOnChange = (e) => {
        this.setState({phoneNum: e.target.value})
    }

    codeOnChange = (e) => {
        this.setState({code: e.target.value})
    }

    sendMessagebindPhone = () => {
        if (!!this.state.phoneNum) {
            sendMessagebindPhone(this.state.phoneNum).then((res) => {
                if (res.msg === '调用成功') {
                    Toast.success('发送成功', 2)
                }
            })
        } else {
            Toast.fail('请输入手机号', 2)
        }

    }

    validMessagePhoneV3 = () => {
        if (!!this.state.phoneNum && !!this.state.code) {
            validMessagePhoneV3(this.state.phoneNum, this.state.code).then((res) => {
                if (res.msg === '调用成功' && res.success) {
                    updateUserV3(this.state.phoneNum, this.props.match.params.name, this.props.match.params.id).then((res) => {
                        if (res.msg === '调用成功' && res.success) {
                            Toast.success('绑定成功', 1)
                            setTimeout(function () {
                                window.history.go(-1)
                            }, 1000)
                        } else {
                            Toast.fail(res.msg, 2)
                        }
                    })
                } else {
                    Toast.fail(res.msg, 2)
                }
            })
        } else {
            Toast.fail('请输入手机号或验证码', 2)
        }
    }

    render() {
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='Bind_Phone positionBg' ref='Bind_Phone'>
                    <PublicHeader
                        title='绑定手机'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType=''
                        iconClass=''
                    />
                    <div className='Bind_content overflowScroll'
                         ref='order_content'
                    >
                        <div className='inputDiv phoneDiv'>
                            <input placeholder='请输入手机号' type="text" value={this.state.phoneNum}
                                   onChange={this.phoneOnChange}/>
                        </div>
                        <div className='inputDiv codeDiv'>
                            <input type="text" placeholder='请输入验证码' value={this.state.code}
                                   onChange={this.codeOnChange}/>
                            <span className="code" onClick={this.sendMessagebindPhone}>
                                获取验证码
                            </span>
                        </div>
                        <div className="blueBtn" onClick={this.validMessagePhoneV3}>
                            绑定
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default BindPhoneNum
