import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class Credit extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='credit-navbar-wrap'>
                <NavBar
                    className='credit-navbar'
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.go(-1)
                    }}
                >我的积分</NavBar>
            </div>

        )
    }
}

export default withRouter(Credit)