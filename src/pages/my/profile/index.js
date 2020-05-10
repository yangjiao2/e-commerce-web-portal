import React, { Component } from 'react'
import './index.css'
import { NavBar, Icon, InputItem, List, Button, ActivityIndicator, Toast } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from "react-apollo"
import { UPDATE_USER_MUTATION, USER_DETAIL_BY_ID_QUERY, USER_QUERY, INSERT_USER_MUTATION } from "../../../utils/gql"
import gql from "graphql-tag"
import { getCookie, setCookie, removeCookie } from "../../../utils/cookie"
import { graphqlFC } from "../../../configs/url"
import { request } from 'graphql-request'

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
        // removeCookie('user_id')
        if (user_id === '') {
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
                        <div>
                            <ProfileRender data={{ id: '' }}
                                setName={(name) => { this.setState({ 'username': name }) }}></ProfileRender>
                        </div>
                    </div>
                </div>
            )
        }
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
                                        <ProfileRender data={data.user}
                                            setName={(name) => { this.setState({ 'username': name }) }}></ProfileRender>
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
        let { id, email, password, name } = props.data;
        let user_id = getCookie('user_id')
        this.state = {
            name: name || '',
            email: email || '',
            password: password || '',
            onRegister: null,
            onLogin: user_id === '',
        }
    }

    render() {
        let { onRegister, onLogin, email, password, name } = this.state;
        let data = this.props.data;
        let user_id = getCookie('user_id')
        let onUpdate = data.email !== email || data.password !== password || data.name !== name;
        console.log(this.state)
        return (
            <div>

                {onLogin || onRegister && <List className="my-list">
                    <InputItem onChange={(e) => {
                        this.setState({ name: e })
                    }} value={name} placeholder="请输入昵称">用户名</InputItem>
                </List>}
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
                {onLogin &&
                    (<div className='profile-login' onClick={() => {
                        request(graphqlFC, USER_QUERY, { email: this.state.email, password: this.state.password })
                            .then(data => {
                                console.log('find user data', data)
                                if (data.user.length) {
                                    let id = data.user[0].id
                                    setCookie('user_id', id)
                                    Toast.success('登陆成功');
                                    this.props.setName(data.user.name)
                                    this.setState({
                                        'onLogin': false,
                                        'name': data.user.name || '',
                                        'email': data.user.email || '',
                                        'password': data.user.password || '',
                                    })
                                } else {
                                    Toast.fail('登陆信息错误')
                                }
                            })
                            .catch(err => {
                                console.log(err, `graphql-request find user error`)
                            })
                    }}>
                        登陆
                    </div>)
                }
                {
                    <Mutation
                        mutation={gql(onRegister ? INSERT_USER_MUTATION : UPDATE_USER_MUTATION)}
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
                                    <div className='profile-change' onClick={() => {
                                        if (!onRegister && onLogin) {
                                            this.setState({ 'onRegister': true, 'onLogin': false })
                                        } else if (!onLogin) {
                                            update_user({ variables: { name, email, password } })
                                            Toast.success('修改成功')
                                            this.setState({ 'onRegister': false, 'onLogin': false })
                                        }
                                    }}>
                                        {onLogin || onRegister ? '注册' : '确认修改'}
                                    </div>
                                </div>
                            )
                        }}
                    </Mutation>
                }
                {
                    !onLogin && !onUpdate && !onRegister && (
                        <div>
                            <div className='profile-login' onClick={() => {
                                removeCookie('user_id')
                                this.props.setName('')
                                this.setState({ "email": '', "password": '' })
                            }}>
                                退出登陆
                                    </div>
                        </div>
                    )
                }
            </div >
        )
    }
}

export default withRouter(Profile)