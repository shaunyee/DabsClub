import React from 'react';
import { Query } from 'react-apollo';

import { ALL_GAMES } from '../../queries';
import Spinner from '../UI/Spinner';
import Error from '../../Utilities/Error';
import { formatDate } from '../../Utilities/formatDate';

 const Games = () => {
  return (
      <Query query={ALL_GAMES}>
          {({ data, loading, error}) => {
              if(loading) return <Spinner />
              if(error) return <Error error={error}/>
              const {allGames} = data;
             return (
                 <div className="App">
                 <h2>All Games for the Season</h2>
                    <ul className="game-cards">
                {
                    allGames.map(game => {
                    return (
                        <div className="card" key={game.id}>
                            <h1>{game.opponent}</h1>
                            <div className="game-card-text">
                            <p>{formatDate(game.date)}</p>
                            <h4>Location</h4>
                            <p>{game.location}</p>
                            </div>
                        </div>
                    )})}
                    </ul>
                 </div>
             )}}
      </Query>
  )
}
export default Games;