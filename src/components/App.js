import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Spinner from '../components/UI/Spinner'
import { GET_ALL_USERS } from '../queries';
import Error from '../Utilities/Error';
import '../Styles/buttons.css';
import './App.css';

const MainTitle = styled.div`
  display: inline-grid;
  grid-template-columns: 250px 250px;

`;

const MainTitleText = styled.p`
  color: #F7C640;
  font-family: 'Permanent Marker', cursive;
  font-weight: bold;
  font-size: 6rem;
`;

class App extends Component {
  render() {
    return (
        <div className="App">
        <div>
          <MainTitle>
            <MainTitleText className="main-title">Dabs</MainTitleText> <MainTitleText className="main-title">Club</MainTitleText>
          </MainTitle>
          <Query query={GET_ALL_USERS}>
            {({ data, loading, error }) => {
              if(loading) return <Spinner />
              if(error) return <Error error={error}/>
              const { allUsers } = data
              return (
                <div>
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
        </div>
    );
  }
}

export default App;
