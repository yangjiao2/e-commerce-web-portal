import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navTitle: '',
            page: 'pay'
        }
    }

    componentWillMount() {
        let {location} = this.props
        if (location && location.state) {
            let navTitle = ''
            let page = location.state.page
            switch (page) {
                case 'pay':
                    navTitle = '待付款'
                    break
                case 'ship':
                    navTitle = '待发货'
                    break
                case 'unbox':
                    navTitle = '待收货'
                    break
                case 'judge':
                    navTitle = '待评价'
                    break
                default:
                    navTitle = '无效页面'
                    break
            }
            this.setState({
                navTitle,
                page
            })
        }
    }

    render() {
        let {navTitle} = this.state
        return (
            <div className='order-wrap'>
                <div className='order-navbar-wrap'>
                    <NavBar
                        className='order-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.push({pathname: '/my/all'})
                        }}
                    >{navTitle}</NavBar>
                </div>
            </div>
        )
    }
}

export default withRouter(Order)