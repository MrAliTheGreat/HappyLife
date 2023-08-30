const { GraphQLError } = require('graphql')

const Food = require("./models/food")
const Exercise = require("./models/exercise")
const User = require("./models/user")
const getDayDate = require("./utils/tools")

const getName = (name, newChar) => {
    return name.split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(newChar)
}

const resolvers = {
    Query: {
        allFoods: async () => {
            return Food.find({})
        },
        allFoodScales: async (_, args) => {
            return Food.find({ name: args.name })
        },
        allExercises: async () => {
            return Exercise.find({})
        },
        allExerciseScales: async (_, args) => {
            return Exercise.find({ name: args.name })
        },
        allUsers: async () => {
            return User.find({})
        },
        userHistory: async (_, args) => {
            const user = await User.findOne({ username: args.username })
            return user.history
        }
    },
    Mutation: {
        addFood: async (_, args) => {
            const food = new Food({...args, 
                name: getName(args.name, " "),
                scale: getName(args.scale, " "),
                path: `/images/${getName(args.name, "")}.png`
            })
            try{
                await food.save()
            }
            catch(err){
                throw new GraphQLError("Food Already Exists!", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args,
                        err
                    }
                })
            }
            return food
        },
        addExercise: async (_, args) => {
            const exercise = new Exercise({...args,
                name: getName(args.name, " "),
                scale: getName(args.scale, " "),
                path: `/animations/${getName(args.name, "")}.gif`
            })
            try{
                await exercise.save()
            }
            catch(err){
                throw new GraphQLError("Exercise Already Exists!", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args,
                        err
                    }
                })
            }
            return exercise
        },
        addUser: async (_, args) => {
            const user = new User({...args})
            try{
                await user.save()
            }
            catch(err){
                throw new GraphQLError("User Already Exists!", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args,
                        err
                    }
                })
            }
            return user
        },
        addHistory: async (_, args) => {
            // We can update history whenever the user adds food or exercise to his or her account!
            const user = await User.findOne({ username: args.username })
            user.history = user.history.concat({
                date: getDayDate(),
                gain: args.gain,
                loss: args.loss
            })
            await user.save()
            return user
        },
    }
}

module.exports = resolvers