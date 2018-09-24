import React from 'react'
import './style.less'
import UserList from './subpage/UserList'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            truelyHeight: '',
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
    }

    componentDidMount() {
        this.setState({truelyHeight: this.refs.User.parentNode.offsetHeight})
    }

    render() {
        return (
            <div className='user' ref='User'>
                <div className='user_header'>
                    <img
                        src='http://60.205.86.217/upload6/2018-02-09/19/805eee4a-b707-49a2-9c75-d5b14ed9227b.jpg?size=100x100'
                        alt=""/>
                    <div className='textCont'>
                        <div className='text_hidden'>用户名</div>
                        <div className='idNUm'>id</div>
                    </div>
                </div>
                <UserList/>
            </div>
        )
    }
}

export default User
