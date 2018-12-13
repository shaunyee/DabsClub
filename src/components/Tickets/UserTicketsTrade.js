import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import Error from '../../Utilities/Error';
import { GET_CURRENT_USER, GET_GAME } from '../../queries';

const UserGameDiv = styled.div`
    height: auto;
    width: auto;
    border: 5px solid black;
    overflow-y: scroll;
`;

const UserTradeGames = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 40px;
    margin-top: 5px;
    vertical-align: middle;
    width: auto;
    height: auto;
    border: 2px solid #f7c640;
    background-color: #006bb8;
    .hide{
        display: none;
    }
`;

const TicketList = styled.p`
    font-size: 20px;
    text-align: center;
    border: 2px solid #f7c640;
    width: auto;
`;

class UserTicketsTrade extends Component {
    state = {
        ticketIds: []
    };

    addTicket = (event) => {
        const checkbox = event.target;
        let updatedTickets = [...this.state.ticketIds];
        if(checkbox.checked) {
            updatedTickets.push(checkbox.value);
        } else {
            updatedTickets = updatedTickets.filter(ticketIds => ticketIds !== checkbox.value)
        }
        this.setState({
            ticketIds: updatedTickets
        })
        this.props.setUserTickets(updatedTickets);
    };

    cancelSelections = () => {
        this.setState({ticketIds: []});
        this.props.cancelSelection()
    }
  render() {
      const { session, setUserGameData } = this.props;
    return (
    <Query query={GET_CURRENT_USER}>
            {({ data, loading, error }) => {
                if(loading) return null
                if(error) return <Error error={error} />
                const { user } = data;
                return (
                    <UserGameDiv>
                        <h3 style={{color: `black`}}>Your Games</h3>
                    {
                        user.games.map(game => (
                            <UserTradeGames key={game.id}>
                                <ul>
                                    {game.opponent}
                                    <UserTicketsList 
                                    game={game} 
                                    session={session} 
                                    tickets={this.state.ticketIds} 
                                    addTickets={this.addTicket} 
                                    cancelSelections={this.cancelSelections} 
                                    setUserGameData={setUserGameData}
                                    />
                                </ul>
                            </UserTradeGames>
                        ))
                    }
                    </UserGameDiv>
                )
            }}
        </Query>
    )
  }
};

class UserTicketsList extends Component {
    state ={
        showTickets: false
    };
    displayTickets = (Game) => {
        if(this.state.showTickets === false) {
            this.setState({showTickets: true});
            this.setGame(Game)
        } else {
            this.setState({showTickets: false});
            this.props.cancelSelections();
        }
    }
    setGame = game => {
        this.props.setUserGameData(game);
    }
    render(){
        const {game, session, addTickets} = this.props;
        const {showTickets} = this.state;
        return(
            <Query query={GET_GAME} variables={{id: game.id}}>
            {({data, loading, error}) => {
                if(loading) return null
                if(error) return <Error error={error} />
                const {Game} = data;
                const userTickets = Game.tickets.filter(ticket => ticket.user.id === session.user.id);
                return(
                 <div>
                    {userTickets.map(ticket => {
                        return(
                            <div key={ticket.id}>
                                {showTickets && 
                                <TicketList>
                                    <input type="checkbox" value={ticket.id} onChange={addTickets}/>
                                    <label htmlFor="">
                                        Sec 106, Seat {ticket.seatNumber}
                                    </label>
                                </TicketList>}
                            </div>
                        )
                    })}
                    {/* {showTickets ? this.setGame(Game) : null} */}
                    {!showTickets ? <button onClick={() => this.displayTickets(Game)}>Your Tickets</button> : <button onClick={this.displayTickets}>Cancel</button>}
                 </div>   
                )
            }}

        </Query>
        )
    }
}


export default UserTicketsTrade;