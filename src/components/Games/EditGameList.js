import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import styled from 'styled-components';

import { ALL_GAMES, UPDATE_GAME, GET_ALL_USERS, DELETE_GAME, ALL_GAMES_NOT_ME } from '../../queries';
import Form from '../../Styles/Form';
import Error from '../../Utilities/Error';
import Spinner from '../UI/Spinner';
import { valueFormatDate, formatDate } from '../../Utilities/formatDate';


const Checkbox = styled.input`
{
    position: relative;
    width: 80px;
    height: 40px;
    -webkit-appearance: none; 
    background: #c6c6c6;
    outline: none;
    border-radius: 20px;
    box-shadow: inset 0 0 5px rgba(0,0,0,.2)
}
:checked {
        background: #03a9f4;
    }
    :before {
        content: '';
        position: absolute;
        width: 50px;
        height: 40px;
        border-radius: 20px;
        top: 0;
        left: 0;
        background: #fff;
        transform: scale(1.1);
        box-shadow: 0 2px 5px rgba(0,0,0,.2);
        transition: .5s
    }
    &:checked:before {
        left: 450px;
    }
    `;
    const Label = styled.label`
        width: 30px;
    `;


class EditGameList extends Component {
    state= {
        id: '',
        opponent: '',
        location: 'Home',
        date: '',
        usersIds: [],
        price: 0,
        modal: false
    }

    handleSubmit = (event, updateGame) => {
        event.preventDefault();
     updateGame().then(({ data }) => {
            this.closeModal();
        });
    };
    handleDelete = (deleteGame) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this game?');
    if(confirmDelete) {
        deleteGame().then(({ data }) => {
        })
    }
    }
    

    handleChange = event => {
        const { name, value, type } = event.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({
          [name]: val
        })
      };
      

      loadGame = game => {
          const usersIds = game.users.map(user => (
              user.id
          ));
          const date = formatDate(game.date)

        this.setState({ ...game, date, usersIds ,modal: true })
      };

      addUser = event => {
        const checkbox = event.target;
        let updatedUser = [...this.state.usersIds];
        if(checkbox.checked) {
            updatedUser.push(checkbox.value);
        } else {
            updatedUser = updatedUser.filter(userid => userid !== checkbox.value)
        }
        this.setState({
            usersIds: updatedUser
        }) 
        };

      closeModal = () => {
          this.setState({ modal: false })
      };

  render() {
      const { modal } = this.state;

      return (
          <Query query={GET_ALL_USERS}>
            {({ data, loading, error }) => {
                if(loading) return <Spinner />
                if(error) return <Error error={error} />
                const {allUsers} = data;
                return(
          <Query query={ALL_GAMES}>
        {({data, loading, error}) => {
            if(loading) return <Spinner />
            if(error) return <Error error={error} />
            const { allGames } = data;
            const { session } = this.props;
            return(
                <div className="App">
                {modal && <EditGameModal users={allUsers} session={session} handleSubmit={this.handleSubmit} game={this.state} closeModal={this.closeModal} handleChange={this.handleChange} addUser={this.addUser} />}
                    <h1>Game Editor</h1>
                    <p>Current Listing of Games</p>
                    <ul className="game-cards">
                    {allGames.map(game => {
                        return(
                         <div className="card" key={game.id}>
                             <h1>{game.opponent}</h1>
                             <div className="game-card-text">
                                 <h4>Date:</h4>
                                 <p>{formatDate(game.date)}</p>
                                 <h4>Price</h4>
                                 <p>${game.price}</p>
                                 <Mutation 
                                 mutation={DELETE_GAME} 
                                 variables={{id: game.id}} 
                                 refetchQueries={() => [
                                     {query: ALL_GAMES}
                                 ]}
                                 update={(cache, { data: { deleteGame }}) => {
                            const { allGames } = cache.readQuery({
                                query: ALL_GAMES
                            });
                            cache.writeQuery({
                                query: ALL_GAMES,
                                data: {
                                    allGames: allGames.filter(game => game._id !== deleteGame._id)
                                }
                            })
                        }}
                                 >
                                 {(deleteGame, attrs = {}) => {

                                return (
                                    <div>
                                    <button onClick={() => this.loadGame(game)} className="button-primary">Update</button>
                                        <button
                                        className="delete-button"
                                        onClick={() => this.handleDelete(deleteGame)}
                                        >
                                        {attrs.loading ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                    )
                                    }}
                                 </Mutation>
                                <div>
                                    
                                </div>
                             </div>
                         </div>
                        )})}
                    </ul>
                </div>
            )
        }}
        </Query>
                )}}
          </Query>
    )
  }
}

const EditGameModal = ({ addUser, session, users, handleSubmit, handleChange, closeModal, game }) => (
    <Mutation 
        mutation={UPDATE_GAME} 
        variables={{ id: game.id, opponent: game.opponent, location: game.location, date: game.date, usersIds: game.usersIds, price: game.price }}
        refetchQueries={() => [
            { query: GET_ALL_USERS}, {query: ALL_GAMES }, {query: ALL_GAMES_NOT_ME, variables: {id: session.user.id}}
        ]}
        >
        {updateGame => {
            return (
            <div className="modal modal-open">
                <div className="modal-inner">
                    <div className="modal-content">
                        <Form onSubmit={event => handleSubmit(event, updateGame)} className="modal-content-inner">
                            <h4>Edit Game</h4>
                            <input type="text" name="opponent" defaultValue={game.opponent} onChange={handleChange}/>
                            <input type="date" name="date" defaultValue={valueFormatDate(game.date)} onChange={handleChange}/>
                            <input type="number" name="price" defaultValue={game.price} onChange={handleChange} />
                                <select type="text" name="location" defaultValue={game.location} onChange={handleChange}>
                                    <option value="Home">Home</option>
                                    <option value="Away">Away</option>
                                </select>
                                    {users.map(user =>(
                                    <Label style={{color: 'black'}} key={user.id} htmlFor={user.username}>
                                        {user.username}
                                        <Checkbox 
                                            id={user.id}
                                            type="checkbox"
                                            defaultChecked={game.usersIds.includes(user.id)}
                                            value={user.id}
                                            onChange={addUser}
                                        />
                                    </Label>

                                    ))}
                                    <hr/>
                                    <div className="modal-buttons">
                                    <button type="submit" className="button-primary">Update</button>
                                    <button onClick={closeModal}>Cancel</button>
                                    </div>
                        </Form>
                    </div>
                </div>
            </div>
        )}}
     </Mutation>
)

export default EditGameList;