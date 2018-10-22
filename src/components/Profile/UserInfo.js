import React from 'react';
import { Query } from 'react-apollo';
import { GET_USER } from '../../queries';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { formatDate } from '../../Utilities/formatDate';
import Error from '../../Utilities/Error'
import Spinner from '../UI/Spinner';


const UserInfo = ({ session, match }) => {
  const { id } = match.params;
  return (
    <Query query={ GET_USER }
    variables={{ id }}
    >
      {({ data, loading, error }) => {
        if(loading) return <Spinner />
        if(error) return <Error error={error}/>
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
                      <div className="game-header-text">
                          <Link to={`/game/${game.id}`}>
                          <h1>{game.opponent}</h1>
                          </Link>
                      </div>
                        <div className="game-card-text">
                          <h4>Date</h4>
                          <p>{formatDate(game.date)}</p>
                          <h4>Current Listed Price</h4>
                          <p>${game.price}</p>
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