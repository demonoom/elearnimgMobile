import React from 'react'
import {Tabs, Badge, Icon} from 'antd-mobile'
import './style.less'
import {getElearningIndex} from '../../../../src/fetch/home/home'
import ClassBox from '../../../components/ClassBox'

class Classroom extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            classroomContent: [],    //课堂数据
        }
    }

    componentDidMount() {
        const data = getElearningIndex()
        data.then((res) => {
            this.setState({classroomContent: res.response[1].list.splice(0, 4)})
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
                      console.log('onChange', index, tab);
                  }}
                  onTabClick={(tab, index) => {
                      console.log('onTabClick', index, tab);
                  }}
            >
                <div>
                    {
                        classroomContent.length ? <ClassBox
                            classroomContent={this.state.classroomContent}
                        /> : <Icon type='loading'/>
                    }
                    <div className='item_to_all'>查看全部精选公开实景课 ></div>
                </div>
                <div>
                    <div className='item_to_all'>查看全部精选公开常规课 ></div>
                </div>
            </Tabs>
        )
    }
}

export default Classroom
