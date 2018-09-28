/* eslint-disable */
import React from 'react'
import './style.less'

class Filter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filterDisplsy: false,
            filterPanelDisplsy: false,
            dom: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({filterDisplsy: nextProps.filterDisplsy, filterPanelDisplsy: nextProps.filterDisplsy})

        var data = nextProps.data
        if (!!data) {
            this.buildOption(data)
        }
    }

    buildOption = (data) => {
        var dom = []
        for (var k in data) {
            if (data[k][0] != null) {
                var title;
                var content = [
                    <span key={k}>全部</span>
                ]
                if (k === 'courseStatus') {
                    title = '课程状态'
                    data[k].forEach((v) => {
                        content.push(
                            <span className="active" key={v.value + v.groupName}>
                                {v.groupName}
                            </span>
                        )
                    })
                } else if (k === 'courseSubject') {
                    title = '科目'
                    data[k].forEach((v) => {
                        content.push(
                            <span key={v.value + v.name}>
                                {v.name}
                            </span>
                        )
                    })
                } else if (k === 'courseGrade') {
                    title = '年级'
                    data[k].forEach((v) => {
                        content.push(
                            <span key={v.value + v.name}>
                                {v.name}
                            </span>
                        )
                    })
                } else if (k === 'courseSort') {
                    title = '课程分类'
                    data[k].forEach((v) => {
                        content.push(
                            <span key={v.value + v.groupName}>
                                {v.groupName}
                            </span>
                        )
                    })
                }

                dom.push(
                    <div className='p10' key={k}>
                        <div className="title" key={`${k}title`}>{title}</div>
                        <div className="content" key={`${k}content`}>{content}</div>
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
                    <div className="blueBtn">
                        确定
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter