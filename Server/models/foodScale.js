const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
    },
    scale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scale",
    },
    calories: {
        type: Number,
        required: true,
    },
})

schema.index({ food: 1, scale: 1 }, { unique: true })

module.exports = mongoose.model("FoodScale", schema)