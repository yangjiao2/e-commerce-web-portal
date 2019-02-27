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
            tabHidden: false,
            page: 'detail'
        }
    }

    componentWillMount() {
        console.log('this.props',this.props)
        let {location} = this.props,
            pathname = location.pathname

        // 根据首次的 pathname 显示 icon 选中
        console.log(pathname)
        if (location && pathname) {
            this.setState({
                selectedTab: pathname.substr(1) === '' ? 'home' : pathname.substr(1)
            })
        }
    }

    componentWillReceiveProps(next) {
        let {location} = next,
            pathname = location.pathname,
            state = location.state

        // 有 state 的话，就隐藏 tabbar
        if (location && state) {
            this.setState({
                tabHidden: true
            })
        }

        // 根据非首次的 pathname 显示 icon 选中
        if (location && pathname) {
            this.setState({
                selectedTab: pathname.substr(1) === '' ? 'home' : pathname.substr(1)
            })
        }
    }

    chooseClassNames = (tabbar) => (
        classnames(
            {'tabbar-content': true},
            {'tabbar-inactive': this.state.selectedTab !== tabbar},
            {'tabbar-active': this.state.selectedTab === tabbar}
        )
    )

     isActiveFunc = (match, location) => {
        console.log(match,'contact')
        return match
    }

    render() {
        let {selectedTab, tabHidden} = this.state
        return (
            <div>
                <div className="tabbar1">
                    <Row>
                        <Col span={8}>
                            <NavLink exact activeClassName="active" to="/">
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
                        <Col span={8}>
                            <NavLink activeClassName="active" to={{pathname: '/cart'}}>
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
                        <Col span={8}>
                            <NavLink isActive={this.isActiveFunc} activeClassName="active" to="/my">
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
                <div className={classnames('tabbar', {'tarbar-hidden': tabHidden})}>
                    <Row>
                        <NavLink exact to="/">
                            <Col className={this.chooseClassNames('home')} span={8} onClick={() => {
                                this.props.history.push({
                                    pathname: '/home'
                                })
                                this.setState({
                                    selectedTab: 'home'
                                })
                            }}>
                                {
                                    selectedTab === 'home' ?
                                        <HomeSelectedIcon/>
                                        :
                                        <HomeUnselectedIcon/>
                                }
                                <div className='tabbar-title'>
                                    主页
                                </div>
                            </Col>
                        </NavLink>
                        <NavLink to="/cart">
                            <Col className={this.chooseClassNames('cart')} span={8} onClick={() => {
                                this.props.history.push({
                                    pathname: '/cart'
                                })
                                this.setState({
                                    selectedTab: 'cart'
                                })
                            }}>
                                {
                                    selectedTab === 'cart' ?
                                        <CartSelectedIcon/>
                                        :
                                        <CartUnselectedIcon/>
                                }
                                <div className='tabbar-title'>
                                    购物篮
                                </div>
                            </Col>
                        </NavLink>
                        <NavLink to="/my">
                            <Col className={this.chooseClassNames('my')} span={8} onClick={() => {
                                this.props.history.push({
                                    pathname: '/my'
                                })
                                this.setState({
                                    selectedTab: 'my'
                                })
                            }}>
                                {
                                    selectedTab === 'my' ?
                                        <MySelectedIcon/>
                                        :
                                        <MyUnselectedIcon/>
                                }
                                <div className='tabbar-title'>
                                    我
                                </div>
                            </Col>
                        </NavLink>
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