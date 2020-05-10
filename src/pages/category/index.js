import React from 'react'
import './index.css'
import All from './all'

import { Switch, Route } from 'react-router-dom'

const Category = () => (
    <div style={{ height: '100%' }}>
        <Switch>
            <Route exact path="/category" component={All} />
            <Route exact path="/category/all" component={All} />

        </Switch>
    </div>
)

export default Category