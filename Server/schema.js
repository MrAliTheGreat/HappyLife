const typeDefs = `
    type Food {
        id: ID!
        name: String!
        scale: String!
        calories: Int!
        path: String!
    }

    type Exercise {
        id: ID!
        name: String!
        scale: String!
        calories: Int!
        path: String!
    }

    type User {
        id: ID!
        username: String!
        password: String!
        height: Int!
        weight: Int!
        age: Int!
        sex: String!
        foods: [UserFood]!
        exercises: [UserExercise]!
        history: [History]!
    }

    type History {
        date: String!
        gain: Int!
        loss: Int!
    }

    type UserFood {
        food: Food!
        amount: Int!
        calories: Int!
    }

    type UserExercise {
        exercise: Exercise!
        amount: Int!
        calories: Int!
    }

    type Query {
        allFoods: [Food!]!

        allFoodScales(
            name: String!
        ): [Food!]!

        allExercises: [Exercise!]!

        allExerciseScales(
            name: String!
        ): [Exercise!]!

        allUsers: [User!]!

        userHistory(
            username: String!
        ): [History]!

        userFoods(
            username: String!
        ): [UserFood]!
    }

    type Mutation {
        addFood(
            name: String!
            scale: String!
            calories: Int!
        ): Food

        addExercise(
            name: String!
            scale: String!
            calories: Int!
        ): Exercise

        addUser(
            username: String!
            password: String!
            height: Int!
            weight: Int!
            age: Int!
            sex: String!
        ): User

        addHistory(
            username: String!
            gain: Int!
            loss: Int!
        ): User

        addUserFood(
            username: String!
            foodname: String!
            scalename: String!
            amount: Int!
        ): User
    }
`

module.exports = typeDefs