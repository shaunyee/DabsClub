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
          trades {
            id
          status
          fromDate
          toDate
          fromOp
          toOp
          fromUsername
          toUsername
          tradeFrom
          tradeTo
          toGameId
          fromGameId
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
mutation createTrade($usersIds: [ID!], $fromGameId: String!, $toGameId: String!, $fromDate: String!, $toDate:String, $tradeFrom: String!, $tradeTo: String!, $fromOp: String!, $toOp:String!, $fromUsername: String!, $toUsername:String!, $status: String, $gamesIds: [ID!]){
  createTrade(usersIds: $usersIds, fromGameId: $fromGameId, toGameId: $toGameId, fromDate: $fromDate, toDate: $toDate, tradeFrom: $tradeFrom, tradeTo: $tradeTo, fromOp: $fromOp, toOp:$toOp, fromUsername:$fromUsername, toUsername: $toUsername, status: $status, gamesIds: $gamesIds) {
    id
    tradeTo
    tradeFrom
    status
  }
}
`;

export const ACCECPT_TRADE = gql`
  mutation acceptTrade($id: ID!, $usersIds: [ID!]!) {
    updateGame(id: $id, usersIds: $usersIds) {
      id
      opponent
      users{
        id
        username
      }
    }
  }
`;

export const SWAP_GAMES = gql`
  mutation swapGames($id: ID!, $usersIds: [ID!]!) {
    updateGame(id: $id, usersIds: $usersIds) {
      id
      opponent
      users{
        id
        username
      }
    }
  }
`;

export const TRADE_STATUS_ACCEPTED = gql`
  mutation statusAccepted($id: ID!, $status: String!) {
    updateTrade(id: $id, status: $status) {
      id
      status
      }
    }
`;
export const TRADE_STATUS_REJECTED = gql`
  mutation statusRejected($id: ID!, $status: String!) {
    updateTrade(id: $id, status: $status) {
      id
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