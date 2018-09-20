import React from 'react'
import ListItem from './ListItem'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const myOrderContent = this.props.myOrderContent

        return (
            <div id="orderList">
                {
                    myOrderContent.map((v, i) => {
                        return <ListItem key={i} orderObj={v}/>
                    })
                }
            </div>
        )
    }
}

export default OrderList