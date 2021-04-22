import React, { Component } from 'react';

import TradeForGames from './TradeForGames'


export default class InitiateTrade extends Component {
    state ={
    showGames: false
    };
  render() {
      const {session, game } = this.props;
    return (
        <div>
            <button onClick={() => this.setState({showGames: !this.state.showGames})}>Trade This Game</button>
            {this.state.showGames && <TradeForGames session={session} game={game}/>}
        </div>
    )
  }
}
