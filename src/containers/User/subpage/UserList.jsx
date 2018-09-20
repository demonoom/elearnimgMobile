import React from 'react'
import {List} from 'antd-mobile'
import './style.less'
import Icon_order from '../img/icon_person_order.png'
import Icon_collect from '../img/icon_person_collect.png'
import Icon_bind from '../img/icon_person_bind.png'
import Icon_overMoney from '../img/icon_person_overMoney.png'
import Icon_setting from '../img/icon_person_setting.png'
import {NavLink} from "react-router-dom"

const Item = List.Item;

class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        return (
            <div className='user_list'>
                <List>
                    <NavLink to='/myorder'>
                        <Item
                            className='user_list_item order'
                            thumb={Icon_order}
                            arrow="horizontal"
                            extra="5"
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
                            extra="6"
                        >
                            我的收藏
                        </Item>
                    </NavLink>
                    <Item
                        className='user_list_item bind'
                        thumb={Icon_bind}
                        onClick={() => {
                        }}
                        arrow="horizontal"
                        extra="请绑定"
                    >
                        绑定手机号
                    </Item>
                    <NavLink to='/mybalance'>
                        <Item
                            className='user_list_item overMoney'
                            thumb={Icon_overMoney}
                            onClick={() => {
                            }}
                            arrow="horizontal"
                            extra="0.00币"
                        >
                            我的余额
                        </Item>
                    </NavLink>
                    <Item
                        className='user_list_item setting'
                        thumb={Icon_setting}
                        onClick={() => {
                        }}
                        arrow="horizontal"
                    >
                        设置
                    </Item>
                </List>
            </div>
        )
    }
}

export default UserList
