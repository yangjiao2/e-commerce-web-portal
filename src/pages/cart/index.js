import React, {Component} from 'react'
import { NavBar } from 'antd-mobile';
import {CartItem} from "./CartItem";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    style={{borderBottom: '1px solid #ebedf0'}}
                    rightContent={[
                        <span key={"1"}>编辑</span>
                    ]}
                >购物袋
                </NavBar>
                <CartItem/>
            </div>
        )
    }
}

export default Cart