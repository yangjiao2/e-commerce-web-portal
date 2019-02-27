import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class Order extends Component {
    constructor(props) {
        super(props)
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
                        onLeftClick={() => {this.props.history.push({pathname: '/my/all'})}}
                        rightContent={[
                            <Icon key="1" type="ellipsis"/>,
                        ]}
                    >订单详情</NavBar>
                </div>
            </div>
        )
    }
}

export default withRouter(Order)