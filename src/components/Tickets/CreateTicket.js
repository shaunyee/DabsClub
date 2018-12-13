import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';

import { CREATE_TICKET, GET_ALL_USERS, ALL_GAMES} from '../../queries';
import Form from '../../Styles/Form';
import Error from '../../Utilities/Error';
import Spinner from '../UI/Spinner';

class CreateTicket extends Component {
  state = {
    gameId: '',
    userId: '',
    seatNumber: ''
  };

  handleSubmit = async (event, createTicket) => {
    event.preventDefault();
    await createTicket().then(({ data }) => {
      this.resetForm();
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  };

  resetForm = () => {
    document.getElementById("createTicket").reset();
    this.setState({
      gameId: '',
      userId: '',
      seatNumber: ''
    })
  }
  render() {
    const { gameId, userId, seatNumber } = this.state;
    return (
      <Mutation 
      mutation={CREATE_TICKET} 
      variables={{ gameId, userId, seatNumber }}>
      {createTicket => (
      <Query query={GET_ALL_USERS}>
        {({ data, loading, error }) => {
          if(loading) return <Spinner />
          if(error) return <Error error={error} />
          const { allUsers } = data;
          return (
            <Query query={ALL_GAMES}>
            {({ data, loading, error }) => {
              if(loading) return <Spinner />
              if(error) return <Error error={error} />
              const { allGames } = data;
              return (
              <div className="App">
                <div className="form">
                  <Form id="createTicket" onSubmit={event => this.handleSubmit(event, createTicket)}>
                    <select name="seatNumber" type="text" onChange={this.handleChange}>
                    <option key="default">Seat Number</option>
                      <option value="5">Seat: 5</option>
                      <option value="6">Seat: 6</option>
                      <option value="7">Seat: 7</option>
                      <option value="8">Seat: 8</option>
                    </select>
                    <select type="text" name="gameId" onChange={this.handleChange}>
                        <option key="default">Link to a game</option>
                      {allGames.map(game => {
                        return (
                        <option key={game.id} value={game.id}>{game.opponent} {game.date}</option>
                        )
                      })}
                    </select>
                      <select name="userId" type="text" onChange={this.handleChange}>
                        <option value="default">Add An Owner</option>
                        {allUsers.map(user => (
                          <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                      </select>
                    <button type="submit" className="button-primary">Add Ticket</button>
                  </Form>
                </div>
              </div>
              )}}
            </Query>
          )
        }}
      </Query>
      )}
      </Mutation>
    )
  }
}
export default CreateTicket;