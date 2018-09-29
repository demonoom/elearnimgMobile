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
            ulINdex: 1,
            startArr: [false, false, false, false, false],
            score: 0,
            commentValue: '',
            videoId: this.props.courseArr[0].id
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            commentFlag: nextProps.commentFlag,
            courseArr: nextProps.courseArr,
            score: 0,
            commentValue: '',
            videoId: this.props.courseArr[0].id,
            startArr: [false, false, false, false, false],
            ulINdex: 1
        })

    }

    closePanel = () => {
        this.setState({commentFlag: false, ulINdex: 1})
        this.props.closeUl()
    }

    comment = () => {
        this.props.comment(this.state.ulINdex, this.state.score, this.state.commentValue, this.state.videoId)
    }

    openUl = () => {
        this.setState({ulDisplay: true})
    }

    closeUl = (num, video) => {
        this.setState({ulDisplay: false, ulINdex: num, videoId: video.id})
    }

    onClick(e) {

    }

    starOnClick = (index) => {
        var arr = [false, false, false, false, false].map((v, i) => {
            if (index >= i) {
                return !v
            } else {
                return v
            }
        })
        this.setState({startArr: arr, score: index + 1})
    }

    textAreaOnChange = (e) => {
        this.setState({commentValue: e.target.value})
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
                                            return <li onClick={this.closeUl.bind(this, i + 1, v)} key={i}
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
                                {
                                    this.state.startArr.map((v, i) => {
                                        return <i onClick={this.starOnClick.bind(this, i)}
                                                  className={v ? 'icon-shiwujiaoxing iconfont' : 'iconfont icon-kongwujiaoxing'}
                                                  key={i}></i>
                                    })
                                }
                                <span className="title_color">{this.state.score}.0</span>
                            </div>
                        </div>
                        <textarea onChange={this.textAreaOnChange} name="" id="" placeholder="请输入评价内容"
                                  value={this.state.commentValue}></textarea>
                        <Button type="primary" onClick={this.comment}>提交</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment