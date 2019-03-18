import {Component} from "react"
import React from "react"
import {userAddressbyprops} from "../../../../utils/gql"
import {ActivityIndicator, NavBar} from 'antd-mobile'
import {Icon, Row, Col} from 'antd'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import './index.css'
import SingleAddress from "./singleaddress"

class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            single: false,
            addressID: '',
            addressChoosed: {}
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

    getDefaultAddress = (data) => (
        data.find(data => data.default === 1)
    )

    getOtherAddress = (data) => {
        let defaultAddressIndex = data.find(data => data.default === 1)
        let dataCopy = [...data]
        dataCopy.splice(defaultAddressIndex, 1)
        return dataCopy
    }

    render() {
        let {addressChoosed, addressID} = this.state
        return (
            <div>
                <div className='navbar'>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.go(-2)
                        }}
                    >地址管理</NavBar>
                </div>
                <div className='content-wrap'>
                    <Query query={gql(userAddressbyprops)} variables={{user_id: "obR_j5GbxDfGlOolvSeTdZUwfpKA"}}>
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
                                                <SingleAddress addressID={addressID} addressChoosed={addressChoosed} changePage={this.changePage}/>
                                                :
                                                <AddressRender
                                                    defaultAddress={this.getDefaultAddress(data)}
                                                    otherAddress={this.getOtherAddress(data)}
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
        let {changePage, changeAddress, defaultAddress, otherAddress} = this.props
        let {username, telephone, province, city, area, address} = defaultAddress

        return (
            <div>
                <div className='address-add' onClick={() => {
                    changePage(true)
                    changeAddress({id: 'add'})
                }}>
                    <Icon type="plus" style={{fontSize: 22, fontWeight: 800}}/>&nbsp;
                    添加新地址
                </div>

                <div className='default-address'>
                    <div className='address-card'>
                        <div className='address-info' onClick={() => this.changeOrdersAddress(defaultAddress)}>
                            <Row className='address-username-telephone'>
                                <Col span={6} className='address-username ellipsis'>{username}</Col>
                                <Col span={14} className='address-phone ellipsis'>{telephone}&nbsp;&nbsp;
                                    <span className='address-label'>默认</span></Col>
                            </Row>
                            <Row>
                                <Col span={24} className='address-address'>{province + city + area + address}</Col>
                            </Row>
                        </div>
                        <div className='address-edit'>
                            <Icon
                                type="edit"
                                style={{fontSize: 14}}
                                onClick={()=>{
                                    changePage(true)
                                    changeAddress(address)
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className='other-address'>
                    {otherAddress.map(address => {
                        return (
                            <div key={address.id} className='address-card'>
                                <div className='address-info' onClick={() => this.changeOrdersAddress(address)}>
                                    <Row className='address-username-telephone'>
                                        <Col span={6} className='address-username ellipsis'>{address.username}</Col>
                                        <Col span={14} className='address-phone ellipsis'>{address.telephone}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={24} className='address-address'>{address.province + address.city + address.area + address.address}</Col>
                                    </Row>
                                </div>
                                <div className='address-edit'>
                                    <Icon
                                        type="edit"
                                        style={{fontSize: 14}}
                                        onClick={()=>{
                                            changePage(true)
                                            changeAddress(address)
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}