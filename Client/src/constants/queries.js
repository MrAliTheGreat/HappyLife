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
                loss
                gain
                date
            }
            foods {
                id
                foodScale {
                    scale {
                        path
                        name
                        id
                    }
                    food {
                        id
                        name
                        path
                    }
                    calories
                }
                date
                amount
            }
            exercises {
                amount
                date
                exerciseScale {
                    calories
                    exercise {
                        id
                        name
                        path
                    }
                    scale {
                        id
                        name
                        path
                    }
                }
                id
            }
        }
    }
`

export const FOODS = gql`
    query AllFoods {
        allFoods {
            id
            name
            path
        }
    }
`

export const SCALES = gql`
    query AllScales($group: String!) {
        allScales(group: $group) {
            group
            id
            name
            path
        }
    }
`

export const FOODS_SCALES = gql`
    query AllFoodScales {
        allFoodScales {
            calories
            food {
                id
                name
                path
            }
            scale {
                id
                name
                path
            }
            id
        }
    }
`