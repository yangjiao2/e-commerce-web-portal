import React, {Component} from 'react'
import {Row, Col, Icon} from 'antd'
import {Switch, Route, NavLink, withRouter} from 'react-router-dom'
import classnames from 'classnames'
import {request} from 'graphql-request'
import moment from 'moment'

import Home from './pages/home'
import Cart from './pages/cart'
import My from './pages/my'
import {graphqlFC} from "./configs/url"
import {getCookie, setCookie} from "./utils/cookie"
import {find_user_by_openid, create_user} from "./utils/gql"
import {idGen, getIsWechatBrowser} from "./utils/func"
import './app.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home',
            tabHidden: false
        }
    }

    // componentWillMount 适用于刷新的 tabbar 的展示
    componentWillMount() {
        let {location} = this.props,
            pathname = location.pathname

        // 根据首次的 pathname 显示 icon 选中
        // 如 /cart 刷新
        if (location && pathname) {
            this.setState({
                selectedTab: pathname.split('/')[1] === '' ? 'home' : pathname.split('/')[1]
            })
        }

        // 如果不是首页的初始界面，就隐藏 tabbar
        // 如在 /home/detail 或 /home/detail/ 刷新
        let pathnameArray = location.pathname.split('/')
        let length = pathnameArray.length
        if (length > 2 && pathnameArray[length - 1] !== '') {
            this.setState({
                tabHidden: true
            })
        }
    }

    // componentWillReceiveProps 适用于跳转的 tabbar 的展示
    componentWillReceiveProps(next) {
        let {location} = next,
            pathname = location.pathname,
            state = location.state

        // 有 state 的话，根据tabHidden显示或隐藏 tabbar, （进入子界面）
        // 无 state 的话，就显示 tabbar （返回到主界面）
        if (location && state) {
            let tabHidden = state.tabHidden !== undefined ? state.tabHidden : true
            this.setState({
                tabHidden
            })
        } else {
            this.setState({
                tabHidden: false
            })
        }

        // 根据非首次的 pathname 显示 icon 选中
        // 如 /home 跳转到 /home/kind, /cart 跳转到 /home 等
        if (location && pathname) {
            this.setState({
                selectedTab: pathname.split('/')[1] === '' ? 'home' : pathname.split('/')[1]
            })
        }
    }

    isActiveFunc = (navKind) => (match, location) => {
        if (navKind === 'home' && location.pathname.split('/')[1] === '') {
            return true
        } else {
            return navKind === location.pathname.split('/')[1]
        }
    }

    oauthLogin = () => {
        let isWechatLogin = getIsWechatBrowser()
        // console.log('isWechatLogin',isWechatLogin)
        if(isWechatLogin){
            // setCookie("openid","obR_j5GbxDfGlOolvSeTdZUwfpKA")
            let openid =  getCookie("openid")
            let user_id =  getCookie("user_id")
            console.log('oauthLogin openid',openid)

            if (!openid) {
                window.location.href = "/subscribe"
            }
            if(!user_id){
                request(graphqlFC, find_user_by_openid ,{openid})
                  .then(data => {
                      console.log('find user data',data)
                      if(data.userbyprops.length){
                          let id = data.userbyprops[0].id
                          setCookie('user_id',id)
                      }else {
                          let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
                          let id = idGen('user')
                          const userContent = {
                              email: "",
                              updatedAt: "",
                              password: "",
                              telephone: "",
                              username: "",
                              createdAt,
                              openid,
                              id,
                              userData_id: ""

                          }
                          request(graphqlFC, create_user ,userContent)
                            .then(data => {
                                console.log('create user data',data)
                                setCookie('user_id',id)
                            })
                            .catch(err => {
                                console.log(err, `graphql-request create user error`)
                            })
                      }
                  })
                  .catch(err => {
                      console.log(err, `graphql-request find user error`)
                  })
            }
        }else {
            setCookie("user_id","ioobot")
            setCookie("openid","ioobot")
        }
    }

    render() {
        let {selectedTab, tabHidden} = this.state
        return (
            <div style={{height: '100%'}}>
                <div className={classnames('tabbar', {'tabbar-hidden': tabHidden})}>
                    <Row>
                        <Col span={8} className='tabbar-content'>
                            <NavLink exact isActive={this.isActiveFunc('home')} activeClassName="active" to="/home">
                                {
                                    selectedTab === 'home' ?
                                        <HomeSelectedIcon/>
                                        :
                                        <HomeUnselectedIcon/>
                                }
                                <div className='tabbar-title'>
                                    主页
                                </div>
                            </NavLink>
                        </Col>
                        <Col span={8} className='tabbar-content'>
                            <NavLink isActive={this.isActiveFunc('cart')} activeClassName="active" to="/cart">
                                {
                                    selectedTab === 'cart' ?
                                        <CartSelectedIcon/>
                                        :
                                        <CartUnselectedIcon/>
                                }
                                <div className='tabbar-title'>
                                    购物袋
                                </div>
                            </NavLink>
                        </Col>
                        <Col span={8} className='tabbar-content'>
                            <NavLink isActive={this.isActiveFunc('my')} activeClassName="active" to="/my">
                                {
                                    selectedTab === 'my' ?
                                        <MySelectedIcon/>
                                        :
                                        <MyUnselectedIcon/>
                                }
                                <div className='tabbar-title'>
                                    我
                                </div>
                            </NavLink>
                        </Col>
                    </Row>
                </div>
                <div className='tabbar-route-content'>
                    <Switch>
                        <Route exact path="/" render={() => {
                            this.oauthLogin()
                            return <Home />
                        }}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/cart" component={Cart}/>
                        <Route path="/my" component={My}/>
                    </Switch>
                </div>
            </div>

        )
    }
}

export default withRouter(App)

const HomeUnselectedIcon = () => (
    <Icon type="home" style={{fontSize: 22}}/>
)

const HomeSelectedIcon = () => (
    <Icon type="home" theme="twoTone" style={{fontSize: 22}}/>
)

const CartUnselectedIcon = () => (
    <Icon type="shopping" style={{fontSize: 22}}/>
)

const CartSelectedIcon = () => (
    <Icon type="shopping" theme="twoTone" style={{fontSize: 22}}/>
)

const MyUnselectedIcon = () => (
    <Icon type="setting" style={{fontSize: 22}}/>
)

const MySelectedIcon = () => (
    <Icon type="setting" theme="twoTone" style={{fontSize: 22}}/>
)