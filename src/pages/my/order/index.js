import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon, ActivityIndicator} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {orderbyprops} from "../../../utils/gql"
import {Query} from "react-apollo"
import gql from "graphql-tag"

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navTitle: '',
            page: 'pay',
            orderStatus: ''
        }
    }

    componentWillMount() {
        let {location} = this.props
        if (location && location.state) {
            let navTitle = '',
                orderStatus = '0'
            let page = location.state.page
            switch (page) {
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
                page,
                orderStatus
            })
        }
    }

    render() {
        let {navTitle, orderStatus} = this.state
        return (
            <div className='order-wrap'>
                <div className='order-navbar-wrap navbar'>
                    <NavBar
                        className='order-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.push({pathname: '/my/all'})
                        }}
                    >{navTitle}</NavBar>
                </div>
                <Query query={gql(orderbyprops)} variables={{user_id: "obR_j5ILjLjFSuBjj_UymjQjMNZc", orderStatus}}>
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
                                <OrderRender data={data.orderbyprops}/>
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

    render() {
        let {data} = this.props
        console.log(data)
        return (
            <div className='order-my-content'>
                {
                    data.length === 0 ?
                        <div>
                            还没有这种订单呢
                        </div>
                        :
                        data.map(order => (
                            <div key={order.id} className='order-card'>
                                <div className='order-card-top'>JD</div>
                                <div className='order-card-content'></div>
                                <div className='order-card-bottom'>
                                    <div className='order-card-count'>共{order.count}件商品&nbsp;&nbsp;实付款:</div>
                                    <div className='order-card-pay'>￥{order.productTotalPay}</div>
                                    </div>
                            </div>
                        ))
                }
            </div>
        )
    }
}