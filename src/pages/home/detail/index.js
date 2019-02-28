import React, {Component} from 'react'
import {NavBar, Icon, ActivityIndicator} from 'antd-mobile'
import {productbyid} from "../../../utils/gql"
import {Query} from "react-apollo"
import gql from "graphql-tag"
import './index.css'
import {withRouter} from 'react-router-dom'

class Detail extends Component {
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
        return (
            <div className='detail-wrap'>
                <div className='detail-navbar-wrap'>
                    <NavBar
                        className='detail-navbar'
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {this.props.history.push({pathname: '/'})}}
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
                                <DetailRender data={data.productbyid} history={this.props.history}/>
                            )
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default withRouter(Detail)

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
                    <span className='detail-bottom-cart' onClick={()=>{this.props.history.push({pathname: '/cart'})}}><div className='detail-icon-wrap'><div className='detail-icon detail-icon-cart'/><div>购物车</div></div></span>
                    <span className='detail-bottom-home' onClick={()=>{this.props.history.push({pathname: '/home'})}}><div className='detail-icon-wrap'><div className='detail-icon detail-icon-shop'/><div>店铺</div></div></span>
                    <span className='detail-bottom-add' onClick={()=>{}}>加入购物车</span>
                    <span className='detail-bottom-buy' onClick={()=>{}}>立即购买</span>
                </div>
            </div>
        )
    }
}