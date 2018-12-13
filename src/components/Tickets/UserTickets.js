import React, { Component } from 'react';
import {Query, Mutation } from 'react-apollo';
import styled from 'styled-components';

import { UPDATE_TICKET_PRICE, GET_GAME } from '../../queries';


class UserTickets extends Component {
    state ={
        id: '',
        price: this.props.ticket.price,
        status: this.props.ticket.status,
        modal: false
    }

    handleSubmit = (event, updateTicketPrice) => {
        event.preventDefault();
        updateTicketPrice().then(({ data }) => {
            this.closeModal();
        })
    }

        handleChange = event => {
            const { name, value, type } = event.target;
            const val = type === 'number' ? parseFloat(value) : value;
            this.setState({
              [name]: val
            })
          };

    closeModal = () => {
        this.setState({ modal: false })
    };
  render() {
      const { ticket, game, session } = this.props 
      const { username, id } = ticket.user;
      const ticketOwner = id === session.user.id;
    return (
        <div>
            <div>
                <p>{username}</p>
                <p>Listing Price ${ticket.price}</p>
                <p>Current Status: {ticket.status}</p>
                <p>Section 106, Seat:{ticket.seatNumber}</p>
                {ticketOwner && <button onClick={() => this.setState({ modal: true })}>Update Price</button>}
                {this.state.modal && <EditTicketModal state={this.state} ticket={ticket} game={game} session={session} handleChange={this.handleChange} handleSubmit={this.handleSubmit} closeModal={this.closeModal}/>}
            </div>
      </div>
    )
  }
}

const EditTicketModal = ({ticket, game, session, handleChange, closeModal, handleSubmit, state  }) => (
    <Mutation 
        mutation={UPDATE_TICKET_PRICE} 
        variables={{ id: ticket.id, price: state.price, status: state.status   }}
        refetchQueries={() => [
            { query: GET_GAME , variables: {id: game.id}}
        ]}
        >
        {updateTicketPrice => {
            return (
            <div className="modal modal-open">
                <div className="modal-inner">
                    <div className="modal-content">
                        <form className="form" onSubmit={event => handleSubmit(event, updateTicketPrice)}>
                            <h1 style={{color: 'black'}}>Update Price</h1>
                            <input type="number" name="price" required defaultValue={ticket.price} onChange={handleChange} />
                            <select name="status" defaultValue={ticket.status} onChange={handleChange}>
                                <option value="For Sale">For Sale</option>
                                <option value="Sold">Sold</option>
                                <option value="Not For Sale">Not For Sale</option>
                            </select>}
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
)

export default UserTickets;