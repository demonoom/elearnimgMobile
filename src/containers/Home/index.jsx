import React from 'react'
import {post} from "../../fetch/post";
import Category from '../../components/Category'

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
                    })
                })
            } else {
                console.log(json.msg);
            }
        })
    }

    /**
     * 轮播图被点击返回的数据obj
     * @param obj
     */
    categoryOnClick(obj) {
        console.log(obj);
    }

    render() {
        return (
            <div id='home'>
                <Category
                    categoryArr={this.state.categoryArr}
                    categoryOnClick={this.categoryOnClick}
                />
            </div>
        )
    }
}

export default Home
