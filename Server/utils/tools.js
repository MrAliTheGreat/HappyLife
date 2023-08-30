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
    return name.split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(newChar)
}

module.exports = {getDayDate, getName}