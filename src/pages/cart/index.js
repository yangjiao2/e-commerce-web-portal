import React from 'react'
import {Switch, Route} from 'react-router-dom'

import All from './all'
import CartOrders from './orders'
import Pay from './pay'
import './index.css'

const Cart = () => (
    <div style={{height: '100%'}}>
        <Switch>
            <Route exact path="/cart" component={All}/>
            <Route exact path="/cart/all" component={All}/>
            <Route path="/cart/orders" component={CartOrders}/>
            <Route path="/cart/pay" component={Pay}/>
        </Switch>
    </div>
)

export default Cart