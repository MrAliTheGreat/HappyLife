const typeDefs = `
    type Food {
        id: ID!
        name: String!
        path: String!
    }

    type Query {
        all: [Food!]!
    }

    type Mutation {
        addFood(
            name: String!
            path: String!
        ): Food
    }
`

module.exports = typeDefs