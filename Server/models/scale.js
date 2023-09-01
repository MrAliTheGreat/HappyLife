const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    group: {
        type: String,
        required: true,        
    },    
    path: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("Scale", schema)