import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';


import { 
    GET_GAME, 
    UPDATE_GAME, 
    LOG_PRICE_CHANGE, 
    FEED_QUERY,
    UPDATE_TICKET_PRICE,
    UPDATE_TICKET_2,
    UPDATE_TICKET_3,
    UPDATE_TICKET_4,
} from '../../queries';
import Spinner from '../UI/Spinner';
import Error from '../../Utilities/Error';
import { formatDate } from '../../Utilities/formatDate';
import InitiateTrade from './InitiateTrade';
import UserTickets from '../Tickets/UserTickets';
import {teams} from '../../teams';


const TicketInfo = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr ;
`;
const initState= {
    price: '',
    status: 'For Sale',
    modal: false,
    ticketIds: []
}

const GameInfo = styled.div`
    width: 100%;
    display: block;
    height: 500px;
  img {
    width: 30%;
    vertical-align: middle;
    @media (max-width: 767px) {
    width: 100%;
  }
  }
     div {
    display: inline;
    @media (max-width: 767px) {
        display: block;
  }
  }
`;
class Game extends Component {
    state= {...initState}
    handleTicketUpdates =(event, updateTicketPrice, updateTicket2, updateTicket3, updateTicket4) => {
        event.preventDefault();
        if(this.state.ticketIds.length === 1){
            updateTicketPrice().then(({ data }) => {
                this.resetForm();
                this.closeModal();
                this.setState({...initState});
            });
        };
        if(this.state.ticketIds.length === 2) {
        updateTicketPrice().then(({ data }) => {
        })
        updateTicket2().then(({ data }) => {
            this.resetForm();
            this.closeModal();
            this.setState({...initState});
        });
    };
    if(this.state.ticketIds.length === 3) {
        updateTicketPrice().then(({ data }) => {
        })
        updateTicket2().then(({ data }) => {
        });
        updateTicket3().then(({ data }) => {
            this.resetForm();
            this.closeModal();
            this.setState({...initState});
        });
    }
    if(this.state.ticketIds.length === 4) {
        updateTicketPrice().then(({ data }) => {
        })
        updateTicket2().then(({ data }) => {
        });
        updateTicket3().then(({ data }) => {
        });
        updateTicket4().then(({ data }) => {
            this.resetForm();
            this.closeModal();
            this.setState({...initState});
        });
    };
}

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
    };

    handleChange = event => {
        const { name, value, type } = event.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({
          [name]: val
        })
      };

      resetForm = () => {
        document.getElementById("updateAllPrices").reset();
    };

      closeModal = () => {
        this.setState({ modal: false })
    };

  render() {
    const { modal } = this.state;
    const { match, session } = this.props;
    const allTeams = teams.league.standard;
    return (
        <Query query={GET_GAME} variables={{ id: match.params.id }}>
            {({ data, loading, error}) => {
                if(loading) return <Spinner />
                if(error) return <Error error={error} />
                const { Game } = data;
                const userIds = Game.users.map(user => (
                    user.id
                ))
                const ticketOwner = userIds.includes(session.user.id);
                const pending = Game.tradePending
                const userTickets = Game.tickets.filter(ticket => ticket.user.id === session.user.id);
                const notOnlyOwner = userIds.length > 1;
                const team = allTeams.filter(team => team.fullName === Game.opponent);
                const triCode = team[0].tricode.toLocaleLowerCase();
                const NBALogoUrl = `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${triCode}.png`
                return (
                    <div className="App">
                        <GameInfo>
                            <h1>{Game.opponent}</h1>
                            <img src={`${NBALogoUrl}`} alt=""/>
                        </GameInfo>
                            <p>Date: <strong>{formatDate(Game.date)}</strong></p>
                            <p>Ticket Holders</p>

                            {ticketOwner && <button onClick={() => this.setState({modal: true})}>Update All Tickets</button>}
                            {modal && <EditAllTicketModal game={Game} handleChange={this.handleChange} addTicket={this.addTicket} tickets={userTickets} state={this.state} handleSubmit={this.handleTicketUpdates} session={session} closeModal={this.closeModal}/>}
                        <TicketInfo>
                            {Game.tickets.map(ticket => (
                                    <UserTickets key={ticket.id} ticket={ticket} game={Game} session={session}/>
                            ))
                            }
                        </TicketInfo>
                            {!ticketOwner || notOnlyOwner ? <InitiateTrade game={Game} session={session}/> : null}
                    </div>
                )}}
        </Query>
    )
  }
}


const EditAllTicketModal = ({tickets, state, game, session, handleChange, closeModal, handleSubmit, addTicket  }) => (
    <Mutation 
    mutation={UPDATE_TICKET_4}
    variables={{ id: state.ticketIds[3], price: state.price, status: state.status}}
    refetchQueries={() => [
            { query: GET_GAME , variables: {id: game.id}}
        ]}
        >
        {updateTicket4 => (
        <Mutation 
        mutation={UPDATE_TICKET_3}
        variables={{ id: state.ticketIds[2], price: state.price, status: state.status}}
        refetchQueries={() => [
                { query: GET_GAME , variables: {id: game.id}}
            ]}
            >
            {updateTicket3 => (
            <Mutation 
            mutation={UPDATE_TICKET_2}
            variables={{ id: state.ticketIds[1], price: state.price, status: state.status}}
            refetchQueries={() => [
                    { query: GET_GAME , variables: {id: game.id}}
                ]}
                >
                {updateTicket2 => (
                    <Mutation 
                        mutation={UPDATE_TICKET_PRICE} 
                        variables={{ id: state.ticketIds[0], price: state.price, status: state.status}}
                        refetchQueries={() => [
                            { query: GET_GAME , variables: {id: game.id}}
                        ]}
                        >
                        {updateTicketPrice => {
                            return (
                            <div className="modal modal-open">
                                <div className="modal-inner">
                                    <div className="modal-content">
                                        <form className="form" id="updateAllPrices" onSubmit={(event) => handleSubmit(event, updateTicketPrice,updateTicket2, updateTicket3, updateTicket4)}>
                                            <h1 style={{color: 'black'}}>Update Prices</h1>
                                                <input type="number" name="price" placeholder="0" onChange={handleChange}/>
                                                <h3 style={{color: 'black'}}>Select Tickets To Update</h3>
                                            {tickets.map(ticket => (
                                                    <label style={{color: 'black'}}  htmlFor={ticket.seatNumber} key={ticket.id}>
                                                    Section 106, Seat {ticket.seatNumber}
                                                    <input type="checkbox" value={ticket.id} id={ticket.id} onChange={addTicket}/>
                                                    </label>
                                            ))}
                                            <h3 style={{color: 'black'}}>Ticket Status</h3>
                                                    <select name="status" onChange={handleChange}>
                                                        <option value="For Sale">For Sale</option>
                                                        <option value="Not For Sale">Not For Sale</option>
                                                        <option value="Sold">Sold</option>
                                                    </select>
                                                    <hr/>
                                                    <div className="modal-buttons">
                                                    <button type="submit" className="button-primary">Update</button>
                                                    <button onClick={closeModal}>Cancel</button>
                                                    </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}}
                    </Mutation>
                )}
                </Mutation>
                )}
            </Mutation>
        )}
        </Mutation>
)

export default withRouter(Game);