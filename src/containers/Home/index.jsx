import React from 'react'
import {Route} from 'react-router-dom'
import {post} from "../../fetch/post";
import Category from '../../components/Category'
import Detil from '../Detil'
import VideoList from '../../components/VideoList'
import {Toast} from 'antd-mobile'


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            categoryArr: []
        }
    }

    componentDidMount() {
        this.findAdvanceAll()
    }

    /**
     * 获取轮播图
     * 同时获取轮播图(num=1)和三个宣传视频(num=2)
     */
    findAdvanceAll() {
        var param = {
            "method": 'findAdvanceAll'
        };
        post(param).then(json => {
            if (json.msg === '调用成功' && json.success) {
                this.setState({
                    categoryArr: json.response.filter((item) => {
                        return (
                            item.number !== '2'
                        )
                    }),
                    videoArr: json.response.filter((item) => {
                        return (
                            item.number !== '1'
                        )
                    }),
                })
            } else {
                Toast.fail(json.msg, 2)
            }
        })
    }

    /**
     * 轮播图被点击返回的数据obj
     * 这里使用react路由提供的history对象来实现编程路由跳转
     * @param obj
     */
    categoryOnClick = (obj) => {
        let {match} = this.props
        this.props.history.push({
            pathname: `${match.url + '/' + obj.courseId}`
        })
    }

    render() {

        let {match} = this.props    //match是路由通过props传递给组件的包含了url、参数等相关信息。

        return (
            <div id='home'>
                <Category
                    categoryArr={this.state.categoryArr}
                    categoryOnClick={this.categoryOnClick}
                />
                <div>
                    <h4 style={{textAlign: 'center'}}>实景课宣传片</h4>
                    <VideoList
                        videoArr={this.state.videoArr}
                    />
                </div>
                <Route
                    path={`${match.url + '/:id'}`}
                    component={Detil}
                />
            </div>
        )
    }
}

export default Home
