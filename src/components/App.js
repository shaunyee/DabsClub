import React, { Component } from 'react';
import './App.css';
import { GET_ALL_USERS } from '../queries';
import { Query } from 'react-apollo';
import '../Styles/buttons.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="main-title">DABS CLUB</h1>
        <Query query={GET_ALL_USERS}>
          {({ data, loading, error }) => {
            if(loading) return <div>loading</div>;
            if(error) return <div>Error</div>;
            const { allUsers } = data
            console.log(allUsers);
            return (
              <div>
              <button className="color-change">Click Me!!</button>
                <ul className="cards">
                  {allUsers.map(user => (
                    <li className="card" key={user.id}>
                      <div className="card-text">
                        <h1>{user.username}</h1>
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
