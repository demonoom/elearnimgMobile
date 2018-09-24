import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import PublicHeader from '../../components/PublicHeader'
import {List, Switch} from 'antd-mobile';
import {createForm} from 'rc-form';

class SetUp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
        }
    }

    componentDidMount() {
        this.setState({show: true})
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
                <div className='set_up positionBg'>
                    <PublicHeader
                        title='设置'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType=''
                        iconClass=''
                    />
                    <div className='set_up_content'>
                        <SwitchExample/>
                        <div>退出登录</div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default SetUp
