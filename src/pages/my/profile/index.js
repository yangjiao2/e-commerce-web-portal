import React, { Component } from 'react'
import './index.css'
import { NavBar, Icon, InputItem, List, Button, ActivityIndicator } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from "react-apollo"
import { UPDATE_USER_MUTATION, USER_DETAIL_BY_ID_QUERY } from "../../../utils/gql"
import gql from "graphql-tag"
import { getCookie } from "../../../utils/cookie"

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }

    render() {
        let { username } = this.state
        let user_id = getCookie('user_id')
        return (
            <div>
                <div className='profile-navbar-wrap'>
                    <NavBar
                        className='profile-navbar'
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => {
                            this.props.history.push({
                                pathname: '/my'
                            })
                        }}
                    >我的信息</NavBar>
                </div>

                <div>
                    <Query query={gql(USER_DETAIL_BY_ID_QUERY)} variables={{ 'id': user_id }}>
                        {
                            ({ loading, error, data, refetch }) => {
                                if (loading) {
                                    return (
                                        <div className="loading-center">
                                            <ActivityIndicator text="加载中..." size="large" />
                                        </div>
                                    )
                                }
                                if (error) {
                                    return '个人信息: 页面出问题...'
                                }

                                console.log(data);
                                return (
                                    <div>
                                        <ProfileRender data={data.user}></ProfileRender>
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


class ProfileRender extends Component {
    constructor(props) {
        super(props)
        let { email, password, name } = props.data;
        this.state = {
            name: name || '',
            email: email || '',
            password: password || '',
        }
    }

    render() {
        let { email, password, name } = this.state;
        let data = this.props.data;
        let onUpdate = data.email !== email || data.password !== password || data.name !== name;
        let user_id = getCookie('user_id')
        return (
            <div>
                <Mutation
                    mutation={gql(UPDATE_USER_MUTATION)}
                    refetchQueries={[{ query: gql(USER_DETAIL_BY_ID_QUERY), variables: { id: user_id } }]}
                >
                    {(update_user, { loading, error }) => {
                        if (loading) {
                            return (
                                <div className="loading-center">
                                    <ActivityIndicator text="加载中..." size="large" />
                                </div>
                            )
                        }
                        if (error) {
                            return 'error!'
                        }
                        return (
                            <div>
                                <List className="my-list">
                                    <InputItem onChange={(e) => {
                                        this.setState({ name: e })
                                    }} value={name} placeholder="请输入昵称">用户名</InputItem>
                                </List>
                                <List className="my-list">
                                    <InputItem onChange={(e) => {
                                        this.setState({ email: e })
                                    }} value={email} placeholder="请输入邮箱">邮箱</InputItem>
                                </List>
                                <List className="my-list">
                                    <InputItem onChange={(e) => {
                                        console.log(e);
                                        this.setState({ password: e })
                                    }} value={password} placeholder="请输入密码">密码</InputItem>
                                </List>
                                {onUpdate &&
                                    (<div className='profile-change' onClick={() => {
                                        update_user({ variables: { name, email, password } })
                                    }}>
                                        确认修改
                                    </div>)}
                            </div>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default withRouter(Profile)