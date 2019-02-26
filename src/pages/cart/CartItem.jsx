import React, { Component } from 'react';
import { Checkbox, WhiteSpace  } from 'antd-mobile';
import classNames from 'classnames';

import './index.css'

class CartItem extends Component {
    constructor(props){
        super(props);
        this.state={
            cartList:[],
            totalPrice:0,
            isSelectAll:true,
            selectedCount:0
        };
    }

    //获取数据
    componentWillMount(){
        // const cartList = [
        //     {id:'1',name:'test1',count:1,img:'',price:10},
        //     {id:'2',name:'test2',count:2,img:'',price:20}
        // ];
        this.setState({
            cartList:this.props.cartList
        },()=>{
            this.checkedAll('',true);
        });

    }

    //获取输入框的值
    getInputValue=(e,i)=>{
        this.setState({
            cartList:this.state.cartList.map((ele,index)=>{
                if(index===i){
                    ele.count=e.target.value;
                    return ele
                }else {
                    return ele
                }
            })
        });
        this.sumPrice();
    };

    // 增加
    augment=(e,i)=>{
        this.setState({
            cartList:this.state.cartList.map((ele,index)=>{
                if(index===i){
                    ele.count=ele.count*1+1;
                    return ele
                }else {
                    return ele
                }
            })
        });
        this.sumPrice()
    };

    // 减少
    reduce=(e,i)=> {
        this.setState({
            cartList:this.state.cartList.map((ele,index)=>{
                if(index===i){
                    ele.count=ele.count*1-1;
                    return ele
                }else {
                    return ele
                }
            })
        });
        this.sumPrice();
    };

    //删除
    del=(e,i)=> {
        this.setState({
            cartList:this.state.cartList.filter((ele,index)=>{
                if(index!==i){
                    return true
                }else {
                    return false
                }
            })
        });
        setTimeout(()=>{
            this.sumPrice()
        },1)
    };

    // 改变选择
    changeCheckedStatus=(e,i)=>{
        this.setState({
            cartList:this.state.cartList.map((ele,index)=>{
                if(index===i){
                    ele.checked=!ele.checked
                }
                return ele
            })
        });

        let flag = this.state.cartList.every((ele,index)=>{
            if(ele.checked===false) {
                return false;
            }else {
                return true;
            }
        });

        if(flag===true){
            this.setState({isSelectAll:true});
        }else {
            this.setState({isSelectAll:false});
        }
        this.sumPrice();
    };

    //全选或全不选,判断全选状态
    checkedAll=(e,check)=>{
        let checked = e.target ? e.target.checked : check;

        if(checked===true){
            this.setState({
                cartList:this.state.cartList.map((ele,index)=>{
                    ele.checked=true;
                    return ele
                }),
                isSelectAll:true
            });
        }else  if(checked===false){
            this.setState({
                cartList:this.state.cartList.map((ele,index)=>{
                    ele.checked=false;
                    return ele
                }),
                isSelectAll:false
            });
        }
        this.sumPrice();
    };

    //计算总合计
    sumPrice=()=>{
        let totalPrice=0,selectedCount=0;
        this.state.cartList.forEach((ele,index)=>{
            if(ele.checked===true){
                totalPrice+=ele.count*ele.product_id.price;
                selectedCount+=ele.count;
            }
        });
        this.setState({
            totalPrice,
            selectedCount
        });
    };

    //结算传值
    settleAccounts=()=>{
        let shopping=[];
        this.state.cartList.forEach((ele,index)=>{
            if(ele.checked===true){
                shopping.push(ele)
            }
        });
        console.log('shopping',shopping);
        window.localStorage.setItem("shopping",JSON.stringify(shopping));
        window.localStorage.setItem("sumprice",JSON.stringify(this.state.totalPrice));
        this.props.history.push('/jiesuan')
    };

    render() {
        return (
            <div className="Cart">
                <div className='section'>
                    {
                        this.state.cartList.map((ele,index)=>{
                            return(
                                <div key={index}>
                                    <div className="cart-list">
                                        <div className="cart-list-checkbox">
                                            <Checkbox
                                                style={{marginLeft:15}}
                                                checked={ele.checked}
                                                onChange={(e)=>{this.changeCheckedStatus(e,index)}}
                                            />
                                        </div>
                                        <div className="cart-list-image">
                                            <img src={ele.product_id.img || "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"} alt=""/>
                                        </div>
                                        <div className="cart-list-intro">
                                            <div>{ele.product_id.name}</div>
                                            <div>颜色尺码等</div>
                                            <div>¥ {ele.product_id.price}</div>
                                        </div>
                                        <div className="cart-list-count">
                                            <div className="selected">
                                                <button
                                                    className={classNames({
                                                        'selected_button': true,
                                                        'selected_button-disabled': ele.count <= 1
                                                    })}
                                                    disabled={ele.count <= 1}
                                                    onClick={(e)=>{this.reduce(e,index)}}
                                                >-</button>
                                                <input className="selected_input" type="text" value={ele.count} onChange={(e)=>{this.getInputValue(e,index)}}/>
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
                                checked={this.state.isSelectAll}
                                onChange={(e)=>{this.checkedAll(e,'')}}
                                style={{marginLeft:15}}
                            />,
                            <span className="jiesuan-checkbox_label">全选</span>
                        </div>
                        <div className={classNames({
                            'jiesuan-total': true,
                            'jiesuan-disabled': !this.state.selectedCount
                        })}>
                            <span>合计：</span>
                            <span className="jiesuan-total_price">¥ {this.state.totalPrice}</span>
                        </div>
                        <button
                            className={classNames({
                                'jiesuan-button': true,
                                'jiesuan-disabled': !this.state.selectedCount
                            })}
                            disabled={!this.state.isSelectAll}
                            onClick={()=>{this.settleAccounts()}}
                        >
                            <span>去结算({this.state.selectedCount})</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItem;
