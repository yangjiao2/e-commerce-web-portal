import React, {Component} from 'react'
import './index.css'
import {withRouter} from 'react-router-dom'
import {
    SearchBar,
    NavBar,
    Accordion,
    ActivityIndicator
} from 'antd-mobile'
import {Icon} from 'antd'
import classNames from 'classnames'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import {order_by_id, orderbyprops} from "../../../../utils/gql"

class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accordionKey: undefined
        }
    }

    render() {
        let {accordionKey} = this.state
        return (
            <div className='goods-wrap'>
                <NavBar
                    className='navbar'
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.go(-2)
                    }}
                >订单管理</NavBar>
                <div className='content-wrap'>
                    <div className='my-list-subtitle' style={{color: 'grey'}}><Icon type="bulb"
                                                                                    style={{marginRight: 10}}/>{accordionKey ? '折叠单项以展开更多分类' : '请选择需要打开的分类'}
                    </div>
                    <Accordion className="my-accordion" onChange={(key) => {
                        this.setState({
                            accordionKey: key[0]
                        })
                    }}>
                        <Accordion.Panel header="查询订单"
                                         className={classNames({'hidden': accordionKey === '1' || accordionKey === '2' || accordionKey === '3'})}>
                            <Search/>
                        </Accordion.Panel>
                        <Accordion.Panel header="待发货"
                                         className={classNames({'hidden': accordionKey === '0' || accordionKey === '2' || accordionKey === '3'})}>
                            <Shiping/>
                        </Accordion.Panel>
                        <Accordion.Panel header="已确认"
                                         className={classNames({'hidden': accordionKey === '0' || accordionKey === '1' || accordionKey === '3'})}>
                            <Completed/>
                        </Accordion.Panel>
                        <Accordion.Panel header="已评价"
                                         className={classNames({'hidden': accordionKey === '0' || accordionKey === '1' || accordionKey === '2'})}>
                            <Commented/>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>
        )
    }
}

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            searchValue: ''
        }
    }

    componentDidMount() {
        this.autoFocusInst.focus();
    }

    onChange = (value) => {
        this.setState({value});
    };

    render() {
        return (
            <div>
                <SearchBar
                    ref={ref => this.autoFocusInst = ref}
                    placeholder="请在此处输入订单编号"
                    value={this.state.value}
                    onSubmit={searchValue => this.setState({searchValue})}
                    onCancel={() => this.setState({value: ''})}
                    onChange={value => this.setState({value})}
                />
                <SearchQuery id={this.state.searchValue}/>
            </div>
        )
    }
}

class SearchQuery extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.id !== this.props.id;
    }

    statusRender = (status) => {
        switch (status) {
            case '0':
                return '等待付款'
            case '1':
                return '等待发货'
            case '2':
                return '等待收货'
            case '3':
                return '完成'
            default:
                return '等待确认'
        }
    }

    render() {
        let {id} = this.props
        return (
            <Query query={gql(order_by_id)} variables={{id}}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (
                                <div className="loading-center">
                                    <ActivityIndicator text="Loading..." size="large"/>
                                </div>
                            )
                        }
                        if (error) {
                            return 'error!'
                        }
                        data = data.orderbyid
                        if (data === null) {
                            return (
                                <div>请输入正确的订单号</div>
                            )
                        } else {
                            let {id, orderStatus, orderTotalPay, productTotalPay, count, remark, user_id, userAddress_id, createdAt, orderLogistics_id, orderPay_id} = data
                            let {telephoneUser, usernameUser, email} = user_id
                            let {province, city, area, address, telephone, username} = userAddress_id
                            let expressId, logisticsFee, LogisticsStatus, expressCreatedAt
                            if (orderLogistics_id !== null) {
                                expressId = orderLogistics_id.expressId
                                logisticsFee = orderLogistics_id.logisticsFee
                                LogisticsStatus = orderLogistics_id.LogisticsStatus
                                expressCreatedAt = orderLogistics_id.createdAt
                            }
                            if (orderPay_id !== null) {

                            }

                            return (
                                <div>
                                    <div>ID：{id}</div>
                                    <div>状态：{this.statusRender(orderStatus)}</div>
                                    <div>备注：{remark}</div>
                                    <div>产品总量：{count}</div>
                                    <div>产品总计价格：{productTotalPay}</div>
                                    <div>订单总计价格：{orderTotalPay}</div>
                                    <div>订单人名称：{username}</div>
                                    <div>订单电话：{telephone}</div>
                                    <div>订单地址：{province + city + area + address}</div>
                                    <div>下单时间：{createdAt}</div>
                                    <div>用户名称：{usernameUser}</div>
                                    <div>用户邮箱：{email}</div>
                                    <div>用户电话：{telephoneUser}</div>
                                    <div>物流ID：{expressId}</div>
                                    <div>物流费用：{logisticsFee}</div>
                                    <div>物流状态：{LogisticsStatus}</div>
                                    <div>发货时间：{expressCreatedAt}</div>
                                </div>
                            )
                        }
                    }
                }
            </Query>
        )
    }
}

class Shiping extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Query query={gql(orderbyprops)} variables={{orderStatus: '1'}}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (
                                <div className="loading-center">
                                    <ActivityIndicator text="Loading..." size="large"/>
                                </div>
                            )
                        }
                        if (error) {
                            return 'error!'
                        }
                        data = data.orderbyprops
                        console.log(data)
                        return (
                            <div>
                                {
                                    data.length === 0?
                                        '还没有这种订单'
                                        :
                                        <div>还未展示</div>
                                }
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}

class Completed extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Query query={gql(orderbyprops)} variables={{orderStatus: '2'}}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (
                                <div className="loading-center">
                                    <ActivityIndicator text="Loading..." size="large"/>
                                </div>
                            )
                        }
                        if (error) {
                            return 'error!'
                        }
                        data = data.orderbyprops
                        console.log(data)
                        return (
                            <div>
                                {
                                    data.length === 0?
                                        '还没有这种订单'
                                        :
                                        <div>还未展示</div>
                                }
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}

class Commented extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Query query={gql(orderbyprops)} variables={{orderStatus: '3'}}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (
                                <div className="loading-center">
                                    <ActivityIndicator text="Loading..." size="large"/>
                                </div>
                            )
                        }
                        if (error) {
                            return 'error!'
                        }
                        data = data.orderbyprops
                        console.log(data)
                        return (
                            <div>
                                {
                                    data.length === 0?
                                        '还没有这种订单'
                                        :
                                        <div>还未展示</div>
                                }
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}


export default withRouter(Orders)