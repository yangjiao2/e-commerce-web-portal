import React, {Component} from 'react'
import './index.css'
import {withRouter} from 'react-router-dom'
import {

    NavBar,
    Accordion,

} from 'antd-mobile'
import { Icon} from 'antd'
import classNames from 'classnames'

class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accordionKey: undefined
        }
    }

    render() {
        let {accordionKey} = this.state
        return (
            <div className='goods-wrap'>
                <NavBar
                    className='navbar'
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.go(-2)
                    }}
                >订单管理</NavBar>
                <div className='content-wrap'>
                    <div className='my-list-subtitle' style={{color: 'grey'}}><Icon type="bulb" style={{marginRight: 10}}/>{accordionKey? '折叠单项以展开更多分类':'请选择需要打开的分类'}</div>
                    <Accordion className="my-accordion" onChange={(key) => {
                        this.setState({
                            accordionKey: key[0]
                        })
                    }}>
                        <Accordion.Panel header="查询订单"
                                         className={classNames({'hidden': accordionKey === '1' || accordionKey === '2' || accordionKey === '3'})}>
                            <Search/>
                        </Accordion.Panel>
                        <Accordion.Panel header="待发货"
                                         className={classNames({'hidden': accordionKey === '0' || accordionKey === '2' || accordionKey === '3'})}>
                            <Shiping/>
                        </Accordion.Panel>
                        <Accordion.Panel header="已确认"
                                         className={classNames({'hidden': accordionKey === '0' || accordionKey === '1' || accordionKey === '3'})}>
                            <Completed/>
                        </Accordion.Panel>
                        <Accordion.Panel header="已评价"
                                         className={classNames({'hidden': accordionKey === '0' || accordionKey === '1' || accordionKey === '2'})}>
                            <Commented/>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>
        )
    }
}

class Search extends  Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>search</div>
        )
    }
}

class Shiping extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>Shiping</div>
        )
    }
}

class Completed extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>Completed</div>
        )
    }
}

class Commented extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>Commented</div>
        )
    }
}


export default withRouter(Orders)