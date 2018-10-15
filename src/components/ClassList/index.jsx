import React from 'react'
import ListItem from './ListItem'
import {Icon} from 'antd-mobile'
import none_img from '../../static/img/none.png'

class ClassList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const courseList = this.props.courseList
        return (
            <div id='classList'
                 style={!courseList ? {textAlign: 'center', paddingTop: '.15rem'} : {marginTop: '.1rem'}}>
                {
                    !!courseList ? courseList.length !== 0 ? courseList.map((v, i) => {
                        return <ListItem key={i} itemObj={v} listType={this.props.listType}/>
                    }) : <div style={{height: '80vh', textAlign: "center", paddingTop: '1rem'}}>
                        <img src={none_img} alt=""/>
                        <div  style={{marginTop:'.2rem', fontSize:'.15rem', color:'#2A3350'}}>还没有内容哦</div>
                    </div> : <Icon type='loading'/>
                }
            </div>
        )
    }
}

export default ClassList
