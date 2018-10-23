import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { setContext } from 'apollo-link-context';
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { split } from "apollo-link";
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities'
import './index.css';

import App from './components/App';
import Navbar from './components/UI/Navbar';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile/Profile'
import Games from './components/Games/Games'
import Game from './components/Games/Game'
import GameManager from './components/Games/GameManager'

import { getToken } from "../src/Utilities/loginUtils";
import withSession from './components/Auth/withSession'



const authLink = setContext(async (req, { headers }) => {
    const token = await getToken();
    return {...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
      }
    }
  });
  
  const API_KEY = `${process.env.REACT_APP_GRAPHCOOL_KEY}`;

  const httpLink = new HttpLink({
    uri: API_KEY
  });

  const wsLink = new WebSocketLink({
    uri: `wss://subscriptions.us-west-2.graph.cool/v1/cjn74bqfr127l0129yvet00lq`,
    options: {
      reconnect: true
    }
  })
  
const linkWithAuth = authLink.concat(httpLink);

const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    linkWithAuth
  );

  
  const client = new ApolloClient({
    link, 
    cache: new InMemoryCache()
  })



const Root = ({ refetch, session }) => (
    <Router>
        <Fragment>
            <Navbar session={session} />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signin" render={() => <Signin refetch={refetch} />} />
                <Route path="/signup" render={() => <Signup refetch={refetch} />} />
                <Route path="/profile/:id" render={() => <Profile session={session} />} />
                <Route path="/allGames" render={() => <Games session={session} />} />
                <Route path="/game/:id" render={() => <Game session={session} />} />
                <Route path="/gameManager" render={() => <GameManager session={session} />} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
<ApolloProvider client={client}>
    <RootWithSession />
</ApolloProvider>, 
document.getElementById('root'));
