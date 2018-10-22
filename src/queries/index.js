import { gql } from 'apollo-boost';

export const GET_ALL_USERS = gql`
query {
  allUsers {
    id
    username
    email
    role
    games {
      id
      opponent
      location
      date
      price
    }
  }
}
`;

export const GET_CURRENT_USER = gql`
query {
  user {
    id
    username
    email
    role
    games {
      opponent
      location
      date
      id
      price
    }
  }
}
`;

export const GET_USER = gql`
  query($id: ID!) {
    User(id: $id) {
        id
        username
         email
          role
        games {
        opponent
        location
        date
        id
        price
      }
    }
  }
`;

export const ALL_GAMES = gql`
  query {
    allGames {
      id
      opponent
      location
      date
      price
      users {
        id
        username
      }
    }
  }
`;

export const GET_GAME = gql`
  query($id: ID!) {
    Game(id: $id) {
      id
      opponent
      location
      date
      price
      users {
        id
        username
      }
    }
  }
`;

export const ALL_GAMES_NOT_ME = gql`
query notMe($id: ID!) {
  allGames(filter: {users_every: {id_not: $id}}) {
    id
    price
    opponent
    date
    location
    users {
      id
      username
    }
  }
}

`;



export const SIGNIN_USER = gql `
mutation signinUser($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password }) {
        token
  }
}
`;

export const SIGNUP_USER = gql`
    mutation createUser($username: String, $email: String!, $password: String!) {
        createUser(
            username: $username, 
            authProvider: { email: { email: $email, password: $password }}) {
             id
         }
    }
`;

export const CREATE_GAME = gql`
    mutation createGame($usersIds: [ID!]! $location: String!, $opponent: String!, $date: String!, $price: Int) {
        createGame(usersIds: $usersIds, location: $location, opponent: $opponent, date: $date, price: $price){
          users{
            username
          }
        location
        opponent
        date
        price
  }
    }
`;

export const UPDATE_GAME = gql`
    mutation updateGame($id: ID!, $usersIds: [ID!]! $location: String!, $opponent: String!, $date: String!, $price: Int) {
        updateGame(id: $id, usersIds: $usersIds, location: $location, opponent: $opponent, date: $date, price: $price){
          users{
            id
            username
          }
        location
        opponent
        date
        price
  }
    }
`;

export const CREATE_TRADE = gql`
mutation createTrade($usersIds: [ID!], $tradeFrom: String!, $tradeTo: String!, $requested: Boolean!, $status: String, $gamesIds: [ID!]){
  createTrade(usersIds: $usersIds, tradeFrom: $tradeFrom, tradeTo: $tradeTo, requested: $requested, status: $status, gamesIds: $gamesIds) {
    id
    tradeTo
    tradeFrom
    requested
    status
  }
}

`;

export const DELETE_GAME = gql`
    mutation($id: ID!) {
  deleteGame(id: $id) {
    id
  }
}
`;