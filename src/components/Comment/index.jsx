import React from 'react'
import './style.less'
import {Button} from 'antd-mobile'

class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            commentFlag: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({commentFlag: nextProps.commentFlag})

    }

    closePanel = () => {
        this.setState({commentFlag: false})
    }

    comment = () => {
        console.log(1);
    }

    render() {

        return (
            <div id='comment' className={this.state.commentFlag ? 'comment_panel_enter' : ''}>
                <div className="icon_close" >
                    <i className="iconfont icon-guanbi" onClick={this.closePanel}></i>
                </div>
                    <h2>撰写评论</h2>
                <div className="content overflowScroll">
                    <div className="my_flex">
                        <div className="title_color title">课程选择：</div>
                        <div className="rightDiv selectCont">
                            <div className="select">1</div>
                            <ul>
                                <li className="text_hidden line_public">1</li>
                                <li>2</li>
                                <li>3</li>
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
        )
    }
}

export default Comment