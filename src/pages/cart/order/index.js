import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class CartOrder extends Component {
    constructor(props) {
        super(props)
        console.log('props',props)
        this.state = {}
    }

    render() {
        return (
            <div className='order-wrap'>
                <div className='order-navbar-wrap'>
                    <NavBar
                        className='order-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {this.props.history.goBack()}}
                    >订单确认</NavBar>
                </div>
            </div>
        )
    }
}

export default withRouter(CartOrder)