import React, {Component} from 'react'
import Message from './message'
import Address from './address'
import {withRouter, Route, Switch} from 'react-router-dom'

class Tools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: ''
        }
    }

    componentWillMount() {
        let {location} = this.props
        if (location && location.state) {
            this.props.history.replace({
                pathname: '/my/tools/' + location.state.page,
                state: location.state
            })
        }
    }

    render() {
        return (
            <div className='tools-wrap'>
                <Switch>
                    <Route path="/my/tools/address" component={Address}/>
                    <Route path="/my/tools/message" component={Message}/>
                    <Route path="/my/tools/*" component={Address}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(Tools)