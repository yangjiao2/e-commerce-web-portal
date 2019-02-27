import {Component} from "react"
import React from "react"
import {userAddressbyprops} from "../../../../utils/gql"
import {ActivityIndicator} from 'antd-mobile'
import {Button, Icon} from 'antd'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import './index.css'

class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
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

                            return (
                                <AddressRender data={data.userAddressbyprops}/>
                            )
                        }
                    }
                </Query>
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

    render() {
        let {data} = this.props
        return (
            <div>
                <div className='address-add'>
                    <Icon type="plus" style={{fontSize: 22}}/>&nbsp;
                    添加新地址
                </div>
                <div>
                    {data.map(address => {
                        return (
                            <div key={address.id} className='address-card'>
                                <div>
                                    收件人：{address.username}
                                </div>
                                <div>
                                    联系电话：{address.telephone}
                                </div>
                                <div>
                                    联系地址：{address.province + address.city + address.area + address.address}
                                </div>
                                <Button type='danger' className='address-delete'>删除</Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}