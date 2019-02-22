import React, {Component} from 'react'
import { NavBar } from 'antd-mobile';
import {Tab3} from "./Cart";

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
                    rightContent={[
                        <span key={"1"}>编辑</span>
                    ]}
                >购物袋
                </NavBar>
                <Tab3/>
            </div>
        )
    }
}

export default Cart