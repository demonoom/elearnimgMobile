import React from 'react'
import './style.less'
import {Tabs, Badge, Toast, Icon} from 'antd-mobile'
import {queryPageByOrder, queryPageByRecharge} from '../../../fetch/transaction-history/transaction-history'
import RecordList from '../../../components/RecordList'

class RecordTabs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            recordType: 0,
            recordArr: false
        }
    }

    componentDidMount() {
        this.queryRecord()
    }

    queryRecord() {
        this.state.recordType === 0 ? queryPageByRecharge('500001020', 1).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({recordArr: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        }) : queryPageByOrder('500001020', -1).then((res) => {
            if (res.msg === '调用成功' && res.success) {
                this.setState({recordArr: res.response})
            } else {
                Toast.fail(res.msg, 2)
            }
        })
    }

    render() {

        const tabs = [
            {title: <Badge>充值记录</Badge>, index: 0},
            {title: <Badge>消费记录</Badge>, index: 1},
        ];

        const recordArr = this.state.recordArr

        return (
            <Tabs tabs={tabs}
                  initialPage={0}
                  swipeable={false}
                  animated={false}
                  useOnPan={false}
                  onChange={(tab, index) => {
                      this.setState({recordType: index, recordArr: false}, () => {
                          this.queryRecord()
                      })
                  }}
            >
                <div style={!!recordArr ? {} : {textAlign: 'center', paddingTop: '.15rem'}}>
                    {
                        !!recordArr ? <RecordList
                            recordArr={recordArr}
                        /> : <Icon type='loading'/>
                    }
                </div>
                <div style={!!recordArr ? {} : {textAlign: 'center', paddingTop: '.15rem'}}>
                    {
                        !!recordArr ? <RecordList
                            recordArr={recordArr}
                        /> : <Icon type='loading'/>
                    }
                </div>
            </Tabs>
        )
    }
}

export default RecordTabs
