const { GraphQLError } = require('graphql')

const Food = require("./models/food")
const Exercise = require("./models/exercise")
const User = require("./models/user")
const {getDayDate} = require("./utils/tools")

// getName must be used in front-end when sending data to backend!!!

const resolvers = {
    Query: {
        allFoods: async () => {
            return Food.find({})
        },
        allFoodScales: async (_, args) => {
            const food = await Food.find({ name: args.name })
            if(!food){
                throw new GraphQLError("Food Not Found!", {
                    extensions: {
                        code: "FOOD_NOT_FOUND",
                        invalidArgs: args.name,
                    }
                })                
            }
            return food
        },
        allExercises: async () => {
            return Exercise.find({})
        },
        allExerciseScales: async (_, args) => {
            const exercise = await Exercise.find({ name: args.name })
            if(!exercise){
                throw new GraphQLError("Exercise Not Found!", {
                    extensions: {
                        code: "EXERCISE_NOT_FOUND",
                        invalidArgs: args.name,
                    }
                })                
            }
            return exercise
        },
        allUsers: async () => {
            return User.find({})
        },
        userHistory: async (_, args) => {
            const user = await User.findOne({ username: args.username }) // From Context!
            return user.history
        },
        userFoods: async (_, args) => {
            const user = await User.findOne({ username: args.username }).populate({
                path: "foods",
                populate: {
                    path: "food"
                }
            }) // From Context!
            return user.foods
        }
    },
    Mutation: {
        addFood: async (_, args) => {
            const food = new Food({...args, path: `/images/${args.name}.png`})
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
            const exercise = new Exercise({...args, path: `/animations/${args.name}.gif`})
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
            const user = await User.findOne({ username: args.username }) // From context!!!
            user.history = user.history.concat({
                date: getDayDate(),
                gain: args.gain,
                loss: args.loss
            })
            await user.save()
            return user
        },
        addUserFood: async (_, args) => {
            const user = await User.findOne({ username: args.username }) // From context!!!            
            const food = await Food.findOne({ name: args.foodname, scale: args.scalename })
            if(!food) {
                throw new GraphQLError("Food Not Found!", {
                    extensions: {
                        code: "Food_NOT_FOUND",
                        invalidArgs: args,
                    }
                })                
            }

            user.foods = user.foods.concat({
                food,
                amount: args.amount,
                calories: args.amount * food.calories
            })
            await user.save()
            return user.populate({
                path: "foods",
                populate: {
                    path: "food"
                }
            })
        },
    }
}

module.exports = resolvers