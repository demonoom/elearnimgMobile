import React from 'react'
import ListItem from './ListItem'

class RecordList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const recordArr = this.props.recordArr
        
        return (
            <div id="record_list">
                {
                    recordArr.map((v, i) => {
                        return <ListItem key={i} recordObj={v}/>
                    })
                }
            </div>
        )
    }
}

export default RecordList