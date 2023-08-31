const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        required: true,
    }
})

schema.index({ name: 1, scale: 1 }, { unique: true })

module.exports = mongoose.model("Exercise", schema)