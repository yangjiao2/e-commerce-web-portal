import React from 'react'
import { Switch, Route } from 'react-router-dom'

import All from './all'
import Kind from './kind'
import Detail from './detail'
import './index.css'

const Home = (props) => {
    let query = props.location ? props.location.search : '';
    return (
        <div style={{ height: '100%' }}>
            <Switch>
                <Route exact path="/" component={All} />
                <Route exact path="/home" component={All} />
                <Route path="/home/query=" render={
                    () => <All query={query} />
                } />
                <Route path="/home/kind" component={Kind} />
                <Route path="/home/detail" component={Detail} />
            </Switch>
        </div>
    )
}

export default Home

