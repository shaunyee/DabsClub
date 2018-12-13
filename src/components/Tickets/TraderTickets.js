import React, { Component } from 'react';
import {Query} from 'react-apollo';
import styled from 'styled-components';

import Spinner from '../UI/Spinner';
import Error from '../../Utilities/Error';
import { GET_GAME } from '../../queries';

const TraderTicketsDiv = styled.div`
    height: auto;
    width: auto;
    border: 5px solid black;
`;
const TradeTicketStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 40px;
    margin-top: 5px;
    vertical-align: middle;
    width: auto;
    height: 50px;
    border: 2px solid #f7c640;
    background-color: #006bb8;
`;

const TicketList = styled.p`
    font-size: 20px;
`;

const initialState = {
    ticketIds: [],
    showTickets: false
};

export default class TraderTickets extends Component {
    state = {...initialState}

    addTicket = event => {
        const checkbox = event.target;
        let updatedTickets = [...this.state.ticketIds];
        if(checkbox.checked) {
            updatedTickets.push(checkbox.value);
        } else {
            updatedTickets = updatedTickets.filter(ticketIds => ticketIds !== checkbox.value)
        }
        this.setState({
            ticketIds: updatedTickets
        }) 
        this.props.setTraderTickets(updatedTickets);
    };
    showGameTickets = () => {
        this.setState({
            showTickets: !this.state.showTickets
        });
    }

  render() {
      const { game, session } = this.props;
                const {showTickets} = this.state;
                const notMyTickets = game.tickets.filter(ticket => ticket.user.id !== session.user.id);
                return(
                    <TraderTicketsDiv>
                        <h3>{game.opponent} {game.date}</h3>
                        { showTickets && notMyTickets.map(ticket => (
                            <TradeTicketStyle key={ticket.id}>
                            <ul>
                               <TicketList>
                               <input type="checkbox" value={ticket.id} onChange={this.addTicket}/>
                               <label>
                                    Sec 106, seat {ticket.seatNumber}
                               </label>
                               </TicketList> 
                            </ul>
                            </TradeTicketStyle>
                        ))
                        }
                        <button onClick={this.showGameTickets}>Show Tickets</button>
                    </TraderTicketsDiv>
                )
  }
}
