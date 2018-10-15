import { gql } from 'apollo-boost';

export const GET_ALL_USERS = gql`
query {
  allUsers {
    id
    username
    email
  }
}
`;

export const GET_CURRENT_USER = gql`
query {
  user {
    id
    username
    email
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