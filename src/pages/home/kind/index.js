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
        this.state = {}
    }

    render() {
        let {id, changePageInHome} = this.props
        return (
            <div className='kind-wrap'>
                <div className='kind-navbar-wrap'>
                    <NavBar
                        className='kind-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {this.props.history.push({pathname: '/'})}}
                        rightContent={[
                            <Icon key="1" type="ellipsis"/>,
                        ]}
                    >商品分类</NavBar>
                </div>
                <div className='kind-search-wrap'>
                    <Search
                        className='kind-search'
                        placeholder="请输入搜索内容"
                        onSearch={value => console.log(value)}
                    />
                </div>
                <Query query={gql(productbyprops)} variables={{intro: id}}>
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
                                    changePageInHome={changePageInHome}
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
        let {data, changePageInHome} = this.props
        return (
            <div className='kind-wrapper'>
                <Grid data={data}
                      columnNum={2}
                      hasLine={false}
                      onClick={(kind) => {
                          changePageInHome('detail', {id: kind.id})
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
            </div>
        )
    }
}