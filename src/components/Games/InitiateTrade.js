import React, { Component } from 'react';

import TradeTickets from '../Tickets/TradeTickets';


export default class InitiateTrade extends Component {
    state ={
    openModal: false
    };

    closeModal = () => {
        this.setState({ openModal: false})
    }
  render() {
      const {session, game } = this.props;
    return (
        <div>
            <button onClick={() => this.setState({openModal: true})}>Trade This Game</button>
            {this.state.openModal && <TradeTickets session={session} game={game} closeModal={this.closeModal}/>}
        </div>
    )
  }
}
