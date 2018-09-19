import React from 'react'
import {List} from 'antd-mobile'
import './style.less'

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
                    <Item
                        className='user_list_item'
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        extra="5"
                        onClick={() => {
                        }}
                    >我的订单</Item>
                    <Item
                        className='user_list_item'
                        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                        onClick={() => {
                        }}
                        arrow="horizontal"
                        extra="6"
                    >
                        我的收藏
                    </Item>
                    <Item
                        className='user_list_item'
                        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                        onClick={() => {
                        }}
                        arrow="horizontal"
                        extra="请绑定"
                    >
                        绑定手机号
                    </Item>
                    <Item
                        className='user_list_item'
                        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                        onClick={() => {
                        }}
                        arrow="horizontal"
                        extra="0.00币"
                    >
                        我的余额
                    </Item>
                    <Item
                        className='user_list_item'
                        thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
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
