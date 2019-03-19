import React, {Component} from "react"
import {InputItem, TextareaItem, Picker, Switch} from 'antd-mobile'
import {Mutation} from "react-apollo"
import gql from "graphql-tag"
import moment from 'moment'

import {create_userAddress} from "../../../../../utils/gql"
import './index.css'
import {idGen} from "../../../../../utils/func"

const provinceAll = [
    {
        label: '江苏省',
        value: '江苏省',
    },
    {
        label: '河南省',
        value: '河南省',
    },
    {
        label: '安徽省',
        value: '安徽省',
        children: [
            {
                label: '合肥市',
                value: '合肥市',
                children: [
                    {
                        label: '蜀山区',
                        value: '蜀山区',
                    },
                    {
                        label: '瑶海区',
                        value: '瑶海区',
                    },
                    {
                        label: '包河区',
                        value: '包河区',
                    },
                    {
                        label: '庐阳区',
                        value: '庐阳区',
                    }
                ],
            },
            {
                label: '芜湖市',
                value: '芜湖市',
                children: [
                    {
                        label: '镜湖区',
                        value: '镜湖区',
                    },
                    {
                        label: '弋江区',
                        value: '弋江区',
                    },
                ],
            },
            {
                label: '六安市',
                value: '六安市',
            },
            {
                label: '淮南市',
                value: '淮南市',
            },
            {
                label: '马鞍山市',
                value: '马鞍山市',
            },
            {
                label: '黄山市',
                value: '黄山市',
            }
        ]
    },
    {
        label: '湖北省',
        value: '湖北省',
    },
    {
        label: '江西省',
        value: '江西省',
    },
]

class SingleAddress extends Component {
    constructor(props) {
        super(props)
        let state = {
            username: '',
            telephone: '',
            province: '安徽省',
            city: '合肥市',
            area: '蜀山区',
            address: '',
            id: '',
            defaultStatus:false
        }
        if (props.addressID === 'add') {
            this.state = {...state}
        } else {
            let {province, city, area, address, telephone, username, id, default:default1} = props.addressChoosed
            let defaultStatus = default1 ? 1 : 0
            this.state = {...state, province, city, area, address, telephone, username, id, defaultStatus}
        }
    }

    saveAddress = (user_id, create_userAddress) => {
        let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
        let id = idGen('address')
        let {username, telephone, province, city, area, address, defaultStatus} = this.state
        let defaultStatus1 = defaultStatus ? 1 : 0
        const addressContent = {
            address,
            updatedAt: "",
            telephone,
            default: defaultStatus1,
            city,
            username,
            postcode: "",
            createdAt,
            deletedAt: "",
            id,
            user_id,
            area,
            province
        }

        create_userAddress({variables:addressContent}).then((data)=>{
            let prePage = this.props.history.location.state.prePage
            if(prePage){
                sessionStorage.setItem('ordersAddress',JSON.stringify(addressContent))
                this.props.history.go(-2)
            }
        })
    }

    render() {
        let {user_id} = this.props
        let {username, telephone, province, city, area, address} = this.state

        return (
            <div>
                <div>
                    <InputItem placeholder="请填写收货人" value={username} onChange={(username) => {
                        this.setState({username})
                    }}>
                        <div>收货人</div>
                    </InputItem>
                    <InputItem placeholder="请填写联系电话" value={telephone} onChange={(telephone) => {
                        this.setState({telephone})
                    }}>
                        <div>联系电话</div>
                    </InputItem>
                    <Picker
                        data={provinceAll}
                        value={[province, city ? city : '', area ? area : '']}
                        onOk={(address) => {
                            this.setState({province: address[0], city: address[1], area: address[2]})
                        }}
                    >
                        <TextareaItem
                            title="选择地区"
                            editable={false}
                            value={province+city+area}
                        />
                    </Picker>
                    <TextareaItem
                        title="详细地址"
                        placeholder="请输入详细地址，无需包含省市"
                        autoHeight
                        value={address}
                        onChange={(address) => {
                            this.setState({address})
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
                    <Mutation mutation={gql(create_userAddress)}
                              onError={error=>console.log('error',error)}
                    >
                        {(create_userAddress,{ loading, error }) => (
                            <div className='address-add'
                                 onClick={()=>{
                                     this.saveAddress(user_id, create_userAddress)
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