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
            exercises {
                amount
                calories
                date
                exercise {
                    id
                    name
                    scale {
                        name
                        path
                    }
                    calories
                    path
                }
            }
            foods {
                amount
                calories
                date
                food {
                    calories
                    id
                    name
                    path
                    scale {
                        name
                        path
                    }
                }
            }
            history {
                date
                gain
                loss
            }
            streak
            totalCals
            username
        }
    }
`

export const ALL_FOODS = gql`
    query AllFoods {
        allFoods {
            calories
            id
            name
            path
            scale {
                name
                path
            }
        }
    }
`