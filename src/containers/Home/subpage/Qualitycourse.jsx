import React from 'react'
import {getCourseListV3} from '../../../fetch/home/home'
import './style.less'
import {Toast} from 'antd-mobile'
import {NavLink} from 'react-router-dom'
import ClassBox from '../../../components/ClassBox'

class Qualitycourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            courseType: '-1',
            recommend: '1',
            classroomContent: [],
        }
    }

    componentDidMount() {
        this.getCourseListV3()
    }

    getCourseListV3 = () => {
        getCourseListV3(1, this.state.courseType, -1, -1, 'all', -1, this.state.recommend, -1).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({
                    classroomContent: res.response
                })
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    changeCoruseType = (type) => {
        console.log(type);
    }

    render() {

        return (
            <div>
                <h4 className='title_color same_title noBottom noTop' style={{textAlign: 'center'}}>
                    精品课程
                </h4>
                <ClassBox
                    ref='classBoxSj'
                    changeCoruseType={this.changeCoruseType}
                    classroomContent={this.state.classroomContent}
                    typeGuoLv={true}
                />
            </div>
        )
    }
}

export default Qualitycourse
