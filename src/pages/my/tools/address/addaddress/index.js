import {Component} from "react"
import React from "react"
import {NavBar, Icon, InputItem, PickerView, TextareaItem} from 'antd-mobile'
import { Button } from 'antd';
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
                label: '合肥',
                value: '合肥',
                children: [
                    {
                        label: '包河区',
                        value: '包河区',
                    },
                    {
                        label: '庐阳区',
                        value: '庐阳区',
                    },
                    {
                        label: '蜀山区',
                        value: '蜀山区',
                    },
                    {
                        label: '瑶海区',
                        value: '瑶海区',
                    },
                ],
            },
            {
                label: '芜湖',
                value: '芜湖',
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
                label: '六安',
                value: '六安',
            },
            {
                label: '淮南',
                value: '淮南',
            },
            {
                label: '马鞍山',
                value: '马鞍山',
            },
            {
                label: '黄山',
                value: '黄山',
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

class AddAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            telephone: '',
            province: '安徽省',
            city: '合肥市',
            area: '包河区',
            address: ''
        }
    }

    render() {
        let {changePage} = this.props
        let {username, telephone, province, city, area, address} = this.state
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
                    <InputItem placeholder="输入姓名" labelNumber={5} onChange={(username) => {
                        this.setState({username})
                    }}>
                        <div>联系人姓名</div>
                    </InputItem>
                    <InputItem placeholder="输入号码" onChange={(telephone) => {
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
                        value={[province, city, area ? area : '']}
                        onChange={(area) => {
                            this.setState({province: area[0], city: area[1], area: area[2]})
                        }}
                    />
                    <TextareaItem
                        title="详细地址"
                        autoHeight
                        labelNumber={4}
                        onChange={(address) => {
                            this.setState({address})
                        }}
                    />
                </div>

                <AddAddressButton
                    data = {{
                        username,
                        telephone,
                        province,
                        city,
                        area,
                        address
                    }}
                />
            </div>
        )
    }
}

export default AddAddress

class AddAddressButton extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        // let {data} = this.props
        return (
            <div className='add-address-button'>
                <Button type='primary' block size='large'>保存并使用</Button>
            </div>
        )
    }
}