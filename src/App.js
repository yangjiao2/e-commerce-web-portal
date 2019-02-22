import React, {Component} from 'react'
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
                            this.setState({
                                selectedTab: 'home',
                            })
                        }}
                    >
                        <Home/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<CartUnselectedIcon/>}
                        selectedIcon={<CartSelectedIcon/>}
                        title="购物车"
                        key="cart"
                        selected={selectedTab === 'cart'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'cart',
                            })
                        }}
                    >
                        <Cart/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<MyUnselectedIcon/>}
                        selectedIcon={<MySelectedIcon/>}
                        title="我的"
                        key="my"
                        selected={selectedTab === 'my'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'my',
                            })
                        }}
                    >
                        <My/>
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
    <div style={{
        width: '22px',
        height: '22px',
        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
    }}/>
)

const CartSelectedIcon = () => (
    <div style={{
        width: '22px',
        height: '22px',
        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
    }}/>
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