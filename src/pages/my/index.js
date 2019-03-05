import React from 'react'
import './index.css'
import All from './all'
import Order from './order'
import Tools from './tools'
import Member from './member'
import Shop from './shop'
import {Switch, Route} from 'react-router-dom'

const My = () => (
    <div style={{height: '100%'}}>
        <Switch>
            <Route exact path="/my" component={All}/>
            <Route exact path="/my/all" component={All}/>
            <Route path="/my/order" component={Order}/>
            <Route path="/my/tools" component={Tools}/>
            <Route path="/my/member" component={Member}/>
            <Route path="/my/shop" component={Shop}/>
        </Switch>
    </div>
)

export default My