import React from 'react'
import {Switch, Route} from 'react-router-dom'

import All from './all'
import CartOrders from './orders'
import './index.css'

const Cart = () => (
    <div style={{height: '100%'}}>
        <Switch>
            <Route exact path="/cart" component={All}/>
            <Route exact path="/cart/all" component={All}/>
            <Route path="/cart/order" component={CartOrders}/>
        </Switch>
    </div>
)

export default Cart