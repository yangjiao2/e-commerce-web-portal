import React, { Component } from 'react';
import { Checkbox, WhiteSpace  } from 'antd-mobile';
import classNames from 'classnames'

import './index.css'

export class CartItem extends Component {
    constructor(props){
        super(props);
        this.state={
            arr:[],
            sum_price:0
        };
    }

    //获取数据
    componentWillMount(){
        const arr = [
            {id:'1',name:'test1',num:1,img:'',new_price:10},
            {id:'2',name:'test2',num:2,img:'',new_price:20}
        ];
        this.setState({
            arr
        })

    }

    //获取输入框的值
    getInputValue=(e,i)=>{
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.num=e.target.value;
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
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.num=ele.num*1+1;
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
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.num=ele.num*1-1;
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
            arr:this.state.arr.filter((ele,index)=>{
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
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.checked=!ele.checked
                }
                return ele
            })
        });
        this.sumPrice();
    };

    //全选或全不选,判断全选状态
    checkedAll=(e)=>{
        // console.log('CheckedAll e',e);
        if(e.target.checked===true){
            this.setState({
                arr:this.state.arr.map((ele,index)=>{
                    ele.checked=true;
                    return ele
                })
            })
        }else  if(e.target.checked===false){
            this.setState({
                arr:this.state.arr.map((ele,index)=>{
                    ele.checked=false;
                    return ele
                })
            })
        }
        this.sumPrice();
    };

    //计算总合计
    sumPrice=()=>{
        let sum=0;
        this.state.arr.forEach((ele,index)=>{
            if(ele.checked===true){
                sum+=ele.num*ele.new_price
            }
        });
        this.setState({
            sum_price:sum
        })
    };

    //结算传值
    settleAccounts=()=>{
        let shopping=[];
        this.state.arr.forEach((ele,index)=>{
            if(ele.checked===true){
                shopping.push(ele)
            }
        });
        console.log('shopping',shopping);
        window.localStorage.setItem("shopping",JSON.stringify(shopping));
        window.localStorage.setItem("sumprice",JSON.stringify(this.state.sum_price));
        this.props.history.push('/jiesuan')
    };

    render() {
        return (
            <div className="Cart">
                <div className='section'>
                    {
                        this.state.arr.map((ele,index)=>{
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
                                            <img src={ele.img || "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"} alt=""/>
                                        </div>
                                        <div className="cart-list-intro">
                                            <div>{ele.name}</div>
                                            <div>颜色尺码等</div>
                                            <div>¥ {ele.new_price}</div>
                                        </div>
                                        <div className="cart-list-num">
                                            <div className="selected">
                                                <button
                                                    className={classNames({
                                                        'selected_button': true,
                                                        'selected_button-disabled': ele.num <= 1
                                                    })}
                                                    disabled={ele.num <= 1}
                                                    onClick={(e)=>{this.reduce(e,index)}}
                                                >-</button>
                                                <input className="selected_input" type="text" value={ele.num} onChange={(e)=>{this.getInputValue(e,index)}}/>
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
                            <Checkbox onChange={(e)=>{this.checkedAll(e)}} style={{marginLeft:15}}/>,
                            <span className="jiesuan-checkbox_label">全选</span>
                        </div>
                        <div className="jiesuan-total">
                            <span>合计：</span>
                            <span className="jiesuan-total_price">¥ {this.state.sum_price}</span>
                        </div>
                        <button className="jiesuan-button" onClick={()=>{this.settleAccounts()}}>
                            <span>结算</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
