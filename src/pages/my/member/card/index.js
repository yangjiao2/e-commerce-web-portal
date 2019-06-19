import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='card-navbar-wrap'>
                <NavBar
                    className='card-navbar'
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.go(-1)
                    }}
                >会员卡</NavBar>
            </div>

        )
    }
}

export default withRouter(Card)