import React from 'react';
import { Mutation } from 'react-apollo';
import { ACCECPT_TRADE, SWAP_GAMES, GET_USER, TRADE_STATUS_ACCEPTED, TRADE_STATUS_REJECTED, ALL_GAMES_NOT_ME } from '../../queries';




const makeTrade = async (acceptTrade, swapGames, statusChange) => {
    try{
    await acceptTrade().then(({ data }) => {
        console.log(data);
   });
    await swapGames().then(({ data }) => {
        console.log(data);
    });
    await statusChange().then(({ data }) => {

    })
    } catch(e) {
        console.log(e);
    }
}

const rejectTrade = async (statusChange) => {
    await statusChange().then(({ data }) => {
        
    })
};

const TradeConfirmation = ({trade, session}) => {
    const userRequestedTrade = trade.tradeFrom === session.user.id;
    return (
        <Mutation
        mutation={TRADE_STATUS_ACCEPTED} 
        variables={{ id: trade.id, status:'Traded'}}
        refetchQueries={() => [{query: GET_USER, variables: {id: session.user.id}}]}
        >
            {statusAccepted => (
            <Mutation 
            mutation={SWAP_GAMES} 
            variables={{ id: trade.fromGameId, usersIds: [trade.tradeTo]}}
            >
                {(swapGames) => (
                <Mutation 
                mutation={ACCECPT_TRADE} 
                variables={{ id: trade.toGameId, usersIds: [trade.tradeFrom]}}
                >
                {(acceptTrade) => (
                    <Mutation mutation={TRADE_STATUS_REJECTED} 
                    variables={{ id: trade.id, status: 'Rejected'}}
                    refetchQueries={() => [{query: GET_USER, variables: {id: session.user.id}}, {query: ALL_GAMES_NOT_ME, variables: {id: session.user.id}}]}
                    >
                    {statusRejected => (
                        <div>
                            {!userRequestedTrade && <button onClick={() => makeTrade(acceptTrade, swapGames, statusAccepted)} className="button-primary">Accept Trade</button>}
                            <button onClick={() => rejectTrade(statusRejected)} className="button-primary">Reject Trade</button>
                        </div>
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