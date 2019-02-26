import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'
import Message from './message'
import Address from './address'

class Tools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: ''
        }
    }

    renderPage = (id) => {
        switch (id) {
            case 'address':
                return <Address />
            case 'message':
                return <Message />
            default:
                return <div>此页面后不该出现</div>
        }
    }

    render() {
        let {changePageInMy, id} = this.props
        let navTitle = ''
        switch (id) {
            case 'address':
                navTitle = '地址管理'
                break
            case 'message':
                navTitle = '系统通知'
                break
            default:
                navTitle = '无效页面'
                break
        }

        return (
            <div className='tools-wrap'>
                <div className='tools-navbar-wrap'>
                    <NavBar
                        className='tools-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => changePageInMy('all', {}, false)}
                        rightContent={[
                            <Icon key="1" type="ellipsis"/>,
                        ]}
                    >{navTitle}</NavBar>
                </div>
                {
                    this.renderPage(id)
                }
            </div>
        )
    }
}

export default Tools