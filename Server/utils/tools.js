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

module.exports = getDayDate