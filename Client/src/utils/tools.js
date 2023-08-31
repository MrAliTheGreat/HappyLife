export const getDayDate = () => {
    const date = new Date().toLocaleDateString(
        "en-GB",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    ).split(",")
    
    return `${date[0]} \n ${date[1].trim()}`
}

export const getGraphVals = (history, option) => {
    let vals = [0, 0, 0, 0, 0, 0, 0]
    const numPreviousDays = {
        "Sat": 0,
        "Sun": 1,
        "Mon": 2,
        "Tue": 3,
        "Wed": 4,
        "Thu": 5,
        "Fri": 6
    }
    const pos = numPreviousDays[history.at(-1).date.slice(0, 3)]
    for(let i = pos; i >= 0; i--) {
        vals[i] = 
        history.at(-1 - pos + i) ? 
            option === "gain" ? 
            history.at(-1 - pos + i).gain : 
            history.at(-1 - pos + i).loss
        :
        0
    }
    return vals
}