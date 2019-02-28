import {Component} from "react"
import React from "react"
import {userAddressbyprops} from "../../../../utils/gql"
import {ActivityIndicator} from 'antd-mobile'
import {Button, Icon} from 'antd'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import './index.css'
import AddAddress from "./addaddress"

class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            add: false
        }
    }

    changePage = (bool) => {
        this.setState({
            add: bool
        })
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
                                <div>
                                    {
                                        this.state.add?
                                            <AddAddress changePage={this.changePage}/>
                                            :
                                            <AddressRender data={data.userAddressbyprops} changePage={this.changePage}/>
                                    }
                                </div>
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
        let {data, changePage} = this.props
        return (
            <div>
                <div className='address-add' onClick={()=>{
                    changePage(true)
                }}>
                    <Icon type="plus" style={{fontSize: 22, fontWeight: 800}}/>&nbsp;
                    添加新地址
                </div>
                <div>
                    {data.map(address => {
                        return (
                            <div key={address.id} className='address-card'>
                                <div className='address-username'>
                                    <span className='address-card-title'>收件人：</span>{address.username}
                                </div>
                                <div className='address-telephone'>
                                    <span className='address-card-title'>联系电话：</span>{address.telephone}
                                </div>
                                <div className='address-address'>
                                    <span className='address-card-title'>联系地址：</span>{address.province + address.city + address.area + address.address}
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