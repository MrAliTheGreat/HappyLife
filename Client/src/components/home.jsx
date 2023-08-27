import { useState, useEffect } from "react"

import styles from "../styles/home.module.css"

import Header from "./header"
import Summary from "./summary"
import Gain from "./gain"
import Loss from "./loss"
import Food from "./food"
import Exercise from "./exercise"


const home = () => {
    const [view, setView] = useState("food") // Change this to panel
    const [display, setDisplay] = useState({
        "panel": false,
        "food" : false,
        "exercise": false,
    })

    useEffect(() => {
        const previous = Object.keys(display).filter((key) => display[key])[0]
        setTimeout(() => {
            previous ? setDisplay({...display, [view]: true, [previous]: false}) : setDisplay({...display, [view]: true})
        }, 500) // Synced with fade animation home.module.css
    }, [view])

    return(
        <div className={styles.main}>
            <Header view={view} setView={setView} />
            <div className={`${styles.holder} ${view === "panel" ? styles.fadeIn : styles.fadeOut} ${display.panel ? "" : styles.start}`} >
                <Summary />
                <Gain />
                <Loss />
            </div>
            <div className={`${styles.holder} ${view === "food" ? styles.fadeIn : styles.fadeOut} ${display.food ? "" : styles.start}`} >
                <Food view={view} />
            </div>
            <div className={`${styles.holder} ${view === "exercise" ? styles.fadeIn : styles.fadeOut} ${display.exercise ? "" : styles.start}`} >
                <Exercise view={view} />
            </div>            
        </div>
    )
}

export default home