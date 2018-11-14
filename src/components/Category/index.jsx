import React from 'react'
import Swiper from 'swiper'
import {LARGE_IMG} from '../../util/const'
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
                    paginationType: 'fraction'   //分式
                });
                this.initClick()
            }
        });
    }

    /**
     * 在使用navlink时发现结合swiper使用过程中会出现是不是刷新的问题导致打包后找不到页面
     * 直接绑定onclick事件会出现重复,导致点击出现问题
     * 所以使用事件监听,手动监听onclick事件,完美解决
     */
    initClick = () => {
        var _this = this
        let banners = Array.from(document.getElementsByClassName('bannerImg'));
        if (!Array.isArray(banners)) return;
        banners.forEach((item) => {
            item.addEventListener('click', function () {
                _this.props.sliderOnClick(this.getAttribute('link'))
            })
        })
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
                                        {/*<NavLink to={`/detil/${slider.courseId}/${slider.course.publisher_id}`}*/}
                                        {/*className="slider-nav">*/}
                                        <img className="bannerImg" src={slider.image + LARGE_IMG} width="100%"
                                             height="100%"
                                             alt={slider.courseName}
                                             link={`/detil/${slider.courseId}/${slider.course.publisher_id}`}/>
                                        {/*</NavLink>*/}
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