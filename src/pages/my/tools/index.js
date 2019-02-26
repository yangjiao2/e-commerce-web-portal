import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon} from 'antd-mobile'

class Tools extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {changePageInMy} = this.props
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
                    >工具详情</NavBar>
                </div>
            </div>
        )
    }
}

export default Tools