import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import PublicHeader from '../../components/PublicHeader'
import SeeMoreContent from './subpage/SeeMoreContent'

class SeeMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
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
            this.refs.SeeMore.parentNode.style.height = 0;
        }), 300)
    }

    /**
     * List recovered被恢复
     */
    componentDidRecover = () => {
        this.refs.SeeMore.parentNode.style.height = `${this.state.truelyHeight}px`
    }

    componentDidMount() {
        this.setState({show: true, truelyHeight: this.refs.SeeMore.parentNode.offsetHeight})
    }

    iconOnClick = () => {
        this.props.history.push('/search');
    }

    courseTypeOnClick(type) {
        console.log(type);
    }

    render() {

        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='see_more positionBg' ref='SeeMore'>
                    <PublicHeader
                        boxShadowFlag={true}
                        title='see_more'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType='icon-tubiao11'
                        iconClass='header-sousuo'
                        courseTypeOnClick={this.courseTypeOnClick}
                    />
                    <div className='see_more_content'>
                        <SeeMoreContent/>
                    </div>
                </div>

            </CSSTransition>
        )
    }
}

export default SeeMore
