const Food = require("./models/food")

const food = new Food({
    name: "Pizza",
    path: "/images/Pizza.png"
})

food.save().then(() => {
    console.log("Food Saved!")
})