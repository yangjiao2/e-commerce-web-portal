import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class Coupon extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='coupon-navbar-wrap'>
                <NavBar
                    className='coupon-navbar'
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.go(-1)
                    }}
                >优惠券</NavBar>
            </div>

        )
    }
}

export default withRouter(Coupon)