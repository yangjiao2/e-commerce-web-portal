import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon, ActivityIndicator, Button} from 'antd-mobile'
import {Row, Col} from 'antd'
import {withRouter} from 'react-router-dom'
import {orderbyprops, orderProduct_by_props} from "../../../../utils/gql"
import {Query} from "react-apollo"
import gql from "graphql-tag"

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navTitle: '待付款',
            kind: 'pay',
            orderStatus: '0'
        }
    }

    componentWillMount() {
        let {location} = this.props
        if (location && location.state) {
            let navTitle = '',
                orderStatus = '0'
            let kind = location.state.kind
            switch (kind) {
                case 'pay':
                    navTitle = '待付款'
                    orderStatus = '0'
                    break
                case 'ship':
                    navTitle = '待发货'
                    orderStatus = '1'
                    break
                case 'unbox':
                    navTitle = '待收货'
                    orderStatus = '2'
                    break
                case 'judge':
                    navTitle = '待评价'
                    orderStatus = '3'
                    break
                default:
                    navTitle = '无效页面'
                    break
            }
            this.setState({
                navTitle,
                kind,
                orderStatus
            })
        }
    }

    render() {
        let {navTitle, orderStatus} = this.state
        return (
            <div className='order-wrap'>
                <div className='navbar'>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.go(-2)
                        }}
                    >{navTitle}</NavBar>
                </div>
                <Query query={gql(orderbyprops)} variables={{user_id: "test", orderStatus}}>
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
                            return (
                                <OrderRender data={data.orderbyprops} orderStatus={orderStatus}/>
                            )
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default withRouter(Order)

class OrderRender extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    orderCardContentRender = (data) => {
        if (data.length === 1) {
            return (
                <Row style={{width: '100%'}}>
                    <Col span={6} style={{height: '100%'}}>
                        <div className='order-product-img' style={{backgroundImage: `url('${data[0].product_id.img}')`}}/>
                    </Col>
                    <Col span={16} offset={2}>
                        <div className='order-product-name'>{data[0].product_id.name}</div>
                    </Col>
                </Row>
            )
        } else {
            return (data.map(data => (
                <div className='order-product-img' style={{backgroundImage: `url('${data.product_id.img}')`}} key={data.id}/>
            )))
        }
    }

    orderCardButtonGroupRender = () => {
        let {orderStatus} = this.props
        switch (orderStatus) {
            case '0':
                return (
                    <div className='order-card-button-group'>
                        <Button size="small" className='pay-button order-button'>去支付</Button>
                    </div>
                )
            case '1':
                return (
                    <div className='order-card-button-group'>
                        <Button size="small" className='ship-button order-button'>催发货</Button>
                        &nbsp;&nbsp;
                        <Button size="small" className='cancel-button order-button'>取消订单</Button>
                    </div>
                )
            case '2':
                return (
                    <div className='order-card-button-group'>
                        <Button size="small" className='unbox-button order-button'>查看物流</Button>
                        &nbsp;&nbsp;
                        <Button size="small" className='cancel-button order-button'>取消订单</Button>
                    </div>
                )
            case '3':
                return (
                    <div className='order-card-button-group'>
                        <Button size="small" className='judge-button order-button'>去评价</Button>
                        &nbsp;&nbsp;
                        <Button size="small" className='more-button order-button'>售后</Button>
                    </div>
                )
            default:
                return (
                    <div>
                        ok
                    </div>
                )
        }
    }

    render() {
        let {data} = this.props
        return (
            <div className='content-wrap'>
                {
                    data.length === 0 ?
                        <div>
                            还没有这种订单呢
                        </div>
                        :
                        data.map(order => (
                            <div key={order.id} className='order-card'>
                                <Query query={gql(orderProduct_by_props)} variables={{order_id: order.id}}>
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
                                            data = data.orderProductbyprops
                                            return (
                                                <div>
                                                    <div className='order-card-top'>JD</div>
                                                    <div className='order-card-content'>
                                                        {
                                                            this.orderCardContentRender(data)
                                                        }
                                                    </div>
                                                    <div className='order-card-bottom'>
                                                        <div
                                                            className='order-card-count'>共{order.count}件商品&nbsp;&nbsp;实付款:
                                                        </div>
                                                        <div className='order-card-pay'>￥{order.productTotalPay}</div>
                                                    </div>

                                                    {this.orderCardButtonGroupRender()}

                                                </div>
                                            )
                                        }
                                    }
                                </Query>
                            </div>
                        ))
                }
            </div>
        )
    }
}