import React from 'react'
import BoxItem from './BoxItem'
import './style.less'

class ClassBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            coruseType: 'hot'
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

    render() {
        const classroomContent = this.props.classroomContent;
        return (
            <div>
                <div className='tabTitle_index' style={{display: this.props.typeGuoLv ? 'block' : 'none'}}>
                    <span onClick={this.changeCoruseType.bind(this, 'hot')}
                          className={this.state.coruseType === 'hot' ? 'active' : ''}>热门课程</span>
                    <span onClick={this.changeCoruseType.bind(this, 'mostnew')}
                          className={this.state.coruseType === 'mostnew' ? 'active' : ''}>最新课程</span>
                    <span onClick={this.changeCoruseType.bind(this, 'little')}
                          className={this.state.coruseType === 'little' ? 'active' : ''}>微课</span>
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
