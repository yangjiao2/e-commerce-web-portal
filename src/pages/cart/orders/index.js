import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon, List, Picker, ActivityIndicator, InputItem, Toast } from 'antd-mobile'
import classNames from 'classnames'
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import moment from 'moment'

import { DEFAULT_LOCATION_BY_USER_ID_QUERY, CREATE_ORDER, CREATE_ORDER_PRODUCT, ORDER_BY_USER_ID_STATUS } from "../../../utils/gql"
import { idGen } from "../../../utils/func"
import { getCookie } from "../../../utils/cookie"
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
            remark: ''
        }
    }

    componentWillMount() {
        console.log('CartOrders componentWillMount', this.props)
        let type = this.props.history.location.state.dataType
        let cartList = JSON.parse(sessionStorage.getItem(type))
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

    // 创建订单
    onSubmitOrderAndProduct = (user_id, create_order, create_order_product) => {
        let ordersAddress = JSON.parse(sessionStorage.getItem('ordersAddress'))
        console.log(ordersAddress);
        if (ordersAddress) {
            let { totalCount, totalPrice, remark, delivery } = this.state
            let createAt = (new Date()).toISOString()
            let { id: userAddress_id, telephone, username, province, city, area, address } = ordersAddress
            let addressData = String(province + city + area + address)
            let tag = telephone ? telephone.replace(/[^0-9]/ig, "").slice(-4) : Math.random().toString(10).substr(2, 4)
            // const orderId = createdAt.replace(/[^0-9]/ig, "").substr(2) + tag
            // let orderLogisticsId = idGen('deliver')

            const orderContent = {
                // remark,
                // updatedAt: "",
                // orderLogistics_id: orderLogisticsId,
                cartTotal: totalPrice,
                createAt,
                // orderStatus: "0",
                location_id: userAddress_id,
                // id: orderId,
                count: totalCount,
                user_id,
                productTotal: totalPrice,
                // orderPay_id: "",
                orderStatus: 1, // 待发货
                // deleteId: []
            }


            let type = this.props.history.location.state.dataType
            let shopping = JSON.parse(sessionStorage.getItem(type))
            // if (type === 'cartSelected') orderContent.deleteId = shopping.map(item => item.id)
            console.log('createOrder shopping', shopping)
            //...orderLogistics
            // let createOrder = create_order({ variables: { ...orderContent } })
            create_order({ variables: { ...orderContent } }).then((cart_data) => {

                console.log(cart_data);
                let createOrderProduct = shopping.map((item, index) => {
                    // let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
                    // let orderProductId = createdAt.replace(/[^0-9]/ig, "").substr(2) + tag + index
                    let { id: cart_id, count, product: productData, } = item
                    //  specificationStock_id: specData 
                    let { id: product_id, price } = productData
                    // let {  id: specId, color, size } = specData
                    // console.log('product',index,item,product)

                    const orderProduct = {
                        // updatedAt: "",
                        // productColor: color,
                        // unit,
                        product_id,
                        // specificationStock_id: specId,
                        // productSize: size,
                        // orderPay: price,
                        // createdAt,
                        // productImg: img,
                        // productName: name,
                        order_id: cart_data.data.insert_profile_order.returning[0].id,
                        // productPrice: price,
                        // id: orderProductId,
                        // user_id,
                        cart_id: cart_id,
                        count,
                        productPay: price * count,
                        // orderPay_id: "",
                    }
                    // console.log(`orderProduct${index}`,orderProduct)

                    return create_order_product({ variables: orderProduct }).then((product_data) => {
                        console.log('ok create_order_product', index, product_data)
                        return product_data.data
                    })
                })
            })

            // Promise.all([createOrder, createOrderProduct]).then((data) => {
            //     // console.log('onSubmitOrderAndProduct data',data)
            //     // sessionStorage.setItem('payOrder', JSON.stringify(orderContent))
            //     if (type === 'cartSelected') {
            //         let cartCount = JSON.parse(localStorage.getItem("cartCount")) - totalCount
            //         localStorage.setItem("cartCount", JSON.stringify(cartCount))
            //         localStorage.removeItem("cartList")
            //     }
            //     Toast.success('订单提交成功')
            //     this.props.history.push({
            //         pathname: '/tool/',
            //         state: {}
            //     })
            // }).catch((err) => {
            //     console.log('submit error', err)
            // })
        } else {
            Toast.info('请先添加收货地址')
        }

    }

    render() {
        let { cartList, unfoldList, height, unfoldStatus, foldStatus, totalPrice, selectAddress } = this.state
        let user_id = getCookie('user_id')

        return (
            <div className='orders-wrap'>
                <div className='orders-navbar-wrap'>
                    <NavBar
                        className='orders-navbar'
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => {
                            // this.props.history.goBack()
                            this.props.history.push({
                                pathname: '/cart',
                                state: {
                                    updateData: true,
                                    tabHidden: false
                                }
                            })
                        }}
                    >订单确认</NavBar>
                </div>
                <div className='orders-content-wrap'>
                    <div className='orders-address'>
                        {
                            selectAddress ?
                                <OrdersAddress props={this.props} selectAddress={selectAddress} /> :
                                <Query query={gql(DEFAULT_LOCATION_BY_USER_ID_QUERY)} variables={{ user_id }}>
                                    {
                                        ({ loading, error, data }) => {
                                            if (loading) {
                                                return (
                                                    <div className="loading-center">
                                                        <ActivityIndicator size="large" />
                                                        <span>加载中...</span>
                                                    </div>
                                                )
                                            }
                                            if (error) {
                                                return '1error!'
                                            }
                                            let defaultAddress = data.location[0]

                                            if (defaultAddress) {
                                                return (
                                                    <OrdersAddress props={this.props} selectAddress={defaultAddress} />
                                                )
                                            } else {
                                                return (
                                                    <div className='orders-address-add'
                                                        onClick={() => {
                                                            this.props.history.push({
                                                                pathname: '/my/info',
                                                                state: {
                                                                    page: 'address',
                                                                    prePage: 'orders',
                                                                    single: true
                                                                }
                                                            })
                                                        }}
                                                    >+ 添加收货地址</div>
                                                )
                                            }
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
                                        <div key={'cart-orders-' + item.id}>
                                            <div className="cart-list">
                                                <div className="cart-list-image">
                                                    <img src={item.product.img || "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"} alt="" />
                                                </div>
                                                <div className="cart-orders-intro">
                                                    <div className='hide-extra-text'>{item.product.name}</div>
                                                    {/* <div>{item.specificationStock_id.color}  {item.specificationStock_id.size}</div> */}
                                                    <div>¥ {item.product.price}</div>
                                                </div>
                                                <div className="cart-orders-count">
                                                    x {item.count}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className={classNames({ 'packup': !unfoldList.length, 'packup-unfold': true })}
                                style={{ height: height }}>
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
                                                                    <img src={item.product.img} alt="" />
                                                                </div>
                                                                <div className="cart-orders-intro">
                                                                    <div className='hide-extra-text'>{item.product.name}</div>
                                                                    {/* <div>{item.specificationStock_id.color}  {item.specificationStock_id.size}</div> */}
                                                                    <div>¥ {item.product.price}</div>
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
                    {/* <div className='orders-delivery'>
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
                        <div className="orders-Toast">
                            <InputItem
                                labelNumber={4}
                                placeholder="输入留言内容(50字以内)"
                                maxLength={50}
                                onBlur={(val) => {
                                    // console.log('orders-remark val',val)
                                    this.setState({
                                        remark: val
                                    })
                                }}
                            >
                                <div className='orders-Toast-title'>买家留言</div>
                            </InputItem>
                        </div>
                    </div>
            
                            */}
                    <div className='orders-price'>
                        <div>商品金额
                            <span>¥ {totalPrice.toFixed(2)}</span>
                        </div>
                        <div>运费
                            <span>¥ 0.00</span>
                        </div>
                    </div>
                </div>
                <Mutation mutation={gql(CREATE_ORDER)}
                    onError={error => console.log('create_order error', error)}
                >
                    {(create_order, { loading, error }) => (
                        <div className="orders-footer">
                            <div className="jiesuan">
                                <div className='jiesuan-total'>
                                    <span>合计：</span>
                                    <span className="jiesuan-total_price">¥ {totalPrice.toFixed(2)}</span>
                                </div>
                                <Mutation
                                    mutation={gql(CREATE_ORDER_PRODUCT)}
                                    onError={error => console.log('create_order_product error', error)}
                                    refetchQueries={[{ query: gql(ORDER_BY_USER_ID_STATUS), variables: { user_id, status: ['0'] } }]}
                                >
                                    {(create_order_product, { loading, error }) => (
                                        <button className="jiesuan-button"
                                            onClick={() => {
                                                this.onSubmitOrderAndProduct(user_id, create_order, create_order_product)
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

const OrdersAddress = ({ props, selectAddress }) => {
    let { default: isDefault, username, telephone, province, area, city, address } = selectAddress
    sessionStorage.setItem('ordersAddress', JSON.stringify(selectAddress))

    return (
        <List>
            <Item
                arrow="horizontal"
                multipleLine
                onClick={() => {
                    props.history.push({
                        pathname: '/my/info',
                        state: {
                            page: 'address',
                            prePage: 'orders'
                        }
                    })
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
                                </div> : ''
                        }
                        <Brief style={{ fontSize: 13 }}>{province}{area}{city}{address}</Brief>
                    </div>
                </div>
            </Item>
        </List>
    )
}