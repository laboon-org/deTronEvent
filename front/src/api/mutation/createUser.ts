import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser(
      $wallet_address: String!
      ){
        createWallet(wallet_address: $wallet_address) {
          wallet_address
          user_id
        }
      }
`;
