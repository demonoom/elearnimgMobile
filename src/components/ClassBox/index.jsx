import React from 'react'
import BoxItem from './BoxItem'
import './style.less'

class ClassBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const classroomContent = this.props.classroomContent;
        return (
            <div>
                <div>
                    <span>精选公开课</span>
                    <span>热门课程</span>
                    <span>最新课程</span>
                    <span>微课</span>
                </div>
                <div className='item_div'>
                    {
                        classroomContent.map((item, index) => {
                            return <BoxItem key={index} data={item}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ClassBox
