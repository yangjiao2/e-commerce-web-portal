import React, {Component} from 'react'
import {Icon} from 'antd'
import {Row, Col} from 'antd'
import Home from './pages/home'
import Cart from './pages/cart'
import My from './pages/my'
import './app.css'
import {Switch, Route, NavLink, withRouter} from 'react-router-dom'
import classnames from 'classnames'

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
            {'tabbar-inactive': this.state.selectedTab !== tabbar},
            {'tabbar-active': this.state.selectedTab === tabbar}
        )
    )

    render() {
        let {selectedTab, tabHidden, page} = this.state
        return (

                <div>
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
                                    <div>
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
                                    <div>
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
                                    <div>
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