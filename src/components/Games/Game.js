import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { GET_GAME, UPDATE_GAME } from '../../queries';
import Spinner from '../UI/Spinner';
import Error from '../../Utilities/Error';
import { formatDate } from '../../Utilities/formatDate';
import Form from '../../Styles/Form'
import InitiateTrade from './InitiateTrade';


class Game extends Component {
    state= {
        id: '',
        opponent: '',
        location: 'Home',
        date: '',
        usersIds: [],
        price: 0,
        modal: false
    }
    handleSubmit = (event, updateGame) => {
        event.preventDefault();
     updateGame().then(({ data }) => {
            this.closeModal();
        });
    };

    loadGame = Game => {
        const usersIds = Game.users.map(user => (
            user.id
        ));
        const date = formatDate(Game.date)

      this.setState({ ...Game, date, usersIds ,modal: true })
    };

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
    const { modal } = this.state;
    const { match, session } = this.props;
    return (
        <Query query={GET_GAME} variables={{ id: match.params.id }}>
            {({ data, loading, error}) => {
                if(loading) return <Spinner />
                if(error) return <Error error={error} />
                const { Game } = data;
                const userIds = Game.users.map(user => (
                    user.id
                ))
                const ticketOwner = userIds.includes(session.user.id)
                return (
                    <div className="App">
                    {modal && <EditGameModal handleSubmit={this.handleSubmit} game={this.state} closeModal={this.closeModal} handleChange={this.handleChange} />}
                        <p>Opponent: <strong>{Game.opponent}</strong></p>
                        <p>Date: <strong>{formatDate(Game.date)}</strong></p>
                        <p>Location: <strong>{Game.location}</strong></p>
                        <p>Current Listing Price: <strong>${Game.price}</strong></p>
                        <p>Ticket Holders</p>
                        {Game.users.map(user => (
                            <h2 key={user.id}>{user.username}</h2>
                        ))
                        }
                        {ticketOwner && <button onClick={() => this.loadGame(Game)}>Update Price</button>}
                        <InitiateTrade game={Game} session={session}/>
                    </div>
                )}}
        </Query>
    )
  }
}

const EditGameModal = ({ handleSubmit, handleChange, closeModal, game }) => (
    <Mutation 
        mutation={UPDATE_GAME} 
        variables={{ id: game.id, opponent: game.opponent, location: game.location, date: game.date, usersIds: game.usersIds, price: game.price }}
        refetchQueries={() => [
            { query: GET_GAME , variables: {id: game.id}}
        ]}
        >
        {updateGame => {
            return (
            <div className="modal modal-open">
                <div className="modal-inner">
                    <div className="modal-content">
                        <Form onSubmit={event => handleSubmit(event, updateGame)} className="modal-content-inner">
                            <h4>Update Price</h4>
                            <input type="number" name="price" required defaultValue={game.price} onChange={handleChange} />
                                    <hr/>
                                    <div className="modal-buttons">
                                    <button type="submit" className="button-primary">Update</button>
                                    <button onClick={closeModal}>Cancel</button>
                                    </div>
                        </Form>
                    </div>
                </div>
            </div>
        )}}
     </Mutation>
)
export default withRouter(Game);