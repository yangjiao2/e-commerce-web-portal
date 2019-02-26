import React, {Component} from 'react'
import { NavBar } from 'antd-mobile';

import CartItem from "./CartItem";
import CartEdit from "./CartEdit";


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:true
        }
    }

    changeCartPage =()=>{
        this.setState({
            content:!this.state.content
        })
    };

    render() {
        let {content} = this.state;
        return (
            <div>
                <NavBar
                    mode="light"
                    style={{borderBottom: '1px solid #ebedf0'}}
                    rightContent={[
                        <span key={"1"} onClick={this.changeCartPage}>
                              {content ? "编辑":"完成"}
                        </span>
                    ]}
                >购物袋
                </NavBar>
                {
                    content ?
                        <CartItem/>:<CartEdit/>

                }
            </div>
        )
    }
}

export default Cart