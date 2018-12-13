import React from 'react';
import { Mutation } from 'react-apollo';
import { 
    SWAP_GAME1, 
    SWAP_GAME2, 
    GET_USER, 
    TRADE_STATUS_ACCEPTED, 
    TRADE_STATUS_REJECTED, 
    ALL_GAMES_NOT_ME, 
    GAME_ONE_PENDING,
    GAME_TWO_PENDING ,
    TRADE_ACCEPTED,
    TRADE_REJECT,
    FEED_QUERY
} from '../../queries';

import RejectTrade from '../Tickets/RejectTrade'
import AcceptTrade from '../Tickets/AcceptTrade';


const makeTrade = async (swapGame1, swapGame2, statusChange, logTradeAccepted) => {
    try{
    await swapGame1().then(({ data }) => {
        console.log(data);
   });
    await swapGame2().then(({ data }) => {
        console.log(data);
    });
    await logTradeAccepted().then(({ data }) => {

    })
    await statusChange().then(({ data }) => {

    })
    } catch(e) {
    }
}

const TradeConfirmation = ({trade, session}) => {
    const userRequestedTrade = trade.tradeFrom === session.user.id;
    return (
        <Mutation mutation={TRADE_REJECT} 
        variables={{type: "Reject Trade", tradeId: trade.id, fromUser: trade.fromUsername, fromOpponent: trade.fromOp, fromDate: trade.fromDate, toUser: trade.toUsername, toOpponent: trade.toOp, toDate: trade.toDate}}
        refetchQueries={() => [{query: FEED_QUERY }]}
        >
         {logTradeRejected => (
        <Mutation mutation={TRADE_ACCEPTED} 
        variables={{type: "Accept Trade", tradeId: trade.id, fromUser: trade.fromUsername, fromOpponent: trade.fromOp, fromDate: trade.fromDate, toUser: trade.toUsername, toOpponent: trade.toOp, toDate: trade.toDate}}
        refetchQueries={() => [{query: FEED_QUERY }]}
        >
        {logTradeAccepted => (

        <Mutation mutation={GAME_TWO_PENDING} variables={{ id: trade.toGameId, tradePending: false }}>
            {gameTwoPending => (
            <Mutation mutation={GAME_ONE_PENDING} variables={{ id: trade.fromGameId, tradePending: false }}>
                {gameOnePending => (
                <Mutation
                mutation={TRADE_STATUS_ACCEPTED} 
                variables={{ id: trade.id, status:'Traded'}}
                refetchQueries={() => [{query: GET_USER, variables: {id: session.user.id}}]}
                >
                    {statusAccepted => (
                    <Mutation 
                    mutation={SWAP_GAME2} 
                    variables={{ id: trade.fromGameId, usersIds: [trade.tradeTo], tradePending: false}}
                    >
                        {(swapGame2) => (
                        <Mutation 
                        mutation={SWAP_GAME1} 
                        variables={{ id: trade.toGameId, usersIds: [trade.tradeFrom], tradePending: false}}
                        refetchQueries={() => [{query: GET_USER, variables: {id: session.user.id}}, {query: ALL_GAMES_NOT_ME, variables: {id: session.user.id}}]}
                        >
                        {(swapGame1) => (
                                <div>
                                    {!userRequestedTrade && <button onClick={() => makeTrade(swapGame1, swapGame2, statusAccepted, logTradeAccepted)} className="button-primary">Accept Trade</button>}
                                    <AcceptTrade trade={trade} session={session}/>
                                    <RejectTrade trade={trade} session={session}/>
                                </div>
                        )}
                        </Mutation>
                        )}
                    </Mutation>
                    )}
                </Mutation>
                )}
            </Mutation>
            )}
        </Mutation>
        )}
        </Mutation>
         )}   
        </Mutation>
    )
}
export default TradeConfirmation;