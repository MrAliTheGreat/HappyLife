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

export const FOOD_SCALES = gql`
    query FoodScales($foodname: String!) {
        foodScales(foodname: $foodname) {
            calories
            food {
                id
                name
                path
            }
            id
            scale {
                group
                id
                name
                path
            }
        }
    }
`

export const SCALE_FOODS = gql`
    query ScaleFoods($scalename: String!) {
        scaleFoods(scalename: $scalename) {
            calories
            food {
                id
                name
                path
            }
            id
            scale {
                id
                group
                name
                path
            }
        }
    }
`

export const USER_FOODS_TODAY = gql`
    query UserFoodsToday {
        userFoodsToday {
            amount
            date
            foodScale {
                calories
                food {
                    path
                    name
                    id
                }
                id
                scale {
                    group
                    id
                    name
                    path
                }
            }
            id
        }
    }
`

export const USER_EXERCISES_TODAY = gql`
    query UserExercisesToday {
        userExercisesToday {
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
                    group
                    id
                    name
                    path
                }
            }
            id
        }
    }
`

export const ADD_FOOD = gql`
    mutation AddFood($foodname: String!, $scalename: String!, $calories: Int!) {
        addFood(foodname: $foodname, scalename: $scalename, calories: $calories) {
            calories
            id
            food {
                id
                name
                path
            }
            scale {
                group
                id
                name
                path
            }
        }
    }
`

export const FOOD_SCALE_CALORIES = gql`
    query FoodScaleCalories($foodId: ID!, $scaleId: ID!) {
        foodScaleCalories(foodId: $foodId, scaleId: $scaleId) {
            calories
            food {
                name
            }
            scale {
                name
                group
            }
        }
    }
`

export const ADD_USER_FOOD = gql`
    mutation AddUserFood($foodname: String!, $scalename: String!, $amount: Int!) {
        addUserFood(foodname: $foodname, scalename: $scalename, amount: $amount) {
            username
            foods {
                amount
                date
                foodScale {
                    calories
                    food {
                        path
                        name
                        id
                    }
                    id
                    scale {
                        group
                        id
                        name
                        path
                    }
                }
                id
            }
            history {
                date
                gain
                loss
            }
            streak
            totalCals
        }
    }
`