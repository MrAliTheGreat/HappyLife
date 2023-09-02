const getDayDate = () => {
    const date = new Date().toLocaleDateString(
        "en-GB",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    ).split(",")
    
    return `${date[0]} - ${date[1].trim()}`
}

const getName = (name, newChar) => {
    return name.split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(newChar)
}

const getBMR = (sex, weight, height, age) => {
    const BMR = sex.toLowerCase() === "male" ? 
        (10 * weight) + (6.25 * height) - (5 * age) + 5 :
        (10 * weight) + (6.25 * height) - (5 * age) - 161
    
    return Math.floor(BMR)
}

const getStreak = (history, sex, weight, height, age, LOSS_RATE) => {
    const BMR = getBMR(sex, weight, height, age)
    let streak = 0
    history.map((hist) => {
        BMR - LOSS_RATE + hist.loss - hist.gain > 0 ? streak += 1 : streak = 0
    })
    return streak
}


module.exports = { getDayDate, getName, getBMR, getStreak }