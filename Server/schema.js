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

    type Query {
        allFoods: [Food!]!
        allFoodScales(
            name: String!
        ): [Food!]!
        allExercises: [Exercise!]!
        allExerciseScales(
            name: String!
        ): [Exercise!]!
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
    }
`

module.exports = typeDefs