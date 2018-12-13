import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '../../Utilities/formatDate';

 const GamesTableView = ({ game }) => {
   const price = game.tickets.map(ticket => (
     ticket.price
   ));
   const totalPrice = price.reduce((sum, price) => (
     sum + price
   ),0);
    const avgTicketPrice = Math.ceil(totalPrice/4);
  return (
  <tr>
    <td>{game.opponent}</td>
    <td>{formatDate(game.date)}</td>
    <td>${avgTicketPrice || 0}</td>
    <td>{game.status}</td>
    {game.tickets.map(ticket => {
        return(
          <Fragment key={ticket.seatNumber}>
            <td>
                <strong>Seat # {ticket.seatNumber}</strong>
                <p><strong>Owner: {ticket.user.username}</strong></p>
            </td>
            <td>
                <p><strong>${ticket.price}</strong> </p>
                <p><strong>{ticket.status}</strong></p>
            </td>
          </Fragment>
        )
    })}
    <td><Link to={`/game/${game.id}`}>Click Here</Link></td>
  </tr>
  )
}
export default GamesTableView;