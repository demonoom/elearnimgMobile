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
        this.changeTitleCol('white');
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.teacher.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.changeTitleCol('white');
        this.refs.teacher.parentNode.style.height = `${this.state.truelyHeight}px`
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

    /**
     * 改变title颜色
     * @param col
     */
    changeTitleCol = (col) => {
        var dataCol = {
            method: 'changeTitleCol',
            col: col,
        };

        window.Bridge.callHandler(dataCol, null, function (error) {
            // Toast.info(error, 4)
        });
    }

    render() {

        const teacherObj = this.state.teacherObj

        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div id='teacher' ref='teacher' className='positionBg'>
                    <DetilHeader
                        title=''
                        ref='header'
                        collectFlag={true}
                    />
                    <div className='teacher_content overflowScroll'>
                        <div className='user_header'>
                            <img src={teacherObj.avatar + SMALL_IMG} alt=""/>
                            <div className='textCont'>
                                <div className='text_hidden'>{teacherObj.userName}</div>
                            </div>
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
