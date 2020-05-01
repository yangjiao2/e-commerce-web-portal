import React from 'react'
import './index.css'
import All from './all'
// import Order from './order'
// import Info from './info'
// import Profile from './profile'
import { Switch, Route } from 'react-router-dom'

const Category = () => (
    <div style={{ height: '100%' }}>
        <Switch>
            <Route exact path="/category" component={All} />
            <Route exact path="/category/all" component={All} />
            {/* <Route path="/Category/order" component={Order} /> */}
            {/* <Route path="/Category/info" component={Info} /> */}
            {/* <Route path="/Category/profile" component={Profile} /> */}
        </Switch>
    </div>
)

export default Category