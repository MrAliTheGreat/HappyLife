const Food = require("./models/food")

const resolvers = {
    Query: {
        all: async () => {
            return Food.find({})
        }
    },
    Mutation: {
        addFood: async (_, args) => {
            const food = new Food({...args})
            return food.save()
        }
    }
}

module.exports = resolvers