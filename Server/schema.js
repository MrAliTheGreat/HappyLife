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
        group: String!
        path: String!
    }

    type FoodScale {
        id: ID!
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
        id: ID!
        foodScale: FoodScale!
        amount: Int!
        date: String!        
    }

    type UserExercise {
        id: ID!
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

        allScales(
            group: String!
        ): [Scale]!

        allFoodScales: [FoodScale]!

        allExerciseScales: [ExerciseScale]!

        foodScales(
            foodname: String!
        ): [FoodScale]!

        exerciseScales(
            exercisename: String!
        ): [ExerciseScale]!

        scaleFoods(
            scalename: String!
        ): [FoodScale]!

        scaleExercises(
            scalename: String!
        ): [ExerciseScale]!

        foodScaleCalories(
            foodId: ID!
            scaleId: ID!
        ): FoodScale

        exerciseScaleCalories(
            exerciseId: ID!
            scaleId: ID!
        ): ExerciseScale

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