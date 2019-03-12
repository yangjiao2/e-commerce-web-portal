import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import {NavBar, Icon, ActivityIndicator, Badge} from 'antd-mobile'

import {productbyid} from "../../../utils/gql"
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

                <Query query={gql(productbyid)} variables={{id}}>
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
                                <DetailRender data={data.productbyid} history={this.props.history}/>
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
            cartCount:sessionStorage.getItem('cartCount')
        }
    }

    render() {
        let {data} = this.props
        let {cartCount} = this.state

        return (
            <div className='detail-wrapper content-wrap'>
                <div className='detail-simple-show'>
                    <div className='detail-img' style={{backgroundImage: "url('"+ data.img + "')"}}/>
                    <div className='detail-intro'>
                        <div className='detail-name detail-padding'>{data.name}</div>
                        <div className='detail-price detail-padding'>
                            <span>￥{data.price}</span>&nbsp;&nbsp;
                            <span>￥{data.price}</span>
                            <span className='detail-stock'>库存 {data.stock}</span>
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
                        <span className='detail-bottom-button add' onClick={()=>{}}>加入购物车</span>
                        <span className='detail-bottom-button buy' onClick={()=>{}}>立即购买</span>
                    </div>
                </div>
            </div>
        )
    }
}