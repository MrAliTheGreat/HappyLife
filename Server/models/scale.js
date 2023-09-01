const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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

schema.index({ name: 1, group: 1 }, { unique: true })

module.exports = mongoose.model("Scale", schema)