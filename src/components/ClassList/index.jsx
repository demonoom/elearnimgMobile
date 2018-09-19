import React from 'react'
import ListItem from './ListItem'
import {Icon} from 'antd-mobile'

class ClassList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const courseList = this.props.courseList
        return (
            <div>
                {
                    courseList ? courseList.map((v, i) => {
                        return <ListItem key={i} itemObj={v}/>
                    }) : <Icon type='loading'/>
                }
            </div>
        )
    }
}

export default ClassList
