import React from 'react'
import './style.less'
import Header from '../../components/Header'

class Detil extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {

        return (
            <div id='detil'>
                <Header
                    title='详情页'
                    ref='header'
                />
            </div>
        )
    }
}

export default Detil
