import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import DetilHeader from '../../components/DetilHeader'
import {findUserById} from '../../fetch/teacher/teacher'
import {Toast} from 'antd-mobile'
import TeacherTab from './subpage/TeacherTab'
import {SMALL_IMG} from '../../util/const'

class Teacher extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            truelyHeight: '',
            teacherObj: '',
        }
        props.cacheLifecycles.didCache(this.componentDidCache);
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.detil.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.detil.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        this.setState({show: true})
        findUserById(this.props.match.params.id).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({teacherObj: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    render() {

        const teacherObj = this.state.teacherObj

        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div id='teacher' ref='teacher'>
                    <DetilHeader
                        title=''
                        ref='header'
                        collectFlag={true}
                    />
                    <div className='teacher_content'>
                        <div style={{backgroundColor: 'red', height: '240px'}}>
                            <img src={teacherObj.avatar + SMALL_IMG} alt=""/>
                            <span>{teacherObj.userName}</span>
                        </div>
                        <TeacherTab
                            teacherObj={this.state.teacherObj}
                        />
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default Teacher
