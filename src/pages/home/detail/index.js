import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import { NavBar, Icon, ActivityIndicator, Modal, Card, Toast, } from 'antd-mobile'
import { Row, Col } from 'antd'
import classNames from 'classnames'
import moment from 'moment'

import { PRODUCT_DETAIL_BY_ID_QUERY, INSERT_CART_MUTATION, CART_DETAIL_BY_USER_ID_QUERY } from "../../../utils/gql"
import { idGen } from '../../../utils/func'
import { setCookie, getCookie } from "../../../utils/cookie"
import './index.css'

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
        setCookie('user_id', 1);
    }

    componentWillMount() {
        let { location } = this.props
        if (location && location.state) {
            this.setState({
                id: location.state.id
            })
        }
    }

    render() {
        let { id } = this.state
        return (
            <div className='detail-wrap' >
                <div className='detail-navbar-wrap'>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => { this.props.history.go(-1) }}
                    >
                        <div>商品详情</div>
                    </NavBar>
                </div>

                <Query query={gql(PRODUCT_DETAIL_BY_ID_QUERY)} variables={{ "id": id }}>
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
                                return '商品详情: 页面出问题...'
                            }
                            return (
                                <DetailRender data={data} history={this.props.history} />
                            )
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default withRouter(Detail)

class DetailRender extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartCount: JSON.parse(localStorage.getItem('cartCount')),
            openSelect: false,
            buttonType: ''
        }
    }

    // 弹出选择框
    showModal = (e, key) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        })
    }

    changeDetailState = (state, val) => {
        this.setState({
            [state]: val
        })
    }

    // 设置弹出框内容：加入购物车或加入收藏夹
    changeBottomButtonType = (e, val) => {
        this.setState({
            buttonType: val
        })
        if (val === 'star') {
            Toast.success('已加入收藏夹')
        } else {
            this.showModal(e, 'openSelect')
        }
    }

    render() {
        let { data } = this.props
        let { name, intro, img, price, stock } = data.product;
        let { cartCount, openSelect, buttonType } = this.state
        console.log('DetailRender openSelect', openSelect)
        let discountRate = 0.8;
        return (
            <div className='detail-wrapper'>
                <div className='detail-simple-show'>
                    {/*<div className='detail-img' style={{backgroundImage: "url('"+ img + "')"}}/>*/}
                    <Row>
                        <Col span={10}>
                            <img className='detail-img' src={img} alt="商品图片" />
                        </Col>
                        <Col span={14}>
                            <div className='detail-intro-content'>
                                <Card full>
                                    <Card.Header
                                        title={<div className='detail-name detail-padding'>{name}</div>}
                                    />
                                    <Card.Body>
                                        <div className='detail-price detail-padding'>
                                            <span>￥{(price * discountRate).toFixed(2)}</span>&nbsp;&nbsp;
                                    <span>￥{price.toFixed(2)}</span>
                                            <span className='detail-stock'>库存 {stock}</span>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer
                                        extra={
                                            <div>
                                                <span className='detail-bottom-button add' onClick={(e) => { this.changeBottomButtonType(e, 'star') }}>加入收藏夹</span>
                                                <span >{' '}</span>
                                                <span className='detail-bottom-button add' onClick={(e) => { this.changeBottomButtonType(e, 'add') }}>加入购物袋</span>
                                            </div>
                                        } />
                                </Card>
                            </div>
                            {/* <div className='detail-intro detail-padding'>{intro}</div>>*/}
                        </Col>
                    </Row>
                    {/*  <div className='detail-complicate-show'>
                    <div className='detail-padding detail-complicate-title'>商品信息</div>
                    <div className='detail-complicate-show-img'>
                        <img className='detail-img' src={img} alt="商品图片"/>
                    </div>
                </div>

                <div className='detail-footer2s'>
                    <div className='detail-bottom'>
                        <span className='detail-bottom-icon border-right' onClick={()=>{this.props.history.push({pathname: '/home'})}}>
                            <div className='detail-icon detail-icon-shop'/>
                        </span>
                        <span className='detail-bottom-icon'
                              onClick={()=>{
                                  this.props.history.push({
                                      pathname: '/cart',
                                      state:{
                                          updateData:true,
                                          tabHidden:false
                                      }
                                  })
                              }}
                        >
                            <div className='detail-icon detail-icon-cart'/>
                        </span>
                        <span className='detail-bottom-button add' onClick={(e)=>{this.changeBottomButtonType(e,'add')}}>加入购物袋</span>

                    </div>
                         */}
                    <SelectModal
                        changeDetailState={this.changeDetailState}
                        openSelect={openSelect}
                        buttonType={buttonType}
                        productData={data}
                        history={this.props.history}
                    />
                </div>
            </div>
        )
    }
}

class SelectModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1,
            selectColor: '',
            selectSpec: {},
            specList: [],
            colorList: []
        }
    }

    componentWillMount() {
        let { productData } = this.props
        // this.handleData(productData.spec)
    }


    changeState = (state, val) => {
        this.setState({
            [state]: val
        })
    }

    //获取输入框的值
    getInputValue = (e) => {
        this.setState({
            count: e.target.value
        })
    }

    // 增加购物车数量
    augment = () => {
        this.setState({
            count: this.state.count * 1 + 1
        })
    }

    // 减少购物车数量
    reduce = () => {
        if (this.state.count > 1) {
            this.setState({
                count: this.state.count * 1 - 1
            })
        }
    }

    // 添加至购物袋
    onCreateUserCart = (mutation, user_id) => {
        // let id = idGen('cart')
        let { productData } = this.props
        let product_id = productData.product.id
        let { count, selectColor, specList } = this.state
        // let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')

        const cartContent =
        {
            "user_id": user_id,
            "product_id": product_id,
            "status": 1,
            "count": count
        };

        this.props.changeDetailState('openSelect', false)
        mutation({ variables: cartContent }).then((data) => {
            let cartCount = JSON.parse(localStorage.getItem("cartCount")) + count
            this.props.changeDetailState('cartCount', cartCount)
            Toast.success('成功添加至购物车')
            localStorage.setItem("cartCount", JSON.stringify(cartCount))
        })
    }

    // // 立即购买
    // buyNow = () => {
    //     let {count, selectColor, specList} = this.state
    //     let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    //     let id = idGen('cart')
    //     let {productData} = this.props
    //     let {id:product_id, img, intro, name, price, status, stock, unit} = productData.productbyid
    //     let specFilter = specList.filter(item=>item.color === selectColor)[0].spec.filter(item=> item.select && item.status > 0)[0]
    //     let {id:specificationStock_id, size, stock:specStock, status:specStatus} =  specFilter
    //     let totalPrice = price * count

    //     let buyNowContent = [{
    //         count,
    //         createdAt,
    //         id,
    //         product_id:{
    //             id:product_id,
    //             img,
    //             intro,
    //             name,
    //             price,
    //             status,
    //             stock,
    //             unit
    //         },
    //         specificationStock_id:{
    //             id:specificationStock_id,
    //             color:selectColor,
    //             size,
    //             stock:specStock,
    //             status:specStatus
    //         }
    //     }]
    //     // console.log('buyNowContent',buyNowContent)
    //     sessionStorage.setItem("buyNowContent",JSON.stringify(buyNowContent))
    //     sessionStorage.setItem("totalPrice",JSON.stringify(totalPrice))
    //     sessionStorage.setItem("totalCount",JSON.stringify(this.state.count))
    //     this.props.changeDetailState('openSelect')
    //     this.props.history.push({
    //         pathname: '/cart/orders',
    //         state:{
    //             dataType: 'buyNowContent'
    //         }
    //     })
    // }

    render() {
        let user_id = getCookie('user_id')
        let { productData, buttonType } = this.props
        let product = productData.product || {};
        let { price, stock, img } = product;
        let { count, selectColor, specList, colorList } = this.state
        // let specFilter = []; //specList.filter(item=>item.color === selectColor)[0].spec.filter(item=> item.select && item.status > 0)[0]
        // let specStock =  specFilter.stock || 0
        // let selectSize =  specFilter.size
        return (
            <Modal
                popup
                visible={this.props.openSelect}
                onClose={() => this.props.changeDetailState('openSelect', false)}
                animationType="slide-up"
            // afterClose={() => { console.log('close model')}}
            >
                <div className="popup-box" >
                    <div className="main-goods-box">
                        <div className="close-popup" onClick={() => this.props.changeDetailState('openSelect', false)}>
                            ×
                        </div>
                        <div className="goods-box">
                            <div className="goods-info">
                                <div className="left">
                                    <img src={img || "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"} alt="商品图片" />
                                </div>
                                <div className="mid">
                                    <div className="goods_price"> ￥ {price}</div>
                                </div>
                                <div className="right">库存
                                    {stock}
                                </div>
                            </div>
                            <div className="scroll-body">
                                <div className="goods_type">
                                    <ul>
                                        {/*
                                        <li>
                                    <div className="selected-type">已选择： {selectColor} / {selectSize}</div>

                                            <div className="type-title">颜色</div>
                                            <dl>
                                                {
                                                    colorList.map((spec)=>(
                                                        <dd
                                                            className={classNames({
                                                                'spec-red': spec.color === selectColor
                                                            })}
                                                            key={'color'+spec.id}
                                                            onClick={()=>{
                                                                this.changeState('selectColor',spec.color)
                                                            }}
                                                        >
                                                            {spec.color}
                                                        </dd>
                                                    ))
                                                }
                                            </dl>
                                        </li>
                                        <Specification specList={specList.filter(item=>item.color === selectColor)[0]} changeState={this.changeState}/>
                                        */}
                                    </ul>
                                </div>
                                <div className="edit-product">
                                    <div className="edit-product-text">购买数量</div>
                                    <div className="edit-product-count">
                                        <button
                                            className={classNames({
                                                'selected_button-red': true,
                                                'selected_button-disabled': count <= 1
                                            })}
                                            // disabled={count <= 1}
                                            onClick={() => {
                                                if (count > 1) {
                                                    this.reduce()
                                                } else {
                                                    Toast.fail('数量不能小于1个')
                                                }
                                            }}
                                        >-</button>
                                        <input className="selected_input" type="text" value={count} onChange={(e) => { this.getInputValue(e) }} />
                                        <button className="selected_button-red" onClick={this.augment}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Mutation mutation={gql(INSERT_CART_MUTATION)}
                        refetchQueries={[
                            { query: gql(CART_DETAIL_BY_USER_ID_QUERY), variables: { "user_id": user_id, "status": 1 } }
                        ]}
                        onError={error => console.log('error', error)}
                    >
                        {(insert_cart, { loading, error }) => (
                            <div className='confirm-footer'>
                                <button
                                    className='confirm-button'
                                    onClick={() => {
                                        if (buttonType === 'add') {
                                            this.onCreateUserCart(insert_cart, user_id)
                                        } else if (buttonType === 'buy') {
                                            this.buyNow()
                                        }
                                    }}
                                >
                                    <span>确认</span>
                                </button>
                            </div>
                        )}
                    </Mutation>
                </div>
            </Modal >
        )
    }
}


class Specification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            spec: this.props.specList.spec
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            spec: nextProps.specList.spec,
        })
    }

    // 改变选择
    changeSelectedStatus = (i) => {
        this.setState((prevState, props) => ({
            spec: prevState.spec.map((item, index) => {
                if (index === i) {
                    item.select = true
                    // console.log('select item',item)
                    this.props.changeState('selectSpec', item)
                } else {
                    item.select = false
                }
                return item
            })
        }))
    }

    render() {
        let { spec } = this.state
        // console.log('spec',spec)

        return (
            <li>
                <div className="type-title">规格</div>
                <dl>
                    {
                        spec.map((item, index) => (
                            <dd
                                className={classNames({
                                    'spec-gray': item.status < 1,
                                    'spec-red': item.status > 0 && item.select
                                })}
                                key={'spec' + item.id}
                                onClick={() => {
                                    if (item.status > 0) this.changeSelectedStatus(index)
                                }}
                            >
                                {item.size}
                            </dd>
                        ))
                    }
                </dl>
            </li>
        )
    }
}
