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
            <div className='shop-wrap'>
                <div className='shop-navbar-wrap'>
                    <NavBar
                        className='shop-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {this.props.history.push({pathname: '/my/all'})}}
                    >店铺详情</NavBar>
                </div>
            </div>
        )
    }
}

export default withRouter(Shop)