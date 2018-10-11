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
            <div id='classList' style={!courseList ? {textAlign: 'center', paddingTop: '.15rem'} : {marginTop: '.1rem'}}>
                {
                    courseList ? courseList.map((v, i) => {
                        return <ListItem key={i} itemObj={v} listType={this.props.listType}/>
                    }) : <Icon type='loading'/>
                }
            </div>
        )
    }
}

export default ClassList
