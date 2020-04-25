import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

import { graphqlFC } from "./configs/url"
import { BrowserRouter as Router } from 'react-router-dom'

const cache = new InMemoryCache();
const client = new ApolloClient({
    // uri: graphqlFC
    // graphql 后端server 在Hasura GraphQL backend
    uri: 'https://xiyou-server.herokuapp.com/v1/graphql',
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
)
