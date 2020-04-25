import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Checkbox, ActivityIndicator, NavBar, Toast, Modal } from 'antd-mobile'
import { Icon, Row, Col } from 'antd'
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import classNames from 'classnames'
import moment from 'moment'
import debounce from 'lodash.debounce'

import { INSERT_CART_MUTATION } from "../../../../utils/gql"
import '../index.css'
import { getCookie } from "../../../../utils/cookie"

class CartDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartList: [],
            totalPrice: 0,
            isSelectAll: false,
            selectedCount: 0
        }
        this.updateCartProductCount = debounce(this.updateCartProductCount, 5000)
    }

    //获取数据
    componentWillMount() {
        let cartList = JSON.parse(localStorage.getItem("cartList"))
        // console.log('CartDetail componentWillMount cartList',cartList)
        // console.log('CartDetail componentWillMount cartList props',this.props.cartList)
        let cartListLength = cartList ? cartList.length : 0

        this.setState({
            cartList: this.props.cartList || cartList
        }, () => {
            if (cartListLength) {
                this.sumPrice(false)
            }
        })
        console.log(this.state.cartList);
    }

    componentWillReceiveProps(nextProps) {
        // console.log("CartDetail componentWillReceiveProps",nextProps)
        if (nextProps.updateData) {
            this.props.refetch().then(() => {
                let cartListLength = nextProps.cartList ? nextProps.cartList.length : 0
                this.setState({
                    cartList: nextProps.cartList
                }, () => {
                    if (cartListLength) {
                        this.sumPrice(false)
                    }
                })
            })
        }
    }

    // 判断数量update类型
    handleChangedCount = (e, type, i, updateCount) => {
        e.persist()
        let result;
        switch (type) {
            case 'augment':
                result = this.updateCartItemCount(e, i, 1)
                break
            case 'input':
                result = this.getInputValue(e, i)
                break
            case 'reduce':
                result = this.updateCartItemCount(e, i, -1)
                break
            default:
                console.log('handleChangedCount type error')
                break
        }
        console.log(result);

        if (result) {
            this.updateCartProductCount(result, updateCount)
        }
    }

    // 使用函数防抖5s后请求更新数量
    updateCartProductCount = (data, updateCount) => {
        // console.log('updateCartProductCount id count',id,count)
        let updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
        updateCount({ variables: data })
    }

    //获取输入框的值
    getInputValue = (e, i) => {
        let id = '', count = 0, status = -1;
        this.setState({
            cartList: this.state.cartList.map((item, index) => {
                if (index === i) {
                    item.count = e.target.value
                    id = item.id
                    count = item.count
                    return item
                } else {
                    return item
                }
            })
        })
        this.sumPrice(true)
        let user_id = getCookie('user_id');
        return {
            'user_id': user_id,
            'product_id': id,
            'count': count,
            'status': status,
        }
    }

    // 增加或减少数量
    updateCartItemCount = (e, i, num) => {
        let id = '', count = 0, status = -1;
        this.setState({
            cartList: this.state.cartList.map((item, index) => {
                if (index === i) {
                    item.count = item.count * 1 + num
                    id = item.id;
                    count = item.count;
                    status = item.status;
                    return item
                } else {
                    return item
                }
            })
        })
        this.sumPrice(true);
        let user_id = getCookie('user_id');
        return {
            'user_id': user_id,
            'product_id': id,
            'count': count,
            'status': status,
        }
    }

    //删除
    delCartItem = (e, i) => {
        this.setState({
            cartList: this.state.cartList.filter((item, index) => {
                if (index !== i) {
                    return true
                } else {
                    return false
                }
            })
        })
        setTimeout(() => {
            this.sumPrice(true)
        }, 1)
    }

    // 改变选择
    changeCheckedStatus = (e, i) => {
        this.setState({
            cartList: this.state.cartList.map((item, index) => {
                if (index === i) {
                    item.checked = !item.checked
                }
                return item
            })
        })

        let flag = this.state.cartList.every((item, index) => {
            if (item.checked === false) {
                return false
            } else {
                return true
            }
        })

        if (flag === true) {
            this.setState({ isSelectAll: true })
        } else {
            this.setState({ isSelectAll: false })
        }
        this.sumPrice(true)
    }

    //全选或全不选,判断全选状态
    checkedAll = (e, check) => {
        if (e) e.stopPropagation()
        let checked = e.target ? e.target.checked : check

        if (checked === true) {
            this.setState({
                cartList: this.state.cartList.map((item, index) => {
                    item.checked = true
                    return item
                }),
                isSelectAll: true
            })
        } else if (checked === false) {
            this.setState({
                cartList: this.state.cartList.map((item, index) => {
                    item.checked = false
                    return item
                }),
                isSelectAll: false
            })
        }
        this.sumPrice(true)
    }

    //计算总合计
    sumPrice = (update) => {
        if (update) localStorage.setItem("cartList", JSON.stringify(this.state.cartList))

        let { cartList } = this.state
        let totalPrice = 0, selectedCount = 0, checkedCount = 0, cartCount = 0
        let cartListLength = cartList.length
        let isSelectAll = false
        let discountRate = 0.8;
        cartList.forEach((item, index) => {
            cartCount += item.count
            if (item.checked === true) {
                totalPrice += item.count * (item.product.price * discountRate).toFixed(2)
                selectedCount += item.count
                checkedCount++
            }
            if (index === cartListLength - 1) {
                localStorage.setItem("cartCount", JSON.stringify(cartCount))
                isSelectAll = cartListLength === checkedCount
                this.setState({
                    totalPrice,
                    selectedCount,
                    isSelectAll
                })
            }
        })
    }

    //结算传值
    settleAccounts = () => {
        let shopping = []
        this.state.cartList.forEach((item, index) => {
            if (item.checked === true) {
                shopping.push(item)
            }
        })
        console.log('cartList', this.state.cartList)
        // console.log('shopping',shopping)
        sessionStorage.setItem("cartSelected", JSON.stringify(shopping))
        sessionStorage.setItem("totalPrice", JSON.stringify(this.state.totalPrice))
        sessionStorage.setItem("totalCount", JSON.stringify(this.state.selectedCount))
        this.props.history.push({
            pathname: '/cart/orders',
            state: {
                dataType: 'cartSelected'
            }
        })
    }

    skipToProductDetail = (e, productId) => {
        e.preventDefault()
        this.props.history.push({
            pathname: '/home/detail',
            state: {
                id: productId
            }
        })
    }

    render() {
        let { cartList, isSelectAll, selectedCount, totalPrice } = this.state;
        let discountRate = 0.8;
        return (
            <div className="cart-content-wrap">
                <div className='detail-navbar-wrap'>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => {
                            this.props.history.go(-1)
                        }}
                    >{'购物车'}</NavBar>
                </div>
                <div className='cart-content'>
                    {
                        cartList.map((item, index) => {
                            return (
                                <div key={item.id + 'detail'}>
                                    <div className="cart-list">
                                        <div className="cart-list-checkbox">
                                            <Checkbox
                                                style={{ marginLeft: 15 }}
                                                checked={item.checked}
                                                onChange={(e) => { this.changeCheckedStatus(e, index) }}
                                            />
                                        </div>
                                        <div className="cart-list-image" onClick={(e) => this.skipToProductDetail(e, item.product.id)}>
                                            <img src={item.product.img[0]} alt="商品图片" />
                                        </div>
                                        <div className="cart-list-intro" onClick={(e) => this.skipToProductDetail(e, item.product.id)}>
                                            <div>{item.product.name}</div>
                                            <div className='product-item-price'>
                                                <span>￥{(item.product.price * discountRate).toFixed(2)}</span>&nbsp;
                                                <span>￥{(item.product.price).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="cart-list-count">
                                            <Mutation mutation={gql(INSERT_CART_MUTATION)}
                                                onError={error => console.log('error', error)}
                                            >
                                                {(insert_cart, { loading, error }) => (
                                                    <div className="selected-wrap">
                                                        <button
                                                            className={classNames({
                                                                'selected_button-red': true,
                                                                'selected_button-disabled': item.count <= 1
                                                            })}
                                                            onClick={(e) => {
                                                                if (item.count > 1) {
                                                                    this.handleChangedCount(e, 'reduce', index, insert_cart)
                                                                } else {
                                                                    Toast.info('数量不能小于1个')
                                                                }
                                                            }}
                                                        >-</button>
                                                        <input className="selected_input" type="text"
                                                            min={1} step={1} max={item.product.stock}
                                                            value={item.count}
                                                            onChange={(e) => { this.handleChangedCount(e, 'input', index, insert_cart) }}
                                                        />
                                                        <button className="selected_button-red"
                                                            onClick={(e) => {
                                                                this.handleChangedCount(e, 'augment', index, insert_cart)
                                                            }}>+</button>

                                                        <button className="jiesuan-delete" onClick={(e) => {
                                                            this.handleChangedCount(e, 'augment', index, insert_cart)
                                                        }}><span>删除</span></button>
                                                    </div>
                                                )}
                                            </Mutation>
                                        </div>
                                    </div>
                                    {/* <WhiteSpace size="md" /> */}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="footer">
                    <div className="jiesuan">
                        <div className="jiesuan-checkbox">
                            <Checkbox
                                checked={isSelectAll}
                                onChange={(e) => { this.checkedAll(e, '') }}
                                style={{ marginLeft: 15 }}
                            />
                            <span className="jiesuan-checkbox_label">全选</span>
                        </div>
                        <div className={classNames({
                            'jiesuan-total': true,
                            'jiesuan-disabled': !selectedCount
                        })}>
                            <span>合计：</span>
                            <span className="jiesuan-total_price">¥ {totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            className={classNames({
                                'jiesuan-button': true,
                                'jiesuan-disabled': !selectedCount
                            })}
                            onClick={() => {
                                if (selectedCount) {
                                    this.settleAccounts()
                                } else {
                                    Toast.info('请选择商品！')
                                }
                            }}
                        >
                            <span>下单({selectedCount})</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CartDetail)
