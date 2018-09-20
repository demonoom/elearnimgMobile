import React from 'react'
import './style.less'
import {CSSTransition} from 'react-transition-group'
import {Toast, Icon} from 'antd-mobile'
import PublicHeader from '../../components/PublicHeader'
import {queryPageByOrder} from '../../../src/fetch/my-order/my-order'
import OrderList from '../../components/OrderList'

class MyOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            myOrderContent: []
        }
    }

    componentDidMount() {
        this.setState({show: true})

        /**
         * 获取我的订单
         */
        queryPageByOrder('500001020', '-1').then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({myOrderContent: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    render() {
        const myOrderContent = this.state.myOrderContent
        return (
            <CSSTransition
                in={this.state.show}
                timeout={300}
                classNames='translate'
            >
                <div className='my_order positionBg'>
                    <PublicHeader
                        title='我的订单'
                        ref='header'
                        iconOnClick={this.iconOnClick}
                        iconType=''
                        iconClass=''
                    />
                    <div className='order_content'
                         style={!myOrderContent.length ? {textAlign: 'center', paddingTop: '.75rem'} : {}}
                    >
                        {
                            myOrderContent.length ? <OrderList
                                myOrderContent={myOrderContent}
                            /> : <Icon type='loading'/>
                        }
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default MyOrder
