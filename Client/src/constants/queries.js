import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const CURRENT_USER = gql`
    query CurrentUserInfo {
        currentUserInfo {
            username
            totalCals
            streak
            history {
            date
            gain
            loss
            }
            foods {
            amount
            calories
            date
            food {
                id
                name
                scale
                calories
                path
            }
            }
            exercises {
            amount
            calories
            date
            exercise {
                id
                name
                scale
                calories
                path
            }
            }
        }
    }
`