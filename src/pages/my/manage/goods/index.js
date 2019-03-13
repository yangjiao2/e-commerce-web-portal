import React, {Component} from 'react'
import './index.css'
import {NavBar, Icon, Accordion, List, InputItem, ImagePicker, Button, ActivityIndicator} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {create_shop, shop_by_props} from "../../../../utils/gql"
import {Query, Mutation} from "react-apollo"
import gql from "graphql-tag"
import axios from 'axios'
import {idGen} from "../../../../utils/func"

class Goods extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            imgDatas: [],
            name: '',
            price: 0,
            intro: '',
            stock: 0
        }
    }

    onAccordionChange = (key) => {
        console.log(key)
    }

    onChange = (id) => (files, operationType) => {
        let imgDatas = []

        files.forEach((file, index) => {
            let base64Cont = files[index].url.split(',')[1]
            let imgType = files[index].file.type.split('/')[1]
            let imgNewName = `good_id_${id}.${imgType}`

            const imgData = {
                'file-name': `e-commerce/images/${imgNewName}`,
                'bucket': 'case',
                'cont': base64Cont,
                'public': true,
                'format': 'base64'
            }
            imgDatas.push(imgData)
        })

        this.setState({
            imgDatas,
            files
        })
    }

    render() {
        let {files, imgDatas, name, intro, stock, price} = this.state
        let id = idGen('goods')
        return (
            <div className='goods-wrap'>
                <NavBar
                    className='navbar'
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.go(-2)
                    }}
                >商品管理</NavBar>
                <div className='content-wrap'>
                    <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onAccordionChange}>
                        <Accordion.Panel header="添加商品">
                            <List renderHeader={() => '店铺个性化管理'} className="my-list">
                                <InputItem onChange={(e) => {
                                    this.setState({name: e})
                                }} placeholder="请输入名称">名称</InputItem>
                                <InputItem onChange={(e) => {
                                    this.setState({intro: e})
                                }} placeholder="请输入简介">简介</InputItem>
                                <InputItem onChange={(e) => {
                                    this.setState({price: e})
                                }} placeholder="请输入价格">价格</InputItem>
                                <InputItem onChange={(e) => {
                                    this.setState({stock: e})
                                }} placeholder="请输入库存">库存</InputItem>
                                <div className='my-list-subtitle'>商品图片</div>
                                <ImagePicker
                                    files={files}
                                    onChange={this.onChange(id)}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={true}
                                    multiple={false}
                                />
                                <Mutation mutation={gql(create_shop)}>
                                    {(createstore, {loading, error}) => {
                                        if (loading)
                                            return (
                                                <div className="loading">
                                                    <div className="align">
                                                        <ActivityIndicator text="Loading..." size="large"/>
                                                    </div>
                                                </div>
                                            )
                                        if (error)
                                            return 'error'
                                        let varObj = {
                                            id,
                                            name,
                                            stock,
                                            intro,
                                            price,
                                            createdAt: new Date().getTime(),
                                            updatedAt: ''
                                        }
                                        return (
                                            <Button type="primary" size="small" inline onClick={() => {
                                                Promise.all(this.uploadImg()).then(res => {
                                                    let prefix = 'https://case-1254337200.cos.ap-beijing.myqcloud.com/'
                                                    let slideshow = imgDatas.length === 1 ? prefix + imgDatas[0]['file-name'] : imgDatas.map((imgData, index) => (
                                                        prefix + imgDatas[index]['file-name']
                                                    ))
                                                    createstore({variables: {...varObj, slideshow}})
                                                })
                                            }}>创建</Button>
                                        )
                                    }}
                                </Mutation>
                            </List>
                        </Accordion.Panel>
                        <Accordion.Panel header="全部商品" className="pad">

                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>

        )
    }
}

export default withRouter(Goods)