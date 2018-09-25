import React from 'react'
import './style.less'

class Filter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filterDisplsy: false,
            filterPanelDisplsy: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({filterDisplsy: nextProps.filterDisplsy, filterPanelDisplsy: nextProps.filterDisplsy})
    }

    shadeOnClick = () => {
        this.setState({filterPanelDisplsy: false}, () => {
            setTimeout(() => {
                this.setState({filterDisplsy: false})
            }, 150)
        })
    }

    render() {

        return (
            <div id='filter' style={{display: this.state.filterDisplsy ? 'block' : 'none'}}>
                <div className='shade' onClick={this.shadeOnClick}></div>
                <div
                    className={this.state.filterPanelDisplsy ? 'filter_panel filter_panel_enter' : 'filter_panel filter_panel_leave'}></div>
            </div>
        )
    }
}

export default Filter