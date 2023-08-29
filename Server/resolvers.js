const Food = require("./models/food")

const resolvers = {
    Query: {
        all: async () => {
            return Food.find({})
        }
    }
}

module.exports = resolvers