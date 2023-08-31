import { useState, useEffect } from "react"

import styles from "../styles/header.module.css"


const header = ({ view, setView, setRender, client }) => {
    const [click, setClick] = useState(true)

    useEffect(() => {
        setClick(false)
        setTimeout(() => {
            setClick(true)
        }, 500) // Synced with fade animation home.module.css
    }, [view])

    return(
        <div className={styles.main}>
            <div className={`${styles.holder} ${styles.left}`} >
                <img 
                    className={`${styles.image} ${styles.logout}`}
                    src="/images/icons/Logout.png"
                    onClick={() => {
                        setRender("login")
                        localStorage.clear()
                        client.resetStore()
                    }}
                />
                <img 
                    className={`${styles.image} ${styles.imageLeft}`}
                    src="/images/icons/Dumbbell.png"
                    onClick={() => click ? setView("exercise") : null }
                />
            </div>            
            <img className={styles.logo} src="/animations/Run.gif" onClick={() => click ? setView("panel") : null} />
            <div className={`${styles.holder} ${styles.right}`} >
                <img 
                    className={`${styles.image} ${styles.imageRight}`}
                    src="/images/icons/Food.png"
                    onClick={() => click ? setView("food") : null }
                />
            </div>
        </div>
    )
}

export default header