import React, {Component} from 'react'
import {NavBar, Icon, ActivityIndicator} from 'antd-mobile'
import {productbyid} from "../../../utils/gql"
import {Query} from "react-apollo"
import gql from "graphql-tag"
import './index.css'

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {id, changePageInHome} = this.props
        return (
            <div className='detail-wrap'>
                <div className='detail-navbar-wrap'>
                    <NavBar
                        className='detail-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => changePageInHome('all', {}, false)}
                        rightContent={[
                            <Icon key="1" type="ellipsis"/>,
                        ]}
                    >商品详情</NavBar>
                </div>

                <Query query={gql(productbyid)} variables={{id}}>
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
                                <DetailRender data={data.productbyid}/>
                            )
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default Detail

class DetailRender extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let {data} = this.props;
        return (
            <div className='detail-wrapper'>
                <div className='detail-simple-show'>
                    <div className='detail-img' style={{backgroundImage: "url('"+ data.img + "')"}}/>
                    <div className='detail-below-img-in-simle-show-hahahahah'>
                        <div className='detail-name'>{data.name}</div>
                        <div className='detail-price'>{data.price}</div>
                        <div className='detail-stock'>{data.stock}</div>
                    </div>
                </div>
                <div className='detail-complicate-show'>详情详情</div>
                <div className='detail-bottom'>
                    <div className='detail-bottom-cart'>购物车</div>
                    <div className='detail-bottom-home'>店铺</div>
                    <div className='detail-bottom-add'>加入购物车</div>
                    <div className='detail-bottom-buy'>立即购买</div>
                </div>
            </div>
        )
    }
}