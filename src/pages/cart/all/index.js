import React, {Component} from 'react'
import {NavBar, ActivityIndicator} from 'antd-mobile'
import {Query} from "react-apollo"
import gql from "graphql-tag"

import CartDetail from "./detail"
import CartEdit from "./edit"
import Empty from "../empty"
import './index.css'

import {cart_by_userid} from "../../../utils/gql"

class All extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'detail'
        }
    }

    componentWillMount() {
        this.getHash()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getHash()
    }

    getHash = () => {
        // console.log('location',window.location.hash)
        let hash = window.location.hash || '#tab=cart&page=detail'
        let page = 'detail'
        if (window.location.hash && hash.indexOf("&") > 0) {
            let pageHash = hash.split("&")[1]
            page = pageHash.substr(pageHash.indexOf("=") + 1)
        }
        this.setState({
            page
        })
    }

    changeCartPage = () => {
        this.setState((preState) => ({
            page: preState.page === 'detail' ? 'edit' : 'detail'
        }))
    }

    renderPage = (data) => {
        let {page} = this.state

        switch (page) {
            case 'detail':
                return <CartDetail cartList={data.cartList}/>
            case 'edit':
                return <CartEdit cartList={data.cartList}/>
            default:
                return <div>test</div>
        }
    }

    render() {
        let {page} = this.state

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
                        // console.log('cart data',data)

                        return (
                            <div>
                                <NavBar
                                    mode="light"
                                    style={{borderBottom: '1px solid #ebedf0'}}
                                    rightContent={[
                                        data.cartList.length ?
                                            <span key={"1"} onClick={this.changeCartPage}>
                                                {page === 'detail' ? "编辑" : "完成"}
                                            </span> : ''
                                    ]}
                                >购物袋
                                </NavBar>
                                {data.cartList.length ?
                                    this.renderPage(data) : <Empty/>
                                }
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}

export default All