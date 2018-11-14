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
        var courseList;
        //直播课返回null前端过滤处理逻辑,11.14
        if (this.props.courseList != null) {
            courseList = this.props.courseList.filter((v) => {
                return v != null
            })
        }
        return (
            <div id='classList'
                 style={!courseList ? {textAlign: 'center', paddingTop: '.15rem'} : {marginTop: '.1rem'}}>
                {
                    !!courseList ? courseList.length ? courseList.map((v, i) => {
                        return <ListItem key={i} itemObj={v} listType={this.props.listType}/>
                    }) : this.props.networkOver ? <div style={{textAlign: "center", paddingTop: '1rem'}}>
                        <img src={none_img} alt=""/>
                        <div style={{marginTop: '.2rem', fontSize: '.15rem', color: '#2A3350'}}>还没有内容哦</div>
                    </div> : '' : <Icon type='loading'/>
                }
            </div>
        )
    }
}

export default ClassList
