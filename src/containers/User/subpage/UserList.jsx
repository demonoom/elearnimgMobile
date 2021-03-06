import React from 'react'
import {List} from 'antd-mobile'
import './style.less'
import Icon_order from '../../../static/img/icon_person_order.png'
import Icon_collect from '../../../static/img/icon_person_collect.png'
import Icon_bind from '../../../static/img/icon_person_bind.png'
import Icon_overMoney from '../../../static/img/icon_person_overMoney.png'
import Icon_setting from '../../../static/img/icon_person_setting.png'
import {NavLink} from "react-router-dom"

const Item = List.Item;

class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    goLoginPage() {

    }

    render() {
        const count = this.props.count
        const phoneNumber = this.props.phoneNumber
        const colUid = this.props.colUid
        const userName = this.props.userName

        return (
            <div className='user_list'>
                <List>
                    <NavLink to='/myorder'>
                        <Item
                            className='user_list_item order'
                            thumb={Icon_order}
                            arrow="horizontal"
                            onClick={() => {
                            }}
                        >我的订单</Item>
                    </NavLink>
                    <NavLink to='/mycollection'>
                        <Item
                            className='user_list_item collect'
                            thumb={Icon_collect}
                            onClick={() => {
                            }}
                            arrow="horizontal"
                        >
                            我的收藏
                        </Item>
                    </NavLink>
                    <NavLink to={`/bindPhoneNum/${colUid}/${userName}`}>
                        <Item
                            className='user_list_item bind'
                            thumb={Icon_bind}
                            onClick={() => {
                                this.goLoginPage()
                            }}
                            arrow="horizontal"
                            extra={!!phoneNumber ? phoneNumber : '请绑定'}
                        >
                            绑定手机号
                        </Item>
                    </NavLink>
                    <NavLink to={`/mybalance/${count}`}>
                        <Item
                            className='user_list_item overMoney'
                            thumb={Icon_overMoney}
                            onClick={() => {
                            }}
                            arrow="horizontal"
                        >
                            我的余额
                        </Item>
                    </NavLink>
                    <NavLink to='/setup'>
                        <Item
                            className='user_list_item setting'
                            thumb={Icon_setting}
                            onClick={() => {
                            }}
                            arrow="horizontal"
                        >
                            设置
                        </Item>
                    </NavLink>
                </List>
            </div>
        )
    }
}

export default UserList



