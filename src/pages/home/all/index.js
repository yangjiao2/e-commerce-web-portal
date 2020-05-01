import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { useQuery } from '@apollo/react-hooks';
import { graphqlFC } from "../../../configs/url"
import { request } from 'graphql-request'
import { graphql } from '@apollo/react-hoc';

import { Grid, Card, Carousel, WhiteSpace, ActivityIndicator } from 'antd-mobile'
import { PRODUCT_QUERY, category_by_props, PRODUCT_BY_SEARCH } from "../../../utils/gql"
import './index.css'
import { TagOutlined, SearchOutlined } from '@ant-design/icons';

import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

class HomePage extends Component {
    constructor(props) {
        super(props)
        console.log('homepage', props)
        this.state = {
            query: props.query || ''
        }
    }

    render() {
        const carousel_url = [
            'https://i.ibb.co/vm1yLsb/Screen-Shot-2020-04-18-at-7-14-29-PM.png',
            'https://i.ibb.co/ZMXgVCg/10d93362996e2aefe57eb9d4a9bec895.jpg',
            'https://i.ibb.co/0DkHmqZ/335b1ee329117d7946458d3dfcff6909.jpg',
            'https://i.ibb.co/nwGFFgH/18e179a994a4a23a122e833d427edead.jpg',
        ];

        const categoryFilter = {
            "status": "1",
            "limit": 7,
            "sort_by": { "order": "asc" }
        }

        const more = {
            icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/more.png',
            text: '更多',
            id: 'more'
        }
        let query = this.props.query || '';
        let text = query === '' ? query : query.substring(1)
        if (query) {
            return (<Query query={gql(PRODUCT_BY_SEARCH)} variables={{ text: `%${text}%` }}>
                {result => {
                    const { loading, error, data } = result;
                    const productList = data.product;

                    return <div className='guess-wrapper'>
                        <div className='guess-title'>
                            <SearchOutlined /> {` 搜索结果: ${text}`}
                            <ProductGridView data={productList} onClick={
                                (item) => {
                                    console.log(item)
                                    this.props.history.push({
                                        pathname: '/home/detail',
                                        state: {
                                            id: item.id
                                        }
                                    })
                                }} />
                        </div>
                    </div>
                }}
            </Query>);
        }

        return (
            <div>
                <Carousel
                    autoplay={true}
                    infinite
                    style={{ height: 440 }}
                >
                    {
                        carousel_url.map(imageurl =>
                            <div>      <img
                                src={imageurl}
                                alt=""
                                style={{ height: '450px', width: '100%', overflow: 'hidden' }}
                            />
                            </div>)
                    }
                </Carousel>
                <Recommend data={[]} history={this.props.history} />
            </div>
        )
    }
}



class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Query query={gql(PRODUCT_QUERY)} variables={{}}>
                {result => {
                    const { loading, error, data } = result;
                    const productList = data.product;

                    return <div className='guess-wrapper'>
                        <div className='guess-title'>
                            <TagOutlined /> {' 店铺推荐 '}
                            <ProductGridView data={productList} onClick={
                                (item) => {
                                    console.log(item)
                                    this.props.history.push({
                                        pathname: '/home/detail',
                                        state: {
                                            id: item.id
                                        }
                                    })
                                }} />
                        </div>
                    </div>
                }}
            </Query>

        )
    }
}

class ProductGridView extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let { data, onClick } = this.props;
        return (<Grid
            data={data}
            columnNum={3}
            hasLine={false}
            // square={false}
            itemStyle={{ margin: '5px' }}
            onClick={onClick}
            renderItem={dataItem => (
                <div key={dataItem.id} className='product-item'>
                    <div className='product-item-img' style={{ backgroundImage: "url('" + dataItem.img[0] + "')" }} />
                    <div className='product-item-description'>
                        <div className='product-item-name'>{dataItem.name}</div>
                        <div className='product-item-price'>
                            <span>￥{(dataItem.price * 0.8).toFixed(2)}</span>&nbsp;
                                    <span>￥{dataItem.price}</span>
                        </div>
                    </div>
                </div>
            )}
        />)
    }
}

export default withRouter(HomePage)
