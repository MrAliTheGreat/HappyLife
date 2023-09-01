const { GraphQLError } = require("graphql")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Food = require("./models/food")
const Exercise = require("./models/exercise")
const Scale = require("./models/scale")
const User = require("./models/user")
const FoodScale = require("./models/foodScale")
const ExerciseScale = require("./models/exerciseScale")
const { getDayDate, getName, getBMR, getStreak } = require("./utils/tools")

const LOSS_RATE = 1000

// remainingCals = totalCals - history.gain ==> For frontend!


const _addHistory = async (_, args, { currentUser }) => {
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
        totalCals: getBMR(currentUser.sex, currentUser.weight, currentUser.height, currentUser.age) + currentUser.history.at(-1).loss - LOSS_RATE,
        streak: getStreak(currentUser.history, currentUser.sex, currentUser.weight, currentUser.height, currentUser.age, LOSS_RATE),
        foods: currentUser.foods,
        exercises: currentUser.exercises,
        history: currentUser.history
    }
}

const resolvers = {
    Query: {
        allFoods: async () => {
            return Food.find({})
        },

        allExercises: async () => {
            return Exercise.find({})
        },

        allScales: async (_, args) => {
            return Scale.find({
                group: args.group
            })
        },

        allFoodScales: async () => {
            return FoodScale.find({}).populate("food").populate("scale")
        },

        allExerciseScales: async () => {
            return ExerciseScale.find({}).populate("exercise").populate("scale")
        },

        foodScales: async (_, args) => {
            const food = await Food.findOne({
                name: args.foodname            
            })
            if(!food){
                throw new GraphQLError("Food Not Found!", {
                    extensions: {
                        code: "FOOD_NOT_FOUND",
                        invalidArgs: args.foodname,
                    }
                })                
            }

            const foodScales = await FoodScale.find({ 
                food
            }).populate("food").populate("scale")
            if(!foodScales){
                throw new GraphQLError("Food Scales Not Found!", {
                    extensions: {
                        code: "FOOD_SCALES_NOT_FOUND",
                    }
                })                
            }
            return foodScales
        },

        exerciseScales: async (_, args) => {
            const exercise = await Exercise.findOne({
                name: args.exercisename            
            })
            if(!exercise){
                throw new GraphQLError("Exercise Not Found!", {
                    extensions: {
                        code: "EXERCISE_NOT_FOUND",
                        invalidArgs: args.exercisename,
                    }
                })                
            }

            const exerciseScales = await ExerciseScale.find({
                exercise
            }).populate("exercise").populate("scale")
            if(!exerciseScales){
                throw new GraphQLError("Exercise Scales Not Found!", {
                    extensions: {
                        code: "EXERCISE_SCALES_NOT_FOUND",
                    }
                })
            }
            return exerciseScales
        },

        scaleFoods: async (_, args) => {
            const scale = await Scale.findOne({
                name: args.scalename,
                group: "food"
            })
            if(!scale){
                throw new GraphQLError("Scale Not Found!", {
                    extensions: {
                        code: "SCALE_NOT_FOUND",
                        invalidArgs: args.exercisename,
                    }
                })                
            }

            return FoodScale.find({ scale }).populate("food").populate("scale")
        },

        scaleExercises: async (_, args) => {
            const scale = await Scale.findOne({
                name: args.scalename,
                group: "exercise"
            })
            if(!scale){
                throw new GraphQLError("Scale Not Found!", {
                    extensions: {
                        code: "SCALE_NOT_FOUND",
                        invalidArgs: args.exercisename,
                    }
                })                
            }

            return ExerciseScale.find({ scale }).populate("exercise").populate("scale")
        },        

        userFoodsToday: (...[, , { currentUser }]) => {
            if(!currentUser){
                throw new GraphQLError("Access Denied!", {
                    extensions: {
                        code: "ACCESS_DENIED",
                    }
                })
            }

            return currentUser.foods.map((food) => {
                if(food.date === getDayDate()){
                    return food
                }
            })
        },

        userExercisesToday: (...[, , { currentUser }]) => {
            if(!currentUser){
                throw new GraphQLError("Access Denied!", {
                    extensions: {
                        code: "ACCESS_DENIED",
                    }
                })
            }

            return currentUser.exercises.map((exercise) => {
                if(exercise.date === getDayDate()){
                    return exercise
                }
            })
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
                totalCals: getBMR(currentUser.sex, currentUser.weight, currentUser.height, currentUser.age) + currentUser.history.at(-1).loss - LOSS_RATE,
                streak: getStreak(currentUser.history, currentUser.sex, currentUser.weight, currentUser.height, currentUser.age, LOSS_RATE),
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

            var food = new Food({
                name: getName(args.foodname, " "),
                path: `/images/foods/${getName(args.foodname, "")}.png`
            })
            try{
                await food.save()
            }
            catch(err){
                // Duplicate Food
                food = await Food.findOne({
                    name: getName(args.foodname, " "),
                    path: `/images/foods/${getName(args.foodname, "")}.png`
                })
            }

            var scale = new Scale({
                name: args.scalename.length !== 1 ? getName(args.scalename, " ") : args.scalename,
                group: "food",
                path: "/images/icons/Scale.png"
            })
            try{
                await scale.save()
            }
            catch(err){
                // Duplicate Scale
                scale = await Scale.findOne({
                    name: args.scalename.length !== 1 ? getName(args.scalename, " ") : args.scalename,
                    group: "food",
                    path: "/images/icons/Scale.png"
                })
            }

            const foodScale = new FoodScale({
                food,
                scale,
                calories: args.calories
            })
            try{
                await foodScale.save()
            }
            catch(err){
                throw new GraphQLError("Food-Scale Already Exists!", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args,
                        err
                    }
                })
            }

            return foodScale
        },

        addExercise: async (_, args, { currentUser }) => {
            if(!currentUser){
                throw new GraphQLError("Access Denied!", {
                    extensions: {
                        code: "ACCESS_DENIED",
                    }
                })
            }

            var exercise = new Exercise({
                name: getName(args.exercisename, " "),
                path: `/animations/${getName(args.exercisename, "")}.gif`
            })
            try{
                await exercise.save()
            }
            catch(err){
                // Duplicate Exercise
                exercise = await Exercise.findOne({
                    name: getName(args.exercisename, " "),
                    path: `/animations/${getName(args.exercisename, "")}.gif`
                })
            }

            var scale = new Scale({
                name: args.scalename.length !== 1 ? getName(args.scalename, " ") : args.scalename,
                group: "exercise",
                path: "/images/icons/Scale.png"
            })
            try{
                await scale.save()
            }
            catch(err){
                // Duplicate Scale
                scale = await Scale.findOne({
                    name: args.scalename.length !== 1 ? getName(args.scalename, " ") : args.scalename,
                    group: "exercise",
                    path: "/images/icons/Scale.png"
                })
            }            

            const exerciseScale = new ExerciseScale({
                exercise,
                scale,
                calories: args.calories
            })
            try{
                await exerciseScale.save()
            }
            catch(err){
                throw new GraphQLError("Exercise-Scale Already Exists!", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args,
                        err
                    }
                })
            }

            return exerciseScale
        },

        addUser: async (_, args) => {
            const passwordHash = await bcrypt.hash(args.password, 10)

            const user = new User({...args,
                password: passwordHash,
                history: {
                    date: getDayDate(),
                    gain: 0,
                    loss: 0
                }
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
                totalCals: getBMR(user.sex, user.weight, user.height, user.age) + user.history.at(-1).loss - LOSS_RATE,
                streak: getStreak(user.history, user.sex, user.weight, user.height, user.age, LOSS_RATE),
                foods: user.foods,
                exercises: user.exercises,
                history: user.history
            }
        },

        addUserHistory: _addHistory,

        addUserFood: async (_, args, { currentUser }) => {
            if(!currentUser){
                throw new GraphQLError("Access Denied!", {
                    extensions: {
                        code: "ACCESS_DENIED",
                    }
                })
            }

            const food = await Food.findOne({
                name: args.foodname,
                path: `/images/foods/${getName(args.foodname, "")}.png`
            })
            if(!food){
                throw new GraphQLError("Food Not Found!", {
                    extensions: {
                        code: "FOOD_NOT_FOUND",
                        invalidArgs: args.foodname,
                    }
                })                
            }

            const scale = await Scale.findOne({
                name: args.scalename,
                group: "food",
                path: "/images/icons/Scale.png"   // path: `/image/scales/${args.scalename}.png` --> Custom Path if Needed
            })
            if(!scale){
                throw new GraphQLError("Scale Not Found!", {
                    extensions: {
                        code: "SCALE_NOT_FOUND",
                        invalidArgs: args.scalename,
                    }
                })                
            }            

            const foodScale = await FoodScale.findOne({
                food,
                scale
            }).populate("food").populate("scale")
            if(!foodScale) {
                throw new GraphQLError("Food-Scale Not Found!", {
                    extensions: {
                        code: "FOOD_SCALE_NOT_FOUND",
                        invalidArgs: args,
                    }
                })
            }

            currentUser.foods = currentUser.foods.concat({
                foodScale,
                amount: args.amount,
                date: getDayDate()
            })
            
            await currentUser.save()

            await _addHistory(null, { gain: args.amount * foodScale.calories, loss: 0 }, { currentUser }) // Awesome line of code! --> Call a query within a query

            return {
                username: currentUser.username,
                totalCals: getBMR(currentUser.sex, currentUser.weight, currentUser.height, currentUser.age) + currentUser.history.at(-1).loss - LOSS_RATE,
                streak: getStreak(currentUser.history, currentUser.sex, currentUser.weight, currentUser.height, currentUser.age, LOSS_RATE),
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

            const exercise = await Exercise.findOne({
                name: args.exercisename,
                path: `/animations/${getName(args.exercisename, "")}.gif`
            })
            if(!exercise){
                throw new GraphQLError("Exercise Not Found!", {
                    extensions: {
                        code: "EXERCISE_NOT_FOUND",
                        invalidArgs: args.exercisename,
                    }
                })                
            }

            const scale = await Scale.findOne({
                name: args.scalename,
                group: "exercise",
                path: "/images/icons/Scale.png"   // path: `/image/scales/${args.scalename}.png` --> Custom Path if Needed
            })
            if(!scale){
                throw new GraphQLError("Scale Not Found!", {
                    extensions: {
                        code: "SCALE_NOT_FOUND",
                        invalidArgs: args.scalename,
                    }
                })                
            }             

            const exerciseScale = await ExerciseScale.findOne({
                exercise,
                scale
            }).populate("exercise").populate("scale")
            if(!exerciseScale) {
                throw new GraphQLError("Exercise Scale Not Found!", {
                    extensions: {
                        code: "EXERCISE_SCALE_NOT_FOUND",
                        invalidArgs: args,
                    }
                })
            }

            currentUser.exercises = currentUser.exercises.concat({
                exerciseScale,
                amount: args.amount,
                date: getDayDate()
            })
            await currentUser.save()

            await _addHistory(null, { gain: 0, loss: args.amount * exerciseScale.calories }, { currentUser }) // Awesome line of code! --> Call a query within a query            

            return {
                username: currentUser.username,
                totalCals: getBMR(currentUser.sex, currentUser.weight, currentUser.height, currentUser.age) + currentUser.history.at(-1).loss - LOSS_RATE,
                streak: getStreak(currentUser.history, currentUser.sex, currentUser.weight, currentUser.height, currentUser.age, LOSS_RATE),
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
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "10d"
                    }
                )
            }
        },
    }
}

module.exports = resolvers