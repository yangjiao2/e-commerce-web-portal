import React, {Component} from 'react'
import {NavBar, Icon} from 'antd-mobile'

class Kind extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {id, changePageInHome} = this.props
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => changePageInHome('all', {}, false)}
                    rightContent={[
                        <Icon key="1" type="ellipsis"/>,
                    ]}
                >商品分类</NavBar>
            </div>
        )
    }
}

export default Kind