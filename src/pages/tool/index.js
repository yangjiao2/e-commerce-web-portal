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
            {/* <Route path="/" component={All} /> */}
            <Route path="/tool" component={All} />
            <Route path="/tool/all" component={Order} />
            <Route path="/tool/order/" component={Order} />
            {/* <Route path="/tool/order/display" component={Display} />
                <Route path="/tool/order/detail" component={Detail} />
                <Route path="/tool/order/*" component={Display} /> */}
            {/* <Route path="/tools/*" component={All} /> */}
        </Switch>
        {/* </div> */}
    </div>
)

export default Tool