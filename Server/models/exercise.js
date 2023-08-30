const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    scale: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    path: {
        type: String,
        unique: true,
    }
})

module.exports = mongoose.model("Exercise", schema)