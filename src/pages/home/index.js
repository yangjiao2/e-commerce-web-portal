import React, {Component} from 'react'
import {Grid, Carousel, WhiteSpace, ActivityIndicator} from 'antd-mobile'
import './index.css'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import {productbyprops} from "../../utils/gql"

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        }
    }

    render() {
        const data = [
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '基础护理'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '面膜'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '洁面'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '防晒'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '面部保湿'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '彩妆'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '指甲油'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '更多'
            }
        ]

        return (
            <div>
                <Carousel
                    autoplay={true}
                    infinite
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
                <Grid data={data} hasLine={false}/>
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
                                    <Like data={data.productbyprops}/>
                                )
                            }
                        }
                    </Query>
                </div>
            </div>
        )
    }
}

export default Home

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