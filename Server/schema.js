const typeDefs = `
    type Food {
        id: ID!
        name: String!
        path: String!
    }

    type Query {
        all: [Food!]!
    }
`

module.exports = typeDefs