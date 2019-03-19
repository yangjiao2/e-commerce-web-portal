import React, {Component} from 'react'
import Shop from './shop'
import Goods from './goods'
import Orders from './orders'
import {withRouter, Route, Switch} from 'react-router-dom'

class Manage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: ''
        }
    }

    componentWillMount() {
        let {location} = this.props
        if (location && location.state) {
            this.props.history.push({
                pathname: '/my/manage/' + location.state.page,
                state: {}
            })
        }
    }

    render() {
        return (
            <div className='manage-wrap'>
                <Switch>
                    <Route path="/my/manage/shop" component={Shop}/>
                    <Route path="/my/manage/goods" component={Goods}/>
                    <Route path="/my/manage/orders" component={Orders}/>
                    <Route path="/my/manage/*" component={Orders}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(Manage)