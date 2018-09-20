import React from 'react'
import './style.less'
import UserList from './subpage/UserList'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        return (
            <div className='user'>
                <div className='user_header'>
                    <div className='leftCont'>
                        <h3 className='title_color text_hidden'>用户名</h3>
                        <div className='idNUm'>id</div>
                    </div>
                    <div className="imgDiv">
                        <img
                            src='http://60.205.86.217/upload6/2018-02-09/19/805eee4a-b707-49a2-9c75-d5b14ed9227b.jpg?size=100x100'
                            alt=""/>
                        <i className='rightArrow'></i>
                    </div>
                </div>
                <UserList/>
            </div>
        )
    }
}

export default User
