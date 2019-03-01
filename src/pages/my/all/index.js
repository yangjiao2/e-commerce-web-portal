import React, {Component} from 'react'
import './index.css'
import {Grid} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const orderIcon = [
    {
        icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/pay.png',
        text: '待付款',
        id: 'pay'
    },
    {
        icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/ship.png',
        text: '待发货',
        id: 'ship'
    },
    {
        icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/unbox.png',
        text: '待收货',
        id: 'unbox'
    },
    {
        icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/judge.png',
        text: '待评价',
        id: 'judge'
    }
]

const toolsIcon = [
    {
        icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/address.png',
        text: '收货地址',
        id: 'address'
    },
    {
        icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/cart.png',
        text: '购物袋',
        id: 'cart'
    },
    {
        icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/message.png',
        text: '系统通知',
        id: 'message'
    }
]

const memberIcon = [
    {
        icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/card.png',
        text: '会员卡',
        id: 'card'
    },
    {
        icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/coupon.png',
        text: '优惠券',
        id: 'coupon'
    },
    {
        icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/credit.png',
        text: '积分',
        id: 'credit'
    }
]

class All extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let contentHeight = window.innerHeight - 95
        return (
            <div className='my-wrap all' style={{height: contentHeight}}>
                <div className='avatar-area'>
                    <div className='avatar'/>
                    <div className='nickname'>110</div>
                </div>
                <div className='my-card order-card'>
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
                                          page: order.id
                                      }
                                  })
                              }}
                        />
                    </div>
                </div>

                <div className='my-card tools-card'>
                    <div className='card-title'>
                        我的工具
                    </div>
                    <div className='card-icons'>
                        <Grid data={toolsIcon}
                              columnNum={4}
                              hasLine={false}
                              onClick={(tools) => {
                                  if (tools.id === 'cart') {
                                      this.props.history.push({
                                          pathname: '/cart'
                                      })
                                  } else {
                                      this.props.history.push({
                                          pathname: '/my/tools',
                                          state: {
                                              page: tools.id
                                          }
                                      })
                                  }
                              }}
                        />
                    </div>
                </div>

                <div className='my-card member-card'>
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
            </div>
        )
    }
}

export default withRouter(All)