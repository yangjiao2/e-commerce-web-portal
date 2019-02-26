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
            selectedTab: 'home',
            tabHidden: false,
            page:'detail'
        }
    }

    componentWillMount(){
        this.getHash();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getHash();
    }

    getHash = () => {
        let hash = window.location.hash || '#tab=home';
        let tab = 'home',page = 'detail';
        if(hash && hash.indexOf("&")>0){
            let tabHash = hash.split("&")[0], pageHash = hash.split("&")[1];
            tab = tabHash.substr(tabHash.indexOf("=")+1);
            page = pageHash.substr(pageHash.indexOf("=")+1);
        }
        // console.log('tab',tab);
        // console.log('page',page);

        this.setState({
            selectedTab: tab,
            page
        });
    };

    changeTabBar = (tab, hidden) => {
        this.setState({
            selectedTab: tab,
            tabHidden: hidden !== undefined ? hidden : false
        })
    }

    render() {
        let {selectedTab, tabHidden, page} = this.state;
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
                    hidden={tabHidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="home"
                        icon={<HomeUnselectedIcon/>}
                        selectedIcon={<HomeSelectedIcon/>}
                        selected={selectedTab === 'home'}
                        onPress={() => {
                            window.location.hash = 'tab=home';
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
                            window.location.hash = `tab=cart&page=${page}`;
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
                            window.location.hash = 'tab=my';
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