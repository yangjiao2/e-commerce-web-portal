import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='shop-navbar-wrap'>
                <NavBar
                    className='shop-navbar'
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.go(-2)
                    }}
                >店铺管理</NavBar>
            </div>

        )
    }
}

export default withRouter(Shop)