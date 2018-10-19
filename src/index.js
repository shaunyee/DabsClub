import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { setContext } from 'apollo-link-context';
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';

import App from './components/App';
import Navbar from './components/UI/Navbar';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile/Profile'
import CreateGame from './components/Games/CreateGame'

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
  
const link = authLink.concat(httpLink);

  
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
                <Route path="/createGame" render={() => <CreateGame session={session} />} />
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
