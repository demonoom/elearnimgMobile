import React from 'react'
import './style.less'
import {Button} from 'antd-mobile'

class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            commentFlag: false,
            courseArr: [],
            ulDisplay: false,
            ulINdex: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({commentFlag: nextProps.commentFlag, courseArr: nextProps.courseArr})

    }

    closePanel = () => {
        this.setState({commentFlag: false, ulINdex: 1})
    }

    comment = () => {
        console.log(1);
    }

    openUl = () => {
        this.setState({ulDisplay: true})
    }

    closeUl = (num) => {
        this.setState({ulDisplay: false, ulINdex: num})
        this.props.closeUl()
    }

    onClick(e) {
        console.log(1);
        console.log(e.target);
        e.stopPropagation()
    }

    render() {

        return (
            <div id='commentBig' style={{display: this.state.commentFlag ? 'block' : 'none'}} onClick={this.onClick}>
                <div className='shade'></div>
                <div id='comment' className={this.state.commentFlag ? 'comment_panel_enter' : ''}>
                    <div className="icon_close">
                        <i className="iconfont icon-guanbi" onClick={this.closePanel}></i>
                    </div>
                    <h2>撰写评论</h2>
                    <div className="content overflowScroll">
                        <div className="my_flex">
                            <div className="title_color title">课程选择：</div>
                            <div className="rightDiv selectCont">
                                <div className="select" onClick={this.openUl}>第{this.state.ulINdex}章节</div>
                                <ul className="overflowScroll" style={{display: this.state.ulDisplay ? '' : 'none'}}>
                                    {
                                        this.state.courseArr.map((v, i) => {
                                            return <li onClick={this.closeUl.bind(this, i + 1)} key={i}
                                                       className="text_hidden line_public">
                                                {`第${i + 1}章节`}
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="my_flex">
                            <div className="title_color title">课程评分：</div>
                            <div className="star rightDiv">
                                <i className="iconfont icon-kongwujiaoxing"></i>
                                <i className="iconfont icon-kongwujiaoxing"></i>
                                <i className="iconfont icon-kongwujiaoxing"></i>
                                <i className="iconfont icon-kongwujiaoxing"></i>
                                <i className="iconfont icon-kongwujiaoxing"></i>
                                <span className="title_color">9</span>
                            </div>
                        </div>
                        <textarea name="" id="" placeholder="请输入评价内容"></textarea>
                        <Button type="primary" onClick={this.comment}>提交</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment