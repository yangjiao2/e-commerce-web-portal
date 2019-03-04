import React, {Component} from 'react'
import {Checkbox, WhiteSpace, Modal, Toast} from 'antd-mobile'
import classNames from 'classnames'
import {Mutation} from "react-apollo"
import gql from "graphql-tag"

import '../index.css'
import {delete_userCart_by_id} from "../../../../utils/gql"
const alert = Modal.alert

class CartEdit extends Component {
    constructor(props) {
        super(props)
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
            this.checkedAll('',false)
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
        this.sumCount()
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
        this.sumCount()
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
        this.sumCount()
    }

    // 删除
    delete=(delete_userCart_by_id)=>{
        let {cartList} = this.state

        alert('', `确定要删除这${this.state.selectedCount}种商品吗？`, [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定',
                onPress: () => {
                    let deleteList = cartList.filter((item)=> item.checked === true)
                    let cartList1 = cartList.filter((item)=> item.checked === false)

                    let deleteIdList = deleteList.map(item => item.id)
                    // console.log('delete list',deleteIdList)

                    delete_userCart_by_id({variables:{id:deleteIdList}}).then((data)=>{
                        // console.log('delete data',data)
                        let num = data.data.delete_userCart.replace(/[^0-9]/ig,"")
                        if(num){
                            Toast.info('删除成功', 1)

                            this.setState({
                                cartList:cartList1,
                                selectedCount:0
                            })
                        }
                    });
                }
            },
        ])
    }

    //删除单个备用
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
            this.sumCount()
        },1)
    }

    // 改变选择
    changeCheckedStatus=(e,i)=>{
        this.setState({
            cartList:this.state.cartList.map((item,index)=>{
                if(index===i){
                     item.checked=! item.checked
                }
                return  item
            })
        })

        let flag = this.state.cartList.every((item,index)=>{
            if( item.checked===false) {
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
        this.sumCount()
    }

    //全选或全不选,判断全选状态
    checkedAll=(e,check)=>{
        let checked = e.target ? e.target.checked : check

        if(checked===true){
            this.setState({
                cartList:this.state.cartList.map(( item,index)=>{
                     item.checked=true
                    return  item
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
        this.sumCount()
    }

    //计算总合计
    sumCount=()=>{
        let selectedCount=0
        this.state.cartList.forEach((item,index)=>{
            if(item.checked===true){
                selectedCount+=item.count
            }
        })
        this.setState({
            selectedCount
        })
    }

    render() {
        let {cartList} = this.state
        let listLength = cartList.length

        return (
            <Mutation mutation={gql(delete_userCart_by_id)}
                      onCompleted={()=>{this.props.refetch()}}
                      onError={error=>console.log('error',error)}
            >
                {(delete_userCart_by_id,{ loading, error }) => (
                    <div className="cart-content-wrap">
                        <div className='cart-content'>
                            {
                                this.state.cartList.map((item,index)=>{
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
                                                    <img src={item.product_id.img || "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png"} alt=""/>
                                                </div>
                                                <div className="cart-list-intro">
                                                    <div>{item.product_id.name}</div>
                                                    <div>颜色尺码等</div>
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
                                        <button className="jiesuan-button" onClick={()=>{this.delete(delete_userCart_by_id)}}>
                                            <span>删除({this.state.selectedCount})</span>
                                        </button>
                                    </div>
                                </div>:''
                        }
                    </div>
                )}
            </Mutation>
        )
    }
}

export default CartEdit