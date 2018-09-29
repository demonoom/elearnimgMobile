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
                <div onClick={this.closePanel}>
                    X
                </div>
                <div>
                    <h2>撰写评论</h2>
                    <div>课程选择:
                        <span>1</span>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                    <div>课程评分:
                    </div>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <Button type="primary" onClick={this.comment}>提交</Button>
                </div>
            </div>
        )
    }
}

export default Comment