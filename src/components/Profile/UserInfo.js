import React from 'react';
import { Query } from 'react-apollo';
import { GET_USER } from '../../queries';
import { withRouter } from 'react-router-dom';

import { formatDate } from '../../Utilities/formatDate';


const UserInfo = ({ session, match }) => {
  console.log(match);
  const { id } = match.params;
  return (
    <Query query={ GET_USER }
    variables={{ id }}
    >
      {({ data, loading, error }) => {
        console.log(data)
        if(loading) return <p>Loading ...</p>
        if(error) return <p>Error</p>
        const { email, games, username } = data.User;
        return (
          <div className="App">
          <h2>{username}'s Profile</h2>
            <p><strong>Email:</strong> {email}</p>
            <div>
              <p>Your Current Games</p>
              <ul className="game-cards">
              {
                games.map(game => {
                  return (
                      <div className="card" key={game.id}>
                          <h1>{game.opponent}</h1>
                        <div className="card-text">
                          <h4>Date</h4>
                          <p>{formatDate(game.date)}</p>
                          <h4>Location</h4>
                          <p>{game.location}</p>
                        </div>
                      </div>
                  )})}
                </ul>
            </div>
          </div>
        )}}
    </Query>
  )
}
export default withRouter(UserInfo);