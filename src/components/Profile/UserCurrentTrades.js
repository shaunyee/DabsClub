import React, { Component } from 'react';
import '../../Styles/tradeCards.css';
import TradeConfirmation from '../Games/TradeConfirmation';
import { formatDate } from '../../Utilities/formatDate';



class UserCurrentTrades extends Component {
  render() {
      const { trades, session  } = this.props;
    return (
      <div className="grid-container">
        {trades.map(trade => {
            if(trade.status === 'Pending'){
            const userRequestedTrade = trade.tradeFrom === session.user.id;
            return(
            <div key={trade.id}>
                <div className="grid-item">
                <div className="card">
                    <div className="game-header-text">
                {userRequestedTrade ? <h3>Requested to {trade.toUsername}</h3> : <h3>Trade from {trade.fromUsername}</h3>}
                    </div>
                        <div className="game-card-text">
                                <p>{trade.fromUsername}: <strong>{trade.fromOp} {trade.fromDate}</strong></p>
                                <p>for</p>
                                <p>{trade.toUsername}: <strong>{trade.toOp} {formatDate(trade.toDate)}</strong></p>
                                <p>Status: {trade.status}...</p>
                                <TradeConfirmation trade={trade} session={session}/>
                         </div>
                        </div>
                    </div>
                 </div>
                )}
            })}
      </div>
    )
  }
}
export default UserCurrentTrades;