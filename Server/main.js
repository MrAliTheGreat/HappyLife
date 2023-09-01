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
        host: process.env.APOLLO_URL,
        port: process.env.APOLLO_PORT,
    },
    context: async ({ req, _ }) => {
        let valid = true;
        const auth = req ? req.headers.authorization : null
        if(auth && auth.startsWith("Bearer ")){
            try{
                var decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)             
            }
            catch(err) {
                err.name === "TokenExpiredError" ? valid = false : null
            }
            if(valid){
                const currentUser = await User.findById(decodedToken.id)
                .populate({
                    path: "foods.foodScale",
                    populate: {
                        path: "food",
                    },
                })
                .populate({
                    path: "foods.foodScale",
                    populate: {
                        path: "scale",
                    },
                })                
                .populate({
                    path: "exercises.exerciseScale",
                    populate: {
                        path: "exercise"
                    },
                })
                .populate({
                    path: "exercises.exerciseScale",
                    populate: {
                        path: "scale"
                    },
                })

                return { currentUser }
            }
        }
    }
}).then(() => {
    console.log(`Backend Ready!`)
})