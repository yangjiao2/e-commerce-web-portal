import React, {Component} from "react"
import {productbyprops} from "../../../utils/gql"
import {Query} from "react-apollo"
import gql from "graphql-tag"
import {Grid, Carousel, WhiteSpace, ActivityIndicator} from 'antd-mobile'
import './index.css'

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
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '夹克',
                id: 'jacket'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '外套',
                id: 'coat'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '衬衫',
                id: 'shirt'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '半身裙',
                id: 'skirts'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '针织衫',
                id: 'sweater'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '风衣',
                id: 'windbreak'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '裤子',
                id: 'pants'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '更多',
                id: 'more'
            }
        ]
        let {changePageInHome} = this.props
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
                <Grid
                    data={data}
                    hasLine={false}
                    onClick={(kind)=>{
                        changePageInHome('kind', {id: kind.id})
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
                                    <Like
                                        data={data.productbyprops}
                                        changePageInHome={changePageInHome}
                                    />
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
        let {data, changePageInHome} = this.props
        return (
            <div className='guess-wrapper'>
                <div className='guess-title'>- 猜你喜欢 -</div>
                <Grid data={data}
                      columnNum={2}
                      hasLine={false}
                      onClick={(guess)=>{
                          changePageInHome('detail', {id: guess.id})
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

export default All