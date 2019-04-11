import React from 'react'
import './index.css'
import All from './all'
import Order from './order'
import Tools from './tools'
import Member from './member'
import Manage from './manage'
import Profile from './profile'
import {Switch, Route} from 'react-router-dom'

const My = () => (
    <div style={{height: '100%'}}>
        <Switch>
            <Route exact path="/my" component={All}/>
            <Route exact path="/my/all" component={All}/>
            <Route path="/my/order" component={Order}/>
            <Route path="/my/tools" component={Tools}/>
            <Route path="/my/member" component={Member}/>
            <Route path="/my/manage" component={Manage}/>
            <Route path="/my/profile" component={Profile}/>
        </Switch>
    </div>
)

export default My