import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class Member extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='member-wrap'>
                <div className='member-navbar-wrap'>
                    <NavBar
                        className='member-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {this.props.history.push({pathname: '/my/all'})}}
                        rightContent={[
                            <Icon key="1" type="ellipsis"/>,
                        ]}
                    >会员详情</NavBar>
                </div>
            </div>
        )
    }
}

export default withRouter(Member)