import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import DetilHeader from '../../components/DetilHeader'

class Detil extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false
        }
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }

    componentDidCache = () => {
        console.log('List cached')
    }

    componentDidRecover = () => {
        console.log('List recovered')
    }

    componentDidMount() {
        this.setState({show: true})
    }

    render() {

        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div id='detil'>
                    <DetilHeader
                        title='详情页'
                        ref='header'
                    />
                </div>
            </CSSTransition>
        )
    }
}

export default Detil
