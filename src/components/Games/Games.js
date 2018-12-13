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
                    <div>
                        <table>
                        <thead>
                            <tr>
                                <th>Opponent</th>
                                <th>Date</th>
                                <th>Average Ticket Price</th>
                                <th>TicketStatus</th>
                                <th>Ticket 1</th>
                                <th>Ticket 1 Price/Status</th>
                                <th>Ticket 2</th>
                                <th>Ticket 2 Price/Status</th>
                                <th>Ticket 3</th>
                                <th>Ticket 3 Price/Status</th>
                                <th>Ticket 4</th>
                                <th>Ticket 4 Price/Status</th>
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
                    </div>
                 </div>
             )}}
      </Query>
            )}}
      </Subscription>
  )
}
export default Games;