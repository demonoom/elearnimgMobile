import React from 'react'
import Swiper from 'swiper'
import "swiper/dist/css/swiper.min.css"
import './style.less'

class Category extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            sliderList: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sliderList: nextProps.categoryArr
        }, () => {
            if (!this.sliderSwiper) {
                //初始化轮播图
                this.sliderSwiper = new Swiper(".slider-container", {
                    loop: true,
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                    pagination: '.swiper-pagination',
                });
            }
        });
    }

    /**
     * 轮播图被点击
     * 将数据返回给智能组件
     * @param obj
     * @returns {function()}
     */
    toLink(obj) {
        return () => {
            this.props.categoryOnClick(obj)
        }
    }

    render() {

        return (
            <div id="home-category">
                <div className="slider-container">
                    <div className="swiper-wrapper">
                        {
                            this.state.sliderList.map(slider => {
                                return (
                                    <div className="swiper-slide" key={slider.id}>
                                        <a className="slider-nav" onClick={this.toLink(slider)}>
                                            <img src={slider.image} width="100%" height="100%" alt="推荐"/>
                                        </a>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        )
    }
}

export default Category