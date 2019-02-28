import React, {Component} from 'react'
import {Row, Col, Icon} from 'antd'
import {Switch, Route, NavLink, withRouter} from 'react-router-dom'
import classnames from 'classnames'

import Home from './pages/home'
import Cart from './pages/cart'
import My from './pages/my'
import './app.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home',
            tabHidden: false
        }
    }

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
        // 如在 /home/detail 刷新
        let pathnameArray = location.pathname.split('/')
        let length = pathnameArray.length
        if (length > 2 && pathnameArray[length - 1] !== '') {
            this.setState({
                tabHidden: true
            })
        }
    }

    componentWillReceiveProps(next) {
        let {location} = next,
            pathname = location.pathname,
            state = location.state

        // 有 state 的话，就隐藏 tabbar, （进入子界面）
        // 无 state 的话，就显示 tabbar （返回到主界面）
        if (location && state) {
            this.setState({
                tabHidden: true
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
                                    购物篮
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
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/my" component={My}/>
                </Switch>
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