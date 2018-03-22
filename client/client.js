import React, { Component } from 'react';
import { render } from 'react-dom';
import ApplloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const baseUri = 'http://127.0.0.1:8092/graphql';

const client = new ApplloClient({
    uri: baseUri,
});

class ApolloApp extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        )
    }
}
const app = React.createElement(ApolloApp);
render(app, document.getElementById('root'));