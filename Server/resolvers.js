const { GraphQLError } = require("graphql")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Food = require("./models/food")
const Exercise = require("./models/exercise")
const User = require("./models/user")
const { getDayDate, getName, getBMR } = require("./utils/tools")

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
        currentUserInfo: (...[, , { currentUser }]) => {
            if(!currentUser){
                throw new GraphQLError("Access Denied!", {
                    extensions: {
                        code: "ACCESS_DENIED",
                    }
                })
            }

            return {
                username: currentUser.username,
                BMR: getBMR(currentUser.sex, currentUser.weight, currentUser.height, currentUser.age),
                foods: currentUser.foods,
                exercises: currentUser.exercises,
                history: currentUser.history
            }
        },
        // allUsers: async () => {
        //     return User.find({}).populate({
        //         path: "foods",
        //         populate: {
        //             path: "food"
        //         }
        //     })
        //     .populate({
        //         path: "exercises",
        //         populate: {
        //             path: "exercise"
        //         }
        //     })
        // },        
    },
    Mutation: {
        addFood: async (_, args, { currentUser }) => {
            if(!currentUser){
                throw new GraphQLError("Access Denied!", {
                    extensions: {
                        code: "ACCESS_DENIED",
                    }
                })
            }

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
        addExercise: async (_, args, { currentUser }) => {
            if(!currentUser){
                throw new GraphQLError("Access Denied!", {
                    extensions: {
                        code: "ACCESS_DENIED",
                    }
                })
            }

            const exercise = new Exercise({...args, 
                name: getName(args.name, " "),
                scale: getName(args.scale, " "),                
                path: `/animations/${getName(args.name, "")}.gif`})
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
            const passwordHash = await bcrypt.hash(args.password, 10)

            const user = new User({...args,
                password: passwordHash
            })

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
            return {
                username: user.username,
                BMR: getBMR(user.sex, user.weight, user.height, user.age),
                foods: user.foods,
                exercises: user.exercises,
                history: user.history
            }
        },
        addHistory: async (_, args, { currentUser }) => {
            // We can update history whenever the user adds food or exercise to his or her account!
            if(!currentUser){
                throw new GraphQLError("Access Denied!", {
                    extensions: {
                        code: "ACCESS_DENIED",
                    }
                })
            }

            if(currentUser.history.at(-1).date === getDayDate()){
                currentUser.history = currentUser.history.map((hist) => {
                    if(hist.date === getDayDate()){
                        return {
                            date: getDayDate(),
                            gain: hist.gain + args.gain,
                            loss: hist.loss + args.loss                            
                        }
                    }
                    return hist
                })
            }
            else{
                currentUser.history = currentUser.history.concat({
                    date: getDayDate(),
                    gain: args.gain,
                    loss: args.loss
                })
            }

            await currentUser.save()
            return {
                username: currentUser.username,
                BMR: getBMR(currentUser.sex, currentUser.weight, currentUser.height, currentUser.age),
                foods: currentUser.foods,
                exercises: currentUser.exercises,
                history: currentUser.history
            }
        },
        addUserFood: async (_, args, { currentUser }) => {
            if(!currentUser){
                throw new GraphQLError("Access Denied!", {
                    extensions: {
                        code: "ACCESS_DENIED",
                    }
                })
            }            
           
            const food = await Food.findOne({ name: args.foodname, scale: args.scalename })
            if(!food) {
                throw new GraphQLError("Food Not Found!", {
                    extensions: {
                        code: "FOOD_NOT_FOUND",
                        invalidArgs: args,
                    }
                })                
            }

            currentUser.foods = currentUser.foods.concat({
                food,
                amount: args.amount,
                calories: args.amount * food.calories
            })
            await currentUser.save()
            return {
                username: currentUser.username,
                BMR: getBMR(currentUser.sex, currentUser.weight, currentUser.height, currentUser.age),
                foods: currentUser.foods,
                exercises: currentUser.exercises,
                history: currentUser.history
            }
        },
        addUserExercise: async (_, args, { currentUser }) => {
            if(!currentUser){
                throw new GraphQLError("Access Denied!", {
                    extensions: {
                        code: "ACCESS_DENIED",
                    }
                })
            }

            const exercise = await Exercise.findOne({ name: args.exercisename, scale: args.scalename })
            if(!exercise) {
                throw new GraphQLError("Exercise Not Found!", {
                    extensions: {
                        code: "EXERCISE_NOT_FOUND",
                        invalidArgs: args,
                    }
                })                
            }

            currentUser.exercises = currentUser.exercises.concat({
                exercise,
                amount: args.amount,
                calories: args.amount * exercise.calories
            })
            await currentUser.save()
            return {
                username: currentUser.username,
                BMR: getBMR(currentUser.sex, currentUser.weight, currentUser.height, currentUser.age),
                foods: currentUser.foods,
                exercises: currentUser.exercises,
                history: currentUser.history
            }
        },
        login: async (_, args) => {
            const user = await User.findOne({ username: args.username })
            if(!user){
                throw new GraphQLError("Invalid Credentials!", {
                    extensions: {
                        code: "INVALID_CREDENTIALS",
                        invalidArgs: args.username,
                    }
                })
            }

            const pass = await bcrypt.compare(args.password, user.password)
            if(!pass){
                throw new GraphQLError("Invalid Credentials!", {
                    extensions: {
                        code: "INVALID_CREDENTIALS",
                        invalidArgs: args.username,
                    }
                })
            }            

            return {
                value: jwt.sign(
                    {
                        id: user.id,
                        username: user.username,
                    },
                    process.env.JWT_SECRET
                )
            }
        },
    }
}

module.exports = resolvers