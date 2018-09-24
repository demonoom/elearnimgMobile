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
        }
    }

    componentDidMount() {
        this.setState({show: true})
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
                <div className='see_more positionBg'>
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
