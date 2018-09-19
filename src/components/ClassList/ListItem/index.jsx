import React from 'react'
import './style.less'

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {

        const itemObj = this.props.itemObj

        return (
            <div className='list_item'>
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
            </div>
        )
    }
}

export default ListItem
