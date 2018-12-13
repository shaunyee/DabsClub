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
          tickets {
            price
            id
            status
          }
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
          fromTicket1
          fromTicket2
          fromTicket3
          fromTicket4
          toTicket1
          toTicket2
          toTicket3
          toTicket4
          tickets {
            id
            price
          }
          games{
            id
            opponent
            users{
              id
              username
            }
          }
    }
    tickets {
      id
      price
      status
      game {
        id
        opponent
      }
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
      tickets{
        id
        seatNumber
        status
        price
        user {
          id
          username
        }
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
        tickets {
          id
          price
          status
          seatNumber
          user {
            id
            username
          }
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

export const GET_TICKET = gql `
  query($id: ID!) {
    Ticket(id: $id) {
      id
      price
      user{
        username
      }
      game {
        opponent
      }
    }
  }
`

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

export const UPDATE_TICKET_PRICE = gql`
    mutation updateTicketPrice($id: ID!, $price: Int!, $status: String) {
      updateTicket(id: $id, price: $price, status: $status) {
        id
      }
    }
`;

export const UPDATE_TICKET_2 = gql`
    mutation updateTicket2($id: ID!, $price: Int!, $status: String,){
      updateTicket(id: $id, price: $price, status: $status) {
        id
      }
    }
`;
export const UPDATE_TICKET_3 = gql`
    mutation updateTicket3($id: ID!, $price: Int!, $status: String,){
      updateTicket(id: $id, price: $price, status: $status) {
        id
      }
    }
`;
export const UPDATE_TICKET_4 = gql`
    mutation updateTicket4($id: ID!, $price: Int!, $status: String,){
      updateTicket(id: $id, price: $price, status: $status) {
        id
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

export const CREATE_TICKET = gql`
  mutation createTicket($gameId: ID!, $seatNumber: String!, $userId: ID!){
    createTicket(gameId: $gameId, seatNumber: $seatNumber, userId: $userId) {
      id
    }
  }
`;

export const CREATE_TRADE = gql`
mutation createTrade($usersIds: [ID!], $gamesIds: [ID!], $ticketsIds: [ID!], $fromGameId: String!, $toGameId: String!, $fromDate: String!, $toDate:String, $tradeFrom: String!, $tradeTo: String!, $fromOp: String!, $toOp:String!, $fromUsername: String!, $toUsername:String!, $status: String, $fromTicket1: String!, $fromTicket2: String, $fromTicket3: String, $fromTicket4: String, $toTicket1: String!, $toTicket2: String, $toTicket3: String, $toTicket4: String){
  createTrade(usersIds: $usersIds, gamesIds: $gamesIds, ticketsIds: $ticketsIds, fromGameId: $fromGameId, toGameId: $toGameId, fromDate: $fromDate, toDate: $toDate, tradeFrom: $tradeFrom, tradeTo: $tradeTo, fromOp: $fromOp, toOp:$toOp, fromUsername:$fromUsername, toUsername: $toUsername, status: $status, fromTicket1: $fromTicket1, fromTicket2: $fromTicket2,fromTicket3: $fromTicket3,fromTicket4: $fromTicket4, toTicket1: $toTicket1, toTicket2: $toTicket2, toTicket3: $toTicket3, toTicket4: $toTicket4) {
    id
    tradeTo
    tradeFrom
    status
  }
}
`;

export const SWAP_GAME1 = gql`
  mutation swapGame1($id: ID!, $usersIds: [ID!]!, $tradePending: Boolean!) {
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

export const SWAP_GAME2 = gql`
  mutation swapGame2($id: ID!, $usersIds: [ID!]!, $tradePending: Boolean!) {
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

export const TICKET_FROM1_PENDING = gql`
    mutation ticketFrom1Pending($id: ID!, $trading: Boolean!){
    updateTicket(id: $id, trading: $trading){
      id
      trading
    }
  } 
`;
export const TICKET_FROM2_PENDING = gql`
    mutation ticketFrom2Pending($id: ID!, $trading: Boolean!){
    updateTicket(id: $id, trading: $trading){
      id
      trading
    }
  }
`;
export const TICKET_FROM3_PENDING = gql`
    mutation ticketFrom3Pending($id: ID!, $trading: Boolean!){
    updateTicket(id: $id, trading: $trading){
      id
      trading
    }
  }
`;
export const TICKET_FROM4_PENDING = gql`
    mutation ticketFrom4Pending($id: ID!, $trading: Boolean!){
    updateTicket(id: $id, trading: $trading){
      id
      trading
    }
  }
`;
export const TICKET_TO1_PENDING = gql`
    mutation ticketTo1Pending($id: ID!, $trading: Boolean!){
    updateTicket(id: $id, trading: $trading){
      id
      trading
    }
  }
`;
export const TICKET_TO2_PENDING = gql`
    mutation ticketTo2Pending($id: ID!, $trading: Boolean!){
    updateTicket(id: $id, trading: $trading){
      id
      trading
    }
  }
`;
export const TICKET_TO3_PENDING = gql`
    mutation ticketTo3Pending($id: ID!, $trading: Boolean!){
    updateTicket(id: $id, trading: $trading){
      id
      trading
    }
  }
`;
export const TICKET_TO4_PENDING = gql`
    mutation ticketTo4Pending($id: ID!, $trading: Boolean!){
    updateTicket(id: $id, trading: $trading){
      id
      trading
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