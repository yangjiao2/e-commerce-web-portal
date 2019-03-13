import React, {Component} from 'react'
import './index.css'
import {
    Picker,
    NavBar,
    Accordion,
    List,
    InputItem,
    ImagePicker,
    Button,
    ActivityIndicator,
    Stepper,
    Modal
} from 'antd-mobile'
import {Switch, Row, Col, Icon} from 'antd'
import {withRouter} from 'react-router-dom'
import {create_product, update_product, category_by_props, productbyprops} from "../../../../utils/gql"
import {Query, Mutation} from "react-apollo"
import gql from "graphql-tag"
import {idGen} from "../../../../utils/func"
import moment from 'moment'
import {storeFile} from "../../../../configs/url"
import axios from 'axios'
import classNames from 'classnames'

const Item = List.Item

class Goods extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accordionKey: ''
        }
    }

    render() {
        let {accordionKey} = this.state

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
                    <Accordion className="my-accordion" onChange={(key) => {
                        this.setState({
                            accordionKey: key[0]
                        })
                    }}>
                        <Accordion.Panel header="全部分类"
                                         className={classNames({'hidden': accordionKey === '1' || accordionKey === '2'})}>
                            <AllCategory/>
                        </Accordion.Panel>
                        <Accordion.Panel header="全部商品"
                                         className={classNames({'hidden': accordionKey === '0' || accordionKey === '2'})}>
                            <AllGoods/>
                        </Accordion.Panel>
                        <Accordion.Panel header="添加商品"
                                         className={classNames({'hidden': accordionKey === '0' || accordionKey === '1'})}>
                            <AddGoods/>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>

        )
    }
}

export default withRouter(Goods)

class AddGoods extends Component {
    constructor(props) {
        super(props)
        let state = {
            files: [],
            imgDatas: [],
        }
        if(props.good === undefined) {
            this.state = {
                ...state,
                name: '',
                price: 0,
                intro: '',
                stock: 20,
                category: '',
                category_id: '',
                newGood: true
            }
        } else {
            console.log(props.good)
            let {name, price, intro, stock, id} = props.good
            this.state = {
                ...state,
                id,
                name,
                price,
                intro,
                stock,
                category: props.good.category_id.name,
                category_id: [props.good.category_id.id],
                newGood: false
            }
        }
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

    uploadImg = () => {
        let {imgDatas} = this.state

        return imgDatas.map((imgData) => (
            axios({
                url: storeFile,
                method: 'post',
                data: imgData
            })
        ))
    }

    render() {
        let {files, imgDatas, name, intro, stock, price, category_id, newGood} = this.state
        let id = newGood? idGen('goods'): this.state.id
        const categoryFilter = {
            "status": "1",
            "sort_by": {"order": "asc"}
        }
        return (
            <List className="my-add-goods-list">
                <InputItem onChange={(e) => {
                    this.setState({name: e})
                }} value={name} placeholder="请输入名称">名称</InputItem>
                <Query query={gql(category_by_props)} variables={categoryFilter}>
                    {
                        ({loading, error, data}) => {
                            if (loading) {
                                return (
                                    <div className="loading-center">
                                        <ActivityIndicator text="Loading..." size="large"/>
                                    </div>
                                )
                            }
                            if (error) {
                                return 'error!'
                            }

                            let categoryList = data.categorybyprops.map(category => {
                                category.value = category.id
                                category.label = category.text
                                return category
                            })

                            return (
                                <Picker data={categoryList}
                                        cols={1}
                                        value={this.state.category_id}
                                        onChange={v => {
                                            this.setState({category_id: v});
                                        }}
                                >
                                    <List.Item arrow="horizontal">选择种类</List.Item>
                                </Picker>
                            )
                        }
                    }
                </Query>
                <InputItem onChange={(e) => {
                    this.setState({intro: e})
                }} value={intro} placeholder="请输入简介">简介</InputItem>
                <InputItem onChange={(e) => {
                    this.setState({price: e})
                }} value={price} placeholder="请输入价格">价格</InputItem>
                <Item extra={<Stepper onChange={(e) => {
                    this.setState({stock: e})
                }} value={stock} style={{width: '100%', minWidth: '100px'}} showNumber size="small"/>}>库存</Item>
                <div className='list-others'>
                    <div className='list-others-subtitle'>商品图片</div>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange(id)}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={true}
                        multiple={false}
                    />
                    {
                        newGood?
                            <Mutation mutation={gql(create_product)}>
                                {(createproduct, {loading, error}) => {
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
                                        unit: '1件',
                                        status: '',
                                        recommend: 0,
                                        category_id: category_id[0],
                                        name,
                                        stock,
                                        intro,
                                        price,
                                        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                                        updatedAt: ''
                                    }
                                    return (
                                        <Button type="primary" size="small" inline onClick={() => {
                                            Promise.all(this.uploadImg()).then(res => {
                                                let prefix = 'https://case-1254337200.cos.ap-beijing.myqcloud.com/'
                                                let img = imgDatas.length === 1 ? prefix + imgDatas[0]['file-name'] : imgDatas.map((imgData, index) => (
                                                    prefix + imgDatas[index]['file-name']
                                                ))
                                                createproduct({variables: {...varObj, img}})
                                            })
                                        }}>创建</Button>
                                    )
                                }}
                            </Mutation>
                            :
                            <Mutation mutation={gql(update_product)}>
                                {(updateproduct, {loading, error}) => {
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
                                        unit: '1件',
                                        status: '',
                                        recommend: 0,
                                        category_id: category_id[0],
                                        name,
                                        stock,
                                        intro,
                                        price,
                                        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
                                    }
                                    return (
                                        <Button type="primary" size="small" inline onClick={() => {
                                            Promise.all(this.uploadImg()).then(res => {
                                                let prefix = 'https://case-1254337200.cos.ap-beijing.myqcloud.com/'
                                                let img = imgDatas.length === 1 ? prefix + imgDatas[0]['file-name'] : imgDatas.map((imgData, index) => (
                                                    prefix + imgDatas[index]['file-name']
                                                ))
                                                updateproduct({variables: {...varObj, img}})
                                            })
                                        }}>更新</Button>
                                    )
                                }}
                            </Mutation>
                    }
                </div>
            </List>
        )
    }
}

class AllCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newCategory: ''
        }
    }

    render() {
        let {newCategory} = this.state
        const categoryFilter = {
            "status": "1",
            "sort_by": {"order": "asc"}
        }
        return (
            <div>
                <Query query={gql(category_by_props)} variables={categoryFilter}>
                    {
                        ({loading, error, data}) => {
                            if (loading) {
                                return (
                                    <div className="loading-center">
                                        <ActivityIndicator text="Loading..." size="large"/>
                                    </div>
                                )
                            }
                            if (error) {
                                return 'error!'
                            }

                            let categoryList = data.categorybyprops
                            // id: "coat", text: "外套", icon: "https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/coat.png"
                            return (
                                <List>
                                    {
                                        categoryList.map(category => {
                                            console.log(category.status)
                                            return (
                                                <Item key={category.id} extra={<div className='list-extra'><Switch
                                                    checked={category.status === '1'}/><Button type='warning' inline
                                                                                               size="small">删除</Button>
                                                </div>}>{category.text}</Item>
                                            )
                                        })
                                    }
                                </List>
                            )
                        }
                    }
                </Query>
                <InputItem onChange={(e) => {
                    this.setState({newCategory: e})
                }} value={newCategory} placeholder="请输入分类名称"
                           extra={<Button type='primary' inline size="small">添加</Button>}>新的分类</InputItem>
            </div>
        )
    }
}

class AllGoods extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            product: {}
        }
    }

    controlModal = (bool) => () => {
        this.setState({
            modal: bool
        })
        if(!bool) {
            this.setState({
                product: {}
            })
        }
    }

    render() {
        let {modal,product} = this.state
        return (
            <Query query={gql(productbyprops)} variables={{}}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (
                                <div className="loading-center">
                                    <ActivityIndicator text="Loading..." size="large"/>
                                </div>
                            )
                        }
                        if (error) {
                            return 'error!'
                        }
                        let products = data.productbyprops
                        return (
                            <div>
                                <div className='all-goods'>
                                    {
                                        products.map(product => {
                                            return (
                                                <Row className='good-block' key={product.id}>
                                                    <Col span={6}>
                                                        <div className='good-image' style={{backgroundImage: `url(${product.img})`}}/>
                                                    </Col>
                                                    <Col span={11} offset={2}>{product.name}</Col>
                                                    <Col span={1} offset={3}><Icon type="form" onClick={()=>{this.setState({modal: true, product})}}/></Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </div>
                                <Modal
                                    popup
                                    visible={modal}
                                    onClose={this.controlModal(false)}
                                    animationType="slide-up"
                                    className='modify-goods-modal'
                                >
                                    <div className='close-popup' onClick={this.controlModal(false)}>X</div>
                                    <div style={{paddingTop:52}}>
                                        <AddGoods good={product}/>
                                    </div>
                                </Modal>
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}