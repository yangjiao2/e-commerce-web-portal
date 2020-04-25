import React, { Component } from 'react'
import './index.css'
import { NavBar, Icon, InputItem, List, Button, ActivityIndicator } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from "react-apollo"
import { update_user, USER_DETAIL_BY_ID_QUERY } from "../../../utils/gql"
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
        this.state = {
            name: '',
            email: '',
            passward: '',
        }
    }

    render() {
        let { email, password, name } = this.props.data;
        console.log(this.props.data)
        let user_id = getCookie('user_id')
        return (
            <div>

                <Mutation
                    mutation={gql(update_user)}
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
                                        this.setState({ password: e })
                                    }} value={password} placeholder="请输入密码">密码</InputItem>
                                </List>
                                <Button onClick={() => {
                                    update_user({ variables: { id: user_id, name } })
                                }}>确认修改</Button>
                            </div>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default withRouter(Profile)