import React, {Component} from 'react'
import Card from './card'
import Coupon from './coupon'
import Credit from './credit'
import {withRouter, Route, Switch} from 'react-router-dom'

class Member extends Component {
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
                pathname: '/my/member/' + location.state.page,
                state: {}
            })
        }
    }

    render() {
        return (
            <div className='manage-wrap'>
                <Switch>
                    <Route path="/my/member/card" component={Card}/>
                    <Route path="/my/member/coupon" component={Coupon}/>
                    <Route path="/my/member/credit" component={Credit}/>
                    <Route path="/my/member/*" component={Card}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(Member)