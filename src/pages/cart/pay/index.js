import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {NavBar, Icon, Checkbox, Toast} from 'antd-mobile'
import classNames from 'classnames'

import './index.css'

class Pay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked:true,
            totalPrice:JSON.parse(sessionStorage.getItem('totalPrice')),
        }
    }

    changeCheckedStatus = (e) => {
        this.setState({
            checked:e.target.checked
        })
    }

    pay = () => {
        Toast.info('支付成功', 2);
        this.props.history.push({
            pathname:'/my'
        })
    }

    render() {
        let {checked,totalPrice} = this.state
        return (
            <div className='pay-wrap'>
                <div className='pay-navbar-wrap navbar'>
                    <NavBar
                        className='pay-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {this.props.history.goBack()}}
                    >订单支付</NavBar>
                </div>
                <div className='pay-content-wrap content-wrap'>
                    <div className='pay-content-price'>
                        <p>订单金额:</p>
                        <p>￥: {totalPrice}</p>
                    </div>
                    <div className='pay-content-type'>
                        <p>请选择支付方式</p>
                        <div>
                            <img src="https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/wechat.png" alt=''/>
                            <span>微信支付</span>
                            <span>
                                <Checkbox checked={checked} onChange={(e)=>this.changeCheckedStatus(e)}/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="pay-footer">
                    <button
                            className={classNames({
                                'pay-button': true,
                                'pay-disabled': !checked
                            })}
                            onClick={()=>{
                                if(checked){
                                   this.pay()
                                }
                            }}>
                        <span>确认支付</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(Pay)