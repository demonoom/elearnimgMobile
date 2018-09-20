import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast, Icon} from 'antd-mobile'
import PublicHeader from '../../components/PublicHeader'
import {listCourseByCollect} from '../../../src/fetch/my-collection/my-collection'
import ClassBox from '../../components/ClassBox'

class MyCollection extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            myCollectionContent: []
        }
    }

    componentDidMount() {
        this.setState({show: true})
        /**
         * 获取我的收藏
         */
        listCourseByCollect('500001020', '-1').then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({myCollectionContent: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    /**
     * 右侧Icon被点击
     * @param word
     */
    iconOnClick(word) {
        console.log(word);
    }

    render() {
        const myCollectionContent = this.state.myCollectionContent
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='my_collection positionBg'>
                    <PublicHeader
                        title='我的收藏'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType='icon-shaixuan2'
                        iconClass='header-shaixuan'
                    />
                    <div className='collect_content'
                         style={!myCollectionContent.length ? {textAlign: 'center', paddingTop: '75px'} : {}}>
                        {
                            myCollectionContent.length ? <ClassBox
                                classroomContent={myCollectionContent}
                                typeGuoLv={false}
                            /> : <Icon type='loading'/>
                        }
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default MyCollection
