import React, {Component} from 'react'
import {Icon} from 'antd'
import {TabBar} from 'antd-mobile'
import Home from './pages/home'
import Cart from './pages/cart'
import My from './pages/my'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home'
        }
    }

    changeTabBar = (tab) => {
        this.setState({
            selectedTab: tab
        })
    }

    render() {
        let {selectedTab} = this.state;
        return (
            <div style={{
                position: 'fixed',
                height: '100%',
                width: '100%',
                top: 0
            }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title="首页"
                        key="home"
                        icon={<HomeUnselectedIcon/>}
                        selectedIcon={<HomeSelectedIcon/>}
                        selected={selectedTab === 'home'}
                        onPress={() => {
                            this.changeTabBar('home')
                        }}
                    >
                        <Home changeTabBar={this.changeTabBar}/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<CartUnselectedIcon/>}
                        selectedIcon={<CartSelectedIcon/>}
                        title="购物袋"
                        key="cart"
                        selected={selectedTab === 'cart'}
                        onPress={() => {
                            this.changeTabBar('cart')
                        }}
                    >
                        <Cart changeTabBar={this.changeTabBar}/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<MyUnselectedIcon/>}
                        selectedIcon={<MySelectedIcon/>}
                        title="我的"
                        key="my"
                        selected={selectedTab === 'my'}
                        onPress={() => {
                            this.changeTabBar('my')
                        }}
                    >
                        <My changeTabBar={this.changeTabBar}/>
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}

export default App

const HomeUnselectedIcon = () => (
    <div style={{
        width: '22px',
        height: '22px',
        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
    }}/>
)

const HomeSelectedIcon = () => (
    <div style={{
        width: '22px',
        height: '22px',
        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
    }}/>
)

const CartUnselectedIcon = () => (
    <Icon type="shopping" style={{fontSize:22}}/>
)

const CartSelectedIcon = () => (
    <Icon type="shopping" theme="twoTone" style={{fontSize:22}}/>
)

const MyUnselectedIcon = () => (
    <div style={{
        width: '22px',
        height: '22px',
        background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
    }}/>
)

const MySelectedIcon = () => (
    <div style={{
        width: '22px',
        height: '22px',
        background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
    }}/>
)