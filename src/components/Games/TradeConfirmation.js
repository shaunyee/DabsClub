import React from 'react';
import { Mutation } from 'react-apollo';
import { 
    ACCECPT_TRADE, 
    SWAP_GAMES, 
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




const makeTrade = async (acceptTrade, swapGames, statusChange, logTradeAccepted) => {
    try{
    await acceptTrade().then(({ data }) => {
        console.log(data);
   });
    await swapGames().then(({ data }) => {
        console.log(data);
    });
    await logTradeAccepted().then(({ data }) => {

    })
    await statusChange().then(({ data }) => {

    })
    } catch(e) {
    }
}

const rejectTrade = async (statusChange, gameTwoPending, gameOnePending, logTradeRejected) => {
    await statusChange().then(({ data }) => {
        
    })
    await gameTwoPending().then(({ data }) => {

    })
    await gameOnePending().then(({ data }) => {

    })
    await logTradeRejected().then(({ data }) => {
        
    })
};

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
                    mutation={SWAP_GAMES} 
                    variables={{ id: trade.fromGameId, usersIds: [trade.tradeTo], tradePending: false}}
                    >
                        {(swapGames) => (
                        <Mutation 
                        mutation={ACCECPT_TRADE} 
                        variables={{ id: trade.toGameId, usersIds: [trade.tradeFrom], tradePending: false}}
                        refetchQueries={() => [{query: GET_USER, variables: {id: session.user.id}}, {query: ALL_GAMES_NOT_ME, variables: {id: session.user.id}}]}
                        >
                        {(acceptTrade) => (
                            <Mutation mutation={TRADE_STATUS_REJECTED} 
                            variables={{ id: trade.id, status: 'Rejected'}}
                            refetchQueries={() => [{query: GET_USER, variables: {id: session.user.id}}, {query: ALL_GAMES_NOT_ME, variables: {id: session.user.id}}]}
                            >
                            {statusRejected => (
                                <div>
                                    {!userRequestedTrade && <button onClick={() => makeTrade(acceptTrade, swapGames, statusAccepted, logTradeAccepted)} className="button-primary">Accept Trade</button>}
                                    <button onClick={() => rejectTrade(statusRejected, gameOnePending, gameTwoPending, logTradeRejected)} className="button-primary">Reject Trade</button>
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
         )}   
        </Mutation>
    )
}
export default TradeConfirmation;