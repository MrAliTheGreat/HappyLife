const mongoose = require("mongoose")

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,        
    },
    sex: {
        type: String,
        required: true,
    },
    foods: [{
        foodScale: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodScale",
        },
        amount: {
            type: Number
        },
        date: {
            type: String
        },
    }],
    exercises: [{
        exerciseScale: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExerciseScale",            
        },
        amount: {
            type: Number
        },
        date: {
            type: String
        },
    }],
    history: [{
        date: {
            type: String
        },
        gain: {
            type: Number
        },
        loss: {
            type: Number
        }
    }]
})

module.exports = mongoose.model("User", schema)