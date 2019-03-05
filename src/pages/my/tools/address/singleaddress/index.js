import {Component} from "react"
import React from "react"
import {NavBar, Icon, InputItem, PickerView, TextareaItem} from 'antd-mobile'
import {Button} from 'antd'
import './index.css'

const provinceAll = [
    {
        label: '江苏省',
        value: '江苏省',
    },
    {
        label: '河南省',
        value: '河南省',
    },
    {
        label: '安徽省',
        value: '安徽省',
        children: [
            {
                label: '合肥市',
                value: '合肥市',
                children: [
                    {
                        label: '蜀山区',
                        value: '蜀山区',
                    },
                    {
                        label: '瑶海区',
                        value: '瑶海区',
                    },
                    {
                        label: '包河区',
                        value: '包河区',
                    },
                    {
                        label: '庐阳区',
                        value: '庐阳区',
                    }
                ],
            },
            {
                label: '芜湖市',
                value: '芜湖市',
                children: [
                    {
                        label: '镜湖区',
                        value: '镜湖区',
                    },
                    {
                        label: '弋江区',
                        value: '弋江区',
                    },
                ],
            },
            {
                label: '六安市',
                value: '六安市',
            },
            {
                label: '淮南市',
                value: '淮南市',
            },
            {
                label: '马鞍山市',
                value: '马鞍山市',
            },
            {
                label: '黄山市',
                value: '黄山市',
            }
        ]
    },
    {
        label: '湖北省',
        value: '湖北省',
    },
    {
        label: '江西省',
        value: '江西省',
    },
]

class SingleAddress extends Component {
    constructor(props) {
        super(props)
        let state = {
            username: '',
            telephone: '',
            province: '安徽省',
            city: '合肥市',
            area: '蜀山区',
            address: '',
            id: ''
        }
        if (props.addressID === 'add') {
            this.state = {...state}
        } else {
            let {province, city, area, address, telephone, username, id} = props.addressChoosed
            this.state = {...state, province, city, area, address, telephone, username, id}
        }
    }

    render() {
        let {changePage} = this.props
        let {username, telephone, province, city, area, address, id} = this.state
        return (
            <div>
                <div className='tools-addressadd-navbar-wrap'>
                    <NavBar
                        className='tools-addressadd-navbar'
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            changePage(false)
                        }}
                    >添加新地址</NavBar>
                </div>

                <div>
                    <InputItem placeholder="输入姓名" value={username} labelNumber={5} onChange={(username) => {
                        this.setState({username})
                    }}>
                        <div>联系人姓名</div>
                    </InputItem>
                    <InputItem placeholder="输入号码" value={telephone} onChange={(telephone) => {
                        this.setState({telephone})
                    }}>
                        <div>手机号码</div>
                    </InputItem>
                    <TextareaItem
                        title="选择地区"
                        editable={false}
                    />
                    <PickerView
                        data={provinceAll}
                        value={[province, city ? city : '', area ? area : '']}
                        onChange={(address) => {
                            this.setState({province: address[0], city: address[1], area: address[2]})
                        }}
                    />
                    <TextareaItem
                        title="详细地址"
                        autoHeight
                        labelNumber={4}
                        value={address}
                        onChange={(address) => {
                            this.setState({address})
                        }}
                    />
                </div>

                <div className='address-button-group'>
                    <DefaultAndSaveButton
                        data={{
                            username,
                            telephone,
                            province,
                            city,
                            area,
                            address,
                            id
                        }}
                    />

                    <SaveAddressButton
                        data={{
                            username,
                            telephone,
                            province,
                            city,
                            area,
                            address,
                            id
                        }}
                    />
                </div>

            </div>
        )
    }
}

export default SingleAddress

class DefaultAndSaveButton extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        // let {data} = this.props
        return (
            <div className='address-button'>
                <Button block size='large'>设为默认并保存</Button>
            </div>
        )
    }
}


class SaveAddressButton extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        // let {data} = this.props
        return (
            <div className='address-button'>
                <Button type='primary' block size='large'>保存并使用</Button>
            </div>
        )
    }
}