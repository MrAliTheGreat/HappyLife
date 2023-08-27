import { useState, useEffect } from "react"

import styles from "../styles/header.module.css"

const header = ({ view, setView }) => {
    const [click, setClick] = useState(true)

    useEffect(() => {
        setClick(false)
        setTimeout(() => {
            setClick(true)
        }, 500) // Synced with fade animation home.module.css
    }, [view])

    return(
        <div className={styles.main}>
            <div className={`${styles.holder} ${styles.left}`} onClick={() => click ? setView("exercise") : null } >
                <img className={styles.image} src="/images/Dumbbell.png"/>
            </div>            
            <img className={styles.logo} src="/animations/Run.gif" onClick={() => click ? setView("panel") : null} />
            <div className={`${styles.holder} ${styles.right}`} onClick={() => click ? setView("food") : null } >
                <img className={styles.image} src="/images/Food.png"/>
            </div>
        </div>
    )
}

export default header