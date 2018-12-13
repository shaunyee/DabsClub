import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_USER } from '../../queries';
import Error from '../../Utilities/Error'
import Spinner from '../UI/Spinner';
import UserGames from './UserGames';


 const NewUserInfo = ({ session, match}) => {
     const { id } = match.params;
  return (
      <Query query={GET_USER} variables={{ id }}>
      {({ data, loading, error }) => {
        if(loading) return <Spinner />
        if(error) return <Error error={error}/>
        const { User } = data;
        console.log(User)
          return (
            <div>
                {User.tickets.map(ticket => {
                    console.log(ticket.game)
                    return (
                        <div key={ticket.id}>
                        <UserGames game={ticket.game} />
                            <span>{ticket.game.opponent}</span>
                        </div>
                    )
                })}
            </div>
          )
      }}
      </Query>
  )
}
export default withRouter(NewUserInfo);