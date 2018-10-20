import React, { Component } from 'react';
import {PassiveListener} from 'react-event-injector';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';

import { CREATE_GAME, GET_ALL_USERS, ALL_GAMES} from '../../queries';
import Form from '../../Styles/Form';
import Spinner from '../UI/Spinner'



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
        width: 40px;
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
        left: 40px;
    }
    `;
    const Label = styled.label`
    width: 100px;
`;

    const initialState = {
        opponent: '',
        location: 'Home',
        date: '',
        usersIds: [],
    }


 class CreateGame extends Component {
     state = {...initialState};

     handleSubmit = async (event, createGame) => {
        event.preventDefault();
        await createGame().then(({ data }) => {
            this.resetForm();
        });
      }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        })
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
    resetForm = () => {
        document.getElementById("createGame").reset();
    };
    
  render() {
      const {opponent, location, date, usersIds } = this.state;
    return (
        <Query query={GET_ALL_USERS}
            >
            {({ data, loading, error}) => {
                const { allUsers } = data;
                if(loading) return <Spinner />
                return (
        <Mutation 
        mutation={CREATE_GAME} 
        variables={{ opponent, location, date, usersIds }}
        refetchQueries={() => [
        { query: GET_ALL_USERS }, { query: ALL_GAMES }
      ]}
        >
            {(createGame, {data, loading, error }) => {
                return(
                <div className="App">
                    <div className="">
                        <Form className="form" id="createGame" onSubmit={event => this.handleSubmit(event, createGame)}>
                            <input type="text" name="opponent" placeholder="Opponent" onChange={this.handleChange}/>
                            <PassiveListener><input type="date" name="date" placeholder="Game Date" onChange={this.handleChange}/></PassiveListener>
                            <select type="text" name="location" onChange={this.handleChange}>
                                <option value="Home">Home</option>
                                <option value="Away">Away</option>
                            </select>
                            {allUsers.map(user =>( 
                                <Label key={user.id} htmlFor={user.username}>
                                {user.username}
                                    <Checkbox 
                                    id={user.id}
                                    type="checkbox" 
                                    value={user.id}
                                    onChange={this.addUser}    
                                    />
                            </Label>
                            ))}
                            <button disabled={loading} type="submit" className="button-primary">Submit</button>
                        </Form>
                    </div>
             </div>
            )}}
        </Mutation>
            )}}
        </Query>
    )
  }
}
export default CreateGame;