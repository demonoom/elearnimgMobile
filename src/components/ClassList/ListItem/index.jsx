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
                <div>
                    <div>{itemObj.courseName}</div>
                    <div>{itemObj.courseType.name}</div>
                    <div>
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
