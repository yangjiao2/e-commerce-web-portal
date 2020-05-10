import React, { Component } from 'react'
import { NavBar, ActivityIndicator } from 'antd-mobile'
import { Query } from "react-apollo"
import gql from "graphql-tag"

import CartDetail from "./detail"
import CartEdit from "./edit"
import Empty from "../empty"
import { CART_DETAIL_BY_USER_ID_QUERY } from "../../../utils/gql"
import { getCookie } from "../../../utils/cookie"
import './index.css'

class All extends Component {
    constructor(props) {
        super(props)
        console.log('cart all ', props)
        let page = props.match.params.page || 'details';
        this.state = {
            page,
            updateData: false,
            status: page === 'detail' ? 1 : 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps);
        if (nextProps.match.params.page !== this.props.match.params.page) {
            let page = nextProps.match.params.page
            this.setState({
                page,
                status: page === 'detail' ? 1 : 0,
            })
        }
    }

    componentWillMount() {
        // console.log('cartAll componentWillMount', this.props, this.state)
        // this.getHash()
    }

    componentDidMount() {
        console.log('cartAll componentDidMount', this.props, this.state)
        let state = this.props.history.location.state
        let updateData = state ? state.updateData : false

        if (updateData) {
            this.setState({
                updateData
            })
        }
    }

    // getHash = () => {
    //     console.log('location', window.location.hash)
    //     let hash = window.location.hash || '#tab=cart&page=detail'
    //     let page = 'detail'
    //     if (window.location.hash && hash.indexOf("&") > 0) {
    //         let pageHash = hash.split("&")[1]
    //         page = pageHash.substr(pageHash.indexOf("=") + 1)
    //     }
    //     this.setState({
    //         page
    //     })
    // }

    changeCartPage = () => {
        this.setState((preState) => ({
            page: preState.page === 'detail' ? 'edit' : 'detail'
        }))
    }

    renderPage = (data, refetch) => {
        let { page, updateData } = this.state
        let cartList = data.cart;
        if (page === 'edit') {
            return <CartEdit cartList={cartList} refetch={refetch} />
        }
        return <CartDetail cartList={cartList} refetch={refetch} updateData={updateData} page={page} />

    }

    render() {
        let { page } = this.state
        let user_id = getCookie('user_id')
        console.log('render cart', page, this.props, user_id)

        return (
            <Query query={gql(CART_DETAIL_BY_USER_ID_QUERY)} fetchPolicy={'network-only'} variables={{ "user_id": user_id, "status": this.state.status }}>
                {
                    ({ loading, error, data, refetch }) => {
                        if (loading) {
                            return (
                                <div className="loading-center">
                                    <ActivityIndicator size="large" />
                                    <span>加载中...</span>
                                </div>
                            )
                        }
                        if (error) {
                            return '购物车: 页面出问题...'
                        }
                        let cartList = data.cart;
                        return (
                            <div className='cart-wrap'>
                                <div className='cart-navbar-wrap navbar'>
                                    {/*
                                    <NavBar
                                        mode="light"
                                        rightContent={[
                                            cartList.length ?
                                                <span className='navbar-button' key={"cart-navbar"} onClick={this.changeCartPage}>
                                                    {page === 'detail' ? "编辑" : "完成"}
                                                </span> : ''
                                        ]}
                                    >购物袋2
                                    </NavBar>
                                     */}
                                </div>
                                {cartList.length ?
                                    this.renderPage(data, refetch) : <Empty page={this.state.page} />
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
