import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import App from './App'

import ApolloClient from "apollo-boost"
import {ApolloProvider} from "react-apollo"

import {graphqlFC} from "./configs/url"

const client = new ApolloClient({
    uri: graphqlFC
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <Switch>
                <Route exact path="/" component = { App }/>
            </Switch>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
)


