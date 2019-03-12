import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import {NavBar, Icon, ActivityIndicator, Badge, Modal} from 'antd-mobile'
import classNames from 'classnames'

import {productAndSpec_by_id} from "../../../utils/gql"
import './index.css'

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
    }

    componentWillMount() {
        let {location} = this.props
        if(location && location.state) {
            this.setState({
                id: location.state.id
            })
        }
    }

    render() {
        let {id} = this.state
        let contentHeight = window.innerHeight
        return (
            <div className='detail-wrap' style={{height: contentHeight}}>
                <div className='detail-navbar-wrap navbar'>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {this.props.history.go(-1)}}
                    >商品详情
                    </NavBar>
                </div>

                <Query query={gql(productAndSpec_by_id)} variables={{id}}>
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
                            // console.log('productAndSpec_by_id data',data)
                            return (
                                <DetailRender data={data} history={this.props.history}/>
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
            cartCount: localStorage.getItem('cartCount'),
            openSelect: false
        }
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    render() {
        let {data} = this.props
        let {name, img, price, stock} = data.productbyid
        let {cartCount, openSelect} = this.state

        return (
            <div className='detail-wrapper content-wrap'>
                <div className='detail-simple-show'>
                    <div className='detail-img' style={{backgroundImage: "url('"+ img + "')"}}/>
                    <div className='detail-intro'>
                        <div className='detail-name detail-padding'>{name}</div>
                        <div className='detail-price detail-padding'>
                            <span>￥{price}</span>&nbsp;&nbsp;
                            <span>￥{price}</span>
                            <span className='detail-stock'>库存 {stock}</span>
                        </div>
                    </div>
                </div>
                <div className='detail-complicate-show'>
                    <div className='detail-padding detail-complicate-title'>商品信息</div>
                    <div>通过商品详情图片展示</div>
                </div>
                <div className='detail-footer'>
                    <div className='detail-bottom'>
                        <span className='detail-bottom-icon border-right' onClick={()=>{this.props.history.push({pathname: '/home'})}}>
                            <div className='detail-icon detail-icon-shop'/>
                        </span>
                        <span className='detail-bottom-icon' onClick={()=>{this.props.history.push({pathname: '/cart'})}}>
                            <div className='detail-icon detail-icon-cart'/>
                            <Badge text={cartCount} overflowCount={90} hot>
                                 <span style={{display: 'inline-block' }} />
                            </Badge>
                        </span>
                        <span className='detail-bottom-button add' onClick={this.showModal('openSelect')}>加入购物袋</span>
                        <span className='detail-bottom-button buy' onClick={this.showModal('openSelect')}>立即购买</span>
                        <SelectModal onClose={this.onClose} openSelect={openSelect} goods={data.spec} price={price} img={img}/>
                    </div>
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
            specList: [],
            colorList: [],
            goods: []
        }
    }

    componentWillMount() {
        let {goods} = this.props
        this.handleData(goods)
    }

    handleData = (goods) => {
        let flag = true, selectFlag = true
        let specObject = {}, i = 0, specList = []
        let colorObject = {}, j = 0, colorList = [], selectColor = ''
        goods.forEach((item) => {
            let {id,color,size,stock,status} = item
            if(flag && status > 0) {
                selectColor = color
                flag = false
            }
            specObject[color] ? specList[specObject[color] - 1].spec.push({size, stock, status}) : specObject[color] = ++i && specList.push({
                id,
                color,
                spec: [{size, stock, status}],
            })
            if(!colorObject[color]) {
                colorObject[color] = ++j
                colorList.push({
                    id,
                    color
                })
            }
        })

        specList.forEach((items)=>{
            let {spec} = items
            spec.forEach((item)=>{
                item.select = false
                if(selectFlag && item.status > 0) {
                    item.select = true
                    selectFlag = false
                }
            })
            selectFlag = true
        })

        this.setState({
            selectColor,
            specList,
            colorList
        })
        // console.log('specList',specList)
        // console.log('colorList',colorList)
    }

    changeState = (state,val) => {
        this.setState({
            [state]:val
        })
    }

    //获取输入框的值
    getInputValue=(e)=>{
        this.setState({
            count:e.target.value
        })
    }

    // 增加
    augment=()=>{
        this.setState({
            count:this.state.count*1+1
        })
    }

    // 减少
    reduce=()=> {
        this.setState({
            count:this.state.count*1-1
        })
    }

    render() {
        let {price, img} = this.props
        let {count, selectColor, specList, colorList} = this.state
        let specFilter = specList.filter(item=>item.color === selectColor)[0].spec.filter(item=> item.select && item.status > 0)[0]
        let specStock =  specFilter.stock || 0
        let selectSize =  specFilter.size

        return(
            <Modal
                popup
                visible={this.props.openSelect}
                onClose={this.props.onClose('openSelect')}
                animationType="slide-up"
                afterClose={() => { console.log('close model')}}
            >
                <div className="popup-box" >
                    <div className="main-goods-box">
                        <div className="close-popup" onClick={this.props.onClose('openSelect')}>
                            ×
                        </div>
                        <div className="goods-box">
                            <div className="goods-info">
                                <div className="left">
                                    <img src={img || "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"} alt="商品图片"/>
                                </div>
                                <div className="mid">
                                    <div className="goods_price"> ￥ {price}</div>
                                    <div className="selected-type">已选择： {selectColor} / {selectSize}</div>
                                </div>
                                <div className="right">库存
                                    {specStock}
                                </div>
                            </div>
                            <div className="scroll-body">
                                <div className="goods_type">
                                    <ul>
                                        <li>
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
                                    </ul>
                                </div>
                                <div className="edit-product">
                                    <div className="edit-product-text">购买数量</div>
                                    <div className="edit-product-count">
                                        <button
                                            className={classNames({
                                                'selected_button': true,
                                                'selected_button-disabled': count <= 1
                                            })}
                                            disabled={count <= 1}
                                            onClick={this.reduce}
                                        >-</button>
                                        <input className="selected_input" type="text" value={count} onChange={(e)=>{this.getInputValue(e)}}/>
                                        <button className="selected_button" onClick={this.augment}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='confirm-footer'>
                        <button
                            className='confirm-button'
                            onClick={()=>{
                            }}>
                            <span>确认</span>
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}


class Specification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            spec:this.props.specList.spec
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            spec:nextProps.specList.spec,
        })
    }

    // 改变选择
    changeSelectedStatus=(i)=>{
        this.setState((prevState, props) => ({
            spec: prevState.spec.map((item,index)=>{
                if(index===i){
                    item.select=true
                    this.props.changeState('selectSize',item.size)
                }else {
                    item.select=false
                }
                return item
            })
        }))
    }

    render() {
        let {spec} = this.state
        // console.log('spec',spec)

        return (
            <li>
                <div className="type-title">规格</div>
                <dl>
                    {
                        spec.map((item,index)=>(
                            <dd
                                className={classNames({
                                    'spec-gray': item.status < 1,
                                    'spec-red': item.status > 0 && item.select
                                })}
                                key={'spec'+index}
                                onClick={()=>{
                                    if(item.status > 0)  this.changeSelectedStatus(index)
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