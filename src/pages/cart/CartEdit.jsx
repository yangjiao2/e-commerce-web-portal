import React, { Component } from 'react';
import { Checkbox, WhiteSpace,Modal,Toast } from 'antd-mobile';
import classNames from 'classnames';

const alert = Modal.alert;

class CartEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    //获取数据
    componentWillMount(){
        const cartList = [
            {id:'1',name:'test1',count:1,img:'',price:10},
            {id:'2',name:'test2',count:2,img:'',price:20}
        ];
        this.setState({
            cartList
        })

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
    };

    //结算传值
    delete=()=>{
        let {cartList} = this.state;
        let listLength = cartList.length;

        alert('', '确定删除所选商品？', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确认',
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
    };

    //全选或全不选,判断全选状态
    checkedAll=(e)=>{
        // console.log('CheckedAll e',e);
        if(e.target.checked===true){
            this.setState({
                cartList:this.state.cartList.map((ele,index)=>{
                    ele.checked=true;
                    return ele
                })
            })
        }else  if(e.target.checked===false){
            this.setState({
                cartList:this.state.cartList.map((ele,index)=>{
                    ele.checked=false;
                    return ele
                })
            })
        }
    };


    render() {
        let {cartList} = this.state;
        let listLength = cartList.length;

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
                                            <img src={ele.img || "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"} alt=""/>
                                        </div>
                                        <div className="cart-list-intro">
                                            <div>{ele.name}</div>
                                            <div>颜色尺码等</div>
                                            <div>¥ {ele.price}</div>
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
                                    <Checkbox onChange={(e)=>{this.checkedAll(e)}} style={{marginLeft:15}}/>,
                                    <span className="jiesuan-checkbox_label">全选</span>
                                </div>
                                <div className="jiesuan-total">
                                </div>
                                <button className="jiesuan-button" onClick={()=>{this.delete()}}>
                                    <span>删除所选</span>
                                </button>
                            </div>
                        </div>:''
                }
            </div>
        );
    }
}

export default CartEdit;