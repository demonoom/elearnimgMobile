import React from 'react'
import ListItem from './ListItem'

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
                    }) : '正在加载...'
                }
            </div>
        )
    }
}

export default ClassList
