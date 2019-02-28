import {Component} from "react"
import React from "react"
import {NavBar, Icon, InputItem, PickerView, TextareaItem} from 'antd-mobile'
const province = [
    {
        label: '北京',
        value: '01',
        children: [
            {
                label: '东城区',
                value: '01-1',
            },
            {
                label: '西城区',
                value: '01-2',
            },
            {
                label: '崇文区',
                value: '01-3',
            },
            {
                label: '宣武区',
                value: '01-4',
            },
        ],
    },
    {
        label: '浙江',
        value: '02',
        children: [
            {
                label: '杭州',
                value: '02-1',
                children: [
                    {
                        label: '西湖区',
                        value: '02-1-1',
                    },
                    {
                        label: '上城区',
                        value: '02-1-2',
                    },
                    {
                        label: '江干区',
                        value: '02-1-3',
                    },
                    {
                        label: '下城区',
                        value: '02-1-4',
                    },
                ],
            },
            {
                label: '宁波',
                value: '02-2',
                children: [
                    {
                        label: 'xx区',
                        value: '02-2-1',
                    },
                    {
                        label: 'yy区',
                        value: '02-2-2',
                    },
                ],
            },
            {
                label: '温州',
                value: '02-3',
            },
            {
                label: '嘉兴',
                value: '02-4',
            },
            {
                label: '湖州',
                value: '02-5',
            },
            {
                label: '绍兴',
                value: '02-6',
            },
        ],
    },
];

class AddAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let {changePage} = this.props
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
                        rightContent={[
                            <div>保存</div>,
                        ]}
                    >添加新地址</NavBar>
                </div>

                <div>
                    <InputItem placeholder="输入姓名"><div>联系人姓名</div></InputItem>
                    <InputItem placeholder="输入号码"><div>手机号码</div></InputItem>
                    <TextareaItem
                        title="选择地区"
                        editable={false}
                    />
                    <PickerView
                        data={province}
                        value={['02', '02-1', '02-1-1']}
                    />
                    <TextareaItem
                        title="详细地址"
                        autoHeight
                        labelNumber={5}
                    />
                </div>
            </div>
        )
    }
}

export default AddAddress