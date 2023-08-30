const typeDefs = `
    type Food {
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
    }

    type Mutation {
        addFood(
            name: String!
            scale: String!
            calories: Int!
        ): Food
    }
`

module.exports = typeDefs