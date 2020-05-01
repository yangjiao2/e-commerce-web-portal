import React, { Component } from 'react'
import './index.css'
import { Grid, ActivityIndicator } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { getCookie } from "../../../utils/cookie"
import { user_by_id } from "../../../utils/gql"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { StarOutlined, EnvironmentOutlined, ShoppingCartOutlined, SolutionOutlined, PayCircleOutlined, FieldTimeOutlined, ShoppingOutlined, ShopOutlined } from '@ant-design/icons'

const orderIcon = [
    {
        icon: <PayCircleOutlined />, //'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/pay.png',
        text: '待付款',
        id: 'pay'
    },
    {
        icon: <FieldTimeOutlined />, //'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/ship.png',
        text: '待发货',
        id: 'ship'
    },
    {
        icon: <ShoppingOutlined />,//'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/unbox.png',
        text: '待收货',
        id: 'unbox'
    },
    {
        icon: <ShopOutlined />, //'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/judge.png',
        text: '已完成',
        id: 'judge'
    },
]


class All extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let user_id = getCookie('user_id')
        return (
            <div className='my-wrap all'>
                <div>
                    <div className='card-icons'>
                        <Grid data={orderIcon}
                            columnNum={4}
                            // hasLine={false}
                            square={false}
                            onClick={(order) => {
                                this.props.history.push({
                                    pathname: '/tool/order/',
                                    state: {
                                        kind: order.id
                                    }
                                })
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
            </div>
        )
    }
}

export default withRouter(All)
