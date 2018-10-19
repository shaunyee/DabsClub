import { gql } from 'apollo-boost';

export const GET_ALL_USERS = gql`
query {
  allUsers {
    id
    username
    email
    role
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
    mutation createGame($usersIds: [ID!]! $location: String!, $opponent: String!, $date: DateTime!) {
        createGame(usersIds: $usersIds, location: $location, opponent: $opponent, date: $date){
          users{
            username
          }
        location
        opponent
        date
  }
    }
`;