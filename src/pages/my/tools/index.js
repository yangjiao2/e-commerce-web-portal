import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import Message from './message'
import Address from './address'
import {withRouter, Route, Switch} from 'react-router-dom'

class Tools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: ''
        }
    }

    componentWillMount() {
        let {location} = this.props
        if (location && location.state) {
            this.props.history.push({
                pathname: '/my/tools/' + location.state.page,
                state: {}
            })
            let navTitle = ''
            switch (location.state.page) {
                case 'address':
                    navTitle = '地址管理'
                    break
                case 'message':
                    navTitle = '系统通知'
                    break
                default:
                    navTitle = '无效页面'
                    break
            }
            this.setState({
                navTitle
            })
        }
    }

    render() {
        let {navTitle} = this.state

        return (
            <div className='tools-wrap'>
                <div className='tools-navbar-wrap'>
                    <NavBar
                        className='tools-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.push({pathname: '/my/all'})
                        }}
                        rightContent={[
                            <Icon key="1" type="ellipsis"/>,
                        ]}
                    >{navTitle}</NavBar>
                </div>
                <Switch>
                    <Route path="/my/tools/address" component={Address}/>
                    <Route path="/my/tools/message" component={Message}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(Tools)