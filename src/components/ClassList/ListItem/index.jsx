import React from 'react'
import './style.less'
import {NavLink} from "react-router-dom"

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {

        const itemObj = this.props.itemObj;

        return (
            <NavLink to={`/detil/${itemObj.id}/${itemObj.publisher_id}`} className='list_item'>
                <img src={itemObj.image} alt=""/>
                <div className='rightCont text_color'>
                    <div className='title_color text_hidden'>{itemObj.courseName}</div>
                    <div className='tag orange'>{itemObj.courseType.name}</div>
                    <div className='name text_hidden'>
                        {
                            itemObj.users.map((v, i) => {
                                return <span key={i}>{v.userName}</span>
                            })
                        }
                    </div>
                </div>
            </NavLink>
        )
    }
}

export default ListItem
