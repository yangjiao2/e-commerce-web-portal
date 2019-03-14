import React, {Component} from "react"
import {withRouter} from 'react-router-dom'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import {Grid, Carousel, WhiteSpace, ActivityIndicator} from 'antd-mobile'

import {category_by_props, productbyprops} from "../../../utils/gql"
import './index.css'

class All extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
        }
    }

    render() {
        const categoryFilter = {
            "status": "1",
            "limit": 7,
            "sort_by": {"order": "asc"}
        }

        const more = {
            icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/more.png',
            text: '更多',
            id: 'more'
        }

        return (
            <div>
                <Carousel
                    autoplay={true}
                    infinite
                    style={{minHeight:200}}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{
                                display: 'inline-block',
                                width: '100%',
                                height: 'auto',
                                maxHeight: '200px',
                                overflow: 'hidden'
                            }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{width: '100%', verticalAlign: 'top'}}
                            />
                        </a>
                    ))}
                </Carousel>
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
                            let dataList =  categoryList.concat(more)

                            return (
                                <Grid
                                    data={dataList}
                                    hasLine={false}
                                    onClick={(kind)=>{
                                        this.props.history.push({
                                            pathname: '/home/kind',
                                            state: {
                                                id: kind.id,
                                                category:kind.text
                                            }
                                        })
                                    }}/>
                            )
                        }
                    }
                </Query>
                <WhiteSpace/>
                <div className='guess-wrap'>
                    <Query query={gql(productbyprops)} variables={{status: '1', recommend: 1}}>
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
                                    <Like data={data.productbyprops} history={this.props.history}/>
                                )
                            }
                        }
                    </Query>
                </div>
            </div>
        )
    }
}

class Like extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {data} = this.props
        return (
            <div className='guess-wrapper'>
                <div className='guess-title'>- 猜你喜欢 -</div>
                <Grid data={data}
                      columnNum={2}
                      hasLine={false}
                      onClick={(guess)=>{
                          this.props.history.push({
                              pathname: '/home/detail',
                              state: {
                                  id: guess.id
                              }
                          })
                      }}
                      renderItem={dataItem => (
                          <div key={dataItem.id} className='product-item'>
                              <div className='product-item-img' style={{backgroundImage: "url('" + dataItem.img + "')"}}/>
                              <div className='product-item-description'>
                                  <div className='product-item-name'>{dataItem.name}</div>
                                  <div className='product-item-price'>
                                      <span>￥{dataItem.price}</span>&nbsp;
                                      <span>￥{dataItem.price}</span>
                                  </div>
                              </div>
                          </div>
                      )}
                />
            </div>
        )
    }
}

export default withRouter(All)