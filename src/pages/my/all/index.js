import React, {Component} from 'react'
import './index.css'
import {Grid} from 'antd-mobile'

const orderIcon = [
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: '待付款',
        id: 'pay'
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: '待发货',
        id: 'ship'
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: '待收货',
        id: 'unbox'
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: '待评价',
        id: 'judge'
    }
]

const toolsIcon = [
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: '收货地址',
        id: 'address'
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: '购物车',
        id: 'cart'
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: '系统通知',
        id: 'message'
    }
]

const memberIcon = [
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: '会员卡',
        id: 'card'
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: '优惠券',
        id: 'coupon'
    },
    {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: '积分',
        id: 'credit'
    }
]

class All extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let {changePageInMy, changeTabBar} = this.props;
        return (
            <div className='my-wrap all'>
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
                                  changePageInMy('order', {id: order.id})
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
                                  if(tools.id === 'cart') {
                                      changeTabBar('cart')
                                  } else {
                                      changePageInMy('tools', {id: tools.id})
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
                                  changePageInMy('member', {id: member.id})
                              }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default All