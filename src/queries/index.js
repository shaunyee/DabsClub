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
      status
      users {
        id
        username
      }
      trades {
        status
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
      status
      tradePending
      users {
        id
        username
      }
        trades {
          status
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
    tradePending
    users {
      id
      username
    }
  }
}

`;

export const RESET_PASSWORD_QUERY = gql`
  query($resetToken: String!) {
    allUsers(filter: {resetToken: $resetToken}) {
    id
    email
    resetToken
    resetExpiration
    }
  }
`;

export const FEED_QUERY = gql`
  query {
    allFeeds {
      id
      fromDate
      fromOpponent
      fromUser
      gameStatus
      price
      toDate
      toOpponent
      toUser
      type
      game {
        opponent
        date
        users {
          username
        }
      }
    }
  }
`;



export const SIGNIN_USER = gql `
mutation authenticateEmailUser($email: String!, $password: String!) {
    authenticateEmailUser(email: $email, password: $password ) {
        token
  }
}
`;


export const SIGNUP_USER = gql`
    mutation signupEmailUser($username: String!, $email: String!, $password: String!) {
        signupEmailUser(username: $username, email: $email, password: $password) {
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
    mutation updateGame($id: ID!, $usersIds: [ID!]! $location: String!, $opponent: String!, $date: String!, $price: Int, $status: String) {
        updateGame(id: $id, usersIds: $usersIds, location: $location, opponent: $opponent, date: $date, price: $price, status: $status){
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
export const DELETE_GAME = gql`
    mutation($id: ID!) {
  deleteGame(id: $id) {
    id
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
  mutation acceptTrade($id: ID!, $usersIds: [ID!]!, $tradePending: Boolean!) {
    updateGame(id: $id, usersIds: $usersIds, tradePending: $tradePending) {
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
  mutation swapGames($id: ID!, $usersIds: [ID!]!, $tradePending: Boolean!) {
    updateGame(id: $id, usersIds: $usersIds, tradePending: $tradePending) {
      id
      opponent
      users{
        id
        username
      }
    }
  }
`;

export const GAME_ONE_PENDING = gql`
  mutation gameOnePending($id: ID!, $tradePending: Boolean!){
    updateGame(id: $id, tradePending: $tradePending){
      id
      tradePending
    }
  }
`;

export const GAME_TWO_PENDING = gql`
  mutation gameTwoPending($id: ID!, $tradePending: Boolean!){
    updateGame(id: $id, tradePending: $tradePending){
      id
      tradePending
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


export const REQUEST_RESET_TOKEN = gql`
mutation triggerPasswordReset($email: String!){
  triggerPasswordReset(email: $email){
    id
  }
}
`;

export const SEND_RESET_EMAIL = gql`
mutation sendMail($email: String!, $body: String! ){
  sendMail(email: $email, subject: "Your Password Reset Link", body: $body) {
    success
  }
}
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($resetToken: String!, $password: String!){
	resetPassword(resetToken: $resetToken, password: $password){
    id
  }
}
`;

export const LOG_PRICE_CHANGE = gql`
  mutation logPriceChange($type: String!, $price: Int!, $gameStatus: String!, $gameId: ID!, $fromUser: String!, $fromOpponent: String!, $fromDate: String!) {
    createFeed(type: $type, price: $price, gameStatus: $gameStatus, gameId: $gameId, fromUser: $fromUser, fromOpponent: $fromOpponent, fromDate: $fromDate ){
      id
    }
  }
`;
export const LOG_TRADE_REQUEST = gql`
  mutation logTradeRequest($type: String!, $gameId: ID!, $fromUser: String!, $fromOpponent: String!, $fromDate: String!, $toUser: String!, $toOpponent: String!, $toDate: String!) {
    createFeed(type: $type, gameId: $gameId, fromUser: $fromUser, fromOpponent: $fromOpponent, fromDate: $fromDate, toUser: $toUser, toOpponent: $toOpponent, toDate: $toDate ){
      id
    }
  }
`;

export const TRADE_ACCEPTED = gql`
mutation logTradeAccepted($type: String!, $tradeId: ID!, $fromUser: String!, $fromOpponent: String!, $fromDate: String!, $toUser: String!, $toOpponent: String!, $toDate: String!) {
    createFeed(type: $type, tradeId: $tradeId, fromUser: $fromUser, fromOpponent: $fromOpponent, fromDate: $fromDate, toUser: $toUser, toOpponent: $toOpponent, toDate: $toDate ){
      id
    }
  }
`;

export const TRADE_REJECT = gql`
mutation logTradeRejected($type: String!, $tradeId: ID!, $fromUser: String!, $fromOpponent: String!, $fromDate: String!, $toUser: String!, $toOpponent: String!, $toDate: String!) {
    createFeed(type: $type, tradeId: $tradeId, fromUser: $fromUser, fromOpponent: $fromOpponent, fromDate: $fromDate, toUser: $toUser, toOpponent: $toOpponent, toDate: $toDate ){
      id
    }
  }
`;

export const TRADE_SUBSCRIPTION = gql`
subscription {
  Trade {
    mutation
    node {
      id
      status
      games{
        opponent
      }
    }
    mutation
    previousValues {
      id
    }
  }
}
`;

export const GAME_SUBSCRIPTION = gql `
subscription {
  Game{
    mutation
    node {
      id
    }
  }
}
`;

export const RESET_SUBSCRIPTION = gql`
subscription {
  User(filter: {
    mutation_in: [UPDATED]
    updatedFields_contains: "resetToken"
    node: {
      resetToken_not: "null"
    }
  }) {
    updatedFields
    node {
      id
      email
      resetToken
			username
    }
  }
}
`;
export const FEED_SUBSCRIPTION = gql `
subscription {
  Feed {
    mutation
    node {
      id
      fromDate
      fromOpponent
      fromUser
      gameStatus
      price
      toDate
      toOpponent
      toUser
      type
    }
    mutation
    previousValues{
      id
    }
  }
}`;