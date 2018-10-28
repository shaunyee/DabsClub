import React from 'react';
import { Query, Subscription } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { GET_USER, TRADE_SUBSCRIPTION } from '../../queries';
import { formatDate } from '../../Utilities/formatDate';
import Error from '../../Utilities/Error'
import Spinner from '../UI/Spinner';
import UserCurrentTrades from './UserCurrentTrades'


const UserInfo = ({ session, match }) => {
  const { id } = match.params;
  return (
    <Subscription subscription={TRADE_SUBSCRIPTION}>
    {({ data }) => {
    return (
    <Query query={ GET_USER }
    variables={{ id }}
    >
      {({ data, loading, error, subscribeToMore }) => {
        if(loading) return <Spinner />
        if(error) return <Error error={error}/>
        const { email, games, username, trades} = data.User;
           subscribeToMore({
          document: GET_USER,
          variables: {id: session.user.id},
          updateQuery: (prev, { subscriptionData }) => {
            if(!subscriptionData.data) return prev;
            console.log(subscriptionData.data)
          }
        })
        return (
              <div className="App">
              <h2>{username}'s Profile</h2>
                <p><strong>Email:</strong> {email}</p>
                <div>
                  <p>List of your Current Trades</p>
                    <UserCurrentTrades trades={trades} session={session}/>
                  <p>Your Games</p>
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
    )}}
        </Subscription>
  )
}
export default withRouter(UserInfo);