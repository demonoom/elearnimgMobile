import React from 'react'
import {Tabs, Badge, Icon, Toast} from 'antd-mobile'
import './style.less'
import {getCourseListV3} from '../../../../src/fetch/home/home'
import ClassBox from '../../../components/ClassBox'
import {NavLink} from 'react-router-dom'

class Classroom extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            classroomContent: [],    //课堂数据
            courseProperty: 'hot',
            courseType: 'sjkc'
        }
    }

    componentDidMount() {
        this.getCourseListV3()
    }

    getCourseListV3() {
        getCourseListV3(1, this.state.courseType, -1, this.state.courseProperty, -1, -1, -1, -1).then((res) => {

            if (res.msg === '调用成功' && res.success) {
                res.response.length > 4 ? this.setState({
                    classroomContent: res.response.splice(0, 4)
                }) : this.setState({
                    classroomContent: res.response
                })
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    changeCoruseType = (type) => {
        this.setState({courseProperty: type}, () => {
            this.getCourseListV3()
        })
    }

    render() {

        const tabs = [
            {title: <Badge>实景课堂</Badge>, index: 0},
            {title: <Badge>常规课</Badge>, index: 1},
        ];
        const classroomContent = this.state.classroomContent

        return (
            <Tabs tabs={tabs}
                  initialPage={0}
                  swipeable={false}
                  animated={false}
                  useOnPan={false}
                  onChange={(tab, index) => {
                      this.refs.classBoxSj.defaultCourseType()
                      this.refs.classBoxCg.defaultCourseType()
                      this.setState({courseProperty: 'hot'})
                      index === 1 ? this.setState({courseType: 'cgkc'}, () => {
                          this.getCourseListV3()
                      }) : this.setState({courseType: 'sjkc'}, () => {
                          this.getCourseListV3()
                      })
                  }}
            >
                <div style={!classroomContent.length ? {textAlign: 'center', paddingTop: '.15rem'} : {}}>
                    {
                        classroomContent.length ? <ClassBox
                            ref='classBoxSj'
                            changeCoruseType={this.changeCoruseType}
                            classroomContent={this.state.classroomContent}
                            typeGuoLv={true}
                        /> : <Icon type='loading'/>
                    }
                    <NavLink className='item_to_all' to='/seemore/sjkc'>
                        查看全部精选公开实景课 >
                    </NavLink>
                </div>
                <div>
                    {
                        classroomContent.length ? <ClassBox
                            ref='classBoxCg'
                            changeCoruseType={this.changeCoruseType}
                            classroomContent={this.state.classroomContent}
                            typeGuoLv={true}
                        /> : <Icon type='loading'/>
                    }
                    <NavLink to='/seemore/cgkc' className='item_to_all'>查看全部精选公开实景课 ></NavLink>
                </div>
            </Tabs>
        )
    }
}

export default Classroom
