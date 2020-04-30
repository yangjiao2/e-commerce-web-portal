import React from 'react'
import './index.css'
import All from './all'
// import Order from './order'
import Info from './info'
import Profile from './profile'
import { Switch, Route } from 'react-router-dom'

const My = () => (
    <div style={{ height: '100%' }}>
        <Switch>
            <Route exact path="/my" component={All} />
            <Route exact path="/my/all" component={All} />
            {/* <Route path="/my/order" component={Order} /> */}
            <Route path="/my/info" component={Info} />
            <Route path="/my/profile" component={Profile} />
        </Switch>
    </div>
)

export default My