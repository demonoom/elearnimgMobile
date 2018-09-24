import React from 'react'
import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {
        const loadMoreFn = this.props.loadMoreFn
        const loadMore = this.refs.loadMore
        let timeoutId

        function callback() {
            const top = loadMore.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }

        window.addEventListener('scroll', function () {
            if (this.props.isLoadingMore) {
                return
            }

            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        }.bind(this), false)
    }

    loadMoreHandle = () => {
        this.props.loadMoreFn()
    }

    render() {

        return (
            <div className="load_more" ref='loadMore'>
                {
                    this.props.isLoadingMore ? <span>加载中...</span> : <span onClick={this.loadMoreHandle}>点击加载更多</span>
                }
            </div>
        )
    }
}

export default LoadMore