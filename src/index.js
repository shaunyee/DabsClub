import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './index.css';

import App from './components/App';
import Navbar from './components/UI/Navbar';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';


import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

/* const authLink = setContext(async (req, { headers }) => {
    const token = await getToken();
    return {...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
      }
    }
  }); */
  
  const API_KEY = `${process.env.REACT_APP_GRAPHCOOL_KEY}`;
  const httpLink = new HttpLink({
    uri: API_KEY
  });
  
/*   const link = authLink.concat(httpLink); */

  
  const client = new ApolloClient({
    link: httpLink, 
    cache: new InMemoryCache()
  })

const Root = ({ refetch, session }) => (
    <Router>
        <Fragment>
            <Navbar />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </Router>
);


ReactDOM.render(
<ApolloProvider client={client}>
    <Root />
</ApolloProvider>, 
document.getElementById('root'));
