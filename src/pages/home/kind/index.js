import React, {Component} from 'react'
import {NavBar, Icon, ActivityIndicator, Grid} from 'antd-mobile'
import {Input} from 'antd'
import './index.css'
import {productbyprops} from "../../../utils/gql"
import {Query} from "react-apollo"
import gql from "graphql-tag"
import {withRouter} from 'react-router-dom'

const Search = Input.Search

class Kind extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
    }

    componentWillMount() {
        let {location} = this.props
        if(location && location.state) {
            this.setState({
                id: location.state.id
            })
        }
    }

    render() {
        let {id} = this.state
        let contentHeight = window.innerHeight - 105
        return (
            <div className='kind-wrap'  style={{height: contentHeight}}>
                <div className='kind-navbar-wrap'>
                    <NavBar
                        className='kind-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {this.props.history.push({pathname: '/'})}}
                    >商品分类</NavBar>
                </div>
                <div className='kind-search-wrap'>
                    <Search
                        className='kind-search'
                        placeholder="请输入搜索内容"
                        onSearch={value => console.log(value)}
                    />
                </div>
                <Query query={gql(productbyprops)} variables={{category: id}}>
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
                            return (
                                <KindRender
                                    data={data.productbyprops}
                                    history={this.props.history}
                                />
                            )
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default withRouter(Kind)

class KindRender extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {data} = this.props
        return (
            <div className='kind-wrapper'>
                {
                    data.length === 0?
                        '这个分类还没有商品呢'
                        :
                        <Grid data={data}
                              columnNum={2}
                              hasLine={false}
                              onClick={(product) => {
                                  this.props.history.push({
                                      pathname: '/home/detail',
                                      state: {
                                          id: product.id
                                      }
                                  })

                              }}
                              renderItem={dataItem => (
                                  <div key={dataItem.id} className='kind-item'>
                                      <div className='kind-item-img'
                                           style={{backgroundImage: "url('" + dataItem.img + "')"}}/>
                                      <div className='kind-item-description'>
                                          <div className='kind-item-name'>{dataItem.name}</div>
                                          <div className='kind-item-price'>{dataItem.price}</div>
                                      </div>
                                  </div>
                              )}
                        />
                }
            </div>
        )
    }
}