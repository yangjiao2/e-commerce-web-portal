import React, {Component} from 'react'
import {Grid, Carousel, WhiteSpace, ActivityIndicator, Flex} from 'antd-mobile'
import './index.css'
import {Query} from "react-apollo";
import gql from "graphql-tag";
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
                            style={{ display: 'inline-block', width: '100%', height: 'auto', maxHeight: '200px', overflow: 'hidden' }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                            />
                        </a>
                    ))}
                </Carousel>
                <Grid data={data} activeStyle={false} hasLine={false} isCarousel={true}/>
                <WhiteSpace/>
                <Query query={gql(productbyprops)} variables={{}}>
                    {
                        ({loading, error, data}) => {
                            if (loading) {
                                return (
                                    <div className="tab-center">
                                        <ActivityIndicator text="Loading..." size="large"/>z
                                    </div>
                                )
                            }
                            if (error) {
                                return 'error!';
                            }
                            return (
                                <Like data={data.productbyprops}/>
                            )
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default Home

class Like extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let {data} = this.props;
        console.log(data)
        return (
            <div className='guess-wrap'>
                <div className='guess-title'>- 猜你喜欢 -</div>
                <Flex wrap="wrap">
                {
                    data.map(data=>{
                        return (
                            <Flex.Item key={data.id}>
                                <div className='guess-item-img' style={{backgroundImage: "url('"+ data.img + "')"}}/>
                            </Flex.Item>
                        )
                    })
                }
                </Flex>
            </div>
        )
    }
}