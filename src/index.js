import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import ApolloClient from "apollo-boost"
import {ApolloProvider} from "react-apollo"

import {graphqlFC} from "./configs/url"

const client = new ApolloClient({
    uri: graphqlFC
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
)


