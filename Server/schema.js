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
        foods: [Food]!
        exercises: [Exercise]!
        history: [History]!
    }

    type History {
        date: String!
        gain: Int!
        loss: Int!
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
    }
`

module.exports = typeDefs