import React, {Component} from 'react'
import {Row, Col, Icon} from 'antd'
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'
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

    changeTabBar = (tab, hidden) => {
        this.setState({
            selectedTab: tab,
            tabHidden: hidden !== undefined ? hidden : false
        })
    }

    chooseClassNames = (tabbar) => (
        classnames(
            {'tabbar-content': true},
            {'tabbar-inactive': this.state.selectedTab !== tabbar},
            {'tabbar-active': this.state.selectedTab === tabbar}
        )
    )

    render() {
        let {selectedTab, tabHidden} = this.state
        return (
            <Router>
                <div>
                    <div className={classnames('tabbar', {'tarbar-hidden': tabHidden})}>
                        <Row>
                            {/*navlink 的 activeClass 有点问题*/}
                            <NavLink exact to="/">
                                <Col className={this.chooseClassNames('home')} span={8} onClick={() => {
                                    this.changeTabBar('home')
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
                                    this.changeTabBar('cart')
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
                                    this.changeTabBar('my')
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
            </Router>
        )
    }
}

export default App

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