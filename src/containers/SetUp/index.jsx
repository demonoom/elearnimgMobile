import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import PublicHeader from '../../components/PublicHeader'
import {List, Switch} from 'antd-mobile';
import {createForm} from 'rc-form';
import {Toast} from 'antd-mobile'

class SetUp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            truelyHeight: '',
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
            this.refs.SetUp.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.changeTitleCol('black');
        this.refs.SetUp.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        this.setState({show: true, truelyHeight: this.refs.SetUp.parentNode.offsetHeight})
    }

    /**
     * 退出
     */
    quitOnClick = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("antUid");
        window.history.go(-1)
        Toast.success('退出成功', 1)
        setTimeout(function () {
            window.__quit__()
        }, 1000)
    }

    render() {

        let SwitchExample = (props) => {
            const {getFieldProps} = props.form;
            return (
                <List>
                    <List.Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                            onClick={(checked) => {
                                console.log(checked);
                            }}
                        />}
                    >上课短信通知</List.Item>
                </List>
            );
        };

        SwitchExample = createForm()(SwitchExample);

        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='set_up positionBg' ref='SetUp'>
                    <PublicHeader
                        title='设置'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType=''
                        iconClass=''
                    />
                    <div className='set_up_content overflowScroll'>
                        <SwitchExample/>
                        <div className="quite" onClick={this.quitOnClick}>退出登录</div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default SetUp
