/* eslint-disable */
import React from 'react'
import './style.less'

class Filter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filterDisplsy: false,
            filterPanelDisplsy: false,
            dom: [],
            status: 'all',
            subject: '-1',
            grade: '-1',
            type: "-1",
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({filterDisplsy: nextProps.filterDisplsy, filterPanelDisplsy: nextProps.filterDisplsy})

        var data = nextProps.data
        this.setState({dataSourse: data})
        if (!!data) {
            this.buildOption(data)
        }
    }

    /**
     * 初始化
     */
    setDefault = () => {
        this.setState({
            status: 'all',
            subject: '-1',
            grade: '-1',
            type: "-1",
        }, () => {
            this.buildOption(this.state.dataSourse)
        })
    }

    /**
     * 课程状态改变
     * @param status
     */
    changeStatus = (status) => {
        this.setState({status}, () => {
            this.buildOption(this.state.dataSourse)
        })
    }

    changeSubject = (subject) => {
        this.setState({subject}, () => {
            this.buildOption(this.state.dataSourse)
        })
    }

    changeGrade = (grade) => {
        this.setState({grade}, () => {
            this.buildOption(this.state.dataSourse)
        })
    }

    changeType = (type) => {
        this.setState({
            type,
            status: 'all',
            subject: '-1',
            grade: '-1',
        }, () => {
            this.props.changeType(type)
        })
    }

    buildOption = (data) => {
        var dom = []
        for (var k in data) {
            if (data[k][0] != null) {
                var title;
                var content = []
                if (k === 'courseStatus') {
                    title = '课程状态'
                    data[k].forEach((v, i) => {
                        if (i === 0) {
                            content.push(
                                <span onClick={this.changeStatus.bind(this, 'all')} key={v.type}
                                      className={this.state.status === "all" ? "active" : ""}>全部</span>
                            )
                        }
                        content.push(
                            <span onClick={this.changeStatus.bind(this, v.value)}
                                  className={this.state.status === v.value ? "active" : ""}
                                  key={v.value + v.groupName}>
                                {v.groupName}
                            </span>
                        )
                    })
                } else if (k === 'courseSubject') {
                    title = '科目'
                    data[k].forEach((v, i) => {
                        if (i === 0) {
                            content.push(
                                <span className={this.state.subject === '-1' ? "active" : ""}
                                      onClick={this.changeSubject.bind(this, '-1')} key={v.parentid}>全部</span>
                            )
                        }
                        content.push(
                            <span className={this.state.subject === v.id ? "active" : ""}
                                  onClick={this.changeSubject.bind(this, v.id)} key={v.value + v.name}>
                                {v.name}
                            </span>
                        )
                    })
                } else if (k === 'courseGrade') {
                    title = '年级'
                    data[k].forEach((v, i) => {
                        if (i === 0) {
                            content.push(
                                <span className={this.state.grade === "-1" ? "active" : ""}
                                      onClick={this.changeGrade.bind(this, '-1')} key={v.parentid}>全部</span>
                            )
                        }
                        content.push(
                            <span className={this.state.grade === v.id ? "active" : ""} key={v.value + v.name}
                                  onClick={this.changeGrade.bind(this, v.id)}>
                                {v.name}
                            </span>
                        )
                    })
                } else if (k === 'coursaType') {
                    title = '课程分类'
                    data[k].forEach((v, i) => {
                        if (i === 0) {
                            content.push(
                                <span className={this.state.type === "-1" ? "active" : ""}
                                      onClick={this.changeType.bind(this, '-1')} key={v.value}>全部</span>
                            )
                        }
                        content.push(
                            <span onClick={this.changeType.bind(this, v.value)}
                                  className={this.state.type === v.value ? "active" : ''}
                                  key={v.value + v.groupName}>
                                {v.groupName}
                            </span>
                        )
                    })
                }

                dom.push(
                    <div className='p10' key={k}>
                        <div className="title" key={`${k}title`}>{title}</div>
                        <div className="content" key={`${k}content`}>
                            {content}
                        </div>
                    </div>
                )
            }

        }
        this.setState({dom})
    }

    shadeOnClick = () => {
        this.setState({filterPanelDisplsy: false}, () => {
            setTimeout(() => {
                this.setState({filterDisplsy: false})
            }, 150)
            this.props.shadeOnClick()
        })
    }

    makeChose = () => {
        this.shadeOnClick()
        this.props.filterMakeChose(this.state.status, this.state.subject, this.state.grade, this.state.type)
    }

    render() {

        return (
            <div id='filter' style={{display: this.state.filterDisplsy ? 'block' : 'none'}}>
                <div className='shade' onClick={this.shadeOnClick}></div>
                <div
                    className={this.state.filterPanelDisplsy ? 'filter_panel filter_panel_enter' : 'filter_panel filter_panel_leave'}>
                    <div className="title_color line_public margin15">
                        筛选
                    </div>
                    <div className="cont overflowScroll">
                        {this.state.dom}
                    </div>
                    <div className="blueBtn" onClick={this.makeChose}>
                        确定
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter