import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import Error from '../../Utilities/Error'
import {
    TRADE_STATUS_REJECTED, 
    TICKET_FROM1_PENDING,
    TICKET_FROM2_PENDING,
    TICKET_FROM3_PENDING,
    TICKET_FROM4_PENDING,
    TICKET_TO1_PENDING,
    TICKET_TO2_PENDING,
    TICKET_TO3_PENDING,
    TICKET_TO4_PENDING,
    GAME_ONE_PENDING,
    GAME_TWO_PENDING
} from '../../queries'

class RejectTrade extends Component {
    cancelTrade = (statusRejected, ticketFrom1Pending, ticketFrom2Pending, ticketFrom3Pending, ticketFrom4Pending, ticketTo1Pending, ticketTo2Pending, ticketTo3Pending, ticketTo4Pending, gameOnePending, gameTwoPending) => {
    if(this.props.trade.tickets.length === 2) {
        statusRejected().then(({data}) => {
        });
        gameOnePending().then(({data}) => {
        });
        gameTwoPending().then(({data}) => {
        });
        ticketFrom1Pending().then(({data}) => {
        });
        ticketTo1Pending().then(({data}) => {
        });
    }if(this.props.trade.tickets.length === 4) {
        statusRejected().then(({data}) => {
        });
        gameOnePending().then(({data}) => {
        });
        gameTwoPending().then(({data}) => {
        });
        ticketFrom1Pending().then(({data}) => {
        });
        ticketTo1Pending().then(({data}) => {
        });
        ticketFrom2Pending().then(({data}) => {
        });
        ticketTo2Pending().then(({data}) => {
        });
    }if(this.props.trade.tickets.length === 6) {
        statusRejected().then(({data}) => {
        });
        gameOnePending().then(({data}) => {
        });
        gameTwoPending().then(({data}) => {
        });
        ticketFrom1Pending().then(({data}) => {
        });
        ticketTo1Pending().then(({data}) => {
        });
        ticketFrom2Pending().then(({data}) => {
        });
        ticketTo2Pending().then(({data}) => {
        });
        ticketFrom3Pending().then(({data}) => {
        });
        ticketTo3Pending().then(({data}) => {
        });
    }if(this.props.trade.tickets.length === 8) {
        statusRejected().then(({data}) => {
        });
        gameOnePending().then(({data}) => {
        });
        gameTwoPending().then(({data}) => {
        });
        ticketFrom1Pending().then(({data}) => {
        });
        ticketTo1Pending().then(({data}) => {
        });
        ticketFrom2Pending().then(({data}) => {
        });
        ticketTo2Pending().then(({data}) => {
        });
        ticketFrom3Pending().then(({data}) => {
        });
        ticketTo3Pending().then(({data}) => {
        });
        ticketFrom4Pending().then(({data}) => {
        });
        ticketTo4Pending().then(({data}) => {
        });
    }
    }
  render() {
      const { trade, sessions } = this.props;
    return (
        <Mutation mutation={GAME_TWO_PENDING} variables={{id: trade.toGameId, tradePending: false}}>
        {gameTwoPending => {
            return(
        <Mutation mutation={GAME_ONE_PENDING} variables={{id: trade.fromGameId, tradePending: false}}>
        {gameOnePending => {
            return(
        <Mutation mutation={TICKET_TO4_PENDING} variables={{id: trade.toTicket4, trading: false}}>
        {ticketTo4Pending => {
            return(
        <Mutation mutation={TICKET_TO3_PENDING} variables={{id: trade.toTicket3, trading: false}}>
        {ticketTo3Pending => {
            return(
        <Mutation mutation={TICKET_TO2_PENDING} variables={{id: trade.toTicket2, trading: false}}>
        {ticketTo2Pending => {
            return(
        <Mutation mutation={TICKET_TO1_PENDING} variables={{id: trade.toTicket1, trading: false}}>
        {ticketTo1Pending => {
            return(
        <Mutation mutation={TICKET_FROM4_PENDING} variables={{id: trade.fromTicket4, trading: false}}>
        {ticketFrom4Pending => {
            return(
        <Mutation mutation={TICKET_FROM3_PENDING} variables={{id: trade.fromTicket3, trading: false}}>
        {ticketFrom3Pending => {
            return(
        <Mutation mutation={TICKET_FROM2_PENDING} variables={{id: trade.fromTicket2, trading: false}}>
        {ticketFrom2Pending => {
            return(
        <Mutation mutation={TICKET_FROM1_PENDING} variables={{id: trade.fromTicket1, trading: false}}>
        {ticketFrom1Pending => {
            return(
        <Mutation mutation={TRADE_STATUS_REJECTED} variables={{id: trade.id, status: 'Rejected'}}>
        {statusRejected => {
            return(
                <div>
                    <button onClick={() => this.cancelTrade(
                    statusRejected, 
                    ticketFrom1Pending,
                    ticketFrom2Pending,
                    ticketFrom3Pending,
                    ticketFrom4Pending,
                    ticketTo1Pending,
                    ticketTo2Pending,
                    ticketTo3Pending,
                    ticketTo4Pending,
                    gameOnePending,
                    gameTwoPending
                    )}>Cancel Trade</button>
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

export default RejectTrade;