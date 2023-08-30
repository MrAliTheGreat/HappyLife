const Food = require("./models/food")
const { GraphQLError } = require('graphql')

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
        }
    },
    Mutation: {
        addFood: async (_, args) => {
            const food = new Food({...args, name: getName(args.name, " "), path: `/images/${getName(args.name, "")}.png`})
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
        }
    }
}

module.exports = resolvers