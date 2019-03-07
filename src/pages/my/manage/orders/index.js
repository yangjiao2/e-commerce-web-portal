import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='orders-navbar-wrap'>
                <NavBar
                    className='orders-navbar'
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.go(-2)
                    }}
                >订单管理</NavBar>
            </div>

        )
    }
}

export default withRouter(Orders)