import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { GET_GAME, UPDATE_GAME, LOG_PRICE_CHANGE, FEED_QUERY } from '../../queries';
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
        status: 'For Sale',
        modal: false
    }
    handleSubmit = (event, updateGame, logPriceChange) => {
        event.preventDefault();
        logPriceChange().then(({ data }) => {

        })
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
                const ticketOwner = userIds.includes(session.user.id);
                const pending = Game.tradePending
                return (
                    <div className="App">
                    {modal && <EditGameModal handleSubmit={this.handleSubmit} game={this.state} closeModal={this.closeModal} handleChange={this.handleChange} session={session}/>}
                        <p>Opponent: <strong>{Game.opponent}</strong></p>
                        <p>Date: <strong>{formatDate(Game.date)}</strong></p>
                        <p>Location: <strong>{Game.location}</strong></p>
                        <p>Current Listing Price: <strong>${Game.price}</strong></p>
                        <p>Status <strong>{Game.status}</strong></p>
                        <p>Ticket Holders</p>
                        {Game.users.map(user => (
                            <h1 key={user.id}>{user.username}</h1>
                        ))
                        }
                        {ticketOwner && <button onClick={() => this.loadGame(Game)}>Update Price/Staus</button>}
                        {ticketOwner && pending ? <button disabled={true}>Trade Currently Pending</button> : <InitiateTrade game={Game} session={session}/>}
                    </div>
                )}}
        </Query>
    )
  }
}

const EditGameModal = ({ handleSubmit, handleChange, closeModal, game, session }) => (
    <Mutation mutation={LOG_PRICE_CHANGE} 
    variables={{type: 'Price', price: game.price, gameStatus: game.status, gameId: game.id, fromUser: session.user.username, fromOpponent: game.opponent, fromDate: game.date }}
    refetchQueries={() => [
            { query: FEED_QUERY }
        ]}>
    {logPriceChange => (
    <Mutation 
        mutation={UPDATE_GAME} 
        variables={{ id: game.id, opponent: game.opponent, location: game.location, date: game.date, usersIds: game.usersIds, price: game.price, status: game.status }}
        refetchQueries={() => [
            { query: GET_GAME , variables: {id: game.id}}
        ]}
        >
        {updateGame => {
            return (
            <div className="modal modal-open">
                <div className="modal-inner">
                    <div className="modal-content">
                        <form className="form" onSubmit={event => handleSubmit(event, updateGame, logPriceChange)} className="modal-content-inner">
                            <h1 style={{color: 'black'}}>Update Price</h1>
                            <input type="number" name="price" required defaultValue={game.price} onChange={handleChange} />
                            <select name="status" defaultValue={game.status} onChange={handleChange}>
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
    )}              
    </Mutation>
)
export default withRouter(Game);