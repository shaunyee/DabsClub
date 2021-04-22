import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { ALL_GAMES_NOT_ME, CREATE_TRADE, GET_USER, GET_GAME, GAME_ONE_PENDING, GAME_TWO_PENDING, LOG_TRADE_REQUEST } from '../../queries';
import Spinner from '../UI/Spinner';
import Error from '../../Utilities/Error';
import Form from '../../Styles/Form';
import { formatDate } from '../../Utilities/formatDate';

class TradeForGames extends Component {
    state = {
        tradeTo: '',
        requested: false,
        tradeFrom: this.props.session.user.id,
        usersIds : [this.props.session.user.id],
        gamesIds: [this.props.game.id],
        fromUsername: this.props.session.user.username,
        fromOp: this.props.game.opponent,
        fromGameId: this.props.game.id,
        toGameId: '',
        toOp: '',
        toUsername: '',
        toDate: '',
        status: '',
        modal: false
    }
    handleSubmit =  (event, createTrade, gameTwoPending, gameOnePending, logPriceChange) => {
        event.preventDefault();
        gameTwoPending().then(({ data}) => {

        })
        gameOnePending().then(({ data }) => {

        })
        logPriceChange().then(({ data }) => {

        })
         createTrade().then(({ data }) => {
            this.closeModal();
        })
    }
    initiateTrade = game => {
        const userIds = game.users.map(user => (
            user.id
        ));
        const userName = game.users.map(user => (
            user.username
        ));
        const username = userName.toString();
        const tradeTo = userIds.toString();
        const gameId = game.id.toString();
        const usersIds = [...this.state.usersIds, tradeTo];
        const gamesIds = [...this.state.gamesIds, gameId];
        this.setState({usersIds, 
            tradeTo, 
            gamesIds,
            toOp: game.opponent,
            toGameId: game.id, 
            modal: true, 
            toUsername: username,
            toDate: game.date
        });
    }
    
    closeModal = () => {
        this.setState({modal: false})
    }

  render() {
    const { session } = this.props;
    const { id } = session.user;

    return (
        <Query query={ALL_GAMES_NOT_ME} variables={{ id }}>
        {({data, loading, error }) => {
            if(loading) return <Spinner />
            if(error) return <Error error={error} />
            const { allGames } = data;
            const { modal } = this.state;
            console.log(allGames)
            return (
                <div className="App">
                 <h2>Games to trade for</h2>
                 {modal && <TradeConfirmation session={session} handleSubmit={this.handleSubmit} trade={this.state} closeModal={this.closeModal} myGame={this.props.game}/>}
                    <ul className="game-cards">
                        <table>
                            <tbody>
                            <tr>
                                <th>Opponent</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Ticker Owners</th>
                                <th>Game Page</th>
                                <th>Trade</th>
                            </tr>
                {
                    allGames.map(game => {
                    return (
                        <tr key={game.id}>
    <td>{game.opponent}</td>
    <td>{formatDate(game.date)}</td>
    <td>{game.location}</td>
    <td>${game.price}</td>
    <td>
    {game.users.map(user => {
        return(
        <span key={user.id}>{user.username} </span>
        )
    })}
    </td>
    <td><Link to={`/game/${game.id}`}>Click Here</Link></td>
    <td>
     {game.tradePending ? <button disabled={true} className="color-change" >Trade Pending</button> : <button onClick={() => this.initiateTrade(game)} className="color-change" >Trade</button>}
   </td>
  </tr>
                    )})}
                        </tbody>
                        </table>
                    </ul>
                 </div>
            )}}

        </Query>
    )
  }
}
const TradeConfirmation = ({ session, handleSubmit, closeModal, trade, myGame }) => (
    <Mutation mutation={LOG_TRADE_REQUEST}
    variables={{ type: "New Trade", gameId: myGame.id, fromUser: session.user.username, fromOpponent: myGame.opponent, fromDate: myGame.date, toUser: trade.toUsername, toOpponent: trade.toOp, toDate: trade.toDate }}
    >
    {logPriceChange => (
    <Mutation mutation={GAME_TWO_PENDING} 
    variables={{id: trade.toGameId, tradePending: true}}>
        {gameTwoPending => (
        <Mutation mutation={GAME_ONE_PENDING} 
        variables={{id: myGame.id, tradePending: true}}>
            {gameOnePending => (
        <Mutation 
            mutation={CREATE_TRADE} 
            variables={{ gamesIds: trade.gamesIds, fromGameId: myGame.id, toGameId: trade.toGameId, fromDate: myGame.date, toDate: trade.toDate, requested: true, fromOp: trade.fromOp, toOp: trade.toOp, fromUsername: session.user.username, toUsername: trade.toUsername, tradeFrom: trade.tradeFrom, tradeTo: trade.tradeTo, usersIds: trade.usersIds, status: 'Pending' }}
            refetchQueries={() => [ {query: GET_USER, variables: {id: session.user.id}},  { query: GET_GAME , variables: {id: myGame.id}} ]}
            >
            {(createTrade, { data, loading, error }) => {
                if(error) return <Error error={error} />
                return (
                <div className="modal modal-open">
                    <div className="modal-inner">
                        <div className="modal-content">
                        <h2 style={{color: 'black'}}>Please Confirm Trade Request</h2>
                        <p style={{color: 'black'}}>{session.user.username}: {myGame.opponent} on {myGame.date}</p>
                        <h2 style={{color: 'black'}}>For</h2>
                        <p style={{color: 'black'}}>{trade.toUsername}: {trade.toOp} on {trade.toDate}</p>
                            <Form onSubmit={event => handleSubmit(event, createTrade, gameOnePending, gameTwoPending, logPriceChange)} className="modal-content-inner">
                                        <hr/>
                                        <div className="modal-buttons">
                                        <button type="submit" className="button-primary">Request{loading ? 'ing' : ''} Trade</button>
                                        <button onClick={closeModal}>Cancel</button>
                                        </div>
                            </Form>
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
export default TradeForGames;