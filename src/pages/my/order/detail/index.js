import {Component} from "react"
import React from "react"
import './index.css'
import {NavBar, Icon} from 'antd-mobile'

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className='detail-wrap'>
                    <div className='navbar'>
                        <NavBar
                            mode="light"
                            icon={<Icon type="left"/>}
                            onLeftClick={() => {
                                this.props.history.go(-1)
                            }}
                        >订单详情</NavBar>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail