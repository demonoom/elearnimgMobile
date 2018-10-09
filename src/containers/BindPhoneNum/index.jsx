import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast, Button} from 'antd-mobile'
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
                        <div>
                            <input placeholder='请输入手机号' type="text" value={this.state.phoneNum}
                                   onChange={this.phoneOnChange}/>
                        </div>
                        <div>
                            <input type="text" placeholder='请输入验证码' value={this.state.code}
                                   onChange={this.codeOnChange}/>
                            <Button type="warning" size="small" style={{width: '105px'}}
                                    onClick={this.sendMessagebindPhone}>获取验证码</Button>
                        </div>
                        <Button type="warning" onClick={this.validMessagePhoneV3}>绑定</Button>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default BindPhoneNum
