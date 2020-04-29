import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'antd'
import { NavBar, Icon, ActivityIndicator, Button, Toast } from 'antd-mobile'
import { Query } from "react-apollo"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import classNames from 'classnames'
import empty_cart from '../../../../images/empty-cart.png'

import { DELETE_ORDER, ORDER_BY_USER_ID_STATUS, ORDER_PRODUCT_BY_ORDER_ID } from "../../../../utils/gql"
import { getCookie } from "../../../../utils/cookie"
import './index.css'

class Display extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navTitle: '待付款',
            kind: 'pay',
            orderStatus: '0'
        }
    }

    componentWillMount() {
        let { location } = this.props
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
        let { navTitle, orderStatus } = this.state
        let user_id = getCookie('user_id')

        return (
            <div className='order-wrap'>
                <div >
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => {
                            this.props.history.go(-1)
                        }}
                    >{navTitle}</NavBar>
                </div>
                <Query query={gql(ORDER_BY_USER_ID_STATUS)} variables={{ user_id, status: [orderStatus] }}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) {
                                return (
                                    <div className="loading-center">
                                        <ActivityIndicator text="加载中..." size="large" />
                                    </div>
                                )
                            }
                            if (error) {
                                return 'my-order-display-error!'
                            }
                            return (
                                <DisplayRender data={data.orderbyprops} orderStatus={orderStatus}
                                    history={this.props.history} />
                            )
                        }
                    }
                </Query>
            </div>
        )
    }
}

class DisplayRender extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    orderCardContentRender = (data) => {
        return (data.map(order => {
            let product = order.product;
            return (
                <Row key={order.id} style={{ width: '100%' }}>
                    <Col span={4} style={{ height: '100px' }}>
                        <div className='order-product-img'
                            style={{ backgroundImage: `url('${product.img[0]}')` }} />
                    </Col>
                    <Col span={16} offset={1}>
                        <div className='order-product-name'>{product.name}</div>
                    </Col>
                </Row>
            )
        }
        ))
    }

    render() {
        let { data, orderStatus, button = false } = this.props
        let content = orderStatus === '0' ? '需付款' : '实付款'

        return (
            <div className={classNames({ 'content-wrap': button })}>
                {
                    data.length === 0 ?
                        <div className='order-tip-wrap'>
                            <div className='order-tip'>还没有这种订单</div>
                            <div >
                                <img src={empty_cart} alt="" width={400} />
                            </div>
                        </div>
                        :
                        data.map(order => (
                            <div key={order.id} className='order-card'>
                                <div className='order-card-top'>订单号: {order.id}</div>

                                <Query query={gql(ORDER_PRODUCT_BY_ORDER_ID)} variables={{ order_id: order.id }}>
                                    {
                                        ({ loading, error, data }) => {
                                            if (loading) {
                                                return (
                                                    <div className="loading-center">
                                                        <ActivityIndicator text="加载中..." size="large" />
                                                    </div>
                                                )
                                            }
                                            if (error) {
                                                return 'error!'
                                            }
                                            data = data.orderProductbyprops
                                            return (
                                                <div>
                                                    {
                                                        button ?
                                                            <div className='order-card-content' onClick={() => {
                                                                this.props.history.push({
                                                                    pathname: '/my/order/detail',
                                                                    state: {
                                                                        data: order
                                                                    }
                                                                })
                                                            }}>
                                                                {
                                                                    this.orderCardContentRender(data)
                                                                }
                                                            </div>
                                                            :
                                                            <div className='order-card-content'>
                                                                {
                                                                    this.orderCardContentRender(data)
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                            )
                                        }
                                    }
                                </Query>

                                <div className='order-card-bottom'>
                                    <div
                                        className='order-card-count'>共{order.count}件商品&nbsp;&nbsp;{content}:
                                    </div>
                                    <div
                                        className='order-card-pay'>￥{Math.round(order.productTotal * 100) / 100}</div>
                                </div>

                                <ButtonGroupRender id={order.id} order={order}
                                    history={this.props.history} />

                            </div>
                        ))
                }
            </div>
        )
    }
}

const ButtonGroupRender = (props) => {
    let { id, order } = props
    let orderStatus = String(order.orderStatus)
    let user_id = getCookie('user_id')
    let deleteButton = (<Mutation
        mutation={gql(DELETE_ORDER)}
        refetchQueries={[{ query: gql(ORDER_BY_USER_ID_STATUS), variables: { user_id, status: [orderStatus] } }]}
    >
        {(delete_order, { loading, error }) => {
            if (loading) {
                return (
                    <div className="loading-center">
                        <ActivityIndicator text="加载中..." size="large" />
                    </div>
                )
            }
            if (error) {
                return 'error!'
            }
            return (
                <div>
                    <Button size="small" className='pay-button order-button' onClick={() => {
                        delete_order({ variables: { order_id: id } })
                    }}>删除</Button>
                </div>

            )
        }}
    </Mutation>);
    switch (orderStatus) {
        case '0':
            return (
                <div className='order-card-button-group'>
                    <Button size="small" className='pay-button order-button' style={{ marginLeft: 5 }} onClick={() => {
                        sessionStorage.setItem('payOrder', JSON.stringify(order))
                        props.history.push({
                            pathname: '/cart/pay',
                            state: {}
                        })
                    }}>去支付</Button>
                    {deleteButton}

                </div>
            )
        case '1':
            return (
                <div className='order-card-button-group'>
                    <Button size="small" className='ship-button order-button' onClick={() => {
                        Toast.success('已提醒商家发货')
                    }}>催发货</Button>
                    {deleteButton}

                </div>
            )
        case '2':
            return (
                <div className='order-card-button-group'>
                    <Button size="small" className='unbox-button order-button' onClick={() => {
                        Toast.info('暂无物流信息')
                    }}>查看物流</Button>
                    {deleteButton}
                </div>
            )
        case '3':
            return (
                <div className='order-card-button-group'>
                    <Button size="small" className='judge-button order-button' onClick={() => {
                        Toast.info('感谢您的评价')
                    }}>去评价</Button>
                    {deleteButton}
                </div>
            )
        default:
            return (
                <div>
                </div>
            )
    }
}


export default withRouter(Display)
export {
    DisplayRender,
    ButtonGroupRender
}
