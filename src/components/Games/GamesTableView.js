import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '../../Utilities/formatDate';

 const GamesTableView = ({ game }) => {
  return (
  <tr>
    <td>{game.opponent}</td>
    <td>{formatDate(game.date)}</td>
    <td>{game.location}</td>
    <td>${game.price}</td>
    <td>{game.status}</td>
    <td>
    {game.users.map(user => {
        return(
        <span key={user.id}>{user.username} </span>
        )
    })}
    </td>
    <td><Link to={`/game/${game.id}`}>Click Here</Link></td>
  </tr>
  )
}
export default GamesTableView;