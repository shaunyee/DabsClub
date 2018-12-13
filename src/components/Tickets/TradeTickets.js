import React, { Component } from 'react';
import styled from 'styled-components';
import {Mutation} from 'react-apollo';

import UserTicketsTrade from './UserTicketsTrade';
import TraderTickets from './TraderTickets';
import {CREATE_TRADE, 
    GAME_ONE_PENDING, 
    GAME_TWO_PENDING, 
    TICKET_FROM1_PENDING,
    TICKET_FROM2_PENDING,
    TICKET_FROM3_PENDING,
    TICKET_FROM4_PENDING,
    TICKET_TO1_PENDING,
    TICKET_TO2_PENDING,
    TICKET_TO3_PENDING,
    TICKET_TO4_PENDING
} from '../../queries'


const TradeWindow = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 10px;
    height: 400px;
    width: 400px;
    color: black;
`;

class TradeTickets extends Component {
    state ={    
        userTicketIds: [],
        tradeToTicketIds: [],
        usersIds: [],
        ticketsIds: [],
        fromGameId: '',
        toGameId: this.props.game.id,
        fromOp: '',
        toOp: this.props.game.opponent,
        fromUsername: this.props.session.user.username,
        toUsername: '',
        games: [this.props.game.id],
        status: '',
        toDate: this.props.game.date,
        fromDate: '',
        tradeFrom: this.props.session.user.id,
        tradeTo: '',
        fromTicket1: null,
        fromTicket2: null,
        fromTicket3: null,
        fromTicket4: null,
        toTicket1: null,
        toTicket2: null,
        toTicket3: null,
        toTicket4: null,};

    initiateTrade = async (
        createTrade, 
        gameOnePending, 
        gameTwoPending, 
        ticketFrom1Pending,
        ticketFrom2Pending,
        ticketFrom3Pending,
        ticketFrom4Pending,
        ticketTo1Pending,
        ticketTo2Pending,
        ticketTo3Pending,
        ticketTo4Pending,) => {
        const usersIds = [this.state.tradeFrom, this.state.tradeTo];
        const userTickets = [...this.state.userTicketIds];
        const traderTickets = [...this.state.tradeToTicketIds];
        const ticketsIds = userTickets.concat(traderTickets)
        await this.setState({ usersIds, ticketsIds })
        if(this.state.userTicketIds.length === 1) {
            ticketFrom1Pending().then(({data}) => {
            });
            ticketTo1Pending().then(({data}) => {
            });
            gameOnePending().then(({data}) => {
            });
            gameTwoPending().then(({data}) => {
            });
            createTrade().then(({ data }) =>{          
                alert('Trade has been Requested');
                this.handleCloseModal();
            })
        }   if(this.state.userTicketIds.length === 2) {
            ticketFrom1Pending().then(({data}) => {
            });
            ticketFrom2Pending().then(({data}) => {
            });
            ticketTo1Pending().then(({data}) => {
            });
            ticketTo2Pending().then(({data}) => {
            });
            gameOnePending().then(({data}) => {
            });
            gameTwoPending().then(({data}) => {
            });
            createTrade().then(({ data }) =>{          
                alert('Trade has been Requested');
                this.handleCloseModal();
            })
        }   if(this.state.userTicketIds.length  === 3) {
            ticketFrom1Pending().then(({data}) => {
            });
            ticketFrom2Pending().then(({data}) => {
            });
            ticketFrom3Pending().then(({data}) => {
            });
            ticketTo1Pending().then(({data}) => {
            });
            ticketTo2Pending().then(({data}) => {
            });
            ticketTo3Pending().then(({data}) => {
            });
            gameOnePending().then(({data}) => {
            });
            gameTwoPending().then(({data}) => {
            });
            createTrade().then(({ data }) =>{          
                alert('Trade has been Requested');
                this.handleCloseModal();
            })
        }   if(this.state.userTicketIds.length  === 3) {
            ticketFrom1Pending().then(({data}) => {
            });
            ticketFrom2Pending().then(({data}) => {
            });
            ticketFrom3Pending().then(({data}) => {
            });
            ticketFrom4Pending().then(({data}) => {
            });
            ticketTo1Pending().then(({data}) => {
            });
            ticketTo2Pending().then(({data}) => {
            });
            ticketTo3Pending().then(({data}) => {
            });
            ticketTo4Pending().then(({data}) => {
            });
            gameOnePending().then(({data}) => {
            });
            gameTwoPending().then(({data}) => {
            });
            createTrade().then(({ data }) =>{          
                alert('Trade has been Requested');
                this.handleCloseModal();
            })
        }
    }

    setUserTickets = (userTickets) => {
        const updatedUserTickets = [...userTickets]
        this.setState({userTicketIds: updatedUserTickets});
        if(updatedUserTickets.length === 1) {
            this.setState({fromTicket1: updatedUserTickets[0]})
        }if(updatedUserTickets.length === 2) {
            this.setState({fromTicket1: updatedUserTickets[0], fromTicket2:updatedUserTickets[1]})
        } if(updatedUserTickets.length === 3) {
            this.setState({fromTicket1: updatedUserTickets[0], fromTicket2:updatedUserTickets[1], fromTicket3:updatedUserTickets[2]})
        }if(updatedUserTickets.length === 4) {
            this.setState({fromTicket1: updatedUserTickets[0], fromTicket2:updatedUserTickets[1], fromTicket3:updatedUserTickets[2], fromTicket4:updatedUserTickets[3]})
        }
    }
    setTraderTickets = async (userTickets) => {
        const updatedTraderTickets = [...userTickets]
        this.setState({tradeToTicketIds: updatedTraderTickets});
        if(updatedTraderTickets.length === 1) {
            await this.setState({toTicket1: updatedTraderTickets[0]})
            this.setTraderData()
        }if(updatedTraderTickets.length === 2) {
            await this.setState({toTicket1: updatedTraderTickets[0]})
            this.setState({toTicket1: updatedTraderTickets[0], toTicket2:updatedTraderTickets[1]})
            this.setTraderData()
        } if(updatedTraderTickets.length === 3) {
            await this.setState({toTicket1: updatedTraderTickets[0]})
            this.setState({toTicket1: updatedTraderTickets[0], toTicket2:updatedTraderTickets[1], toTicket3:updatedTraderTickets[2]})
            this.setTraderData()
        }if(updatedTraderTickets.length === 4) {
            await this.setState({toTicket1: updatedTraderTickets[0]})
            this.setState({toTicket1: updatedTraderTickets[0], toTicket2:updatedTraderTickets[1], toTicket3:updatedTraderTickets[2], toTicket4:updatedTraderTickets[3]})
            this.setTraderData()
        }
    }
    handleCloseModal = () => {
        this.props.closeModal();
    }
    cancelSelection = () => {
        this.setState({userTicketIds: [], fromTicket1: '', fromTicket2: '', fromTicket3: '', fromTicket4: ''});
    }
    setUserGameData = (game) => {
        const date = game.date;
        const opponent = game.opponent;
        const id = game.id;
        let games = [...this.state.games];
        games.push(id)
        this.setState({games: games, fromOp: opponent, fromDate: date, fromGameId: id});
    }
    setTraderData = () => {
        const gameTicket = this.state.toTicket1;
        const tickets = this.props.game.tickets;
        const ticket = tickets.filter(ticket => ticket.id === gameTicket)
        const username = ticket[0].user.username
        const userId = ticket[0].user.id;
        this.setState({tradeTo: userId, toUsername: username});
    }
  render() {
      const { session, game } = this.props;
      const {userTicketIds, tradeToTicketIds} = this.state;
      const validateUserTickets = userTicketIds.length > 0;
      const validateTraderTickets = tradeToTicketIds.length > 0;
      const validateTrade = validateUserTickets && validateTraderTickets;
    return (
        <Mutation mutation={TICKET_TO4_PENDING} variables={{id: this.state.toTicket4, trading: true}}>
        {ticketTo4Pending => {
            return (
        <Mutation mutation={TICKET_TO3_PENDING} variables={{id: this.state.toTicket3, trading: true}}>
        {ticketTo3Pending => {
            return (
        <Mutation mutation={TICKET_TO2_PENDING} variables={{id: this.state.toTicket2, trading: true}}>
        {ticketTo2Pending => {
            return (
        <Mutation mutation={TICKET_TO1_PENDING} variables={{id: this.state.toTicket1, trading: true}}>
        {ticketTo1Pending => {
            return(
        <Mutation mutation={TICKET_FROM4_PENDING} variables={{id: this.state.fromTicket4, trading: true}}>
        {ticketFrom4Pending => {
            return(
        <Mutation mutation={TICKET_FROM3_PENDING} variables={{id: this.state.fromTicket3, trading: true}}>
        {ticketFrom3Pending => {
            return(
        <Mutation mutation={TICKET_FROM2_PENDING} variables={{id: this.state.fromTicket2, trading: true}}>
        {ticketFrom2Pending => {
            return(
        <Mutation mutation={TICKET_FROM1_PENDING} variables={{id: this.state.fromTicket1, trading: true}}>
        {ticketFrom1Pending => {
            return(
        <Mutation mutation={GAME_TWO_PENDING} variables={{id: this.state.toGameId, tradePending: true}}>
        {gameTwoPending => {
            return(
                <Mutation mutation={GAME_ONE_PENDING} variables={{id: this.state.fromGameId, tradePending: true}}>
                    {gameOnePending => {
                    return(
                <Mutation 
                mutation={CREATE_TRADE}
                variables={{
                        usersIds: this.state.usersIds, 
                        fromGameId: this.state.fromGameId,
                        gamesIds: this.state.games,
                        ticketsIds: this.state.ticketsIds,
                        toGameId: this.state.toGameId, 
                        fromDate: this.state.fromDate, 
                        toDate: this.state.toDate, 
                        tradeFrom: this.state.tradeFrom, 
                        tradeTo: this.state.tradeTo, 
                        fromOp: this.state.fromOp, 
                        toOp:this.state.toOp, 
                        fromUsername: this.state.fromUsername, 
                        toUsername: this.state.toUsername, 
                        status: 'Pending', 
                        fromTicket1: this.state.fromTicket1, 
                        fromTicket2: this.state.fromTicket2,
                        fromTicket3: this.state.fromTicket3,
                        fromTicket4: this.state.fromTicket4, 
                        toTicket1: this.state.toTicket1, 
                        toTicket2: this.state.toTicket2, 
                        toTicket3: this.state.toTicket3, 
                        toTicket4: this.state.toTicket4
                        }}>
                {createTrade => {
                    return (
                        <div className="modal modal-open">
                            <div className="modal-inner">
                                <div className="modal-content">
                                    <TradeWindow>
                                        <UserTicketsTrade session={session} 
                                        setUserTickets={this.setUserTickets} 
                                        cancelSelection={this.cancelSelection}
                                        setUserGameData={this.setUserGameData}
                                        />
                                        <TraderTickets 
                                        game={game} 
                                        session={session} 
                                        tradeToTickets={tradeToTicketIds} 
                                        setTraderTickets={this.setTraderTickets} 
                                        />
                                    </TradeWindow>
                                    <button disabled={!validateTrade} onClick={() => this.initiateTrade(
                                        createTrade, 
                                        gameOnePending, 
                                        gameTwoPending, 
                                        ticketFrom1Pending,
                                        ticketFrom2Pending,
                                        ticketFrom3Pending,
                                        ticketFrom4Pending,
                                        ticketTo1Pending,
                                        ticketTo2Pending,
                                        ticketTo3Pending,
                                        ticketTo4Pending,
                                        )}>
                                        Initiate Trade
                                        </button>
                                <button onClick={this.handleCloseModal}>Cancel</button>
                                </div>
                            </div>      
                        </div>
                     )}}
                    </Mutation>
                    )}}
                </Mutation>
            )}}
        </Mutation>
            )}}
        </Mutation>
            )}}
        </Mutation>
            )}}
        </Mutation>
            )}}
        </Mutation>
            )}}
        </Mutation>
            )}}
        </Mutation>
            )}}
        </Mutation>
            )}}
        </Mutation>
    )
  }
}
export default TradeTickets;