import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { request } from "graphql-request";
import { graphql } from "@apollo/react-hoc";
import { Menu, Switch, Divider } from "antd";

import {
    Grid,
    Card,
    Carousel,
    WhiteSpace,
    ActivityIndicator,
} from "antd-mobile";
import { PRODUCT_BY_CATEGORY } from "../../../utils/gql";
import "./index.css";
import { TagOutlined, SearchOutlined } from "@ant-design/icons";

import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const { SubMenu } = Menu;

class All extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "cloth",
        };
    }

    handleClick = (e) => {
        this.setState({ category: e.key });
    };

    applyHighlight = (key, category) => {
        return category === key
            ? { background: "lemonchiffon", color: "#fb9494" }
            : {}

    }

    render() {
        let category = this.state.category;

        return (
            <div className="category-content">
                <Menu
                    onClick={this.handleClick}
                    style={{
                        width: "20%"

                    }}
                    // defaultSelectedKeys={[this.state.category]}
                    defaultOpenKeys={["sub1", "sub2"]}
                    inlineCollapsed={false}
                    mode="inline"
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <span>{'女装男装'}</span>
                            </span>
                        }
                        style={['cloth', 'men-cloth'].includes(category) ? {
                            color: "#fb9494",
                        } : {}}
                    >
                        <Menu.Item
                            key="cloth"
                            style={
                                this.applyHighlight('cloth', category)
                            }
                        >
                            {'女装'}
                        </Menu.Item>
                        <Menu.Item key="men-cloth"
                            style={
                                this.applyHighlight('men-cloth', category)
                            }>
                            {'男装'}
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        style={['accessory', 'shoe'].includes(category) ? {
                            color: "#fb9494",
                        } : {}}
                        title={
                            <span>
                                <span>{'饰品鞋袜'}</span>
                            </span>
                        }
                    >
                        <Menu.Item key="accessory"
                            style={
                                this.applyHighlight('accessory', category)
                            }>
                            {'饰品'}</Menu.Item>
                        <Menu.Item key="shoe" style={
                            this.applyHighlight('shoe', category)
                        }>{'鞋袜'}</Menu.Item>
                    </SubMenu>
                </Menu>

                <Query
                    query={gql(PRODUCT_BY_CATEGORY)}
                    variables={{ category: [category] }}
                >
                    {(result) => {
                        const { loading, error, data } = result;
                        const productList = data.product;

                        return (
                            <div className="category-wrapper">
                                {/* <SearchOutlined /> {` 搜索结果: ${text}`} */}
                                <ProductGridView
                                    data={productList}
                                    onClick={(item) => {
                                        console.log(item);
                                        this.props.history.push({
                                            pathname: "/home/detail",
                                            state: {
                                                id: item.id,
                                            },
                                        });
                                    }}
                                />
                            </div>
                        );
                    }}
                </Query>
            </div >
        );
    }
}

class ProductGridView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { data, onClick } = this.props;
        return (
            <Grid
                data={data}
                columnNum={3}
                hasLine={false}
                // square={false}
                itemStyle={{ margin: "5px" }}
                onClick={onClick}
                renderItem={(dataItem) => (
                    <div key={dataItem.id} className="product-item">
                        <div
                            className="product-item-img"
                            style={{ backgroundImage: "url('" + dataItem.img[0] + "')" }}
                        />
                        <div className="product-item-description">
                            <div className="product-item-name">{dataItem.name}</div>
                            <div className="product-item-price">
                                <span>￥{(dataItem.price * 0.8).toFixed(2)}</span>&nbsp;
                <span>￥{dataItem.price}</span>
                            </div>
                        </div>
                    </div>
                )}
            />
        );
    }
}

export default withRouter(All);
