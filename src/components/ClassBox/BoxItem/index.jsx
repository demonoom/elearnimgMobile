import React from 'react'
import {NavLink} from "react-router-dom"
import './style.less'

class BoxItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const data = this.props.data
        return (
            <div className='item'>
                <NavLink to={`/detil/${data.id}/${data.publisher_id}`}>
                    <img src={data.image} alt="" style={{width: '100%'}}/>
                    <div>{data.courseName}</div>
                </NavLink>
            </div>
        )
    }
}

export default BoxItem
