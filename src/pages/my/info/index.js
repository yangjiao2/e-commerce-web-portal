import React, { Component } from 'react'
import Address from './address'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Grid } from 'antd-mobile'

class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: ''
        }
    }

    componentWillMount() {
        let { location } = this.props
        if (location && location.state) {
            this.props.history.replace({
                pathname: '/my/info/' + location.state.page,
                state: location.state
            })
        }
    }

    render() {
        return (
            <div className='tools-wrap'>
                <Switch>
                    {/* <Route path="/my/info/address" component={Address} /> */}
                    <Route path="/my/info" component={Address} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(Info)