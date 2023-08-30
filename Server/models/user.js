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
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
        },
        amount: {
            type: Number
        },
        calories: {
            type: Number
        }
    }],
    exercises: [{
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise",            
        },
        amount: {
            type: Number
        },
        calories: {
            type: Number
        }
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