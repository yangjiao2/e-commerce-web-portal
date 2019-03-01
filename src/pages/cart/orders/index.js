import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {NavBar, Icon,List,Picker} from 'antd-mobile'
import classNames from 'classnames'

import './index.css'
const Item = List.Item;
const Brief = Item.Brief;

const delivery = [
    {
        label:"快递配送",
        value: "快递配送",
    },
    {
        label:"门店自提",
        value: "门店自提",
    }
];

class CartOrders extends Component {
    constructor(props) {
        super(props)
        console.log('shopping',JSON.parse(window.localStorage.getItem("shopping")))
        this.state = {
            cartList: [],
            unfoldList: [],
            totalPrice:JSON.parse(window.localStorage.getItem('totalPrice')),
            delivery: ["快递配送"],
            height:'100%',
            unfoldStatus:true,
            foldStatus:false,
        }
    }

    componentWillMount() {
        let cartList = JSON.parse(window.localStorage.getItem("shopping"))
        if(cartList.length > 3){
            let cartList1 = cartList.slice(0,3)
            let unfoldList = cartList.slice(3)
            this.setState({
                cartList:cartList1,
                unfoldList
            })
        }else {
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

    onChangeHeight = (height,unfoldStatus,foldStatus) => {
        this.setState({
            height,
            unfoldStatus,
            foldStatus
        })
    }

    render() {
        let {cartList,unfoldList,height,unfoldStatus,foldStatus,totalPrice} = this.state

        return (
            <div className='orders-wrap'>
                <div className='orders-navbar-wrap navbar'>
                    <NavBar
                        className='orders-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {this.props.history.goBack()}}
                    >订单确认</NavBar>
                </div>
                <div className='orders-content-wrap content-wrap'>
                    <div className='orders-address'>
                        <List>
                            <Item
                                arrow="horizontal"
                                multipleLine
                                onClick={() => {this.props.history.push({
                                    pathname:'/my/tools',
                                    state:{page:'address'}
                                })}}
                            >
                                <div>
                                    <span>承叶子</span>&nbsp;&nbsp;
                                    <span>18726202125</span>
                                </div>
                                <Brief style={{fontSize:13}}>安徽省合肥市蜀山区青阳路彩虹家园1栋1601</Brief>
                            </Item>
                        </List>
                    </div>
                    <div className='orders-detail'>
                        <div className='cart-content'>
                            {
                                cartList.map((ele,index)=>{
                                    return(
                                        <div key={index}>
                                            <div className="cart-list">
                                                <div className="cart-list-image">
                                                    <img src={ele.product_id.img || "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"} alt=""/>
                                                </div>
                                                <div className="cart-orders-intro">
                                                    <div>{ele.product_id.name}</div>
                                                    <div>颜色尺码等</div>
                                                    <div>¥ {ele.product_id.price}</div>
                                                </div>
                                                <div className="cart-orders-count">
                                                    x {ele.count}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className={classNames({'packup':!unfoldList.length,'packup-unfold':true})}  style={{height:height}}>
                                {
                                    unfoldStatus ?
                                        <div onClick={()=>{this.onChangeHeight(96*unfoldList.length+42,false,true)}}>
                                            <div className='packup-title'>展开全部商品</div>
                                            <div>∨</div>
                                        </div>
                                        :''
                                }
                                {
                                    foldStatus ?
                                        <div onClick={()=>{this.onChangeHeight('100%',true,false)}}>

                                                {
                                                    unfoldList.map((ele,index)=>{
                                                        return(
                                                            <div key={index}>
                                                                <div className="cart-list">
                                                                    <div className="cart-list-image">
                                                                        <img src={ele.product_id.img} alt=""/>
                                                                    </div>
                                                                    <div className="cart-orders-intro">
                                                                        <div>{ele.product_id.name}</div>
                                                                        <div>颜色尺码等</div>
                                                                        <div>¥ {ele.product_id.price}</div>
                                                                    </div>
                                                                    <div className="cart-orders-count">
                                                                        x {ele.count}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            <div className='packup-title'>收起</div>
                                            <div>∧</div>
                                        </div>:''
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
                            <div className='orders-message-title'>买家留言</div>
                            <div className='orders-message-textarea'>
                                 <textarea rows="1"  cols="50" maxLength="50" placeholder="输入留言内容(50字以内)" className="message-textarea" >
                                 </textarea>
                            </div>
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
                <div className="orders-footer">
                    <div className="jiesuan">
                        <div className='jiesuan-total'>
                            <span>合计：</span>
                            <span className="jiesuan-total_price">¥ {totalPrice}</span>
                        </div>
                        <button className="jiesuan-button" onClick={()=>{}}>
                            <span>提交订单</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CartOrders)