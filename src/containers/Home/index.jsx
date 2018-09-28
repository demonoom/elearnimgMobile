import React from 'react'
import Category from '../../components/Category'
import VideoList from '../../components/VideoList'
import {Toast} from 'antd-mobile'
import Living from './subpage/Living'
import Classroom from './subpage/Classroom'
import HomeHeader from '../../components/HomeHeader'
import {findAdvanceAll} from '../../../src/fetch/home/home'
import './style.less'


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            categoryArr: [],
            truelyHeight: '',
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    /**
     * List cached被缓存
     */
    componentDidCache = () => {
        setTimeout((() => {
            this.refs.home.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.home.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        /**
         * 获取轮播图
         * 同时获取轮播图(num=1)和三个宣传视频(num=2)
         * @type {*}
         */
        findAdvanceAll().then((json) => {
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
        }).then(() => {
            // eslint-disable-next-line
            this.state.truelyHeight = this.refs.home.parentNode.offsetHeight
        })
    }

    /**
     * 轮播图被点击返回的数据obj
     * @param obj
     */
    categoryOnClick = (obj) => {
        return
    }

    /**
     * 宣传片被点击返回的数据
     * 调用客户端
     * @param data
     */
    listOnClick(res) {
        var data = {
            method: 'openElearningWeiKeClass',
            url: res.url,
        };

        window.Bridge.callHandler(data, null, function (error) {
            Toast.info(error, 4)
        });
    }

    render() {

        return (
            <div id='home' ref='home'>
                <HomeHeader/>

                <div className='home_content overflowScroll'>
                    <Category
                        categoryArr={this.state.categoryArr}
                        categoryOnClick={this.categoryOnClick}
                    />

                    <h4 className='title_color same_title' style={{textAlign: 'center'}}>实景课宣传片</h4>
                    <VideoList
                        videoArr={this.state.videoArr}
                        listOnClick={this.listOnClick}
                    />

                    <Living/>

                    <div className='index_tab'>
                        <Classroom/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
