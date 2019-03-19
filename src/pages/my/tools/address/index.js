import {Component} from "react"
import React from "react"
import {userAddressbyprops} from "../../../../utils/gql"
import {ActivityIndicator, NavBar} from 'antd-mobile'
import {Icon, Row, Col} from 'antd'
import {Query} from "react-apollo"
import gql from "graphql-tag"

import SingleAddress from "./singleaddress"
import {getCookie} from "../../../../utils/cookie"
import './index.css'

class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            single: false,
            addressID: '',
            addressChoosed: {}
        }
    }

    componentWillMount() {
        let state = this.props.history.location.state || ''
        if (state && state.single) {
            this.setState({
                single: true
            })
        }
    }

    changePage = (bool) => {
        this.setState({
            single: bool
        })
    }

    changeAddress = (address) => {
        this.setState({
            addressID: address.id,
            addressChoosed: address
        })
    }

    render() {
        let {addressChoosed, addressID, single} = this.state
        let user_id = getCookie('user_id')
        let navContent = single ? '编辑地址' : '地址管理'

        return (
            <div>
                <div className='navbar'>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            if(single){
                                this.changePage(false)
                            }else {
                                this.props.history.go(-2)
                            }
                        }}
                    >{navContent}</NavBar>
                </div>
                <div className='content-wrap'>
                    <Query query={gql(userAddressbyprops)} variables={{user_id}}>
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

                                data = data.userAddressbyprops

                                return (
                                    <div>
                                        {
                                            this.state.single ?
                                                <SingleAddress
                                                    addressID={addressID}
                                                    addressChoosed={addressChoosed}
                                                    history={this.props.history}
                                                    user_id={user_id}
                                                />
                                                :
                                                <AddressRender
                                                    shoppingAddress={data}
                                                    changePage={this.changePage}
                                                    changeAddress={this.changeAddress}
                                                    history={this.props.history}
                                                />
                                        }
                                    </div>
                                )
                            }
                        }
                    </Query>
                </div>
            </div>
        )
    }
}

export default Address

class AddressRender extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    changeOrdersAddress =(address) => {
        // console.log('address',address,this.props.history)
        let {history} = this.props
        let prePage = history.location.state.prePage

        if(prePage){
            sessionStorage.setItem('ordersAddress',JSON.stringify(address))
            this.props.history.go(-2)
        }
    }

    render() {
        let {changePage, changeAddress, shoppingAddress} = this.props

        return (
            <div>
                <div className='address-add' onClick={() => {
                    changePage(true)
                    changeAddress({id: 'add'})
                }}>
                    <Icon type="plus"/>&nbsp;
                    添加新地址
                </div>
                {
                    !shoppingAddress.length ?
                        <div className='kind-empty gray'>
                            <p>暂无收货地址</p>
                            <p>点击下方按钮可新增地址</p>
                        </div>:''
                }
                {
                    shoppingAddress.length ?
                        <div className='other-address'>
                            {shoppingAddress.map(address => {
                                return (
                                    <div key={address.id} className='address-card'>
                                        <div className='address-info' onClick={() => this.changeOrdersAddress(address)}>
                                            <Row className='address-username-telephone'>
                                                <Col span={6} className='address-username ellipsis'>{address.username}</Col>
                                                <Col span={14} className='address-phone ellipsis'>
                                                    {address.telephone}&nbsp;&nbsp;
                                                    {address.default ?
                                                        <span className='address-label'>默认</span>:''
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24} className='address-address'>{address.province + address.city + address.area + address.address}</Col>
                                            </Row>
                                        </div>
                                        <div className='address-edit'>
                                            <Icon
                                                type="edit"
                                                onClick={()=>{
                                                    changePage(true)
                                                    changeAddress(address)
                                                }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>:''
                }
            </div>
        )
    }
}