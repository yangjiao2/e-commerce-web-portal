import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

import cart_empty from '../../../images/logo.png'
import './index.css'

class Empty extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let title = this.props.page === 'detail' ? '购物袋' : '收藏夹'

        let contentHeight = window.innerHeight - 50

        return (
            <div className="cart-empty" style={{ height: contentHeight }}>
                <div>
                    <img src={cart_empty} alt="img" width={100} />
                </div>
                <div>{title}空空如也</div>
                <div>
                    <button className="empty-button"
                        onClick={() => {
                            this.props.history.push({
                                pathname: `/home`
                            })
                        }}
                    >
                        去逛逛
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(Empty)