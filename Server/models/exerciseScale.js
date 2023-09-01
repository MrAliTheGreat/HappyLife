const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
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

schema.index({ exercise: 1, scale: 1 }, { unique: true })

module.exports = mongoose.model("ExerciseScale", schema)