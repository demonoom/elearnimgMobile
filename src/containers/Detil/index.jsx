import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import Header from '../../components/Header'

class Detil extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false
        }
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
                    <Header
                        title='详情页'
                        ref='header'
                    />
                </div>
            </CSSTransition>
        )
    }
}

export default Detil
