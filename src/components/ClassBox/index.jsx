import React from 'react'
import BoxItem from './BoxItem'
import './style.less'

class ClassBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            coruseType: 'recommend'
        }
    }

    defaultCourseType = () => {
        this.setState({coruseType: 'hot'})
    }

    changeCoruseType = (type) => {
        this.setState({coruseType: type}, () => {
            this.props.changeCoruseType(type)
        })
    }

    setDefaultCoruseType = (type) => {
        this.setState({coruseType: type})
    }

    render() {
        const classroomContent = this.props.classroomContent;
        return (
            <div>
                <div className='tabTitle_index' style={{display: this.props.typeGuoLv ? 'block' : 'none'}}>
                    <span onClick={this.changeCoruseType.bind(this, 'recommend')}
                          className={this.state.coruseType === 'recommend' ? 'active' : ''}>推荐</span>
                    <span onClick={this.changeCoruseType.bind(this, 'sjkc')}
                          className={this.state.coruseType === 'sjkc' ? 'active' : ''}>实景课堂</span>
                    <span onClick={this.changeCoruseType.bind(this, 'cgkc')}
                          className={this.state.coruseType === 'cgkc' ? 'active' : ''}>常规课堂</span>
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
