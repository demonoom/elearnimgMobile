import React from 'react'
import {CSSTransition} from 'react-transition-group'
import SearchHeader from '../../components/SearchHeader'
import SearchContent from './subpage/SearchContent'
import './style.less'

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
                    <SearchHeader/>
                    <SearchContent/>
                </div>
            </CSSTransition>
        )
    }
}

export default Search
