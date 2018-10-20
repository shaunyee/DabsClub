import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import Spinner from '../components/UI/Spinner'
import { GET_ALL_USERS } from '../queries';
import Error from '../Utilities/Error';
import '../Styles/buttons.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="main-title">DABS CLUB</h1>
        <Query query={GET_ALL_USERS}>
          {({ data, loading, error }) => {
            if(loading) return <Spinner />
            if(error) return <Error error={error}/>
            const { allUsers } = data
            return (
              <div>
              <button className="color-change">Click Me!!</button>
                <ul className="cards">
                  {allUsers.map(user => (
                    <li className="card" key={user.id}>
                      <div className="card-text">
                      <Link to={`/profile/${user.id}`} ><h1>{user.username}</h1></Link>
                        <p>{user.email}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
        }}
        </Query>
      </div>
    );
  }
}

export default App;
