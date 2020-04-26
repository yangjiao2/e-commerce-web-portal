import React from 'react'
import './index.css'
import All from './all'
// import Tools from './tools'
import Order from './order'
import { Switch, Route } from 'react-router-dom'


const Tool = () => (
    <div style={{ height: '100%' }}>
        {/* <div className='tools-wrap'> */}
        <Switch>
            <Route exact path="/tool" component={All} />
            <Route exact path="/tool/all" component={All} />
            <Route path="/tool/order" component={Order} />
        </Switch>
        {/* </div> */}
    </div>
)

export default Tool