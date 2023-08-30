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
        date: String!        
    }

    type UserExercise {
        exercise: Exercise!
        amount: Int!
        calories: Int!
        date: String!
    }

    type UserInfo {
        username: String!
        totalCals: Int!
        streak: Int!
        foods: [UserFood]!
        exercises: [UserExercise]!
        history: [History]!        
    }

    type Token {
        value: String!
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

        currentUserInfo: UserInfo

        userFoods: [UserFood]!

        userExercises: [UserExercise]!
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
        ): UserInfo

        addHistory(
            gain: Int!
            loss: Int!
        ): UserInfo

        addUserFood(
            foodname: String!
            scalename: String!
            amount: Int!
        ): UserInfo

        addUserExercise(
            exercisename: String!
            scalename: String!
            amount: Int!
        ): UserInfo

        login(
            username: String!
            password: String!
        ): Token
    }
`

module.exports = typeDefs