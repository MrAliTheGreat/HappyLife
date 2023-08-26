import { useState } from "react"

import styles from "../styles/home.module.css"

import Header from "./header"
import Summary from "./summary"
import Gain from "./gain"
import Loss from "./loss"
import Food from "./food"
import Exercise from "./exercise"


const home = () => {
    const [view, setView] = useState("panel")
    const [visited, setVisited] = useState({
        "food" : false,
        "exercise": false,
    })

    return(
        <div className={styles.main}>
            <Header setView={setView} visited={visited} setVisited={setVisited} />
            <div className={`${styles.holder} ${view === "panel" ? styles.fadeIn : styles.fadeOut}`} >
                <Summary />
                <Gain />
                <Loss />
            </div>
            <div className={`${styles.holder} ${!visited.food ? styles.start : view === "food" ? styles.fadeIn : styles.fadeOut}`} >
                <Food />
            </div>
            <div className={`${styles.holder} ${!visited.exercise ? styles.start : view === "exercise" ? styles.fadeIn : styles.fadeOut}`} >
                <Exercise />
            </div>            
        </div>
    )
}

export default home