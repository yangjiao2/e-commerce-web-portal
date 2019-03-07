import React, {Component} from "react"
import {productbyprops} from "../../../utils/gql"
import {Query} from "react-apollo"
import gql from "graphql-tag"
import {Grid, Carousel, WhiteSpace, ActivityIndicator} from 'antd-mobile'
import './index.css'
import {withRouter} from 'react-router-dom'

class All extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
        }
    }

    render() {
        const data = [
            {
                icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/jacket.png',
                text: '夹克',
                id: 'jacket'
            },
            {
                icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/coat.png',
                text: '外套',
                id: 'coat'
            },
            {
                icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/shirt.png',
                text: '衬衫',
                id: 'shirt'
            },
            {
                icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/skirts.png',
                text: '半身裙',
                id: 'skirt'
            },
            {
                icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/sweater.png',
                text: '针织衫',
                id: 'sweater'
            },
            {
                icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/windbreak.png',
                text: '风衣',
                id: 'windbreak'
            },
            {
                icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/pants.png',
                text: '裤子',
                id: 'pants'
            },
            {
                icon: 'https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/icon/more.png',
                text: '更多',
                id: 'more'
            }
        ]
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
                <Grid
                    data={data}
                    hasLine={false}
                    onClick={(kind)=>{
                        this.props.history.push({
                            pathname: '/home/kind',
                            state: {
                                id: kind.id,
                                tabHidden:true
                            }
                        })
                    }}/>
                <WhiteSpace/>
                <div className='guess-wrap'>
                    <Query query={gql(productbyprops)} variables={{status: '1'}}>
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
                                  id: guess.id,
                                  tabHidden:true
                              }
                          })
                      }}
                      renderItem={dataItem => (
                          <div key={dataItem.id} className='guess-item'>
                              <div className='guess-item-img' style={{backgroundImage: "url('" + dataItem.img + "')"}}/>
                              <div className='guess-item-description'>
                                  <div className='guess-item-name'>{dataItem.name}</div>
                                  <div className='guess-item-price'>{dataItem.price}</div>
                              </div>
                          </div>
                      )}
                />
            </div>
        )
    }
}

export default withRouter(All)