import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {NavBar, Icon, List, Picker, ActivityIndicator, InputItem} from 'antd-mobile'
import classNames from 'classnames'
import {Query, Mutation} from "react-apollo"
import gql from "graphql-tag"
import moment from 'moment'

import {user_default_address, create_order, create_order_product} from "../../../utils/gql"

import './index.css'

const Item = List.Item
const Brief = Item.Brief

const delivery = [
    {
        label: "快递配送",
        value: "快递配送",
    },
    {
        label: "门店自提",
        value: "门店自提",
    }
]

class CartOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartList: [],
            unfoldList: [],
            totalPrice: JSON.parse(sessionStorage.getItem('totalPrice')),
            totalCount: JSON.parse(sessionStorage.getItem('totalCount')),
            delivery: ["快递配送"],
            height: '100%',
            unfoldStatus: true,
            foldStatus: false,
            selectAddress: JSON.parse(sessionStorage.getItem('ordersAddress')),
            remark:''
        }
    }

    componentWillMount() {
        // console.log('CartOrders componentWillMount',this.props)
        let cartList = JSON.parse(sessionStorage.getItem("shopping"))
        if (cartList.length > 3) {
            let cartList1 = cartList.slice(0, 3)
            let unfoldList = cartList.slice(3)
            this.setState({
                cartList: cartList1,
                unfoldList
            })
        } else {
            this.setState({
                cartList
            })
        }
    }

    onChangeDelivery = (val) => {
        this.setState({
            delivery: val,
        })
    }

    onChangeHeight = (height, unfoldStatus, foldStatus) => {
        this.setState({
            height,
            unfoldStatus,
            foldStatus
        })
    }

    onSubmitOrderAndProduct1 = (create_order,create_order_product) => {
        let ls = [{"id": "4"},{"id": "5"}]
        ls.forEach((item,index)=>{
            console.log('ls item',item)
            create_order({variables:item}).then(()=>{
                console.log('ls ok',index)
            })
        })
    }

    onSubmitOrderAndProduct = (create_order,create_order_product) => {
        let user_id = "obR_j5GbxDfGlOolvSeTdZUwfpKA"
        let {totalCount, totalPrice, remark} = this.state
        let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
        let {id:userAddress_id,telephone} = JSON.parse(sessionStorage.getItem('ordersAddress'))
        let tag = telephone ? telephone.replace(/[^0-9]/ig, "").slice(-4) : Math.random().toString(10).substr(2,4)
        const orderId = createdAt.replace(/[^0-9]/ig, "").substr(2) + tag

        let shopping = JSON.parse(sessionStorage.getItem("shopping"))
        let deleteIdList = shopping.map(item => item.id)

        const orderContent = {
             remark,
             deliveryTime: "",
             updatedAt: "",
             orderLogistics_id: "",
             payTime: "",
             orderTotalPay: totalPrice,
             createdAt,
             orderStatus: "0",
             userAddress_id,
             id:orderId,
             orderShipFee: 0,
             count: totalCount,
             user_id,
             productTotalPay: totalPrice,
             orderPay_id: "",
             deleteId:deleteIdList
        }

        let createOrder = create_order({variables:orderContent})

        let createOrderProduct = shopping.map((item,index) => {
            let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
            let orderProductId =  createdAt.replace(/[^0-9]/ig, "").substr(2) + tag +index
            let {count, id:productId, product_id:productData, specificationStock_id:specData} = item
            let {img, name, price, unit} = productData
            let {id:specId, color, size} = specData
            console.log('product',index,item,productId)

            const orderProduct = {
                updatedAt: "",
                productColor: color,
                unit,
                product_id:productId,
                specificationStock_id:specId,
                productSize:size,
                orderPay: price,
                createdAt,
                productImg:img,
                productName: name,
                order_id: orderId,
                productPrice:price,
                id:orderProductId,
                user_id,
                count,
                productPay: price,
                orderPay_id: "",
            }
            console.log(`orderProduct${index}`,orderProduct)

            return create_order_product({variables:orderProduct}).then((data)=>{
                console.log('ok data',index,data)
                return data.data
            })
        })

        Promise.all([createOrder, createOrderProduct]).then((data)=> {
            console.log('onSubmitOrderAndProduct data',data);
            localStorage.removeItem("cartList")

            this.props.history.push({
                pathname:'/cart/pay',
                state:{}
            })
        }).catch((err)=>{
            console.log('submit error',err)
        })

    }

    render() {
        let {cartList, unfoldList, height, unfoldStatus, foldStatus, totalPrice, selectAddress} = this.state

        return (
            <div className='orders-wrap'>
                <div className='orders-navbar-wrap navbar'>
                    <NavBar
                        className='orders-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            // this.props.history.goBack()
                            this.props.history.push({
                                pathname:'/cart',
                                state:{
                                    updateData:true,
                                    tabHidden:false
                                }
                            })
                        }}
                    >订单确认</NavBar>
                </div>
                <div className='orders-content-wrap content-wrap'>
                    <div className='orders-address'>
                        {
                            selectAddress ?
                                <OrdersAddress props={this.props} selectAddress={selectAddress} />:
                                <Query query={gql(user_default_address)} variables={{user_id: "obR_j5GbxDfGlOolvSeTdZUwfpKA", default:1}}>
                                    {
                                        ({loading, error, data}) => {
                                            if (loading) {
                                                return (
                                                    <div className="loading-center">
                                                        <ActivityIndicator size="large"/>
                                                        <span>加载中...</span>
                                                    </div>
                                                )
                                            }
                                            if (error) {
                                                return 'error!'
                                            }
                                            let defaultAddress = data.defaultAddress[0]

                                            return (
                                                <OrdersAddress props={this.props} selectAddress={defaultAddress} />
                                            )
                                        }
                                    }
                                </Query>
                        }
                    </div>
                    <div className='orders-detail'>
                        <div className='cart-content'>
                            {
                                cartList.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="cart-list">
                                                <div className="cart-list-image">
                                                    <img
                                                        src={item.product_id.img || "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"}
                                                        alt=""/>
                                                </div>
                                                <div className="cart-orders-intro">
                                                    <div>{item.product_id.name}</div>
                                                    <div>{item.specificationStock_id.color}  {item.specificationStock_id.size}</div>
                                                    <div>¥ {item.product_id.price}</div>
                                                </div>
                                                <div className="cart-orders-count">
                                                    x {item.count}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className={classNames({'packup': !unfoldList.length, 'packup-unfold': true})}
                                 style={{height: height}}>
                                {
                                    unfoldStatus ?
                                        <div onClick={() => {
                                            this.onChangeHeight(96 * unfoldList.length + 42, false, true)
                                        }}>
                                            <div className='packup-title'>展开全部商品</div>
                                            <div>∨</div>
                                        </div>
                                        : ''
                                }
                                {
                                    foldStatus ?
                                        <div onClick={() => {
                                            this.onChangeHeight('100%', true, false)
                                        }}>
                                            {
                                                unfoldList.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className="cart-list">
                                                                <div className="cart-list-image">
                                                                    <img src={item.product_id.img} alt=""/>
                                                                </div>
                                                                <div className="cart-orders-intro">
                                                                    <div>{item.product_id.name}</div>
                                                                    <div>{item.specificationStock_id.color}  {item.specificationStock_id.size}</div>
                                                                    <div>¥ {item.product_id.price}</div>
                                                                </div>
                                                                <div className="cart-orders-count">
                                                                    x {item.count}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className='packup-title'>收起</div>
                                            <div>∧</div>
                                        </div> : ''
                                }

                            </div>
                        </div>
                    </div>
                    <div className='orders-delivery'>
                        <div>
                            <Picker
                                data={delivery}
                                value={this.state.delivery}
                                cols={1}
                                onChange={this.onChangeDelivery}
                            >
                                <List.Item arrow="horizontal">配送方式</List.Item>
                            </Picker>
                        </div>
                        <div className="orders-message">
                            <InputItem
                                labelNumber={4}
                                placeholder="输入留言内容(50字以内)"
                                maxLength={50}
                                onBlur={(val) => {
                                    // console.log('orders-remark val',val)
                                    this.setState({
                                        remark:val
                                    })
                                }}
                            >
                                <div className='orders-message-title'>买家留言</div>
                            </InputItem>
                        </div>
                    </div>
                    <div className='orders-price'>
                        <div>商品金额
                            <span>¥ {totalPrice}</span>
                        </div>
                        <div>运费
                            <span>¥ 0.00</span>
                        </div>
                    </div>
                </div>
                <Mutation mutation={gql(create_order)}
                          onError={error=>console.log('create_order error',error)}
                >
                    {(create_order,{ loading, error }) => (
                        <div className="orders-footer">
                            <div className="jiesuan">
                                <div className='jiesuan-total'>
                                    <span>合计：</span>
                                    <span className="jiesuan-total_price">¥ {totalPrice}</span>
                                </div>
                                <Mutation mutation={gql(create_order_product)}
                                          onError={error=>console.log('create_order_product error',error)}
                                >
                                    {(create_order_product,{ loading, error }) => (
                                        <button className="jiesuan-button"
                                                onClick={()=>{
                                                    this.onSubmitOrderAndProduct(create_order,create_order_product)
                                                }}>
                                            <span>提交订单</span>
                                        </button>
                                    )}
                                </Mutation>
                            </div>
                        </div>
                    )}
                </Mutation>
            </div>
        )
    }
}

export default withRouter(CartOrders)

const OrdersAddress =({props,selectAddress}) => {
    let {default:isDefault, username, telephone, province, area, city, address} = selectAddress
    sessionStorage.setItem('ordersAddress',JSON.stringify(selectAddress))

    return (
        <List>
            <Item
                arrow="horizontal"
                multipleLine
                onClick={() => {
                    props.history.push({
                        pathname:'/my/tools',
                        state: {
                            page: 'address'
                        }})
                }}>
                <div>
                    <span>{username}</span>&nbsp;&nbsp;
                    <span>{telephone}</span>
                </div>
                <div>
                    <div>
                        {
                            isDefault ?
                                <div className="orders-address-label">
                                    <span className='address-label'>默认</span>
                                </div>:''
                        }
                        <Brief style={{fontSize: 13}}>{province}{area}{city}{address}</Brief>
                    </div>
                </div>
            </Item>
        </List>
    )
}