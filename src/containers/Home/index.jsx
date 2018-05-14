import React from 'react'
import {post} from "../../fetch/post";

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {
        var obj = {
            'method': 'findCourseClass'
        }
        post(obj).then(json => {
            console.log(json);
        })
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}

export default Home
