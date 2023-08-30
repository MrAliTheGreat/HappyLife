require("dotenv").config()
const jwt = require("jsonwebtoken")
const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const resolvers = require("./resolvers")
const typeDefs = require("./schema")
const User = require("./models/user")

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
    context: async ({ req, _ }) => {
        const auth = req ? req.headers.authorization : null
        if(auth && auth.startsWith("Bearer ")){
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id).populate({
                path: "foods",
                populate: {
                    path: "food"
                }
            }).populate({
                path: "exercises",
                populate: {
                    path: "exercise"
                }
            })
            return { currentUser }
        }
    }
}).then(() => {
    console.log(`Backend Ready!`)
})