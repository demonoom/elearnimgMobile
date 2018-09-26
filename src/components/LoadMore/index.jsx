import React from 'react'
import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    loadMoreHandle = () => {
        this.props.loadMoreFn()
    }

    render() {
        return (
            <div className="load_more" ref='loadMore'>
                {

                    this.props.hasMoreClass ? this.props.isLoadingMore ? <span>加载中...</span> :
                        <span onClick={this.loadMoreHandle}>加载更多</span> : <span>没有更多了</span>
                }
            </div>
        )
    }
}

export default LoadMore