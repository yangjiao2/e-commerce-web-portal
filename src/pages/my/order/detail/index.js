import {Component} from "react"
import React from "react"
import './index.css'
import {NavBar, Icon as Iconm} from 'antd-mobile'
import {Row, Col, Icon} from 'antd'
import {orderProduct_by_props} from "../../../../utils/gql"
import {Query} from "react-apollo"
import gql from "graphql-tag"

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    componentWillMount() {
        let {location} = this.props
        if (location && location.state) {
            this.setState({
                data: location.state.data
            })
        }
    }

    statusRender = (status) => {
        switch (status) {
            case '0':
                return (
                    <div className='detail-status'>
                        <Icon type="clock-circle"/>&nbsp;
                        <span>等待付款</span>
                    </div>
                )
            case '1':
                return (
                    <div className='detail-status'>
                        <Icon type="shop"/>&nbsp;
                        <span>等待发货</span>
                    </div>
                )
            case '2':
                return (
                    <div className='detail-status'>
                        <Icon type="gift"/>&nbsp;
                        <span>等待收货</span>
                    </div>
                )
            case '3':
                return (
                    <div className='detail-status'>
                        <Icon type="like"/>&nbsp;
                        <span>完成</span>
                    </div>
                )
            default:
                return (
                    <div className='detail-status'>
                        <Icon type="clock-circle"/>&nbsp;
                        <span>等待确认</span>
                    </div>
                )
        }
    }

    productsRender = (data) => {
        return (
            data.map(data=> (
                <div onClick={()=>{
                    this.props.history.push({
                        pathname: '/home/detail',
                        state: {
                            id: data.id,
                            tabHidden:true
                        }
                    })
                }}>
                    <Row style={{width: '100%'}}>
                        <Col span={6} style={{height: '100px'}}>
                            <div className='order-product-img' style={{backgroundImage: `url('${data.product_id.img}')`}}/>
                        </Col>
                        <Col span={16} offset={2}>
                            <div className='order-product-name'>{data.product_id.name}</div>
                        </Col>
                    </Row>
                </div>
            ))
        )
    }

    render() {
        let {data} = this.state
        return (
            <div>
                <div className='detail-wrap'>
                    <div className='navbar'>
                        <NavBar
                            mode="light"
                            icon={<Iconm type="left"/>}
                            onLeftClick={() => {
                                this.props.history.go(-1)
                            }}
                        >订单详情</NavBar>
                    </div>
                    <div className='content-wrap'>
                        <div className='detail-address-wrap'>
                            <div className='detail-address-backgroud-top'>
                                {this.statusRender(data.orderStatus)}
                                <div className='detail-pay'>
                                    ￥{data.productTotalPay}
                                </div>
                            </div>
                            <div className='detail-address-backgroud-bottom'/>
                            <div className='detail-address-content'>
                                <Row>
                                    <Col span={4} className='detail-address-content-icon'>
                                        <Icon type="pushpin"/>
                                    </Col>
                                    <Col span={20}>
                                        <div className='detail-address-content-username-phone'>
                                            {data.userAddress_id.username}&nbsp;&nbsp;{data.userAddress_id.telephone}
                                        </div>
                                        <div>
                                            地址：{data.userAddress_id.province + data.userAddress_id.city + data.userAddress_id.area + data.userAddress_id.address}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='detail-goods-wrap'>
                            <div className='detail-store-name'>JD</div>
                            <Query query={gql(orderProduct_by_props)} variables={{order_id: data.id}}>
                                {
                                    ({loading, error, data}) => {
                                        if (error) {
                                            return 'error!'
                                        }
                                        data = data.orderProductbyprops
                                        return (
                                            <div>{this.productsRender(data)}</div>
                                        )
                                    }
                                }
                            </Query>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail