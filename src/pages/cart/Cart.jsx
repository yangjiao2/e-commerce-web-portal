import React, { Component } from 'react';
import { Checkbox, Card, WhiteSpace } from 'antd-mobile';

import './index.css'

export class Tab3 extends Component {
    constructor(props){
        super(props);
        this.state={
            arr:[],
            sum_price:0
        };
        console.log(props)
    }

    //获取数据
    componentWillMount(){
        const arr = [
            {name:'test1',num:1,img:'',new_price:10},
            {name:'test2',num:2,img:'',new_price:20}
        ];
        this.setState({
            arr
        })

    }

    //获取输入框的值
    getInputText=(e,i)=>{
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
        this.SumPrice();
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
        this.SumPrice()
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
        this.SumPrice();
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
            this.SumPrice()
        },1)
    };

    // 实现全选与反选的操作
    CheckAllorNoAll=(e,i)=>{
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.checked=!ele.checked
                }
                return ele
            })
        });

        let flag=this.state.arr.every((ele,index)=>{
            if(ele.checked===false) {
                return false
            }else {
                return true
            }
        });

        if(flag===true){
            this.refs.checkALL.checked=true
        }else {
            this.refs.checkALL.checked=false
        }
        this.SumPrice();
    };

    //全选全不选,判断全选状态
    CheckedAll=(e)=>{
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
        this.SumPrice();
    };

    //计算总合计
    SumPrice=()=>{
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
    SettleAccounts=()=>{
        let shopping=[];
        this.state.arr.forEach((ele,index)=>{
            if(ele.checked===true){
                shopping.push(ele)
            }
        });
        console.log('shopping',shopping);
        window.localStorage.setItem("shopping",JSON.stringify(shopping));
        window.localStorage.setItem("sumprice",JSON.stringify(this.state.sum_price));
        this.props.history.push('/tab4')
    };

    render() {
        return (
            <div className="Cart">
                <div className='section'>
                    {
                        this.state.arr.map((ele,index)=>{
                            return(
                                <div className="G_list" key={index}>
                                    <div className="G_Checked">
                                        <input type="checkbox" checked={ele.checked} onChange={
                                            (e)=>{
                                                this.CheckAllorNoAll(e,index)
                                            }
                                        }/>
                                    </div>
                                    <div className="G_img">
                                        <img src={ele.img} alt=""/>
                                    </div>
                                    <div className="G_Content">
                                        <div className="G_selected">
                                            <button onClick={
                                                (e)=>{
                                                    this.augment(e,index)
                                                }
                                            }>+</button>
                                            <input type="text" ref="nums" value={ele.num} onChange={
                                                (e)=>{
                                                    this.getInputText(e,index)
                                                }
                                            }/>
                                            <button onClick={
                                                (e)=>{
                                                    this.reduce(e,index)
                                                }
                                            }>-</button>
                                        </div>
                                        <div className="G_text">
                                            <p>{ele.name}</p>
                                            <p>
                                                单价：<span>{ele.new_price}</span>
                                                小计：<span>{ele.num*ele.new_price}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="G_del">
                                        <button onClick={
                                            (e)=>{
                                                this.del(e,index)
                                            }
                                        }>删除</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <WhiteSpace size="lg" />
                    <Card full>
                        <Card.Header
                            title="This is title"
                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra={<span>this is extra</span>}
                        />
                        <Card.Body>
                            <div>This is content of `Card`</div>
                        </Card.Body>
                        <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                    </Card>
                </div>
                <div className="footer">
                    <div className="jiesuan">
                        <div className="jiesuan-checkbox">
                            <Checkbox onChange={(e)=>{this.CheckedAll(e)}} style={{marginLeft:15}}/>,
                            <span className="jiesuan-checkbox_label">全选</span>
                        </div>
                        <div className="jiesuan-total">
                            <span>合计：</span>
                            <span className="jiesuan-total_price">¥ {this.state.sum_price}</span>
                        </div>
                        <button className="jiesuan-button" onClick={()=>{this.SettleAccounts()}}>
                            <span>提交订单</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
