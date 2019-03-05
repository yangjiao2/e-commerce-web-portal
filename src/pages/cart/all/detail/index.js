import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Checkbox, WhiteSpace} from 'antd-mobile'
import classNames from 'classnames' 

import '../index.css'

class CartDetail extends Component {
    constructor(props){
        super(props) 
        this.state={
            cartList:[],
            totalPrice:0,
            isSelectAll:false,
            selectedCount:0
        } 
    }

    //获取数据
    componentWillMount(){
        let cartList =  JSON.parse(sessionStorage.getItem("cartList"))
        let cartListLength = cartList ? cartList.length : 0

        this.setState({
            cartList: cartList || this.props.cartList
        },()=>{
            if(cartListLength){
                this.sumPrice()
            }else {
                this.checkedAll('',true)
            }
        }) 

    }

    //获取输入框的值
    getInputValue=(e,i)=>{
        this.setState({
            cartList:this.state.cartList.map((item,index)=>{
                if(index===i){
                    item.count=e.target.value
                    return item
                }else {
                    return item
                }
            })
        }) 
        this.sumPrice() 
    } 

    // 增加
    augment=(e,i)=>{
        this.setState({
            cartList:this.state.cartList.map((item,index)=>{
                if(index===i){
                    item.count=item.count*1+1
                    return item
                }else {
                    return item
                }
            })
        }) 
        this.sumPrice()
    } 

    // 减少
    reduce=(e,i)=> {
        this.setState({
            cartList:this.state.cartList.map((item,index)=>{
                if(index===i){
                    item.count=item.count*1-1
                    return item
                }else {
                    return item
                }
            })
        }) 
        this.sumPrice() 
    } 

    //删除
    del=(e,i)=> {
        this.setState({
            cartList:this.state.cartList.filter((item,index)=>{
                if(index!==i){
                    return true
                }else {
                    return false
                }
            })
        }) 
        setTimeout(()=>{
            this.sumPrice()
        },1)
    } 

    // 改变选择
    changeCheckedStatus=(e,i)=>{
        this.setState({
            cartList:this.state.cartList.map((item,index)=>{
                if(index===i){
                    item.checked=!item.checked
                }
                return item
            })
        }) 

        let flag = this.state.cartList.every((item,index)=>{
            if(item.checked===false) {
                return false 
            }else {
                return true 
            }
        }) 

        if(flag===true){
            this.setState({isSelectAll:true})
        }else {
            this.setState({isSelectAll:false}) 
        }
        this.sumPrice() 
    } 

    //全选或全不选,判断全选状态
    checkedAll=(e,check)=>{
        let checked = e.target ? e.target.checked : check 

        if(checked===true){
            this.setState({
                cartList:this.state.cartList.map((item,index)=>{
                    item.checked=true
                    return item
                }),
                isSelectAll:true
            }) 
        }else  if(checked===false){
            this.setState({
                cartList:this.state.cartList.map((item,index)=>{
                    item.checked=false
                    return item
                }),
                isSelectAll:false
            }) 
        }
        this.sumPrice()
    } 

    //计算总合计
    sumPrice=()=>{
        let totalPrice=0,selectedCount=0 
        this.state.cartList.forEach((item,index)=>{
            if(item.checked===true){
                totalPrice+=item.count*item.product_id.price
                selectedCount+=item.count
            }
        })
        this.setState({
            totalPrice,
            selectedCount
        })
    } 

    //结算传值
    settleAccounts=()=>{
        let shopping=[] 
        this.state.cartList.forEach((item,index)=>{
            if(item.checked===true){
                shopping.push(item)
            }
        }) 
        // console.log('cartList',this.state.cartList)
        // console.log('shopping',shopping)
        sessionStorage.setItem("cartList",JSON.stringify(this.state.cartList))
        sessionStorage.setItem("shopping",JSON.stringify(shopping))
        sessionStorage.setItem("totalPrice",JSON.stringify(this.state.totalPrice))
        this.props.history.push({
            pathname: '/cart/orders',
            state:{}
        })
    } 

    render() {
        let {cartList,isSelectAll,selectedCount,totalPrice} = this.state
        return (
            <div className="cart-content-wrap">
                <div className='cart-content'>
                    {
                        cartList.map((item,index)=>{
                            return(
                                <div key={index}>
                                    <div className="cart-list">
                                        <div className="cart-list-checkbox">
                                            <Checkbox
                                                style={{marginLeft:15}}
                                                checked={item.checked}
                                                onChange={(e)=>{this.changeCheckedStatus(e,index)}}
                                            />
                                        </div>
                                        <div className="cart-list-image">
                                            <img src={item.product_id.img || "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"} alt="商品图片"/>
                                        </div>
                                        <div className="cart-list-intro">
                                            <div>{item.product_id.name}</div>
                                            <div>{item.specificationStock_id.color}  {item.specificationStock_id.size}</div>
                                            <div>¥ {item.product_id.price}</div>
                                        </div>
                                        <div className="cart-list-count">
                                            <div className="selected">
                                                <button
                                                    className={classNames({
                                                        'selected_button': true,
                                                        'selected_button-disabled': item.count <= 1
                                                    })}
                                                    disabled={item.count <= 1}
                                                    onClick={(e)=>{this.reduce(e,index)}}
                                                >-</button>
                                                <input className="selected_input" type="text" value={item.count} onChange={(e)=>{this.getInputValue(e,index)}}/>
                                                <button className="selected_button" onClick={(e)=>{this.augment(e,index)}}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <WhiteSpace size="md" />
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
                                onChange={(e)=>{this.checkedAll(e,'')}}
                                style={{marginLeft:15}}
                            />,
                            <span className="jiesuan-checkbox_label">全选</span>
                        </div>
                        <div className={classNames({
                            'jiesuan-total': true,
                            'jiesuan-disabled': !selectedCount
                        })}>
                            <span>合计：</span>
                            <span className="jiesuan-total_price">¥ {totalPrice}</span>
                        </div>
                        <button
                            className={classNames({
                                'jiesuan-button': true,
                                'jiesuan-disabled': !selectedCount
                            })}
                            onClick={()=>{
                                if(selectedCount){
                                    this.settleAccounts()
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
