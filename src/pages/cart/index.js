import React from 'react'
import {Switch, Route} from 'react-router-dom'

import All from './all'
import './index.css'

const Cart = () => (
    <div style={{height: '100%'}}>
        <Switch>
            <Route exact path="/cart" component={All}/>
            <Route exact path="/cart/all" component={All}/>
        </Switch>
    </div>
)

export default Cart