import React from 'react';
import { Query, Subscription } from 'react-apollo';


import GamesTableView from './GamesTableView';
import { ALL_GAMES, GAME_SUBSCRIPTION } from '../../queries';
import Spinner from '../UI/Spinner';
import Error from '../../Utilities/Error';


 const Games = () => {
  return (
      <Subscription subscription={GAME_SUBSCRIPTION}>
        {({ data }) => {
            console.log(data)
            return(
      <Query query={ALL_GAMES}>
          {({ data, loading, error, subscribeToMore}) => {
              if(loading) return <Spinner />
              if(error) return <Error error={error}/>
              const {allGames} = data;
            subscribeToMore({
          document: ALL_GAMES,
          updateQuery: (prev, { subscriptionData }) => {
            if(!subscriptionData.data) return prev;
          }
        })
             return (
                 <div className="App">
                 <h2>All Games for the Season</h2>
                    <ul className="game-cards">
                        <table>
                        <thead>
                            <tr>
                                <th>Opponent</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Ticker Owners</th>
                                <th>Game Page</th>
                            </tr>
                        </thead>
                        <tbody>
                {
                    allGames.map(game => {
                    return (
                        <GamesTableView game={game} key={game.id} />
                    )})}
                    </tbody>
                        </table>
                    </ul>
                 </div>
             )}}
      </Query>
            )}}
      </Subscription>
  )
}
export default Games;