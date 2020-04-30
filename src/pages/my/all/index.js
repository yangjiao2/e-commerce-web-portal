import React, { Component } from 'react'
import './index.css'
import { Grid, ActivityIndicator } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import Logo from '../../../components/logo'
import { getCookie } from "../../../utils/cookie"
import { user_by_id } from "../../../utils/gql"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { StarOutlined, EnvironmentOutlined, ShoppingCartOutlined, SolutionOutlined } from '@ant-design/icons'
import { from } from 'apollo-boost'

const toolsIcon = [
    {
        icon: <EnvironmentOutlined />, // 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/address.png',
        text: '收货地址',
        id: 'address'
    },
    {
        icon: <ShoppingCartOutlined />, //'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/cart.png',
        text: '购物车',
        id: 'cart'
    },
    {
        icon: <StarOutlined />, //'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/cart.png',
        text: '收藏夹',
        id: 'star',
    },
    {
        icon: <SolutionOutlined />, //'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/message.png',
        text: '用户信息',
        id: 'profile'
    }
]

class All extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let user_id = getCookie('user_id')
        // console.log(user_id)
        return (
            <div className='my-wrap all'>
                {/* <div className='my-card order-card'>
                    <div className='card-title'>
                        电商订单
                    </div>
                    <div className='card-icons'>
                        <Grid data={orderIcon}
                            columnNum={4}
                            hasLine={false}
                            onClick={(order) => {
                                this.props.history.push({
                                    pathname: '/my/order',
                                    state: {
                                        kind: order.id
                                    }
                                })
                            }}
                        />
                    </div>
                </div> */}

                <div className=''>
                    <div className='card-icons'>
                        <Grid data={toolsIcon}
                            columnNum={4}
                            square={false}
                            onClick={(tools) => {
                                if (tools.id === 'cart') {
                                    this.props.history.push({
                                        pathname: '/cart/detail'
                                    })
                                } else if (tools.id === 'profile') {
                                    this.props.history.push({
                                        pathname: '/my/profile'
                                    })
                                } else if (tools.id === 'star') {
                                    this.props.history.push({
                                        pathname: '/cart/star',
                                        state: {
                                            page: 'star'
                                        }
                                    })
                                } else {
                                    this.props.history.push({
                                        pathname: '/my/info',
                                        state: {
                                            page: tools.id
                                        }
                                    })
                                }
                            }}
                            renderItem={dataItem => (
                                <div style={{ padding: '4px' }}>
                                    {/* <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" /> */}
                                    {dataItem.icon}
                                    <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                        <span>{dataItem.text}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
                {/*
                <div className='my-card member-card' style={{ display: 'none' }}>
                    <div className='card-title'>
                        会员中心
                    </div>
                    <div className='card-icons'>
                        <Grid data={memberIcon}
                            columnNum={4}
                            hasLine={false}
                            onClick={(member) => {
                                this.props.history.push({
                                    pathname: '/my/member',
                                    state: {
                                        page: member.id
                                    }
                                })
                            }}
                        />
                    </div>
                </div>
                        */}
                <Logo />
            </div>
        )
    }
}

export default withRouter(All)
