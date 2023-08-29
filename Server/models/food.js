require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)


mongoose.connect(process.env.DB_URL)
    .then((res) => {
        console.log("Connected to DB!")
    })
    .catch((err) => {
        console.log(`Error Connecting to DB: ${err}`)
    })

const schema = new mongoose.Schema({
    name: String,
    path: String,
})

schema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model("Food", schema)