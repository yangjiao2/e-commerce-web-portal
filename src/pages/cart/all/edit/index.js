import React, { Component } from 'react';
import { Checkbox, WhiteSpace, Modal, Toast } from 'antd-mobile';
import classNames from 'classnames';
// import { Query,Mutation } from "react-apollo";

import '../index.css'
const alert = Modal.alert;

class CartEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectAll:false,
            selectedCount:0
        }
    }

    //获取数据
    componentWillMount(){
        this.setState({
            cartList:this.props.cartList
        },()=>{
            this.checkedAll('',false);
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
        this.sumCount();
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
        this.sumCount();
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
        this.sumCount();
    };

    //结算传值
    delete=()=>{
        let {cartList} = this.state;
        let listLength = cartList.length;

        alert('', `确定要删除这${this.state.selectedCount}种商品吗？`, [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定',
                onPress: () =>
                    new Promise((resolve) => {
                        for (let i = 0; i < listLength; i++) {
                            if (cartList[i] && cartList[i].checked===true) {
                                cartList.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
                                i--; // 如果不减，将漏掉一个元素
                            }
                        }

                        this.setState({
                            cartList:cartList
                        });
                        Toast.info('删除成功', 1);
                        this.sumCount();
                        setTimeout(resolve, 1000);
                    }),
            },
        ]);
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
            this.sumCount();
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
        this.sumCount();
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
        this.sumCount();
    };

    //计算总合计
    sumCount=()=>{
        let selectedCount=0;
        this.state.cartList.forEach((ele,index)=>{
            if(ele.checked===true){
                selectedCount+=ele.count;
            }
        });
        this.setState({
            selectedCount
        });
    };

    render() {
        let {cartList} = this.state;
        let listLength = cartList.length;

        return (
            <div className="cart-wrap">
                <div className='cart-content'>
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
                {
                    listLength ?
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
                                <div className="jiesuan-total">
                                </div>
                                <button className="jiesuan-button" onClick={()=>{this.delete()}}>
                                    <span>删除({this.state.selectedCount})</span>
                                </button>
                            </div>
                        </div>:''
                }
            </div>
        );
    }
}

export default CartEdit;