import React from 'react'
import {CSSTransition} from 'react-transition-group'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
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
                <div id='search'>
                    <h1>search</h1>
                </div>
            </CSSTransition>
        )
    }
}

export default Search
