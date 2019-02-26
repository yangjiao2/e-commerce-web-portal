import React, {Component} from 'react'
import { NavBar,ActivityIndicator } from 'antd-mobile';
import {Query} from "react-apollo"
import gql from "graphql-tag"

import CartItem from "./CartItem";
import CartEdit from "./CartEdit";
import {cart_by_userid} from "../../utils/gql";

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
            <Query query={gql(cart_by_userid)} variables={{user_id: "obR_j5GbxDfGlOolvSeTdZUwfpKA"}}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (
                                <div className="loading-center">
                                    <ActivityIndicator text="Loading..." size="large"/>
                                </div>
                            )
                        }
                        if (error) {
                            return 'error!'
                        }
                        console.log('cart data',data);
                        return (
                            <div>
                                <NavBar
                                    mode="light"
                                    style={{borderBottom: '1px solid #ebedf0'}}
                                    rightContent={[
                                        <span key={"1"} onClick={this.changeCartPage}>{content ? "编辑":"完成"}</span>
                                    ]}
                                >购物袋
                                </NavBar>
                                {
                                    content ?
                                        <CartItem cartList={data.cartList}/>:<CartEdit cartList={data.cartList}/>

                                }
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}

export default Cart;