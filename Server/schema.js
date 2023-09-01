const typeDefs = `
    type Food {
        id: ID!
        name: String!
        path: String!
    }

    type Exercise {
        id: ID!
        name: String!
        path: String!
    }

    type Scale {
        id: ID!
        name: String!
        path: String!
    }

    type FoodScale {
        food: Food!
        scale: Scale!
        calories: Int!
    }

    type ExerciseScale {
        exercise: Exercise!
        scale: Scale!
        calories: Int!
    }

    type UserFood {
        foodScale: FoodScale!
        amount: Int!
        date: String!        
    }

    type UserExercise {
        exerciseScale: ExerciseScale!
        amount: Int!
        date: String!
    }

    type History {
        date: String!
        gain: Int!
        loss: Int!
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
        allFoods: [Food]!

        allExercises: [Exercise]!

        allFoodScales: [FoodScale]!

        allExerciseScales: [ExerciseScale]!

        foodScales(
            foodname: String!
        ): [FoodScale]!

        exerciseScales(
            exercisename: String!
        ): [ExerciseScale]!

        userFoodsToday: [UserFood]!

        userExercisesToday: [UserExercise]!

        currentUserInfo: UserInfo

        allUsers: [User]!
    }


    type Mutation {
        addFood(
            foodname: String!
            scalename: String!
            calories: Int!
        ): FoodScale

        addExercise(
            exercisename: String!
            scalename: String!
            calories: Int!
        ): ExerciseScale

        addUser(
            username: String!
            password: String!
            height: Int!
            weight: Int!
            age: Int!
            sex: String!
        ): UserInfo

        addUserHistory(
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