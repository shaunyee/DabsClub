import React, { Component } from 'react';
import {Mutation} from 'react-apollo';

import {
  SWAP_GAME1, 
  SWAP_GAME2, 
  TICKET_FROM1_PENDING,
  TICKET_FROM2_PENDING,
  TICKET_FROM3_PENDING,
  TICKET_FROM4_PENDING,
  TICKET_TO1_PENDING,
  TICKET_TO2_PENDING,
  TICKET_TO3_PENDING,
  TICKET_TO4_PENDING,
  TRADE_STATUS_ACCEPTED
} from '../../queries';


class AcceptTrade extends Component {
  acceptTrade = (statusAccepted) => {
    console.log("trade Accepted")
  }
  render(){
    const {trade, session} = this.props;
    console.log(trade)
    return(
      <Mutation 
      mutation={TRADE_STATUS_ACCEPTED} 
      variables={{id: trade.id, status: "Accepted"}}>
      {statusAccepted => {
        return (
          <div>
            <button onClick={() => this.acceptTrade(statusAccepted)}>Accept Trade</button>
          </div>
        )}}
      </Mutation>
    )
  }
}
export default AcceptTrade;