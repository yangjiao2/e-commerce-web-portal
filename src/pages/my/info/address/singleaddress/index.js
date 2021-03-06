import React, { Component } from "react"
import { InputItem, TextareaItem, Picker, Switch, Toast } from 'antd-mobile'
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import moment from 'moment'
import { district } from 'antd-mobile-full-demo-data';

import { INSERT_LOCATION_MUTATION, UPDATE_LOCATION_MUTATION, LOCATION_BY_USER_ID_QUERY } from "../../../../../utils/gql"
import './index.css'
import { idGen } from "../../../../../utils/func"

class SingleAddress extends Component {
    constructor(props) {
        super(props)
        let state = {
            username: '',
            phone: '',
            province: '',
            city: '',
            area: '',
            address: '',
            id: '',
            defaultStatus: false
        }
        if (props.addressID === 'add') {
            this.state = { ...state }
        } else {
            let { province, city, area, address, phone, username, id, default: default1 } = props.addressChoosed
            let defaultStatus = default1 ? 1 : 0
            this.state = { ...state, province, city, area, address, phone, username, id, defaultStatus }
        }
        this.handleDistrict()
    }

    handleDistrict = () => {
        district.forEach((item) => {
            let { label } = item
            item.value = label
            if (item.children) {
                item.children.forEach((item) => {
                    let { label } = item
                    item.value = label
                    if (item.children) {
                        item.children.forEach((item) => {
                            let { label } = item
                            item.value = label
                        })
                    }
                })
            }
        })
    }

    saveAddress = (user_id, update_address) => {
        let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
        let { username, phone, province, city, area, address, defaultStatus, id } = this.state
        let areaAddress = province + city + area
        const testPhoneNum = /^1[0-9]{10}$/;
        let isPhoneAvailable = testPhoneNum.test(phone);

        if (username && isPhoneAvailable && areaAddress && address) {
            // let addressId = id || idGen('address')

            let defaultStatus1 = defaultStatus ? 1 : 0
            const addressContent = {
                address,
                phone,
                default: defaultStatus1,
                city,
                username,
                postcode: "",
                // id: addressId,
                user_id,
                area,
                province
            }

            let { addressID, defaultAddress } = this.props
            console.log(addressID, defaultAddress);
            if (addressID !== 'add') {
                let { id } = defaultAddress
                addressContent.id = id
            }

            update_address({ variables: addressContent }).then((data) => {
                this.props.refetch()
                let prePage = this.props.history.location.state.prePage

                if (defaultStatus1) {
                    sessionStorage.setItem('ordersAddress', JSON.stringify(addressContent))
                }
                if (prePage) {
                    sessionStorage.setItem('ordersAddress', JSON.stringify(addressContent))
                    this.props.history.go(-1)
                } else {
                    this.props.changePage(false)
                }
            })
        } else if (!username) {
            Toast.info('收货人不能为空', 1)
        } else if (!phone) {
            Toast.info('联系电话不能为空', 1);
        } else if (!isPhoneAvailable) {
            Toast.info('请输入11位有效手机号码', 1)
        } else if (!areaAddress) {
            Toast.info('请选择地区', 1)
        } else if (!address) {
            Toast.info('请输入详细地址，无需包含省市', 1)
        } else {
            Toast.info('收货地址暂未完善', 2)
        }

    }

    render() {
        let { addressID, user_id } = this.props
        let { username, phone, province, city, area, address } = this.state

        return (
            <div>
                <div>
                    <InputItem placeholder="请填写收货人" value={username} onChange={(username) => {
                        this.setState({ username })
                    }}>
                        <div>收货人</div>
                    </InputItem>
                    <InputItem placeholder="请填写联系电话" value={phone} onChange={(phone) => {
                        this.setState({ phone })
                    }}>
                        <div>联系电话</div>
                    </InputItem>
                    <Picker
                        data={district}
                        value={[province, city ? city : '', area ? area : '']}
                        onOk={(address) => {
                            // console.log('onOK address',address)
                            this.setState({ province: address[0], city: address[1], area: address[2] })
                        }}
                    >
                        <TextareaItem
                            title="选择地区"
                            editable={false}
                            value={province ? province + city + area : null}
                            placeholder="请选择地区"
                        />
                    </Picker>
                    <TextareaItem
                        title="详细地址"
                        placeholder="请输入详细地址，无需包含省市"
                        autoHeight
                        value={address}
                        onChange={(address) => {
                            this.setState({ address })
                        }}
                    />
                    <div className='address-default-checked'>
                        <span>设为默认地址</span>
                        <span>
                            <Switch
                                checked={this.state.defaultStatus}
                                color={'#f44'}
                                onChange={() => {
                                    this.setState({
                                        defaultStatus: !this.state.defaultStatus,
                                    })
                                }}
                            />
                        </span>
                    </div>
                </div>

                <div className='address-button-group'>
                    <Mutation mutation={addressID === 'add' ? gql(INSERT_LOCATION_MUTATION) : gql(UPDATE_LOCATION_MUTATION)}
                        refetchQueries={[
                            { query: gql(LOCATION_BY_USER_ID_QUERY), variables: { user_id } }
                        ]}
                        onError={error => console.log('error', error)}
                    >
                        {(update_address, { loading, error }) => (
                            <div className='address-add'
                                onClick={() => {
                                    this.saveAddress(user_id, update_address)
                                }}
                            >
                                保存并使用
                            </div>
                        )}
                    </Mutation>
                </div>
            </div>
        )
    }
}

export default SingleAddress
