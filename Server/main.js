require("dotenv").config()
const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const resolvers = require("./resolvers")
const typeDefs = require("./schema")

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DB Ready!")
    })
    .catch((err) => {
        console.log(`Error Connecting to DB: ${err}`)
    })

const server = new ApolloServer({
    typeDefs,
    resolvers
})

startStandaloneServer(server, {
    listen: {
        port: 4000
    },
    // context --> Used for authentication! 
}).then(() => {
    console.log(`Backend Ready!`)
})