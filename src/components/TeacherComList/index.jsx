import React from 'react'
import {Icon} from 'antd-mobile'
import ListItem from './ListItem'

class TeacherComList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const commentList = this.props.commentList
        return (
            <div id='commentList' style={!commentList ? {textAlign: 'center', paddingTop: '.15rem'} : {}}>
                {
                    commentList ? commentList.map((v, i) => {
                        return <ListItem key={i} itemObj={v}/>
                    }) : <Icon type='loading'/>
                }
            </div>
        )
    }
}

export default TeacherComList
