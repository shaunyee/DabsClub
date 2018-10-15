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